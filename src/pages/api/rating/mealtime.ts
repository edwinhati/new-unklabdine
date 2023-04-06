import { NextApiRequest, NextApiResponse } from "next";
import { getData } from "../response";

interface Ratings {
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
}

interface RatingDetails {
  average: string;
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
}

interface Result {
  length: number;
  average: string;
  food: RatingDetails;
  service: RatingDetails;
  environment: RatingDetails;
}

export function getDate() {
  const date = new Date();
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = date.getFullYear();
  return `${yyyy}${mm}${dd}`;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Result>
) {
  const { value } = req.query;
  var data = await getData(getDate());
  data = data.filter((item) => item.mealtime === value);
  const flatData = data.flat();
  const [length, food, service, environment] = getStat(flatData);
  const average = ((food + service + environment) / (length * 3)).toFixed(1);

  const foodDetails = getDetails(flatData, "food");
  const serviceDetails = getDetails(flatData, "service");
  const environmentDetails = getDetails(flatData, "environment");

  const result: Result = {
    length,
    average,
    food: foodDetails,
    service: serviceDetails,
    environment: environmentDetails,
  };

  res.status(200).json(result);
}

function getStat(data: any) {
  const { length } = data;
  const food = data.reduce(
    (acc: number, curr: any) => acc + curr.food.rating,
    0
  );
  const service = data.reduce(
    (acc: number, curr: any) => acc + curr.service.rating,
    0
  );
  const environment = data.reduce(
    (acc: number, curr: any) => acc + curr.environment.rating,
    0
  );
  return [length, food, service, environment];
}

function getDetails(data: any, key: "food" | "service" | "environment") {
  const ratings: Ratings = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  data.forEach((item: any) => {
    const rating = item[key].rating as keyof Ratings;
    if (rating in ratings) {
      ratings[rating]++;
    }
  });
  const totalCount = Object.values(ratings).reduce(
    (acc, curr) => acc + curr,
    0
  );
  const average = (
    (ratings[1] +
      ratings[2] * 2 +
      ratings[3] * 3 +
      ratings[4] * 4 +
      ratings[5] * 5) /
    totalCount
  ).toFixed(1);
  return {
    average,
    1: ratings[1],
    2: ratings[2],
    3: ratings[3],
    4: ratings[4],
    5: ratings[5],
  };
}
