import ProgressBar from "@ramonak/react-progress-bar";
// import Rating from "react-rating";
import Rating from "./Rating";
import { useState } from "react";

export default function OverallRatingCard() {
  const [value, setValue] = useState(1.5);
  return (
    <div className="bg-white rounded-xl px-2 pb-4">
      <div className="text-center mt-4">
        <h2 className="font-semibold text-[13px] leading-[0px]">Weekly</h2>
        <span className="text-[11px] leading-[0px]">Overall Rating</span>
      </div>
      {/* {loading ? (
            <div className="flex flex-col justify-start items-center h-full mt-3">
            {data.length === undefined ? (
                <span className="text-[11px] text-red-500 font-bold text-xl mb-3">
                ! No data available !
                </span>
            ) : (
                <i className="fa-solid fa-spinner text-3xl text-udine-1 animate-spin" />
            )}
            </div>
        ) : ( */}
      <div className="flex gap-2">
        <div className="flex-1 flex flex-col justify-center items-center">
          <span className="text-[60px] font-bold leading-none">
            {/* {average} */}{value}
          </span>
          <Rating
            //   initialRating={average || 0}
            // initialRating={5}
            // emptySymbol="fa-solid fa-star text-[18px] text-[#D5D5D5]"
            // fullSymbol="fa-solid fa-star text-[18px] text-udine-5"
            // readonly
            value={value}
            setRating='readonly'
          />
          <span className="text-[9px] mt-1">
            {/* {length > 1
                    ? `based on ${length} student ratings`
                    : `based on ${length} student rating`} */}
            based on 5 student ratings
          </span>
        </div>
        <div className="flex-1 flex flex-col justify-center w-full mr-[10px]">
          <div className="flex justify-center items-center w-full">
            <span className="text-[11px] font-medium mr-2">5</span>
            <div className="w-full">
              <ProgressBar
                //   completed={five ? (five / total) * 100 : 0}
                completed={5}
                bgColor="#FF9345"
                height="5px"
                isLabelVisible={false}
              />
            </div>
          </div>
          <div className="flex justify-center items-center w-full">
            <span className="text-[11px] font-medium mr-2">4</span>
            <div className="w-full">
              <ProgressBar
                //   completed={four ? (four / total) * 100 : 0}
                completed={4}
                bgColor="#FF9345"
                height="5px"
                isLabelVisible={false}
              />
            </div>
          </div>
          <div className="flex justify-center items-center w-full">
            <span className="text-[11px] font-medium mr-2">3</span>
            <div className="w-full">
              <ProgressBar
                //   completed={three ? (three / total) * 100 : 0}
                completed={3}
                bgColor="#FF9345"
                height="5px"
                isLabelVisible={false}
              />
            </div>
          </div>
          <div className="flex justify-center items-center w-full">
            <span className="text-[11px] font-medium mr-2">2</span>
            <div className="w-full">
              <ProgressBar
                //   completed={two ? (two / total) * 100 : 0}
                completed={2}
                bgColor="#FF9345"
                height="5px"
                isLabelVisible={false}
              />
            </div>
          </div>
          <div className="flex justify-center items-center w-full">
            <span className="text-[11px] font-medium mr-2">1</span>
            <div className="w-full">
              <ProgressBar
                //   completed={one ? (one / total) * 100 : 0}
                completed={1}
                bgColor="#FF9345"
                height="5px"
                isLabelVisible={false}
              />
            </div>
          </div>
        </div>
      </div>
      {/* )} */}
    </div>
  );
}
