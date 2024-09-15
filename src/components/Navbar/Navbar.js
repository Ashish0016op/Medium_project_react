import React, { useContext} from 'react';
import { FaCartShopping } from "react-icons/fa6";
import './Navbar.css';
import CartContext from '../store/cart-context';
const Navbar = () => {
  const ctx=useContext(CartContext);
  const openCartHandler=()=>{
    ctx.setOpenCart(true);
  }
  return (
    <div>
      <div className='nav_box'>
        <div className='nav_cart_box' onClick={openCartHandler}>
            <div className='cart_icon'><FaCartShopping/></div>
            <p>Your Cart</p>
            <div className='cart_count'>{ctx.cartItem.length}</div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
