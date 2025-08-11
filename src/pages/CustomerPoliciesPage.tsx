import { useEffect, useState } from "react";
import InsurancePolicyList from "@/components/InsurancePolicyList";
import { getPoliciesForCurrentCustomer } from "@/api/InsurancePolicies/InsurancePolicy";
import type { InsurancePolicyReadOnlyDTO } from "@/types/InsurancePolicy.ts";

const CustomerPoliciesPage = () => {
    const [policies, setPolicies] = useState<InsurancePolicyReadOnlyDTO[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getPoliciesForCurrentCustomer()
            .then((data) => {
                setPolicies(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message || "Unknown error");
                setLoading(false);
            });
    }, []);

    {loading && <p className="text-blue-600">Loading...</p>}
    if (error) return <p className="text-red-600">Error: {error}</p>;

    if (policies.length === 0) return <p>No policies found for your account.</p>;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Your Insurance Policies</h1>
            <InsurancePolicyList policies={policies} />
        </div>
    );
};

export default CustomerPoliciesPage;
