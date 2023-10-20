import React from "react";
import "./footer.css";
import {
  appstoreIcon,
  facebookIcon,
  googleIcon,
  googleplayIcon,
  instagramIcon,
  logoIcon,
  twitterIcon,
  youtubeIcon,
} from "../../assets/icons/png/toolbar1/data";
const Footer = () => {
  return (
    <>
      <div className="Footer-main-container">
        <div className="footer-sub-container">
          <div className="footer-container">
            <div className="footer-company-info footer-info-container">
              <div className="footer-logo ">
                <span className=" text-light-pink font-poppins font-extrabold text-3xl ">
                  ONESTOP
                </span>
              </div>
              <div className="footer-company-name text-slate-100 text-md pb-5 pt-0">
                © 2021 One-Stop
              </div>
              <div className="footer-about-us-content  text-slate-400">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione itaque dolorem minima neque voluptatem molestias similique temporibus excepturi .
                </p>
              </div>
              <div className="footer-app-link flex text-white space-x-6 mt-4">
                <a href="">
                  <div className="google-play-store flex  bg-social-icon-bg  px-4 pt-2 pb-1 cursor-pointer">
                    <img
                      src={googleplayIcon}
                      alt=""
                      className="app-link-icon h-7 mr-2 mt-1"
                    />
                    <div className="google-play-text ">
                      <span className="sp1 ">Get it on</span>
                      <span className="sp2 ">Google Play</span>
                    </div>
                  </div>
                </a>
                <a href="">
                  <div className="google-play-store flex  bg-social-icon-bg  px-4 pt-2 pb-1 cursor-pointer">
                    <img
                      src={appstoreIcon}
                      alt=""
                      className="app-link-icon h-7 mr-2 mt-1"
                    />
                    <div className="google-play-text ">
                      <span className="sp1 ">Download on the </span>
                      <span className="sp2 ">App Store</span>
                    </div>
                  </div>
                </a>
              </div>
            </div>
            <div className="footer-about-us footer-info-container">
              <div className="footer-about-us-heading">
                <h2 className="text-white font-poppins font-extrabold text-2xl">
                  About us
                </h2>
              </div>
              <div className="footer-about-us-list">
                <ul className=" text-slate-400 mt-4 space-y-1">
                  <li>
                    <a>Careers</a>
                  </li>
                  <li>
                    <a>Our Store</a>
                  </li>
                  <li>
                    <a>our Cares</a>
                  </li>
                  <li>
                    <a>Portfolio</a>
                  </li>
                  <li>
                    <a>Privacy ploicy</a>
                  </li>
                  <li>
                    <a>Terms & Conditions</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="footer-customer-care footer-info-container">
              <div className="footer-customer-care-heading">
                <h1 className="text-white font-poppins font-extrabold text-2xl">
                  Customer Care
                </h1>
              </div>
              <div className="footer-customer-care-list">
                <ul className=" text-slate-400 mt-4 space-y-1 ">
                  <li>
                    <a>Help Center</a>
                  </li>
                  <li>
                    <a>How to Buy</a>
                  </li>
                  <li>
                    <a>Track Your Order</a>
                  </li>
                  <li>
                    <a>Returns & Refunds</a>
                  </li>
                  <li>
                    <a>Contact Us</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="footer-contact-us footer-info-container space-y-2 ">
              <div className="footer-contact-us-heading">
                <h1 className="text-white font-poppins font-extrabold text-2xl">
                  Contact Us
                </h1>
              </div>
              <div className="footer-address">
                <span className=" text-slate-400">
                  70 Washington Square South, New York, NY 10012, United States
                </span>
                <span className=" text-slate-400">
                  Email: uilib.help@gmail.com
                </span>
                <span className=" text-slate-400">Phone: +1 1123 456 780</span>
              </div>
              <div className="footer-social-media-icons">
                <button className="footer-icon-container">
                  <img
                    src={facebookIcon}
                    alt=""
                    className="social-media-icons"
                  />
                </button>
                <button className="footer-icon-container">
                  <img
                    src={twitterIcon}
                    alt=""
                    className="social-media-icons"
                  />
                </button>
                <button className="footer-icon-container">
                  <img
                    src={youtubeIcon}
                    alt=""
                    className="social-media-icons"
                  />
                </button>
                <button className="footer-icon-container">
                  <img
                    src={instagramIcon}
                    alt=""
                    className="social-media-icons"
                  />
                </button>
                <button className="footer-icon-container">
                  <img src={googleIcon} alt="" className="social-media-icons" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
