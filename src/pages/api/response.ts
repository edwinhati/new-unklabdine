// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "@/config";
import { getDocs, collection } from "firebase/firestore";

interface MealData {
  id: string;
  mealtime: string;
  createdAt: {
    seconds: number;
  };
  // Add other properties as needed
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  var dates = [];
  for (var i = 0; i < 7; i++) {
    var date = new Date(new Date());
    date.setDate(date.getDate() - i);
    var dd = String(date.getDate()).padStart(2, "0");
    var mm = String(date.getMonth() + 1).padStart(2, "0");
    var yyyy = date.getFullYear();
    dates.push(yyyy + mm + dd);
  }

  var data = [];
  for (var i = 0; i < 7; i++) {
    data.push(await getData(dates[i]));
  }

  data = data.map((item) => {
    return clear(item);
  });
  data = clear(data);
  res.status(200).json(data.flat().sort(SortByDate));
}
export async function getData(date: string) {
  const snapshot = await Promise.all([
    getDocs(collection(firestore, `responses/${date}/breakfast`)),
    getDocs(collection(firestore, `responses/${date}/lunch`)),
    getDocs(collection(firestore, `responses/${date}/dinner`)),
  ]);

  const data = snapshot.flatMap((item, index) => {
    return item.docs.map((doc) => {
      const mealData = doc.data() as MealData;
      return {
        ...mealData,
        id: doc.id,
        mealtime: ["breakfast", "lunch", "dinner"][index],
      };
    });
  });

  const filteredData = data.map((item) => {
    return {
      name: item.isAnonymous ? "Anonymous" : item.name,
      mealtime: item.mealtime,
      isAnonymous: item.isAnonymous,
      createdAt: item.createdAt,
      photo: item.isAnonymous ? "" : item.photo,
      comment: item.comment,
      image: item.image,
      food: item.food,
      environment: item.environment,
      service: item.service,
    };
  });

  return filteredData;
}

function clear(data: any[]) {
  data = data.map((item: string | any[], index: any) => {
    if (item.length !== 0) {
      return item;
    }
  });
  data = data.filter((item: any) => {
    return item !== undefined;
  });
  return data;
}

function SortByDate(
  a: { createdAt: { seconds: number } },
  b: { createdAt: { seconds: number } }
) {
  if (a.createdAt === undefined || b.createdAt === undefined) return 0;
  var aD = new Date(a.createdAt.seconds).getTime(),
    bD = new Date(b.createdAt.seconds).getTime();
  return aD > bD ? -1 : aD < bD ? 1 : 0;
}
