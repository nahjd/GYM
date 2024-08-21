
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addWishlist, deleteWishlist, getAllUsers, addBasket } from './../../redux/slices/userSlice'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { MdDelete } from "react-icons/md";
import { MdOutlineFavorite } from "react-icons/md";
import { FaShoppingBasket } from "react-icons/fa";
import Footer from '../../Components/Footer/Footer';


import "./Wishlist.scss"
const Wishlist = () => {
    const wishlist = useSelector((state) => state.gym.wishlist)
    const data = useSelector((state) => state.gym.data)
    const basket = useSelector((state) => state.gym.basket)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllUsers())
    }, [dispatch])
    console.log(data);
    console.log(wishlist);
    return (
        <>
            <div className="wishlistbody">
                <div className="cardw">
                    {wishlist && wishlist.map((item, i) => {
                        return (
                            <>
                                <div className='cardd' key={item._id} onClick={() => handleCardClick(item._id)}>
                                    <img className='bir' src={item.image} alt={item.name} />
                                    <div className="card-content">
                                        <h5>{item.name}</h5>
                                        <p>{item.price}$</p>
                                    </div>
                                    <div className="card-actions">
                                        <div className='buttons'>
                                            <button className='prdct-deletew' onClick={(e) => {
                                                e.stopPropagation();
                                                dispatch(deleteWishlist(item));
                                            }}>
                                                <i className='fa fa-trash-alt'></i>
                                            </button>
                                            <button onClick={(e) => {
                                                e.stopPropagation();

                                                dispatch(addBasket(item));
                                            }}>
                                                <FaShoppingBasket style={{ color: "blue", fontSize: "25px", transition: "0.3", width: "25px", height: "30px", borderRadius: "4px" }} />
                                            </button>

                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    })}

                </div>

            </div>
            {/* <Footer /> */}

        </>
    )
}

export default Wishlist