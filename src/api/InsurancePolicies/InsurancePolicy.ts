import {
    type InsurancePolicyInsertDTO,
    type InsurancePolicyReadOnlyDTO,
    insurancePolicyReadOnlySchema
} from "@/schemas/InsurancePolicy.ts";
import { type Page, pageSchema} from "@/api/vehicles/vehicle.ts";

const API_URL = "http://localhost:8080/api";




export async function createPolicy(insurancePolicyInsertDTO: InsurancePolicyInsertDTO) : Promise<InsurancePolicyReadOnlyDTO> {
    const res = await fetch(`${API_URL}/policies/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(insurancePolicyInsertDTO),
    });

    if (!res.ok) {
        const error = await res.text();
        throw new Error("Failed to save policy: " + error);
    }

    return await res.json();
}




export async function getPaginatedPolicies(
    page: number = 0,
    size: number = 5
): Promise<Page<InsurancePolicyReadOnlyDTO>> {

    const res = await fetch(
        `${API_URL}/policies/paginated?page=${page}&size=${size}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        }
    );

    if (!res.ok) {
        throw new Error("Failed policies");
    }

    const data = await res.json();
    console.log("Raw API data: ", data);

    const parsed = pageSchema(insurancePolicyReadOnlySchema).safeParse(data);

    if (!parsed.success) {
        console.error("Validation errors:", parsed.error);
        throw new Error("Invalid data format from API");
    }

    return parsed.data;
}
