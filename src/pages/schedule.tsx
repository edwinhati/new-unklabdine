import { useState, useEffect } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import { AnimatePresence, motion } from "framer-motion";

import MorningNoBg from "@/assets/svg/MorningNoBg.svg";
import NoonNoBg from "@/assets/svg/NoonNoBg.svg";
import NightNoBg from "@/assets/svg/NightNoBg.svg";

export default function SchedulePage() {
  const [card, setCard] = useState([
    {
      title: "Breakfast",
      time: "05:30AM - 07:00AM",
      color: "bg-[#2F80ED]",
      image: MorningNoBg,
      isOpen: false,
    },
    {
      title: "Lunch",
      time: "11:30AM - 13:00PM",
      color: "bg-[#F2C94C]",
      image: NoonNoBg,
      isOpen: false,
    },
    {
      title: "Dinner",
      time: "17:30PM - 19:00PM",
      color: "bg-[#001633]",
      image: NightNoBg,
      isOpen: false,
    },
  ]);
  const [isOpen, setIsOpen] = useState(Array.from(card, () => true));
  const toggle = (index: any, value: any) => {
    const newIsOpen = [...isOpen];
    newIsOpen[index] = value ?? !newIsOpen[index];
    setIsOpen(newIsOpen);
  };

  useEffect(() => {
    const newCard = [...card];
    const day = new Date().getDay();
    if (day === 3) {
      newCard[2].time = "17:00PM - 19:00PM";
    }
    if (day === 5 || day === 6) {
      newCard[2].time = "18:00PM - 20:00PM";
    }
    setCard(newCard);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header label="Schedule" hasBack={false} />
      <div className="flex flex-col gap-2 h-full w-full bg-[#f0f0f0] pt-16 pb-20 px-2">
        <span className="font-bold">Today</span>
        <div className="flex flex-col gap-2 h-full w-full">
          {card.map((item, index) => (
            <button
              type="button"
              key={index}
              onClick={() => toggle(index, item.isOpen)}
              className={`relative flex flex-col ${item.color} rounded-xl p-3 min-w-full min-h-[190px] overflow-hidden`}
            >
              <Image
                src={item.image}
                alt=""
                className=" absolute bottom-0 left-0 min-w-full min-h-full"
              />

              <AnimatePresence mode="wait">
                <motion.div
                  transition={{ layout: { duration: 1, type: "spring" } }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  layout="size"
                  className={`bg-white rounded-md p-3 z-10 ${
                    isOpen[index] ? "hidden" : ""
                  }`}
                >
                  <h2 className="text-xl font-bold leading-none ">
                    {/* {item.title === "Breakfast"
                      ? breakfast
                      : item.title === "Lunch"
                      ? lunch
                      : dinner} */}
                  </h2>
                </motion.div>
              </AnimatePresence>
              <div className="text-white text-start mt-3 absolute bottom-3 left-3">
                <h1 className="text-5xl font-bold leading-none">
                  {item.title}
                </h1>
                <p className="text-sm font-light leading-none">{item.time}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
      <Navigation />
    </>
  );
}
