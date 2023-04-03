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
      return `${minutes} minutes ago`;
    } else if (minutes < 120) {
      return "1 hour ago";
    } else if (minutes < 1440) {
      return `${Math.floor(minutes / 60)} hours ago`;
    } else if (minutes < 2880) {
      return "1 day ago";
    } else {
      return `${Math.floor(minutes / 1440)} days ago`;
    }
  }

  function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <div className="bg-white rounded-xl p-4">
      {hasImage && (
        <div className="mb-2">
          <Image src={foodImage} alt="Food" width={640} height={400} />
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
            <p className="text-sm font-semibold">
              {isAnonymous ? "Anonymous" : name}
            </p>
            <p className="text-[10px]">{`${capitalize(mealtime)} • ${age}`}</p>
          </div>
        </div>
        <div className="flex items-center">
          <Rating value={rating} setRating="readonly" />
        </div>
      </div>
      <div className="mt-2">
        <p className="text-[12px]">{comment}</p>
      </div>
      <div className="mt-2 flex flex-wrap -mx-1">
        {aspects.map((aspect, index) => (
          <div className="border rounded-md text-xs px-2 py-1 mx-1" key={index}>
            {aspect}
          </div>
        ))}
      </div>
    </div>
  );
}
