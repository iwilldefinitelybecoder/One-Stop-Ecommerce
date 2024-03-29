import React, { useEffect } from "react";
import {
  completedCheckIcon,
  deliveryPackage1Icon,
  deliveryPackage2Icon,
  deliveryVanIcon,
  orderedIcon,
} from "../../../assets/icons/png/Rareicons/data";
import { formatOrderedDate } from "../../../utils/DisplayFormatters";

const ShipmentStatus = ({ orderDetail }) => {
  const [status, setStatus] = React.useState({
    ordered: false,
    packed: false,
    shipped: false,
    delivered: false,
    cancelled: false,
  });

  console.log(orderDetail);

  useEffect(() => {
    const shipmentStatus = async (status) => {
      switch (status) {
        case "ORDERED":
          setStatus((prev) => ({
            ...prev,
            ordered: true,
            packed: false,
            shipped: false,
            delivered: false,
            cancelled: false,
          }));
          break;
        case "PACKED":
          setStatus((prev) => ({
            ...prev,
            ordered: true,
            packed: true,
            shipped: false,
            delivered: false,
            cancelled: false,
          }));

          break;
        case "SHIPPED":
          setStatus((prev) => ({
            ...prev,
            ordered: true,
            packed: true,
            shipped: true,
            delivered: false,
            cancelled: false,
          }));
          break;
        case "DELIVERED":
          setStatus((prev) => ({
            ...prev,
            ordered: true,
            packed: true,
            shipped: true,
            delivered: true,
            cancelled: false,
          }));
          break;
        case "CANCELLED":
          setStatus((prev) => ({
            ...prev,
            ordered: false,
            packed: false,
            shipped: false,
            delivered: false,
            cancelled: true,
          }));
          break;
        default:
          setStatus((prev) => ({
            ...prev,
            ordered: false,
            packed: false,
            shipped: false,
            delivered: false,
            cancelled: false,
          }));
          break;
      }
    };

    shipmentStatus(orderDetail?.orderStatus);
  }, []);

  return (
    <div className=" bg-white rounded-lg shadow-md px-6 w-full pt-6 pb-16 my-7">
      <EstimatedDelivery
        shippingHeader={
          orderDetail?.deliveryDate ? "Delivered Date" : "Estimated Delivery"
        }
        eta={
          orderDetail?.deliveryDate
            ? orderDetail?.deliveryDate
            : orderDetail?.expectedDeliveryDate
        }
        shippingMethod={orderDetail?.shippingMethod}
      />
      <dir className="shipmentStatus-cntr flex items-center">
        <div
          className={`${
            status.ordered ? "stage-completed" : "stage-pending"
          } bg-slate-200  rounded-full flex items-center relative justify-start w-[70px] `}
        >
          <div className={`${status.ordered && !status.packed && "pulse"} circle  p-4`}>
            <img
              src={orderedIcon}
              className={`${status.ordered ? "invert-img-1" : ""}  h-9 `}
            />
            {status.packed && (
              <div>
                <img
                  src={completedCheckIcon}
                  className=" completed-delay-1 h-6 absolute top-0 right-[-5px]"
                />
              </div>
            )}
          </div>
        </div>
        <div
          style={{ display: "flex", flexDirection: "column" }}
          className="items-center justify-start h-12"
        >
          <span className="font-semibold text-lg">Order Created</span>
          <div
            className={`${
              status.packed
                ? "stage-completed-2 stages-completed"
                : "stage-pending"
            } bg-slate-200 w-48 h-1`}
          ></div>
        </div>
        <div
          className={`${
            status.packed ? "stage-completed" : "stage-pending"
          }  rounded-full flex items-center relative justify-start w-[70px] bg-slate-200 `}
        >
          <div className={`${status.packed && !status.shipped && "pulse"} circle  p-4`}>
          <img
            src={deliveryPackage1Icon}
            className={`${status.packed ? "invert-img-2" : ""}  h-9 `}
          />
          {status.shipped && (
            <div>
              <img
                src={completedCheckIcon}
                className=" completed-delay-2  h-6 absolute top-0 right-[-5px]"
              />
            </div>
          )}
        </div>
        </div>
        <div
          style={{ display: "flex", flexDirection: "column" }}
          className="items-center justify-start h-12"
        >
          <div className="tooltip relative hover:cursor-pointer">
            <span className="font-semibold text-lg ">Packed</span>
          </div>
          <div
            className={`${
              status.shipped
                ? "stage-completed-4 stages-completed"
                : "stage-pending"
            } bg-slate-200 w-48 h-1`}
          ></div>
        </div>
        <div
          className={`${
            status.shipped ? "stage-completed" : "stage-pending"
          }  rounded-full flex items-center relative justify-start w-[70px] bg-slate-200 `}
        >
          <div className={`${status.shipped && !status.delivered && "pulse"} circle  p-4`}>
          <img
            src={deliveryVanIcon}
            className={`${status.shipped ? "invert-img-3" : ""}  h-9 `}
          />
          {status.delivered && (
            <div>
              <img
                src={completedCheckIcon}
                className=" completed-delay-3  h-6 absolute top-0 right-[-5px]"
              />
            </div>
          )}
        </div>
        </div>
        <div
          style={{ display: "flex", flexDirection: "column" }}
          className="items-center justify-start h-12"
        >
          <div className="tooltip relative hover:cursor-pointer">
            <span className="font-semibold text-lg ">Shipped</span>
            <span className="tooltiptext"> View-Shipment-Status</span>
          </div>
          <div
            className={`${
              status.delivered
                ? "stage-completed-6 stages-completed"
                : "stage-pending"
            } bg-slate-200 w-48 h-1`}
          ></div>
        </div>
        <div
          className={`${
            status.delivered ? "stage-completed" : "stage-pending"
          } p-4 rounded-full flex items-center relative justify-start w-[70px] bg-slate-200`}
        >
          <img
            src={deliveryPackage2Icon}
            className={`${status.delivered ? "invert-img-4" : ""}  h-9 `}
          />
          {status.delivered && (
            <div>
              <img
                src={completedCheckIcon}
                className=" completed-delay-4  h-6 absolute top-0 right-[-5px]"
              />
            </div>
          )}
        </div>
      </dir>

      <div className="bg-white  px-6 w-full  mt-16">
        <div className="flex items-center justify-between w-auto">
          <div>
            <div className="text-2xl font-bold">Order Status</div>
            <div className="text-lg font-semibold text-gray-400">
              {orderDetail?.orderStatus}
            </div>
          </div>
          { orderDetail?.replacementLastDate ? 
          orderDetail?.replacementLastDate > new Date() ? (
            <div>
              <span className=" text-slate-500 span-label">
                Last Day For Replacement:{" "}
              </span>
              <span className=" span-text">
                {formatOrderedDate(orderDetail?.replacementLastDate || 0)}
              </span>
            </div>
          ):(
            <div>
              <span className=" text-slate-500 span-label">
                Replacement Window Closed on:{" "}
              </span>
              <span className=" span-text">
                {formatOrderedDate(orderDetail?.replacementLastDate || 0)}
              </span>
            </div>
          ) : null}
          
          <div>
            <div className="text-2xl font-bold">Tracking Number</div>
            <div className="text-lg font-semibold text-gray-400">
              {orderDetail?.trackingId
                ? orderDetail.trackingId
                : "Not Available"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const EstimatedDelivery = ({ eta, shippingMethod, shippingHeader }) => {
  return (
    <div className="bg-white   px-6 w-full  mb-16">
      <div className="flex items-center justify-between w-auto">
        <div className="w">
          <div className="text-2xl font-bold">{shippingHeader}</div>
          <div className="text-lg font-semibold text-gray-400">
            {eta ? formatOrderedDate(eta || 0) : "Not Available"}
          </div>
        </div>
        <div className="">
          <div className="text-2xl font-bold">Shipping Method</div>
          <div className="text-lg font-semibold text-gray-400">
            {shippingMethod ? shippingMethod : "Not Available"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShipmentStatus;
