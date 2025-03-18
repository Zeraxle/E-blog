import { useNavigate, useParams } from "react-router-dom";
import { findPostById, updatePost } from "../services/PostService";
import { useEffect, useState } from "react";
import "../assets/css/EditPost.css";

export const EditPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [updatedPostInfo, setUpdatedPostInfo] = useState({
        id: id,
        name: "",
        category: "",
        rating: "",
        description: ""
    });

    const [errors, setErrors] = useState({
        name: true,
        rating: true,
        category: true,
        description: true
    });

    const categories = ["Movie", "TVShow", "Anime"];
    const ratings = [1, 2, 3, 4, 5];

    useEffect(() => {
        findPostById(id)
            .then((res) => {
                setUpdatedPostInfo({
                    id: res.id,
                    name: res.name,
                    category: res.category,
                    rating: res.rating,
                    description: res.description
                });
            })
            .catch((error) => console.log(error));
    }, [id]);

    const updatePostInfo = (e) => {
        const { name, value } = e.target;
        setUpdatedPostInfo((prev) => ({
            ...prev,
            [name]: value
        }));
        validatePost(name, value);
    };

    const validatePost = (name, value) => {
        const validations = {
            name: (v) => (v.length >= 3 && v.length <= 35 ? true : "Name must be between 3-35 characters"),
            rating: (v) => (ratings.includes(Number(v)) ? true : "Invalid Rating"),
            category: (v) => (categories.includes(v) ? true : "Invalid Category"),
            description: (v) => (v.length >= 10 && v.length <= 100 ? true : "Description must be between 10-100 characters")
        };

        setErrors((prev) => ({
            ...prev,
            [name]: validations[name](value)
        }));
    };

    const readyToSubmit = () => {
        return Object.values(errors).every((error) => error === true);
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!readyToSubmit()) {
            alert("Please fill out the form correctly");
            return;
        }

        try {
            await updatePost(updatedPostInfo);
            navigate("/user/profile");
        } catch (error) {
            console.log("Error during update:", error);
        }
    };

    return (
        <form className="post-form" onSubmit={submitHandler}>
            <label className="form-label">
                Name:
                <input
                    type="text"
                    name="name"
                    value={updatedPostInfo.name}
                    onChange={updatePostInfo}
                    required
                    className="form-input"
                />
                {errors.name !== true && <p className="error-text">{errors.name}</p>}
            </label>

            <label className="form-label">
                Rating:
                <select
                    name="rating"
                    value={updatedPostInfo.rating}
                    onChange={updatePostInfo}
                    required
                    className="form-select"
                >
                    <option value="">Select a Rating</option>
                    {ratings.map((rating) => (
                        <option key={rating} value={rating}>
                            {rating}
                        </option>
                    ))}
                </select>
                {errors.rating !== true && <p className="error-text">{errors.rating}</p>}
            </label>

            <label className="form-label">
                Category:
                <select
                    name="category"
                    value={updatedPostInfo.category}
                    onChange={updatePostInfo}
                    required
                    className="form-select"
                >
                    <option value="">Select a Category</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
                {errors.category !== true && <p className="error-text">{errors.category}</p>}
            </label>

            <label className="form-label">
                Description:
                <input
                    type="text"
                    name="description"
                    value={updatedPostInfo.description}
                    onChange={updatePostInfo}
                    required
                    className="form-input"
                />
                {errors.description !== true && <p className="error-text">{errors.description}</p>}
            </label>

            <button type="submit" className="submit-btn">
                Submit
            </button>
        </form>
    );
};
