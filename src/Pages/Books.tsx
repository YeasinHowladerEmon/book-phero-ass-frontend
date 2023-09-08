import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../components/ui/select";
import axios from 'axios'
import { useEffect, useState } from 'react';
import { IBook } from "../types/globalTypes";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useGetAllBooksQuery, useGetFilterBooksQuery, useGetSearchBooksQuery } from "../redux/features/book/bookApi";
import HomeBook from "../components/HomeBook";
import toast, { Toaster } from 'react-hot-toast';



type Input = {
    searchValue: string
}

const Books = () => {
    const { register, handleSubmit } = useForm<Input>();
    const [dataF, setDataF] = useState([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedGenre, setSelectedGenre] = useState<string>('');
    const [selectedPublicationYear, setSelectedPublicationYear] = useState<string>('');



    const uniqueGenres = Array.from(new Set(dataF?.map((book: IBook) => book.genre)))
    const uniquePublicationYear = Array.from(new Set(dataF?.map((book: IBook) => book.publicationDate)))



    //search & filter operation with all books

    const { data: allBooksData, isLoading: allBooksLoading, isError: allBooksError, refetch } = useGetAllBooksQuery()

    const { data: searchBooksData, isLoading: searchBooksLoading, isError: searchBooksError } = useGetSearchBooksQuery(searchTerm, {
        skip: searchTerm.trim() === "",
    })
    const { data: filterBooksData, isLoading: filterBooksLoading, isError: filterBooksError } = useGetFilterBooksQuery({
        genre: selectedGenre,
        publicationDate: selectedPublicationYear
    }, {
        skip: selectedGenre.trim() === "" && selectedPublicationYear.trim() === "", // Skip the query when both 'selectedGenre' and 'selectedPublicationDate' are empty strings
    })


    const bookData = filterBooksData?.data ? filterBooksData?.data : searchBooksData ? searchBooksData?.data : allBooksData?.data;
    const isLoadings = filterBooksLoading ? filterBooksLoading : searchBooksLoading ? searchBooksLoading : allBooksLoading;
    const isErrors = filterBooksError ? filterBooksError : searchBooksError ? searchBooksError : allBooksError;

// console.log(isLoading);

    if (isErrors) {
        toast.error("Something went wrong")
    }
    if (!isLoadings) {
        toast.success('successful');
    }

    console.log(bookData);
    // console.log(bookData)
    const onSubmit: SubmitHandler<Input> = data => {
        if (data.searchValue.trim() !== '') {
            setSearchTerm(data.searchValue.trim());
        } else {
            console.log("Please enter a search query.");
        }

    };


    // get data some experiment
    useEffect(() => {

        axios.get('https://book-server-cyan.vercel.app/api/v1/books/all-books')
            .then((response) => {
                // Handle the response data
                setDataF(response.data.data);
                console.log('data', response.data.data)
            })
            .catch((error) => {
                // Handle any errors that occurred during the request
                console.error('Error fetching books:', error);
            });
        refetch() // refetch the data from redux toolkit
    }, [refetch])
    return (
        <div className="grid grid-cols-12 max-w-7xl mx-auto relative ">
            <div className="col-span-3 z mr-10 space-y-5 border rounded-2xl border-gray-200/80 p-5 self-start sticky top-16 h-[calc(100vh-80px)]">
                <div className="space-y-3 ">
                    <h1 className="text-xl ">Filter Publication Year and Genre</h1>
                    <div className="max-w-xl">
                        <Select onValueChange={(e) => setSelectedGenre(e)}>
                            <SelectTrigger className="w-[250px]">
                                <SelectValue placeholder="Select a fruit" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Genre</SelectLabel>
                                    {
                                        uniqueGenres.map((genre) => (
                                            <SelectItem key={genre} value={genre}>
                                                {genre}
                                            </SelectItem>
                                        ))
                                    }
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="max-w-xl">
                        <Select onValueChange={(e) => { setSelectedPublicationYear(e) }}>
                            <SelectTrigger className="w-[250px]">
                                <SelectValue placeholder="Select a fruit" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Publication Year</SelectLabel>
                                    {
                                        uniquePublicationYear.map((year) => (
                                            <SelectItem value={year}>{year}</SelectItem>
                                        ))
                                    }
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
            <div className="col-span-9 grid grid-cols-3 gap-10 mt-5">
                <div className="col-span-12">
                    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
                        <Input placeholder="Search for title, author, genre" required {...register("searchValue")} />
                        <Button type="submit">Submit</Button>
                    </form>
                </div>
                <div className="col-span-9 grid grid-cols-2 gap-10">
                    {isLoadings ?
                       <Toaster
                       position="top-center"
                       reverseOrder={false}
                   />
                        : isErrors ? (
                            <Toaster
                                position="top-center"
                                reverseOrder={false}
                            />
                        ) : bookData && bookData.length > 0 ? (
                            bookData.map((book: IBook) => (<HomeBook key={book._id} book={book} />))
                        ) : (
                            <>
                                <div>
                                    <h2>Book is not found</h2>
                                </div>
                            </>
                        )}
                </div>
            </div>
        </div>

    );
};

export default Books;