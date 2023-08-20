import React, { useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext.tsx";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

interface Anime {
    id: number;
    title: string;
    rating: number;
    recommendation: string;
    genres: string;
    link: string;
    imagePath: string;
}

interface AnimePostProps {
    anime: Anime;
}

const AnimePost: React.FC<AnimePostProps> = ({ anime }) => {
    const { token } = useContext(UserContext);
    const deleteAnime = async () => {
        await axios.delete(`http://localhost:8080/anime/${anime.title}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        window.location.reload();
    };

    return (
        <Card variant="outlined">
            <div className="row">
                <div className="col-md-3">
                    <img
                        src={anime.imagePath}
                        className="img-fluid"
                        alt={""}
                        style={{ width: "100%", height: "100%", maxHeight: "200px" }}
                    />
                </div>
                <div className="col-md-9">
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            {anime.title}
                        </Typography>
                        <Typography variant="subtitle1">{anime.genres}</Typography>
                        <Typography variant="body1">
                            <strong>Rating:</strong> {anime.rating}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Recommendation:</strong> {anime.recommendation}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Link:</strong>{" "}
                            <Link to={anime.link}>Link</Link>
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button
                            onClick={deleteAnime}
                            variant="outlined"
                            color="secondary"
                        >
                            Delete
                        </Button>
                    </CardActions>
                </div>
            </div>
        </Card>
    );
};

export default AnimePost;
