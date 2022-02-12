import Local from "passport-local";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();
//TODO review if this mixed logic es OK
const LocalStrategy = new Local.Strategy(
  { usernameField: "email", passwordField: "password" },
  async (email, password, done) => {
    if (!email) return done(null, false, { message: "Missing email" });
    if (!password) return done(null, false, { message: "Missing password" });
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      if (!user) return done(null, false, { message: "User not found" });
      if (!user.password)
        return done(null, false, { message: "User is not registered" });
      const passwordMatches = await bcrypt.compare(password, user.password);
      if (!passwordMatches)
        return done(null, false, { message: "Wrong password" });
      return done(null, user.id);
    } catch (e: any) {
      console.error(e.message);
      done(e);
    }
  }
);

export { LocalStrategy };

//SIGN UP
// email + password --> email used? --> 409 email already in use, else --> 201 Created
