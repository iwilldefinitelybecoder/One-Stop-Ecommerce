import React, { useEffect, useRef, useState } from "react";
import { TextField, Rating, Button, Grid, Dialog, CircularProgress } from "@mui/material";
import { flashIcon } from "../../assets/icons/png/Rareicons/data";
import { Link, useNavigate, useParams } from "react-router-dom";
import { formatDateFromTimestamp, formatOrderedDate, truncateString } from "../../utils/DisplayFormatters";
import UploadTray from "./UploadTray";
import useProducts from "../../CustomHooks/ProductsHook";
import { sleep } from "../../utils/utils";
import {
  doesReviewExist,
  getReviewData,
  getWriteReviewMetaInfo,
  validateReview,
  validateReviewExist,
} from "../../service/ProductServices";
import { userIcon } from "../../assets/icons/png/toolbar1/data";

function ReviewSubmission() {
  const purchaseId = useParams().id;
  const [open, setOpen] = useState(false);
  const [errorFields, setErrorFields] = useState({});
  const { addProductReview } = useProducts();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const ratingRef = useRef(null);
  const headlineRef = useRef(null);
  const reviewTextRef = useRef(null);
  const [reviewSubmit, setReviewSubmit] = useState(false);
  const [productDetails,setproductDetails] = useState({});
  const [reviewData, setReviewData] = useState({
    rating: 0,
    headline: "",
    reviewText: "",
    images: [],
  });

  useEffect(() => {
    async function fetchReview() {
      if (purchaseId) {
        setLoading(true);
        const response = await doesReviewExist(purchaseId);
        
        if (response === "invalid") {

          const review = await getReviewData(purchaseId);
          setReviewSubmit(true);
          if(ratingRef.current){
          ratingRef.current.disabled = true;
          headlineRef.current.disabled = true;
          reviewTextRef.current.disabled = true;
          } 
          setReviewData({
            rating: review.rating,
            headline: review.headline,
            reviewText: review.reviewText,
            images: review.images,
          });
          setproductDetails(review);
          await sleep(500);
          setLoading(false);

          // sleep(7000);
          // navigate("/");
        }else {
          const response1  = await getWriteReviewMetaInfo(purchaseId)
          setReviewSubmit(false);
          setproductDetails(response1);
          await sleep(500);
          setLoading(false);
        }
      }
    }
    fetchReview();
  }, []);

 

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handelformChange = (e) => {
    const { name, value } = e.target;
    if (errorFields[name] !== undefined) {
      setErrorFields((prev) => ({ ...prev, [name]: "" }));
    }

    setReviewData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handelSubmit = async () => {
    const errorFields = {};
    if (reviewData.rating === 0) {
      errorFields.rating = "Please select a rating";
      if (reviewData.headline === "") {
        errorFields.headline = "Please enter a headline";
      }
      if (reviewData.reviewText === "") {
        errorFields.reviewText = "Please enter a review";
      }
    }
    setErrorFields(errorFields);

    if (Object.keys(errorFields).length === 0) {
      const formData = new FormData();
      formData.append("rating", reviewData.rating);
      formData.append("headline", reviewData.headline);
      formData.append("review", reviewData.reviewText);
      formData.append("productId", productDetails.productId);
      formData.append("purchaseId",purchaseId);
      reviewData.images.forEach((img) => {
        formData.append("reviewImages", img);
      });

      const response = await addProductReview(formData);
      console.log(response)
      if (response === "success") {
        setReviewSubmit(true);
        ratingRef.current.disabled = true;
        headlineRef.current.disabled = true;
        reviewTextRef.current.disabled = true;
        await sleep(7000);
        navigate("/");
      }
    }
  };

  return (
    <div
      style={{ margin: "20px auto", maxWidth: "1230px" }}
      className=" bg-white rounded-lg shadow-md flex justify-center"
    >
        {
            loading ?
        <div className=" w-full h-[70vh] flex justify-center items-center">
            <CircularProgress />
        </div>
        :
      <div className=" ">
        <div style={{ backgroundColor: "white", padding: "20px" }}>
          <h1 className="h1-text">{reviewSubmit?"Your Review":"Create Review"}</h1>
          <div className="border-b-2 pb-4">

          <div className="product-detail flex items-center space-x-3 m-4  py-4">
            <div className="product-img p-3 w-36 h-36  flex items-center justify-center ">
              <img src={productDetails?.productImage} alt="" className="object-cover" />
            </div>
            <div>
              <Link to={`/product/${productDetails?.productId}`}>
                <span className="font-semibold hover:underline hover:cursor-pointer ">
                  {truncateString(
                    productDetails?.productName,
                    90
                  )}
                </span>
              </Link>
            </div>
          </div>
          <span className=" text-slate-400 italic font-semibold">Purchased On</span><span className="font-semibold">&nbsp;{formatOrderedDate(11231209831)}</span>
          </div>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <div className=" border-b-2  py-4">
                  <h2 className="font-semibold text-lg">Rate The Product</h2>
                  <div className="flex items-center justify-between ">
                    <div className="flex items-center">
                      <Rating
                        name="rating"
                        value={reviewData.rating}
                        size="large"
                        readOnly={reviewSubmit}
                        ref={ratingRef}
                        onChange={(event) => {
                          handelformChange(event);
                        }}
                      />
                      <span className="ml-4 text-gray-600 font-semibold">
                        {reviewData.rating === "1" &&
                          "Poor quality, not recommended"}
                        {reviewData.rating === "2" && "Below average product"}
                        {reviewData.rating === "3" &&
                          "Decent product, meets expectations"}
                        {reviewData.rating === "4" &&
                          "Good product, satisfied with purchase"}
                        {reviewData.rating === "5" &&
                          "Excellent product, highly recommended"}
                      </span>
                    </div>
                    {
                      !reviewSubmit &&
                    <Button
                    variant="outlined"
                    color="primary"
                    ref={ratingRef}
                    style={{ borderColor: "#e94560", color: "#e94560" }}
                    onClick={() => {
                      setReviewData((prev) => ({ ...prev, rating: 0 }));
                    }}
                    >
                      Clear
                    </Button>
                    }
                  </div>
                  {errorFields.rating && (
                    <span className="ml-4 text-red-500 font-semibold">
                      {errorFields.rating}
                    </span>
                  )}
                </div>
              </Grid>
              <Grid item xs={12}>

                {reviewSubmit? (
                    <Grid container spacing={3} justifyContent="center">
                        {
                  reviewData?.images?.map((imageUrl, index) => (
                    <Grid item key={index}>
                      <img
                        src={imageUrl}
                        alt={`Image ${index}`}
                        style={{
                          width: "200px",
                          height: "200px",
                          objectFit: "cover",
                        }}
                      />
                    </Grid>
                  ))
                }
                    </Grid>
                ) : (
                  <UploadTray
                    formData={reviewData}
                    setFormData={setReviewData}
                  />
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Add a headline"
                  variant="outlined"
                  fullWidth
                  ref={headlineRef}
                  name="headline"
                  value={reviewData.headline}
                  onChange={handelformChange}
                  InputProps={{ style: { borderColor: "#e94560" }, readOnly: reviewSubmit }}
                  InputLabelProps={{
                    shrink: true,
                    focused: false,
                    style: { color: "#e94560" },
                  }}
                />
                {errorFields.headline && (
                  <span className="ml-4 text-red-500 font-semibold">
                    {errorFields.headline}
                  </span>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Add a written review"
                  multiline
                  rows={4}
                  name="reviewText"
                  variant="outlined"
                  ref={reviewTextRef}
                  fullWidth
                  value={reviewData.reviewText}
                  onChange={handelformChange}
                  InputProps={{ style: { borderColor: "#e94560" }, readOnly: reviewSubmit }}
                  InputLabelProps={{
                    shrink: true,
                    focused: false,
                    style: { color: "#e94560" },
                  }}
                />
                {errorFields.reviewText && (
                  <span className=" ml-4 text-red-500 font-semibold">
                    {errorFields.reviewText}
                  </span>
                )}
              </Grid>
              {/* ...other form fields */}
              <Grid item xs={12}>
                <Button
                  type="submit"
                  disabled={reviewSubmit}
                  variant="contained"
                  style={{ backgroundColor: "#e94560" }}
                  onClick={() => handelSubmit()}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
          <div>
            {reviewSubmit && (
              <div className="flex flex-col items-center justify-center space-y-4">
                <h1 className="text-2xl font-semibold">
                  Thank you for your review
                </h1>
                <Link to="/">
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "#e94560" }}
                    onClick={() => setOpen(false)}
                  >
                    Home
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
}
    </div>
  );
}

export default ReviewSubmission;
