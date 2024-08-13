import "./NotFound.css";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  return (
    <>
      <div className="not-found-container">
        <div className="not-found-content">
          <div className="not-found-title">404</div>
          <div className="not-found-subtitle">Page Not Found</div>
          <div className="not-found-description">
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </div>
          <div className="not-found-button-container">
            <button onClick={() => navigate("/")} className="not-found-button">
              Go Back Home
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default NotFound;
