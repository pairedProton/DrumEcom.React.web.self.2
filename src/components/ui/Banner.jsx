import React from 'react'

const Banner = ({img}) => {
  return (
    <>
        <img src={img} alt="" className='w-full h-full object-cover' />
    </>
  )
}

export default Banner