import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addBasket, addWishlist, fetchData } from './../../redux/slices/userSlice'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { MdOutlineFavorite } from "react-icons/md";
import { GrFavorite } from "react-icons/gr";
import { Link } from 'react-router-dom';
import { FaShoppingBasket } from "react-icons/fa";
import "./Menu.scss"
const Menu = () => {
    const basket = useSelector((state) => state.gym.basket)
    const wishlist = useSelector((state) => state.gym.wishlist)
    const data = useSelector((state) => state.gym.data)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchData())
    }, [dispatch])

    // console.log(data);
    console.log(wishlist);
    console.log(basket);
    return (
        <>
            <div className="cards">
                {data && data.map((item) => (
                    <Card sx={{ maxWidth: "100%" }}>
                        <CardMedia
                            sx={{ height: 545, width: 540 }}
                            image={item.image}
                            title="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {item.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {item.price}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button onClick={() => {
                                dispatch(addWishlist(item))
                            }}

                            >
                                {wishlist && wishlist.find((elem) => elem._id == item._id) ? <MdOutlineFavorite style={{ color: "red", fontSize: "25px" }} /> : <GrFavorite style={{ color: "red", fontSize: "25px" }} />}
                            </Button>
                            <Button style={{ color: "black" }} onClick={() => {
                                dispatch(addBasket(item))
                            }} size="small"><FaShoppingBasket style={{ color: "blue", fontSize: "25px" }} /></Button>
                            <Link to={"/" + item._id}>
                                <Button style={{ color: "black" }}>Detail</Button></Link>
                        </CardActions>
                    </Card>
                ))}
            </div>


        </>
    )
}

export default Menu