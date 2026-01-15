// For the sign-out popup.
import './SignOutPopup.css'              // Import CSS.
import { Link } from 'react-router-dom'

// ____________________________________________________________________________________________________

export function SignOutPopup({ onClose, onLogout }) {
    return (
        <div className="sign-out-popup-card">
            <div className = "sign-out-popup">
                <div className = "sign-out-popup-header">
                    Are you sure you want to sign out?  {/* Confirmation message. */}
                </div>

                <div className = "sign-out-popup-buttons">
                    <button className="sign-out-no-button" onClick={onClose}>
                        Go Back  {/* Button closes popup. */}
                    </button>

                    <Link to="/login" className="sign-out-yes-button" onClick={onLogout}>
                        Sign Out  {/* Button redirects to login page. */}
                    </Link>
                </div>   
            </div>
        </div>
    )
}