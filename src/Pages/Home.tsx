// import axios from "axios";
// import { useEffect, useState } from "react";
import HomeBook from "../components/HomeBook";
import { IBook } from "../types/globalTypes";
import { useGetHomeBooksQuery } from "../redux/features/book/bookApi";


const Home = () => {
    const { data, isLoading, error } = useGetHomeBooksQuery();
    // console.log(data?.data);
    console.log(isLoading);
    console.log(error);

    const bookData = data?.data;

    return (
        <div className="container grid grid-cols-3 gap-10 mt-20">
            {isLoading ? (
                <p className="text-center">Loading....</p>
            ) : error ? (
                <p className="text-center">Something went wrong</p>

            ) : bookData && bookData.length > 0 ? (
                bookData.map((book: IBook) => (<HomeBook key={book._id} book={book} />))
            ) : (
                <p className="text-center">Loading...</p>
            )}
        </div>
    );
};

export default Home;