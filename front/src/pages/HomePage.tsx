import React, { useEffect, useState } from "react";
import axios from "axios";
import AnimePost from "../components/anime-components/AnimePost.tsx";

interface Anime {
    id: number,
    title: string;
    rating: number;
    recommendation: string;
    genres: string;
    link: string;
    imagePath: string;
}

const HomePage: React.FC = () => {
    const [anime, setAnime] = useState<Anime[]>([]);

    useEffect(() => {
        loadAnime();
    }, []);

    const loadAnime = async () => {
        const res = await axios.get<Anime[]>("http://localhost:8080/anime");
        const sortedByRatingRes = res.data.sort((a, b) => b.rating - a.rating);
        setAnime(sortedByRatingRes);
    };

    return (
        <div className="anime-posts">
            {anime.map((animeItem) => (
                <AnimePost key={animeItem.title} anime={animeItem} />
            ))}
        </div>
    );
};

export default HomePage;
