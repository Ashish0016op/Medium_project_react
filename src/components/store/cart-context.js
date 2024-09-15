import { createContext } from "react";

const CartContext = createContext({
  openCart: false,
  cartItem:[],
  setOpenCart: () => {},
  setCartItem:(item)=>{},
});

export default CartContext;
