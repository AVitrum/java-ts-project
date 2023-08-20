import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import AnimePost from "../../components/anime-components/AnimePost.tsx";
import { UserContext } from "../../components/UserContext.tsx";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

interface Anime {
    id: number;
    title: string;
    rating: number;
    recommendation: string;
    genres: string;
    link: string;
    imagePath: string;
}

const AnimeList: React.FC = () => {
    const [anime, setAnime] = useState<Anime[]>([]);
    const { token } = useContext(UserContext);
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    useEffect(() => {
        loadAnime();
    }, []);

    const loadAnime = async () => {
        const res = await axios.get<Anime[]>("http://localhost:8080/anime", config);
        const sortedByRatingRes = res.data.sort((a, b) => b.rating - a.rating);
        setAnime(sortedByRatingRes);
    };

    return (
        <Container>
            <br/>
            <Grid container spacing={5}>
                {anime.map((animeItem) => (
                    <Grid item key={animeItem.title} xs={12} sm={5} md={6}>
                        <AnimePost anime={animeItem} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default AnimeList;
