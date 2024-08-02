import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData, increaseBasket, decreaseBasket, deleteBasket, addBasket } from '../../redux/slices/userSlice';
import "./Basket.scss";

const Basket = () => {
    const basket = useSelector((state) => state.gym.basket);
    const dispatch = useDispatch();

    useEffect(() => {
        const storedBasket = JSON.parse(localStorage.getItem('basket'));
        if (storedBasket) {
            storedBasket.forEach(item => {
                for (let i = 0; i < item.quantity; i++) {
                    dispatch(addBasket(item));
                }
            });
        }
    }, [dispatch]);



    useEffect(() => {
        dispatch(fetchData());
    }, [dispatch]);


    useEffect(() => {
        localStorage.setItem('basket', JSON.stringify(basket));
    }, [basket]);




    return (
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
                        <th className='text-right'> <span id="amount" className='amount'>Total Amount</span></th>
                    </tr>
                </thead>
                <tbody>
                    {basket && basket.map((item) => (
                        <tr key={item.id}>
                            <td>
                                <button className='prdct-delete'
                                    onClick={() => dispatch(deleteBasket(item))}
                                ><i className='fa fa-trash-alt'></i></button>
                            </td>
                            <td><div className='product-img'><img src={item.image} alt={item.name} /></div></td>
                            <td><div className='product-name'><p>{item.name}</p></div></td>
                            <td>{item.price}</td>
                            <td>
                                <div className="prdct-qty-container">
                                    <button className='prdct-qty-btn' type='button'
                                        onClick={() => item.quantity > 1 ? dispatch(decreaseBasket(item)) : null}
                                    >
                                        <i className='fa fa-minus'></i>
                                    </button>
                                    <input type="text" className='qty-input-box' value={item.quantity} disabled />
                                    <button className='prdct-qty-btn' type='button' onClick={() => dispatch(increaseBasket(item))} >
                                        <i className='fa fa-plus'></i>
                                    </button>
                                </div>
                            </td>
                            <td className='text-right'>$ {parseFloat(item.price) * item.quantity}</td>
                        </tr>
                    ))}
                </tbody>
                {/* <tfoot>
                    <tr>
                        <th>&nbsp;</th>
                        <th colSpan={2}>&nbsp;</th>
                        <th>Items In Cart <span className='ml-2 mr-2'>:</span><span className='text-danger'>{totalquantity}</span></th>
                        <th className='text-right'>Total Price<span className='ml-2 mr-2'>:</span><span className='text-danger'>₹ {totalprice}</span></th>
                        <th className='text-right'><button className='btn btn-success' onClick={makePayment} type='button'>Checkout</button></th>
                    </tr>
                </tfoot> */}
            </table>
        </div>
    );
};

export default Basket;
