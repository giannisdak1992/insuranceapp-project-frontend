import CustomerInsertForm from "../components/CustomerInsertForm";
import {useIsAdmin} from "@/hooks/useRoles.ts"; // προσαρμόζεις ανάλογα

const CustomerInsertFormPage = () => {
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
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-xl bg-white rounded-xl shadow-md p-8 md:p-12">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
                    Add a new Customer
                </h1>
                <CustomerInsertForm />
            </div>
        </div>
    );
};


export default CustomerInsertFormPage;
