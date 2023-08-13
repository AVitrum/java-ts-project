import React, {useContext} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {UserContext} from "../UserContext.tsx";

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
                Authorization: `Bearer ${token}`
            }
        });
        window.location.reload();
    };
    return (
        <div className="anime-post my-3 border rounded p-3">
            <div className="row">
                <div className="col-md-3">
                    <img src={anime.imagePath} className="img-fluid" alt={""} />
                </div>
                <div className="col-md-9">
                    <div>
                        <h2>{anime.title}</h2>
                        <h5>{anime.genres}</h5>
                        <p />
                        <h6>Rating: {anime.rating}</h6>
                        <h6>Recommendation: {anime.recommendation}</h6>
                        <Link to={anime.link}> {anime.link}</Link>
                        <p />
                        <button onClick={deleteAnime} className={"btn btn-outline-danger"}>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnimePost;
