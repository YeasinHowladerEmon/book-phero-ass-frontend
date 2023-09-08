import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IBook } from "../../../types/globalTypes";
import swal from 'sweetalert';

interface IWishlist {
    books: IBook[];
}

const initialState: IWishlist = {
    books: []
}


const wishListSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        bookAdded: (state, action: PayloadAction<IBook>) => {
            const bookToAdd = action.payload;
            const isBookInWishlist = state.books.some((book) => book._id === bookToAdd._id)

            if (!isBookInWishlist) {
                state.books.push({ ...action.payload, status: 'Wishlist' })
            } else {
                swal(`Oh! This book is already added to wishlist`, {
                    icon: 'warning',
                })
            }

        },
        bookRemoved: (state, action: PayloadAction<IBook>) => {
            state.books = state.books.filter((book) => book._id !== action.payload._id)
        },
        markAsList: (state, action: PayloadAction<{bookId:string | number, status: string}>) => {
            const {bookId, status} = action.payload
            const book = state.books.find((b) => b._id === bookId)
            if (book) {
                book.status = status;
            }
        },
    }
})

export const {
    bookAdded,
    bookRemoved,
    markAsList
} = wishListSlice.actions;
export default wishListSlice.reducer;