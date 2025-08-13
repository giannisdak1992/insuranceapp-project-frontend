import {
    type InsurancePolicyInsertDTO,
    type InsurancePolicyReadOnlyDTO,
    insurancePolicyReadOnlySchema,
} from "@/types/InsurancePolicy.ts";
import { type Page, pageSchema } from "@/types/Vehicle.ts";
import { getAuthHeaders } from "@/hooks/authHeader.ts"; // Εισαγωγή auth headers

const API_URL = "http://localhost:8080/api";

//create policy
export async function createPolicy(
    insurancePolicyInsertDTO: InsurancePolicyInsertDTO
): Promise<InsurancePolicyReadOnlyDTO> {
    const res = await fetch(`${API_URL}/policies/create`, {
        method: "POST",
        headers: getAuthHeaders(),
        credentials: "include",
        body: JSON.stringify(insurancePolicyInsertDTO),
    });

    if (!res.ok) {
        const error = await res.text();
        throw new Error("Failed to save policy: " + error);
    }

    return await res.json();
}

//get paginated policies
export async function getPaginatedPolicies(
    page: number = 0,
    size: number = 5
): Promise<Page<InsurancePolicyReadOnlyDTO>> {
    const res = await fetch(`${API_URL}/policies/paginated?page=${page}&size=${size}`, {
        method: "GET",
        headers: getAuthHeaders(),
        credentials: "include",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch policies");
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

// get policies for logged in user
export async function getPoliciesForCurrentCustomer(filters = {}) {
    const res = await fetch(`${API_URL}/policies/customer/self`, {
        method: "POST",
        headers: getAuthHeaders(),
        credentials: "include",
        body: JSON.stringify(filters),
    });

    if (!res.ok) {
        const error = await res.text();
        throw new Error("Failed to fetch policies: " + error);
    }

    return await res.json();
}
