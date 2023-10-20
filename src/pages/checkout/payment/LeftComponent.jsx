import React, { useEffect } from "react";
import MessagesBox from "../../../components/body/Messages/MessagesBox";
import {
  americanExpressIcon,
  cardIcon,
  creditCardIcon,
  cvvIcon,
  mastercardIcon,
  rupayIcon,
  visaIcon,
} from "../../../assets/icons/png/cardIcons/data";
import { isValidExpiryDate, } from "../../../utils/validateDate";
import { json } from "react-router";

const LeftComponent = ({ setPaymentMethod, paymentMethod,grantPermission }) => {
  const [userAddress, setUserAddress] = React.useState(Array.isArray(JSON.parse(localStorage.getItem("userPayments"))) && JSON.parse(localStorage.getItem("userPayments")).length!==0?JSON.parse(localStorage.getItem("userPayments"))[JSON.parse(localStorage.getItem("userPayments")).length-1]:{
    card: "",
    expireDate: "",
    name: "",
    cvv: "",
    cardcompany: "",
    payMethod:paymentMethod,
  });
  const [cards, setCards] = React.useState([
    mastercardIcon,
    visaIcon,
    rupayIcon,
    americanExpressIcon,
  ]);
  const [errorList, setErrorList] = React.useState({});
  const [cardValidity, setCardValidity] = React.useState({});
  const [expDateValid, setExpDateValid] = React.useState({});
  const [isSubmit, setIsSubmit] = React.useState(false);

  const forwardRef = React.useRef(null);

  useEffect(() => {
    if(userAddress.card && userAddress.expireDate && userAddress.name && userAddress.cvv){
        grantPermission(true);
    }else{
        grantPermission(false);
    }
    }, []);

  console.log(JSON.parse(localStorage.getItem("userPayments")));
  useEffect(() => {
    const timerId = setTimeout(() => {
      setCardValidity({});
    }, 7000);
    return () => clearTimeout(timerId);
  }, [cardValidity]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setExpDateValid({});
    }, 7000);
    return () => clearTimeout(timerId);
  }, [expDateValid]);

  useEffect(() => {
    if (isSubmit) {
      const addressStored = JSON.parse(localStorage.getItem("userAddress"));
      if (Array.isArray(addressStored) && addressStored.length !== 0) {
        const arr = [...addressStored];
        arr.push(userAddress);
        localStorage.setItem("userPayments", JSON.stringify(arr));
      } else {
        const arr = [];
        arr.push(userAddress);
        localStorage.setItem("userPa", JSON.stringify(arr));
      }

      setErrorList({});
      setIsSubmit(false);
      grantPermission(true);
    }
  }, [isSubmit]);

  const cardValidation = (e) => {
    const { value } = e.target;
    if (value.length === 0) return;
    let cardNumberError;
    const cardNumber = value.replaceAll(" ", "");
    let sum = 0;
    let double = false;

    for (let i = cardNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cardNumber.charAt(i), 10);

      if (double) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      double = !double;
    }
    let values = sum % 10 === 0; // Check if the sum is a multiple of 10
    function setvalidity() {
      if (values) {
        setCardValidity({
          message: "Card is valid",
          class: "valid-card",
        });
      } else {
        setCardValidity({ message: "Card is invalid", class: "error" });
      }
    }
    setvalidity();
  };

  const handleCardExpiry = (e) => {
    const { value } = e.target;

    if (value.length === 0 || value.length > 5) return;
    if (value.length < 5) {
      setExpDateValid({ message: "invalid-date", class: "error" });
      return;
    }
    if (isValidExpiryDate(value)) {
      setExpDateValid({ message: "valid-card", class: "valid-card" });
    } else {
      setExpDateValid({ message: "card-expired", class: "error" });
    }
  };

  const verifyCard = (e) => {
    let { value } = e.target;
    value = value.replace(/\D/g, "");

    const formatNumber = (number) =>
      number.split("").reduce((seed, next, index) => {
        if (index !== 0 && !(index % 4)) seed += " ";
        return seed + next;
      }, "");
    cardType(e);
    value = formatNumber(value.replaceAll(" ", ""));
    return value;
  };

  const formatDate = (e) => {
    let { value } = e.target;
    value = value.replace(/\D/g, "");
    if(value[0]>1){
        value = value.replace(value[0],"0"+value[0]);
    }
    if((value[0]>0 && value[0]<2 && value[1]>2)){
        value = value.replace(value[1],"");
    }
    const formatNumber = (number) => {
      return number.split("").reduce((seed, next, index) => {
        if (index !== 0 && !(index % 2)) seed += "/";
        return seed + next;
      }, "");
    };
    return formatNumber(value.replaceAll("/", ""));
  };

  const handelCvvInput = (e) => {
    let { value } = e.target;
   
    value = value.replace(/\D/g, "");

    return value;
  };

  const handleChange = (e) => {
    
    let { value, name } = e.target;
    if (name === "card") {
      value = verifyCard(e);
    }
    if (name === "expireDate") {
      value = formatDate(e);
    }
    if (name === "cvv") {
      value = handelCvvInput(e);
    }
    if (errorList[name]) setErrorList((prev) => ({ ...prev, [name]: "" }));
    setUserAddress((prev) => ({ ...prev, [name]: value }));
  };

  const cardType = (e) => {
    const { name, value } = e.target;
    if (value.length >= 2 && name === "card") {
      if (value[0] === "4") {
        setUserAddress((prev) => ({ ...prev, cardcompany: 1 }));
      } else if (value[0] === "5") {
        setUserAddress((prev) => ({ ...prev, cardcompany: 0 }));
      } else if (value[0] === "3") {
        setUserAddress((prev) => ({ ...prev, cardcompany: 3 }));
      } else if (
        (value[0] === "6" && value[1] === "0") ||
        (value[0] === "6" && value[1] === "5") ||
        (value[0] === "8" && value[1] === "1") ||
        (value[0] === "8" && value[1] === "2")
      ) {
        setUserAddress((prev) => ({ ...prev, cardcompany: 2 }));
      } else {
        setUserAddress((prev) => ({ ...prev, cardcompany: "" }));
      }
    } else {
      setUserAddress((prev) => ({ ...prev, cardcompany: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let timerId;
    clearTimeout(timerId);
    const errors = {};
    if (!userAddress.card) errors.card = "Card Number is required";
    if (!userAddress.expireDate) errors.expireDate = "Expire Date is required";
    if (!userAddress.name) errors.name = "Name is required";
    if (!userAddress.cvv) errors.cvv = "Cvv is required";

    setErrorList(errors);
    timerId = setTimeout(() => {
      setErrorList({});
    }, 7000);

    if (Object.keys(errors).length === 0) {
      setIsSubmit(true);
    }
  };

  const handlesubmitBtn = () => {
    forwardRef.current.click();
  };

  const handelPaymentMethod = (e, index) => {
    setPaymentMethod(index);
  };

  const handelConteiner1 = (e, index) => {};

  return (
    <>
      <form action="" autoCapitalize="false" onSubmit={handleSubmit}>
        <div className="payment-body">
          <div className="payment-body-header1 rounded-md bg-white px-6 pt-6 shadow-lg border-b-2 border-b-slate-200">
            <div className=" font-bold flex justify-between border-b-2 border-b-slate-200  pb-4 pt-1 ">
              <div className="option-cntr space-x-3">
                <input
                  type="radio"
                  name="payment"
                  id="option"
                  className=""
                  onClick={(e) => {
                    handelConteiner1(e, 0);
                    handelPaymentMethod(e, 0);
                  }}
                />
                <label htmlFor="option">Credit or Debit Card</label>
              </div>
              <div className="option-img-icons flex items-center space-x-4">
                <img src={cardIcon} className="h-9 " />
                <img src={visaIcon} className="h-9" />
                <img src={mastercardIcon} className="h-6 object-fill" />
                <img src={americanExpressIcon} className="h-9" />
                <img src={rupayIcon} className="h-9" />
              </div>
            </div>
            {paymentMethod === 0 && (
              <div className="payment-details-body ">
                {Object.keys(errorList).length !== 0 && (
                  <MessagesBox newMessage="clear the issue in the form" />
                )}
                {isSubmit && (
                  <MessagesBox newMessage="Address Saved Successfully" />
                )}
                <div className="cntr1-sub  rounded-md">
                  <div className="details-header pb-5 pt-2">
                    <span className=" font-bold text-lg">Card Details</span>
                  </div>
            
                    <div className="name-email-div flex">
                      <div className="label-input">
                        <label htmlFor="">Card Number:</label>
                        <div className="card-input-cntr">
                          <input
                            type="text"
                            className="card-input-box"
                            name="card"
                            value={userAddress.card}
                            placeholder="0000 0000 0000 0000"
                            maxLength={19}
                            onChange={handleChange}
                            onBlur={(e) => {
                              cardValidation(e);
                            }}
                          />
                          <img
                            src={
                              cards[userAddress.cardcompany] || creditCardIcon
                            }
                            className="card-image"
                          />
                        </div>
                        {errorList.card && (
                          <div className="error">{errorList.name}</div>
                        )}
                        {cardValidity.message && (
                          <div className={cardValidity.class}>
                            {cardValidity.message}
                          </div>
                        )}
                      </div>
                      <div className=" label-input ">
                        <label htmlFor="">Exp Date:</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          value={userAddress.expireDate}
                          name="expireDate"
                          onChange={handleChange}
                          maxLength={5}
                          onBlur={handleCardExpiry}
                        />
                        {errorList.expireDate && (
                          <div className="error">{errorList.email}</div>
                        )}
                        {expDateValid.message && (
                          <div className={expDateValid.class}>
                            {expDateValid.message}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="phone-company-div">
                      <div className="label-input">
                        <label htmlFor="">Name on Card:</label>
                        <input
                          type="text"
                          placeholder="Name"
                          value={userAddress.name}
                          name="name"
                          onChange={handleChange}
                        />
                        {errorList.name && (
                          <div className="error">{errorList.phone}</div>
                        )}
                      </div>
                      <div className="label-input">
                        <label htmlFor="">Cvv:</label>
                        <div className="card-input-cntr">
                          <input
                            type="text"
                            placeholder="CVV"
                            value={userAddress.cvv}
                            name="cvv"
                            onChange={handleChange}
                            maxLength={3}
                          />
                          <img src={cvvIcon} className="card-image " />
                        </div>

                        {errorList.cvv && (
                          <div className="error">{errorList.company}</div>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <input
                        type="submit"
                        ref={forwardRef}
                        style={{ display: "none" }}
                      />
                      <button className="Btn2" onClick={handlesubmitBtn}>
                        Save
                      </button>
                    </div>
   
                </div>
              </div>
            )}
          </div>

          <div className="payment-body-header1 rounded-md bg-white px-6 py-6 shadow-lg border-b-2 border-b-slate-300">
            <div className=" font-bold">
              <input
                type="radio"
                name="payment"
                id="option2"
                onClick={(e) => {
                  handelPaymentMethod(e, 1);
                }}
              />
              <label htmlFor="option2"> Pay on Delivery</label>
            </div>
          </div>
        </div>
        <div className="payment-body-header"></div>
        <div className="payment-body-header"></div>
      </form>
    </>
  );
};

export default LeftComponent;
