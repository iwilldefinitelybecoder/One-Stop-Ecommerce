import React, { useState } from "react";
import { LinearProgress, TextField } from "@mui/material";

import { checkMarkGif } from "../../../assets/icons/json/data";
import Lottie from "react-lottie-player";
import { recoverPasswordIcon } from "../../../assets/icons/png/Rareicons/data";
import { requestResetPassword } from "../../../service/AuthenticateServices";
import { Link } from "react-router-dom";

const PasswordResetRequest = () => {
  const [email, setEmail] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState(null);

  const responseMessage = (responseMessage)=>{

  switch (responseMessage) {
    case "USER_NOT_FOUND":
        return "User not found. Please check your credentials.";
        break;
    case "ERROR_IN_SENDING_EMAIL":
      return"An email has already been sent to this address. Please check your inbox.";
      break;
      case "EMAIL_ALREADY_SENT":
      return "Error occurred while sending the email. Please try again later.";
        break;
    default:
        return "Unknown response. Please contact support for assistance.";
        break;
}
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);
    if (
      email.length === 0 ||
      email === null ||
      email === undefined ||
      email === "" ||
      !email.includes("@")
    ) {
      setIsPending(false);
      setError("Email is required");
      return;
    }
    const response = await requestResetPassword(email);
  
    if (response.success) {
      setEmailSent(true);
      setError(null);
      setIsPending(false);
    } else {
      setError(responseMessage(response.message.data));
      setIsPending(false);
    }
  };

  return (
    <>
      <div className="w-full h-[100vh]  bg-main-bg flex justify-center items-center">
        <div className="bg-white rounded-xl shadow-xl  ">
          {isPending && <LinearProgress />}
          <div className=" w-[500px] py-8 px-3 bg-white space-y-5 justify-center items-center rounded-xl z-50">
            <div className="w-full flex-column items-center ">
              <span className="font-semibold text-3xl">Recover Password</span>
              <div className="mb-10">
                <img
                  src={recoverPasswordIcon}
                  className="h-16"
                  alt="Email icon"
                />
              </div>

              <span className="font-semibold text-xl">Enter Your Email</span>
            </div>
            {!emailSent ? (
              <form
                autoCapitalize="off"
                autoCorrect="off"
                noValidate
                onSubmit={handleSubmit}
                className="flex flex-col items-center space-y-3"
              >
                <TextField
                  label="Email"
                  type="email"
                  sx={{ width: "80%" }}
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError(null);
                  }}
                  className="border border-gray-300 rounded-md px-3 py-2 mb-4"
                  required
                />

                <button
                  type="submit"
                  className=" Btn3 btn-primary"
                  disabled={isPending}
                >
                  Send Reset Link
                </button>
                {error && <div className="text-red-500 text-center ">{error}</div>}
              </form>
            ) : (
              <div className="flex-column items-center mb-5">
                <Lottie
                  animationData={checkMarkGif}
                  play
                  loop={false}
                  style={{ width: 150, height: 150 }}
                />
                <p className="text-xl font-semibold">
                  Email Sent Successfully!
                </p>
                <p className="text-center">
                  We've sent a verification code to <strong>{email}</strong>.
                  Please check your inbox.
                </p>
              </div>
            )}
            <div className=" w-full flex justify-center bg-slate-200 rounded-full py-3">

            <span>
                <span className="text-md text-slate-500 ">
                    Remember your password?
                </span>
              <Link to={"/login"}>
                <span className=" underline text-md font-semibold text-black">
                  Login
                </span>
              </Link>
            </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PasswordResetRequest;
