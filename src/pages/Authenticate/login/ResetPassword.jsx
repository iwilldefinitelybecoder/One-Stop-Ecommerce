import React, { useContext, useState } from "react";
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
import { changePassword, validateOldPassword } from "../../../service/AuthenticateServices";

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
  const { account } = useContext(AccountContext);
  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);
  const [phase, setPhase] = useState(path?.params?"new":"old"); // 'old', 'new'
  const [eleHeight, setEleHeight] = useState(null);
  

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
          setFormData({
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
        } else {
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
    const response = await validateOldPassword(formData);
    if (!response?.success) {
    
        return { success: false, message: response.message };
    }      
    return { success: true };
}

  

  const setNewPassword = async () => {
    const response = await changePassword(formData);
    if (!response.success) {
      return { success: false, message: response.message };
    }

    return { success: true };
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
                <form onSubmit={handleSubmit}>
                  <div className=" space-y-3">
                    <TextField
                      label="Old Password"
                      type="password"
                      name="oldPassword"
                      value={formData.oldPassword}
                      onChange={handleFormChange}
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
                        {errorFields.response}
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
                <form onSubmit={handleSubmit}>
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
                </form>
              </div>
            </CSSTransition>
          </div>
        </div>
        <div className=" bg-slate-300  w-full flex items-center justify-center py-2 rounded-lg ">
          {path?.params && (
            <Link to={`/login`}>
              <button>
                {" "}
                <span className=" underline font-semibold">Login</span>
              </button>
            </Link>
          )}
       
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
