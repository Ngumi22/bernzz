import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { wishItem, wishState } from "../definitions";

const storedWishItems =
  typeof window !== "undefined" ? localStorage.getItem("wishItems") : null;

const initialState: wishState = {
  wishItems: storedWishItems ? JSON.parse(storedWishItems) : [],

  wishTotalQuantity: 0,
  wishTotalAmount: 0,
};

const wishSlice = createSlice({
  name: "wish",
  initialState,
  reducers: {
    addToWish: (state, action: PayloadAction<wishItem>) => {
      const itemIndex = state.wishItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (itemIndex >= 0) {
        state.wishItems[itemIndex].wishQuantity += 1;
        toast.info(
          `Added another ${state.wishItems[itemIndex].name} to Wishlist`,
          {
            position: "bottom-right",
          }
        );
      } else {
        const newItem = { ...action.payload, wishQuantity: 1 };
        state.wishItems.push(newItem);
        toast.success(
          `Added ${action.payload.name} to your Wishlist successfully`,
          {
            position: "bottom-right",
          }
        );
      }
      localStorage.setItem("wishItems", JSON.stringify(state.wishItems));
    },
    removeFromWish: (state, action: PayloadAction<wishItem>) => {
      //Returns items not equal to action.payload.id
      const nextwishItems = state.wishItems.filter(
        (wishItem) => wishItem.id !== action.payload.id
      );

      state.wishItems = nextwishItems;
      localStorage.setItem("wishItems", JSON.stringify(state.wishItems));
      toast.error(`Removed ${action.payload.name} from wishlist successfully`, {
        position: "bottom-right",
      });
    },
    decreaseWish: (state, action: PayloadAction<wishItem>) => {
      const itemIndex = state.wishItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (state.wishItems[itemIndex].wishQuantity > 1) {
        state.wishItems[itemIndex].wishQuantity -= 1;

        toast.info(`Removed one ${action.payload.name} from wishlist`, {
          position: "bottom-right",
        });
      } else if (state.wishItems[itemIndex].wishQuantity === 1) {
        const nextwishItems = state.wishItems.filter(
          (item) => item.id !== action.payload.id
        );

        state.wishItems = nextwishItems;

        toast.error("Product removed from wishlist", {
          position: "bottom-right",
        });
      }

      localStorage.setItem("wishItems", JSON.stringify(state.wishItems));
    },
    clearWish(state, action) {
      state.wishItems = [];
      localStorage.setItem("wishItems", JSON.stringify(state.wishItems));
      toast.error("Wishlist cleared", { position: "bottom-right" });
    },
    getTotals: (state) => {
      let { total, quantity } = state.wishItems.reduce(
        (wishTotal, wishItem) => {
          const { price, wishQuantity } = wishItem;
          const itemTotal = price * wishQuantity;

          wishTotal.total += itemTotal;
          wishTotal.quantity += wishQuantity;

          return wishTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      total = parseFloat(total.toFixed(2));
      state.wishTotalQuantity = quantity;
      state.wishTotalAmount = total;
    },
  },
});
export const { addToWish, removeFromWish, decreaseWish, clearWish, getTotals } =
  wishSlice.actions;
export default wishSlice.reducer;
