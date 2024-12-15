
import { RootState } from "@/redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TProductRedux = {
  id: string;
  name: string;
  price: number;
  quantity?: number; 
  image: string;
  inStock: number; 
  vendorId: string;
};

type TInitialState = {
  products: TProductRedux[];
  quantities: Record<string, number>; 
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

 
      const existingProduct = state.products.find((p) => p.id === product.id);

      if (existingProduct) {
 
        const currentQuantity = state.quantities[product.id];
        if (currentQuantity < product.inStock) {
          state.quantities[product.id] = currentQuantity + 1;
        }
      } else {
      
        state.products.push({ ...product, quantity: 1 });
        state.quantities[product.id] = 1;
      }

 
      state.subtotal = state.products.reduce(
        (acc, prod) => acc + prod.price * (state.quantities[prod.id] || 1),
        0
      );
    },

   
    removeProduct: (state, action: PayloadAction<string>) => {
      const productId = action.payload;

  
      state.products = state.products.filter((item) => item.id !== productId);
      delete state.quantities[productId];

    
      state.subtotal = state.products.reduce(
        (acc, prod) => acc + prod.price * (state.quantities[prod.id] || 1),
        0
      );
    },

    
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;

      if (quantity > 0) {
    
        const product = state.products.find((p) => p.id === id);
        if (product && quantity <= product.inStock) {
          state.quantities[id] = quantity;
          product.quantity = quantity;

      
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
