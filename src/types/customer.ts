export type Role = "CUSTOMER" | "ADMIN";

export interface UserReadOnlyDTO {
    id: number;
    firstname: string;
    lastname: string;
    username: string;
    afm: string;
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
    data: T[];
    currentPage: number;
    totalPages: number;
}

export interface CustomerFilters {
    firstname? : string;
    lastname? : string;
    isActive?: boolean
    page ?: number;
    pageSize? : number
}