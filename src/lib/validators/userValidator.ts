import { z } from "zod"

export const baseUserSchema = z.object({
  username: z.string()
    .min(3, "Username must be at least 3 characters")
    .max(50, "Username must be less than 50 characters")
    .regex(/^[a-zA-Z0-9_-]+$/, "Username can only contain letters, numbers, underscores, and dashes"),
  cognitoId: z.string()
    .min(1, "Cognito ID is required"),
  profilePictureUrl: z.string()
    .url("Profile picture must be a valid URL")
    .nullable()
    .optional(),
  teamId: z.number()
    .int("Team ID must be an integer")
    .positive("Team ID must be a positive number")
    .nullable()
    .optional()
})
export const createUserSchema = baseUserSchema

export const updateUserSchema = baseUserSchema.partial()

export const userSchema = baseUserSchema.extend({
  userId: z.number().int().positive()
})

export const userRequestSchema = z.object({
  username: z.string()
    .min(3, "Username must be at least 3 characters")
    .max(50, "Username must be less than 50 characters")
    .regex(/^[a-zA-Z0-9_-]+$/, "Username can only contain letters, numbers, underscores, and dashes"),
  cognitoId: z.string()
    .min(1, "Cognito ID is required"),
  profilePictureUrl: z.string()
    .url("Profile picture must be a valid URL")
    .optional()
    .nullable(),
  teamId: z.number()
    .int("Team ID must be an integer")
    .positive("Team ID must be a positive number")
    .optional()
    .nullable(),
})

export type User = z.infer<typeof userSchema>
export type CreateUser = z.infer<typeof createUserSchema>
export type UpdateUser = z.infer<typeof updateUserSchema>
export type UserRequest = z.infer<typeof userRequestSchema>

export const validateUserRequest = (data: unknown) => {
  return userRequestSchema.parse(data)
}