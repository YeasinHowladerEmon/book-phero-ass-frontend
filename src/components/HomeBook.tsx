import { Link } from "react-router-dom";
import { IBook } from "../types/globalTypes";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { bookAdded } from "../redux/features/wishlist/wishlistSlice";
import { useAppDispatch, } from "../redux/hook";
import toast from "react-hot-toast";

interface IProps {
  book: IBook
}


export default function HomeBook({ book }: IProps) {
  const dispatch = useAppDispatch();

  const handleWishlist = (book: IBook) => {
    dispatch(bookAdded(book))
    toast.success('successfully added to wishlist');
  }


  // console.log(book);
  return (
    <div className="">
      <Card className="rounded-2xl flex flex-col items-start justify-between p-5 overflow-hidden shadow-md border border-gray-100 hover:shadow-2xl hover:scale-[102%] transition-all gap-2">
        <Link to={`/book-details/${book._id}`} className="w-full">
          <CardHeader>
            <CardTitle>
              <h1 className="text-xl font-semibold">
                Title: {book?.title}
              </h1>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              Author: {book?.author}
            </p>
            <p className="text-sm">Publication Year: {book?.genre}</p>
            <p className="text-sm">Publication Year: {book?.publicationDate}</p>
          </CardContent>
        </Link>
        <CardFooter>
          <Button variant="default" onClick={() => handleWishlist(book)}>
            Add to Wishlist
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}