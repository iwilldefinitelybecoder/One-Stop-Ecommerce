import React, { useContext, useEffect, useRef, useState } from "react";
import { editIcon, userIcon } from "../../../assets/icons/png/toolbar1/data";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import {
  emptyCartIcon2,
  profileIcon,
  rightArrowIcon2,
  settingsIcon,
} from "../../../assets/icons/png/user-page-icons/data";
import { cameraIcon, rightArrowIcon } from "../../../assets/icons/png/toolbar-icons/data";
import {
  NotificationIcon,
  logoutIcon,
} from "../../../assets/icons/png/Rareicons/data";
import { AccountContext } from "../../../context/AccountProvider";
import LoginUI from "../../body/login/loginUI";
import Cookies from "js-cookie";
import { removeData } from "../../../utils/encryptData";
import {
  SaveUserIcon,
  fetchUserIcon,
} from "../../../service/AuthenticateServices";
import MessagesBox from "../../body/Messages/MessagesBox";
import { binaryToDataURL } from "../../../utils/binaryToUrl";
import { CSSTransition } from "react-transition-group";
import useMessage from "../../../CustomHooks/MessageHook";

const imageType = ["image/png", "image/jpeg", "image/jpg"];

function ProfileBtn() {
  const {
    account,
    setAccount,
    showLoginButton,
    setShowLoginButton,
    showLogoutButton,
  } = useContext(AccountContext);

  const location = useLocation();

  return showLogoutButton ? (
    <Navigate to="/logout" state={{ from: location }} replace />
  ) : (
    <div className="profile-icon rounded-full bg-slate-100 ml-3 shadow-md cursor-default ">
      <button onClick={() => setShowLoginButton(!showLoginButton)}>
        <img src={account?.userIcon || userIcon} alt="" className="user-icon" />
      </button>
      {showLoginButton && account && (
        <ProfileMenu
          image={account?.userIcon}
          firstName={account?.firstName}
          lastName={account?.lastName}
          email={account?.email}
        />
      )}
    </div>
  );
}

const ProfileMenu = (props) => {
  const windowWidth = window.innerWidth;
  const { setAccount, setShowLoginButton, setShowLogoutButton } =
    useContext(AccountContext);
    const {messages} = useMessage();
  const navigate = useNavigate();
  const { account } = useContext(AccountContext);
  const [activeMenu, setActiveMenu] = useState("main");
  const [eleHeight, setEleHeight] = useState(null);

  const logOut = () => {
    setShowLogoutButton(true);
  };

  const handleShowLoginButton = () => {
    setShowLoginButton(false);
  };

  const handleResize = (el) => {
    const height = el.offsetHeight;
    if(height > 300){

      setEleHeight(el.offsetHeight);
    }else{
      setEleHeight(300);
    }
  };
    

  const MenuItem = ({ link, image1, image2, children, onClick, goToMenu }) => {
    return (
      <>
        <Link to={link} role="menuitem">
          <div
            className="menu-item flex w-full   px-2 py-3 items-center border-b-[1px] hover:text-white  hover:bg-light-pink transition-all rounded-md active:bg-dark-pink "
            onClick={() => {
              onClick();
            }}
          >
            <img src={image1} alt="" className="h-7 mr-2 " />
            <span className=" text-lg font-semibold">{children}</span>
            <div className=" ml-auto" onClick={e=>{e.preventDefault();e.stopPropagation();goToMenu && setActiveMenu(goToMenu);}}>
            <img src={image2} alt="" className="h-5 ml-auto" />

            </div>
          </div>
        </Link>
      </>
    );
  };

  return (
    <>
      <div
        className={`profile-menu absolute ${
          windowWidth < 1300 ? "right-0" : ""
        } top-14 h-[365px] overflow-scroll w-72  rounded-xl cursor-default shadow-lg bg-white pb-5  px-4  py-2 overflow-hidden `}
        style={{ boxShadow: "0 0 10px 0 rgba(0,0,0,0.3)",height:eleHeight }}
      >
        <CSSTransition
          in={activeMenu === "main"}
          unmountOnExit
          timeout={500}
          classNames="menu-primary"
          onEnter={handleResize}
        >
          <div className="menu">
            <div
              style={{ display: "flex", flexDirection: "column" }}
              className=" w-full justify-center space-y-1 items-center mt-3 mb-4"
            >
              <ProfileIcon image={props?.image} />
              <UserName
                firstName={props?.firstName}
                lastName={props?.lastName}
                email={props?.email}
              />
            </div>
            <div className=" rounded-lg ">
              <MenuItem
                link="/user/profile"
                onClick={handleShowLoginButton}
                image1={profileIcon}
              >
                Your Account
              </MenuItem>
              <MenuItem
                link="/user/profile"
                onClick={handleShowLoginButton}
                image1={settingsIcon}
              >
                Settings
              </MenuItem>
              <MenuItem
                onClick={handleShowLoginButton}
                image1={NotificationIcon}
                goToMenu={"notification"}
                image2={rightArrowIcon2}
              >
                Notifications
              </MenuItem>
              {!account?.roles.includes("VENDOR") && (
                <MenuItem link="/register-vendor" image1={emptyCartIcon2}>
                  Become Seller
                </MenuItem>
              )}
              <MenuItem image1={logoutIcon} onClick={logOut}>
                Logout
              </MenuItem>
            </div>
          </div>
        </CSSTransition>

        <CSSTransition
          in={activeMenu === "notification"}
          unmountOnExit
          timeout={500}
          classNames="menu-secondary"
          onEnter={handleResize}
        >
          <div className="menu">
            <MenuItem
              link="/user/profile"
              image1={rightArrowIcon2}
              goToMenu="main"
            >
              <h2>Notification</h2>
            </MenuItem>
        
            {
                messages.length > 0 ? messages.map((messag,index) => 
                  <span>{messag.message}</span>
                  
                ) : <span>No Notification</span>
          }
          </div>
        </CSSTransition>
      </div>
    </>
  );
};

export const ProfileIcon = (props) => {
  const [displayEditIcon, setDisplayEditIcon] = useState(false);

  return (
    <>
      <div className="profile-icons rounded-full relative flex justify-center items-center ring-4 ring-slate-300  overflow-visible h-24 w-24 bg-slate-100 ml-3 shadow-lg">
        <img
          src={props?.image || userIcon}
          alt=""
          className="profile-img  rounded-full   "
        />
        <div className="profile-icon-edit-cntr tooltip  h-20  absolute top-[60px] right-[-5px]">
          <div onClick={() => setDisplayEditIcon(!displayEditIcon)} className=" bg-slate-300 p-3 rounded-full">
            <img
              src={cameraIcon}
              className={`user-icon-edit h-4 }`}
              style={{ display: displayEditIcon ? "block" : "" }}
              title="edit-icon"
            />
            {
               !displayEditIcon && 
              <span className="tooltiptext">Edit-profile-icon</span>

            }
          </div>
          {displayEditIcon && (
            <EditProfileIcon
              setdisplayBtn={setDisplayEditIcon}
              displayBtn={displayEditIcon}
            />
          )}
        </div>
      </div>
    </>
  );
};

export const UserName = (props) => {
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

export const EditProfileIcon = ({ displayBtn, setdisplayBtn }) => {
  const { account, setAccount, showLoginButton } = useContext(AccountContext);
  const inputRef = useRef();
  const [responseMessage, setResponseMessage] = useState("");
  const [prevImage, setPrevImage] = useState("");
  const [imageData, setImageData] = useState({
    email: account?.email,
    image: "",
  });
  const [saveImage, setSaveImage] = useState(false);
  useEffect(() => {
    if (imageData.image !== "") {
      setPrevImage({ ...account?.userIcon });
      setAccount({
        ...account,
        userIcon: URL.createObjectURL(imageData.image),
      });
    }
  }, [imageData]);

  useEffect(() => {
    let timerId;
    async function uploadImage() {
      if (saveImage) {
        const data = new FormData();
        data.append("email", account?.email);
        data.append("image", imageData.image);
        const response = await SaveUserIcon(data);
        if (response?.success) {
          setSaveImage(false);
          setResponseMessage(response?.message);
          setImageData({ ...imageData, image: "" });
          setdisplayBtn(false);
          timerId = setTimeout(() => {
            setResponseMessage("");
          }, 10000);
        } else {
          setSaveImage(false);
          console.log(response);
          setResponseMessage(response?.message);
        }
      }
    }
    uploadImage();
  }, [saveImage]);

  // useEffect(() => {
  //   console.log("displayBtn",displayBtn);
  //   if(!displayBtn || !showLoginButton) {
  //     setAccount({ ...account, userIcon: prevImage });
  //   }
  // }, [showLoginButton,displayBtn]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    setImageData({ ...imageData, image: file });
  };

  const handleEditProfileIcon = () => {
    inputRef.current.click();
  };

  return (
    <>
      {responseMessage && <MessagesBox message={responseMessage} />}
      <div className="profile-icon-edit-cntr z-50 absolute top-[30px] right-[-60px] w-24 font-semibold text-slate-500 py-1 bg-white ring-1 ring-slate-200 shadow-md rounded-md ">
        <input
          type="file"
          ref={inputRef}
          style={{ display: "none" }}
          accept="image"
          disabled={saveImage}
          onChange={handleImageChange}
        />
        {imageData.image === "" ? (
          <button
            className=" hover:bg-slate-200 w-full py-1"
            type="file"
            onClick={handleEditProfileIcon}
          >
            <span>{"upload pic"}</span>
          </button>
        ) : (
          <button
            className=" hover:bg-slate-200 w-full py-1"
            style={{ backgroundColor: `${saveImage ? "gray" : ""}` }}
            type="file"
            disabled={saveImage}
            onClick={() => {
              setSaveImage(true);
            }}
          >
            <span>{saveImage ? "saving..." : "save"}</span>
          </button>
        )}
      </div>
    </>
  );
};

export default ProfileBtn;
