import React, { useContext, useEffect, useRef, useState } from "react";
import { ordersListIcon } from "../../../assets/icons/png/user-page-icons/data";
import { Link } from "react-router-dom";
import { ProfileIcon } from "../../../components/headerLayout/toolbar/ProfileBtn";
import { AccountContext } from "../../../context/AccountProvider";
import { humanIcon } from "../../../assets/icons/png/toolbar-icons/data";

const EditProfile = () => {
  const {account} = useContext(AccountContext)
  const [errorFields, setErrorFields] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const submitRef = useRef(null);

  const [responseMessage, setResponseMessage] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
  });

  useEffect(() => {
    setFormData({
      firstName: account.firstName,
      lastName: account.lastName,
      email: account.email,
      phone: account.phone,
      dob: account.dob,
    });
  }, [account]);

  const handelformChange = (e) => {
    const { name, value } = e.target;
    if (errorFields[name] !== undefined) {
      setErrorFields((prev) => ({ ...prev, [name]: "" }));
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handelSubmitButton = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (validateForm()) {
      submitRef.current.click();
    }
  }

  return (
    <>
      {formSubmitted ? <MessagesBox newMessage={responseMessage} /> : null}
      <div className="ad-product-main-cntr py-3 ">
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
              console.log(formData);
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
                  type="text"
                  name="phone"
                  placeholder="(+91) 653-3771 x985"
                  onChange={handelformChange}
                  value={formData.phone}
                />
                {errorFields.phone && (
                  <span className=" ml-4 text-red-500 font-semibold">
                    {errorFields.phone}
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
