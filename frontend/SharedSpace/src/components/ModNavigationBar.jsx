// For the navigation bar.
import './ModNavigationBar.css'                                 // Import CSS.
import { Link } from 'react-router-dom'
import SharedSpaceLogo from '../assets/SharedSpaceLogo.svg'

// ____________________________________________________________________________________________________

export function ModNavigationBar({ onSignOut }) {
    return (
        <nav className='navbar'>
            {/* Shared Space logo. */}
            <div className='navbar-component-logo'>
                <img src={SharedSpaceLogo} alt="Shared Space" height="55" width="55" className="navbar-logo" />
            </div>

            {/* Empty center */}
            <div className='center-name'>
            </div>

            {/* Sign-out icon on right. */}
            <div className='right-icons'>
                <button onClick={onSignOut} className="navbar-sign-out-icon">
                    <svg className="navbar-icon" width="35" height="35" viewBox="0 -33 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="35.613" y="60.1334" width="240" height="27.78" fill="#341539" />
                        <rect x="315.975" y="239.02" width="94.5441" height="27.78" transform="rotate(-45 315.975 239.02)" fill="#341539" />
                        <rect x="335.618" y="230.883" width="142.659" height="27.78" fill="#341539" />
                        <rect x="21.7231" y="60.1334" width="27.78" height="379.733" fill="#341539" />
                        <rect x="149.823" y="327.967" width="27.78" height="158.25" transform="rotate(-45 149.823 327.967)" fill="#341539" />
                        <rect x="329.85" y="225.114" width="102.573" height="27.7806" transform="rotate(45 329.85 225.114)" fill="#341539" />
                        <path d="M169.503 345.838H167.896L141.723 319.664V60.1332H169.503V345.838Z" fill="#341539" />
                        <rect x="261.723" y="60.1334" width="27.78" height="379.733" fill="#341539" />
                        <circle cx="195.607" cy="216.934" r="13.9486" fill="#341539" />
                    </svg>
                </button>
            </div>
        </nav>
    );
}