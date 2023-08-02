import React from "react";

interface Anime {
    id: number;
    name: string;
    rating: number;
    recommendation: string;
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
                    <img src={anime.imagePath} alt={anime.name} className="img-fluid" />
                </div>
                <div className="col-md-3 d-flex align-items-md-start">
                    <div>
                        <h3>{anime.name}</h3>
                        <p>Rating: {anime.rating}</p>
                        <p>Recommendation: {anime.recommendation}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnimePost;
