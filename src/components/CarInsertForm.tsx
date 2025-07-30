import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { carInsertSchema, saveCar, type CarInsertDTO } from "@/api/vehicles/vehicle";
import { fetchCustomersForDropdown, type CustomerDropdownDTO } from "@/api/customers/customer";

const CarInsertForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<CarInsertDTO>({
        resolver: zodResolver(carInsertSchema),
    });

    const [customers, setCustomers] = useState<CustomerDropdownDTO[]>([]);

    useEffect(() => {
        fetchCustomersForDropdown()
            .then(setCustomers)
            .catch((err) => {
                alert("Failed to load customers: " + err.message);
                console.log(err.message)
            });
    }, []);

    const onSubmit = async (data: CarInsertDTO) => {
        try {
            await saveCar(data);
            alert("Car saved successfully!");
            reset();
        } catch (err) {
            alert("Something went wrong: " + (err as Error).message);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-6"
        >
            <div>
                <label className="block font-semibold mb-1">Plate Number</label>
                <input
                    {...register("plateNumber")}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                />
                {errors.plateNumber && (
                    <p className="text-red-600 text-sm">{errors.plateNumber.message}</p>
                )}
            </div>

            <div>
                <label className="block font-semibold mb-1">AFM</label>
                <select {...register("afm")} defaultValue="">
                    <option value="" disabled>
                        Select customer AFM
                    </option>
                    {customers.map((c) => (
                        <option key={c.customerAfm} value={c.customerAfm}>
                            {c.fullName} ({c.customerAfm})
                        </option>
                    ))}
                </select>
                {errors.afm && (
                    <p className="text-red-600 text-sm">{errors.afm.message}</p>
                )}
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
                Save Car
            </button>
        </form>
    );
};

export default CarInsertForm;
