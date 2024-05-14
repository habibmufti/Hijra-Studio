import { TypeUserLogin, userValidator, TypeUser, userLoginValidator } from "@/validate/user.validator";
import { UserCollection } from "@/db/collection";
import z from "zod";
import { hashPassword, comparePassword } from "@/utils/bcrypt";
import { signToken } from "@/utils/jwt";
class User {
  static async Register(request: Request) {
    try {
      const body: TypeUser = await request.json();
      const data = userValidator.parse(body);
      const isUsernameExist = await UserCollection.findOne({ username: data.username });
      if (isUsernameExist) {
        return Response.json({ message: "Username already exists" }, { status: 400 });
      }
      const isEmailExist = await UserCollection.findOne({ email: data.email });
      if (isEmailExist) {
        return Response.json({ message: "Email already exists" }, { status: 400 });
      }
      await UserCollection.insertOne({
        name: data.name,
        username: data.username,
        email: data.email,
        password: hashPassword(data.password),
      });
      return Response.json({ message: "User has been registered" }, { status: 200 });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return Response.json({ message: error.errors[0].message }, { status: 400 });
      } else {
        return Response.json(error, { status: 500 });
      }
    }
  }
  static async Login(request: Request) {
    try {
      const body: TypeUserLogin = await request.json();
      const data = userLoginValidator.parse(body);
      const user = await UserCollection.findOne({
        username: data.username,
      });
      if (!user) {
        return Response.json({ message: "Invalid username or password" }, { status: 401 });
      }
      if (!comparePassword(data.password, user.password)) {
        return Response.json({ message: "Invalid username or password" }, { status: 401 });
      }
      const access_token = signToken({
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
      });
      return Response.json({ message: "Login success", access_token }, { status: 200 });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return Response.json({ message: error.errors[0].message }, { status: 400 });
      } else {
        return Response.json(error, { status: 500 });
      }
    }
  }
}
export default User;
