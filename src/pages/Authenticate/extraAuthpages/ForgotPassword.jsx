import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button, LinearProgress, TextField } from '@mui/material';
import { checkMarkGif, crossMarkGif } from '../../../assets/icons/json/data';
import Lottie from "react-lottie-player";
import { changePassword, verifyResetPasswordToken } from '../../../service/AuthenticateServices';
import ChangePassword from '../login/ResetPassword';
import { useLocation, useNavigate } from 'react-router';
import { logo2Icon } from '../../../assets/icons/png/toolbar1/data';
import { newMailImg } from '../../../assets/icons/img/Illistrations/data';
import { ProfileIcon, UserName } from '../../../components/headerLayout/toolbar/ProfileBtn';
import { CheckPasswordStrength } from '../../../components/body/login/loginUI';
import { useSearchParams } from 'react-router-dom';
import useMessageHandler from '../../../components/body/Messages/NewMessagingComponent';

const ForgotPassword = () => {
    const [isPending, setIsPending] = useState(false);
    const [response, setResponse] = useState("");
    const [userInfo, setUserInfo] = useState();
    const [VerifyTokenBtn, setVerifyTokenBtn] = useState(false);
  
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const status = queryParams.get("token");
    useEffect(() => {
      async function fetchData() {
        const data = await verifyResetPasswordToken(status);
        console.log(data);
        setResponse(data?.success ? "Success" : data?.message);
        setUserInfo(data?.response?.data);
      }
      fetchData();
    }, []);
  
 
  
    const handelResendVerificationLink = async () => {
      setIsPending(true);
      // const data = await verifyResetPasswordToken(status);
      setResponse(data?.message);
      setIsPending(false);
    }
  
    const element = useCallback(
      (response) => {
          console.log(response);
        switch (response) {
          case "Success":
            return (
              <EnterNewPassword 
                data={userInfo}
                VerifyTokenBtn={setVerifyTokenBtn}
                isPending={isPending}
              />
            );
          case "Invalid Token":
            return <InvalidToken />;
          case "Token Expired":
            return <TokenExpired resendLink={handelResendVerificationLink} />;
          case "TOKEN_VERIFIED":
            return <TokenVerified />;
          case "USER_ALREADY_VERIFIED":
            return <UserAlreadyVerified />;
          case "RESENT_VERIFICATION_LINK":
              return <ResentVerificationLink />;
          default:
            return <SomethingWentWrong />;
        }
      },
      [response]
    );
  
    
  
    return (
      <>
        <div className="w-full h-[100vh] py-5 bg-main-bg flex justify-center items-center ">
          <div className=" bg-white rounded-xl shadow-xl">
            {isPending && <LinearProgress />}
            <div
              className=" w-[500px] py-8 px-3 bg-white space-y-5 justify-center items-center rounded-xl  z-50 "
              style={{ display: "flex", flexDirection: "column" }}
            >
              <div>
                <img src={logo2Icon} className=" h-8" />
              </div>
              {
                true ?
                <>
                <ProfileIcon image={userInfo?.userIcon} edit={false} />
                <UserName firstName={userInfo?.firstName}  lastName= {userInfo?.lastName} email = {userInfo?.email}  />
                </>
                :
                <div>
                <img src={newMailImg} className="h-40" />
              </div>
              }
              
              {element(response)}
            </div>
          </div>
        </div>
      </>
    );
  };
  
  const VerificationSuccess = () => {
    return (
      <Lottie
        animationData={checkMarkGif}
        play
        style={{ width: 150, height: 80 }}
        loop={false}
      />
    );
  };
  
  const VerificationFailed = ({ message }) => {
    return (
      <Lottie
        animationData={crossMarkGif}
        play
        style={{ width: 50, height: 50 }}
        loop={false}
      />
    );
  };
  
  const VerifyToken = ({ data, VerifyTokenBtn, isPending }) => {
    return (
      <>
        <span className=" font-semibold text-2xl">Verify Your Email</span>
        <p className=" text-center font-normal">
          You have Entered <span className="font-semibold text-lg">{data}</span>{" "}
          As The Email Address For Your Account ,And It Needs To Be Verifed Before
          Granted Full Access
        </p>
        <button
          className="Btn3"
          disabled={isPending}
          onClick={() => {
            VerifyTokenBtn(true);
          }}
        >
          Verify, Your Email{" "}
        </button>
      </>
    );
  };
  
  const InvalidToken = () => {
    return (
      <>
        <span className=" font-semibold text-2xl">Invalid Token</span>
        <p className=" text-center font-normal">
          Invalid verification Token Try with Another Link if you are trying to
          Verify
        </p>
        <VerificationFailed />
        <p className=" font-semibold">You May close The Window Now</p>
      </>
    );
  };
  
  const TokenExpired = ({resendLink}) => {
    return (
      <>
        <span className=" font-semibold text-2xl">Token Expired</span>
        <p className=" text-center font-normal">
          Your Token Has Expired Try with Another <br /> Link if you are trying to
          Verify
        </p>
        <VerificationFailed />
        <p className="text-slate-500">
          Want a new Link?
          <button onClick={resendLink}> 
            <span className="text-black font-semibold underline">Resend</span>
          </button>
        </p>
      </>
    );
  };
  
  const TokenVerified = () => {
    return (
      <>
        <span className=" font-semibold text-2xl">Token Verified</span>
        <p className=" text-center font-normal">
          Your Email is Verified Continue To Login
        </p>
        <VerificationSuccess />
        <Link to="/login">
          <button className="Btn3 w-40">Login</button>
        </Link>
      </>
    );
  };
  
  const SomethingWentWrong = () => {
    return (
      <>
        <span className=" font-semibold text-2xl">Something Went Wrong</span>
        <p className=" text-center font-normal">
          Something Went Wrong Please Try Again Later
        </p>
        <VerificationFailed />
        <p className=" font-semibold">You May close The Window Now</p>
      </>
    );
  };
  
  const UserAlreadyVerified = () => {
    return (
      <>
        <span className=" font-semibold text-2xl">User Already Verified</span>
        <p className=" text-center font-normal">
          Your Email is Already Verified Continue To Login
        </p>
        <VerificationSuccess />
        <Link to="/login">
          <button className="Btn3 w-40">Login</button>
        </Link>
      </>
    );
  };
  
  const ResentVerificationLink = () => {
    return (
      <>
        <span className=" font-semibold text-2xl">Resent Verification Link</span>
        <p className=" text-center font-normal">
          Your Verification Link Has Been Resent To Your Email
        </p>
        <VerificationSuccess />
        <p className=" font-semibold">You May close The Window Now</p>
      </>
    );
  };


  const EnterNewPassword  = ({data})=>{
    const [formData, setFormData] = useState({
      newPassword: "",
      confirmPassword: "",
    });
    const inputRef = useRef(null);
    const inputRef2 = useRef(null);
    const {handleMessage,getMessageComponents} = useMessageHandler();

    const [errorFields, setErrorFields] = useState({});
    const [isPending, setIsPending] = useState(false);
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const handleFormChange = (e) => {

      const { name, value } = e.target;
      setErrorFields({...errorFields, [name]: ""})

      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    const handelErros = () => {
      
      const errorFields = {};
      if(formData.newPassword.length<8){
        errorFields.newPassword = "Password must be atleast 8 characters long";
   
      }
      if(formData.newPassword!==formData.confirmPassword){
        errorFields.confirmPassword = "Password does not match";
        inputRef2.current.focus();

      }

      if(formData.newPassword === "" ){
        errorFields.newPassword = "Password is required";

      }
      if(formData.confirmPassword === "" ){
        errorFields.confirmPassword = "Password is required";

      }
      setErrorFields(errorFields);
      return errorFields;

    }
      

    const handleSubmit = async (e) => {

      e.preventDefault();
     const errorFields = handelErros()

      if(Object.keys(errorFields).length>0){
        return;
      }
  
      setIsPending(true);
      setErrorFields({});

        const body = {
          password: formData.newPassword,
          email: data.email,
          token:searchParams.get("token")
        }

        let response;
        response = await changePassword(body);
        setIsPending(false);
     
  
  
        if (response?.success) {
            handleMessage("Password Changed Successfully","success");
            setTimeout(() => {
              navigate("/login");
            }, 2000);
          
        } else {
          setErrorFields({ response: response?.message });
          setIsPending(false);
          inputRef.current.focus();
        }

    }

    return(
      <div className="menu px-10 relative ">
        {getMessageComponents()}
      <form onSubmit={handleSubmit} noValidate>
        <div className=" space-y-5">
          <TextField
            label="New Password"
            type="password"
            ref={inputRef}
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
          {
            errorFields.newPassword && (
              <span className="text-red-500">
                {errorFields.newPassword}
              </span>
            )
          }
         
          <TextField
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            ref={inputRef2}
            value={formData.confirmPassword}
            onChange={handleFormChange}
            fullWidth
            required
          />
          {
            errorFields.confirmPassword && (
              <span className="text-red-500">
                {errorFields.confirmPassword}
              </span>
            )
          }
           {
            formData.newPassword.length>0 &&
            <div className=' -rotate-90 absolute top-[60px] right-[-95px]'>

          <CheckPasswordStrength password={formData.newPassword} strengthText={false} />
            </div>
          }
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
          {errorFields.confirmPassword && (
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
    )
  }

export default ForgotPassword;
