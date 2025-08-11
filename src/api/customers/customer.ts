import { z } from "zod";
import {pageSchema} from "@/filters/Paginated.ts"
import {
    type CustomerDropdownDTO,
    customerDropdownSchema,
    type CustomerInsertDTO, type CustomerReadOnlyDTO,customerReadOnlySchema,
    type CustomerUpdateDTO
} from "@/types/Customer.ts";
import type {Page} from "@/filters/Page.ts";
import type {CustomerFilters} from "@/filters/CustomerFilters.ts";



const API_URL = "http://localhost:8080/api";

export async function getPaginatedCustomers(
    page: number = 0,
    size: number = 5
): Promise<Page<CustomerReadOnlyDTO>> {
    const res = await fetch(
        `${API_URL}/customers/paginated?page=${page}&size=${size}`
    );

    if (!res.ok) {
        throw new Error("Failed to fetch customers");
    }

    const data = await res.json();
    console.log("Raw API data: ", data)
    const parsed = pageSchema(customerReadOnlySchema).safeParse(data);

    if (!parsed.success) {
        console.error("Validation errors:", parsed.error);
        throw new Error("Invalid data format from API");
    }

    return parsed.data;
}

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

export async function getCustomersFilteredPaginated(filters: CustomerFilters) : Promise<Page<CustomerReadOnlyDTO>> {
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

//update

export async function getCustomerById(id: number): Promise<CustomerReadOnlyDTO> {
    const res = await fetch(`http://localhost:8080/api/customers/${id}`);
    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Failed to fetch customer: ${res.status} ${res.statusText} - ${text}`);
    }
    const data = await res.json();
    console.log("Customer data received from API:", data);
    return data;
}

export async function updateCustomer(id: number, customer: CustomerUpdateDTO): Promise<CustomerReadOnlyDTO> {
    const res = await fetch(`http://localhost:8080/api/customers/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(customer),
    });

    if (!res.ok) {
        const error = await res.text();
        throw new Error("Failed to update customer: " + error)
    }

    return await res.json();
}


export async function fetchCustomersForDropdown(): Promise<CustomerDropdownDTO[]> {
    const res = await fetch(`${API_URL}/customers/dropdown`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",

        }
    });

    if (!res.ok) {
        const error = await res.text();
        throw new Error("Failed to fetch customers for dropdown: " + error);
    }

    const data = await res.json();
    console.log("Dropdown data:", data);
    return z.array(customerDropdownSchema).parse(data);
}