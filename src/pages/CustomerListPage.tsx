import { useEffect, useState } from "react";
import { getPaginatedCustomers } from "@/api/customers/customer";
import type { Customer } from "@/api/customers/customer";
import CustomerList from "../components/CustomerList";
const CustomerListPage = ()=> {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const data = await getPaginatedCustomers(page);
                setCustomers(data.content);
                setTotalPages(data.totalPages);
            } catch (err) {
                setError("Error in fetching data");
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [page]);

    const handlePrev = () => {
        if (page > 0) setPage(page - 1);
    };

    const handleNext = () => {
        if (page < totalPages - 1) setPage(page + 1);
    };

    if (loading) return <p className="text-gray-500">Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Customers</h1>

            <CustomerList customers={customers} />

            <div className="flex items-center justify-between mt-6">
                <button
                    onClick={handlePrev}
                    disabled={page === 0}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                >
                    &laquo; Previous
                </button>

                <span className="text-sm text-gray-600">
          Σελίδα {page + 1} από {totalPages}
        </span>

                <button
                    onClick={handleNext}
                    disabled={page >= totalPages - 1}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                >
                    Next &raquo;
                </button>
            </div>
        </div>
    );
}

export default CustomerListPage;