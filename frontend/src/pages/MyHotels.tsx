import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";
import MyHotelsHeader from "./page-components/MyHotelsHeader";

const MyHotels = () => {
  const { data: hotelData } = useQuery(
    "fetchMyHotels",
    apiClient.fetchMyHotels,
    {
      onError: () => {},
    }
  );

  if (!hotelData?.length) {

    return <div className="space-y-5 px-16">
       <MyHotelsHeader> <div className="my-10 text-xl font-bolder"> No Hotels Found!</div> </MyHotelsHeader>
      </div>;
  }
  

  return (
    <div className="space-y-5 px-16">

    

    <MyHotelsHeader><></></MyHotelsHeader>

      <div className="grid grid-cols-1 gap-8">
        {hotelData.map((hotel) => (
          <div
            key={hotel.name} 
            data-testid="hotel-card"
            className="flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5"
          >

            <h2 className="text-2xl font-bold">{hotel.name}</h2>

            <div className="whitespace-pre-line">{hotel.description}</div>

            <div className="grid grid-cols-5 gap-2">

              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BsMap className="mr-4" />
                {hotel.city}, {hotel.country}
              </div>

              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BsBuilding className="mr-4" />
                {hotel.type}
              </div>

              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BiMoney className="mr-4" />₹ {hotel.pricePerNight}/Night
              </div>

              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BiHotel className="mr-5" />
                 Adults: {hotel.adultCount} <br/> Children: {hotel.childCount}
              </div>

              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BiStar className="mr-4" />
                Rating: {hotel.starRating} Star
              </div>

            </div>

            <span className="flex justify-end">
              <Link
                to={`/edit-hotel/${hotel._id}`}
                className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500 rounded"
              >
                View Details
              </Link>
            </span>

          </div>

        ))}
        
      </div>
    </div>
  );
};

export default MyHotels;