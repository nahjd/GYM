import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData, increaseBasket, decreaseBasket, deleteBasket } from '../../redux/slices/userSlice';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { MdDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import "./Basket.scss"
const Basket = () => {
    const basket = useSelector((state) => state.gym.basket);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchData());
    }, [dispatch]);

    console.log(basket);
    return (
        <div className="tables">
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="caption table">
                    <caption>A basic table example with a caption</caption>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">Image</TableCell>
                            <TableCell align="center">Quantity</TableCell>
                            <TableCell align="left">Deleted</TableCell>
                            <TableCell align="left">Total Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {basket && basket.map((item, i) => (
                            <TableRow key={item.id}>
                                <TableCell component="th" scope="row">{i + 1}</TableCell>
                                <TableCell align="right">{item.name}</TableCell>
                                <TableCell align="right">{parseFloat(item.price)}</TableCell>
                                <TableCell align="right">
                                    <img src={item.image} alt={item.name} style={{ height: '50px' }} />
                                </TableCell>
                                <TableCell align="right">
                                    <Box display="flex" alignItems="center" justifyContent="center">
                                        <Button onClick={() => item.quantity > 1 ? dispatch(decreaseBasket(item)) : null} size="small"><FaMinus style={{ color: "black" }} /></Button>
                                        <span style={{ marginLeft: "0 10px" }}>{item.quantity}</span>
                                        <Button onClick={() => dispatch(increaseBasket(item))} size="small"><FaPlus style={{ color: "black" }} /></Button>
                                    </Box>
                                </TableCell>
                                <TableCell align="left">
                                    <Button onClick={() => dispatch(deleteBasket(item))} size="small"> <MdDelete style={{ color: "red", fontSize: "25px" }} /></Button>
                                </TableCell>
                                <TableCell align="left">
                                    {parseFloat(item.price) * item.quantity}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>

    );
}

export default Basket;