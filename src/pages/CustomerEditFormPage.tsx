import CustomerEditForm from "../components/CustomerEditForm.tsx";


const CustomerEditFormPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-xl bg-white rounded-xl shadow-md p-8 md:p-12">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
                    Edit a customer
                </h1>
                <CustomerEditForm />
            </div>
        </div>
    );
};


export default CustomerEditFormPage;
