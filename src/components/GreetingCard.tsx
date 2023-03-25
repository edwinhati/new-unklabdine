import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import MorningNoBg from "@/assets/svg/MorningNoBg.svg";
import NoonNoBg from "@/assets/svg/NoonNoBg.svg";
import NightNoBg from "@/assets/svg/NightNoBg.svg";

interface GreetingCardProps {
  color: string;
  image: StaticImageData;
  greeting: string;
}

export default function GreetingCard() {
  const greeting = 'Morning';
  const mealtime = getMealtime(greeting);
  const { color, image } = getGreetingCard(greeting);

  return (
    <Link
      href="/schedule"
      className={`relative h-[200px] rounded-xl ${color} px-[10px] pb-[40px]`}
    >
      <Image src={image} alt="" className="absolute right-0 bottom-0" />
      <div>
        <h1 className="text-[30px] text-white leading-none mt-10">
          Good <br /> {greeting}
        </h1>
        <h1 className="text-[30px] font-bold text-white leading-tight">
          Joe Doe
        </h1>
      </div>
      <br />
      <div className="absolute bottom-0 mb-2">
        <p className="text-white font-semibold text-[10px]">
          {mealtime} Menu •{" "}
          <span className="font-normal text-[8px]">Click to see</span>
        </p>
      </div>
    </Link>
  );
}

interface GreetingCard {
  title: string;
  color: string;
  image: StaticImageData;
}

function getGreetingCard(greeting: string): GreetingCard {
  const greetingCards: GreetingCard[] = [
    {
      title: "Morning",
      color: "bg-[#2F80ED]",
      image: MorningNoBg,
    },
    {
      title: "Afternoon",
      color: "bg-[#F2C94C]",
      image: NoonNoBg,
    },
    {
      title: "Night",
      color: "bg-[#001633]",
      image: NightNoBg,
    },
  ];

  return greetingCards.find((card) => card.title === greeting)!;
}

function getGreeting(): string {
  const today = new Date();
  const curHr = today.getHours();

  if (curHr < 12) {
    return "Morning";
  } else if (curHr < 18) {
    return "Afternoon";
  } else {
    return "Night";
  }
}

function getMealtime(greeting: string): string {
  switch (greeting) {
    case "Morning":
      return "Breakfast";
    case "Afternoon":
      return "Lunch";
    default:
      return "Dinner";
  }
}
