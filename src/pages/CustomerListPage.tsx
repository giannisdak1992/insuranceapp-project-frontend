import { useEffect, useState } from "react";
import { getCustomersFilteredPaginated } from "@/api/customers/customer";
import type { CustomerReadOnlyDTO, CustomerFilters, Page } from "@/types/customer";
import CustomerList from "../components/CustomerList";
import CustomerSearchByAfm from "@/components/CustomerSearchByAfm.tsx";

const CustomerListPage = () => {
    const [customers, setCustomers] = useState<CustomerReadOnlyDTO[]>([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Φίλτρο για isActive: true, false ή undefined (όχι φιλτράρισμα)
    const [isActiveFilter, setIsActiveFilter] = useState<boolean | undefined>(undefined);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            setError(null);

            try {
                const filters: CustomerFilters & { page: number; pageSize: number } = {
                    page,
                    pageSize: 5,
                };

                if (isActiveFilter !== undefined) {
                    filters.isActive = isActiveFilter;
                }

                const data: Page<CustomerReadOnlyDTO> = await getCustomersFilteredPaginated(filters);
                console.log("API response:", data);
                setCustomers(data.data);
                setTotalPages(data.totalPages);
            } catch (err) {
                setError("Error in fetching data");
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [page, isActiveFilter]);

    const handlePrev = () => {
        if (page > 0) setPage(page - 1);
    };

    const handleNext = () => {
        if (page < totalPages - 1) setPage(page + 1);
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Customers</h1>
            <CustomerSearchByAfm />

            {/* Φίλτρο isActive */}
            <div className="mb-4">
                <label className="mr-2 font-semibold">Filter by Active Status:</label>
                <select
                    value={isActiveFilter === undefined ? "all" : isActiveFilter ? "active" : "inactive"}
                    onChange={(e) => {
                        const val = e.target.value;
                        if (val === "all") setIsActiveFilter(undefined);
                        else if (val === "active") setIsActiveFilter(true);
                        else setIsActiveFilter(false);
                        setPage(0); // reset page on filter change
                    }}
                    className="border rounded p-1"
                >
                    <option value="all">All</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
            </div>

            {loading && <p className="text-gray-500">Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {!loading && !error && <CustomerList customers={customers} />}

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
};

export default CustomerListPage;