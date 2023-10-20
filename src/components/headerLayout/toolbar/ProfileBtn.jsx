import React from 'react'
import { userIcon } from '../../../assets/icons/png/toolbar1/data'

function ProfileBtn() {
  return (
    <div className='profile-icon rounded-full bg-slate-100 ml-3 shadow-md'>
      <img src={userIcon} alt="" className='user-icon' />
    </div>
  )
}

export default ProfileBtn