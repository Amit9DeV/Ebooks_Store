import React from 'react'
import { Audio } from 'react-loader-spinner'

export default function LoadingBar() {
  return (
    <div className="h-[60vh] flex flex-col justify-center items-center " ><Audio
    height="200"
    width="200"
    radius="9"
    color="green"
    ariaLabel="loading"
    wrapperStyle
    wrapperClass
  />
  <p>Loading</p>
  </div>
  )
}
