
import BookPreview from '../components/BookPreview';
import { Button } from '../components/ui/button';
import { usePostDeleteBookMutation, useSingleBooksDetailsQuery } from '../redux/features/book/bookApi';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../redux/hook';
import { useEffect } from 'react';
import swal from 'sweetalert';
const BookDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.auth.user)
    const [postDeleteBook] = usePostDeleteBookMutation()
    const { data: book, refetch } = useSingleBooksDetailsQuery(id)
    const token = user?.data?.accessToken;

    useEffect(() => {
        refetch()
    }, [id, refetch])

console.log(book);

    const handleDelete = async () => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary book!",
            icon: "warning",
            buttons: ["Cancel", "Delete"],
            dangerMode: true,
        }).then(async (willDelete) => {
            if (willDelete) {
                const options = {
                    id: id,
                    token: token
                }
                const result = await postDeleteBook(options)
                if ('error' in result) {
                    const errorMessage = (result as { error: { data: { message: string } } })?.error.data.message;
                    swal(errorMessage, {
                        icon: "warning",
                    });
                }
                if ('data' in result) {
                    swal("Done! Your imaginary Book has been deleted!", {
                        icon: "success",
                    }).then(() => {
                        setTimeout(() => {
                            navigate('/')
                        }, 2000)
                    })
                }
            } else {
                swal("Your imaginary book is safe!");
            }
        })
    }



    return (
        <>
            <div className="flex max-w-7xl mx-auto items-center border-b border-gray-300">
                <div className="w-[50%] space-y-3">
                    <h1 className="text-3xl font-semibold">{book?.data.title}</h1>
                    <p className="text-xl">Author: {book?.data.author}</p>
                    <p className="text-xl">Genre: {book?.data.genre}</p>
                    <p className="text-xl">Publication Year: {book?.data.publicationDate}</p>
                </div>
                <div>
                    <div>
                        <Link to={`/editBooks/${id}`}>
                            <Button>
                                Edit Book
                            </Button>
                        </Link>
                    </div>
                    <br />
                    <form onSubmit={e => e.preventDefault()}>
                        <div>
                            <Button onClick={handleDelete}>Delete</Button>
                        </div>
                    </form>
                </div>
            </div>
            <BookPreview id={id!} token={token} />
        </>
    );
};

export default BookDetails;