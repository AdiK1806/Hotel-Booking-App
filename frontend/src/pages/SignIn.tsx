import {useForm} from "react-hook-form"
import { useMutation,useQueryClient } from "react-query";
import * as apiClient from "../api-client"
import { useNavigate,Link,useLocation } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
export type SignInFormData={
    email:string;
    password:string;
}

const SignIn=()=>{
    const navigate=useNavigate();
    const location=useLocation();
    const queryClient = useQueryClient();
    const {register,formState:{errors},handleSubmit}=useForm<SignInFormData>();

    const {showToast}=useAppContext();

    const mutation=useMutation(apiClient.signIn,{
        onSuccess:async()=>{
            showToast({message:"Login Successful!", type:"SUCCESS"});
            await queryClient.invalidateQueries("validateToken");
            navigate(location.state?.from?.pathname || "/");

        },
        onError:(error:Error)=>{
            showToast({message:error.message, type:"ERROR"});
        }
    });
    const onSubmit=handleSubmit((data)=>{
        mutation.mutate(data);    
    });

    return (
        <form  className="flex flex-col gap-5 px-16" onSubmit={onSubmit}>
            <h2 className="text-3xl font-bold">Sign In</h2>

            <div className="font-medium ml-10">
                TestEmail: <span className="bg-green-100 font-bold m-10">testUser01@email.com</span> <br/>
                TestPassword: <span className="bg-green-100 font-bold m-3">asd#123$</span>
            </div>

            


            <label className="text-gray-700 text-lg font-bold flex-1">
                    Email       
                    <input type="email" className="border rounded w-full py-1 px-2 font-normal mt-2"
                    {...register("email",{required:"This field is required"})}>
                    </input>
                    {errors.email && (<span className="text-red-500">
                        {errors.email.message}
                    </span>)}
            </label>


            <label className="text-gray-700 text-lg font-bold flex-1">
                    Password
                    <input type="password" className="border rounded w-full py-1 px-2 font-normal mt-2"
                        {...register("password",{required:"This field is required",
                                                minLength:{value:6,message:"Password must be atleast 6 characters long"}
                                                }
                                    )
                        }
                    >
                    </input>
                    {errors.password && (<span className="text-red-500">
                        {errors.password.message}
                    </span>)}
            </label>  

                <span className="flex items-center justify-between"> 

                    <span className="text-sm">
                        Not Registered?{" "}
                            <Link className="underline" to="/register">
                                Create an account here
                            </Link>
                    </span> 
                    <button type="submit" className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl rounded">Login</button>
                </span>

        </form>
    );
}
export default SignIn;