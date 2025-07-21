import { z } from "zod";

const API_URL = "http://localhost:8080/api";


const userSchema = z.object({
    firstname: z.string(),
    lastname: z.string(),
    afm: z.string(),
});

const personalInfoSchema = z.object({
    identityNumber: z.string(),
    placeOfBirth: z.string(),
});

export const customerSchema = z.object({
    id: z.number().int(),
    uuid: z.string().nullable(),
    isActive: z.boolean(),
    user: userSchema,
    personalInfo: personalInfoSchema,
});

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
export type User = z.infer<typeof userSchema>;
export type PersonalInfo = z.infer<typeof personalInfoSchema>;
export type Customer = z.infer<typeof customerSchema>;

export type Page<T> = {
    content: T[];
    number: number;
    totalPages: number;
};

export async function getPaginatedCustomers(
    page: number = 0,
    size: number = 5
): Promise<Page<Customer>> {
    const res = await fetch(
        `${API_URL}/customers/paginated?page=${page}&size=${size}`
    );

    if (!res.ok) {
        throw new Error("Failed to fetch customers");
    }

    const data = await res.json();
    console.log("Raw API data: ", data)
    const parsed = pageSchema(customerSchema).safeParse(data);

    if (!parsed.success) {
        console.error("Validation errors:", parsed.error);
        throw new Error("Invalid data format from API");
    }

    return parsed.data;
}