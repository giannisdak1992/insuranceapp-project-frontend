import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    saveCustomer
} from "@/api/customer.ts";
import {type CustomerInsertDTO, customerInsertSchema} from "@/types/Customer";

const CustomerInsertForm = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<CustomerInsertDTO>({
        resolver: zodResolver(customerInsertSchema),
    });

    const onSubmit = async (data: CustomerInsertDTO) => {
        try {
            await saveCustomer(data);
            alert("Customer saved successfully!");
            reset();
            navigate("/");
        } catch (err) {
            alert("Something went wrong: " + (err as Error).message);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-4xl mx-auto p-6 bg-white bg-opacity-90 rounded-lg shadow-md space-y-6"
        >
            {/* isActive */}
            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    {...register("isActive")}
                    className="w-5 h-5 border border-gray-400"
                />
                <label className="font-medium text-gray-800">Active Customer</label>
            </div>
            {errors.isActive && (
                <p className="text-red-600 text-sm">{errors.isActive.message}</p>
            )}

            {/* User Fields */}
            <fieldset className="border border-gray-300 p-4 rounded-md space-y-4">
                <legend className="text-lg font-semibold text-gray-700">
                    User Information
                </legend>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label>FirstName</label>
                        <input
                            {...register("user.firstname")}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        />
                        {errors.user?.firstname && (
                            <p className="text-red-500 text-sm">
                                {errors.user.firstname.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label>LastName</label>
                        <input
                            {...register("user.lastname")}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        />
                        {errors.user?.lastname && (
                            <p className="text-red-500 text-sm">
                                {errors.user.lastname.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label>Email (Username)</label>
                        <input
                            {...register("user.username")}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        />
                        {errors.user?.username && (
                            <p className="text-red-500 text-sm">
                                {errors.user.username.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label>Password</label>
                        <input
                            type="password"
                            {...register("user.password")}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        />
                        {errors.user?.password && (
                            <p className="text-red-500 text-sm">
                                {errors.user.password.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label>AFM</label>
                        <input
                            {...register("user.afm")}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        />
                        {errors.user?.afm && (
                            <p className="text-red-500 text-sm">{errors.user.afm.message}</p>
                        )}
                    </div>

                    <div>
                        <label>Father's First Name</label>
                        <input
                            {...register("user.fatherName")}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        />
                        {errors.user?.fatherName && (
                            <p className="text-red-500 text-sm">
                                {errors.user.fatherName.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label>Father's LastName</label>
                        <input
                            {...register("user.fatherLastname")}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        />
                        {errors.user?.fatherLastname && (
                            <p className="text-red-500 text-sm">
                                {errors.user.fatherLastname.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label>Mother's FirstName</label>
                        <input
                            {...register("user.motherName")}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        />
                        {errors.user?.motherName && (
                            <p className="text-red-500 text-sm">
                                {errors.user.motherName.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label>Mother's LastName</label>
                        <input
                            {...register("user.motherLastname")}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        />
                        {errors.user?.motherLastname && (
                            <p className="text-red-500 text-sm">
                                {errors.user.motherLastname.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label>Date of Birth</label>
                        <input
                            type="date"
                            {...register("user.dateOfBirth")}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        />
                        {errors.user?.dateOfBirth && (
                            <p className="text-red-500 text-sm">
                                {errors.user.dateOfBirth.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label>Role</label>
                        <select
                            {...register("user.role")}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        >
                            <option value="" disabled >Select role</option>
                            <option value="CUSTOMER">CUSTOMER</option>
                            <option value="ADMIN">ADMIN</option>
                        </select>
                        {errors.user?.role && (
                            <p className="text-red-500 text-sm">{errors.user.role.message}</p>
                        )}
                    </div>
                </div>
            </fieldset>

            {/* Personal Info Fields */}
            <fieldset className="border border-gray-300 p-4 rounded-md space-y-4">
                <legend className="text-lg font-semibold text-gray-700">
                    Personal Information
                </legend>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label>Identity Number</label>
                        <input
                            {...register("personalInfo.identityNumber")}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        />
                        {errors.personalInfo?.identityNumber && (
                            <p className="text-red-500 text-sm">
                                {errors.personalInfo.identityNumber.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label>Place of Birth</label>
                        <input
                            {...register("personalInfo.placeOfBirth")}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        />
                        {errors.personalInfo?.placeOfBirth && (
                            <p className="text-red-500 text-sm">
                                {errors.personalInfo.placeOfBirth.message}
                            </p>
                        )}
                    </div>
                </div>
            </fieldset>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 disabled:opacity-50"
            >
                Save Customer
            </button>
        </form>
    );
};

export default CustomerInsertForm;
