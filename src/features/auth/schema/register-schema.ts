import z from "zod";
import { Gender, Role } from "../types/enum";

export const registerUserSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(1, "Last name is required").optional(),
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Add at least one uppercase letter")
    .regex(/[0-9]|[^A-Za-z0-9]/, "Add at least one number or symbol"),
  phone: z.string().optional(),
  gender: z.nativeEnum(Gender).optional(),
  role: z.nativeEnum(Role),
});

export type RegisterUserInput = z.infer<typeof registerUserSchema>;
