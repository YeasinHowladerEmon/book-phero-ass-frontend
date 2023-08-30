import { ReactNode,  } from "react";
import { Navigate, useLocation } from "react-router-dom"

import { useAppDispatch, useAppSelector } from "../redux/hook";
import { setAttemptedPath } from "../redux/features/auth/authSlice";



interface IProps {
    children: ReactNode;
}

const PrivateRouter = ({ children }: IProps) => {
    const { pathname } = useLocation();
    const {user} = useAppSelector((state) => state.auth)
    // console.log(user);
    const dispatch = useAppDispatch();

    dispatch(setAttemptedPath(pathname));
    if (!user) {
        return <Navigate to='/login' state={{ path: pathname }} />
    }
    return children;
}
export default PrivateRouter;

