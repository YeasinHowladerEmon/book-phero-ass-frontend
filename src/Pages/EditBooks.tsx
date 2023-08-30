import { useNavigate, useParams } from "react-router-dom";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { useAppSelector } from "../redux/hook";
import { AddBookInputs } from "./AddNewBook";
import { useForm } from "react-hook-form";
import swal from 'sweetalert';
import { usePostEditBookMutation, useSingleBooksDetailsQuery } from "../redux/features/book/bookApi";
import { Button } from "../components/ui/button";
import { useEffect } from "react";
const EditBooks = () => {
    const { id } = useParams()
    const navigate = useNavigate();
    const { data: book, refetch } = useSingleBooksDetailsQuery(id)

    const user = useAppSelector((state) => state.auth.user)
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<AddBookInputs>();
    const [postEditBook] = usePostEditBookMutation()
    // console.log(user?.data?.accessToken);
    console.log(book);

    useEffect(() => {
        refetch()
    }, [id, refetch])


    const onSubmit = async (data: AddBookInputs) => {
        console.log(data);
        const options = {
            id: id,
            data: {
                title: data.title,
                author: data.author,
                genre: data.genre,
                publicationDate: data.publicationDate
            },
            token: user?.data?.accessToken

        }

        const result = await postEditBook(options)
        if ('error' in result) {
            const errorMessage = (result as { error: { data: { message: string } } })?.error.data.message;
            swal(errorMessage, {
                icon: "warning",
            });
        }
        if ('data' in result) {
            const message = (result as { data: { messages: string } })?.data.messages;
            swal(`Done! Your imaginary ${message}!`, {
                icon: "success",
            }).then(() => {
                setTimeout(() => {
                    navigate('/')
                }, 2000)
            })
        }
        reset()
    };
    return (
        <div className="container mt-10">
            <div className='grid grid-cols-2 gap-4 place-content-center '>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 ">
                    <div>
                        <Label >Title</Label>
                        <Input type="text" placeholder="Title" defaultValue={book?.data.title}  {...register('title', { required: 'Title is required' })} />
                        {errors.title && <p>{errors.title.message}</p>}
                    </div>
                    <div>
                        <Label >Author</Label>
                        <Input type="text" placeholder="Author" defaultValue={book?.data.author}   {...register('author', { required: 'Author is required' })} />
                        {errors.author && <p>{errors.author.message}</p>}
                    </div>
                    <div>
                        <Label >Genre</Label>
                        <Input type="text" placeholder="genre" defaultValue={book?.data.genre}  {...register('genre', { required: 'Genre is required' })} />
                        {errors.genre && <p>{errors.genre.message}</p>}
                    </div>
                    <div>
                        <Label >Publication Date</Label>
                        <Input type="number" placeholder="Publication Date" defaultValue={book?.data.publicationDate}  {...register('publicationDate', { required: 'Publication Date is required' })} />
                        {errors.publicationDate && <p>{errors.publicationDate.message}</p>}
                    </div>
                    <Button type="submit">Submit</Button>
                </form>
            </div>
        </div>
    );
};

export default EditBooks;


