import React, {
  startTransition,
  useContext,
  useEffect,
  useState,
  useTransition,
} from "react";
import "../../../components/body/login/login.css"; 
import { logo2Icon, logoIcon } from "../../../assets/icons/png/toolbar1/data";

import {
  facebookIcon3,
  googleIcon3,
  viewDisabledIcon,
  viewIcon,
} from "../../../assets/icons/png/Rareicons/data";
import { Link, useNavigate } from "react-router-dom";
import { ErrorOutlineOutlined } from "@mui/icons-material";
import { CheckOutlined } from "@mui/icons-material";
import { Box, LinearProgress, Typography } from "@mui/material";
import { linearProgressClasses } from "@mui/material/LinearProgress"; 
import  {styled} from "@mui/material/styles";
import { login, register } from "../../../service/AuthenticateServices";
import Cookies from "js-cookie";
import { AccountContext } from "../../../context/AccountProvider";
import { saveData } from "../../../utils/encryptData";
import Lottie from "react-lottie-player";
import { checkMarkGif } from "../../../assets/icons/json/data";
import { CheckPasswordStrength, ErrorMessage, ExtraOptions, OtherSignInOptions } from "../../../components/body/login/loginUI";

const StyledLinearProgressBar = styled(LinearProgress)({
	[`&.${linearProgressClasses.determinate}`]: { backgroundColor: "#e9456065" },
	[`&.${linearProgressClasses.determinate} > .${linearProgressClasses.bar1Determinate}`]: { backgroundColor: "#e94560" }
});
       

const SignUp = () => {
  const [isPending, setIsPending] = useState(false);

  return (
    <div className=" flex w-full h-[100vh] justify-center items-start bg-main-bg py-10 ">
    <div className="login-main-cntr w-[500px] bg-white rounded-xl shadow-lg z-50  ">
      {isPending && (
        <StyledLinearProgressBar
          style={{
            borderTopLeftRadius: "10px 20px",
            borderTopRightRadius: "20px 10px",
          }}
        />
      )} 
      <div className=" px-16 pt-8 ">
        <div
          style={{ display: "flex", flexDirection: "column" }}
          className="login-header  items-center w-auto mb-5 "
        >
          <img src={logo2Icon} className=" h-10 w-52" />
          <h1 className=" text-md font-semibold mt-5 ">
            Login with Email or Phone
          </h1>
        </div>
        {!isPending && Cookies.get("JWT") !== undefined ? (
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
            <SignupInput isPending={isPending} setIsPending={setIsPending} />
            <h2>
              <span>On</span>
            </h2>

            <OtherSignInOptions
              text={"Sign in with Google"}
              image={googleIcon3}
              hoverColor={"hover:bg-google-blue-hover"}
              color={"bg-google-blue"}
            />
            <OtherSignInOptions
              text={"Sign in with Facebook"}
              image={facebookIcon3}
              hoverColor={"hover:bg-facebook-blue-hover"}
              color={"bg-facebook-blue"}
            />
          
          </>
        )}
      </div>
      <div className="flex justify-center items-center pb-2">
        <span className="text-slate-500 text-sm">
          
          By continuing, you agree to accept our Privacy Policy & Terms of
          Service.
        </span>
      </div>

      <div
        className={`Reset-password flex justify-center py-4 items-center  bg-slate-100 text-slate-400 text-sm rounded-xl`}
      >
        <span>
        Already have an account?&nbsp;
          <Link to={"/login"}>
            <span className=" underline text-md font-semibold text-black">
              Login
            </span>
          </Link>
        </span>
      </div>
    </div>
    </div> 
  );
};


const SignupInput = ({ isPending, setIsPending }) => {
  const inputRef = React.useRef(null);
  const submitRef = React.useRef(null);
  const [errorFields, setErrorFields] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",

  });

  const { account, setAccount, setShowLoginButton } =
    useContext(AccountContext);

  useEffect(() => {
    if (formSubmitted && Object.keys(errorFields).length === 0) {
      setFormData({
        email: "",
        password: "",
      });
    }
  }, [account]);

  const navigate = useNavigate();

  const handelformChange = (e) => {
    const { name, value } = e.target;
    
    if (errorFields[name]) {
      setErrorFields({...errorFields, [name]: ""});
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

  async function LoginUser() {
    setIsPending(true);
    const formsData = new FormData();
    formsData.append("firstName", formData.firstName);
    formsData.append("lastName", formData.lastName);
    formsData.append("email", formData.email);
    formsData.append("password", formData.password);

    const auth = await register(formsData);
    if (auth?.success === true) {

      Cookies.set("JWT", auth.response.data.token);
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
    if (formData.firstName === "") {
      errorList.firstName = "Please enter a first name";
    }
    if (formData.lastName === "") {
      errorList.lastName = "Please enter a last name";
    }
    if (formData.email === "") {
      errorList.email = "Please enter a email";
    }
    if(formData.email.includes("@") === false){
      errorList.email = "Please enter a valid email";
    }
    if (formData.password === "") {
      errorList.password = "Please enter a password";
    }
    if (formData.confirmPassword === "") {
      errorList.confirmPassword = "Please enter a password";
    }
    if (formData.password !== formData.confirmPassword) {
      errorList.confirmPassword = "Password does not match";
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
          <div className={`reg-price-div  ml-6 ${errorFields.firstName && "reg-price-div-error"}`}>
            <div className="price-div">
              <label htmlFor="reg-price">First Name:</label>
              <input
                type="text"
                name="firstName"
                placeholder="Abhichandra"
                onChange={handelformChange}
                value={formData.firstName}
                ref={inputRef}
              />
            </div>
            {errorFields.firstName && (
              <span className=" ml-4 text-red-500 font-semibold">
                *FirstName is Required
              </span>
            )}
          </div>
          <div className={`reg-price-div  ml-6 ${errorFields.lashName && "reg-price-div-error"}`}>
            <div className="price-div">
              <label htmlFor="reg-price">LastName:</label>
              <input
                type="text"
                name="lastName"
                placeholder="v"
                onChange={handelformChange}
                value={formData.lastName}
                ref={inputRef}
              />
            </div>
            {errorFields.lastName && (
              <span className=" ml-4 text-red-500 font-semibold">
                *LastName is Required
              </span>
            )}
          </div>  
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
            {errorFields.email}
              </span>
            )}
          </div>

          <div className="sale-div ml-6">
            <div className={`sale-div ${errorFields.password && "reg-price-div-error"}`}>
              <div>
                <label htmlFor="sale-price">Password:</label>
              </div>
              <div className=" relative flex">
                <input
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  placeholder="********"
                  value={formData.password}
                  onChange={handelformChange}
                />
                <div
                  className="view-password cursor-pointer"
                  onClick={(e) => setPasswordVisible(!passwordVisible)}
                >
                  <img
                    src={passwordVisible ? viewDisabledIcon : viewIcon}
                    className="h-6 absolute right-9 top-4"
                  />
                </div>
              </div>
              {formData.password && (
                <CheckPasswordStrength password={formData.password} />
              )}
            </div>
            {errorFields.password && (
              <span className=" ml-4 text-red-500 font-semibold">
                *Password is Required
              </span>
            )}
          </div>
          <div className="sale-div ml-6">
            <div className={`sale-div ${errorFields.confirmPassword && "reg-price-div-error"}`}>
              <div>
                <label htmlFor="sale-price">Confirm Password:</label>
              </div>
              <div className=" relative flex">
                <input
                  type={passwordVisible ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="********"
                  value={formData.confirmPassword}
                  onChange={handelformChange}
                />
                <div
                  className="view-password cursor-pointer"
                  onClick={(e) => setPasswordVisible(!passwordVisible)}
                >
                  <img
                    src={passwordVisible ? viewDisabledIcon : viewIcon}
                    className="h-6 absolute right-9 top-4"
                  />
                </div>
              </div>
              
            </div>
            {errorFields.confirmPassword && (
              <span className=" ml-4 text-red-500 font-semibold">
                {errorFields.confirmPassword}
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

export default SignUp