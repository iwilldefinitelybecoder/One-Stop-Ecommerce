import {
  CircularProgress,
  Collapse,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import useProducts from "../../../CustomHooks/ProductsHook";
import CustomizedSwitch from "../../singularComponents/Switch";
import { useSearchParams } from "react-router-dom";
import CloseIcon from "@mui/icons-material/close";
import {
  priceIcon,
  productSoldIcon,
  quantityIcon,
  revenueIcon,
  saleIcon,
  sponserIcon,
} from "../../../assets/icons/png/Rareicons/data";
import { editIcon } from "../../../assets/icons/png/toolbar1/data";
import "./productDrawer.css";
import Loader from "../Loader";
import { sleep } from "../../../utils/utils";
import { getAttributes } from "../../../service/ProductServices";
import { truncateString } from "../../../utils/DisplayFormatters";

const ProductDrawer = ({
  order,
  index,
  handelProductContainer,
  productContainerIndex,
  productDetails,
}) => {
  const { publishAproduct,  loading,updateProductInfo } = useProducts();
  const [orders, setOrders] = useState(productDetails);
  const [searchParams, setSearchParams] = useSearchParams();
  const [changes, setChanges] = useState(false);
  const [attributeValue, setAttributeValue] = useState({
    quantity: productDetails?.stock,
    sponser: productDetails?.metaAttribute,
    regularPrice: productDetails?.regularPrice,
    salePrice: productDetails?.salePrice,
  });


  useEffect(() => {
    let changed = false;
    if (productDetails?.stock !== attributeValue.quantity) changed = true;

    if (productDetails?.metaAttribute !== attributeValue.metaAttribute) changed = true;
    if (productDetails?.regularPrice !== attributeValue.price) changed = true;

    if (productDetails?.salePrice !== attributeValue.salePrice) changed = true;
    setChanges(changed);
  }, [attributeValue]);

  useEffect(() => {
    setOrders(productDetails);
  }, [productDetails]);



  useEffect(() => {
    setAttributeValue({
      quantity: productDetails?.stock,

    sponser: productDetails?.metaAttribute,
    regularPrice: productDetails?.regularPrice,

    salePrice: productDetails?.salePrice,
    });
  }, [productDetails]);



  const [attributeEdit, setAttributeEdit] = useState(Array(6).fill(false));

  const handelAttributeValueChange = (e) => {
    const { name, value } = e.target;
    setAttributeValue((prev) => {
      const updatedValue = { ...prev, [name]: value };
      return updatedValue;
    });
  };

  const handelAttributeEdit = (index) => {
    setAttributeEdit((prev) => {
      const updatedValue = [...prev];
      updatedValue.fill(false);
      updatedValue[index] = !prev[index];
      return updatedValue;
    });
  };

 

  const handelProductUpdate = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    const formData = {...attributeValue,attributes:attributeValue.sponser}
    delete formData['sponser'];

    console.log(formData)
    if(changes){
      updateProductInfo(productDetails?.productId,formData)

    }
  };
  

  const handelDrawerClose = (e) => {
    e.stopPropagation();
    e.preventDefault();

    handelProductContainer(index);
  };

  const handelPublishChange = async (e) => {
    e.stopPropagation();
    sleep(500)
    setOrders((prev) => {
      const updatedOrders = { ...prev, published: !prev.published };
      publishAproduct(updatedOrders.productId);
      return updatedOrders;
    });
  };

  return (
    <Collapse in={productContainerIndex[index]}>
      
      {loading ? 
      <div className=" loader">
          <CircularProgress />
      </div>
      :
             

        <div
          className="prduct-drawer-body w-full h-auto bg-white mb-5 cursor-default px-10 pt-8 pb-5"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          <h2 className="font-bold  text-2xl mb-8">Product Details</h2>
          <div className=" flex ">
            <div className="flex-column items-center space-y-3  justify-center float-left ">
              <div
                className="  h-[105px] w-[105px] rounded-full flex items-center justify-center
           p-2 overflow-hidden"
              >
                <img
                  src={productDetails?.imageURL[0]}
                  className="h-28 object-cover "
                />
              </div>

              <div className="product-drawer-value font-semibold text-center text-xl">
                {productDetails?.name}
              </div>
              <div className=" ">
              <button className="Btn3">DELETE</button>
            </div>
            </div>
            <div className=" flex flex-wrap ml-10">
              {/* <div className="flex-column items-start justify-between"> */}
                <Attribute
                  label="Quantity"
                  value={attributeValue.quantity}
                  icon={quantityIcon}
                  handelEdit={() => handelAttributeEdit(0)}
                  edit={attributeEdit[0]}
                  handelChange={handelAttributeValueChange}
                />
                
                <Attribute
                  label="Product Sold"
                  value={productDetails?.productSold || "No Data"}
                  icon={productSoldIcon}
                />
              </div>
              <div className="flex-column items-start justify-between">
                <Attribute
                  label="Sponser"
                  value={attributeValue.sponser}
                  icon={sponserIcon}
                  handelEdit={() => handelAttributeEdit(2)}
                  edit={attributeEdit[2]}
                  handelChange={handelAttributeValueChange}
                />
                <Attribute
                  label="Regular Price"
                  value={attributeValue.regularPrice}
                  icon={priceIcon}
                  handelEdit={() => handelAttributeEdit(3)}
                  edit={attributeEdit[3]}
                  handelChange={handelAttributeValueChange}
                />
                
              </div>

              <div className="flex-column items-start justify-between">
                <Attribute
                  label="Revenue"
                  value={productDetails?.revenue || "No Data"}
                  icon={revenueIcon}
                />
                <Attribute
                  label="Sale Price"
                  value={attributeValue.salePrice}
                  icon={saleIcon}
                  handelEdit={() => handelAttributeEdit(5)}
                  edit={attributeEdit[5]}
                  handelChange={handelAttributeValueChange}
                />
              </div>
              
            {/* </div> */}
          </div>
          <div className="flex items-center my-6 ">
          
            <div className="order-table-row ml-auto">
              <FormControlLabel
                control={
                  <CustomizedSwitch
                    onClick={handelPublishChange}
                    i
                    checked={orders?.published}
                    />
                  }
                  label={orders?.published ? "Published" : "concealed"}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                  }}
                  />
            </div>
          </div>

          <div className="w-full flex items-center justify-end space-x-5">
          <Collapse in={changes} orientation="horizontal">
            <button className="Btn2 " onClick={handelProductUpdate}>COMMIT CHANGES</button>
          </Collapse>
            <button className="Btn3" onClick={handelDrawerClose}>
              Close
            </button>
          </div>
        </div>
        }
    </Collapse>
  );
};

const Attribute = ({ label, value, icon, handelEdit, edit, handelChange }) => {
  return (
    <div className=" w-[190px] border-b-2 py-3 mx-5 my-5 flex-column justify-start">
      <span className="product-drawer-label font-bold text-xl">{label}</span>
      <br />
      <AttributeIcon
        image={icon}
        value={value}
        label={label}
        handelEdit={handelEdit}
        edit={edit}
        handelChange={handelChange}
      />
    </div>
  );
};

const AttributeIcon = ({
  image,
  value,
  label,
  handelEdit,
  edit,
  handelChange,
}) => {
  return (
    <div className=" attribute-icon h-10 w-full flex justify-between items-center ">
      {!edit ? (
        <>
          <span className="product-drawer-value text-slate-400 break-words font-semibold text-lg">
            {truncateString(value,12)}
          </span>
          <div
            className="attribute-value-edit-icon hover:cursor-pointer h-10 w-10
       hover:bg-slate-100 rounded-full flex items-center justify-center ml-5 tooltip relative"
            onClick={(e) => {
              handelEdit();
            }}
          >
            <img src={editIcon} className="  h-5 object-cover" />
            <span className=" tooltiptext">edit {label}</span>
          </div>
          <img src={image} className="h-8 ml-auto" />
        </>
      ) : (
        <div className="flex items-center mt-2">
          <EditProduct
            label={label}
            handelChange={handelChange}
            value={value}
          />

          <IconButton onClick={handelEdit}>
            <CloseIcon />
          </IconButton>
        </div>
      )}
    </div>
  );
};

const EditProduct = ({ label, handelChange, value }) => {

  const [attributes, setAttributes] = useState([]);

  useEffect(() => {
    async function fetchProductAttribites() {
      const response = await getAttributes();
 
      setAttributes(response);
    }
    fetchProductAttribites();
  }
  ,[])
  return (
    <div className=" ">
      {label === "Sponser" ? (
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Sponser</InputLabel>
          <Select
            value={value}
            label="Sponser"
            size="small"
            name={label
              .toLowerCase()
              .replace(/\s(.)/g, ($0) => $0.toUpperCase())
              .replace(/\s/g, "")
              .replace(/^(.)/, ($0) => $0.toLowerCase())}
            onChange={handelChange}
          >
            <MenuItem value={"Not Sponsered"}>Not Sponsered</MenuItem>
            {attributes?.map((attribute) => (
              <MenuItem key={attribute} value={attribute}>{attribute}</MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : (
       
      
      
      <TextField
        id="outlined-basic"
        label={label}
        variant="outlined"
        size="small"
        name={label
          .toLowerCase()
          .replace(/\s(.)/g, ($0) => $0.toUpperCase())
          .replace(/\s/g, "")
          .replace(/^(.)/, ($0) => $0.toLowerCase())}
        fullWidth
        type="number"
        value={value}
        onChange={handelChange}
      />
      )}
    </div>
  );
};

export default ProductDrawer;
