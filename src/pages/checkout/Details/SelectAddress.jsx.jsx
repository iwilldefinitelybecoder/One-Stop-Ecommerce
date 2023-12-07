import React, { useEffect } from "react";
import { useOrders } from "../../../context/OrderContext";
import ListCards from "../../../components/body/checkoutComponents/ListCards";
import useAddresses from "../../../CustomHooks/AddressHooks";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useNavigate } from "react-router";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import { rightArrowIcon } from "../../../assets/icons/png/toolbar-icons/data";

const SelectAddress = () => {
  const { orderDetails, setOrderDetails } = useOrders();
  const { addresses } = useAddresses();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails({ ...orderDetails, [name]: value });
    searchParams.set(name, value);
    setSearchParams(searchParams);

  };

  const shippingAddress1 = searchParams.get("shippingAddress");
  const billingAddress = searchParams.get("billingAddress");
  const shippingAddress  = orderDetails.shippingAddress;


  useEffect(() => {
    if (shippingAddress1) {
      setOrderDetails((prev) => ({ ...prev, shippingAddress:shippingAddress1 }));
    }
    if (billingAddress) {
      setOrderDetails((prev) => ({ ...prev, billingAddress }));
    }
  }, [shippingAddress, billingAddress]);

   

  const handelBack = (e)=>{
    e.preventDefault();
    setOrderDetails({...orderDetails, shippingAddress:'', billingAddress:''})
    searchParams.delete("shippingAddress");
    setSearchParams(searchParams);
  }

  return (
    <>
      <div className="addressList-cntr rounded-md shadow-xl flex  flex-nowrap flex-row relative w-[830px]">
        <div
          className={` shipping-billing-li-cntr w-[83.75vw] absolute ${
            shippingAddress === "" ? "left-4" : "left-[-825px]"
          }  flex space-x-10 `}
        >
          <div className="">
            <h3 className=" font-semibold text-xl border-b-2 py-2 ">
              Select Shipping Address
            </h3>
            <div className=" shipping-address-cntr  bg-main-bg rounded-md mt-2 h-[50vh]  w-[804px] ">
              <RadioGroup
                aria-label="shippingAddress"
                name="shippingAddress"
                value={orderDetails.shippingAddress}
                onChange={handleChange}
              >
                {addresses?.map((address, index) => (
                  <div
                    className=" shadow-xl flex items-start py-6 px-3 m-3 rounded-md  bg-white"
                    key={index}
                  >
                    <FormControlLabel
                      value={address.addressId}
                      control={<Radio />}
                      label={address.address}
                    />
                    <ListCards address={address} />
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>

          <div className="">
            <h3 className=" font-semibold text-xl border-b-2 py-2 ">
              <div className="flex items-center space-x-3">
                <div className=" p-1.5 rounded-full hover:bg-slate-100 flex items-center justify-center" onClick={(e)=>{handelBack(e)}}>
                <img src={rightArrowIcon} className="h-4 rotate-180" />
                </div>
                <span>Select billing Address</span>
              </div>
            </h3>
            <div className=" shipping-address-cntr  bg-main-bg rounded-md mt-2 h-[48vh]  w-[804px] ">
              <RadioGroup
                aria-label="billingAddress"
                name="billingAddress"
                value={orderDetails.billingAddress}
                onChange={handleChange}
              >
                {addresses?.map((address, index) => (
                  <div
                    className=" shadow-xl flex items-start py-6 px-3 m-3 rounded-md  bg-white"
                    key={index}
                  >
                    <FormControlLabel
                      value={address.addressId}
                      control={<Radio />}
                      label={address.address}
                    />
                    <ListCards address={address} />
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectAddress;
