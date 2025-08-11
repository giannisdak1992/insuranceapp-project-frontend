import { z } from "zod";
import  {VehicleType, InsuranceType} from "@/enums/enum.ts";

const InsuranceTypeEnum = z.enum(Object.values(InsuranceType) as [string, ...string[]]);
const VehicleTypeEnum = z.enum(Object.values(VehicleType) as [string, ...string[]]);

export const insurancePolicyReadOnlySchema = z.object({
    uuid: z.string(),
    startDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid start date',
    }),
    endDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid end date',
    }),
    insuranceType: InsuranceTypeEnum,
    plateNumber: z.string(),
    vehicleType: VehicleTypeEnum,
    customerAfm: z.string(),
    customerFirstname: z.string(),
    customerLastname: z.string()
});
export type InsurancePolicyReadOnlyDTO = z.infer<typeof insurancePolicyReadOnlySchema>;

export const insurancePolicyInsertSchema = z.object({
    startDate: z
        .string()
        .refine((val) => !isNaN(Date.parse(val)), {
            message: "Start date is required and must be a valid date",
        }),

    insuranceType: InsuranceTypeEnum,
    plateNumber: z.string().min(1, {
        message: "Plate number is required",
    }),

    customerAfm: z
        .string()
        .min(1, { message: "Customer's Afm is required" }),
});

export type InsurancePolicyInsertDTO = z.infer<typeof insurancePolicyInsertSchema>;