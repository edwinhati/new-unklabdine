// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getDoc, doc } from "firebase/firestore";
import { firestore } from "@/config";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const noreg = req.query.noreg as string;
  const date = getDate();
  const status = [
    (
      await getDoc(doc(firestore, `responses/${date}/breakfast`, noreg))
    ).exists(),
    (await getDoc(doc(firestore, `responses/${date}/lunch`, noreg))).exists(),
    (await getDoc(doc(firestore, `responses/${date}/dinner`, noreg))).exists(),
  ];
  res.status(200).json({
    breakfast: !status[0],
    lunch: !status[1],
    dinner: !status[2],
  });
}

function getDate() {
  const date = new Date();
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = date.getFullYear();
  return `${yyyy}${mm}${dd}`;
}
