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

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <MainLayout  />
                    }
                >
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
    );
}

export default App;
