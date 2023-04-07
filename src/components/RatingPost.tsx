import { useState } from "react";
import Image from "next/image";

import Rating from "./Rating";

import avatar from "../assets/images/avatar.png";
import foodImage from "../assets/images/food.png";

interface Props {
  comment: string;
  name: string;
  hasImage: boolean;
  food: {
    rating: number;
    aspects: any;
  };
  environment: {
    rating: number;
    aspects: any;
  };
  service: {
    rating: number;
    aspects: any;
  };
  mealtime: string;
  isAnonymous: boolean;
  photo: string;
  time: {
    seconds: number;
  };
  image?: any;
}

export default function RatingPost({
  comment,
  name,
  hasImage,
  food,
  environment,
  service,
  mealtime,
  isAnonymous,
  photo,
  time,
  image,
}: Props) {
  const [rating] = useState(
    (food.rating + environment.rating + service.rating) / 3
  );
  const [aspects] = useState(
    [].concat(food.aspects, environment.aspects, service.aspects)
  );
  const [age] = useState(calculateAge(time.seconds));

  function calculateAge(postTime: number) {
    const minutes = Math.floor((Date.now() / 1000 - postTime) / 60);

    if (minutes < 1) {
      return "just now";
    } else if (minutes < 60) {
      return `${minutes}m`;
    } else if (minutes < 120) {
      return "1h";
    } else if (minutes < 1440) {
      return `${Math.floor(minutes / 60)}h`;
    } else if (minutes < 2880) {
      return "1d";
    } else {
      return `${Math.floor(minutes / 1440)}d`;
    }
  }

  function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <div className="bg-white rounded-xl p-4">
      {hasImage && (
        <div className="mb-2">
          <Image src={image} alt="Food" width={640} height={400} />
        </div>
      )}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full bg-gray-300">
            <Image
              src={isAnonymous ? avatar : photo}
              alt="Avatar"
              className="rounded-full"
              width={40}
              height={40}
            />
          </div>
          <div>
            <p className="text-xs font-semibold">
              {isAnonymous ? "Anonymous" : name}
            </p>
            <p className="text-[10px]">{`${capitalize(mealtime)} • ${age}`}</p>
          </div>
        </div>
        <div className="flex items-center">
          <Rating value={rating} setRating="readonly" size={17} />
        </div>
      </div>
      <div className="mt-2">
        <p className="text-[11px]">{comment}</p>
      </div>
      <div className="mt-2 flex flex-wrap -mx-1">
        {aspects.map((aspect, index) => (
          <div className="border rounded-md text-[10px] px-2 py-1 mx-1" key={index}>
            {aspect}
          </div>
        ))}
      </div>
      {/* <div className="flex flex-row gap-3">
        <div>
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-full ${
              isAnonymous ? "bg-udine-5" : "bg-gray-400"
            }`}
          >
            <Image
              src={isAnonymous ? avatar : photo}
              alt="Avatar"
              className="rounded-full"
              width={42}
              height={42}
            />
          </div>
        </div>
        <div className="flex flex-col relative">
          <div className="flex flex-row gap-1">
            <p className="text-xs font-semibold">
              {isAnonymous ? "Anonymous" : name}
            </p>
            <p className="text-[10px]">{`${mealtime} • ${age}`}</p>
          
          </div>
          <div className="flex flex-row gap-1 mt-1">
            <p className="text-[11px]">
              {comment}
            </p>
          </div>
          <div className="mt-2 flex flex-wrap -mx-1">
            {aspects.map((aspect, index) => (
              <div
                className="border rounded-md text-[10px] px-2 py-1 mx-1"
                key={index}
              >
                {aspect}
              </div>
            ))}
          </div>
        </div>
      </div> */}
    </div>
  );
}
