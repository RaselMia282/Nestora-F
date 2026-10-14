import z from "zod";
import { Role } from "../types/enum";

export const loginUserSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "password atleast must be 6 characters or long"),
  role: z.nativeEnum(Role),
});

export type LoginUserInput = z.infer<typeof loginUserSchema>;
