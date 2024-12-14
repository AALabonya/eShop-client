// import { RootState } from "@/redux/store";
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";



// export type TProductRedux = {
//   id: string;
//   name: string;
//   price: number;
//   quantity?: number;
//   image: string;
//   inStock: number;
//   vendorId: string;
// };

// type TInitialState = {
//   products: TProductRedux[];
//   quantities: Record<string, number>;
//   subtotal: number;
// };

// // quantities Object will be like this: { _id: quantity }
// const initialState: TInitialState = {
//   products: [],
//   quantities: {},
//   subtotal: 0,
// };

// const productSlice = createSlice({
//   name: "product",
//   initialState,
//   reducers: {
//     addProduct: (state, action: PayloadAction<TProductRedux>) => {
//       state.products.push({ ...action.payload });
//       state.quantities = state.products.reduce(
//         (acc, product) => {
//           acc[product.id] = product.quantity || 1;
//           return acc;
//         },
//         {} as Record<string, number>
//       );
//       state.subtotal = state.products.reduce((acc, product) => {
//         return acc + product.price * (product.quantity || 1);
//       }, 0);
//     },
//     removeProduct: (state, action: PayloadAction<string>) => {
//       state.products = state.products.filter(
//         (item) => item.id !== action.payload
//       );
//       delete state.quantities[action.payload];
//       state.subtotal = state.products.reduce((acc, product) => {
//         return acc + product.price * (product.quantity || 1);
//       }, 0);
//     },
//     updateQuantity: (
//       state,
//       action: PayloadAction<{ id: string; quantity: number }>
//     ) => {
//       const { id, quantity } = action.payload;
//       state.quantities[id] = quantity;
//       const product = state.products.find((p) => p.id === id);
//       if (product) {
//         product.quantity = quantity;
//         state.subtotal = state.products.reduce((acc, product) => {
//           return acc + product.price * (product.quantity || 1);
//         }, 0);
//       }
//     },
//     clearCart: (state) => {
//       state.products = [];
//       state.quantities = {};
//       state.subtotal = 0;
//     },
//   },
// });

// export const { addProduct, removeProduct, updateQuantity, clearCart } =
//   productSlice.actions;

// export const totalProductsCount = (state: RootState) =>
//   state.products.products.length;

// export default productSlice.reducer;
import { RootState } from "@/redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TProductRedux = {
  id: string;
  name: string;
  price: number;
  quantity?: number; // Defaults to 1 when added
  image: string;
  inStock: number; // Represents stock available
  vendorId: string;
};

type TInitialState = {
  products: TProductRedux[];
  quantities: Record<string, number>; // Maps product ID to quantity
  subtotal: number;
};

const initialState: TInitialState = {
  products: [],
  quantities: {},
  subtotal: 0,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    // Add Product Logic
    addProduct: (state, action: PayloadAction<TProductRedux>) => {
      const product = action.payload;

      // Check if product already exists in the cart
      const existingProduct = state.products.find((p) => p.id === product.id);

      if (existingProduct) {
        // If it exists, increment the quantity (ensure stock limit is respected)
        const currentQuantity = state.quantities[product.id];
        if (currentQuantity < product.inStock) {
          state.quantities[product.id] = currentQuantity + 1;
        }
      } else {
        // If not, add the product to the cart with default quantity of 1
        state.products.push({ ...product, quantity: 1 });
        state.quantities[product.id] = 1;
      }

      // Recalculate subtotal
      state.subtotal = state.products.reduce(
        (acc, prod) => acc + prod.price * (state.quantities[prod.id] || 1),
        0
      );
    },

    // Remove Product Logic
    removeProduct: (state, action: PayloadAction<string>) => {
      const productId = action.payload;

      // Remove product and its quantity
      state.products = state.products.filter((item) => item.id !== productId);
      delete state.quantities[productId];

      // Recalculate subtotal
      state.subtotal = state.products.reduce(
        (acc, prod) => acc + prod.price * (state.quantities[prod.id] || 1),
        0
      );
    },

    // Update Quantity Logic
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;

      if (quantity > 0) {
        // Ensure quantity doesn't exceed stock
        const product = state.products.find((p) => p.id === id);
        if (product && quantity <= product.inStock) {
          state.quantities[id] = quantity;
          product.quantity = quantity;

          // Recalculate subtotal
          state.subtotal = state.products.reduce(
            (acc, prod) => acc + prod.price * (state.quantities[prod.id] || 1),
            0
          );
        }
      }
    },

    // Clear Cart Logic
    clearCart: (state) => {
      state.products = [];
      state.quantities = {};
      state.subtotal = 0;
    },
  },
});

export const { addProduct, removeProduct, updateQuantity, clearCart } =
  productSlice.actions;

// Selector: Total Number of Products in Cart
export const totalProductsCount = (state: RootState) =>
  state.products.products.reduce((count, product) => count + (state.products.quantities[product.id] || 0), 0);

export default productSlice.reducer;
