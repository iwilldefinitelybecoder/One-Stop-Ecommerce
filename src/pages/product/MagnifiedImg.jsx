import { Skeleton } from '@mui/material';
import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';

const MagnifiedImg = ({ image,loading }) => {

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const handleImageLoad = (event) => {
    const { naturalWidth, naturalHeight } = event.target;
    setDimensions({ width: naturalWidth, height: naturalHeight });
  };

  
  const aspectRatio = (dimensions.height / dimensions.width) * 100;

  
    
  const imgRef = useRef(null);
  const lensRef = useRef(null);
  const resultRef = useRef(null);

  useEffect(() => {
    if(loading) return;
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
    // <div
    // style={{
      
    //   backgroundImage: `url(${image?.imagePreview})`,
    //   backgroundSize: "cover",
    //   backgroundPosition: "center",
    //   width: `${dimensions.width/1.5}px`,
    //   height: `${dimensions.height/1.5}px`,
    //   padding:`${dimensions.height/15}px `,
    //   maxHeight: "300px",
    //   maxWidth: "300px",
      
    // }}
    // >

    

    <div className="img-zoom-container">
       <div className="  rounded-md overflow-hidden"
        style={{backgroundImage: `url(${image?.imagePreview})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "inherit",
        width: "inherit",            
      }}
      >
        {
          loading?
          <Skeleton variant="rect" animation="wave" width={300} height={300} />
        :
        <img
        src={image?.imageURL}
        onLoad={(e) => {
            e.target.style.opacity = 1;
            handleImageLoad(e);
          }}
          style={{ 
          opacity: 0,
          zIndex: 10,
          transition: "opacity 0.5s ease-in-out",

        }}
        ref={imgRef}
        />
      }
      </div>
      <div ref={lensRef} className="img-zoom-lens"></div>
      <div ref={resultRef} className="img-zoom-result"></div>
    </div> 
        // </div>
  );
};

export default MagnifiedImg;
