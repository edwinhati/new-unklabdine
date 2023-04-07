import { useState } from "react";

export default function Rating(props: {
  value: any;
  setRating: any;
  size?: number;
}) {
  const { value, size } = props;
  const [hover, setHover] = useState<number | null>(null);

  const isReadonly = props.setRating === "readonly";

  return (
    <div className="flex">
      {[...Array(5)].map((star, i) => {
        const ratingValue: number = i + 1;
        return (
          <label key={i}>
            {isReadonly ? (
              Star(100 * (value - ratingValue + 1), size || 20)
            ) : (
              <>
                <i
                  className={`fa-solid fa-star text-${
                    ratingValue <= (hover || value) ? "udine-1" : "gray-400"
                  } text-[${size}px] mt-1`}
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(null)}
                  onClick={() => props.setRating(ratingValue)}
                />
              </>
            )}
          </label>
        );
      })}
    </div>
  );
}
function Star(percentage: number, size: number) {
  const firstStarClipPath = `polygon(0 0, ${percentage}% 0, ${percentage}% 100%, 0% 100%)`;
  const secondStarClipPath = `polygon(${percentage}% 0, 100% 0, 100% 100%, ${percentage}% 100%)`;

  return (
    <div className={`flex flex-row ${size < 19 ? "gap-[3px]" : null}`}>
      <i
        className={`fa-solid fa-star text-udine-1 text-[${size}px] mt-1`}
        style={{ clipPath: firstStarClipPath, backgroundColor: "transparent" }}
      />
      <i
        className={`fa-solid fa-star text-gray-400 text-[${size}px] mt-1 ml-[-21.5px]`}
        style={{ clipPath: secondStarClipPath, backgroundColor: "transparent" }}
      />
    </div>
  );
}
