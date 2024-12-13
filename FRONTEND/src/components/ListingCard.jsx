
const ListingCard = ({ property, detailsCallback }) => {

  //Details Callback
  const handleNavigate = () => {
    detailsCallback(property._id);
  }

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white flex flex-col h-full  hover:shadow-xl transition-shadow duration-300" onClick={handleNavigate}>
      <img className="w-full h-48 object-cover" src={"http://localhost:8000/images/" + property.img} alt={property.title} />
      <div className="px-6 py-4 flex-grow flex flex-col">
        <div className="font-bold text-xl mb-2 text-gray-800">{property.title}</div>
        <div className="flex flex-wrap mt-2">
          {property.types.map((type, index) => (
            <span key={index} className="bg-blue-500 rounded-full px-3 py-1 text-white text-sm mr-2 mb-2">{type}</span>
          ))}
        </div>
        <div className="flex space-x-2 text-gray-600 text-sm mt-2">
          <span>{property.guests} guests</span>
          <span>{property.bedrooms} bedrooms</span>
          <span>{property.bathrooms} bathrooms</span>
        </div>
        <div className="text-lg font-bold text-green-600 mt-4">${property.price_per_night} / night</div>
        <div className="flex items-center mt-2">
          <span className="text-yellow-600">⭐ {property.rating}</span>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;