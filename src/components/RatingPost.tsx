/* eslint-disable react/no-array-index-key */
import avatar from "../assets/images/avatar.png";
import foodImage from "../assets/images/food.png";
import Rating from "./Rating";
import Image from "next/image";

export default function RatingPost(props: any) {
  const { comment, name, hasImage } = props;
  return (
    <div className="bg-white rounded-xl p-[10px]">
      {hasImage ? (
        <Image src={foodImage} alt="avatar" className="w-full" />
      ) : (
        ""
      )}

      <div className="mt-2 flex justify-between items-center">
        <div className="flex justify-center items-center gap-2">
          <div
            className="w-[50px] h-[50px] rounded-full bg-udine-1"
          >
            <Image src={avatar} alt="" className="rounded-full" />
          </div>
          <div className="flex flex-col">
            <span className="text-[15x] font-semibold">
              {name}
            </span>
            <span className="text-[9px]">Lunch • 1d</span>
          </div>
        </div>
        <div className="min-w-max">
          <Rating value={4} setRating="readonly" />
        </div>
      </div>
      <div className="mt-2">
        <p className="text-[12px] ml-1">{comment}</p>
      </div>
      <div className="mt-2 flex gap-1 flex-wrap">
        <div className="border-2 rounded-md text-[8px] py-[4px] px-[8px] ml-1">
          Taste
        </div>
      </div>
    </div>
  );
}
