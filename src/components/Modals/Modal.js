import React, { useContext } from 'react';
import { createPortal } from 'react-dom';
import './Modal.css';
import CartContext from '../store/cart-context';

const Modal = () => {
  const overlay = document.getElementById('overlay');
  const ctx = useContext(CartContext);
  console.log("cart item is",ctx.cartItem);
  const closeCartHandler = () => {
    ctx.setOpenCart(false);
  };
  let totalAmount = 0;
for (let i = 0; i < ctx.cartItem.length; i++) {
  totalAmount += ctx.cartItem[i].candyPrice * ctx.cartItem[i].quantity;
}

const decreaseQuantityHandle=(Item)=>{
  if(Item.quantity===1){
    return ctx.setCartItem((preItems)=>{
     return preItems.filter(cartItem=>cartItem.id!==Item.id);
    })
  }
  ctx.setCartItem((prevItems) => {
    const existingCartItemIndex = prevItems.findIndex(cartItem => cartItem.id === Item.id);
    if (existingCartItemIndex !== -1) {
      const updatedCartItems = [...prevItems];
      updatedCartItems[existingCartItemIndex].quantity -= 1;
      return updatedCartItems;
    }
  });
}
const IncreseQuantityHandle=(Item)=>{
  ctx.setCartItem((prevItems) => {
    const existingCartItemIndex = prevItems.findIndex(cartItem => cartItem.id === Item.id);
    
    if (existingCartItemIndex !== -1) {
      const updatedCartItems = [...prevItems];
      updatedCartItems[existingCartItemIndex].quantity += 1;
      return updatedCartItems;
    }
  });
}
  return createPortal(
    <div className='modal'>
      <div className='modal-content'>
        {ctx.cartItem.length > 0 ? (
          <>
            {ctx.cartItem.map((item, index) => (
              <div key={index}>
              <div className='cart_box'>
              <div className='cart-item'>
                <p className='cart_res_name'>{item.candyName}</p>
                <div className='quantity_price_box'>
                <p className='cart_item_price'>Rs {(item.candyPrice * item.quantity).toFixed(2)}</p>
                  <p className='cart_item_qty'>x {item.quantity}</p>
                </div>
              </div>
              <div className='btn_box'>
                <button onClick={()=>decreaseQuantityHandle(item)}>-</button>
                <button onClick={()=>IncreseQuantityHandle(item)}>+</button>
              </div>
              </div>
              <hr/>
              </div>
            ))}
            <div className='cart_amt_box'>
              <div><p>Total Amount</p></div>
              <div>Rs {totalAmount.toFixed(2)}</div>
            </div>
            <div className='cart_btn_box'>
              <button onClick={closeCartHandler}>Close</button>
              <button>Order</button>
            </div>
          </>
        ) : (
          <>
          <p>Your cart is empty!</p>
          <button className='close_btn' onClick={closeCartHandler}>Close</button>
          </>
        )}
      </div>
    </div>,
    overlay
  );
};

export default Modal;
