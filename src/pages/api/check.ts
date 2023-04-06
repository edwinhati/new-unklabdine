import type { NextApiRequest, NextApiResponse } from "next";
import { getDate } from "./rating/mealtime";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "@/config";

interface ApiResponse {
  breakfast: boolean;
  lunch: boolean;
  dinner: boolean;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  const noreg = req.query.noreg as string;
  const date = getDate();
  const breakfastRef = doc(firestore, `visitors/${date}/breakfast`, noreg);
  const lunchRef = doc(firestore, `visitors/${date}/lunch`, noreg);
  const dinnerRef = doc(firestore, `visitors/${date}/dinner`, noreg);
  const status = await Promise.all([
    getDoc(breakfastRef),
    getDoc(lunchRef),
    getDoc(dinnerRef),
  ]);

  const response: any[] = [];
  status.forEach((doc) => {
    if (doc.exists()) {
      response.push(true);
    } else {
      response.push(false);
    }
  });
  res.json({
    breakfast: response[0],
    lunch: response[1],
    dinner: response[2],
  });
}
