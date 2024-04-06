import { Link } from "react-router-dom";
interface Props{
    children:React.ReactNode
}

const MyHotelsHeader=({children}:Props)=>{
    return (
        <>
        <span className="flex justify-between">
        <h1 className="text-3xl font-bold">My Hotels</h1>
        <Link
          to="/add-hotel"
          className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500 rounded"
        >
          Add Hotel
        </Link>

      </span>
      {children}
      </>
    )
}
export default MyHotelsHeader;