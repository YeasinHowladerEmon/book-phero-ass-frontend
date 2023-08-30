import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Login from '../components/Login';
import Signup from '../components/Signup';
import NotFound from '../components/NotFound';
import BookDetails from '../Pages/BookDetails';
import Home from '../Pages/Home';
import Books from '../Pages/Books';
import EditBooks from '../Pages/EditBooks';
import PrivateRouter from './privateRouter';
import AddNewBook from '../Pages/AddNewBook';


const routes = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <Home/>
            },
            {
                path: '/all-books',
                element: <Books/>
            },
            {
                path: '/book-details/:id',
                element: <BookDetails/>
            },
            {
                path: '/editBooks/:id',
                element: (
                    <PrivateRouter>
                        <EditBooks/>
                    </PrivateRouter>
                )
            },
            {
                path: '/add-book',
                element: (
                    <PrivateRouter>
                        <AddNewBook/>
                    </PrivateRouter>
                )
            },
           
        ]
    },
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/signup',
        element: <Signup/>
    },
    {
        path: '/*',
        element: <NotFound/>
    },
])

export default routes;