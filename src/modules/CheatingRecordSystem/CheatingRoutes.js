import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddCheatingRecord from "./pages/AddCheatingRecord";
import ViewRecords from "./pages/ViewRecords";

const CheatingRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddCheatingRecord />} />
            <Route path="/view" element={<ViewRecords />} />
        </Routes>
    );
};

export default CheatingRoutes;