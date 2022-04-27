import { useEffect } from 'react';

export default function HooksModal({ onClose, imgSrc }) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
    window.removeEventListener('keydown', handleKeyDown);
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
    window.removeEventListener('keydown', handleKeyDown);
  };
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
  }, [handleKeyDown, handleBackdropClick]);
  return (
    <div className="Overlay" onClick={handleBackdropClick}>
      <div className="Modal">
        <img src={imgSrc} alt="" />
      </div>
    </div>
  );
}
