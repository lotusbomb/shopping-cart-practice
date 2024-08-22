import { createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import { RootState } from "../store";
import validateProduct from "../fakeApi";

 export interface Products {
  title: string;
  price: number;
  id: number;
}

export enum ValidationState {
  Fulfilled = "fulfilled",
  Pending = "pending",
  Rejected = "rejected",
}

interface ProductSliceState {
  validationState?: ValidationState;
  errorMessage?: string;
}

export const addProductAsync = createAsyncThunk(
  "products/addNewProduct",
  async (initialProduct: Products) => {
    const product = await validateProduct(initialProduct);
    return product;
  }
);

const productList: Products[] = [
  {
    title: "Celery",
    price: 500,
    id: 9,
  },
  {
    title: "Fruits",
    price: 700,
    id: 11,
  },
  {
    title: "Cabbages",
    price: 400,
    id: 8,
  },
];

const productAdapter = createEntityAdapter<Products>();
const initialState = productAdapter.getInitialState<ProductSliceState>({
  errorMessage: undefined,
  validationState: undefined,
});

const filledInitialState = productAdapter.upsertMany(
  initialState,
  productList
);

const ProductSlice = createSlice({
  name: "products",
  initialState: filledInitialState,
  reducers: {
    addProduct: (state, action) => {
      // return [action.payload, ...state];
      productAdapter.upsertOne(state, action.payload);
    },
    removedProducts: (state, action) => {
      // return state.filter(product => product.id !== action.payload)
      productAdapter.removeOne(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addProductAsync.fulfilled, (state, action) => {
      productAdapter.upsertOne(state, action.payload);
      state.validationState = ValidationState.Fulfilled;
      state.errorMessage = undefined;
    });
    builder.addCase(addProductAsync.rejected, (state, action) => {
      return {
        ...state,
        validationState: ValidationState.Rejected,
        errorMessage: action.error.message,
      };
    });
    builder.addCase(addProductAsync.pending, (state, action) => ({
      ...state,
      validationState: ValidationState.Pending,
      errorMessage: undefined,
    }));
  },
});

export const {addProduct, removedProducts} = ProductSlice.actions
export const getProducts = (state: RootState) => state.ProductSlice
export const getErrorMessage = (state: RootState) =>
  state.ProductSlice.errorMessage;
export const {
  selectAll: selectAllProducts,
  selectById: selectProductById,
  selectEntities: selectProductEntities,
  selectIds: selectProductByIds,
  selectTotal: selectTotalProducts,
} = productAdapter.getSelectors<RootState>((state) => state.ProductSlice);
export default ProductSlice.reducer;
