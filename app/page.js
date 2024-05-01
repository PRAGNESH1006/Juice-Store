'use client'
import { useEffect, useState } from "react";

import Image from "next/image";
import supabase from "./supabase/supabaseClient";
import Link from "next/link";
export default function Home() {

  const [fetchError, setFetchError] = useState(null)
  const [smoothies, setSmoothies] = useState(null)

  useEffect(() => {

    const fetchData = async () => {
      const { data, error } = await supabase
        .from('smoothies')
        .select()

      if (error) {
        setFetchError('could not fetch smoothies data')
        console.log(error)
        setSmoothies(false)
      }

      if (data) {
        setSmoothies(data)
        setFetchError(null)
      }
    }
    fetchData()
  }, [])


  return (
    <div className="flex items-center justify-center flex-col  gap-4 ">
      <p className="text-2xl mt-4">All Smoothies data Created by other users</p>
      {fetchError && (<p>{fetchError}</p>)}
      {smoothies && (<div className=" mx-10 ">
        <div className=" grid grid-cols-3 gap-[40px] py-4 px-8">
          {
            smoothies.map(item =>
            (<div key={item.id} className="h-[320px] text-[ffebf2] p-[10px] box-border rounded-lg relative gap-x-[20px] w-auto  bg-[#102632]  ">

              <h2 className="text-[1.5rem] text-center w-full h-[50px] bg-[#92a9a7] text-[#201a0e] rounded-lg pt-2">{item.title}</h2>
              <h3 className="pt-2 px-2 h-[200px] overflow-auto ">{item.method}</h3>

              <div className="flex justify-center items-center absolute top-[-10px] right-[-10px] bg-[#6d15df] rounded-[6px] w-[30px] h-0  text-center p-[20px]  ">{item.rating}</div>
              <div className="  px-2 my-2 flex justify-evenly  ">
                <Link href={`/update`}>
                  <button className="rounded-xl w-24 h-10  bg-[#6d15df]">Update</button>
                </Link>
                <button className="rounded-xl w-24 h-10 bg-red-800">Delete</button>
              </div>
            </div>
            ))}
        </div>
      </div>)}
    </div>
  )
}
