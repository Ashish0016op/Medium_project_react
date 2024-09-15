

import { useState } from 'react';
import './index.css';
import Home from './components/Home/Home';
import Modal from './components/Modals/Modal';
import CartContext from './components/store/cart-context';
function App() {
  const[openCart,setOpenCart]=useState(false);
  const[cartItem,setCartItem]=useState([]);

  return(
    <CartContext.Provider value={{openCart,setOpenCart,cartItem,setCartItem}}>
      <Home/>
      {openCart && <Modal/>}
    </CartContext.Provider>
  );
}

export default App;
