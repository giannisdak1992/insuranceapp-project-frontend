import type {CarReadOnlyDTO} from "@/types/Vehicle.ts";

type Props = {
    cars: CarReadOnlyDTO[];
};

const CarList = ({ cars }: Props) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 bg-white rounded shadow-sm">
                <thead className="bg-blue-50">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider opacity-90">
                        PlateNumber
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider opacity-90">
                        VehicleType
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider opacity-90">
                        CustomerAfm
                    </th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                {cars?.map((car) => (
                    <tr key={car?.id} className="hover:bg-blue-50 transition">
                        <td className="px-6 py-4 text-sm text-blue-900 opacity-90">
                            {car?.plateNumber}
                        </td>
                        <td className="px-6 py-4 text-sm text-blue-900 opacity-90">
                            {car?.vehicleType}
                        </td>
                        <td className="px-6 py-4 text-sm text-blue-900 opacity-90">
                            {car?.customerAfm}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default CarList;