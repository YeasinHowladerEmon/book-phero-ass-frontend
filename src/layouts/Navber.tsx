import { Link } from 'react-router-dom';


import { Button } from "../components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import Cart from '../components/Cart';

import { useAppDispatch, useAppSelector } from '../redux/hook';
import { RootState } from '../redux/store';
import { logOut } from '../redux/features/auth/authSlice';

const Navber = () => {
  const dispatch = useAppDispatch()
  const success = useAppSelector((state) => state.auth.success);
  // const user = useAppSelector((state:RootState) => state.auth.user)
  
  console.log(success);
  return (
    <nav className="w-full h-16 fixed top backdrop-blur-lg z-10">
      <div className="h-full w-full bg-white/60">
        <div className="flex items-center justify-between w-full md:max-w-7xl h-full mx-auto ">
          <div>

            <Link to='/'>
              <h2>Book Shop</h2>
            </Link>
          </div>
          <div>
            <ul className="flex items-center">
              <li>
                <Button variant="link" asChild>
                  <Link to="/">Home</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" asChild>
                  <Link to="/all-books">All Books</Link>
                </Button>
              </li>
              <li>
                <Cart />
              </li>
              <li>
                <Button variant="link" asChild>
                  <Link to="/add-book">Add New Book</Link>
                </Button>
              </li>
              {
                success && (
                  <>
                    <li>
                      <Button variant="link" asChild onClick={() => dispatch(logOut())}>
                        <Link to='/'>
                        Log Out
                        </Link>
                      </Button>
                    </li>
                  </>
                )}
              {!success && (
                <>
                  <li>
                    <Button variant="link" asChild>
                      <Link to="/signup">Sign up</Link>
                    </Button>
                  </li>
                  <li>
                    <Button variant="link" asChild>
                      <Link to="/login">Login In</Link>
                    </Button>
                  </li>
                </>
              )
              }
              <li className="ml-5">
                <DropdownMenu>
                  <DropdownMenuTrigger className="outline-none">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>P</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer">
                      Profile
                    </DropdownMenuItem>
                    {/* {
                      !user.email && (
                        <>
                          <Link to='/login'>
                            <DropdownMenuItem className="cursor-pointer">
                              Login
                            </DropdownMenuItem>
                          </Link>
                          <Link to='/signup'>
                            <DropdownMenuItem className="cursor-pointer">
                              Signup
                            </DropdownMenuItem>
                          </Link>
                        </>
                      )
                    }
                    {
                      user.email && (
                        <>
                          <DropdownMenuItem className="cursor-pointer"
                           onClick={() => handleLogOut()} >
                          logout
                        </DropdownMenuItem>
                  </>
                  )
                    } */}
                    <DropdownMenuItem className="cursor-pointer">
                      Subscription
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav >
  );
};

export default Navber;