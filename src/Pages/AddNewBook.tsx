import { useForm } from "react-hook-form";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useAppSelector } from "../redux/hook";
import { useAddBookPostMutation } from "../redux/features/book/bookApi";
import swal from 'sweetalert';

export interface AddBookInputs {
    title: string;
    author: string;
    genre: string;
    publicationDate: number;
}

const AddNewBook = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<AddBookInputs>();
    const [addBookPost] = useAddBookPostMutation()
    const user = useAppSelector((state) => state.auth.user)
    console.log(user?.data?.accessToken);


    const onSubmit = async (data: AddBookInputs) => {
        console.log(data);
        const options = {
            data: {
                title: data.title,
                author: data.author,
                genre: data.genre,
                publicationDate: data.publicationDate
            },
            token: user?.data?.accessToken

        }
        const result = await addBookPost(options)
        if ('data' in result) {
            const message = (result as  { data: { messages: string } })?.data.messages;
            swal(`Done! Your imaginary ${message}!`, {
                icon: "success",
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
                        <Input type="text" placeholder="Title"  {...register('title', { required: 'Title is required' })} />
                        {errors.title && <p>{errors.title.message}</p>}
                    </div>
                    <div>
                        <Label >Author</Label>
                        <Input type="text" placeholder="Author"  {...register('author', { required: 'Author is required' })} />
                        {errors.author && <p>{errors.author.message}</p>}
                    </div>
                    <div>
                        <Label >Genre</Label>
                        <Input type="text" placeholder="genre"  {...register('genre', { required: 'Genre is required' })} />
                        {errors.genre && <p>{errors.genre.message}</p>}
                    </div>
                    <div>
                        <Label >Publication Date</Label>
                        <Input type="number" placeholder="Publication Date"  {...register('publicationDate', { required: 'Publication Date is required' })} />
                        {errors.publicationDate && <p>{errors.publicationDate.message}</p>}
                    </div>
                    <Button type="submit">Submit</Button>
                </form>
            </div>
        </div>
    );
};

export default AddNewBook;