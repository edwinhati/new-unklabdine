import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import Image from "next/image";
import avatar from "../assets/images/avatar.png";
import { useState } from "react";
import QRCode from "react-qr-code";
import Link from "next/link";
import logout from "@/assets/icons/logout.svg";
import udineic from "@/assets/icons/udineic.svg";

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);
  }, 2000);
  const border = "border-udine-6";
  const shadow = "shadow-udine-6";
  return (
    <>
      <Header label="Profile" hasBack={false} />
      <div className=" mt-[100px] flex flex-col justify-center items-center">
        <div className="w-[100px] h-[100px] rounded-full bg-udine-1">
          <Image
            src={avatar}
            alt=""
            className="w-[100px] h-[100px] rounded-full"
          />
        </div>
        <div
          className={`flex flex-col justify-center items-center -mt-[50px] ${border} ${shadow} border-4 bg-white shadow-lg -z-10 rounded-xl mb-6`}
        >
          <div className="rounded w-[300px] h-[380px] mx-auto justify-center items-center flex flex-col">
            <div className="flex flex-col justify-center items-center">
              <h1 className="font-bold text-[18px] text-[#2D2D2D] text-center">
                Joe Doe
              </h1>
              <h1 className="font text-[16px] text-[#2D2D2D]">Residence</h1>
            </div>
            <div className="w-[200px] h-[200px] bg-udine-1 mt-[20px]">
              <div className="flex flex-col justify-center items-center">
                <div className="w-[200px] h-[200px] bg-white">
                  {loading ? (
                    <div className="flex justify-center items-center w-[200px] h-[200px]">
                      \{" "}
                      <i className="fa-solid fa-spinner text-3xl text-udine-1 animate-spin" />
                    </div>
                  ) : (
                    <QRCode
                      value="Code"
                      size={200}
                      bgColor="#FFFFFF"
                      fgColor="#000000"
                      level="Q"
                      onLoad={() => setLoading(false)}
                    />
                  )}
                </div>
                <div>
                  <h1 className="font text-[8px] text-[#808080] mt-[10px] w-60 text-center">
                    This QR code is only valid during the current mealtime
                  </h1>
                  <h1 className="font text-[10px] text-[#808080] mt-[2px] w-60 text-center">
                    Today - Breakfast
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="flex flex-row items-center justify-center text-center flex-1  gap-2">
            <Link
              href="/about"
              className="flex justify-center items-center border-2 py-2 w-[150px] h-[50px] rounded-lg hover:text-udine-1
          text-sm hover:bg-slate-100 bg-white font-semibold"
            >
              <Image src={udineic} alt="Google" className="mr-3" />
              About Us
            </Link>
            <Link
              href="/"
              className="flex justify-center items-center border-2 py-2 w-[150px] h-[50px] rounded-lg hover:text-udine-1
          text-sm hover:bg-slate-100 bg-white font-semibold"
            >
              <Image src={logout} alt="Google" className="mr-3" />
              Logout
            </Link>
          </div>
        </div>
      </div>
      <Navigation />
    </>
  );
}