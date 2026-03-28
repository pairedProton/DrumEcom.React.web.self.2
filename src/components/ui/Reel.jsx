import React from 'react'

const Reel = ({item}) => {
  return (
    <div className="w-full aspect-[3.5/6] rounded-lg overflow-hidden bg-gray-100 shadow-md hover:shadow-lg transition-shadow duration-300">
      <video src={item}
      autoPlay
      loop
      muted
      className="w-full h-full object-cover"
      alt="" />
    </div>
  );
}

export default Reel