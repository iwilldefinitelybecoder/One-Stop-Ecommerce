import React, { useContext, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { TextField, Button } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
// import { changePassword } from './api';
import { Link, useMatch, useNavigate } from "react-router-dom";
import "./login.css";
import {
  ProfileIcon,
  UserName,
} from "../../../components/headerLayout/toolbar/ProfileBtn";
import { AccountContext } from "../../../context/AccountProvider";
import { changePassword, updatePassword, validateOldPassword } from "../../../service/AuthenticateServices";
import useMessageHandler from "../../../components/body/Messages/NewMessagingComponent";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const path = useMatch("/reset-password/:token");

  const [errorFields, setErrorFields] = useState({});
  const [isPending, setIsPending] = useState(false);
  const [formSubmitted,setFormSubmitted] = useState();
  const { account } = useContext(AccountContext);
  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);
  const [phase, setPhase] = useState("old");
  const [eleHeight, setEleHeight] = useState(null);
  const {handleMessage,getMessageComponents} = useMessageHandler();
  const inputRef = useRef();

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(phase ==="old" && formData.oldPassword ==="")
    if(validateForm())return
    setIsPending(true);
    setErrorFields({});

    setTimeout(async () => {
      let response;
      if (phase === "old") {
        response = await validateOldPasswrd();
      } else if (phase === "new") {
        response = await setNewPassword(formData);
      }

      setIsPending(false);

      if (response.success) {
        if (phase === "old") {
          setPhase("new");
        } else {
          handleMessage("Password Changed Successfully","success");
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
      } else {
        setErrorFields({ response: response.message });
        setIsPending(false);
        setFormSubmitted(false);
        inputRef.current.focus();
      }
    }, 2000);
  };

  const validateOldPasswrd = async () => {
    
    const response = await validateOldPassword(formData.oldPassword);
    if (response === "success") {
    
      return { success: true };
    }else if(response === "failure")
    {
      return { success: false, message:"Incorrect Password"};
    }
    return { success: false, message:response.message};
}

  
const validateForm = ()=>{
  const errors = {}
  if(phase ==="old" && formData.oldPassword ==="")errors.oldPassword = "password cannot be empty"
  if(phase ==="new" && formData.newPassword ==="")errors.newPassword = "new cannot be empty"
  if(phase ==="new" && formData.confirmPassword ==="")
  {errors.confirmPassword = "Confirm password cannot be empty"}
  else{

    if(phase ==="new" && formData.newPassword !== formData.confirmPassword)errors.mismatch = "passwords Don't match"
  }
  setErrorFields(errors)
  
  return Object.keys(errors).length > 0
}

  const setNewPassword = async () => {


    const response = await updatePassword(formData);
    console.log(response)
    if (response?.success) {
      return { success: true };
    }
    return { success: false, message: response?.message };

  };

  const handleResize = (el) => {
    const height = el.offsetHeight;
    if (height > 300) {
      setEleHeight(el.offsetHeight);
    } else {
      setEleHeight(300);
    }
  };

  return (
    <div className="flex-column justify-center items-center h-screen bg-[#f7f9fd]">
      <div
        className=" shadow-xl rounded-lg overflow-hidden"
        //    style={{ height: eleHeight }}
        >
        {getMessageComponents()}
        <div className="w-[500px] reset-password-cntr relative bg-white   z-50 p-8 overflow-hidden">
          {isPending && (
            <LinearProgress
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                borderRadius: "50px 50px",
                "& .MuiLinearProgress-bar": {
                  borderRadius: "10px",
                },
              }}
            />
          )}
          <div className="flex-column items-center space-y-3 justify-center mb-5">
            <ProfileIcon image={account?.userIcon} />
            <UserName
              firstName={account?.firstName}
              lastName={account?.lastName}
              email={account?.email}
            />
          </div>
          <h2 className="text-2xl text-center mb-4">Reset Password</h2>
          <div>
            <CSSTransition
              in={phase === "old"}
              timeout={500}
              unmountOnExit
              classNames="menu-primary"
              onEnter={handleResize}
            >
              <div className="menu">
                <form onSubmit={handleSubmit}  noValidate autoCorrect="false">
                  <div className=" space-y-3">
                    <TextField
                      label="Old Password"
                      type="password"
                      name="oldPassword"
                      value={formData.oldPassword}
                      onChange={handleFormChange}
                      ref={inputRef}
                      fullWidth
                      required
                      InputProps={{
                        style: { backgroundColor: "#fff" },
                        focusStyle: { borderColor: "#e94560" },
                      }}
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={isPending}
                      fullWidth
                      style={{ backgroundColor: "#e94560", color: "#fff" }}
                      className="mt-4"
                    >
                      Next
                    </Button>

                    {errorFields.response && (
                      <span className="text-red-500">
                        {errorFields?.response}
                      </span>
                    )}
                     {errorFields.oldPassword && (
                      <span className="text-red-500">
                        {errorFields?.oldPassword}
                      </span>
                    )}
                  </div>
                </form>
              </div>
            </CSSTransition>
            <CSSTransition
              in={phase === "new"}
              timeout={500}
              classNames="menu-secondary"
              unmountOnExit
              onEnter={handleResize}
            >
              <div className="menu ">
                <form onSubmit={handleSubmit} noValidate autoCorrect="false" >
                  <div className=" space-y-5">
                    <TextField
                      label="New Password"
                      type="password"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleFormChange}
                      fullWidth
                      required
                      InputProps={{
                        style: { backgroundColor: "#fff" },
                        focusStyle: { borderColor: "#e94560" },
                      }}
                    />
                    <TextField
                      label="Confirm Password"
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleFormChange}
                      fullWidth
                      required
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={isPending}
                      fullWidth
                      style={{ backgroundColor: "#e94560", color: "#fff" }}
                      className="mt-4"
                    >
                      Change
                    </Button>
                    {errorFields.response && (
                      <span className="text-red-500">
                        {errorFields.response}
                      </span>
                    )}
                  </div>

                  {errorFields.response && (
                    <span className="text-red-500">{errorFields.response}</span>
                  )}
                   {errorFields.newPassword&& (
                    <span className="text-red-500">{errorFields.newPassword}</span>
                  )}
                   {errorFields.mismatch  && (
                    <span className="text-red-500">{errorFields.mismatch}</span>
                  )}
                </form>
              </div>
            </CSSTransition>
          </div>
        </div>
        <div className=" bg-slate-300  w-full flex items-center justify-center py-2 rounded-lg ">
          {path?.params ? (
            <Link to={`/login`}>
              <button>
                
                <span className=" underline font-semibold">Login</span>
              </button>
            </Link>
          ):(
            <Link to={`/home`}>
            <button>
              
              <span className=" underline font-semibold">Home</span>
            </button>
          </Link>
          )}
       
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
