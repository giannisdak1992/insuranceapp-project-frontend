import { z } from "zod";

export const pageSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
    z.object({
        currentPage: z.number().int(),
        data: z.array(itemSchema),
        numberOfElements: z.number().int().optional(),
        pageSize: z.number().int().optional(),
        totalElements: z.number().int().optional(),
        totalPages: z.number().int(),

    });

