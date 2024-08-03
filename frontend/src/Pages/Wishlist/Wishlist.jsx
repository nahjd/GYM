
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
            <div className="cards">
                {wishlist && wishlist.map((item, i) => {
                    return (
                        <>
                            <Card
                                key={item.id}
                                sx={{ maxWidth: "100%" }}>

                                <CardMedia
                                    sx={{ height: 340, width: 340 }}
                                    image={item.image}
                                    title="green iguana"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {item.price}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {item.name}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        onClick={() => {
                                            dispatch(deleteWishlist(item))
                                        }}
                                        size="small"><MdDelete style={{ color: "red", fontSize: "25px" }} />
                                    </Button>
                                    <Button style={{ color: "black" }} onClick={() => {
                                        dispatch(addBasket(item))
                                    }} size="small">Basket</Button>

                                </CardActions>
                            </Card>
                        </>
                    )
                })}

            </div>

        </>
    )
}

export default Wishlist