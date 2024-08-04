import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addWishlist, deleteWishlist, getAllUsers, addBasket } from './../../redux/slices/userSlice';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { MdDelete } from "react-icons/md";
import { useParams } from 'react-router-dom';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { FaShoppingBasket } from "react-icons/fa";
import "./Detail.scss";

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
        <div className="detail">
            <Box sx={{ flexGrow: 1 }}>
                <div className="container" style={{ marginTop: "50px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    {detailed.length > 0 ? (
                        detailed.map((item) => (
                            <Grid item xs={12} sm={12} md={12} lg={12} key={item._id}>
                                <Card sx={{ maxWidth: "100%" }}>
                                    <CardMedia sx={{ height: 340, width: 340 }} image={item.image} title={item.name} />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {item.price}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {item.name}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
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
                                            <Button style={{ color: "black" }} onClick={() => dispatch(addBasket(item))} size="small">
                                                <FaShoppingBasket style={{ color: "blue", fontSize: "25px" }} />
                                            </Button>
                                        </div>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))
                    ) : (
                        <div>No items found</div>
                    )}
                </div>
            </Box>
        </div>
    );
}

export default Detail;
