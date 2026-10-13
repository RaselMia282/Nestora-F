import z from "zod";
import { Gender, Role } from "../types/enum";

export const registerUserSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().optional(),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "password atleast must be 6 characters  long"),
  phone: z.string().optional(),
  gender: z.nativeEnum(Gender).optional(),
  role: z.nativeEnum(Role).default(Role.TENANT),
});

export type RegisterUserInput = z.infer<typeof registerUserSchema>;
 