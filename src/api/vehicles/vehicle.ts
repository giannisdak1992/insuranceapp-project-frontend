import { z } from "zod";

const API_URL = "http://localhost:8080/api";



export const VehicleType = {
    CAR: "CAR",
    MOTORCYCLE: "MOTORCYCLE",
} as const;

export type VehicleType = typeof VehicleType[keyof typeof VehicleType];

export const carReadOnlySchema = z.object({
    plateNumber: z.string(),
    vehicleType: z.literal(VehicleType.CAR)
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

export async function saveCar(car: CarInsertDTO) {
    const res = await fetch(`${API_URL}/vehicles/cars`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(car),
    });

    if (!res.ok) {
        const error = await res.text();
        throw new Error("Failed to save car: " + error);
    }

    return await res.json();
}

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

export async function saveMotorCycle(motorcycle: MotorCycleInsertDTO) {
    const res = await fetch(`${API_URL}/vehicles/motorcycles`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(motorcycle),
    });

    if (!res.ok) {
        const error = await res.text();
        throw new Error("Failed to save motorcycle: " + error);
    }

    return await res.json();
}