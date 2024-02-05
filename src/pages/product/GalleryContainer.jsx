import React, { useState } from 'react';
import { Box, Dialog, DialogContent, List, ListItem, styled } from '@mui/material';



const GalleryContainers = styled(Box)({
  backgroundColor: "#121212",
  color: (theme) => theme.palette.text.primary,
  display: 'flex',
  height: '80vh',
  width: '80vw',
});

const MainImage = styled('img')({
  width: '50%',
  height: '50%',
  objectFit: 'cover',
  cursor: 'pointer',
});

const ImageList = styled(List)({
  width: '30%',
  overflowY: 'auto',
});

const ImageItem = styled(ListItem)({
  cursor: 'pointer',
  padding: (theme) => theme.spacing(1),
  borderBottom: '3px solid transparent',
  '&:hover': {
    borderBottomColor: (theme) => theme.palette.primary.main,
  },
});

const GalleryContainer = ({images}) => {
  const [selectedImage, setSelectedImage] = useState(images && images[0]);
  const [open, setOpen] = useState(false);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Box onClick={handleOpen}>Open Gallery</Box>
      <Dialog open={open} onClose={handleClose} maxWidth="lg">
        <DialogContent>
          <GalleryContainers>
            <MainImage src={selectedImage} alt="Main" onClick={handleClose} />
            <ImageList>
              {images?.map((image) => (
                <ImageItem key={image} onClick={() => handleImageClick(image)}>
                  <img src={image} alt={image} width="100%" />
                </ImageItem>
              ))}
            </ImageList>
          </GalleryContainers>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GalleryContainer;
