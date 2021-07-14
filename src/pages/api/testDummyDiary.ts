import { getDiary } from 'libs/firebase/db'
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // const diary = await getInitialDiary("2021-06-14")
  // await setDiary({ userId: "TJ6MZAeELEdpAJ8HfNTfJEHHIT52", diaryId: "2021-06-14", diary })
  const diary = await getDiary({ userId: "TJ6MZAeELEdpAJ8HfNTfJEHHIT52", diaryId: "2021-06-15" })
  res.status(200).json(diary)
  // res.status(200).json("done!")
}