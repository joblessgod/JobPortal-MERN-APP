import React from 'react'
import { InfinitySpin } from 'react-loader-spinner'

const Loader = ({width,height}) => {
  return (
   
    <InfinitySpin width={width} height={height} color="black" />
  
  )
}

export default Loader;