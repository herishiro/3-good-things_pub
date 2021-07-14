// ローカルでのDB移行用
import type { NextApiRequest, NextApiResponse } from 'next'
// import fs from "fs"
// const admin = require("firebase-admin")
// const serviceAccount = require('./serviceAccountKey.json')

// const initialize = () => {
//   if (!admin.apps.length) {
//     admin.initializeApp({
//       credential: admin.credential.cert(serviceAccount),
//       databaseURL: "https://three-good-things-dev.firebaseio.com"
//     }, "import");
//   }

//   var db = admin.firestore();
//   return db
// }

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const collectionName = "users"
//   const db = await initialize()

//   const source = fs.readFileSync("src/pages/api/firestore-export.json")
//   const json = JSON.parse(source.toString());
//   for (let docId in json[collectionName]) {
//     const oldDoc = json[collectionName][docId]
//     const userCollection = await db.collection("database").doc("version1.0").collection("users").doc(docId)
//     userCollection.set({
//       name: oldDoc.name,
//       isFirstLogin: oldDoc.isFirstLogin,
//       createdAt: new Date(oldDoc.createdAt._seconds * 1000)
//     })
//     const diaryCollection = await db.collection("database").doc("version1.0").collection("diaries").doc(docId)
//     // diaryCollection.set(oldDoc.diaries)
//     diaryCollection.update({ ...oldDoc.diaries })
//   }


//   res.status(200).json("")
// }