import React, { useEffect, useState } from "react";
const BooksCard = React.lazy(()=> import("../components/BooksCard"))
import LoadingBar from "@/components/Loading";


export default function Home() {

  const [Loading,setLoading] = useState(true);

  useEffect(()=>{
    setTimeout(()=>{

      setLoading(false)

    },1000)
  },[])

  if(Loading){
    return(<LoadingBar/>)
  }

  return (
    <>
      <div className=" px-8 flex flex-col-reverse md:flex-row pt-16 md:pt-10">
        <div className="w-full  md:w-1/2 lg:w-1/2 border p-4 shadow-md">
          <div className=" space-y-4 md:space-y-12">
            <h1 className=" text-4xl font-bold pt-[10vh] pr-20 ">
              Hello Welcome here to learn something{" "}
              <span className="text-green-700">new everyday</span>
            </h1>

            <p className=" text-xl ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
              beatae, dicta in dolor iure temporibus inventore ab, dignissimos
              nam delectus earum magnam velit quasi dolorem, harum laudantium
              repellat? Perferendis, ipsum?
            </p>
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input type="text" className="grow" placeholder="Email" />
            </label>
          </div>

          <button className="btn btn-success  mt-2 mb-5">Success</button>
        </div>

        <div className="w-full  md:w-1/2 lg:w-1/2 flex items-center justify-center ">
        
        <img className=" rounded-full  w-full md:w-2/3 pt-10 "  loading="lazy" src="./tinified/HomeBanner.jpg" alt="" />
        
        </div>
      </div>

                
      <BooksCard/>
    </>
  );
}
