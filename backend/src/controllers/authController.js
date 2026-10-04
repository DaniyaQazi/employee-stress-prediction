const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
    adapter,
});


/* ================= EMPLOYEE REGISTER ================= */

const register = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            organizationCode,
        } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, email and password are required",
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters",
            });
        }

        const existingUser = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "An account with this email already exists",
            });
        }


        /* ================= ORGANIZATION JOIN ================= */

        let organization = null;

        if (organizationCode) {
            organization = await prisma.organization.findUnique({
                where: {
                    code: organizationCode.trim().toUpperCase(),
                },
            });

            if (!organization) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid organization code",
                });
            }
        }


        /* ================= CREATE EMPLOYEE ================= */

        const passwordHash = await bcrypt.hash(
            password,
            12
        );

        const user = await prisma.user.create({
            data: {
                name,
                email,
                passwordHash,
                role: "EMPLOYEE",
                organizationId: organization?.id || null,
            },
        });


        return res.status(201).json({
            success: true,

            message: organization
                ? "Employee account created and joined the organization"
                : "Employee account created successfully",

            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                organizationId: user.organizationId,
            },
        });

    } catch (error) {
        console.error(
            "Registration error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Unable to create account",
        });
    }
};


/* ================= ORGANIZATION REGISTER ================= */

const registerOrganization = async (req, res) => {
    try {
        const {
            organizationName,
            name,
            email,
            password,
        } = req.body;

        if (
            !organizationName ||
            !name ||
            !email ||
            !password
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Organization name, admin name, email and password are required",
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message:
                    "Password must be at least 6 characters",
            });
        }

        const existingUser = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message:
                    "An account with this email already exists",
            });
        }


        /* ================= GENERATE ORGANIZATION CODE ================= */

        const organizationCode =
            crypto
                .randomBytes(4)
                .toString("hex")
                .toUpperCase();


        const passwordHash = await bcrypt.hash(
            password,
            12
        );


        /* ================= CREATE ORGANIZATION + ADMIN ================= */

        const result = await prisma.$transaction(
            async (tx) => {

                const organization =
                    await tx.organization.create({
                        data: {
                            name: organizationName,
                            code: organizationCode,
                        },
                    });


                const admin =
                    await tx.user.create({
                        data: {
                            name,
                            email,
                            passwordHash,
                            role: "ADMIN",
                            organizationId:
                                organization.id,
                        },
                    });


                return {
                    organization,
                    admin,
                };
            }
        );


        return res.status(201).json({
            success: true,

            message:
                "Organization and admin account created successfully",

            organization: {
                id: result.organization.id,
                name: result.organization.name,
                code: result.organization.code,
            },

            user: {
                id: result.admin.id,
                name: result.admin.name,
                email: result.admin.email,
                role: result.admin.role,
                organizationId:
                    result.admin.organizationId,
            },
        });

    } catch (error) {
        console.error(
            "Organization registration error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Unable to create organization",
        });
    }
};


/* ================= LOGIN ================= */

const login = async (req, res) => {
    try {
        const {
            email,
            password,
        } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message:
                    "Email and password are required",
            });
        }

        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message:
                    "Invalid email or password",
            });
        }

        const passwordMatches =
            await bcrypt.compare(
                password,
                user.passwordHash
            );

        if (!passwordMatches) {
            return res.status(401).json({
                success: false,
                message:
                    "Invalid email or password",
            });
        }


        /* ================= CREATE JWT ================= */

        const token = jwt.sign(
            {
                userId: user.id,
                role: user.role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d",
            }
        );


        return res.status(200).json({
            success: true,
            message: "Login successful",

            token,

            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                organizationId:
                    user.organizationId,
            },
        });

    } catch (error) {
        console.error(
            "Login error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Unable to login",
        });
    }
};


module.exports = {
    register,
    registerOrganization,
    login,
};