import { createSlice, current } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

export const getAllUsers = createAsyncThunk("data/getAllUsers", async () => {
  const response = await axios.get(`https://nemm-1.onrender.com/nem`);
  return response.data;
});

export const getUserById = createAsyncThunk("users/getUserById", async (id) => {
  const response = await axios.get(`https://nemm-1.onrender.com/nem/${id}`);
  return response.data;
});

// export const updateUser = createAsyncThunk(
//   "users/updateUser",
//   async ({ id, ...data }, { rejectWithValue }) => {
//     try {
//       const response = await axios.put(
//         `https://nemm-1.onrender.com/nem/${id}`,
//         data
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// export const getLoginUser = createAsyncThunk("getLogin", async () => {
//   const response = await axios.get("https://nemm-1.onrender.com/nem" + _id);
//   return response.data;
// });

export const addUser = createAsyncThunk("data/addUser", async (newItem) => {
  try {
    const response = await axios.post(
      `https://nemm-1.onrender.com/nem/`,
      newItem
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to add");
  }
});
console.log("salam");

export const deleteUsers = createAsyncThunk("news/deleteUsers", async (id) => {
  try {
    await axios.delete(`https://nemm-1.onrender.com/nem/${id}`);
    const response = await axios.get("https://nemm-1.onrender.com/nem/");
    console.log(response.data);
    const updatedUsers = response.data.filter((item) => item.id !== id);
    return updatedUsers;
  } catch (error) {
    throw new Error("Failed to delete");
  }
});

export const fetchDelete = createAsyncThunk("data/fetchDelete", async (id) => {
  const response = await axios.delete(`https://nemm-1.onrender.com/nem` + id);
  return response.data;
});

export const fetchPost = createAsyncThunk("data/fetchPost", async (item) => {
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

export const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    basket: [],
    wishlist: [],
    status: null,
    error: null,
  },
  reducers: {
    addWishlist: (state, action) => {
      let found = state.wishlist.find((item) => item._id == action.payload._id);
      if (found) {
        state.wishlist = current(state.wishlist).filter(
          (item) => item._id != action.payload._id
        );
      } else {
        state.wishlist = [...current(state.wishlist), action.payload];
      }
    },

    deleteWishlist: (state, action) => {
      state.wishlist = current(state.wishlist).filter(
        (item) => item._id != action.payload._id
      );
    },

    addBasket: (state, action) => {
      let foundIndex = state.basket.findIndex(
        (item) => item._id == action.payload._id
      );
      if (foundIndex !== -1) {
        state.basket = current(state.basket).map((item, index) =>
          index === foundIndex ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        state.basket = [
          ...current(state.basket),
          { ...action.payload, quantity: 1 },
        ];
      }
      saveBasketToLocalStorage(state.basket);
      console.log(state.basket);
    },

    increaseBasket: (state, action) => {
      let findIndex = state.basket.findIndex(
        (item) => item._id == action.payload._id
      );
      state.basket = current(state.basket).map((item, index) =>
        index === findIndex ? { ...item, quantity: item.quantity + 1 } : item
      );
      saveBasketToLocalStorage(state.basket);
    },

    decreaseBasket: (state, action) => {
      let findIndex = state.basket.findIndex(
        (item) => item._id == action.payload._id
      );
      state.basket = current(state.basket).map((item, index) =>
        index === findIndex ? { ...item, quantity: item.quantity - 1 } : item
      );
      saveBasketToLocalStorage(state.basket);
    },

    deleteBasket: (state, action) => {
      state.basket = state.basket.filter(
        (item) => item._id != action.payload._id
      );

      saveBasketToLocalStorage(state.basket);
    },
    emptycartIteam: (state, action) => {
      state.carts = [];
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
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    builder
      .addCase(fetchDelete.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDelete.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = state.data.filter(
          (item) => item._id !== action.payload._id
        );
      })
      .addCase(fetchDelete.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    builder
      .addCase(fetchPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = [...state.data, action.payload];
      })
      .addCase(fetchPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    // builder
    //   .addCase(updateUser.pending, (state) => {
    //     state.loading = true;
    //   })
    //   .addCase(updateUser.fulfilled, (state, action) => {
    //     state.loading = false;
    //     const updatedUser = action.payload;
    //     const index = state.users.findIndex(
    //       (user) => user._id === updatedUser._id
    //     );
    //     if (index !== -1) {
    //       state.users[index] = updatedUser; // Kullanıcıyı güncelle
    //     }
    //     state.selectedUser = updatedUser; // Seçilen kullanıcıyı güncelle (isteğe bağlı)
    //   })
    //   .addCase(updateUser.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload;
    //   });
  },
});

export const {
  addWishlist,
  deleteWishlist,
  addBasket,
  decreaseBasket,
  increaseBasket,
  deleteBasket,
  emptycartIteam,
} = userSlice.actions;

export default userSlice.reducer;
