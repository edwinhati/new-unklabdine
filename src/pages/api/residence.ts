import type { NextApiRequest, NextApiResponse } from "next";
import { get, ref, child } from "firebase/database";
import { rtdb } from "@/config";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  var noreg: any = req.query.noreg;
  noreg = noreg.toUpperCase();
  get(child(ref(rtdb), `accounts/${noreg}`)).then((snapshot) => {
    if (snapshot.exists()) {
      res.json({
        residence: snapshot.val(),
      });
    } else {
      res.json({
        residence: "Outsider",
      });
    }
  });
}
