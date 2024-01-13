import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';

const ConfettiAnimation = ({ success }) => {
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (success) {

      setIsSuccess(true);

      const timeout = setTimeout(() => {
        setIsSuccess(false);
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [success]);

  return (
    <div>
      {isSuccess && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false} 
          numberOfPieces={300}
        />
      )}

    </div>
  );
};

export default ConfettiAnimation;
