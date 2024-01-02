import React, { useEffect, useState } from 'react';

const NumberCount = ({ end }) => {
  const [value, setValue] = useState(0);

  const easeInOutQuart = (t) => {
    return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
  };

  useEffect(() => {
    let startTime;
    let rAF;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsedTime = timestamp - startTime;

      const progress = Math.min(elapsedTime / 1000, 1);
      const easedProgress = easeInOutQuart(progress);

      const currentValue = Math.floor(end * easedProgress);
      setValue(currentValue);

      if (progress < 1) {
        rAF = requestAnimationFrame(animate);
      }
    };

    rAF = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(rAF);
  }, [end]);

  return <span>{value}</span>;
};

export default NumberCount;
