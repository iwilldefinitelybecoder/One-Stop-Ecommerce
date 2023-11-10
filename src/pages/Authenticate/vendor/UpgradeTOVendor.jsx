import React, {
    startTransition,
    useContext,
    useEffect,
    useState,
    useTransition,
  } from "react";

  import { logo2Icon, logoIcon } from "../../../assets/icons/png/toolbar1/data";

  import {
    facebookIcon3,
    googleIcon3,
    viewDisabledIcon,
    viewIcon,
  } from "../../../assets/icons/png/Rareicons/data";
  import { Link, useNavigate } from "react-router-dom";
  import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined";
  import CheckOutlinedIcon from "@material-ui/icons/CheckOutlined";
  import { Box, LinearProgress, Typography, makeStyles } from "@material-ui/core";
  import { login } from "../../../service/AuthenticateServices";
  import Cookies from "js-cookie";
  import { AccountContext } from "../../../context/AccountProvider";
  import { saveData } from "../../../utils/encryptData";
  import Lottie from "react-lottie-player";
  import { checkMarkGif } from "../../../assets/icons/json/data";
  
  const PasswordStrength = {
    STRONG: "Strong",
    MEDIUM: "Medium",
    WEAK: "Weak",
  };
  
  const useStyles = makeStyles((theme) => ({
    progress: {
      backgroundColor: "#e9456065",
    },
    bar: {
      backgroundColor: "#e94560",
    },
  }));
  
import { ErrorMessage } from "../../../components/body/login/loginUI";
import { ProfileIcon, UserName } from "../../../components/headerLayout/toolbar/ProfileBtn";
import { upgradeToVendor } from "../../../service/vendorServices";

const UpgradeToVendor = () => {
    const classes = useStyles();
    const [isPending, setIsPending] = useState(false);
    const {account} = useContext(AccountContext);

    return (
    <div className="w-full h-[100vh] py-5 bg-main-bg flex justify-center items-center">
      <div className="login-main-cntr w-[500px] bg-white rounded-xl shadow-lg z-50 ">
        {isPending && (
          <LinearProgress
            style={{
              borderTopLeftRadius: "10px 20px",
              borderTopRightRadius: "20px 10px",
            }}
            classes={{
              root: classes.progress,
              bar: classes.bar,
            }}
          />
        )}
        <div className=" px-16 pt-8 ">
          <div
            style={{ display: "flex", flexDirection: "column" }}
            className="login-header  items-center w-auto mb-5  space-y-5"
          >
          <ProfileIcon image={account?.userIcon} />
          <UserName
            firstName={account?.firstName}
            lastName={account?.lastName}
          />
          </div>
          {isPending && Cookies.get("JWT") !== undefined ? (
          <div className=" h-[234px] w-[372px] flex justify-center items-center ">
            <Lottie
              animationData={checkMarkGif}
              play
              style={{ width: 150, height: 150 }}
              loop={false}
            />
          </div>
        ) : (
          <>
          <LoginInput isPending={isPending} setIsPending={setIsPending} />
       
        </>
        )}
        </div>
        <div className="flex justify-center items-center pb-2">
          <span className="text-slate-500 text-sm">
            By continuing, you agree to accept our Privacy Policy & Terms of
            Service.
          </span>
        </div>
  
      
      </div>
      </div>
    );
  };
  
  const LoginInput = ({ isPending, setIsPending }) => {
    const inputRef = React.useRef(null);
    const submitRef = React.useRef(null);
    const [errorFields, setErrorFields] = useState({});
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [formData, setFormData] = useState({
      email: "",
      vendorName: "",
    });
  
  
  
    const { account, setAccount, setShowLoginButton } =
      useContext(AccountContext);
  
    useEffect(() => {
      if (formSubmitted && Object.keys(errorFields).length === 0) {
        setFormData({
          email: "",
          vendorName: "",
        });
      }
    }, [account]);
  
    const navigate = useNavigate();
  
    const handelformChange = (e) => {
      const { name, value } = e.target;
      if (Object.keys(errorFields).length !== 0) {
        setErrorFields({});
      }
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
  
    useEffect(() => {
      if (formSubmitted && Object.keys(errorFields).length === 0) {
        LoginUser();
      }
    }, [formSubmitted]);
  
    useEffect(() => {
      inputRef.current.focus();
    }, []);
  
    async function LoginUser() {
      setIsPending(true);
      const formsData = new FormData();
      formsData.append("userEmail",account?.email);
      formsData.append("vendorEmail", formData.email);
      formsData.append("vendorName", formData.vendorName);
      const auth = await upgradeToVendor(formsData);
      if (auth?.success === true) {
    
        
        setIsPending(false);
        setTimeout(() => {
          setAccount(auth.response.data);
          navigate("/");
          const data = auth.response;
          saveData(data, "account");
          setShowLoginButton(false);
        }, 2000);
      } else {
        setErrorFields({ ...errorFields, response: auth?.message });
        setIsPending(false);
        setFormSubmitted(false);
        inputRef.current.focus();
      }
    }
  
    const formErrorHandelling = (e) => {
      let errorList = {};
      e.preventDefault();
  
      if (formData.email === "") {
        errorList.email = "Please enter a email";
      }
      if (formData.vendorName === "") {
        errorList.vendorName = "Please enter a vendorName";
      }
      setErrorFields(errorList);
      return errorList;
    };
  
    const handelFormSumbit = (e) => {
      e.preventDefault();
      const errorList = formErrorHandelling(e);
      if (Object.keys(errorList).length === 0) {
        setFormSubmitted(true);
      }
    };
  
    const handelSubmitButton = () => {
      submitRef.current.click();
    };
   
  
    return (
      <>
        {errorFields.response && <ErrorMessage message={errorFields.response} />}
        
          <form
            action=""
            onSubmit={handelFormSumbit}
            autoComplete="true"
            noValidate
          >
            <div
              className="price-sale-div1 items-center "
              style={{ display: "flex", flexDirection: "column" }}
            >
              <div className={`reg-price-div  ml-6 ${errorFields.email && "reg-price-div-error"}`}>
                <div className="price-div">
                  <label htmlFor="reg-price">Email:</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Example@mail.com"
                    onChange={handelformChange}
                    value={formData.email}
                    ref={inputRef}
                  />
                </div>
                {errorFields.email && (
                  <span className=" ml-4 text-red-500 font-semibold">
                    *Email is Required
                  </span>
                )}
              </div>
  
              <div className="sale-div ml-6">
                <div className={`sale-div ${errorFields.vendorName && "reg-price-div-error"}`}>
                  <div>
                    <label htmlFor="sale-price">Vendor Name:</label>
                  </div>
                  <div className=" relative flex">
                    <input
                      type="text"
                      name="vendorName"
                      placeholder="example-Retail"
                      value={formData.vendorName}
                      onChange={handelformChange}
                    />
                  
                  </div>
                
                </div>
                {errorFields.vendorName && (
                  <span className=" ml-4 text-red-500 font-semibold">
                    *Vendor Name is Required
                  </span>
                )}
              </div>
              <div className="btn-div w-[380px]">
                <input
                  ref={submitRef}
                  type="submit"
                  style={{ display: "none" }}
                />
                <button
                  className={`${isPending ? "Btndisabled" : "Btn3"} w-full`}
                  onClick={(e) => handelSubmitButton(e)}
                  disabled={isPending}
                >
                  Login
                </button>
              </div>
            </div>
          </form>
        
      </>
    );
  };
  
  

export default UpgradeToVendor;
