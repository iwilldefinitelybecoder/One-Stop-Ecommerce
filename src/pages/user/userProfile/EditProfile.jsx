import React, { useContext, useEffect, useRef, useState } from "react";
import { ordersListIcon } from "../../../assets/icons/png/user-page-icons/data";
import { Link, useNavigate } from "react-router-dom";
import { ProfileIcon } from "../../../components/headerLayout/toolbar/ProfileBtn";
import { AccountContext } from "../../../context/AccountProvider";
import { humanIcon } from "../../../assets/icons/png/toolbar-icons/data";
import useMessageHandler from "../../../components/body/Messages/NewMessagingComponent";
import { getUserInfo, updateUserInfo } from "../../../service/CustomerServices/CustomerServices";
import { convertToTimestamp } from "../../../utils/DisplayFormatters";

const EditProfile = () => {
  const {account} = useContext(AccountContext)
  const [errorFields, setErrorFields] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const submitRef = useRef(null);

  const [responseMessage, setResponseMessage] = useState("");
  const {handleMessage,getMessageComponents} = useMessageHandler();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: null,
    dob: "",
  });

  useEffect(() => {
    async function fetchuserDetails(){

    const response = await getUserInfo();
      console.log(response)
    setFormData({
      firstName: response.firstName,
      lastName: response.lastName,
      email: response.email,
      phoneNumber: response.phoneNumber || "",
      dob: convertToTimestamp(response.dob) || "",
    });
  }
  fetchuserDetails();
  }, [account]);

  const handelformChange = (e) => {
    let { name, value } = e.target;


    if (errorFields[name] !== undefined) {
      setErrorFields((prev) => ({ ...prev, [name]: "" }));
    }

    if(name === "phone"){
      
      value = validatePhoneNumber(value);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm= ()=>{
    const errors = {}
    if(formData.firstName === "") errors.firstName = "firstName Can't be empty"
    if(formData.lastName === "") errors.lastName = "lastName Can't be empty"
    if(formData.phoneNumber === "") errors.phoneNumber = "phone Number Can't be empty"
    if(formData.dob === "") errors.dob = "date of birth Can't be empty"
    setErrorFields(errors);
    return Object.keys(errors).length > 0
  }

  function validatePhoneNumber(phoneNumber) {
    // Remove any non-digit characters from the phone number
    const numberPattern = /^09[0-9]*$/;
const charPattern = /^09[a-zA-Z]*$/;
  
    // Check if the numeric phone number is less than or equal to 10 digits
    if (phoneNumber.length <= 10) {
      // Check if the numeric phone number contains only digits
      if (numberPattern.test(phoneNumber) && !charPattern.test(phoneNumber)) {
        // The phone number is valid, so return it
        return phoneNumber
      }
    }

    // The phone number is invalid, so return null
    return null;
  }

  const handelSubmitButton = (e) => {
    e.preventDefault();
    console.log(formData)
    setFormSubmitted(true);
    if (!validateForm()) {
      submitRef.current.click();
    }
  }

  const handelFormSubmit = async ()=>{
    const formDate = {...formData}
    const timeStamp = Date.parse(formDate.dob) /1000;
    formDate["dob"] = timeStamp
    console.log(formDate)
    const response =await updateUserInfo(formDate);
    if(response ==="success"){
      handleMessage("Successfully Updated Profile","success")
      setTimeout(()=>{
          navigate('/user/profile');
      },3000)
    }else{
      handleMessage("Somthing Went Wrong","failure")
  }
}

  return (
    <>
      
      <div className="ad-product-main-cntr py-3 ">
        {getMessageComponents()}
        <div className="ad-prdct-hdr">
          <div className="ad-prdct-title flex">
            <img src={humanIcon} className="h-8 mr-3" />
            <span className="text-2xl font-bold ">Edit Profile</span>
          </div>
          <div className="back-btn">
            <Link to="/user/profile">
              <button className="Btn">Back to Profile</button>
            </Link>
          </div>
        </div>
        <div className="ad-prdct-body">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handelFormSubmit()
            }}
          >
            <div className="name-cat-div">
              <ProfileIcon image={account?.userIcon} />
            </div>
            <div className="name-cat-div">
              <div className="name-div">
                <label htmlFor="name font-semibold">Name</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Name"
                  onChange={handelformChange}
                  value={formData.firstName}
                />
                {errorFields.firstName&& (
                  <span className=" ml-4 text-red-500 font-semibold">
                   {errorFields.firstName}
                  </span>
                )}
              </div>

              <div className="name-div">
                <label htmlFor="name font-semibold">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  onChange={handelformChange}
                  value={formData.lastName}
                />
                {errorFields.lastName && (
                  <span className=" ml-4 text-red-500 font-semibold">
                 {errorFields.lastName}
                  </span>
                )}
              </div>
            </div>
            <div className="name-cat-div">
              <div className="name-div">
                <label htmlFor="name font-semibold">Email</label>
                <input
                  type="text"
                  name="email"
                  placeholder="Name"
                  onChange={handelformChange}
                  value={formData.email}
                  disabled
                />
                {errorFields.email && (
                  <span className=" ml-4 text-red-500 font-semibold">
                    {errorFields.email}
                  </span>
                )}
              </div>

              <div className="name-div">
                <label htmlFor="name font-semibold">Phone Number</label>
                <input
                  type="number"
                  name="phoneNumber"
                  maxLength={10}
                  placeholder="(+91) 653-3771 x985"
                  
                  onChange={handelformChange}
                  value={formData.phoneNumber}
                />
                {errorFields.phoneNumber && (
                  <span className=" ml-4 text-red-500 font-semibold">
                    {errorFields.phoneNumber}
                  </span>
                )}
              </div>
            </div>
            <div className="name-cat-div">
              <div className="name-div">
                <label htmlFor="name" className="">
                  Date of Birth
                </label>
                  <div className="w-full">

                <input
                  type="date"
                  name="dob"
                  placeholder="dob"
                  onChange={handelformChange}
                  value={formData.dob}
                  className="input-box" // Apply a class to style the input box
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    padding: "8px",
                    width: "100%",
                  }} // Inline styles
                  />
                  </div>
                {errorFields.dob && (
                  <span className="ml-4 text-red-500 font-semibold">
                    {errorFields.dob}
                  </span>
                )}
              </div>
            </div>
            <div className="btn-div flex w-full justify-end">
              <input
                ref={submitRef}
                type="submit"
                style={{ display: "none" }}
              />
              <button className="Btn" onClick={(e) => handelSubmitButton(e)}>
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
