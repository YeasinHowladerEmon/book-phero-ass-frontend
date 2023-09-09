import { useEffect } from 'react';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button, buttonVariants } from './ui/button';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';

import { createUser } from '../redux/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import toast from 'react-hot-toast';

export interface SignupFormInputs {
    email: string;
    password: string;
}


const Signup = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const success = useAppSelector((state) => state?.auth.success)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupFormInputs>();
    const onSubmit = async(data: SignupFormInputs) => {
        console.log(data);
        try {
            await dispatch(createUser({ email: data.email, password: data.password })); 
           } catch (error) {
             console.error('Login failed:', error);
           }
    };

    useEffect(() => {
        if (success) {
            toast.success('User Log In Successfully')
        }
    }, [navigate, success])


    return (
        <>
            <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
                <Link
                    to="/login"
                    className={cn(
                        buttonVariants({ variant: 'ghost', size: 'sm' }),
                        'absolute right-4 top-4 md:right-8 md:top-8'
                    )}
                >
                    Login
                </Link>
                <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
                    <div
                        className="absolute inset-0 bg-cover"
                        style={{
                            backgroundImage:
                                'url(https://images.unsplash.com/photo-1590069261209-f8e9b8642343?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1376&q=80)',
                        }}
                    />
                    <div className="relative z-20 flex items-center text-lg font-medium">
                        {/* <img className="h-8" src={logo} alt="" /> */}
                    </div>
                    <div className="relative z-20 mt-auto">
                        <blockquote className="space-y-2"></blockquote>
                    </div>
                </div>
                <div className="lg:p-8">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <div className="flex flex-col space-y-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                Create an account
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Enter your email below to create your account
                            </p>
                        </div>
                        <div className='grid gap-6'>

                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="grid gap-2">
                                    <div className="grid gap-1">
                                        <Label className="sr-only" htmlFor="email">
                                            Email
                                        </Label>
                                        <Input
                                            id="email"
                                            placeholder="name@example.com"
                                            type="email"
                                            autoCapitalize="none"
                                            autoComplete="email"
                                            autoCorrect="off"
                                            {...register('email', { required: 'Email is required' })}
                                        />
                                        {errors.email && <p>{errors.email.message}</p>}
                                        <Input
                                            id="password"
                                            placeholder="your password"
                                            type="password"
                                            autoCapitalize="none"
                                            autoCorrect="off"
                                            {...register('password', { required: 'Password is required' })}
                                        />
                                        {errors.password && <p>{errors.password.message}</p>}
                                    </div>
                                    <Button>Create Account</Button>
                                </div>
                            </form>
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-background px-2 text-muted-foreground">
                                        Or continue with
                                    </span>
                                </div>
                            </div>
                            <Button
                                variant="outline"
                                type="button"
                                className="flex items-center justify-between"
                            >
                                <p>Google</p>
                                <FcGoogle />
                            </Button>
                        </div>
                        <p className="px-8 text-center text-sm text-muted-foreground">
                            By clicking continue, you agree to our{' '}
                            <Link
                                to="/terms"
                                className="underline underline-offset-4 hover:text-primary"
                            >
                                Terms of Service
                            </Link>{' '}
                            and{' '}
                            <Link
                                to="/privacy"
                                className="underline underline-offset-4 hover:text-primary"
                            >
                                Privacy Policy
                            </Link>
                            .
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Signup;