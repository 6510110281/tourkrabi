import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import OneDayTrip from "../pages/OneDayTrip";
import Tourreview from "../pages/TourReview";

const AppRoutes = () => {
    return (
        <Routes>
            <Route index element={<Home />} />
            <Route path="onedaytrip" element={<OneDayTrip />} />
            <Route path="onedaytrip/:id" element={<Tourreview />} />
        </Routes>
    );
};

export default AppRoutes;