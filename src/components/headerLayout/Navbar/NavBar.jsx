import React, { useCallback, useContext, useEffect, useState } from "react";
import { categoryIcon } from "../../../assets/icons/png/toolbar1/data";
import {
  downArrowIcon,
  rightArrowIcon,
} from "../../../assets/icons/png/toolbar-icons/data";
import "./navbar.css";
import { categoryList } from "../../../data/categoryList";
import { Link } from "react-router-dom";
import { UserToolbarList } from "../../../data/UserToolbarList";
import { vendorToolbarList } from "../../../data/vendorToolbarList";
import { roles } from "../../../routes/Path";
import { AccountContext } from "../../../context/AccountProvider";


const NavBar = () => {

  const {account} = useContext(AccountContext);

  const [category, setCategory] = useState(false);
  const [subCategory, setSubCategory] = useState(
    Array(categoryList.length).fill(false)
  );
  const [userListBtn, setUserListBtn] = useState(false);
  const [vendorListBtn, setVendorListBtn] = useState(false);
  const [userList, setUserList] = useState(UserToolbarList);
  const [vendorList, setVendorList] = useState(vendorToolbarList);

  const handelUserListBtnOpen = () => {
    setUserListBtn(true);
    setVendorListBtn(false);

    
  };



  const handelUserListBtnClose = () => {

    setUserListBtn(false);
  };


  const handelVendorListBtnOpen = () => {
    setVendorListBtn(true);
    setUserListBtn(false);
  };

  const handelVendorListBtnClose = () => {
    setVendorListBtn(false);
  
  };

  const handelToggle = () => {
    setCategory(!category);
    setSubCategory(subCategory.fill(false));
  };

  const handelSubCategoryToggelopen = (index) => {
    const updatedArray = [...subCategory];
    updatedArray[index] = true;
    setSubCategory(updatedArray);
  };

  const handelSubCategoryToggelClose = (index) => {
    const updatedArray = [...subCategory];
    updatedArray.fill(false);
    setSubCategory(updatedArray);
  };

  const subCategoryLists = useCallback((subCategory) => {
    return (
      <div className="nb-sb-cat-li-cntr">
        <div
          className="nb-sb-cat-li-helper"
          onClick={(e) => {
            handelToggle();
          }}
          style={{ height: subCategory.length > 5 ? "100%" : "190%" }}
        ></div>
        <div
          className="nb-sb-cat-li-hldr"
          style={{ width: subCategory.length > 5 ? "800px" : "auto" }}
        >
          {subCategory?.map((list, index) => (
            <div className="nb-sb-cat-indv-li space-y-3" key={index}>
              <span className="nb-sb-cat-li-title font-bold">{list.name}</span>
              {list.li?.map((l, index) => (
                <a to={l.link} key={index}>
                  <span className="nb-sb-cat-li-ele font-semibold  hover:text-light-pink ">
                    {l.name}
                  </span>
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  });

  const categoryLists = categoryList?.map((list, index) => {
    if (list.hasOwnProperty("subcategory")) {
      return (
        <div
          className="nb-cat-lis hover:bg-slate-100 border-l-4 border-white hover:border-l-4 hover:border-light-pink"
          key={index}
          onClick={(e) => handelSubCategoryToggelopen(index)}
          onMouseLeave={(e) => {
            handelSubCategoryToggelClose(index);
          }}
        >
          <div className="flex px-5 py-2.5 justify-between">
            <div className="flex">
              <img src={list.icon} className={`nb-category-icon h-7 `} />
              <button className="">
                <span className=" mx-5 text-slate-500 font-semibold">
                  {list.type}
                </span>
              </button>
            </div>
            <img src={rightArrowIcon} alt="" className=" h-3 mt-1.5  " />
          </div>

          {subCategory[index] && subCategoryLists(list.subcategory)}
        </div>
      );
    } else {
      return (
        <div
          className="nb-cat-lis hover:bg-slate-100 border-l-4 border-white hover:border-l-4 hover:border-light-pink"
          key={index}
        >
          <button className="flex px-5 py-2.5">
            <img src={list.icon} className={`nb-category-icon h-7 `} />
            <span className=" mx-5 text-slate-500 font-semibold">
              {list.type}
            </span>
          </button>
        </div>
      );
    }
  });

  return (
    <>
      <div className="nb-main-cntr">
        <div className="nb-sb-cntr">
          <div className="nb-cat-li">
            <div
              className="nb-cat-li-btn hover:shadow-lg"
              onClick={handelToggle}
            >
              <img src={categoryIcon} alt="" className="cat-img h-5" />
              <div className="cat-txt-cntr">
                <span>Search by Categories</span>
              </div>
              <img
                src={downArrowIcon}
                alt=""
                className={`cat-dn-arrow h-5 ${
                  category ? "rotate-180" : "rotate-0"
                } transition-all`}
              />
            </div>
            {category && (
              <>
                <div className="nb-cat-li-ctnr py-3">{categoryLists}</div>
              </>
            )}
          </div>
          <div className="nb-links " onMouseLeave={(e)=>{handelUserListBtnClose();handelVendorListBtnClose()}} >
            <Link to="/home">
            <span className="nav-bar-span">home</span>
            </Link>
            <div className="user-acc-li hover:shadow-lg" onClick={handelUserListBtnOpen}>
              <span className="flex nav-bar-span">
                Account
                <img src={downArrowIcon} alt="" className="h-5 mt-1 ml-1 " />
              </span>
              { userListBtn &&
              <div className="user-acc-li-dpdn-cntr" >
                <div className="user-acc-li-dpdn-body">
                  <UserList  lists = {userList} handelClose={handelUserListBtnClose}/>
                </div>
              </div>
              }
            </div>
            { account?.roles?.includes(roles.VENDOR) &&
            <div className="vendor-acc-li hover:shadow-lg" onClick={handelVendorListBtnOpen}>
              <span className="flex nav-bar-span">
                Vendor
                <img src={downArrowIcon} alt="" className="h-5 mt-1 ml-1" />
              </span>
              <div className="vendor-acc-li-dpdn">
              { vendorListBtn &&
              <div className="user-acc-li-dpdn-cntr"  >
                <div className="user-acc-li-dpdn-body">
                  <UserList  lists = {vendorList} handelClose={handelVendorListBtnClose}/>
                </div>
              </div>
              }
              </div>
            </div>
            }
            <Link to="/user/orders">
            <span className="nav-bar-span">Track Orders</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

const UserList = ({ lists,handelClose,}) => {

  const [subToolbarList, setSubToolbarList] = useState(Array(lists.length).fill(false));
  const windowWidth = window.innerWidth;
  const handelMouseEnter = (index) => {
    const updatedArray = [...subToolbarList];
    updatedArray[index] = true;
    setSubToolbarList(updatedArray);
  };

  const handelMouseLeave = (index) => {
    const updatedArray = [...subToolbarList];
    updatedArray.fill(false);
    setSubToolbarList(updatedArray);
  }


  const List = lists?.map((list, index) => {
    if (list?.hasOwnProperty("subList")) {
      return (
        <div className="user-acc-dpdn-li" onClick={(e)=>{handelMouseEnter(index)}} onMouseLeave={(e)=>handelMouseLeave(index)}
        key={index}
        >
          <div className="acc-li-name">
            <span>{list.name}</span>
          </div>
        
            <>
              <div className="acc-li-ext-arrow">
                <img src={rightArrowIcon} className=" pr-3 h-3" />
              </div>
              {subToolbarList[index] &&
              <div className={`${windowWidth>=1600?'orders-li-ext-main-right':'orders-li-ext-main-left'}`} >
                <div className="orders-li-ext-body" key={index}>
                  { subToolbarList[index] && list.subList.map((sublis, index) => (
                    <Link to={sublis.link}>
                      <div className="orders-ext-li" key={index} onClick={(e)=>{handelClose()}}>
                        <div className="acc-li-name">
                          <span className="text-black hover:text-light-pink flex flex-wrap">{sublis.name}</span>
                        </div>
                        <div className="acc-li-ext-arrow">
                          <img
                            src={rightArrowIcon}
                            className="pr-3 mt-1.5 h-3 "
                          />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
              }
            </>
      
        </div>
      );
    }else{
      return (
        <Link to={list.link}>
        <div className="user-acc-dpdn-li "
        key={index}
        onClick={(e)=>{handelClose()}}
        >
          <div className="acc-li-name">
            <span>{list.name}</span>
          </div>
        </div>
        </Link>
      );
    }
  });


  return(
    <>
    {List}
    </>
  )
};

export default NavBar;
