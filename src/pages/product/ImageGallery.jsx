import React, { useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Dialog, DialogContent, IconButton } from "@mui/material";
import styled from "styled-components";

const PreviewContainer = styled.div`
  display: flex;
  bottom: 16px;
  right: 16px;
  z-index: 1000;
`;

const PreviewImage = styled.img`
  width: 48px;
  height: 48px;
  margin-right: 8px;
  border-radius: 4px;
  padding: 2px;
  --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1),
    0 4px 6px -4px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color),
    0 4px 6px -4px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  object-fit: cover;
  border: 1px solid #e0e0e0;
  cursor: pointer;
`;

const FullImage = styled.img`
  width: 100%;
  max-height: 80vh;
  object-fit: contain;
`;

const CarouselOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
  z-index: 10000;
`;

const CarouselIcon = styled(IconButton)`
  font-size: 24px;
  cursor: pointer;
  color: white;
`;

const RemainingImages = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 16px;
`;

const StyledOverlay = styled.div`
  position: relative;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImageTint = styled.div`
  position: absolute;
  border-radius: 4px;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
`;

const CountOverlay = styled.div`
  color: white;
  font-size: 24px;
  font-weight: 600;
  position: absolute;
  cursor: pointer;
`;

const ImageGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const handlePreviewClick = (index) => {
    setCarouselIndex(index);
    setSelectedImage(images[index]);
  };

  const handleCarouselClick = (e, direction) => {
    e.preventDefault();
    e.stopPropagation();

    const newIndex = carouselIndex + direction;
    if (newIndex >= 0 && newIndex < images.length) {
      setCarouselIndex(newIndex);
      setSelectedImage(images[newIndex]);
    }
  };

  const handleCloseCarousel = () => {
    setSelectedImage(null);
  };

  return (
    <>
      {images?.length > 2 ? (
        <PreviewContainer>
          {images.slice(0, 2).map((image, index) => (
            <PreviewImage
              key={index}
              src={image}
              alt={`Preview ${index + 1}`}
              onClick={() => handlePreviewClick(index)}
            />
          ))}
          <StyledOverlay>
            <PreviewImage src={images[2]} alt="Preview 3" />
            <ImageTint />

            <CountOverlay onClick={() => handlePreviewClick(2)}>
              +{images?.length - 3}
            </CountOverlay>
          </StyledOverlay>
        </PreviewContainer>
      ) : (
        <PreviewContainer>
          {images.slice(0, 2).map((image, index) => (
            <PreviewImage
              key={index}
              src={image}
              alt={`Preview ${index + 1}`}
              onClick={() => handlePreviewClick(index)}
            />
          ))}
        </PreviewContainer>
      )}

      {/* Carousel Overlay */}
      {selectedImage && (
        <CarouselOverlay onClick={handleCloseCarousel}>
          <CarouselIcon
            color="inherit"
            onClick={(e) => handleCarouselClick(e, -1)}
            disabled={carouselIndex === 0}
          >
            <ChevronLeftIcon />
          </CarouselIcon>
          <Dialog
            open={!!selectedImage}
            onClose={handleCloseCarousel}
            maxWidth="md"
           
          >
            <DialogContent>
              <FullImage  src={selectedImage} alt="Full Size" />
            </DialogContent>
          </Dialog>
          <CarouselIcon
            color="inherit"
            onClick={(e) => handleCarouselClick(e, 1)}
            disabled={carouselIndex === images.length - 1}
          >
            <ChevronRightIcon />
          </CarouselIcon>
        </CarouselOverlay>
      )}
    </>
  );
};

export default ImageGallery;
