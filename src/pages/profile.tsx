/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import QRCode from "react-qr-code";
import udineic from "@/assets/icons/udineic.svg";
import logout from "@/assets/icons/logout.svg";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import { useUser } from "@/context";
import { signOut, today, mealtime as mt } from "@/config";
import avatar from "@/assets/images/avatar.png";
import Protected from "@/guard";
import { getDate } from "./api/rating/mealtime";
import axios from "axios";

export default function profilePage() {
  const { user, loading, residence } = useUser();
  const [name, setName] = useState(user?.displayName?.split(" ")[0] || "");
  const [photo, setPhoto] = useState(user?.photoURL || null);
  const [noreg, setNoreg] = useState(user?.email?.split("@")[0] || "");
  const [mealtime, setMealtime] = useState(mt);
  const [border, setBorder] = useState("");
  const [shadow, setShadow] = useState("");

  useEffect(() => {
    if (residence === "Outsider") {
      setBorder("border-red-500");
      setShadow("shadow-red-500");
    } else {
      setBorder("border-udine-1");
      setShadow("shadow-udine-1");
    }
  }, [residence]);

  useEffect(() => {
    if (user) {
      setName(user.displayName.split(" ")[0]);
      setPhoto(user.photoURL);
      setNoreg(user.email.split("@")[0]);
    }
  }, [user]);

  useEffect(() => {
    let latestBorder = border;
    let latestShadow = shadow;

    if (mealtime) {
      const interval = setInterval(() => {
        if (noreg) {
          axios.get(`/api/check?noreg=${noreg}`).then((res) => {
            if (mealtime === "Breakfast" && res.data.breakfast) {
              latestBorder = "border-udine-7";
              latestShadow = "shadow-udine-7";
            } else if (mealtime === "Lunch" && res.data.lunch) {
              latestBorder = "border-udine-7";
              latestShadow = "shadow-udine-7";
            } else if (mealtime === "Dinner" && res.data.dinner) {
              latestBorder = "border-udine-7";
              latestShadow = "shadow-udine-7";
            }
            setBorder(latestBorder);
            setShadow(latestShadow);
          });
        }
      }, 1000);
      return () => clearInterval(interval);
    }
    return () => {};
  }, [noreg, mealtime, border, shadow]);

  return (
    <Protected>
      <Header label="Profile" hasBack={false} />
      <div className=" mt-[100px] flex flex-col justify-center items-center">
        <div className="w-[100px] h-[100px] rounded-full bg-udine-1">
          <Image
            src={photo || avatar}
            alt="profile"
            className="w-[100px] h-[100px] rounded-full"
            width={100}
            height={100}
          />
        </div>
        <div
          className={`flex flex-col justify-center items-center -mt-[50px] ${border} ${shadow} border-4 bg-white shadow-lg -z-10 rounded-xl mb-6`}
        >
          <div className="rounded w-[300px] h-[380px] mx-auto justify-center items-center flex flex-col">
            <div className="flex flex-col justify-center items-center">
              <h1 className="font-bold text-[18px] text-[#2D2D2D] text-center">
                {name}
              </h1>
              <h1 className="font text-[16px] text-[#2D2D2D]">{residence}</h1>
            </div>
            <div className="w-[200px] h-[200px] bg-udine-1 mt-[20px]">
              <div className="flex flex-col justify-center items-center">
                <div className="w-[200px] h-[200px] bg-white">
                  {loading ? (
                    <div className="flex justify-center items-center w-[200px] h-[200px]">
                      {" "}
                      <i className="fa-solid fa-spinner text-3xl text-udine-1 animate-spin" />
                    </div>
                  ) : (
                    <QRCode
                      value={`${noreg},${getDate()},${mealtime?.toLowerCase()}`}
                      size={200}
                      bgColor="#FFFFFF"
                      fgColor="#000000"
                      level="Q"
                    />
                  )}
                </div>
                <div>
                  <h1 className="font text-[8px] text-[#808080] mt-[10px] w-60 text-center">
                    This QR code is only valid during the current mealtime
                  </h1>
                  <h1 className="font text-[10px] text-[#808080] mt-[2px] w-60 text-center">
                    {today} - {mealtime}
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
            <button
              onClick={signOut}
              className="flex justify-center items-center border-2 py-2 w-[150px] h-[50px] rounded-lg hover:text-udine-1
          text-sm hover:bg-slate-100 bg-white font-semibold"
            >
              <Image src={logout} alt="Google" className="mr-3" />
              Logout
            </button>
          </div>
        </div>
      </div>
      <Navigation />
    </Protected>
  );
}
