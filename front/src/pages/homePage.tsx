import React, { useEffect, useState } from "react";
import axios from "axios";
import AnimePost from "../components/animePost.tsx";

interface Anime {
    id: number,
    name: string;
    rating: number;
    recommendation: string;
    imagePath: string;
}

const HomePage: React.FC = () => {
    const [anime, setAnime] = useState<Anime[]>([]);

    useEffect(() => {
        loadAnime();
    }, []);

    const loadAnime = async () => {
        const res = await axios.get<Anime[]>("http://localhost:8080/anime");
        setAnime(res.data);
    };

    return (
        <div className="anime-posts">
            {anime.map((animeItem) => (
                <AnimePost key={animeItem.name} anime={animeItem} />
            ))}
        </div>
    );
};

export default HomePage;
