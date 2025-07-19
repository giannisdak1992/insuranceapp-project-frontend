import { z } from "zod";

const API_URL = "http://localhost:8080/api";

const roleValues = ["ADMIN", "CUSTOMER"] as const;

const roleSchema = z.enum(roleValues);

export type RoleType = z.infer<typeof roleSchema>;

const userSchema = z.object({
    firstname: z.string(),
    lastname: z.string(),
    username: z.string().email(),
    role: roleSchema,
});

const personalInfoSchema = z.object({
    identityNumber: z.string(),
    placeOfBirth: z.string(),
});

export const customerSchema = z.object({
    id: z.number().int(),
    uuid: z.string(),
    isActive: z.boolean(),
    user: userSchema,
    personalInfo: personalInfoSchema,
});

export const pageSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
    z.object({
        content: z.array(itemSchema),
        number: z.number().int(),
        totalPages: z.number().int(),
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

    const parsed = pageSchema(customerSchema).safeParse(data);

    if (!parsed.success) {
        console.error("Validation errors:", parsed.error);
        throw new Error("Invalid data format from API");
    }

    return parsed.data;
}
