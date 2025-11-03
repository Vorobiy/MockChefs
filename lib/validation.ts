//This file contains everything to do with validation of user input.

import { z } from "zod";

const requireString = z.string().trim().min(1, "Required");

// `z.string().email()` on an existing Zod string is deprecated; use top-level `z.email()`
// and combine it with `requireString` so we keep the trim/min behavior.
export const signUpSchema = z.object({
  email: z.intersection(
    requireString,
    z.email({ message: "Invalid Email Address" }),
  ),
  username: requireString.regex(
    /^[a-zA-Z0-9_-]+$/,
    "Only letters, numbers, - and _ allowed",
  ),
  password: requireString.min(8, "The Password Must Be At Least 8 Characters"),
});

export type SignUpValues = z.infer<typeof signUpSchema>;

export const loginSchema = z.object({
  username: requireString,
  password: requireString,
});

export type LoginValues = z.infer<typeof loginSchema>;
