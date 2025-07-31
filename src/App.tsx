import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import CustomerListPage from "./pages/CustomerListPage";
import CustomerInsertFormPage from "./pages/CustomerInsertFormPage";
import CustomerEditFormPage from "./pages/CustomerEditFormPage";
import CarInsertFormPage from "@/pages/CarInsertFormPage.tsx";
import CarListPage from "@/pages/CarListPage.tsx";

function App() {
    return (
        <Router>
            <nav className="bg-blue-600 p-4 text-white flex space-x-4">
                <Link to="/" className="hover:underline">Customers</Link>
                <Link to="/add" className="hover:underline">Add a new Customer</Link>
                <Link to = "/add-car"  className="hover:underline">Add a new Car</Link>
                <Link to = "/cars" className="hover:underline">Cars</Link>
            </nav>

            <main className="p-4">
                <Routes>
                    <Route path="/" element={<CustomerListPage />} />
                    <Route path="/add" element={<CustomerInsertFormPage />} />
                    <Route path="/customers/edit/:id" element={<CustomerEditFormPage />} />
                    <Route path = "/add-car" element={<CarInsertFormPage />} />
                    <Route path = "/cars" element={<CarListPage />} />
                </Routes>
            </main>
        </Router>
    );
}

export default App;
