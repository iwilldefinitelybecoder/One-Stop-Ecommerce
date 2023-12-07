import React from 'react'

const ListCards = ({address}) => {
  return (
    <>
    <div className=' space-y-0.5 ' style={{display:'flex',flexDirection:"column"}}>
        <span className=' font-semibold text-lg'>{address.name}</span>
        <span className='font-semibold'>{address.email}</span>
        <span className=' font-semibold text-slate-600'>{address.area}</span>
        <span className=' font-semibold text-slate-600'>{address.locality}</span>
        <span></span>
        <span>{address.phone}</span>
        <span className=' font-semibold text-slate-500'>{address.city} {address.country} <span className=' text-light-pink'>{address.zipCode}</span></span>
        <span></span>
    </div>
    </>
  )
}

export default ListCards