import React from "react";
import useAddresses from "../../../CustomHooks/AddressHooks";

const OrderInfo = ({ orderDetails }) => {
  const [orderSummary, setOrderSummary] = React.useState(
    orderDetails[0]?.orderSummary
  );
  const { getAddresses, loading } = useAddresses();
  const [address, setAddress] = React.useState({});
  const [billingAddress, setBillingAddress] = React.useState({});

  React.useEffect(() => {
    const getAddress = async () => {
      const data = await getAddresses(orderDetails[0]?.shippingAddressId);
      const billingAddress = await getAddresses(
        orderDetails[0]?.billingAddressId
      );
      setBillingAddress(billingAddress);
      setAddress(data);
    };
    getAddress();
  }, []);

  const paymentMethod = (method)=>{
      switch (method) {
        case "cod":
          return "Cash on Delivery";
        case "card":
          return "paid by Debit/Credit Card";
        case "paypal":
          return "paid by Paypal";
        case "UPI":
          return "paid using UPI";
        default:
          return "Cash on Delivery";
      }
  }

  console.log(orderDetails);
  return (
    <div className=" flex my-8 items-start justify-between">
      <div className="">
        <div className=" bg-white px-10 py-6 rounded-lg shadow-md mb-4">
          <h5 className=" font-bold">Shipping Address</h5>
          <div
            className=" space-y-0.5 w-[300px]"
            style={{ display: "flex", flexDirection: "column",flexWrap:"wrap" }}
          >
            <span className=" font-semibold text-lg">{address.name}</span>
            <span className="font-semibold">{address.email}</span>
            <span className=" font-semibold text-slate-600">
              {address.area}
            </span>
            <span className=" font-semibold text-slate-600">
              {address.locality}
            </span>
            <span></span>
            <span>{address.phone}</span>
            <span className=" font-semibold text-slate-500">
              {address.city} {address.country}{" "}
              <span className=" text-light-pink">{address.zipCode}</span>
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
              {orderSummary?.itemsTotal}
            </span>
          </div>
          <div className="shipping-section flex justify-between  my-2 mx-2">
            <span className="text-slate-500 ">Shipping:</span>
            <span className="text-xl font-bold">
              {orderSummary?.shippingTotal}
            </span>
          </div>
          <div className="tax-section flex justify-between  my-2 mx-2">
            <span className="text-slate-500 ">Tax:</span>
            <span className="text-xl font-bold">{orderSummary?.taxTotal}</span>
          </div>
          <div className="discount-section flex justify-between  my-2 mx-2">
            <span className="text-slate-500 ">Discount:</span>
            <span className="text-xl font-bold">
              {orderSummary?.couponDiscount || 0}
            </span>
          </div>
        </div>

        <div className="total-section flex justify-end">
          <span className="text-3xl font-bold">{orderSummary?.grandTotal}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderInfo;
