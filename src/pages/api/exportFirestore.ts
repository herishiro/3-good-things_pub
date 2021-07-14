// ローカルでのDB移行用
import type { NextApiRequest, NextApiResponse } from 'next'
// const fs = require('fs');
// const admin = require("firebase-admin")
// const serviceAccount = require('./serviceAccountKey.json')

// const initialize = () => {
//   if (!admin.apps.length) {
//     admin.initializeApp({
//       credential: admin.credential.cert(serviceAccount),
//       databaseURL: "https://three-good-things-dev.firebaseio.com"
//     }, "export");
//   }

//   var db = admin.firestore();
//   return db
// }

// const exportAllDate = async () => {
//   const collectionName = "users"
//   const subCollectionName = "diaries"
//   const db = await initialize()
//   var data = {} as { [k: string]: any };
//   const userIds: string[] = []
//   data[collectionName] = {};
//   const snapshot = await db.collection(collectionName).get()
//   snapshot.forEach((doc: any) => {
//     data[collectionName][doc.id] = doc.data();
//     data[collectionName][doc.id][subCollectionName] = {};
//     userIds.push(doc.id)
//   })

//   let subSnapshot: any
//   for (let i = 0; i < userIds.length; i++) {
//     subSnapshot = await db.collection(collectionName).doc(userIds[i]).collection("diaries").get()
//     subSnapshot.forEach((subDoc: any) => {
//       data[collectionName][userIds[i]]["diaries"][subDoc.id] = subDoc.data()
//     })
//   }

//   fs.writeFile("src/pages/api/firestore-export.json", JSON.stringify(data), function (err: string) {
//     if (err) {
//       return console.log(err);
//     }
//     console.log("The file was saved!");
//   });
// }

// const exportSpecifiedUseDate = async (userId: string) => {
//   const collectionName = "users"
//   const db = await initialize()
//   var data = {} as { [k: string]: any };
//   data[collectionName] = {};
//   const snapshot = await db.collection(collectionName).get()
//   snapshot.forEach((doc: any) => {
//     if (doc.id === userId) {
//       data[collectionName][doc.id] = doc.data();
//     }
//   })
//   const subSnapshot = await db.collection(collectionName).doc(userId).collection("diaries").get()
//   data[collectionName][userId]["diaries"] = {}
//   subSnapshot.forEach((subDoc: any) => {
//     data[collectionName][userId]["diaries"][subDoc.id] = subDoc.data()
//     // console.log(`subDoc.id`, subDoc.id)
//   })
//   console.log(`data`, data, data.users[userId].diaries)

//   fs.writeFile("src/pages/api/firestore-export.json", JSON.stringify(data), function (err: string) {
//     if (err) {
//       return console.log(err);
//     }
//     console.log("The file was saved!");
//   });
// }

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   await exportSpecifiedUseDate("pd8BMHcxxpfeBpq6SzeZOHpjvHq1")

//   res.status(200).json("done")
// }