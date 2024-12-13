import { useState } from 'react';

const Searchform = ({ currSearch, handleSearchClick }) => {
    const [searchTerm, setSearchTerm] = useState(currSearch);

    const handleSearchInput = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();

        handleSearchClick(searchTerm);
    };

    return (
        <div className="bg-black text-white flex justify-center items-center w-full">
            <form className="flex flex-col md:flex-row md:justify-center md:items-center py-4 px-4 rounded w-full"
                onSubmit={handleSearchSubmit}>
                <div className="flex flex-col md:flex-row items-center w-full md:w-1/2">
                    <input type="text" placeholder="What are you looking for?" onChange={handleSearchInput}
                        className="text-gray-800 w-full mb-4 md:mb-0 py-2 px-2 rounded-full focus:outline-none md:mr-4" />
                    <button className="bg-teal-400 hover:bg-teal-500 duration-300 px-4 py-2 rounded-full text-white w-full md:w-auto"
                        type="submit" disabled={!searchTerm}>
                        Search
                    </button>
                </div>
            </form>
        </div>
    );

};

export default Searchform;