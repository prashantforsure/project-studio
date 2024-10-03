import { z } from "zod"

export const baseProjectSchema = z.object({
  name: z.string()
    .min(1, "Title is required")
    .max(255, "Title must be less than 255 characters"),
  description: z.string()
    .max(1000, "Description must be less than 1000 characters")
    .nullable()
    .optional(),
  startDate: z.date()
    .nullable()
    .optional(),
  endDate: z.date()
    .nullable()
    .optional()   
})
export const createProjectSchema = baseProjectSchema

export const updateProjectSchema = baseProjectSchema.partial()

export const taskSchema = baseProjectSchema.extend({
  id: z.number().int().positive()
})

// Type definitions
export type Task = z.infer<typeof taskSchema>
export type CreateTask = z.infer<typeof createProjectSchema>
export type UpdateTask = z.infer<typeof updateProjectSchema>