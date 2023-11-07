import React from "react";
import "./toolbar.css";
import { logoIcon } from "../../../assets/icons/png/toolbar1/data";
import SearchBar from "./SearchBar";
import ProfileBtn from "./ProfileBtn";
import CartBtn from "./CartBtn";
import { Link } from "react-router-dom";


const Toolbar = () => {

  const [prevScrollpos, setPrevScrollpos] = React.useState(pageYOffset)
  const [posFixed, setPosFixed] = React.useState('toolbar-info-container')
  window.onscroll = function() {myFunction()}
  function myFunction() {
    const currentScrollPos = window.pageYOffset;
    if (prevScrollpos > 100) {
      setPosFixed('toolbar-info-container-sticky');
    } else {
      setPosFixed('toolbar-info-container');
    }
    setPrevScrollpos(currentScrollPos);
  }


  return (
    <div className={`${posFixed}`}>
      <div className="sub-toolbar-info-container ">
        <div className="toolbar-content-holder my-3  ">
          <Link to={"/"}>
          <div className={`logo ${prevScrollpos>100?'sticky-logo':''}`}  >
            <img src={logoIcon} alt="logo" className=" h-16 w-56" />
          </div>
          </Link>
          <div className="search-bar">
            <SearchBar />
          </div>
          <div className="right-side-icons flex relative w-32 justify-between">
            <ProfileBtn />
            <CartBtn/>
            
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Toolbar;
