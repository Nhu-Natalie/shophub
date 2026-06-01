// store infor about cart

import { createContext, useState, useContext } from "react"

export const CartContext = createContext(null)

export default function CartProvider({children}){
    // store the products list of the user
    const [cartItems, setCartItems] = useState([]) // {id: 2, quantity: 2}

    // add a item to the cart
    function addToCart(productId){
        // check exisiting cart items whenever i've tried to add a product
        // if already exists only increase quantity
        const existing = cartItems.find((item)=> item.id === productId)
        if (existing){
            const currentQuantity = existing.quantity
            const updatedCartItems = cartItems.map((item)=>
                item.id === productId 
                ? { id: productId, quantity: currentQuantity + 1 }
                : item
            )
            setCartItems(updatedCartItems)
        } else {
            // You can't do this >> You can't alter a state directly because states are not mutable
            // If a state is a NUMBER, you can't just set that state equal to a NUMBER
            // You have to use the FUNCTION the setter to set the value of that
            // The way you do this with arrays meaning the way you add an item to the end of a array that is a state, is by doing the following
            // cartItems.push({id: productId, quantity: 1})

            setCartItems([...cartItems, { id: productId, quantity: 1} ])
        }
    }

    return <CartContext.Provider value={{cartItems, addToCart}}>{children}</CartContext.Provider>
}


export function useCart(){
    const context = useContext(CartContext)
    return context
}