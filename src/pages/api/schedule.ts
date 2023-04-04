// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  res.status(200).json(await getData());
}

async function getData() {
  const auth = new google.auth.GoogleAuth({
    scopes: "https://www.googleapis.com/auth/spreadsheets",
    credentials: {
      private_key: process.env.NEXT_PUBLIC_PRIVATE_KEY,
      client_email: process.env.NEXT_PUBLIC_CLIENT_EMAIL,
    },
  });

  const client = await auth.getClient();
  const googleSheets = google.sheets({ version: "v4", auth: client });
  const datas = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId: "1vA3poYOz6VOedw8wUglXujWjFSThkljnoRgPEHObSv0",
    range: "Sheet1!C6:I24",
  });
  const data: any = datas.data.values;
  return {
    sunday: processData(data, 0),
    monday: processData(data, 1),
    tuesday: processData(data, 2),
    wednesday: processData(data, 3),
    thursday: processData(data, 4),
    friday: processData(data, 5),
    saturday: processData(data, 6),
  };
}

function processData(data: any[][], i: number) {
  const mealTypes = ["breakfast", "lunch", "dinner"];
  const newData = {};

  mealTypes.forEach((mealType, index) => {
    const items = [];

    for (let j = 0; j < 6; j++) {
      const item = data[j + 6 * index][i];

      if (item && item.trim()) {
        items.push(item.trim());
      }
    }

    newData[mealType] = items.join(", ");
  });

  return newData;
}

function deleteUndefined(string: string): string {
  let newString: string = string;
  if (string.includes(", , undefined")) {
    newString = string.replace(/, , undefined/g, "");
  } else if (string.includes(", undefined")) {
    newString = string.replace(/, undefined/g, "");
  }
  return newString;
}
