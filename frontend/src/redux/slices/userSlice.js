import { createSlice, current, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllUsers = createAsyncThunk("getAllUsers", async () => {
  const response = await axios.get(`https://nemm-1.onrender.com/nem`);
  // console.log("API RESPONSE", response.data);
  return response.data;
});

export const getLoginUser = createAsyncThunk("getLogin", async (_id) => {
  const response = await axios.get(`https://nemm-1.onrender.com/nem/${_id}`);
  return response.data;
});

export const getUserById = createAsyncThunk("getUserById", async (id) => {
  const response = await axios.get(`https://nemm-1.onrender.com/nem/${id}`);
  return response.data;
});

export const addUser = createAsyncThunk("addUser", async (newItem) => {
  try {
    const response = await axios.post(
      `https://nemm-1.onrender.com/nem`,
      newItem
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to add");
  }
});

export const deleteUsers = createAsyncThunk("deleteUsers", async (id) => {
  try {
    await axios.delete(`https://nemm-1.onrender.com/nem/${id}`);
    const response = await axios.get(`https://nemm-1.onrender.com/nem`);
    console.log("Updated Data After Delete:", response.data);
    return response.data;
  } catch (error) {
    throw new Error("Failed to delete");
  }
});

export const postUser = createAsyncThunk("postUser", async (item) => {
  const response = await axios.post(`https://nemm-1.onrender.com/nem`, item);
  return response.data;
});

const saveBasketToLocalStorage = (basket) => {
  localStorage.setItem("basket", JSON.stringify(basket));
};

const loadBasketFromLocalStorage = () => {
  const basket = localStorage.getItem("basket");
  return basket ? JSON.parse(basket) : [];
};

const userSlice = createSlice({
  name: "gym",
  initialState: {
    basket: [],
    wishlist: [],
    data: [],
    status: "idle",
    error: null,
    login: null,
  },
  reducers: {
    editProfile: (state, action) => {
      const user = { ...action.payload };
      console.log("action", user);

      axios.patch(`https://nemm-1.onrender.com/nem${user._id}`, {
        lastName: user.lastName,
        firstName: user.firstName,
        username: user.username,
        email: user.email,
        image: user.image,
        price: user.price,
        rate: user.rate,
        description: user.description,
      });
      const array = state.users.map((elem) => {
        if (elem._id == user._id) {
          return user;
        } else {
          return elem;
        }
      });
      state.users = array;
    },
    addWishlist: (state, action) => {
      const found = state.wishlist.find(
        (item) => item._id === action.payload._id
      );
      if (found) {
        state.wishlist = state.wishlist.filter(
          (item) => item._id !== action.payload._id
        );
      } else {
        state.wishlist.push(action.payload);
      }
    },
    deleteWishlist: (state, action) => {
      state.wishlist = state.wishlist.filter(
        (item) => item._id !== action.payload._id
      );
    },
    addBasket: (state, action) => {
      // Mevcut ürünü bul
      const foundIndex = state.basket.findIndex(
        (item) => item._id === action.payload._id
      );

      // Ürün zaten var mı kontrol et
      if (foundIndex !== -1) {
        // Ürün varsa, miktarı artır
        state.basket[foundIndex].quantity += 1;
      } else {
        // Ürün yoksa, sepete ekle
        state.basket.push({ ...action.payload, quantity: 1 });
      }

      // Sepeti localStorage'a kaydet
      // saveBasketToLocalStorage(state.basket);
    },
    increaseBasket: (state, action) => {
      const item = state.basket.find((item) => item._id === action.payload._id);
      if (item) item.quantity += 1;
      saveBasketToLocalStorage(state.basket);
    },
    decreaseBasket: (state, action) => {
      const item = state.basket.find((item) => item._id === action.payload._id);
      if (item && item.quantity > 1) item.quantity -= 1;
      saveBasketToLocalStorage(state.basket);
    },
    deleteBasket: (state, action) => {
      state.basket = state.basket.filter(
        (item) => item._id !== action.payload._id
      );
      saveBasketToLocalStorage(state.basket);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        console.log("Data Set", action.payload);
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        console.error("Error", action.error.message);
      });

    builder
      .addCase(deleteUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(deleteUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    builder
      .addCase(postUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data.push(action.payload);
      })
      .addCase(postUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    builder.addCase(getLoginUser.fulfilled, (state, action) => {
      state.login = action.payload;
    });
  },
});

export const {
  addWishlist,
  deleteWishlist,
  addBasket,
  increaseBasket,
  decreaseBasket,
  deleteBasket,
  editProfile,
} = userSlice.actions;

export default userSlice.reducer;
