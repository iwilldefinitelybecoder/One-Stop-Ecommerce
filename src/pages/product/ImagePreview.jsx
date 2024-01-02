import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import React, { useState } from "react";
import { trashbinIcon } from "../../assets/icons/png/toolbar1/data";

function ImagePreview({ image, setImage,setFormData }) {
  // const isVideo = file.type.startsWith("video/");
  // const isImage = file.type.startsWith("image/");

  const [imagePreview, setImagePreview] = useState([]);
  const [viewImage, setViewImage] = useState(false);

  const trimFileName = (fileName) => {
    const lastDot = fileName.lastIndexOf(".");
    const ext = fileName.substring(lastDot + 1);
    const name = fileName.substring(0, lastDot);
    return name.substring(0, 10) + "." + ext;
  };

  const handelImageOpen = (e, index) => {
    setViewImage(true);
    setImagePreview(URL.createObjectURL(image[index]));
  };

  const closeImageViewer = () => {
    setViewImage(false);
    setImagePreview([]);
  };

  const handelDelete = (index) => {
    setImage((prev) => prev.filter((img, i) => i !== index));
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((img, i) => i !== index),
    }));
  };

  return (
    <>
      {viewImage && (
        <div className="image-viewer-cntr">
          <div
            className="image-viewer-sub-cntr"
            onClick={(e) => closeImageViewer()}
          ></div>
          <div className="image-viewer-main-cntr">
            <div
              className="close-button"
              onClick={(e) => {
                closeImageViewer();
              }}
            >
              X
            </div>
            <img src={imagePreview} alt="" />
          </div>
        </div>
      )}
      {image.length !== 0 && (
        
        <div className="img-display-field space-y-2">
          <span className=" font-semibold">Select An Image for Thumbnail</span>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="set-thumbnail"
            defaultValue={0}
            // onChange={handelformChange}
            sx={{ display: "flex", flexWrap: "wrap", flexDirection: "row" }}
          >
            {image?.map((img, index) => {
              return (
                <div
                  className="img-cntr px-5 hover:bg-slate-100 hover:rounded-md flex-col py-2 h-24 w-40
                   mx-3 mb-4 "
                  key={index}
                  onDoubleClick={(e) => {
                    handelImageOpen(e, index);
                  }}
                >
                  <FormControlLabel
                    value={index}
                    control={
                      <Radio
                        sx={{
                          ":hover": { backgroundColor: "#FFF" },
                          padding: "0px",
                        }}
                      />
                    }
                    sx={{ position: "absolute", right: "-13px" }}
                  />
                  <div className=" flex justify-center">
                    <img
                      src={URL.createObjectURL(img)}
                      alt=""
                      className="uploaded-img h-16"
                    />
                  </div>
                  <span>{trimFileName(img.name)}</span>
                  <div
                    className="delete-img-icon"
                    title="delete-img"
                    onClick={(e) => {
                      handelDelete(index);
                    }}
                  >
                    <img src={trashbinIcon} className="h-4" />
                  </div>
                </div>
              );
            })}
          </RadioGroup>
        </div>
      )}
    </>
  );
}

export default ImagePreview;
