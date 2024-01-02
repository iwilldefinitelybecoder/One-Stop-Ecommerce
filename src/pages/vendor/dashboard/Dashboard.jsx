import React from 'react'
import SalesChart from './SalesChart'
import { ordersListIcon } from '../../../assets/icons/png/user-page-icons/data';
import { Link } from 'react-router-dom';
import ExtraContent from '../../../components/body/UtilsComponent/ExtraContent';
import { getDateRange } from '../../../utils/DisplayFormatters';

const salesData = [
  { date: "2015-12-01", count: 10 },
  { date: "2016-12-02", count: 2 },
  { date: "2017-12-03", count: 30 },
  { date: "2018-12-04", count: 25 },
  { date: "2019-12-05", count: 13 },
  { date: "2020-12-06", count: 26 },
  { date: "2021-12-08", count: 26 },
  { date: "2022-12-09", count: 28 },
  { date: "2023-1-10", count: 32 },
  { date: "2023-2-11", count: 28 },
  { date: "2023-3-12", count: 25 },
  { date: "2023-4-13", count: 42 },
  { date: "2023-5-14", count: 44 },
  { date: "2023-6-10", count: 32 },
  { date: "2023-12-23", count: 28 },
  { date: "2023-12-24", count: 25 },
  { date: "2023-12-25", count: 42 },
  { date: "2023-12-26", count: 44 },
  { date: "2023-12-27", count: 40 },
  { date: "2023-12-28", count: 28 },
  { date: "2023-12-29", count: 25 },
];

const Dashboard = () => {


  

  return (
    <div>
        <div className="ad-prdct-hdr my-4 mb-8 ">
          <div className="ad-prdct-title flex items-center">
            <img src={ordersListIcon} className="h-8 mr-3" />
            <span className="text-2xl font-bold ">Dashboard</span>
          </div>
      
        </div>
        <div className=' flex items-center my-8'>
          <ExtraContent header={'Earnings (before taxes)'} width={"305px"} content={'₹30450.00'} subContent={'after associated vendor fees'} />
          <ExtraContent header={'Your balance'} width={"304px"} content={'₹4000.00'} subContent={'Will be processed '} />
          <ExtraContent header={'Pending Order'}  width={"305px"} content={'0'} subContent={getDateRange()} />
        </div>
      <SalesChart data={salesData} />
    </div>
  )
}

export default Dashboard