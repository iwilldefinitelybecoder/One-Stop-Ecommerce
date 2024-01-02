import React, { useState } from 'react';
import { Grid, Button } from '@mui/material';
import ImagePreview from './ImagePreview'; // Assuming ImagePreview component is defined



function UploadTray({ setFormData, formData}) {
  const inputRef = React.useRef(null);
  const submitRef = React.useRef(null);

  const [errorFields, setErrorFields] = useState({});
  const [image, setImage] = useState([]);
  const [dropField, setDropField] = useState(false);




  const handelDragOpen = (e) => {
    setDropField(true);
  };

  const handeDragClose = (e) => {
    setDropField(false);
  };



  const handelInputClick = (e) => {
    e.preventDefault();
    let timerId;
    clearTimeout(timerId);
    if (image.length > 4) {
      setErrorFields((prev) => ({
        ...prev,
        imageLimit: "You can upload only 5 images",
      }));
      timerId = setTimeout(() => {
        setErrorFields((prev) => ({
          ...prev,
          imageLimit: "",
        }));
      }, 5000);
      return;
    }
    inputRef.current.click();
  };

  const handelInputUpload = (e) => {
    e.preventDefault();

    const file = Array.from(e.target.files);
    setImage((prev) => (Array.isArray(prev) ? [...prev, ...file] : [...file]));
    handelFormImgChange(file);
  };



  const handelImgDrop = (e) => {
    e.preventDefault();
    if (image.length > 4) {
      errorFields.imagesLimit = "You can upload only 5 images";
      return;
    }
    const file = Array.from(e.dataTransfer.files);
    setImage((prev) => [...prev, ...file]);
    handelFormImgChange(file);
  };

  const handelFormImgChange = (file) => {
    setFormData((prev) => ({
      ...prev,
      images: Array.isArray(formData.images)
        ? [...formData.images, ...file]
        : [...file],
    }));
  };





  const handelSubmitButton = () => {
    submitRef.current.click();
  };


  return (
    <div className="upload-img-container mb-4">
      <h1 className="h2-text mb-4">Upload Product Image</h1>
      <h5 className='mb-2 font-semibold'>
        Help customers to know more about your product by uploading images 
      </h5>
    <div
      className={`${
        dropField ? "drag-drop-img-field-open" : "drag-drop-img-field"
      } `}
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDragEnter={handelDragOpen}
      onDragLeave={handeDragClose}
      onDrop={(e) => {
        handelImgDrop(e);
      }}
    >
      <div className="sub-drag-drop-field space-y-2">
        <div className="field-Title">
          <span className="font-semibold text-slate-500">
            Drag & drop product Image here
          </span>
        </div>
        <div className="field-divider">
          <span>or</span>
        </div>
        <div className="upload-img-btn">
          <button
            className="Btn"
            type="file"
            onClick={(e) => {
              handelInputClick(e);
            }}
          >
            Select Files
          </button>
          <input
            type="file"
            style={{ display: "none" }}
            ref={inputRef}
            onChange={(e) => {
              handelInputUpload(e);
            }}
            multiple
            accept="image/*"
          />
        </div>
        <div className="img-type-size">
          <span className="text-xs text-slate-400">
            Upload 280 * 280 image
          </span>
        </div>
      </div>
    </div>
     <ImagePreview image={image} setImage={setImage} setFormData={setFormData}/>
    {errorFields.images && (
      <span className=" ml-4 text-red-500 font-semibold">
        *Upload atleast one Image
      </span>
    )}
    {errorFields.imageLimit && (
      <span className=" ml-4 text-red-500 font-semibold">
        *You can upload only 5 images
      </span>
    )}
  </div>
  );
}

export default UploadTray;
