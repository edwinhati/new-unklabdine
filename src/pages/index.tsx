import GreetingCard from "@/components/GreetingCard";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import RatingCard from "@/components/RatingCard";
import RatingCta from "@/components/RatingCta";
import RatingPost from "@/components/RatingPost";
import SignInCard from "@/components/SignInCard";
import { useState, useEffect } from "react";
import { useUser } from "@/context";
import axios from "axios";

export default function HomePage() {
  const { user } = useUser();
  const [name, setName] = useState(null);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts]: any = useState([]);
  useEffect(() => {
    if (user) {
      setName(user.displayName.split(" ")[0]);
    }
    axios.get("/api/response").then((res) => {
      setPosts(res.data);
      setLoading(false);
    });
  }, [user]);
  return (
    <>
      <Header label="Home" hasBack={false} />
      <div className="flex flex-col gap-2 h-full w-full bg-[#f0f0f0] pt-16 pb-20 px-2">
        <GreetingCard name={name} />
        <RatingCard title="Weekly" subtitle="Overall Rating" details={true} />
        {user ? null : <SignInCard />}
        <RatingCta />
        {loading ? (
          <div className="flex justify-center items-start h-full">
            <i className="fa-solid fa-spinner text-3xl text-udine-1 animate-spin" />
          </div>
        ) : (
          <>
            {/* <RatingPost hasImage={false} name="Edwin" comment="Testing" />
            <RatingPost hasImage={true} name="Edwin" comment="Testing 2" /> */}
            {posts.map((post: any) => (
              <RatingPost
                hasImage={post.image ? true : false}
                name={post.name}
                comment={post.comment}
                environment={post.environment}
                service={post.service}
                food={post.food}
                mealtime={post.mealtime}
                isAnonymous={post.isAnonymous}
                key={post.uuid}
                photo={post.photo}
                time={post.createdAt}
              />
            ))}
          </>
        )}
      </div>
      <Navigation />
    </>
  );
}
