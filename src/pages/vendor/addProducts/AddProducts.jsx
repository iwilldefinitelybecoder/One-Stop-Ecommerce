import React, { useEffect, useState } from "react";
import { ordersListIcon } from "../../../assets/icons/png/user-page-icons/data";
import "./addproduct.css";
import { trashbinIcon } from "../../../assets/icons/png/toolbar1/data";
import { Link, useNavigate, useParams } from "react-router-dom";
import MessagesBox from "../../../components/body/Messages/MessagesBox";
import {
  addProduct,
  getEditProductData,
  getProductDetails,
  updateProductDetails,
} from "../../../service/ProductServices";
import {
  Checkbox,
  CircularProgress,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";
import { getAllWarehouses } from "../../../service/LogisticServices/wareHouseService";
import ExtraAttributes from "./ExtraAttributes";
import { categoryTagMapping } from "../../../data/cartproducts";
import { useComponent } from "../../../context/ComponentProvider";

const AddProducts = () => {
  const inputRef = React.useRef(null);
  const submitRef = React.useRef(null);
  const params = useParams().id;

  const [editProduct, setEditProduct] = useState(false);
  const [errorFields, setErrorFields] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [image, setImage] = useState([]);
  const [tag, setTag] = useState({ name: "", value: "" });
  const [dropField, setDropField] = useState(false);
  const [imagePreview, setImagePreview] = useState([]);
  const [salePriceActive, setSalePriceActive] = useState(false);
  const [viewImage, setViewImage] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [submitform, setSubmitForm] = useState(false);
  const [wareHouse, setWareHouse] = useState([]);
  const [extraAttributes, setExtraAttributes] = useState([{}]);
  const [productTagsList, setProductTagsList] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const navigate = useNavigate();
  const {loadProgress, setLoadProgress} = useComponent();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    stock: 0,
    tags: [],
    regularPrice: 0,
    images: [],
    salePrice: 0.0,
    brand: "",
    extraAttributes: {},
    wareHouse: "",
    thumbnail: null,
  });

  useEffect(() => {
    clearForm();
  }, [params]);
  
  useEffect(() => {
    setProductTagsList(categoryTagMapping[formData.category]);
    setFormData((prev) => ({ ...prev, tags: [] }));
  }, [formData.category]);

  useEffect(() => {
    const newArr = categoryTagMapping[formData.category]?.filter(
      (tag) => !formData?.tags?.includes(tag)
    );
    setProductTagsList(newArr);
  }, [formData.tags]);

  useEffect(() => {
    if (params !== undefined) {
      async function getProduct() {
        let product = await fetchProductDetails(params);
        setEditProduct(true);
        feedDataToForm(product);
      }

      getProduct();
    }
  }, [params]);

  useEffect(() => {
    async function getWareHouse() {
      let wareHouse = await getAllWarehouses();
      setWareHouse(wareHouse);
    }
    getWareHouse();
  }, []);



  const fetchProductDetails = async (params) => {
    return await getEditProductData(params);
  };

  const clearForm = () => {
    setFormData({
      name: "",
      category: "",
      description: "",
      stock: "",
      tags: "",
      regularPrice: "",
      images: [],
      salePrice: 0.0,
      extraAttributes: {},
      wareHouse: "",
      brand: "",
      thumbnail: null,
    });
    setExtraAttributes([{}]);
    setImage([]);
    handeDragClose();
    setOldImages([]);
    setEditProduct(false);
    setSalePriceActive(false);
  };

 
  const feedDataToForm = (product) => {
    setFormData({
      name: product?.name,
      category: product?.category,
      description: product?.description,
      stock: product?.stock,
      regularPrice: product?.regularPrice,
      salePrice: product?.salePrice || 0,
      wareHouse: product?.wareHouseId,
      brand: product?.brand,
      thumbnail: product?.thumbnail,
      tags: product?.tags,
    });
    setExtraAttributes(
      product?.extraObjects !== null? extraAttributeToFields(product?.extraObjects) : [{}]
    );
    
    setOldImages(product?.image);

    setTag({ name: "tags", value: product?.tags });
    setSalePriceActive(product?.salePrice !== 0);
  };

  const handelDragOpen = (e) => {
    setDropField(true);
  };

  const handeDragClose = (e) => {
    setDropField(false);
  };

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

  const extraAttributeToFields = ( attributes) =>{
    let arr = [{}];
    Object.entries(attributes).forEach(([key,value],index)=>{
        if(Object.keys(arr[arr.length -1]).length >1){
            const newObj = { [key]:value}
            arr.push(newObj);
        }else{
            const newObj = { [key]:value}
            arr[arr.length-1] = {...arr[arr.length-1],...newObj};
        }
    })
        return arr;
};

  const handelOldImageOpen = (e, index) => {
    setViewImage(true);
    setImagePreview(oldImages[index]);
  };

  const closeImageViewer = () => {
    setViewImage(false);
    setImagePreview([]);
  };

  const handelInputClick = (e) => {
    e.preventDefault();
    let timerId;
    clearTimeout(timerId);
    if (image.length > 4 || image.length + oldImages.length > 4) {
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

  const handelDelete = (index) => {
    setImage((prev) => prev.filter((img, i) => i !== index));
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((img, i) => i !== index),
    }));
  };

  const handelOldImageDelete = (index) => {
    setOldImages((prev) => prev.filter((img, i) => i !== index));
  };

  const handelFormImgChange = (file) => {
    setFormData((prev) => ({
      ...prev,
      images: Array.isArray(formData.images)
        ? [...formData.images, ...file]
        : [...file],
    }));
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

  const handelformChange = (e) => {
    const { name, value } = e.target;
    if (errorFields[name] !== undefined) {
      setErrorFields((prev) => ({ ...prev, [name]: "" }));
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handelSalePriceCheck = (e) => {
    setFormData((prev) => ({
      ...prev,
      salePrice: 0.0,
    }));
  };

  const handelTagsInput = (e) => {
    e.preventDefault();
    if (errorFields.tags !== undefined) {
      setErrorFields((prev) => ({ ...prev, tags: "" }));
    }
    const { name, value } = e.target;
    setTag({ name, value });
  };

  const handelTagsAdd = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    if (value === "") {
      setErrorFields((prev) => ({ ...prev, tags: "Please enter a tag" }));
      return;
    }
    if (errorFields.tags !== undefined) {
      setErrorFields((prev) => ({ ...prev, tags: "" }));
    }
    setFormData((prev) => ({
      ...prev,
      [name]: Array.isArray(prev.tags) ? [...prev.tags, value] : [value],
    }));
   
  };

  const handelTagsDelete = (e, index) => {
    e.preventDefault();

    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));
  };

  const fillExtraAttributes = (e) => {
    const combinedObject = {};
    extraAttributes.forEach((item) => {
      if (typeof item === "object" && item !== null) {
        Object.assign(combinedObject, item);
      }
    });

    return JSON.stringify(combinedObject);
  };

  async function postFormData() {
  
    const formsData = new FormData();
    formsData.append("name", formData.name);
    formsData.append("category", formData.category);
    formsData.append("description", formData.description);
    formsData.append("stock", formData.stock);
    formsData.append("tags", formData.tags);
    formsData.append("regularPrice", formData.regularPrice);
    formsData.append("salePrice", formData.salePrice);
    formsData.append("wareHouseId", formData.wareHouse);
    formsData.append("brand", formData.brand);
    formsData.append("extraAttributes", fillExtraAttributes());
    if (
      typeof formData.thumbnail === "string" &&
      formData.thumbnail.length > 1
    ) {
      formsData.append("thumbnail", formData?.thumbnail);
    } else if (formData.thumbnail !== null) {
      formsData.append(
        "thumbnailFile",
        formData.images[parseInt(formData?.thumbnail)]
      );
    }
    if(formData?.images?.length > 0){
    formData.images.forEach((img) => {
      formsData.append("images", img);
    });
  }

    let response;

    if (editProduct) {
      formsData.append("existingImages", oldImages);
      // handleLoadProgress(true);
      setLoading(true);
      response = await updateProductDetails(params, formsData);
      setLoading(false);
      // setLoadProgress(100);
    } else {
      // handleLoadProgress(true);
      setLoading(true);
      response = await addProduct(formsData);
      setLoading(false);
      // setLoadProgress(100);
    }
    if (response ==="SUCCESS" ) {
      setResponseMessage("successfully added product");
      setTimeout(() => {
        clearForm();
        navigate("/vendor/products");
      }, 3000);
      setFormSubmitted(true);
      let timerId;
      timerId !== null && clearTimeout(timerId);
      timerId = setTimeout(() => {
        setFormSubmitted(false);
      }, 10000);
    }else{
      setResponseMessage("Something went wrong");
      setFormSubmitted(false);    
    }
  
  }

  const formErrorHandelling = (e) => {
    let errorList = {};
    e.preventDefault();

    if (formData.name === null || formData.name === "") {
      errorList.name = "Please enter a name";
    }
    if (formData.category === null || formData.category === "") {
      errorList.category = "Please select a category";
    }
    if (formData.description === null || formData.category === "") {
      errorList.description = "Please enter a description";
    }
    if (formData.stock === 0 || formData.stock === "") {
      errorList.stock = "Please enter a stock";
    }
    if (formData.tags === null || formData.category === "") {
      errorList.tags = "Please enter a tags";
    }
    if (formData.regularPrice === 0 || formData.regularPrice === "") {
      errorList.regularPrice = "Please enter a regular price";
    }
    if (formData.images?.length === 0) {
      errorList.images = "Please upload a image";
    }
    if (
      (salePriceActive && formData.salePrice === 0) ||
      formData.salePrice === ""
    ) {
      errorList.salePrice = "Please enter a sale price";
    }
    if (
      salePriceActive &&
      parseFloat(formData.salePrice) > parseFloat(formData.regularPrice)
    ) {
      errorList.salePrice = "Sale price cannot be greater than regular price";
    }
    if (formData.brand === null || formData.brand === "") {
      errorList.brand = "Please enter a brand";
    }
    if (formData.wareHouse === null || formData.wareHouse === "") {
      errorList.wareHouse = "Please select a warehouse";
    }
    if (
      wareHouse?.find((item) => item.warehouseId === formData.wareHouse)
        ?.storageLeft < formData.stock
    ) {
      errorList.stock = "Stock cannot be greater than warehouse storage";
    }
    if(editProduct && [...oldImages,...image].length === 0){
      errorList.images = "Please upload a image";
    }
    setErrorFields(errorList);
    return errorList;
  };
  

  const handelFormSumbit = (e) => {
    e.preventDefault();

    const errorList = formErrorHandelling(e);

    if (Object.keys(errorList).length === 0) {
      setSubmitForm(true);
      postFormData();
      
    }
  };

  const handleLoadProgress = (load) => {
    let timerId;
  
    const updateProgress = () => {
      setLoadProgress((prev) => prev + 1);
    };
  
    const stopTimer = (timerId) => {
      clearInterval(timerId);
      setLoadProgress(100);
    };
  
    if (load) {
      timerId = setInterval(updateProgress, 1000);
  
      // Stop the timer when progress reaches 70
      if (loadProgress === 70) {
        console.log("stopping");
        stopTimer(timerId);
      }
    } else {
      stopTimer(timerId);
    }
  };

 
  const handelSubmitButton = () => {
    submitRef.current.click();
  };

  return (
    <>
      {formSubmitted ? <MessagesBox newMessage={responseMessage} /> : null}
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
      <div className="ad-product-main-cntr py-3 ">
        <div className="ad-prdct-hdr">
          <div className="ad-prdct-title flex">
            <img src={ordersListIcon} className="h-8 mr-3" />
            <span className="text-2xl font-bold ">Add Product</span>
          </div>
          <div className="back-btn">
            <Link to="/vendor/products">
              <button className="Btn">Back to Product List</button>
            </Link>
          </div>
        </div>
        <div className="ad-prdct-body relative">
          {
            loading &&
          <div className=" absolute flex justify-center items-center bg-white z-[2] opacity-40 inset-0">
            <CircularProgress/>
          </div>
          }
          <form onSubmit={handelFormSumbit}>
            <div className="name-cat-div">
              <div className="name-div">
                <label htmlFor="name font-semibold">Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  onChange={handelformChange}
                  value={formData.name}
                />
                {errorFields.name && (
                  <span className=" ml-4 text-red-500 font-semibold">
                    *Name is Required
                  </span>
                )}
              </div>

              <div className="name-div">
                <label htmlFor="name font-semibold">Brand</label>
                <input
                  type="text"
                  name="brand"
                  placeholder="Brand"
                  onChange={handelformChange}
                  value={formData.brand}
                />
                {errorFields.brand && (
                  <span className=" ml-4 text-red-500 font-semibold">
                    *Brand is Required
                  </span>
                )}
              </div>
            </div>
            <div className="upload-img-container mb-4">
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
                  <div className="img-type-size ">
                    <span className="text-xs text-slate-400">
                      Upload 280 * 280 image
                    </span>
                  </div>
                </div>
              </div>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="thumbnail"
                defaultValue={formData.thumbnail}
                onChange={handelformChange}
                sx={{
                  display: "flex",
                  flexWrap: "wrap",

                  flexDirection: "column",
                  margin: "0px 10px",
                }}
              >
                {image?.length !== 0 && (
                  <div className="img-display-field space-y-2 mb-5">
                    <span className=" font-semibold">
                      Select An Image for Thumbnail
                    </span>
                    <div className="flex flex-wrap">
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
                    </div>
                  </div>
                )}
                {oldImages?.length !== 0 && (
                  <div className="img-display-field space-y-2">
                    <span className=" font-semibold">Existing Images</span>
                    <div className="flex flex-wrap">
                      {oldImages?.map((img, index) => {
                        return (
                          <div
                            className="img-cntr px-5 hover:bg-slate-100 hover:rounded-md flex-col py-2 h-24 w-40
                         mx-3 mb-4 "
                            key={index}
                            onDoubleClick={(e) => {
                              handelOldImageOpen(e, index);
                            }}
                          >
                            <FormControlLabel
                              value={img}
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
                                src={img}
                                alt=""
                                className="uploaded-img h-16"
                              />
                            </div>

                            <div
                              className="delete-img-icon"
                              title="delete-img"
                              onClick={(e) => {
                                handelOldImageDelete(index);
                              }}
                            >
                              <img src={trashbinIcon} className="h-4" />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </RadioGroup>

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
            <div className="description-area">
              <div className="description-title">
                <label htmlFor="description">Product description</label>
              </div>
              <div className="descreption-field">
                <textarea
                  name="description"
                  onChange={handelformChange}
                  value={formData.description}
                  rows={6}
                  style={{ padding: "15px" }}
                ></textarea>
              </div>
              {errorFields.description && (
                <span className=" ml-4 text-red-500 font-semibold">
                  *write product description
                </span>
              )}
            </div>
            <div className="stock-tag-div">
              <div className="stock-div">
                <div className="stock-div">
                  <label htmlFor="stock">Stock</label>
                  <input
                    type="number"
                    name="stock"
                    placeholder="Stock"
                    onChange={handelformChange}
                    value={formData.stock}
                  />
                </div>
                {errorFields.stock && (
                  <span className=" ml-4 text-red-500 font-semibold">
                    {errorFields.stock}
                  </span>
                )}
              </div>

              <div className="cat-div">
                <label htmlFor="category">Category</label>
                <Select
                  sx={{
                    marginBottom: 2,
                    maxWidth: 408,
                    width: "100%",
                    height: 45,
                    marginTop: 0.5,
                    borderRadius: 2,
                    border: "1px solid #e5e5e5",
                    ":focus": { border: "1px solid #e5e5e5" },
                  }}
                  placeholder="Select a Category"
                  name="category"
                  onChange={handelformChange}
                  value={formData.category}
                >
                  <MenuItem value="Apparel & Accessories">
                    Apparel & Accessories
                  </MenuItem>

                  <MenuItem value="style & Fashion">style & Fashion</MenuItem>
                  <MenuItem value="home & Gardening">home & Gardening</MenuItem>
                  <MenuItem value="Health & Wellness">
                    Health & Wellness
                  </MenuItem>
                  <MenuItem value="medical Health">medical Health</MenuItem>
                  <MenuItem value="Children & Infant">
                    Children & Infant
                  </MenuItem>
                  <MenuItem value="Electronic Goods">Electronic Goods</MenuItem>
                </Select>
                {errorFields.category && (
                  <span className=" ml-4 text-red-500 font-semibold">
                    *Select Catrgory
                  </span>
                )}
              </div>
            </div>
            <div className="price-sale-div">
              <div className="reg-price-div">
                <div className="price-div">
                  <label htmlFor="reg-price">Regular Price</label>
                  <input
                    type="number"
                    name="regularPrice"
                    placeholder="Regular price"
                    onChange={handelformChange}
                    value={formData.regularPrice}
                  />
                </div>
                {errorFields.regularPrice && (
                  <span className=" ml-4 text-red-500 font-semibold">
                    *Regular Price is Required
                  </span>
                )}
              </div>
              <Checkbox
                sx={{ ":hover": { backgroundColor: "#FFF" }, marginBottom: 5 }}
                name="sale-price"
                checked={salePriceActive}
                onClick={(e) => {
                  setSalePriceActive(!salePriceActive);
                  handelSalePriceCheck(e);
                }}
                // <input
                //   type="checkbox"
                //   name="sale-price"
                //   checked={salePriceActive}
                //   onChange={(e) => {
                //     setSalePriceActive(!salePriceActive);
                //     handelSalePriceCheck(e);
                //   }}
              />
              <div className="sale-div">
                <div className="sale-div">
                  <div>
                    <label htmlFor="sale-price">Sale Price</label>
                  </div>
                  <input
                    type="number"
                    name="salePrice"
                    placeholder="sale price"
                    disabled={!salePriceActive}
                    value={formData.salePrice}
                    onChange={handelformChange}
                  />
                </div>
                {errorFields.salePrice && (
                  <span className=" ml-4 text-red-500 font-semibold">
                    {errorFields.salePrice}
                  </span>
                )}
              </div>
            </div>
            <div className="stock-tag-div">
              <div className="sale-div">
                <div className="sale-div">
                  <div>
                    <label htmlFor="sale-price">WareHouse</label>
                  </div>
                  <Select
                    disabled={editProduct}
                    sx={{
                      marginBottom: 2,
                      maxWidth: 408,
                      width: "100%",
                      height: 45,
                      borderRadius: 2,
                      border: "1px solid #e5e5e5",
                      ":focus": { border: "1px solid #e5e5e5" },
                    }}
                    placeholder="Select a Warehouse"
                    name="wareHouse"
                    value={formData.wareHouse}
                    onChange={handelformChange}
                  >
                    {wareHouse?.map((item, index) => {
                      return (
                        <MenuItem value={item.warehouseId} key={index}>
                          {item.wareHouseName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  {formData.wareHouse !== "" && !editProduct && (
                    <span className=" font-semibold">
                      {
                        wareHouse?.find(
                          (item) => item.warehouseId === formData.wareHouse
                        )?.storageLeft
                      }
                      &nbsp;Storage Space Left
                    </span>
                  )}
                </div>
                {errorFields.wareHouse && (
                  <span className=" ml-4 text-red-500 font-semibold">
                    {errorFields.wareHouse}
                  </span>
                )}
              </div>
              <div className="tag-div relative">
                <div className="tag-div">
                  <label htmlFor="tag">Tags</label>
                  <Select
                    sx={{
                      marginBottom: 2,
                      maxWidth: 408,
                      width: "100%",
                      height: 45,
                      borderRadius: 2,
                      border: "1px solid #e5e5e5",
                      ":focus": { border: "1px solid #e5e5e5" },
                    }}
                    placeholder="Select a Warehouse"
                    name="tags"
                    value={tag?.value}
                    onChange={handelTagsAdd}
                  >
                    {productTagsList?.map((item, index) => {
                      return (
                        <MenuItem value={item} key={index}>
                          {item}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </div>
                {errorFields.tags && (
                  <span className=" ml-4 text-red-500 font-semibold">
                    *type some tags
                  </span>
                )}

                {/* <div className="add-tag-btn absolute">
                  <button className="shadow-none Btn" onClick={handelTagsAdd}>
                    Add
                  </button>
                </div> */}
                <div className="tags-list-cntr flex flex-wrap px-2 items-center  m-2">
                  {Array.isArray(formData.tags) &&
                    formData.tags.map((tag, index) => {
                      return (
                        <div
                          className="actual-tags shadow-md flex items-center "
                          key={index}
                        >
                          <div className="tag-dot">
                            <div className="dot"></div>
                          </div>
                          <div className="tag-name">
                            <span>{tag}</span>
                          </div>
                          <div
                            className="close-tag hover:cursor-pointer hover:bg-light-pink"
                            onClick={(e) => handelTagsDelete(e, index)}
                          >
                            x
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
            <ExtraAttributes
              extraAttributes={extraAttributes}
              setExtraAttributes={setExtraAttributes}
              errorFields={errorFields}
              setErrorFields={setErrorFields}
            />
            <div className="btn-div">
              <input
                ref={submitRef}
                type="submit"
                style={{ display: "none" }}
              />
              <button className="Btn" onClick={(e) => handelSubmitButton(e)}>
                {editProduct ? "Update Product" : "Add Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProducts;
