import React, {
  startTransition,
  useContext,
  useEffect,
  useState,
  useTransition,
} from "react";
import "./login.css";
import { logo2Icon, logoIcon } from "../../../assets/icons/png/toolbar1/data";
import "./login.css";
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

const LoginUI = () => {
  const classes = useStyles();
  const [isPending, setIsPending] = useState(false);

  return (
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
        <LoginInput isPending={isPending} setIsPending={setIsPending} />
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
        <ExtraOptions
          message={"Don't have an account?"}
          option={"Sign Up"}
          link={"/signup"}
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
          Forgot Password?&nbsp;
          <Link to={"/"}>
            <span className=" underline text-md font-semibold text-black">
              Reset
            </span>
          </Link>
        </span>
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
    password: "",
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
    formsData.append("email", formData.email);
    formsData.append("password", formData.password);
    const auth = await login(formsData);
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

    if (formData.email === "") {
      errorList.email = "Please enter a email";
    }
    if (formData.password === "") {
      errorList.password = "Please enter a password";
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

export const ErrorMessage = ({ message }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    setShow(true);
  }, [message]);
  return (
    <>
      {show && (
        <div className="error-message-div w-full flex justify-center items-center bg-hover-light-pink ring-1 ring-light-pink rounded-md py-4 px-6 mb-3">
          <span className="text-light-pink font-normal">{message}</span>
          <div
            className=" text-slate-500 rounded-full w-5 h-5 flex justify-center items-center font-normal ml-auto cursor-pointer"
            onClick={() => setShow(false)}
          >
            <span>x</span>
          </div>
        </div>
      )}
    </>
  );
};

const OtherSignInOptions = (props) => {
  return (
    <button className={`other-signin-options Btn4  ${props.color} ${props.hoverColor} transition-all`}>
      <div className=" p-1 bg-white rounded-full">
        <img src={props.image} className="h-4" />
      </div>
      <span>{props.text}</span>
    </button>
  );
};

const ExtraOptions = (props) => {
  return (
    <div
      className={`extra-options flex justify-center py-3 items-center my-3 ${props?.bg} text-slate-400 text-sm`}
    >
      <span>
        {props.message}&nbsp;
        <Link to={props.link}>
          <span className=" underline text-md font-semibold text-black">
            {props.option}
          </span>
        </Link>
      </span>
    </div>
  );
};

const atLeastMinimumLength = (password) =>
  new RegExp(/(?=.{8,})/).test(password);
const atLeastOneUppercaseLetter = (password) =>
  new RegExp(/(?=.*?[A-Z])/).test(password);
const atLeastOneLowercaseLetter = (password) =>
  new RegExp(/(?=.*?[a-z])/).test(password);
const atLeastOneNumber = (password) =>
  new RegExp(/(?=.*?[0-9])/).test(password);
const atLeastOneSpecialChar = (password) =>
  new RegExp(/(?=.*?[#?!@$ %^&*-])/).test(password);

function testingPasswordStrength(password) {
  if (!password) return PasswordStrength.WEAK;
  let points = 0;
  if (atLeastMinimumLength(password)) points += 1;
  if (atLeastOneUppercaseLetter(password)) points += 1;
  if (atLeastOneLowercaseLetter(password)) points += 1;
  if (atLeastOneNumber(password)) points += 1;
  if (atLeastOneSpecialChar(password)) points += 1;
  if (points >= 5) return PasswordStrength.STRONG;
  if (points >= 3) return PasswordStrength.MEDIUM;
  return PasswordStrength.WEAK;
}

function getIcon(strength) {
  let icon = ErrorOutlineOutlinedIcon;
  switch (strength) {
    case PasswordStrength.WEAK:
      icon = ErrorOutlineOutlinedIcon;
      break;
    case PasswordStrength.MEDIUM:
      icon = ErrorOutlineOutlinedIcon;
      break;
    case PasswordStrength.STRONG:
      icon = CheckOutlinedIcon;
      break;
  }
  return icon;
}

function generateColors(strength) {
  let result = [];
  const COLORS = {
    NEUTRAL: "hsla(0, 0%, 88%, 1)",
    WEAK: "hsla(353, 100%, 38%, 1)",
    MEDIUM: "hsla(40, 71%, 51%, 1)",
    STRONG: "hsla(134, 73%, 30%, 1)",
  };
  switch (strength) {
    case PasswordStrength.WEAK:
      result = [COLORS.WEAK, COLORS.NEUTRAL, COLORS.NEUTRAL, COLORS.NEUTRAL];
      break;
    case PasswordStrength.MEDIUM:
      result = [COLORS.MEDIUM, COLORS.MEDIUM, COLORS.NEUTRAL, COLORS.NEUTRAL];
      break;
    case PasswordStrength.STRONG:
      result = [COLORS.STRONG, COLORS.STRONG, COLORS.STRONG, COLORS.STRONG];
      break;
  }
  return result;
}

function CheckPasswordStrength({ password }) {
  const passwordStrength = testingPasswordStrength(password);
  const Icon = getIcon(passwordStrength);
  const colors = generateColors(passwordStrength);

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap="5px"
        margin="10px 0"
      >
        {colors?.map((color, index) => (
          <Box
            key={index}
            flex={1}
            height="5px"
            width="10px"
            borderRadius="5px"
            bgcolor={color}
          ></Box>
        ))}
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="flex-start"
        gap="5px"
        margin="0 0 15px 0"
      >
        <Icon htmlColor={colors[0]} />

        <Typography color={colors[0]}>{passwordStrength}</Typography>
      </Box>
      {/* {passwordStrength !== PasswordStrength.STRONG && (
        <>
          <Typography
            variant="subtitle2"
            fontSize="1rem"
            color="text.headingLight"
            margin="0 0 8px 0"
          >
            {" "}
            Para tornar sua senha mais forte
          </Typography>
          <Typography
            variant="subtitle2"
            fontSize="14px"
            fontWeight={500}
            color="text.bodyLight"
            margin="0 0 24px 0px"
          >
            Inclua uma letra maiúscula ou um símbolo especial como ( ! @ # $ % ^
            & * ( )
          </Typography>
        </>
      )} */}
    </>
  );
}

export default LoginUI;
