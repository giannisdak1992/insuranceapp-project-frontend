import type {CustomerReadOnlyDTO} from "@/types/customer.ts";
import {useNavigate} from "react-router-dom";

type Props = {
    customers: CustomerReadOnlyDTO[];
};

const CustomerList = ({ customers }: Props) => {
    const navigate = useNavigate();
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 bg-white rounded shadow-sm">
                <thead className="bg-blue-50">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider opacity-90">
                        Firstname
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider opacity-90">
                        Lastname
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider opacity-90">
                        Afm
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider opacity-90">
                        IsActive
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider opacity-90">
                        Actions
                    </th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                {customers?.map((customer) => (
                    <tr key={customer?.id} className="hover:bg-blue-50 transition">
                        <td className="px-6 py-4 text-sm text-blue-900 opacity-90">
                            {customer?.user?.firstname}
                        </td>
                        <td className="px-6 py-4 text-sm text-blue-900 opacity-90">
                            {customer?.user?.lastname}
                        </td>
                        <td className="px-6 py-4 text-sm text-blue-900 opacity-90">
                            {customer?.user?.afm}
                        </td>
                        <td className="px-6 py-4 text-sm text-blue-900 opacity-90">
                            {customer?.isActive ? "Yes" : "No"}
                        </td>
                        <td className="px-6 py-4 text-sm text-blue-900 opacity-90 space-x-2">
                            <button
                                onClick = {() => navigate(`/customers/edit/${customer?.id}`)}
                                className = "text-blue-600 hover:underline">
                                Update
                            </button>


                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default CustomerList;