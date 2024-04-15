import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { CartItem, CartState } from "../definitions";

const storedCartItems =
  typeof window !== "undefined" ? localStorage.getItem("cartItems") : null;

const initialState: CartState = {
  cartItems: storedCartItems ? JSON.parse(storedCartItems) : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
        toast.info(`Added another ${state.cartItems[itemIndex].name} to cart`, {
          position: "bottom-left",
        });
      } else {
        const newItem = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(newItem);
        toast.success(`Added ${action.payload.name} to cart successfully`, {
          position: "bottom-left",
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action: PayloadAction<CartItem>) => {
      //Returns items not equal to action.payload.id
      const nextCartItems = state.cartItems.filter(
        (cartItem) => cartItem.id !== action.payload.id
      );

      state.cartItems = nextCartItems;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      toast.error(`Removed ${action.payload.name} from cart successfully`, {
        position: "bottom-left",
      });
    },
    decreaseCart: (state, action: PayloadAction<CartItem>) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (itemIndex !== -1 && state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems = [
          ...state.cartItems.slice(0, itemIndex),
          {
            ...state.cartItems[itemIndex],
            cartQuantity: state.cartItems[itemIndex].cartQuantity - 1,
          },
          ...state.cartItems.slice(itemIndex + 1),
        ];
      }
    },
    clearCart(state, action) {
      state.cartItems = [];
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      toast.error("Cart cleared", { position: "bottom-left" });
    },
    getTotals: (state) => {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem;
          const itemTotal = price * cartQuantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      total = parseFloat(total.toFixed(2));
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
  },
});

export const { addToCart, removeFromCart, decreaseCart, clearCart, getTotals } =
  cartSlice.actions;
export default cartSlice.reducer;
