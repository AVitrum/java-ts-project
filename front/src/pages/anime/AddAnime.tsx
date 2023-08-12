import {Link, useNavigate} from "react-router-dom";
import React, {useState} from "react";
import axios from "axios";

interface Anime {
    title: string;
    rating: number;
    recommendation: string;
    genres: string;
    link: string;
    file: File | null;
}

export default function AddAnime() {
   const navigate = useNavigate();
   const [anime, setAnime] = useState<Anime>({
       title: "",
       rating: 0,
       recommendation: "",
       genres: "",
       link: "",
       file: null,
   });
   const { title, rating, recommendation, genres, link, file } = anime;

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAnime({ ...anime, [e.target.name]: e.target.value });
    };
    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] || null;
        setAnime({ ...anime, file: selectedFile });
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("title", title);
        formData.append("rating", rating.toString());
        formData.append("recommendation", recommendation);
        formData.append("genres", genres);
        formData.append("link", link);

        if (file) {
            formData.append("image", file);
        }
        await axios.post("http://localhost:8080/anime", formData);
        navigate("/");
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Add Anime to DB</h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">
                                Title
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Title"
                                name="title"
                                value={title}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Rating" className="form-label">
                                Rating
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                name="rating"
                                value={rating}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Genres" className="form-label">
                                Genres
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Genres"
                                name="genres"
                                value={genres}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Link" className="form-label">
                                Link
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Link"
                                name="link"
                                value={link}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="recommendation" className="form-label">
                                Recommendation
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Recommendation"
                                name="recommendation"
                                value={recommendation}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="file" className="form-label">
                                Photo
                            </label>
                            <input
                                type="file"
                                className="form-control"
                                name="file"
                                onChange={onFileChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-outline-primary">
                            Create
                        </button>
                        <Link to={'/'} className="btn btn-outline-danger mx-2">
                            Cancel
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}