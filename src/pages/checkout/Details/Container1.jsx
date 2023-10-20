import React, { useEffect } from "react";
import "./details.css";
import MessagesBox from "../../../components/body/Messages/MessagesBox";

const Container1 = ({forwardRef,grantPermision}) => {
  
  const [userAddress, setUserAddress] = React.useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    zip: "",
    country: "",
    address1: "",
    address2: "",
  });
  const [errorList, setErrorList] = React.useState({});
  const [isSubmit, setIsSubmit] = React.useState(false);
  
  useEffect(() => {
    if (isSubmit) {
      const addressStored = JSON.parse(localStorage.getItem("userAddress"));
      if (Array.isArray(addressStored) && addressStored.length!==0) {
        const arr = [...addressStored];
        arr.push(userAddress);
        localStorage.setItem("userAddress", JSON.stringify(arr));

      }else{
        const arr = [];
        arr.push(userAddress);
        localStorage.setItem("userAddress", JSON.stringify(arr));
      }
      
      setErrorList({});
      setIsSubmit(false);
      grantPermision(true);
    }

  }, [isSubmit]);
  console.log(JSON.parse(localStorage.getItem("userAddress")));

  const handleChange = (e) => {
    const { name, value } = e.target;
    if(errorList[name]) setErrorList((prev) => ({ ...prev, [name]: "" }));
    setUserAddress((prev) => ({ ...prev, [name]: value }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let timerId
    clearTimeout(timerId); 
    const errors = {};
    if (!userAddress.name) errors.name = "Name is required";
    if (!userAddress.email) errors.email = "Email is required";
    if (!userAddress.phone) errors.phone = "Phone is required";
    if (!userAddress.company) errors.company = "Company is required";
    if (!userAddress.zip) errors.zip = "Zip is required";
    if (!userAddress.country) errors.country = "Country is required";
    if (!userAddress.address1) errors.address1 = "Address1 is required";
    if (!userAddress.address2) errors.address2 = "Address2 is required";
    
    setErrorList(errors);
    timerId =  setTimeout(() => {
      setErrorList({});
    }, 7000);

    if (Object.keys(errors).length === 0) {
      setIsSubmit(true);
    }
  }


  const handlesubmitBtn = () => {
    forwardRef.current.click();
  }



  return (
    <>
     {
      Object.keys(errorList).length !== 0 &&
      <MessagesBox newMessage="clear the issue in the form" />
    }
    {
      isSubmit &&
      <MessagesBox newMessage="Address Saved Successfully" />
    }
      <div className="cntr1-sub shadow-lg rounded-md">
        <div className="details-header pb-5 pt-2">
          <span className=" font-bold text-lg">Shipping Address</span>
        </div>
        <form autoCapitalize="false" onSubmit={handleSubmit} >
        <div className="name-email-div flex">
          <div className="label-input">
            
            <label htmlFor="">Name:</label>
            <input type="text" name="name" value={userAddress.name} placeholder="Name" onChange={handleChange} />
            {
              errorList.name && <div className="error">{errorList.name}</div>
            }
          </div>
          <div className=" label-input ">
            <label htmlFor="">Email:</label>
            <input type="text" placeholder="Email" value={userAddress.email} name="email" onChange={handleChange} />
            {
              errorList.email && <div className="error">{errorList.email}</div>
            }
          </div>
        </div>
        <div className="phone-company-div">
          <div className="label-input">
            <label htmlFor="">Phone Number:</label>
            <input type="number" placeholder="Phone" value={userAddress.phone} name="phone" onChange={handleChange}  />
            {
              errorList.phone && <div className="error">{errorList.phone}</div>
            }
          </div>
          <div className="label-input">
            <label htmlFor="">Company:</label>
            <input type="text" placeholder="Company"  value={userAddress.company} name="company" onChange={handleChange}  />
            {
              errorList.company && <div className="error">{errorList.company}</div>
            }
          </div>
        </div>
        <div className="zip-country-div">
          <div className="label-input">
            <label htmlFor="">Zip Code:</label>
            <input type="text" placeholder="Zip"  value={userAddress.zip} name="zip" onChange={handleChange}  />
            {
              errorList.zip && <div className="error">{errorList.zip}</div>
            }
          </div>
          <div className="label-input">
            <label htmlFor="">Country:</label>
            <input type="text" placeholder="Country"  value={userAddress.country} name="country" onChange={handleChange} />
            {
              errorList.country && <div className="error">{errorList.country}</div>
            }
          </div>
        </div>
        <div className="adrs1-adrs2-div">

            <div className="label-input">
              <label htmlFor="">Address1</label>
              <input type="text" placeholder="Address 1"  value={userAddress.address1} name="address1" onChange={handleChange} />
              {
                errorList.address1 && <div className="error">{errorList.address1}</div>
              }

          </div>
          <div className="label-input">
            <label htmlFor="">Address2</label>
            <input type="text" placeholder="Address 2" value={userAddress.address2} name="address2" onChange={handleChange} />
            {
              errorList.address2 && <div className="error">{errorList.address2}</div>
            }
          </div>
        </div>
        <div className="flex justify-end">
          <input  type="submit" ref={forwardRef} style={{display:'none'}}/>
            <button className="Btn2" onClick={handlesubmitBtn}>Save</button>
        </div>
        </form>
      </div>
    </>
  );
};

export default Container1;
