import {Routes, Route} from 'react-router-dom';
import Layout from "./components/Layout.tsx";
import AnimeList from "./pages/anime/AnimeList.tsx";
import AddAnime from "./pages/anime/AddAnime.tsx";
import {UserContextProvider} from "./components/UserContext.tsx";
import Dashboard from "./components/DashBoard.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import Login from "./pages/LoginPage.tsx";
import HomePage from "./pages/HomePage.tsx";

export default function AppRoutes() {
    return(
        <UserContextProvider>
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<HomePage/>}/>
                <Route path="/animeList" element={<AnimeList/>}/>
                <Route path="/addAnime" element={<AddAnime/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
            </Route>
        </Routes>
        </UserContextProvider>
    );
}