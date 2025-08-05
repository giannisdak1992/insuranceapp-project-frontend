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