import React from "react";
import useAddresses from "../../../CustomHooks/AddressHooks";

const OrderInfo = ({ orderDetails }) => {
  const [orderSummary, setOrderSummary] = React.useState(
    orderDetails?.orderSummary
  );
  const { getAddresses, loading } = useAddresses();
  const [address, setAddress] = React.useState({});
  const [billingAddress, setBillingAddress] = React.useState({});


  React.useEffect(() => {
    const getAddress = async () => {
      const data = await getAddresses(orderDetails?.shippingAddressId);
      const billingAddress = await getAddresses(
        orderDetails[0]?.billingAddressId
      );
      setBillingAddress(billingAddress);
      setAddress(data);
    };
    getAddress();
  }, []);


  const rupee = "&#8377;";

  const paymentMethod = (method)=>{
      switch (method) {
        case "COD":
          return "Cash On Delivery"
          break;
        case "PAYPAL":
          return "Payment Using Paypal"
          break;
          case "DEBITCARD":
            return "paid using Debit Card"
            break;  
          case "CREDITCARD":
            return "paid using Credit Card"
            break;

        default:
          return "Cash On Delivery"
          break;
      }
  }


  return (
    <div className=" flex my-8 items-start justify-between">
      <div className="">
        <div className=" bg-white px-10 py-6 rounded-lg shadow-md mb-4">
          <h5 className=" font-bold">Shipping Address</h5>
          <div
            className=" space-y-0.5 w-[300px]"
            style={{ display: "flex", flexDirection: "column",flexWrap:"wrap" }}
          >
            <span className=" font-semibold text-lg">{address?.name}</span>
            <span className="font-semibold">{address?.email}</span>
            <span className=" font-semibold text-slate-600">
              {address?.area}
            </span>
            <span className=" font-semibold text-slate-600">
              {address?.locality}
            </span>
            <span></span>
            <span>{address?.phone}</span>
            <span className=" font-semibold text-slate-500">
              {address?.city} {address?.country}{" "}
              <span className=" text-light-pink">{address?.zipCode}</span>
            </span>
            <span></span>
          </div>
        </div>
  
      </div>

      <div className="checkout-right-sub-cntr bg-white rounded-md px-4 py-5 flex-col shadow-md">
        <div className="calaulate-info-sec flex-col border-b-2 border-b-slate-100">
          <div className="sub-total-section flex justify-between my-2 mx-2">
            <span className="text-slate-500 ">Subtotal:</span>
            <span className="text-xl font-bold">
              &#8377;{orderSummary?.itemsTotal}
            </span>
          </div>
          <div className="shipping-section flex justify-between  my-2 mx-2">
            <span className="text-slate-500 ">Shipping:</span>
            <span className="text-xl font-bold">
              &#8377;{orderSummary?.shippingTotal}
            </span>
          </div>
          <div className="tax-section flex justify-between  my-2 mx-2">
            <span className="text-slate-500 ">Tax:</span>
            <span className="text-xl font-bold">&#8377;{orderSummary?.taxTotal}</span>
          </div>
          <div className="discount-section flex justify-between  my-2 mx-2">
            <span className="text-slate-500 ">Discount:</span>
            <span className="text-xl font-bold">
              &#8377;{orderSummary?.discount || 0}
            </span>
          </div>
        </div>

        <div className="total-section flex justify-end">
          <span className="text-3xl font-bold">&#8377;{orderSummary?.grandTotal}</span>
        </div>
        <div className="total-section flex justify-between mt-5">
          <span className="text-slate-500 font-semibold">Payment Method:</span>
          <span className="text-md font-bold">{paymentMethod(orderDetails?.paymentMethod)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderInfo;
