import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useAuthStore } from '../store/useAuthStore';

const ListingForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        types: [],
        location: '',
        guests: 0,
        bedrooms: 0,
        bathrooms: 0,
        price_per_night: 0,
        rating: 0,
        reviews_count: 0,
        description: '',
        amenities: [],
    });

    const { user } = useAuthStore();

    const [img, setImg] = useState(null); // Image file

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleArrayChange = (e, key) => {
        setFormData({ ...formData, [key]: e.target.value.split(',') });
    };

    const handleFileChange = (e) => {
        setImg(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append('img', img);
        Object.keys(formData).forEach((key) => {
            form.append(key, Array.isArray(formData[key]) ? JSON.stringify(formData[key]) : formData[key]);
        });

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                toast.error('Unauthorized');
            }
            if (user.role === 'host') {
                await axios.post('http://localhost:8000/api/host/listings', form, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                });
                toast.success('Property added successfully!');
            }
            else {
                await axios.post('http://localhost:8000/api/admin/listings', form, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                });
                toast.success('Property added successfully!');
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to add property');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-800">
            <div className="w-full max-w-md p-8 space-y-6 bg-gray-900 border-4 border-gray-600 rounded shadow-md max-h-screen overflow-y-auto">
                <h2 className="text-2xl font-bold text-white text-center">Add Property</h2>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-white">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full px-3 py-2 mt-1 border rounded-md text-white shadow-sm bg-gray-600 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="Enter property title"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-white">Types (comma-separated)</label>
                        <input
                            type="text"
                            onChange={(e) => handleArrayChange(e, "types")}
                            className="w-full px-3 py-2 mt-1 border rounded-md text-white shadow-sm bg-gray-600 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="e.g., Apartment, Condo"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-white">Location</label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className="w-full px-3 py-2 mt-1 border rounded-md text-white shadow-sm bg-gray-600 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="Enter location"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-white">Guests</label>
                        <input
                            type="number"
                            name="guests"
                            value={formData.guests}
                            onChange={handleChange}
                            className="w-full px-3 py-2 mt-1 border rounded-md text-white shadow-sm bg-gray-600 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-white">Bedrooms</label>
                        <input
                            type="number"
                            name="bedrooms"
                            value={formData.bedrooms}
                            onChange={handleChange}
                            className="w-full px-3 py-2 mt-1 border rounded-md text-white shadow-sm bg-gray-600 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-white">Bathrooms</label>
                        <input
                            type="number"
                            name="bathrooms"
                            value={formData.bathrooms}
                            onChange={handleChange}
                            className="w-full px-3 py-2 mt-1 border rounded-md text-white shadow-sm bg-gray-600 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-white">Price per Night $</label>
                        <input
                            type="number"
                            name="price_per_night"
                            value={formData.price_per_night}
                            onChange={handleChange}
                            className="w-full px-3 py-2 mt-1 border rounded-md text-white shadow-sm bg-gray-600 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-white">Rating</label>
                        <input
                            type="number"
                            step="0.1"
                            name="rating"
                            value={formData.rating}
                            onChange={handleChange}
                            className="w-full px-3 py-2 mt-1 border rounded-md text-white shadow-sm bg-gray-600 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-white">Reviews Count</label>
                        <input
                            type="number"
                            name="reviews_count"
                            value={formData.reviews_count}
                            onChange={handleChange}
                            className="w-full px-3 py-2 mt-1 border rounded-md text-white shadow-sm bg-gray-600 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-white">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full px-3 py-2 mt-1 border rounded-md text-white shadow-sm bg-gray-600 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-white">Image</label>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="w-full px-3 py-2 mt-1 border rounded-md text-white shadow-sm bg-gray-600 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-white">Amenities (comma-separated)</label>
                        <input
                            type="text"
                            onChange={(e) => handleArrayChange(e, "amenities")}
                            className="w-full px-3 py-2 mt-1 border rounded-md text-white shadow-sm bg-gray-600 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="e.g., WiFi, Pool, Gym"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-gray-600 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ListingForm;
