import { useEffect, useState } from "react";
import InsurancePolicyList from "@/components/InsurancePolicyList";
import { getPoliciesForCurrentCustomer } from "@/api/InsurancePolicy.ts";
import type { InsurancePolicyReadOnlyDTO } from "@/types/InsurancePolicy.ts";
import { useIsAdmin, useIsCustomer } from "@/hooks/useRoles.ts";

const CustomerPoliciesPage = () => {
    const isAdmin = useIsAdmin();
    const isCustomer = useIsCustomer();
    const isAuthenticated = isAdmin || isCustomer;

    const [policies, setPolicies] = useState<InsurancePolicyReadOnlyDTO[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getPoliciesForCurrentCustomer()
            .then((data) => {
                setPolicies(data);
            })
            .catch((err) => {
                setError(err.message || "Unknown error");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (!isAuthenticated) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white p-6 rounded-lg shadow-md border border-yellow-300 text-center">
                    <h2 className="text-2xl font-semibold text-yellow-600 mb-2">Authentication Required</h2>
                    <p className="text-gray-700">You must be logged in to access this page.</p>
                </div>
            </div>
        );
    }

    if (loading) {
        return <p className="text-blue-600">Loading...</p>;
    }

    if (error) {
        return <p className="text-red-600">Error: {error}</p>;
    }

    if (policies.length === 0) {
        return <p>No policies found for your account.</p>;
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Your Insurance Policies</h1>
            <InsurancePolicyList policies={policies} />
        </div>
    );
};

export default CustomerPoliciesPage;
