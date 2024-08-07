import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBasket, addWishlist, getAllUsers } from './../../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { MdOutlineFavorite } from "react-icons/md";
import { GrFavorite } from "react-icons/gr";
import { FaShoppingBasket } from "react-icons/fa";
import "./Menu.scss";

const Menu = () => {
    const basket = useSelector((state) => state.gym.basket);
    const wishlist = useSelector((state) => state.gym.wishlist);
    const data = useSelector((state) => state.gym.data);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    const handleCardClick = (id) => {
        navigate(`/${id}`);
    };

    return (
        <div className="cards">
            {data && data.map((item) => (
                <div className='card' key={item._id} onClick={() => handleCardClick(item._id)}>
                    <img className='bir' src={item.image} alt={item.name} />
                    <div className="card-content">
                        <h5>{item.name}</h5>
                        <p>${item.price}</p>
                    </div>
                    <div className="card-actions">
                        <div className='buttons'>
                            <button onClick={(e) => {
                                e.stopPropagation();
                                dispatch(addWishlist(item));
                            }}>
                                {wishlist.find((elem) => elem._id === item._id) ?
                                    <MdOutlineFavorite style={{ color: "red", fontSize: "25px" }} /> :
                                    <GrFavorite style={{ color: "red", fontSize: "25px" }} />}
                            </button>
                            <button onClick={(e) => {
                                e.stopPropagation();
                                dispatch(addBasket(item));
                            }}>
                                <FaShoppingBasket style={{ color: "blue", fontSize: "25px" }} />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Menu;
