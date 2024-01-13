import { hashPassword } from "@/lib/auth-services";
import { connectToDatabase } from "@/lib/db";
import { User } from "@/models/customTypes";
import { NextApiRequest, NextApiResponse } from "next";
interface MyApiRequest<T> extends NextApiRequest {
  body: T;
}
const handler = async (req: MyApiRequest<User>, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const data = req.body;
      const { enteredEmail, enteredPassword } = data;

      if (
        !enteredEmail ||
        !enteredEmail.includes("@") ||
        !enteredPassword ||
        enteredPassword.trim().length < 5
      ) {
        return res.status(422).json({
          message: "Invalid input",
        });
      }
      const client = await connectToDatabase();
      const db = client.db("dbName");
      const emailExisting = await db
        .collection("users")
        .findOne({ enteredEmail: enteredEmail });

      if (emailExisting) {
        return res.status(409).json({ message: "유저가 이미 있습니다" });
      }
      const hashedPassword = await hashPassword(enteredPassword);
      const usersCollection = db.collection("users");
      const result = await usersCollection.insertOne({
        enteredEmail,
        hashedPassword,
      });
      res.status(201).json({ message: "유저가 생성되었습니다" });
      client.close();
    } catch (error) {
      console.log(error);
    }
  }
};

export default handler;
