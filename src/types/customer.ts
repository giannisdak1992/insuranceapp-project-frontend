export type Role = "CUSTOMER" | "ADMIN";

export interface UserReadOnlyDTO {
    id: number;
    firstname: string;
    lastname: string;
    username: string;
    role: Role;
}

export interface PersonalInfoReadOnlyDTO {
    identityNumber: string;
    placeOfBirth: string;
}

export interface CustomerReadOnlyDTO {
    id: number;
    uuid: string | null;
    isActive: boolean;
    user: UserReadOnlyDTO;
    personalInfo: PersonalInfoReadOnlyDTO;
}

export interface Page<T> {
    content: T[];
    number: number;
    totalPages: number;
}