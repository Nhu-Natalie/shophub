// store infor about cart

import { createContext, useState, useContext } from "react"
import { getProductById } from "../data/products"

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

    // loop through the cartItems and transform this list of objects into a list with info about each product 
    // that in our cart
    function getCartItemsWithProducts(){
        // return a new cartItems Array includes id, quantity, then only about the product information
        return cartItems.map((item) => (
            {
                ...item,
                product: getProductById(item.id),
            }
        )).filter((item) => item.product)
    }

    // remove the item completely function
    function removeFromCart(productId){
        setCartItems(cartItems.filter((item)=>item.id !== productId))
    }

    function updateQuantity(productId, quantity){
        // remove completely
        if (quantity <=0 ){
            removeFromCart(productId)
            return
        }
        setCartItems(
            // find the product want to change
            cartItems.map((item)=>
                item.id === productId ? {...item, quantity} : item
            )
        )
    }

    // reduce to calculate the price of all the product combined with their quantity
    // loop through each cart item starting with a total amount of zero
    // loop through cart items list and accumulate a value as we move through it.
    function getCartTotal(){
        const total = cartItems.reduce((total, item)=>{
            // getProductByID might return NULL
            const product = getProductById(item.id)
            return total + (product ? product.price * item.quantity : 0)
        }, 0)
        return total
    }

    function clearCart(){
        setCartItems([])
    }

    return <CartContext.Provider value={{
        cartItems, 
        addToCart, 
        getCartItemsWithProducts, 
        removeFromCart, 
        updateQuantity,
        getCartTotal,
        clearCart
    }}>{children}</CartContext.Provider>
}


export function useCart(){
    const context = useContext(CartContext)
    return context
}