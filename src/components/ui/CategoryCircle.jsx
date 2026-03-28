import React from 'react'

const CategoryCircle = ({img,title}) => {
  return (
    <div className='flex flex-col gap-2 justify-center items-center group ' >
        <div className='w-54 aspect-square rounded-full bg-white overflow-hidden'>
            <img src={img} alt={title} className='w-full h-full object-cover group-hover:scale-110 transition-all duration-300 ' />
        </div>
        <span className='text-md font-semibold font-body group-hover:text-emerald-600 cursor-pointer'>{title}</span>
    </div>
  )
}

export default CategoryCircle