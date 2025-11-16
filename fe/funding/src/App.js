import { BrowserRouter, Routes, Route } from "react-router-dom";
import FundListPage from "./pages/FundListPage";
import FundDetailPage from "./pages/FundDetailPage";
import Layout from "./components/Layout";

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<FundListPage />} />
                    <Route path="/funds/:fundId" element={<FundDetailPage />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default App;