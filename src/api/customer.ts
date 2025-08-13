import { z } from "zod";
import { pageSchema } from "@/filters/Paginated.ts";
import {
    type CustomerDropdownDTO,
    customerDropdownSchema,
    type CustomerInsertDTO,
    type CustomerReadOnlyDTO,
    customerReadOnlySchema,
    type CustomerUpdateDTO,
} from "@/types/Customer.ts";
import type { Page } from "@/filters/Page.ts";
import type { CustomerFilters } from "@/filters/CustomerFilters.ts";
import {getAuthHeaders} from "@/hooks/authHeader.ts"

const API_URL = "http://localhost:8080/api";

//get paginated customers
export async function getPaginatedCustomers(
    page: number = 0,
    size: number = 5
): Promise<Page<CustomerReadOnlyDTO>> {
    const res = await fetch(`${API_URL}/customers/paginated?page=${page}&size=${size}`, {
        headers: getAuthHeaders(),
        credentials: "include",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch customers");
    }

    const data = await res.json();
    console.log("Raw API data: ", data);

    const parsed = pageSchema(customerReadOnlySchema).safeParse(data);

    if (!parsed.success) {
        console.error("Validation errors:", parsed.error);
        throw new Error("Invalid data format from API");
    }

    return parsed.data;
}

//save customer
export async function saveCustomer(customer: CustomerInsertDTO) {
    const res = await fetch(`${API_URL}/customers/save`, {
        method: "POST",
        headers: getAuthHeaders(),
        credentials: "include",
        body: JSON.stringify(customer),
    });

    if (!res.ok) {
        const error = await res.text();
        throw new Error("Failed to save customer: " + error);
    }

    return await res.json();
}

// filtered and paginated
export async function getCustomersFilteredPaginated(
    filters: CustomerFilters
): Promise<Page<CustomerReadOnlyDTO>> {
    const res = await fetch(`${API_URL}/customers/filtered/paginated`, {
        method: "POST",
        headers: getAuthHeaders(),
        credentials: "include",
        body: JSON.stringify(filters),
    });

    if (!res.ok) {
        const errorText = await res.text();
        console.error("Failed to fetch filtered customers:", res.status, errorText);
        throw new Error("Failed to fetch filtered and paginated customers");
    }

    return await res.json();
}

//get by afm
export async function getCustomerByAfm(afm: string): Promise<CustomerReadOnlyDTO> {
    const res = await fetch(`${API_URL}/customers/afm/${afm}`, {
        headers: getAuthHeaders(),
        credentials: "include",
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch customer with AFM ${afm}`);
    }

    const data = await res.json();
    console.log("Customer data from API: ", data);
    return data;
}

// get by id
export async function getCustomerById(id: number): Promise<CustomerReadOnlyDTO> {
    const res = await fetch(`${API_URL}/customers/${id}`, {
        headers: getAuthHeaders(),
        credentials: "include",
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Failed to fetch customer: ${res.status} ${res.statusText} - ${text}`);
    }

    const data = await res.json();
    console.log("Customer data received from API:", data);
    return data;
}

//update customer
export async function updateCustomer(
    id: number,
    customer: CustomerUpdateDTO
): Promise<CustomerReadOnlyDTO> {
    const res = await fetch(`${API_URL}/customers/${id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        credentials: "include",
        body: JSON.stringify(customer),
    });

    if (!res.ok) {
        const error = await res.text();
        throw new Error("Failed to update customer: " + error);
    }

    return await res.json();
}

// fetch customers for dropdown
export async function fetchCustomersForDropdown(): Promise<CustomerDropdownDTO[]> {
    const res = await fetch(`${API_URL}/customers/dropdown`, {
        method: "GET",
        headers: getAuthHeaders(),
        credentials: "include",
    });

    if (!res.ok) {
        const error = await res.text();
        throw new Error("Failed to fetch customers for dropdown: " + error);
    }

    const data = await res.json();
    console.log("Dropdown data:", data);
    return z.array(customerDropdownSchema).parse(data);
}
