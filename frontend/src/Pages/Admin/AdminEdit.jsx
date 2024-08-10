// EditUser.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getUserById, editProfile } from "../../redux/slices/userSlice";

export default function EditUser() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.gym);
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        image: "",
        email: "",
        password: "",
        username: "",
        description: "",
        favourite: "",
        rate: "",
    });

    useEffect(() => {
        dispatch(getUserById(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || "",
                price: user.price || "",
                image: user.image || "",
                email: user.email || "",
                password: user.password || "",
                username: user.username || "",
                description: user.description || "",
                favourite: user.favourite || "",
                rate: user.rate || "",
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(editProfile({ id, ...formData }))
            .unwrap()
            .then(() => {
                navigate("/admin/admin");
            })
            .catch((error) => {
                console.error("Error updating user:", error);
            });
    };

    return (
        <div>
            <h2>Edit User</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
                <input type="text" name="price" value={formData.price} onChange={handleChange} placeholder="Price" />
                <input type="text" name="image" value={formData.image} onChange={handleChange} placeholder="Image URL" />
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
                <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
                <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" />
                <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
                <input type="text" name="favourite" value={formData.favourite} onChange={handleChange} placeholder="Favourite" />
                <input type="text" name="rate" value={formData.rate} onChange={handleChange} placeholder="Rate" />
                <button type="submit">Update User</button>
            </form>
        </div>
    );
}
