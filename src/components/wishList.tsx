
import { AiOutlineHeart } from 'react-icons/ai';
import { HiOutlineTrash } from 'react-icons/hi';
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { bookRemoved, markAsList } from '../redux/features/wishlist/wishlistSlice';
import { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import { IBook } from '../types/globalTypes';


export default function WishList() {
  const { books } = useAppSelector((state) => state.wishlist);
  const [selectedStatus, setSelectedStatus] = useState('Reading')
  const dispatch = useAppDispatch();
  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="ghost">
          <AiOutlineHeart size={25} />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Wishlist</SheetTitle>
        </SheetHeader>
        <div className="space-y-10">
          {books.map((book: IBook) => (
            <div
              className="border h-52 p-5 flex justify-between rounded-md"
              key={book.title}
            >
              <div className="px-2 w-full flex flex-col gap-3">
                <h3 className="">Title:
                  {book.title}
                </h3>
                <p>Author:
                  {book.author}
                </p>
                <p className="">
                  genre:
                  {book.genre}
                </p>
              </div>
              <div >
                <select className='mb-5' value={selectedStatus} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  const status = e.target?.value;
                  console.log(e.target.value);
                  setSelectedStatus(status)
                  dispatch(markAsList({ bookId: book._id, status }))
                }}>
                  <option value="Reading">Reading</option>
                  <option value="Read Soon">Read Soon</option>
                  <option value="Finished Reading">Finished Reading</option>
                </select>
                
                <div className="border-l pl-2 flex flex-col justify-between">
                  <Button
                    onClick={() => dispatch(bookRemoved(book))}
                  >
                    <HiOutlineTrash size="15" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SheetContent>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </Sheet>
  );
}