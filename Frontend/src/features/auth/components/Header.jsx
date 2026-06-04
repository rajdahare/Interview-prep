import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

export default function Header() {
  const { user, handleLogout } = useAuth();
  const navigate = useNavigate();

  const logoutUser = async () => {
    await handleLogout();
    navigate("/login");
  };

  return (
    <header className="site-header">
      <div className="container">
        <Link to="/" className="logo">
          InterviewAI
        </Link>

        <nav className="nav-links">
          <Link to="/">Home</Link>

          {user ? (
            <>
              <span className="user-info">
                {user.username}
              </span>

              {user.isPremium ? (
                <span className="premium-badge">
                  ⭐ Premium
                </span>
              ) : (
                <Link
                  to="/upgrade"
                  className="button primary-button upgrade-btn499"
                >
                  Upgrade ₹499
                </Link>
              )}

              <button
                className="button secondary-button"
                onClick={logoutUser}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}