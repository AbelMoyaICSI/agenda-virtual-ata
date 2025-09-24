import React from 'react';

const Loading = ({ message = "Cargando...", size = "medium" }) => {
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-10 h-10',
    large: 'w-16 h-16'
  };

  return (
    <div className="loading">
      <div className={`spinner ${sizeClasses[size]}`}></div>
      {message && (
        <p className="mt-4 text-ata-negro opacity-70 text-center">
          {message}
        </p>
      )}
    </div>
  );
};

export default Loading;