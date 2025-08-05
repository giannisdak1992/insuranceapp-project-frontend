import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import CustomerListPage from "./pages/CustomerListPage";
import CustomerInsertFormPage from "./pages/CustomerInsertFormPage";
import CustomerEditFormPage from "./pages/CustomerEditFormPage";
import CarInsertFormPage from "@/pages/CarInsertFormPage.tsx";
import CarListPage from "@/pages/CarListPage.tsx";
import InsurancePolicyInsertFormPage from "@/pages/InsurancePolicyInsertFormPage.tsx";
import InsurancePolicyListPage from "@/pages/InsurancePolicyListPage.tsx";
import CustomerPoliciesPage from "@/pages/CustomerPoliciesPage.tsx";

function App() {
    return (
        <Router>
            <nav className="bg-blue-600 p-4 text-white flex space-x-4">
                <Link to="/" className="hover:underline">Customers</Link>
                <Link to="/add-customer" className="hover:underline">Add a new Customer</Link>
                <Link to = "/add-car"  className="hover:underline">Add a new Car</Link>
                <Link to = "/cars" className="hover:underline">Cars</Link>
                <Link to = "/policies" className="hover:underline">Policies</Link>
                <Link to = "/add-insurance-policy" className="hover:underline">Add an Insurance Policy</Link>
                <Link to = "/my-policies" className="hover:underline">My Policies</Link>

            </nav>

            <main className="p-4">
                <Routes>
                    <Route path="/" element={<CustomerListPage />} />
                    <Route path="/add-customer" element={<CustomerInsertFormPage />} />
                    <Route path="/customers/edit/:id" element={<CustomerEditFormPage />} />
                    <Route path = "/add-car" element={<CarInsertFormPage />} />
                    <Route path = "/cars" element={<CarListPage />} />
                    <Route path = "/add-insurance-policy" element={<InsurancePolicyInsertFormPage/>} />
                    <Route path = "/policies" element={<InsurancePolicyListPage/>} />
                    <Route path = "/my-policies" element={<CustomerPoliciesPage />} />

                </Routes>
            </main>
        </Router>
    );
}

export default App;
