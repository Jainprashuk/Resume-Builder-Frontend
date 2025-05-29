"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import { verifyToken } from "../services/Auth/Auth";
import ProtectedRoute from "../utils/ProtectedRoute";
import NavbarComponent from "../app/home/navbar";
import { BackgroundLines } from "../components/ui/background-lines";

export default function Home() {
  return (
    <>
      <div className="relative w-full flex items-center justify-center ">
        {/* <NavbarComponent /> */}
        {/* xsc,m */}
      </div>
      {/* <ThreeDMarquee images={images} /> */}
      <BackgroundLines className="flex items-center justify-center w-full flex-col px-4 bg-black">
        <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
          Sanjana Airlines, <br /> Sajana Textiles.
        </h2>
        <p className="max-w-xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
          Get the best advices from our experts, including expert artists,
          painters, marathon enthusiasts and RDX, totally free.
        </p>
      </BackgroundLines>
    </>
  );
}
