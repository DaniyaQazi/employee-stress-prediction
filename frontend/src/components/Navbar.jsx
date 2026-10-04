function Navbar({
    activePage,
    setActivePage,
    onLogout,
}) {
    const token = localStorage.getItem("token");

    let userRole = "EMPLOYEE";

    try {
        if (token) {
            const payload = JSON.parse(
                atob(token.split(".")[1])
            );

            userRole =
                payload.role || "EMPLOYEE";
        }
    } catch {
        userRole = "EMPLOYEE";
    }


    /* ================= NAVIGATION ================= */

    const employeeMenuItems = [
        {
            id: "home",
            label: "Home",
            icon: "⌂",
        },
        {
            id: "stress",
            label: "Check My Stress",
            icon: "♡",
        },
        {
            id: "history",
            label: "My History",
            icon: "◷",
        },
        {
            id: "tips",
            label: "Wellbeing Tips",
            icon: "✦",
        },
        {
            id: "profile",
            label: "Profile",
            icon: "◯",
        },
    ];


    const adminMenuItems = [
        {
            id: "admin",
            label: "Admin Portal",
            icon: "▦",
        },
    ];


    const menuItems =
        userRole === "ADMIN"
            ? adminMenuItems
            : employeeMenuItems;


    return (
        <aside className="navbar">

            {/* ================= BRAND ================= */}

            <div className="brand">

                <div className="brand-icon">
                    ✦
                </div>

                <span>
                    StressSense
                </span>

            </div>


            {/* ================= MENU ================= */}

            <nav className="nav-menu">

                {menuItems.map((item) => (

                    <button
                        key={item.id}
                        type="button"
                        className={
                            activePage === item.id
                                ? "nav-item active"
                                : "nav-item"
                        }
                        onClick={() =>
                            setActivePage(item.id)
                        }
                    >

                        <span className="nav-icon">
                            {item.icon}
                        </span>

                        <span>
                            {item.label}
                        </span>

                    </button>

                ))}

            </nav>


            {/* ================= LOGOUT ================= */}

            <div className="nav-bottom">

                <button
                    type="button"
                    className="nav-item logout-item"
                    onClick={onLogout}
                >

                    <span className="nav-icon">
                        ↪
                    </span>

                    <span>
                        Log out
                    </span>

                </button>

            </div>

        </aside>
    );
}


export default Navbar;