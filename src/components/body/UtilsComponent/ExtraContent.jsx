import React from 'react'

const ExtraContent = ({header,content,subContent,width,height}) => {
  return (
    <div className={`info-cntr bg-white px-8 py-4 rounded-md shadow-md items-center justify-center mr-6  font-semibold`} style={{display:"flex",flexDirection:'column',width:width}}>
        <div className='info-header text-slate-500 text-lg'>{header}</div>
        <div className=' info-content text-3xl font-bold '>{content}</div>
        <div className='info-sub-content text-slate-500 text-base '>{subContent}</div>
      </div>
  )
}

export default ExtraContent