export const VehicleType = {
    CAR: "CAR",
    MOTORCYCLE: "MOTORCYCLE",
} as const;

export type VehicleType = typeof VehicleType[keyof typeof VehicleType];



export const InsuranceType = {
    THIRD_PARTY: "THIRD_PARTY",
    FULL_COVERAGE: "FULL COVERAGE",
} as const;

export type InsuranceType = typeof InsuranceType[keyof typeof InsuranceType];



export const Role = {
    CUSTOMER: "CUSTOMER",
    ADMIN: "ADMIN",
} as const;

export type Role = typeof Role[keyof typeof Role];