import React, { useState } from "react";
import { plusBlackIcon } from "../../../assets/icons/png/Rareicons/data";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { trashbinIcon } from "../../../assets/icons/png/toolbar1/data";

const style = {
  position: "absolute",

  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const ExtraAttributes = ({
    extraAttributes,
    setExtraAttributes,
  errorFields,
  setErrorFields,
}) => {
 
  const [addAttributeNames, setAddAttributeNames] = useState("");

  const [open, setOpen] = useState(false);

  const handelEmptyFields = () => {
    const arr = [...extraAttributes];
    const lastObj = arr[arr.length - 1];
    const keys = Object.keys(lastObj);
  
    for (const key of keys) {
      if (lastObj[key] === "") {
        setErrorFields((prev) => ({ ...prev, [key]: key }));
        return true;
      }
    }
    return false;
  };

  console.log(extraAttributes)

  const isAttributeExists = (attributeName) => {
    for (const obj of extraAttributes) {
      if (obj.hasOwnProperty(attributeName)) {
        setErrorFields((prev) => ({ ...prev, [attributeName]: "Attribute name already exists" }));
        return true; // Attribute name already exists in one of the objects
      }
    }
    return false; // Attribute name does not exist in any of the objects
  };
  
  const handleAdd = (addAttributeNames) => {
    if (addAttributeNames === "" || isAttributeExists(addAttributeNames)||handelEmptyFields() ) {
      return;
    }
  
    if (
      extraAttributes.length === 0 ||
      Object.keys(extraAttributes[extraAttributes.length - 1]).length === 2
    ) {
      setExtraAttributes([...extraAttributes, { [addAttributeNames]: "" }]);
    } else {
      const updatedArray = [...extraAttributes];
      const lastObjectIndex = updatedArray.length - 1;
      updatedArray[lastObjectIndex] = {
        ...updatedArray[lastObjectIndex],
        [addAttributeNames]: "",
      };
      setExtraAttributes(updatedArray);
    }
    setAddAttributeNames("");
    
  };


  

  const handelChange = (e, objectIndex, attributeName) => {
    const { value } = e.target;
    console.log(attributeName, value);
    
    setErrorFields((prev) => ({ ...prev, [attributeName]: "" }));
  
    const updatedArray = [...extraAttributes];
    updatedArray[objectIndex] = {
      ...updatedArray[objectIndex],
      [attributeName]: value,
    };
  
    setExtraAttributes(updatedArray);
  };

  const handelDelete = (objectIndex, attributeName) => {
    const updatedArray = [...extraAttributes];
    const updatedObj = { ...updatedArray[objectIndex] };
  
    delete updatedObj[attributeName];
  
    updatedArray[objectIndex] = updatedObj;
    setExtraAttributes(updatedArray);
  };

  return (
    <>
      <div className="extra-addtr-bdy">
        {extraAttributes.map((attribute, attributeIndex) => (
          <div className="price-sale-div" key={attributeIndex}>
            {Object.keys(attribute).map((item, itemIndex) => (
              <div className="reg-price-div" key={`${attributeIndex}-${itemIndex}`}>
                <div className="price-div">
                  <label htmlFor={item}>{item}</label>
                  <div className=" relative flex items-center">

                  <input
                    type="text"
                    name={item}
                    placeholder={item}
                    onChange={(e) => handelChange(e, attributeIndex, item)}
                    value={attribute[item]}
                    />
                    <div className=" rounded-full hover:bg-slate-100 p-2 ml-1" onClick={()=>handelDelete( attributeIndex,item)} role="button">

                    <img src={trashbinIcon} className="h-5" />
                    </div>
                    </div>
                </div>
                {errorFields[item] && (
                  <span className="ml-4 text-red-500 font-semibold">
                    {errorFields[item]} field is required
                  </span>
                )}
              </div>
            ))}
          </div>
        ))}

        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Typography id="modal-modal-title" variant="h6" component="h2" className=" font-semibold">
                Name of The Attribute
              </Typography>
            </Box>
            <TextField
              id="outlined-basic"
              label="Attribute"
              variant="outlined"
              name="attribute"
              value={addAttributeNames.name}
              onChange={(e) => setAddAttributeNames(e.target.value)}
              sx={{ height: 45, width: "100%", marginTop: 1 }}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                marginTop: 3,
              }}
            >
              <Button
                variant="contained"
                sx={{ backgroundColor: "#e94560", ":hover": "#BA374D" }}
                onClick={() => {
                  setOpen(false);
                  handleAdd(addAttributeNames);
                }}
              >
                Add
              </Button>
            </Box>
          </Box>
        </Modal>

        <div className="add-new-method flex justify-center items-center">
          <div
            className="add-mehtods-Btn bg-light-pink p-3 rounded-full shadow-md hover:bg-dark-pink hover:cursor-pointer"
            role="button"
            onClick={() => setOpen(true)}
          >
            <img
              src={plusBlackIcon}
              className="h-6"
              style={{ filter: "invert(1)" }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ExtraAttributes;
