import React, { useContext, useState } from "react";
import { editIcon, userIcon } from "../../../assets/icons/png/toolbar1/data";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import {
  profileIcon,
  rightArrowIcon2,
  settingsIcon,
} from "../../../assets/icons/png/user-page-icons/data";
import { rightArrowIcon } from "../../../assets/icons/png/toolbar-icons/data";
import { NotificationIcon, logoutIcon } from "../../../assets/icons/png/Rareicons/data";
import { AccountContext } from "../../../context/AccountProvider";
import LoginUI from "../../body/login/loginUI";
import Cookies from "js-cookie";
import { removeData } from "../../../utils/encryptData";


function ProfileBtn() {
  const { account, showLoginButton, setShowLoginButton,showLogoutButton } =
    useContext(AccountContext);


  const location  = useLocation();

  return (
    showLogoutButton ? (
      <Navigate to="/logout" state={{from:location}} replace/>
    ) : (
    <div className="profile-icon rounded-full bg-slate-100 ml-3 shadow-md cursor-default ">
      <button onClick={() => setShowLoginButton(!showLoginButton)}>
        <img src={account?.userIcon || userIcon} alt="" className="user-icon" />
      </button>
      {showLoginButton && account && (
        <ProfileMenu
          img={account?.userIcon}
          firstName={account?.firstName}
          lastName={account?.lastName}
          email={account?.email}
        />
      )}
    </div>
  )
  );
}

const ProfileMenu = (props) => {

  const {setAccount, setShowLoginButton,setShowLogoutButton } = useContext(AccountContext);
  const navigate = useNavigate();
  

  const logOut = () => {
    setShowLogoutButton(true)
    
  }

  const handleShowLoginButton = () => {
    setShowLoginButton(false);
  }

  const MenuItem = ({link ,image1,image2,children,onClick}) => {
    return (
      <>
        <Link to={link} role="menuitem">
          <div className="menu-item flex w-full  px-2 py-3 items-center border-b-[1px] hover:text-white  hover:bg-light-pink transition-all rounded-md active:bg-dark-pink " onClick={()=>{onClick()}}>
            <img src={image1} alt="" className="h-7 mr-2 " />
            <span className=" text-lg font-semibold">{children}</span>
            <img src={image2} alt="" className="h-4 ml-auto" />
          </div>
        </Link>
      </>
    );
  };

  return (
    <>
      <div
        className="profile-menu absolute top-14 h-[365px] overflow-scroll w-72  rounded-xl cursor-default shadow-lg bg-white pb-5  px-4  py-2 overflow-hidden "
        style={{ boxShadow: "0 0 10px 0 rgba(0,0,0,0.3)" }}
      >
        <div
          style={{ display: "flex", flexDirection: "column" }}
          className=" w-full justify-center space-y-1 items-center mt-3 mb-4"
        >
          <ProfileIcon image={props?.userIcon} />
          <UserName firstName={props?.firstName} 
          lastName={props?.lastName} 
          email={props?.email}
          />
        </div>
        <div className=" rounded-lg ">
          <MenuItem link="/user/profile" onClick={handleShowLoginButton} image1={profileIcon}>
            Your Account
          </MenuItem>
          <MenuItem link="/user/profile" onClick={handleShowLoginButton} image1={settingsIcon}>
            Settings
          </MenuItem>
          <MenuItem  onClick={handleShowLoginButton} image1={NotificationIcon} >
            Notifications
          </MenuItem>
          <MenuItem image1={logoutIcon} onClick={logOut}>
            Logout
          </MenuItem>
        </div>
      </div>
    </>
  );
};

const ProfileIcon = (props) => {
  return (
    <>
      <div className="profile-icons rounded-full flex justify-center items-center h-24 w-24 bg-slate-100 ml-3 shadow-md">
        <img src={props?.userIcon || userIcon} alt="" className="user-icon" />
        <img
          src={editIcon}
          className="user-icon-edit h-5  absolute top-[90px] right-[90px]  "
          title="edit-icon"
        />
      </div>
    </>
  );
};

const UserName = (props) => {
  return (
    <>
      <div className="user-name text-xl font-semibold text-center justify-center flex flex-wrap">
        <span>{props?.firstName}</span>
        <span className="ml-1">{props?.lastName}</span>
      </div>
      <span>{props?.email}</span>
    </>
  );
};

export default ProfileBtn;
