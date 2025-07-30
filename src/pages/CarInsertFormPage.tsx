import CarInsertForm from "../components/CarInsertForm.tsx";
const CarInsertFormPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-xl bg-white rounded-xl shadow-md p-8 md:p-12">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
                    Add a new Car
                </h1>
                <CarInsertForm />
            </div>
        </div>
    );
};


export default CarInsertFormPage;
