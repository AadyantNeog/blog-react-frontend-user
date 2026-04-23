import { Link, NavLink, useNavigate } from "react-router-dom";
import { clearSession, readUserFromToken } from "../utils/auth";

export function SessionNav({ variant = "masthead" }) {
    const navigate = useNavigate();
    const user = readUserFromToken();

    function handleLogout() {
        clearSession();
        navigate("/login", { replace: true });
    }

    return (
        <div className={`session-nav session-nav-${variant}`}>
            <div className="session-links">
                <NavLink
                    className={({ isActive }) => `inline-link session-nav-link${isActive ? " active" : ""}`}
                    to="/posts"
                >
                    All posts
                </NavLink>
                {user ? (
                    <NavLink
                        className={({ isActive }) => `inline-link session-nav-link${isActive ? " active" : ""}`}
                        to="/profile"
                    >
                        My profile
                    </NavLink>
                ) : null}
            </div>
            {user ? (
                <button type="button" className="session-link-button" onClick={handleLogout}>
                    Log out
                </button>
            ) : (
                <Link className="inline-link session-nav-link" to="/login">Log in</Link>
            )}
        </div>
    );
}
