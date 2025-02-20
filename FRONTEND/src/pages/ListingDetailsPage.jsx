import { useParams, useNavigate } from 'react-router-dom';
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useState, useEffect } from 'react';
import axios from "axios";

const ListingDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/listings/${id}`);
        setProperty(response.data);
        setLoading(false);
        setError(null);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleBookingClick = () => {
    navigate(`/book/${property._id}`);
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-700">
        <div className="animate-spin h-12 w-12 border-4 border-t-4 border-t-blue-400 border-gray-300 rounded-full"></div>
        <div className="text-blue-400 text-2xl sm:text-5xl mt-4">Loading</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-700">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8 flex justify-center items-center text-white">
          <div className="text-blue-400 text-2xl sm:text-5xl text-center">
            An Error occurred trying to fetch properties
            <br />
            <br />
            <p className="text-red-500 text-2xl sm:text-5xl text-center">{error}</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-700">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-8 text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="lg:col-span-1">
            <h1 className="text-2xl font-bold mb-4">{property.title}</h1>
            <p className="text-white mb-2">
              <strong className="text-white">Location: </strong> {property.location}
            </p>
            <p className="text-white mb-2">
              <strong className="text-white">Type:</strong> {property.types?.join(", ")}
            </p>
            <p className="text-white mb-2">
              <strong className="text-white">Guests:</strong> {property.guests}
            </p>
            <p className="text-white mb-2">
              <strong className="text-white">Bedrooms:</strong> {property.bedrooms}
            </p>
            <p className="text-white mb-2">
              <strong className="text-white">Bathrooms:</strong> {property.bathrooms}
            </p>
            <p className="text-white text-lg font-semibold">
              ${property.price_per_night} / night
            </p>
            <p className="text-yellow-500 font-medium mb-2">
              Rating: {property.rating} ⭐ ({property.reviews_count} reviews)
            </p>

            <h2 className="text-xl font-bold mb-2">Amenities</h2>
            <ul className="list-none list-inside text-white space-y-1">
              {property.amenities.map((amenity, index) => (
                <li key={index} className="flex items-center">
                  <svg
                    className="flex-shrink-0 w-3.5 h-3.5 text-green-400 mr-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 16 12"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5.917 5.724 10.5 15 1.5"
                    />
                  </svg>
                  <span>{amenity}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-1">
            <img
              src={"http://localhost:8000/images/" + property.img}
              alt={property.title}
              className="rounded-lg w-full object-cover"
            />
          </div>
        </div>

        

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Description</h2>
          <p className="text-white text-justify">{property.description}</p>
        </div>

        <div className="mt-12 flex justify-center">
          <button
            onClick={handleBookingClick}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Book Now
          </button>
        </div>
      </main>
      <Footer />  
    </div>
  );
};

export default ListingDetailsPage;
