const axios = require("axios");

const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
    adapter,
});


/* ================= CREATE PREDICTION ================= */

const createPrediction = async (req, res) => {
    try {
        console.log(
            "Received prediction request:",
            req.body
        );

        const mlResponse = await axios.post(
            "http://127.0.0.1:8000/predict",
            req.body,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        console.log(
            "ML service response:",
            mlResponse.data
        );

        const data = mlResponse.data;

        const score =
            data.predicted_stress_score ??
            data.stress_score ??
            data.score ??
            data.prediction ??
            data.predicted_stress ??
            data.predicted_score;

        console.log(
            "Extracted stress score:",
            score
        );

        if (
            score === undefined ||
            score === null ||
            Number.isNaN(Number(score))
        ) {
            return res.status(502).json({
                success: false,
                message:
                    "ML service returned invalid prediction data",
                mlResponse: data,
            });
        }


        const prediction =
            await prisma.stressPrediction.create({
                data: {
                    userId: req.user.userId,

                    // Personality
                    openness:
                        Number(req.body.Openness),

                    conscientiousness:
                        Number(req.body.Conscientiousness),

                    extraversion:
                        Number(req.body.Extraversion),

                    agreeableness:
                        Number(req.body.Agreeableness),

                    neuroticism:
                        Number(req.body.Neuroticism),


                    // Sleep & wellbeing
                    sleepTime:
                        Number(req.body.sleep_time),

                    wakeTime:
                        Number(req.body.wake_time),

                    sleepDuration:
                        Number(req.body.sleep_duration),

                    psqiScore:
                        Number(req.body.PSQI_score),

                    pssScore:
                        Number(req.body.PSS_score),


                    // Communication & screen use
                    callDuration:
                        Number(req.body.call_duration),

                    numCalls:
                        Number(req.body.num_calls),

                    numSms:
                        Number(req.body.num_sms),

                    screenOnTime:
                        Number(req.body.screen_on_time),


                    // Movement & activity
                    skinConductance:
                        Number(req.body.skin_conductance),

                    accelerometer:
                        Number(req.body.accelerometer),

                    mobilityRadius:
                        Number(req.body.mobility_radius),

                    mobilityDistance:
                        Number(req.body.mobility_distance),


                    // ML result
                    predictedStressScore:
                        Number(score),
                },
            });


        return res.status(200).json({
            success: true,

            predicted_stress_score:
                Number(score),

            score:
                Number(score),

            prediction_id:
                prediction.id,
        });

    } catch (error) {
        console.error(
            "Prediction error:",
            error.response?.data ||
            error.message
        );

        return res.status(500).json({
            success: false,
            message:
                "Prediction service unavailable",

            error:
                error.response?.data ||
                error.message,
        });
    }
};


/* ================= EMPLOYEE HISTORY ================= */

const getPredictionHistory = async (req, res) => {
    try {

        const predictions =
            await prisma.stressPrediction.findMany({
                where: {
                    userId: req.user.userId,
                },

                orderBy: {
                    createdAt: "desc",
                },
            });


        return res.status(200).json({
            success: true,
            predictions,
        });

    } catch (error) {

        console.error(
            "Prediction history error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Unable to fetch prediction history",
        });
    }
};


/* ================= ADMIN OVERVIEW ================= */

const getAdminOverview = async (req, res) => {
    try {

        /* ================= GET ADMIN ================= */

        const admin =
            await prisma.user.findUnique({
                where: {
                    id: req.user.userId,
                },

                select: {
                    organizationId: true,

                    organization: {
                        select: {
                            id: true,
                            name: true,
                            code: true,
                        },
                    },
                },
            });


        if (!admin) {
            return res.status(404).json({
                success: false,
                message:
                    "Admin account not found",
            });
        }


        /* ================= ORGANIZATION CHECK ================= */

        if (!admin.organizationId) {
            return res.status(400).json({
                success: false,
                message:
                    "Admin is not associated with an organization",
            });
        }


        const organizationId =
            admin.organizationId;


        /* ================= ORGANIZATION AGGREGATE ================= */

        const aggregate =
            await prisma.stressPrediction.aggregate({

                where: {
                    user: {
                        organizationId:
                            organizationId,
                    },
                },

                _count: {
                    id: true,
                },

                _avg: {
                    predictedStressScore: true,
                    sleepDuration: true,
                    screenOnTime: true,
                    pssScore: true,
                },

                _min: {
                    predictedStressScore: true,
                },

                _max: {
                    predictedStressScore: true,
                },
            });


        /* ================= EMPLOYEES WITH DATA ================= */

        const employees =
            await prisma.stressPrediction.findMany({

                where: {
                    user: {
                        organizationId:
                            organizationId,
                    },
                },

                distinct: [
                    "userId",
                ],

                select: {
                    userId: true,
                },
            });


        const employeeCount =
            employees.length;

        const predictionCount =
            aggregate._count.id;


        /* ================= PRIVACY THRESHOLD ================= */

        /*
         * Only expose aggregated company-level
         * information when enough distinct employees
         * have contributed prediction data.
         */

        if (employeeCount < 5) {

            return res.status(200).json({
                success: true,

                available: false,

                organization: {
                    id:
                        admin.organization.id,

                    name:
                        admin.organization.name,

                    code:
                        admin.organization.code,
                },

                employeeCount,

                predictionCount,

                message:
                    "Company-level insights will appear once enough employee data is available.",
            });
        }


        /* ================= RETURN OVERVIEW ================= */

        return res.status(200).json({

            success: true,

            available: true,

            organization: {
                id:
                    admin.organization.id,

                name:
                    admin.organization.name,

                code:
                    admin.organization.code,
            },


            overview: {

                employeeCount,

                predictionCount,


                /* ================= STRESS ================= */

                averagePredictedStressScore:
                    aggregate
                        ._avg
                        .predictedStressScore !== null
                        ? Number(
                            aggregate
                                ._avg
                                .predictedStressScore
                        ).toFixed(2)
                        : null,


                minimumPredictedStressScore:
                    aggregate
                        ._min
                        .predictedStressScore !== null
                        ? Number(
                            aggregate
                                ._min
                                .predictedStressScore
                        ).toFixed(2)
                        : null,


                maximumPredictedStressScore:
                    aggregate
                        ._max
                        .predictedStressScore !== null
                        ? Number(
                            aggregate
                                ._max
                                .predictedStressScore
                        ).toFixed(2)
                        : null,


                /* ================= WELLBEING PATTERNS ================= */

                averageSleepDuration:
                    aggregate
                        ._avg
                        .sleepDuration !== null
                        ? Number(
                            aggregate
                                ._avg
                                .sleepDuration
                        ).toFixed(2)
                        : null,


                averageScreenOnTime:
                    aggregate
                        ._avg
                        .screenOnTime !== null
                        ? Number(
                            aggregate
                                ._avg
                                .screenOnTime
                        ).toFixed(2)
                        : null,


                averagePssScore:
                    aggregate
                        ._avg
                        .pssScore !== null
                        ? Number(
                            aggregate
                                ._avg
                                .pssScore
                        ).toFixed(2)
                        : null,
            },
        });

    } catch (error) {

        console.error(
            "Admin overview error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Unable to fetch company wellbeing overview",
        });
    }
};


/* ================= EXPORTS ================= */

module.exports = {
    createPrediction,
    getPredictionHistory,
    getAdminOverview,
};