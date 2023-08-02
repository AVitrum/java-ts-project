import {Routes, Route} from 'react-router-dom';
import Layout from "./components/Layout.tsx";
import HomePage from "./pages/homePage.tsx";
import AddAnime from "./pages/anime/addAnime.tsx";

export default function AppRoutes() {
    return(
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<HomePage/>}/>
                <Route path="/addAnime" element={<AddAnime/>}/>
            </Route>
        </Routes>
    );
}