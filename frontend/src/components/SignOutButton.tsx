import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client"
import { useAppContext } from "../contexts/AppContext";
import { Link } from "react-router-dom";

const SignOutButton=()=>{
    const queryClient=useQueryClient();

    const {showToast}=useAppContext();
    
    const mutation=useMutation(apiClient.signOut,{
        onSuccess:async ()=>{
            await queryClient.invalidateQueries("validateToken");
            showToast({message:"Signed Out!",type:"SUCCESS"});         
        },
        onError:(error:Error)=>{
            showToast({message:error.message,type:"ERROR"});
        }
    });
    const handleClick=()=>{
        mutation.mutate()
    };

    return (
        // < button  className="text-blue-600 px-3 font-bold bg-white hover:bg-gray-200 rounded" >Sign Out</button>
        <Link onClick={handleClick} to="/sign-in" className="flex bg-white items-center text-blue-600 px-3 font-bold hover:bg-gray-100 rounded " >Sign Out</Link>
    );
}
export default SignOutButton;