import {Link, useNavigate} from "react-router-dom";
import React, {useState} from "react";
import axios from "axios";

interface Anime {
    name: string;
    rating: number;
    recommendation: string;
    file: File | null;
}

export default function AddAnime() {
   const navigate = useNavigate();
   const [anime, setAnime] = useState<Anime>({
       name: "",
       rating: 0,
       recommendation: "",
       file: null,
   });
   const { name, rating, recommendation, file } = anime;

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

        formData.append("name", name);
        formData.append("rating", rating.toString());
        formData.append("recommendation", recommendation);

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
                            <label htmlFor="name" className="form-label">
                                Title
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Title"
                                name="name"
                                value={name}
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
                                placeholder="Enter rating"
                                name="rating"
                                value={rating}
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
                                placeholder="Enter your recommendation"
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
                                placeholder="Enter your photo"
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