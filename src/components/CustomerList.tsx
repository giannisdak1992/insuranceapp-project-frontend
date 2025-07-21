import type { Customer } from "../api/customers";

type Props = {
    customers: Customer[];
};

const CustomerList = ({ customers }: Props) => {
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
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                {customers.map((customer) => (
                    <tr key={customer.id} className="hover:bg-blue-50 transition">
                        <td className="px-6 py-4 text-sm text-blue-900 opacity-90">
                            {customer.user.firstname}
                        </td>
                        <td className="px-6 py-4 text-sm text-blue-900 opacity-90">
                            {customer.user.lastname}
                        </td>
                        <td className="px-6 py-4 text-sm text-blue-900 opacity-90">
                            {customer.user.afm}
                        </td>
                        <td className="px-6 py-4 text-sm text-blue-900 opacity-90">
                            {customer.isActive ? "Yes" : "No"}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default CustomerList;