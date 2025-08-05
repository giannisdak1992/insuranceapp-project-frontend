import type {InsurancePolicyReadOnlyDTO} from "@/schemas/InsurancePolicy.ts";

type Props = {
    policies: InsurancePolicyReadOnlyDTO[];
};

const InsurancePolicyList = ({ policies }: Props) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 bg-white rounded shadow-sm">
                <thead className="bg-blue-50">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider opacity-90">
                        uuid
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider opacity-90">
                        startDate
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider opacity-90">
                        endDate
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider opacity-90">
                        insuranceType
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider opacity-90">
                        plateNumber
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider opacity-90">
                        vehicleType
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider opacity-90">
                        customerAfm
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider opacity-90">
                        customerFirstName
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider opacity-90">
                        customerLastname
                    </th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                {policies?.map((policy) => (
                    <tr key={policy?.uuid} className="hover:bg-blue-50 transition">
                        <td className="px-6 py-4 text-sm text-blue-900 opacity-90">
                            {policy?.uuid}
                        </td>
                        <td className="px-6 py-4 text-sm text-blue-900 opacity-90">
                            {policy?.startDate}
                        </td>
                        <td className="px-6 py-4 text-sm text-blue-900 opacity-90">
                            {policy?.endDate}
                        </td>
                        <td className="px-6 py-4 text-sm text-blue-900 opacity-90">
                            {policy?.insuranceType}
                        </td>

                        <td className="px-6 py-4 text-sm text-blue-900 opacity-90">
                            {policy?.plateNumber}
                        </td>

                        <td className="px-6 py-4 text-sm text-blue-900 opacity-90">
                            {policy?.vehicleType}
                        </td>

                        <td className="px-6 py-4 text-sm text-blue-900 opacity-90">
                            {policy?.customerAfm}
                        </td>

                        <td className="px-6 py-4 text-sm text-blue-900 opacity-90">
                            {policy?.customerFirstname}
                        </td>

                        <td className="px-6 py-4 text-sm text-blue-900 opacity-90">
                            {policy?.customerLastname}
                        </td>

                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default InsurancePolicyList;