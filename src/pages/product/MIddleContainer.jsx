import React, { useEffect, useState } from "react";
import useProducts from "../../CustomHooks/ProductsHook";
import ReviewContainer from "../../components/body/ReviewContainer";
import { LinearProgress } from "@mui/material";
import NumberCount from "../../components/body/UtilsComponent/NumberCount";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@material-ui/core";
import { char0ToUpper, formatNumber } from "../../utils/utils";

const MIddleContainer = ({ productInfo }) => {
  const [activeTab, setActiveTab] = useState("description");
  const { reviews, loading,getAllproductsReview } = useProducts();
  const review = [
    {
      id: 1,
      firstName: "Sai",
      lastName: "Kiran",
      profileIconId: 1,
      review: "This is a review",
      date: "2021-10-13T06:56:55.000Z",
      rating: 4,
    },
    {
      id: 1,
      firstName: "Sai",
      lastName: "Kiran",
      profileIconId: 1,
      review: "This is a review",
      date: "2021-10-13T06:56:55.000Z",
      rating: 4,
    },
  ];

  useEffect(() => {
    getAllproductsReview(productInfo?.productId);
  }, [productInfo]);

  return (
    <div>
      <div className="facet-control ">
        <div className="facet-title flex border-b-[1px] border-b-slate-300 px-4 space-x-10 transition-all">
          <div
            className={`font-semibold text-xl py-2 ${
              activeTab === "description"
                ? "text-light-pink border-b-2 border-b-light-pink"
                : "text-slate-400 border-b-2 border-b-transparent"
            }`}
          >
            <button
              onClick={() => {
                setActiveTab("description");
              }}
            >
              <span>Description</span>
            </button>
          </div>
          <div
            className={`font-semibold text-xl py-2 ${
              activeTab === "reviews"
                ? "text-light-pink border-b-2 border-b-light-pink"
                : "text-slate-400 border-b-2 border-b-transparent"
            } `}
          >
            <button
              onClick={() => {
                setActiveTab("reviews");
              }}
            >
              <span className="flex">
                Review&#40;
                {formatNumber(productInfo?.numberOfRatings)}
                &#41;
              </span>
            </button>
          </div>
        </div>

        <div>
          <div
            className={`description ${
              activeTab === "description" ? "block" : "hidden"
            }`}
          >
            <div className="description-title  py-5 px-4 pb-5 ">
              <span className="font-semibold text-xl">Technical Details</span>
            
              {
                productInfo?.extraAttributes !== null?
              
                <TableContainer
                  style={{ width: "500px", border: "1px solid black" }}
                  className=" rounded-lg my-3"
                  component={Paper}
                >
                  <Table aria-label="simple table">
                    <TableBody>
                      { productInfo?.specifications && 
                      Object.entries(productInfo?.specifications)?.map(
                        ([key, value], index) => {
                          return (
                            <TableRow key={index}>
                              <TableCell className="bg-slate-100" align="left">
                                <span className=" text-slate-500">
                                  {char0ToUpper(key)}
                                </span>
                              </TableCell>
                              <TableCell align="left">
                                <span className=" font-semibold">
                                  {char0ToUpper(value)}
                                </span>
                              </TableCell>
                            </TableRow>
                          );
                        }
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
                :
                <div className=" w-full h-[70vh]  flex justify-center items-center">
                  <span className=" font-semibold text-2xl">No Technical Details</span>
                </div>
              }
       
            </div>
           
          </div>
          <div
            className={`reviews  ${
              activeTab === "reviews" ? "block" : "hidden"
            } w-[100%] h-[100%] `}
            id="reviews-cntr"
          >
            <div className="reviews-body px-4">
              {loading ? (
                <div className=" w-full h-full flex justify-center items-center">
                  <LinearProgress color="secondary" />
                </div>
              ) : reviews?.length === 0 ? (
                <div className=" w-full h-[70vh]  flex justify-center items-center">
                  <span className=" font-semibold text-2xl">No Reviews</span>
                </div>
              ) : (
                <div className=" my-3 h-[432px] overflow-scroll">
                  {review?.map((review, index) => {
                    return (
                      <div key={index} className=" px-2 py-3">
                        <ReviewContainer key={index} review={review} />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



export default MIddleContainer;
