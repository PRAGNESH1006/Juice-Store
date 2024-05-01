"use client";
import React from "react";
import { useParams } from 'next/navigation'

function Page() {
  const { team } = useParams()
  console.log(team)
  return (<div>UpdatePage: </div>);
}

export default Page;
