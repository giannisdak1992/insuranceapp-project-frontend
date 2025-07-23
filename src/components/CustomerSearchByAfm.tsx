import { useState } from "react";
import {getCustomerByAfm} from "@/api/customers/customer"
import CustomerList from "./CustomerList";
import type {CustomerReadOnlyDTO} from "@/types/customer.ts";


const CustomerSearchByAfm = () => {
    const [afm, setAfm] = useState("");
    const [customer, setCustomer] = useState<CustomerReadOnlyDTO |  null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        setError(null);
        setLoading(true);
        setCustomer(null);
        try {
            const data : CustomerReadOnlyDTO = await getCustomerByAfm(afm);
            setCustomer(data);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-md mx-auto p-4">
            <input type="text"
                    placeholder="Search by Afm"
                    value={afm}
                    onChange = { (e) => setAfm(e.target.value) }
                    className="border border-gray-300 rounded px-3 py-2 w-full mb-2"
            />

            <button
                onClick={handleSearch}
                disabled={!afm || loading}
                className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
            >
                {loading ? "Searching..." : "Search"}

            </button>

            {error && <p className="text-red-600 mt-2">{error}</p>}

            {customer && <CustomerList customers={[customer]} />}
        </div>
    );
};

export default CustomerSearchByAfm;