import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import CustomerListPage from "./pages/CustomerListPage";
import CustomerInsertFormPage from "./pages/CustomerInsertFormPage";

function App() {
    return (
        <Router>
            <nav className="bg-blue-600 p-4 text-white flex space-x-4">
                <Link to="/" className="hover:underline">Customers</Link>
                <Link to="/add" className="hover:underline">Add a new Customer</Link>
            </nav>

            <main className="p-4">
                <Routes>
                    <Route path="/" element={<CustomerListPage />} />
                    <Route path="/add" element={<CustomerInsertFormPage />} />
                </Routes>
            </main>
        </Router>
    );
}

export default App;
