import { Link } from "react-router-dom";
import { IBook } from "../types/globalTypes";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

interface IProps {
  book: IBook
}

const handleAddProduct = () => {

}

export default function HomeBook({ book }: IProps) {
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
          <CardFooter>
            <Button variant="default" onClick={() => handleAddProduct()}>
              Add to cart
            </Button>
          </CardFooter>
        </Link>
      </Card>
    </div>
  );
}