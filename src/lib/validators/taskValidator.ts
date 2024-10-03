import { z } from "zod";
const TaskStatus = ["TODO", "IN_PROGRESS", "DONE", "BLOCKED", "REVIEW"] as const;
const TaskPriority = ["LOW", "MEDIUM", "HIGH", "URGENT"] as const;
export const TaskSchema = z.object({
    title: z.string()
      .min(1, "Title is required")
      .max(100, "Title must be 100 characters or less"),
    
    description: z.string()
      .max(1000, "Description must be 1000 characters or less")
      .nullable()
      .optional(),
    
    status: z.enum(TaskStatus)
      .nullable()
      .optional(),
    
    priority: z.enum(TaskPriority)
      .nullable() 
      .optional(),
    
    tags: z.string()
      .nullable()
      .optional(),
    
    startDate: z.string()
      .datetime({ message: "Invalid start date format" })
      .nullable()
      .optional()
      .transform((date) => date ? new Date(date) : null),
    
    dueDate: z.string()
      .datetime({ message: "Invalid due date format" })
      .nullable()
      .optional()
      .transform((date) => date ? new Date(date) : null),
    
    points: z.number()
      .int("Points must be an integer")
      .min(0, "Points must be 0 or greater")
      .max(100, "Points must be 100 or less")
      .nullable()
      .optional(),
    
    projectId: z.number()
      .int("Project ID must be an integer")
      .positive("Project ID must be positive"),
    
    authorUserId: z.number()
      .int("Author user ID must be an integer")
      .positive("Author user ID must be positive"),
    
    assignedUserId: z.number()
      .int("Assigned user ID must be an integer")
      .positive("Assigned user ID must be positive")
      .nullable()
      .optional(),
   }).refine((data) => {
    if (data.startDate && data.dueDate) {
      return data.dueDate >= data.startDate;
    }
    return true;
   }, {
    message: "Due date must be after start date",
    path: ["dueDate"]
   });
   
   
   export type TaskInput = z.infer<typeof TaskSchema>;