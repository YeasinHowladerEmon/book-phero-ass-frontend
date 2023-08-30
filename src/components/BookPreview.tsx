import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { FiSend } from 'react-icons/fi';
import { Key } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useGetCommentQuery, usePostCommentMutation } from "../redux/features/book/bookApi";

import swal from 'sweetalert';
import { useAppSelector } from "../redux/hook";


type Input = {
    comments: string
}
type IProps = {
    id: string,
    token?: string,
}



const BookPreview = ({ id, token }: IProps) => {
    const { register, handleSubmit, reset } = useForm<Input>();
    const user = useAppSelector((state) => state.auth.user)
   
    console.log(user?.data?.accessToken)

    const { data } = useGetCommentQuery(id, {
        refetchOnMountOrArgChange: true
    })
    const [postComment, { error }] = usePostCommentMutation();
    if (error) {
        const msg = (error as { data: { message: string } })?.data?.message || "An error occurred."!;
        swal({
            title: "Please Log In!",
            text: msg,
            icon: "warning",
            buttons: {
                ok: {
                    text: "Ok!",
                    value: true,
                },
            },
        })

    }
    console.log(data?.data);
    const onSubmit: SubmitHandler<Input> = data => {
        const options = {
            id: id,
            data: { comment: data.comments },
            token: token

        }
        postComment(options)
        reset()
    };
    return (
        <div className="max-w-7xl mx-auto mt-5">
            <form onSubmit={handleSubmit(onSubmit)} className="flex gap-5 items-center">
                <Textarea className='min-h-[100px]' required {...register("comments")} placeholder="Type your comment here" />
                <Button type="submit" className="rounded-full h-10 w-10 p-2 text-[25px]"><FiSend /></Button>
            </form>
            <div className="mt-10">
                {
                    data?.data.comments?.map((comment: string, index: Key) => (
                        <div key={index} className="flex gap-3 items-center mb-5">
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <p>{comment}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default BookPreview;

