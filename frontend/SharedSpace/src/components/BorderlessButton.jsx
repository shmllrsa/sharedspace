import './BorderlessButton.css'
import { Link } from 'react-router-dom'

export function BorderlessButton({ to, onClick, message, type }) {
    // If onClick is provided, render as a button instead of Link
    if (onClick) {
        return (
            <>
                <div className='borderlessButton' onClick={onClick}>
                    <button className={type}>
                        {message}
                        {type != 'header' && " ►"}
                    </button>
                </div>
            </>
        );
    }

    // Otherwise, render as a Link for navigation
    return (
        <>
            <Link to={to} className='borderlessButton'>
                <button className={type}>
                    {message}
                    {type != 'header' && " ►"}
                </button>
            </Link>
        </>
    );
}