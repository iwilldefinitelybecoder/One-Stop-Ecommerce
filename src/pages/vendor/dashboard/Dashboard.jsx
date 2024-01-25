import React, { useEffect, useMemo, useState } from 'react'
import SalesChart from './SalesChart'
import { ordersListIcon } from '../../../assets/icons/png/user-page-icons/data';
import { Link } from 'react-router-dom';
import ExtraContent from '../../../components/body/UtilsComponent/ExtraContent';
import { getDateRange } from '../../../utils/DisplayFormatters';
import { getDashboardData } from '../../../service/vendorServices';
import { CircularProgress, Rating } from '@mui/material';
import RatingEmojianimation from '../../../components/body/UtilsComponent/RatingEmojiAnimation';
import { sleep } from '../../../utils/utils';


const Dashboard = () => {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

console.log(data)
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await getDashboardData();
        setData(response);
      } catch (error) {
        // Handle error if needed
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const chartData = useMemo(() => {
    if (!loading && data) {
      return data.salesData?.map(item => ({
        date: new Date(item.date).toLocaleDateString(),
        count: item.count
      }));
    }
    return null; // or an empty array, depending on your preference
  }, [data, loading]);

  

  return (
    <>{loading ?
      <div className='flex w-full h-full justify-center items-center bg-white'>
        <CircularProgress />
      </div>
      :
      <div>
        <div className="ad-prdct-hdr my-4 mb-8 ">
          <div className="ad-prdct-title flex items-center">
            <img src={ordersListIcon} className="h-8 mr-3" />
            <span className="text-2xl font-bold ">Dashboard</span>
          </div>

        </div>
        <div className=' flex items-center my-8'>
          <ExtraContent header={'Earnings (before taxes)'} width={"305px"} content={'₹' + data?.earnings} subContent={'after associated vendor fees'} />
          <ExtraContent header={'Your Store Rating'} width={"304px"} content={<RatingEmojianimation rating={data?.vendorRatings} />} subContent={<Rating value={data?.vendorRatings} readOnly />} />
          <ExtraContent header={'Pending Order'} width={"305px"} content={data?.pendingOrders} subContent={getDateRange(data?.from, data?.to)} />
        </div>
        <SalesChart data={chartData && chartData} />
      </div>
    }
    </>
  )
}

export default Dashboard