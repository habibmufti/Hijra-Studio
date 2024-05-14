import z from "zod";

export const userValidator = z.object({
  name: z.string({ message: "Name is required" }).min(1, { message: "Name must be at least 1 character long" }),
  username: z.string({ message: "Username is required" }).min(3, { message: "Username must be at least 3 character long" }),
  email: z.string({ message: "Email is required" }).email({ message: "Invalid email" }),
  password: z.string({ message: "Password is required" }).min(5, { message: "Password must be at least 5 characters long" }),
});
export const userLoginValidator = z.object({
  username: z.string({ message: "Username is required" }).min(3, { message: "Username must be at least 3 character long" }),
  password: z.string({ message: "Password is required" }).min(5, { message: "Password must be at least 5 characters long" }),
});
export type TypeUser = z.infer<typeof userValidator>;
export type TypeUserLogin = z.infer<typeof userLoginValidator>;
export type TypeLoginUser = {
  username: string;
  password: string;
};
