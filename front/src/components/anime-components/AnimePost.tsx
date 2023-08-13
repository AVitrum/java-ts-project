import React from "react";
import {Link} from "react-router-dom";

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
    return (
        <div className="anime-post my-3" style={{ height: "400px" }}>
            <div className="row h-100">
                <div className="col-md-2 d-flex align-items-md-start">
                    <img src={anime.imagePath} className="img-fluid"  alt={""}/>
                </div>
                <div className="col-md-4 d-flex align-items-md-start">
                    <div>
                        <h2>{anime.title}</h2>
                        <h5>{anime.genres}</h5>
                        <p/>
                        <h6>Rating: {anime.rating}</h6>
                        <h6>Recommendation: {anime.recommendation}</h6>
                        <Link to={anime.link}> {anime.link}</Link>
                        <p/>
                        <Link to={"/"} className={"btn btn-outline-primary"}>More info</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnimePost;
