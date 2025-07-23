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




export const Role = {
    CUSTOMER: "CUSTOMER",
    ADMIN: "ADMIN",
} as const;

export type Role = typeof Role[keyof typeof Role];
export const roleEnum = z.enum(["CUSTOMER", "ADMIN"]);

//UserInsertDTO

export const userInsertSchema = z.object({
    firstname: z.string().min(1, "Νame is required"),
    lastname: z.string().min(1, "Lastname is required"),
    username: z.string().email("Invalid email"),
    password: z.string()
        .regex(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)(?=.*?[@#$!%&*]).{8,}$/, "The password must have 8+ characters, uppercase, lowercase, numbers & special characters"),
    afm: z.string().regex(/^\d{9}$/, "Afm must consist of exactly 9 digits"),
    fatherName:z.string().min(1, "fatherName is required"),
    fatherLastname: z.string().min(1, "fatherLastname is required"),
    motherName:z.string().min(1, "motherName is required"),
    motherLastname: z.string().min(1, "motherLastname is required"),
    dateOfBirth: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid date",
    }),
    role: roleEnum
});


//PersonalInfoInsertDTO schema

export const personalInfoInsertSchema = z.object({
    identityNumber: z.string().min(1, "Identity number is required"),
    placeOfBirth: z.string().min(1, "Place of birth is required"),
})

//CustomerInsertDTO

export const customerInsertSchema = z.object({
    isActive: z.boolean(),
    user: userInsertSchema,
    personalInfo: personalInfoInsertSchema
})


//Types

export type UserInsertDto = z.infer<typeof userInsertSchema>;
export type PersonalInfoInsertDTO = z.infer<typeof personalInfoInsertSchema>;
export type CustomerInsertDTO = z.infer<typeof customerInsertSchema>;

export async function saveCustomer(customer: CustomerInsertDTO) {
    const res = await fetch("http://localhost:8080/api/customers/save", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(customer),
    });

    if (!res.ok) {
        const error = await res.text();
        throw new Error("Failed to save customer: " + error);
    }

    return await res.json();
}

// filtering and pagination


import type {CustomerReadOnlyDTO, Page as Paginated, CustomerFilters} from "@/types/customer.ts";

export async function getCustomersFilteredPaginated(filters: CustomerFilters) : Promise<Paginated<CustomerReadOnlyDTO>> {
    const res = await fetch("http://localhost:8080/api/customers/filtered/paginated", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",

        },
        body: JSON.stringify(filters),
    });

    if (!res.ok) {
        throw new Error("Failed to fetch filtered and paginated customers");
    }

    return await res.json();
}


// afm filtering

export async function getCustomerByAfm(afm: string): Promise<CustomerReadOnlyDTO> {
    const res = await fetch(`http://localhost:8080/api/customers/afm/${afm}`);

    if (!res.ok) {
        throw new Error(`Failed to fetch customer with AFM ${afm}`);
    }

    const data = await res.json();
    console.log("Customer data from API: ", data)
    return data;
    
}