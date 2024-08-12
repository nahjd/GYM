import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addWishlist, deleteWishlist, getAllUsers, addBasket } from './../../redux/slices/userSlice';
import { MdOutlineStarPurple500 } from "react-icons/md";
import { FaHeart, FaShoppingBasket } from "react-icons/fa";


import "./Detail.scss";
import { useParams } from 'react-router-dom';

const Detail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const data = useSelector((state) => state.gym.data);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dispatch(getAllUsers())
            .then(() => setLoading(false))
            .catch((error) => {
                console.error('Failed to fetch users', error);
                setLoading(false);
            });
    }, [dispatch]);

    if (loading) {
        return <div className='loading'></div>;
    }

    if (!data) {
        return <div>No data available</div>;
    }

    const detailed = data.filter(item => item._id === id);

    return (
        <>

            <div className="wishlistbody">
                <div className="containerrr" >
                    {detailed.length > 0 && detailed.map((item) => (
                        <div className="content-container" key={item._id} style={{ display: "flex", gap: "20px" }}>
                            <div className="card" onClick={() => handleCardClick(item._id)}>
                                <img className='bir' src={item.image} alt={item.name} />
                                <div className="card-content">
                                    <h5>{item.name}</h5>
                                    <p>{item.price}</p>
                                </div>
                                <div className="card-actions">
                                    <div className="icons">
                                        <div className="rate-fav">
                                            <div className="rate">
                                                <MdOutlineStarPurple500 style={{ fontSize: "21px", color: "#F89D13" }} />
                                                {item.rate}
                                            </div>
                                            <div className="fav">
                                                <FaHeart style={{ fontSize: "17px", color: "red" }} onClick={() => dispatch(addWishlist(item))} />
                                                {item.favourite}
                                            </div>
                                        </div>
                                        <button style={{ color: "black" }} onClick={() => dispatch(addBasket(item))} size="small">
                                            <FaShoppingBasket style={{ color: "blue", fontSize: "25px" }} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="description">
                                <h1>Description </h1>
                                <b> <span>{item.name}   - </span> </b>
                                <p> {item.description} </p>

                            </div>
                        </div>
                    ))}
                </div>
            </div >
        </>
    );
};

export default Detail;
