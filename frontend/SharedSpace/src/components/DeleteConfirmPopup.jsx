import React from 'react';
import './DeleteConfirmPopup.css';

export function DeleteConfirmPopup({ isOpen, onClose, onConfirm, count }) {
     if (!isOpen) return null;

     return (
          <div className="delete-popup-overlay">
               <div className="delete-popup-card">
                    <h2 className="delete-popup-title">Confirm Deletion</h2>
                    <p className="delete-popup-message">
                         Are you sure you want to delete {count} post{count > 1 ? 's' : ''}? This action cannot be undone.
                    </p>
                    <div className="delete-popup-buttons">
                         <button className="delete-popup-button cancel" onClick={onClose}>
                              Cancel
                         </button>
                         <button className="delete-popup-button confirm" onClick={onConfirm}>
                              Delete
                         </button>
                    </div>
               </div>
          </div>
     );
}
