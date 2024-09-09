import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from "../../../../firebase";

async function findUserByEmailAndPassword(email: string, password: string) {
  const usersRef = collection(db, 'users');
  const q = query(usersRef, where('email', '==', email));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return null;
  }

  const userDoc = querySnapshot.docs[0];
  
  if (!userDoc) {
    return null;
  }

  const userData = userDoc.data();

  if (userData.password !== password) {
    return null;
  }

  return {
    id: userDoc.id,
    email: userData.email,
    name: userData.name,
    role: userData.role,
  };
}

const handler = NextAuth({
  pages: {
    signIn: '/sign-in',
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Escribe tu nombre" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        if (!credentials) {
          return null;
        }

        const user = await findUserByEmailAndPassword(credentials.username, credentials.password);

        if (user) {
          return user;
        } else {
          return null;
        }
      }
    })
  ],
  callbacks: {
    async session({ session, token, user }) {
      session.user = user;
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
