'use client'
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { WritableDraft } from "immer"

interface CartItem {
    rating: {
        rate: number,
        count: number
    },
    _id: string,
    id: number,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
    orderedQty: number,
    productQtyPrice: number
}

interface CartState {
    cartItems: CartItem[],
    loading: boolean,
    totalAmount: number
}

const initialState: CartState = {
    cartItems: [],
    loading: false,
    totalAmount: 0
}

const cartSlice = createSlice({
    initialState,
    name: "cart",
    reducers: {
        addItem(state, action: PayloadAction<CartItem>) {
            const newItem = action.payload;
            const existingItem = state.cartItems.find(item => item._id === newItem._id);
            if (!existingItem) {
                state.cartItems.push({
                    ...newItem,
                  
                });
            } else {
                existingItem.orderedQty++;
                existingItem.productQtyPrice += newItem.price;

            }
            calculateTotalPrice(state)

        },

        minusItem(state, action: PayloadAction<CartItem>) {
            const minusedItem = action.payload;

            const existingItem = state.cartItems.find(item => item._id === minusedItem._id);

            if (existingItem) {
                if (existingItem.orderedQty > 1) {
                    existingItem.orderedQty--;
                    existingItem.productQtyPrice -= minusedItem.price;
                } else {
                    state.cartItems = state.cartItems.filter(item => item._id !== minusedItem._id);
                }
            }
            calculateTotalPrice(state)
        },

        deleteItem(state,action:PayloadAction<CartItem>){
            const deletedItem = action.payload;

            const existingItem = state.cartItems.find(item=>item._id===deletedItem._id);

            if(existingItem){
                state.cartItems = state.cartItems.filter(item=>item._id !== deletedItem._id);
            }
            calculateTotalPrice(state)
        },

        setCart(state, action) {
            state.cartItems = action.payload.cartData;
            console.log(state.cartItems)
            calculateTotalPrice(state)
        },

    }
})

const calculateTotalPrice=(state: WritableDraft<CartState>)=>{
    let totalPrice = 0;
    for(let i=0;i<state.cartItems.length;i++){
        totalPrice += state.cartItems[i].productQtyPrice;
    }
    state.totalAmount=parseFloat(totalPrice.toFixed(2));
}

export const { addItem,setCart,minusItem,deleteItem } = cartSlice.actions;
export default cartSlice.reducer;
