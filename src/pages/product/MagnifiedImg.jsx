import React, { useRef, useEffect } from 'react';

const MagnifiedImg = ({ image }) => {
    
  const imgRef = useRef(null);
  const lensRef = useRef(null);
  const resultRef = useRef(null);

  useEffect(() => {
    const img = imgRef.current;
    const lens = lensRef.current;
    const result = resultRef.current;

    let cx, cy;

    const moveLens = (e) => {
      e.preventDefault();

      const imgRect = img.getBoundingClientRect();
      let posX = e.pageX - imgRect.left - window.pageXOffset - lens.offsetWidth / 2;
      let posY = e.pageY - imgRect.top - window.pageYOffset - lens.offsetHeight / 2;

      if (posX > img.width - lens.offsetWidth) {
        posX = img.width - lens.offsetWidth;
      }
      if (posX < 0) {
        posX = 0;
      }
      if (posY > img.height - lens.offsetHeight) {
        posY = img.height - lens.offsetHeight;
      }
      if (posY < 0) {
        posY = 0;
      }

      lens.style.left = posX + 'px';
      lens.style.top = posY + 'px';
      result.style.backgroundPosition = '-' + posX * cx + 'px -' + posY * cy + 'px';
    };

    img.addEventListener('mouseenter', () => {
      lens.style.display = 'block';
      result.style.display = 'block';
    });

    img.addEventListener('mousemove', moveLens);

    img.addEventListener('mouseleave', () => {
      lens.style.display = 'none';
      result.style.display = 'none';
    });

    // Calculate the ratio between result DIV and lens
    cx = result.offsetWidth / lens.offsetWidth;
    cy = result.offsetHeight / lens.offsetHeight;

    return () => {
      img.removeEventListener('mouseenter', () => {
        lens.style.display = 'block';
        result.style.display = 'block';
      });

      img.removeEventListener('mousemove', moveLens);

      img.removeEventListener('mouseleave', () => {
        lens.style.display = 'none';
        result.style.display = 'none';
      });
    };
  }, []);

  return (
    <div className="img-zoom-container">
      <img
        ref={imgRef}
        src={image}
        width="300"
        height="240"
        alt="Zoomable Image"
      />
      <div ref={lensRef} className="img-zoom-lens"></div>
      <div ref={resultRef} className="img-zoom-result"></div>
    </div> 
  );
};

export default MagnifiedImg;
