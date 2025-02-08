import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { lazy } from "react";
const BooksCard_Course = React.lazy(()=>import("../components/BookCard_Course"))
import LoadingBar from "@/components/Loading";


export default function Course() {

  const [Loading,setLoading] = useState(true);

  useEffect(()=>{

    setTimeout(() => {
      setLoading(false)
    }, 1000);

  },[])


 if(Loading){ return(<LoadingBar/>)}
      
  return (
    <div className=" px-8 flex flex-col  pt-16 md:pt-10 items-center justify-center">
      <div className="pt-16 flex flex-col items-center">
        <h1 className="text-center text-4xl ">
          We're delighted to have you{" "}
          <span className="text-pink-600">Here! :) </span>
        </h1>
        <p className="text-center pt-4 md:w-2/4 text-xl  ">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odit,
          numquam unde. Velit corrupti autem, dolor consequuntur odit, ullam
          corporis ipsum fuga dolores sit iure facere expedita eos. Ratione,
          velit laborum.
        </p>
        <NavLink to="/">   <button className="btn btn-primary mt-5"> Back</button></NavLink>
     
      </div>
      <div className="h-auto">
        <BooksCard_Course></BooksCard_Course>
      </div>
    </div>
  );
}
