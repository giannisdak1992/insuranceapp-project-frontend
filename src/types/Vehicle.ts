import { z } from "zod";
import {VehicleType} from "@/enums/enum.ts";

export const carReadOnlySchema = z.object({
    plateNumber: z.string(),
    vehicleType: z.literal(VehicleType.CAR),
    customerAfm: z.string(),
    id: z.undefined()
})

export type CarReadOnlyDTO = z.infer<typeof carReadOnlySchema>;

export const carInsertSchema = z.object({
    plateNumber: z.string().regex(/^[A-Z]{3}[0-9]{4}$/, {
        message: "plateNumber must consist of 3 uppercase letters followed by 4 digits (e.g. ABC1234)",
    }),
    afm: z.string().regex(/^[0-9]{9}$/, {
        message: "afm must consist of exactly 9 digits",
    }),
});
export type CarInsertDTO = z.infer<typeof carInsertSchema>;


export const motorcycleReadSchema = z.object({
    plateNumber: z.string(),
    vehicleType: z.literal(VehicleType.MOTORCYCLE),
    customerAfm: z.string()
})

export type MotorCycleReadOnlyDTO = z.infer<typeof motorcycleReadSchema>;

export const motorcycleInsertSchema = z.object({
    plateNumber: z.string().regex(/^[A-Z]{3}[0-9]{3}$/, {
        message: "plateNumber must consist of 3 uppercase letters followed by 3 digits (e.g. ABC123)",
    }),
    customerAfm: z.string().regex(/^[0-9]{9}$/, {
        message: "afm must consist of exactly 9 digits",
    }),
});
export type MotorCycleInsertDTO = z.infer<typeof motorcycleInsertSchema>;


export const pageSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
    z.object({
        content: z.array(itemSchema),
        number: z.number().int(),
        totalPages: z.number().int(),

        size: z.number().int().optional(),
        totalElements: z.number().int().optional(),
        first: z.boolean().optional(),
        last: z.boolean().optional(),
        numberOfElements: z.number().int().optional(),
        pageable: z.unknown().optional(),
        sort: z.unknown().optional(),
    });

export type Page<T> = {
    content: T[];
    number: number;
    totalPages: number;
};
