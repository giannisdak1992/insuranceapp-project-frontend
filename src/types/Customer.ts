import { z } from "zod";

import {Role} from "@/enums/enum";
const RoleTypeEnum = z.enum(Object.values(Role) as [string, ...string[]]);


const userReadOnlySchema = z.object({
    firstname: z.string(),
    lastname: z.string(),
    afm: z.string(),
});

const personalInfoReadOnlySchema = z.object({
    identityNumber: z.string(),
    placeOfBirth: z.string(),
});

export const customerReadOnlySchema = z.object({
    id: z.number().int().nullable(),
    uuid: z.string().nullable(),
    isActive: z.boolean(),
    user: userReadOnlySchema,
    personalInfo: personalInfoReadOnlySchema,
});

export type CustomerReadOnlyDTO = z.infer<typeof customerReadOnlySchema>;



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
    role: RoleTypeEnum
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


//update
const userUpdateSchema = z.object({
    firstname: z.string().min(1),
    lastname: z.string().min(1),
    username: z.string().email().nullable().optional(),
    password: z.string().nullable().optional(),
    afm: z.string().regex(/^\d{9}$/),
    fatherName: z.string().nullable().optional(),
    fatherLastname: z.string().nullable().optional(),
    motherName: z.string().nullable().optional(),
    motherLastname: z.string().nullable().optional(),
    dateOfBirth: z
        .union([z.string().refine(val => !val || !isNaN(Date.parse(val)), { message: "Invalid date" }), z.date()])
        .nullable()
        .optional(),
    role: z.enum(["CUSTOMER", "ADMIN"]).nullable().optional(),
});

const personalInfoUpdateSchema = z.object({
    identityNumber: z.string().min(1),
    placeOfBirth: z.string().min(1),
});

export const customerUpdateSchema = z.object({
    isActive: z.boolean(),
    user: userUpdateSchema,
    personalInfo: personalInfoUpdateSchema,
});

export const customerDropdownSchema = z.object({
    customerAfm: z.string(),
    fullName: z.string()
});

export type CustomerDropdownDTO = z.infer<typeof customerDropdownSchema>;

export type CustomerUpdateDTO = z.infer<typeof customerUpdateSchema>;

export type CustomerInsertDTO = z.infer<typeof customerInsertSchema>;
