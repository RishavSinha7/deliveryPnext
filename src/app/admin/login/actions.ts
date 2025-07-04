"use server";

import { z } from "zod";
import { createSession, deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";

// Hardcoded test user (you can later replace with DB lookup)
const testUser = {
  id: "1",
  email: "admin@deliverypartners.io",
  password: "12345678",
};

// Zod validation schema
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .trim(),
});

// Login action used with useFormState
export async function login(_prevState: unknown, formData: FormData) {
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { email, password } = result.data;

  if (email !== testUser.email || password !== testUser.password) {
    return {
      success: false,
      errors: {
        email: ["Invalid email or password"],
      },
    };
  }

  await createSession(testUser.id);

  // Redirect to admin dashboard
  redirect("/admin/dashboard");
}

// Logout action
export async function logout() {
  await deleteSession();
  redirect("/admin/login");
}
