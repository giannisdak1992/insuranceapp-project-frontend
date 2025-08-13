import { useEffect, useState } from "react";
import InsurancePolicyList from "@/components/InsurancePolicyList.tsx";
import { getPaginatedPolicies} from "@/api/InsurancePolicy.ts";
import type { InsurancePolicyReadOnlyDTO } from "@/types/InsurancePolicy.ts";
import {useIsAdmin} from "@/hooks/useRoles.ts";

const InsurancePolicyListPage = () => {
    const isAdmin = useIsAdmin();

    if (!isAdmin) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white p-6 rounded-lg shadow-md border border-red-300 text-center">
                    <h2 className="text-2xl font-semibold text-red-600 mb-2">Unauthorized Access</h2>
                    <p className="text-gray-700">This page is restricted to administrators.</p>
                </div>
            </div>
        );}
    const [policies, setPolicies] = useState<InsurancePolicyReadOnlyDTO[]>([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPolicies = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getPaginatedPolicies(page, 5);
            setPolicies(data.content);
            setTotalPages(data.totalPages);
        } catch (err: any) {
            console.error(err);
            setError(err.message ?? "Unknown error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPolicies();
    }, [page]);

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-semibold text-blue-900 mb-6">
                Policies
            </h1>

            {loading && <p className="text-blue-600">Loading...</p>}
            {error && <p className="text-red-500">Error: {error}</p>}

            {!loading && !error && (
                <>
                    <InsurancePolicyList policies={policies} />

                    <div className="flex justify-between items-center mt-6">
                        <button
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                            onClick={() => setPage((prev) => prev - 1)}
                            disabled={page === 0}
                        >
                            Previous
                        </button>

                        <span className="text-sm text-gray-600">
              Page {page + 1} of {totalPages}
            </span>

                        <button
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                            onClick={() => setPage((prev) => prev + 1)}
                            disabled={page + 1 >= totalPages}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default InsurancePolicyListPage;
