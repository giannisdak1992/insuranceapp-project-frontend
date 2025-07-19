import type { Customer } from "../api/customers";

type Props = {
    customers: Customer[];
};

const CustomerList = ({customers} : Props) => {
    return (
        <div className="space-y-4">
            {customers.map((customer) => (
                <div
                    key={customer.id}
                    className="border p-4 rounded-md shadow-sm bg-white"
                >
                    <h2 className="text-lg font-bold">
                        {customer.user.firstname}
                    </h2>
                    <p className="text-sm text-gray-600">{customer.user.lastname}</p>
                    <p className="text-sm">
                        ΑΦΜ: <span className="font-medium">{customer.user.afm}</span>
                    </p>

                </div>
            ))}
        </div>
    );
}


export default CustomerList;
