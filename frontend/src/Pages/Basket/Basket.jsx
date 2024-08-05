import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, increaseBasket, decreaseBasket, deleteBasket, addBasket, emptycartIteam } from '../../redux/slices/userSlice';
import toast from 'react-hot-toast';
import { loadStripe } from '@stripe/stripe-js';
import Navbar from '../../Components/Navbar/Navbar';
import "./Basket.scss";

const Basket = () => {
    const basket = useSelector((state) => state.gym.basket);
    const dispatch = useDispatch();

    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     const storedBasket = JSON.parse(localStorage.getItem('basket')) || [];
    //     if (storedBasket.length) {
    //         storedBasket.forEach(item => {
    //             for (let i = 0; i < item.quantity; i++) {
    //                 dispatch(addBasket(item));
    //             }
    //         });
    //     }
    // }, [dispatch]);

    useEffect(() => {
        dispatch(getAllUsers())
            .then(() => setLoading(false))
            .catch((error) => {
                console.error('Failed to fetch users', error);
                setLoading(false);
            });
    }, [dispatch]);

    // useEffect(() => {
    //     localStorage.setItem('basket', JSON.stringify(basket));
    // }, [basket]);

    // Calculate total price
    useEffect(() => {
        if (basket.length) {
            const calculateTotalPrice = () => {
                let total = 0;
                basket.forEach(item => {
                    if (item.price && item.quantity) {
                        total += parseFloat(item.price) * item.quantity;
                    }
                });
                setTotalPrice(total);
            };

            calculateTotalPrice();
        }
    }, [basket]);

    // Calculate total quantity
    useEffect(() => {
        if (basket.length) {
            const calculateTotalQuantity = () => {
                let quantity = 0;
                basket.forEach(item => {
                    if (item.quantity) {
                        quantity += item.quantity;
                    }
                });
                setTotalQuantity(quantity);
            };

            calculateTotalQuantity();
        }
    }, [basket]);

    const emptyCart = () => {
        dispatch(emptycartIteam());
        toast.success("Your Cart is Empty");
    };

    const makePayment = async () => {
        const stripe = await loadStripe("ENTER_YOUR_PUBLISHABLE_KEY");

        const body = { products: basket };
        const headers = { "Content-Type": "application/json" };
        const response = await fetch("https://nemm-1.onrender.com/nem", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body)
        });

        const session = await response.json();
        const result = await stripe.redirectToCheckout({ sessionId: session.id });

        if (result.error) {
            console.error(result.error);
        }
    };

    if (loading) {
        return (
            <div className="loader-container">
                <div className="loader"></div>
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <div className="tables">
                <table className='table cart-table mb-0 table-responsive-sm'>
                    <caption>A basic table example with a caption</caption>
                    <thead>
                        <tr>
                            <th>Action</th>
                            <th>Product</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th className='qty'>Quantity</th>
                            <th className='text-right'><span id="amount" className='amount'>Total Amount</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        {basket && basket.map((item) => (
                            <tr key={item._id}>
                                <td>
                                    <button className='prdct-delete' onClick={() => dispatch(deleteBasket(item))}>
                                        <i className='fa fa-trash-alt'></i>
                                    </button>
                                </td>
                                <td><div className='product-img'><img src={item.image} alt={item.name} /></div></td>
                                <td><div className='product-name'><p>{item.name}</p></div></td>
                                <td>{item.price}</td>
                                <td>
                                    <div className="prdct-qty-container">
                                        <button className='prdct-qty-btn' type='button' onClick={() => item.quantity > 1 ? dispatch(decreaseBasket(item)) : null}>
                                            <i className='fa fa-minus'></i>
                                        </button>
                                        <input type="text" className='qty-input-box' value={item.quantity} disabled />
                                        <button className='prdct-qty-btn' type='button' onClick={() => dispatch(increaseBasket(item))}>
                                            <i className='fa fa-plus'></i>
                                        </button>
                                    </div>
                                </td>
                                <td className='text-right'>${parseFloat(item.price) * item.quantity} </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>&nbsp;</th>
                            <th colSpan={2}>&nbsp;</th>
                            <th>Items In Cart <span className='ml-2 mr-2'>:</span><span className='text-danger'>{totalQuantity}</span></th>
                            <th className='text-right'>Total Price<span className='ml-2 mr-2'>:</span><span className='text-danger'>$ {totalPrice}</span></th>
                            <th className='text-right'><button className='btn btn-success' onClick={makePayment} type='button'>Checkout</button></th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </>
    );
};

export default Basket;
