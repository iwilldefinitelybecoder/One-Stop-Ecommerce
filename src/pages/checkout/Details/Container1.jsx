import React, { useEffect } from "react";
import "./details.css";
import MessagesBox from "../../../components/body/Messages/MessagesBox";
import { InputLabel, MenuItem, Select } from "@mui/material";
import { countryList } from "../../../data/countryList";
import useAddresses from "../../../CustomHooks/AddressHooks";
import { useMatch, useParams } from "react-router";

const Container1 = ({forwardRef,grantPermission}) => {
  const isEditing = useMatch("/user/edit-Address/:id")
  const addressId = useParams("id");
  
  const [userAddress, setUserAddress] = React.useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    zip: "",
    country: "",
    area: "",
    locality: "",
  });
  const [errorList, setErrorList] = React.useState({});
  const [isSubmit, setIsSubmit] = React.useState(false);
  const {updateAddresses,addAddresses} = useAddresses();
  
  useEffect(() => {
    if (isSubmit) {
      setErrorList({});
      setIsSubmit(false);
      grantPermission(true);
    }

  }, [isSubmit]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    if(errorList[name]) setErrorList((prev) => ({ ...prev, [name]: "" }));
    setUserAddress((prev) => ({ ...prev, [name]: value }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let timerId;
        let timerId2
        clearTimeout(timerId);
        clearTimeout(timerId2);
    const errors = {};
    if (!userAddress.name) errors.name = "Name is required";
    if (!userAddress.email) errors.email = "Email is required";
    if (!userAddress.phone) errors.phone = "Phone is required";
    if (!userAddress.city) errors.city = "Company is required";
    if (!userAddress.zip) errors.zip = "Zip is required";
    if (!userAddress.country) errors.country = "Country is required";
    if (!userAddress.area) errors.area = "Address1 is required";
    if (!userAddress.locality) errors.locality = "Address2 is required";
    
    setErrorList(errors);
    timerId =  setTimeout(() => {
      setErrorList({});
    }, 7000);

    const addressData = {...userAddress};
    addAddresses.addressId = addressId;

    if (Object.keys(errors).length === 0) {
      setIsSubmit(true);
      if(isEditing !==null){
        updateAddresses(addressData)
        timerId2 = setTimeout(()=>{
          navigate('/user/Payment-methods')
        },2000)
      }else{

        addAddresses(addressData)
      }
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
          <span className=" font-bold text-lg">Add New Address</span>
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
            <label htmlFor="">City:</label>
            <input type="text" placeholder="City"  value={userAddress.city} name="city" onChange={handleChange}  />
            {
              errorList.city && <div className="error">{errorList.city}</div>
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
            <label htmlFor="country">Country:</label>
            <Select className="select" sx={{height:"44px",marginTop:"10px"}} inputProps={{id:"country"}} value={userAddress.country} name="country" onChange={handleChange} >
              {
                countryList.map((country, index) => (
                  <MenuItem key={index} value={country.name}>{country.name}</MenuItem>
                ))

              }
            </Select>
           
            {
              errorList.country && <div className="error">{errorList.country}</div>
            }
          </div>
        </div>
        <div className="adrs1-adrs2-div">

            <div className="label-input">
              <label htmlFor="">Community/Area/Building</label>
              <input type="text" placeholder="Address"  value={userAddress.area} name="area" onChange={handleChange} />
              {
                errorList.area && <div className="error">{errorList.area}</div>
              }

          </div>
          <div className="label-input">
            <label htmlFor="">Street/locality</label>
            <input type="text" placeholder="Address" value={userAddress.locality} name="locality" onChange={handleChange} />
            {
              errorList.locality && <div className="error">{errorList.locality}</div>
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
