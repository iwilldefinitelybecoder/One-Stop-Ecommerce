import React, { useEffect, useState } from "react";
import useProducts from "../../CustomHooks/ProductsHook";
import { LinearProgress } from "@mui/material";
import { Rating } from "@mui/material";
import { getTimeDifference } from "../../utils/validateDate";
import { fetchUserIcon } from "../../service/AuthenticateServices";

const ReviewContainer = ({ review }) => {
  let [userIcon, setUserIcon] = useState(null);
  const [urlLink, setUrlLink] = useState(null);

  useEffect(() => {
    async function fetchUserIconn() {
      const blob = await fetch(
        `http://localhost:8000/api/v1/user/getprofileicon/${review.profileIconId}`
      ).then((r) => r.blob());

      setUrlLink(URL.createObjectURL(blob));
    }
    fetchUserIconn();
  }, []);
  

  return (
    <div
      className=" review-cntr  bg-white px-3 pt-5 pb-5 h-auto rounded-md ring-light-pink ring-1 items-start justify-center "
      style={{ display: "flex", flexDirection: "column" }}
    >
      <div className=" flex space-x-3 ">
        <div className="user-profile-icon h-12 w-12 flex items-center justify-center rounded-full overflow-hidden  ring-1 ring-slate-200">
          <img src={urlLink} alt="" className=" h-16 object-contain" />
        </div>
        <div>
          <div className="flex">
            <span className="text-lg font-semibold">
              {review?.firstName}&nbsp;
            </span>
            <span className="text-lg font-semibold">{review?.lastName}</span>
          </div>
          <div className=" flex space-x-2">
            <Rating name="read-only" value={review?.rating} readOnly />
            <span className=" font-semibold">&#40;{review?.rating}&#41;</span>
            <span className=" text-slate-400">
              {getTimeDifference(review?.date)}
            </span>
          </div>
        </div>
      </div>
      <div className="review-description mt-5">
        <span className=" pb-2 font-semibold ">{review?.headline}</span><br />
        <p className=" text-slate-600 pt-1">{review?.review}</p>
      </div>
    </div>
  );
};

export default ReviewContainer;
