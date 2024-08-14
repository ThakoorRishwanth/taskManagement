import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './slices/taskSlice'; // Correctly import the default export
import userReducer from './slices/userSlice'; // Correctly import the default export

const store = configureStore({
    reducer: {
        tasks: taskReducer,
        user: userReducer
    },
});

export default store;
