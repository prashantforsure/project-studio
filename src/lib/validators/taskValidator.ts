import { z } from "zod"

export const baseTaskSchema = z.object({
  title: z.string()
    .min(1, "Title is required")
    .max(255, "Title must be less than 255 characters"),
  description: z.string()
    .max(1000, "Description must be less than 1000 characters")
    .nullable()
    .optional(),
  startDate: z.date()
    .nullable()
    .optional(),
  dueDate: z.date()
    .nullable()
    .optional()   
})
export const createTaskSchema = baseTaskSchema

export const updateTaskSchema = baseTaskSchema.partial()

export const taskSchema = baseTaskSchema.extend({
  id: z.number().int().positive()
})

// Type definitions
export type Task = z.infer<typeof taskSchema>
export type CreateTask = z.infer<typeof createTaskSchema>
export type UpdateTask = z.infer<typeof updateTaskSchema>