import {
    type CarInsertDTO,
    type CarReadOnlyDTO,
    carReadOnlySchema,
    type MotorCycleInsertDTO,
    type Page, pageSchema
} from "@/schemas/Vehicle";

const API_URL = "http://localhost:8080/api";

export async function saveCar(car: CarInsertDTO) {
    const res = await fetch(`${API_URL}/vehicles/cars`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(car),
    });

    if (!res.ok) {
        const error = await res.text();
        throw new Error("Failed to save car: " + error);
    }

    return await res.json();
}



export async function fetchPlatesByAfm(afm: string): Promise<string[]> {
    const response = await fetch(`http://localhost:8080/api/vehicles/plates/${afm}`);

    if (!response.ok) {
        throw new Error(`Failed to fetch plates for AFM: ${afm}`);
    }

    return await response.json();
}

export async function saveMotorCycle(motorcycle: MotorCycleInsertDTO) {
    const res = await fetch(`${API_URL}/vehicles/motorcycles`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(motorcycle),
    });

    if (!res.ok) {
        const error = await res.text();
        throw new Error("Failed to save motorcycle: " + error);
    }

    return await res.json();
}

//paginated cars

export async function getPaginatedCars(
    page: number = 0,
    size: number = 5
): Promise<Page<CarReadOnlyDTO>> {
    const res = await fetch(
        `${API_URL}/vehicles/cars/paginated?page=${page}&size=${size}`
    );

    if (!res.ok) {
        throw new Error("Failed to fetch cars");
    }

    const data = await res.json();
    console.log("Raw API data: ", data)
    const parsed = pageSchema(carReadOnlySchema).safeParse(data);

    if (!parsed.success) {
        console.error("Validation errors:", parsed.error);
        throw new Error("Invalid data format from API");
    }

    return parsed.data;
}
