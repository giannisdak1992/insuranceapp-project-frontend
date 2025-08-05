import  { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insurancePolicyInsertSchema, type InsurancePolicyInsertDTO  } from "@/schemas/InsurancePolicy.ts";
import {createPolicy} from "@/api/InsurancePolicies/InsurancePolicy.ts";
import {type CustomerDropdownDTO, fetchCustomersForDropdown,} from "@/api/customers/customer";
import { fetchPlatesByAfm } from "@/api/vehicles/vehicle";
import { InsuranceType} from "@/enums/enum";
import {useNavigate} from "react-router-dom";

const InsurancePolicyInsertForm = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, reset, watch, setValue, formState: { errors, isSubmitting } } = useForm<InsurancePolicyInsertDTO>({
        resolver: zodResolver(insurancePolicyInsertSchema),
    });

    const [customers, setCustomers] = useState<CustomerDropdownDTO[]>([]);
    const [plates, setPlates] = useState<string[]>([]);
    const selectedAfm = watch("customerAfm");

    useEffect(() => {
        // loading customers
        fetchCustomersForDropdown().then(setCustomers).catch(() => setCustomers([]));
    }, []);

    useEffect(() => {
        if (!selectedAfm) {
            setPlates([]);
            setValue("plateNumber", "");
            return;
        }
        // loading plates per customer
        fetchPlatesByAfm(selectedAfm)
            .then(setPlates)
            .catch(() => setPlates([]));
    }, [selectedAfm, setValue]);

    const onSubmit = async (data: InsurancePolicyInsertDTO) => {
        try {
            await createPolicy(data);
            alert("Insurance Policy saved successfully!");
            reset();
            navigate("/policies");
        } catch (err) {
            alert("Something went wrong: " + (err as Error).message);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-4xl mx-auto p-6 bg-white bg-opacity-90 rounded-lg shadow-md space-y-6"
        >
            <div>
                <label>Customer</label>
                <select {...register("customerAfm")} className="w-full border border-gray-300 rounded px-3 py-2">
                    <option value="">Select Customer</option>
                    {customers.map(c => (
                        <option key={c.customerAfm} value={c.customerAfm}>
                            {c.fullName} ({c.customerAfm})
                        </option>
                    ))}
                </select>
                {errors.customerAfm && <p className="text-red-600 text-sm">{errors.customerAfm.message}</p>}
            </div>

            <div>
                <label>Plate Number</label>
                <select {...register("plateNumber")} className="w-full border border-gray-300 rounded px-3 py-2" disabled={plates.length === 0}>
                    <option value="">Select Plate</option>
                    {plates.map((p) => (
                        <option key={p} value={p}>{p}</option>
                    ))}
                </select>
                {errors.plateNumber && <p className="text-red-600 text-sm">{errors.plateNumber.message}</p>}
            </div>


            <div>
                <label>Insurance Type</label>
                <select {...register("insuranceType")} className="w-full border border-gray-300 rounded px-3 py-2">
                    <option value="">Select Insurance Type</option>
                    {Object.values(InsuranceType).map((i) => (
                        <option key={i} value={i}>{i}</option>
                    ))}
                </select>
                {errors.insuranceType && <p className="text-red-600 text-sm">{errors.insuranceType.message}</p>}
            </div>

            <div>
                <label>Start Date</label>
                <input type="date" {...register("startDate")} className="w-full border border-gray-300 rounded px-3 py-2" />
                {errors.startDate && <p className="text-red-600 text-sm">{errors.startDate.message}</p>}
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 disabled:opacity-50"
            >
                Save Insurance Policy
            </button>
        </form>
    );
};

export default InsurancePolicyInsertForm;
