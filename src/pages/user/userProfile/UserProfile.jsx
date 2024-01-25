import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { editIcon, userIcon } from "../../../assets/icons/png/toolbar1/data";
import { CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import { EditProfileIcon, ProfileIcon } from "../../../components/headerLayout/toolbar/ProfileBtn";
import NumberCount from "../../../components/body/UtilsComponent/NumberCount";
import { formatNumber } from "../../../utils/utils";
import { rightArrowIcon2 } from "../../../assets/icons/png/user-page-icons/data";
import { convertToTimestamp, formatDateFromTimestamp } from "../../../utils/DisplayFormatters";
import AccountProvider, { AccountContext } from "../../../context/AccountProvider";
import { fetchUserIcon } from "../../../service/AuthenticateServices";
import { cameraIcon } from "../../../assets/icons/png/toolbar-icons/data";
import { getOrderInfo, getUserInfo } from "../../../service/CustomerServices/CustomerServices";

function UserProfile() {
  const params = useParams();
  const {account} = useContext(AccountContext)
  const [orderInfo,setOrderInfo] = useState();
  const [userInfo,setUserInfo] = useState();
  const [loading,setLoading]  = useState(false);

  useEffect(()=>{
    async function fetchOrdersInfo(){
      setLoading(true);
    const response = await getOrderInfo();
   
    setOrderInfo(response);
    setLoading(false);
    }
    fetchOrdersInfo();
  },[])

  useEffect(()=>{
    async function fetchUserDetails(){
      setLoading(true);
      const response = await getUserInfo();
      setUserInfo(response)
      setLoading(false);
    }
    fetchUserDetails();
  },[])


  return (
    <>
      {loading ? (
        <div className=" h-[100vh] w-full flex justify-center items-center">
          <CircularProgress />
        </div>
      ) : (
        <>
          <div className=" w-full  py-3">
            <div className="ad-prdct-hdr">
              <div className="ad-prdct-title flex">
                <img src={userIcon} className="h-8 mr-3" />
                <span className="text-2xl font-bold ">My Profile</span>
              </div>
              <div className="back-btn">
                <Link to="/user/edit-profile">
                  <button className="Btn">Edit Profile</button>
                </Link>
              </div>
            </div>
            <div className=" flex my-8  ">
              <div className=" user-details-div flex bg-white items-center  shadow-md rounded-md px-3   py-5 space-x-10 min-w-[420px]">
                <div className=" flex space-x-3 items-center">
                  <div className="profile-icon h-16 w-20">
                    <UserProfileIcon image={account.userIcon}  />
                  </div>
                  <div>
                    <div className=" user-name-div flex font-semibold">
                      <span>{userInfo?.firstName}</span>&nbsp;
                      <span>{userInfo?.lastName}</span>
                    </div>
                    <div className="flex">
                      <span className=" text-sm text-slate-500">Balance:</span>
                      <span className=" text-sm text-light-pink">₹{userInfo?.walletBalance}</span>
                    </div>
                  </div>
                </div>
                <div className="customer-type">
                  <span className=" uppercase tracking-wider font-medium text-slate-400">
                    {userInfo?.membership}
                  </span>
                </div>
              </div>
              <div className=" flex ml-5">

              <InfoBox content={orderInfo?.allOrders || "00"} subContent={'All Orders'} height={'114px'} width={'105px'} />
              <InfoBox content={orderInfo?.awaitingPayment || "00"} subContent={'Awaiting Payments'} height={'114px'} width={'105px'} />
              <InfoBox content={orderInfo?.awaitingShipment || "00"} subContent={'Awaiting Shipment'} height={'114px'} width={'105px'} />
              <InfoBox content={orderInfo?.awaitingDelivery || "00"} subContent={'Awaiting Delivery'} height={'114px'} width={'105px'} />
              </div>


            </div>
          </div>
          <div className="order-table-rows shadow-md py-12 pl-5 " >
                <div className="order-table-row w-32 ">
                  <span className=" text-sm text-slate-400">First Name</span><br />
                  <span className="font-semibold text-lg text-slate-600">{userInfo?.firstName}</span>
                </div>
                <div className="order-table-row w-32">
                <span className=" text-sm text-slate-400">Last Name</span><br />
                  <span
                    className={` px-3 py-1.5 rounded-2xl `}
                  >
                    {userInfo?.lastName}
                  </span>
                </div>
                <div className="order-table-row w-64">
                <span className=" text-sm text-slate-400">Email</span><br />
                  <span>{userInfo?.email}</span>
                </div>
                <div className="order-table-row">
                <span className=" text-sm text-slate-400">Phone</span><br />
                  <span>{userInfo?.phoneNumber}</span>
                </div>
                <div className="order-table-row">
                <span className=" text-sm text-slate-400">DOB</span><br />
                  <span>{convertToTimestamp(userInfo?.dob)}</span>
                </div>
              </div>
              <div className=" w-full flex justify-end space-x-3 px-5 py-8 ">
                <Link to={"/Auth/change-password"}>
              <button className="Btn3" >Change Password</button>
              </Link>
              </div>
        </>
      )}
    </>
  );
}
const UserProfileIcon = ({image}) => {
  const [displayEditIcon, setDisplayEditIcon] = useState(false);

  return (
    <>
      <div className="profile-icons rounded-full flex justify-center items-center   overflow-hidden h-14 w-14 bg-slate-100  shadow-lg">
        <img
          src={image || userIcon}
          alt=""
          className="profile-img  rounded-full object-cover  "
        />
      </div>
    </>
  );
};

const InfoBox = ({content,subContent,height,width})=>{
  return(
    <div className="info-cntr bg-white px-8 py-4 rounded-md shadow-md items-center justify-center mr-3 text-center" style={{display:"flex",flexDirection:'column',width:width,height:height}}>
        <div className=' info-content text-2xl font-bold text-light-pink '><NumberCount end={formatNumber(content)}/></div>
        <div className='info-sub-content text-slate-500 text-sm '>{subContent}</div>
      </div>
  )
} 

export default UserProfile;
