import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "@/layout/MainLayout";
import CustomerListPage from "@/pages/CustomerListPage";
import CustomerInsertFormPage from "@/pages/CustomerInsertFormPage";
import CustomerEditFormPage from "@/pages/CustomerEditFormPage";
import CarInsertFormPage from "@/pages/CarInsertFormPage";
import CarListPage from "@/pages/CarListPage";
import InsurancePolicyInsertFormPage from "@/pages/InsurancePolicyInsertFormPage";
import InsurancePolicyListPage from "@/pages/InsurancePolicyListPage";
import CustomerPoliciesPage from "@/pages/CustomerPoliciesPage";
import {AuthProvider} from "@/context/AuthProvider.tsx";
import LoginFormPage from "@/pages/LoginFormPage.tsx";
function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <MainLayout  />
                        }
                    >
                        <Route path="login" element={<LoginFormPage />} />
                        <Route index element={<CustomerListPage />} />
                        <Route path="add-customer" element={<CustomerInsertFormPage />} />
                        <Route path="customers/edit/:id" element={<CustomerEditFormPage />} />
                        <Route path="add-car" element={<CarInsertFormPage />} />
                        <Route path="cars" element={<CarListPage />} />
                        <Route path="add-insurance-policy" element={<InsurancePolicyInsertFormPage />} />
                        <Route path="policies" element={<InsurancePolicyListPage />} />
                        <Route path="my-policies" element={<CustomerPoliciesPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>

    );
}

export default App;