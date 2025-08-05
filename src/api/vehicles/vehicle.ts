import { z } from "zod";
import {VehicleType} from "@/enums/enum.ts";

const API_URL = "http://localhost:8080/api";



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




export async function fetchPlatesByAfm(afm: string): Promise<string[]> {
    const response = await fetch(`http://localhost:8080/api/vehicles/plates/${afm}`);

    if (!response.ok) {
        throw new Error(`Failed to fetch plates for AFM: ${afm}`);
    }

    return await response.json();
}

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



//paginated cars

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



export async function getPaginatedCars(
    page: number = 0,
    size: number = 5
): Promise<Page<CarReadOnlyDTO>> {
    const res = await fetch(
        `${API_URL}/vehicles/cars/paginated?page=${page}&size=${size}`
    );

    if (!res.ok) {
        throw new Error("Failed to fetch cars");
    }

    const data = await res.json();
    console.log("Raw API data: ", data)
    const parsed = pageSchema(carReadOnlySchema).safeParse(data);

    if (!parsed.success) {
        console.error("Validation errors:", parsed.error);
        throw new Error("Invalid data format from API");
    }

    return parsed.data;
}
