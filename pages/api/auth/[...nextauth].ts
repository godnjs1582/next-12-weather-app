import { checkPassword } from "@/lib/auth-services";
import { connectToDatabase } from "@/lib/db";
import NextAuth from "next-auth/next";
import CredentialProvider from "next-auth/providers/credentials";
type Credentials = {
  enteredEmail: string;
  enteredPassword: string;
};
const authOptions = {
  providers: [
    CredentialProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { enteredEmail, enteredPassword } = credentials as Credentials;

        const client = await connectToDatabase();
        const db = client.db("dbName");

        const userCollection = db.collection("users");
        const user = await userCollection.findOne({
          enteredEmail,
        });

        if (!user) {
          throw new Error("user not found");
        }

        const hashedPassword = user.hashedPassword;
        const userEmail = user.enteredEmail;
        const id = user._id.toString();

        const isPasswordCorrect = await checkPassword({
          enteredPassword,
          hashedPassword,
        });

        if (!isPasswordCorrect) {
          throw new Error("incorrect password");
        }
        client.close();
        return { id, email: userEmail };
      },
    }),
  ],
};

export default NextAuth(authOptions);
