import React from 'react'
import './InfoBar.css'
import {telephoneIcon,emailIcon,usIcon,downArrowIcon} from '../../../assets/icons/png/toolbar-icons/data'

function InfoBar() {
  return (


  <div className='main-info-container bg-info-bar'>
    <div className='sub-info-container'>    
      <div className='content-holder flex justify-between px-2 py-2.5'>


        <div className='help-info-holder margin flex '>
          <div className='ph-number-holder flex'>
            <div className='ph-icon '>
              <img src={telephoneIcon} alt="phoneicon" className='phone-icon' />
            </div>
            <div className='ph-number text-white text-info-bar margins'>
              <span>+91 6361912506</span>
            </div>
          </div>


          <div className='email-holder margin flex '>
          <div className='emial-icon'>
              <img src={emailIcon} alt="email" className='email-icon ' />
            </div>
            <div className='emailId text-white text-info-bar margins'>
              <span>support@oneStop.com</span>
            </div>
          </div>

        </div>


        <div className='top-right-bar'>
          <div className='content-holder flex'>


            <div className='need-help margin text-info-bar ' > 
              <span className='text-white hover:text-light-pink transition-colors text-sm'>Need Help?</span>
            </div>

            <div className='language-container margin flex' >
            <div className='language-icon margins'>
              <img src={usIcon} alt="language" className='lang-icon' />
              </div>
              <div className='language text-info-bar margins'>
                <span className='text-white text-sm'>EN</span>
              </div>
              <div className='language-icon margins'>
              <img src={downArrowIcon}  className='downarrow-icon' />
              </div>
            </div>

            <div className='country-container margin flex' >
            <div className='country-icon'>
              <img src={usIcon} alt="countryimage" className='country-icon' />
              </div>
              <div className='country text-info-bar margins' >
                <span className='text-white text-sm'>USD</span>
              </div>
              <div className='country-icon margins' >
              <img src={downArrowIcon} className='downarrow-icon' />
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InfoBar