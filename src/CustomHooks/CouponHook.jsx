import { useContext, useEffect, useState } from 'react';
import { applyCoupon, deleteCoupon, getAllCoupons, updateCoupon } from '../service/couponsServices';
import { AccountContext } from '../context/AccountProvider';



const useCoupons = () => {
    const [loading, setLoading] = useState(false);
    const {account} = useContext(AccountContext)
    const [coupons, setCoupons] = useState([]);

    useEffect(() => {
        fetchAllCoupons(account?.email);
    }, []);

    
    const fetchAllCoupons = async () => {
        if(!account)return
        setLoading(true);
        const response = await getAllCoupons(account?.email);
       
        const data = response?.sort((a,b)=>b.discountPercentage - a.discountPercentage)
        setCoupons(data);
        setLoading(false);
    };

    const removeCoupon = async (couponId) => {
        setLoading(true);
        await deleteCoupon(couponId);
        await fetchAllCoupons(); // Refresh coupons after deletion
        setLoading(false);
    };

    const modifyCoupon = async (couponId, updateData) => {
        setLoading(true);
        await updateCoupon(couponId, updateData);
        await fetchAllCoupons(); // Refresh coupons after modification
        setLoading(false);
    };

    const applyDiscount = async (couponId ) => {
        setLoading(true);
        const response = await applyCoupon(couponId, account?.email);
        setLoading(false);
        return response;
    };

    const findCoupon = (couponId) => {
        return coupons.find((coupon) => coupon.couponCode === couponId);
    };


    return {
        fetchAllCoupons,
        removeCoupon,
        modifyCoupon,
        applyDiscount,
        coupons,
        findCoupon,
        loading,
    };
};

export default useCoupons;
