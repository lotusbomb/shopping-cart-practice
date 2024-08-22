import { Products } from '../ProductList/ProductSlice'
import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

interface CartProduct extends Products {
    amount: number
}

const CartSlice = createSlice({
  name: 'cart',
  initialState: [] as CartProduct[],
  reducers: {
    addToCart: (state, action) => {
        const productIndex = state.findIndex(product => product.id === action.payload.id)
        if(productIndex !== -1){
            state[productIndex].amount += 1
        } else{
            state.push({...action.payload, amount: 1})
        }
    },
    removeFromCart: (state, action) => {
        const productIndex = state.findIndex((product) => product.id === action.payload);
        if(state[productIndex].amount > 1){
            state[productIndex].amount -= 1
        }else {
            return state.filter(product => product.id !== action.payload)
        }
    }
  }
})

export const getCartProducts = (state: RootState) => state.CartSlice
export const getTotalPrice = (state : RootState) => state.CartSlice.reduce((accumulator, next) => accumulator += (next.amount * next.price), 0)
export const {addToCart, removeFromCart} = CartSlice.actions
export default CartSlice.reducer;