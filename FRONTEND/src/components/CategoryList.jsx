import CategoryButton from "./CategoryButton";
import { CATEGORIES } from "../Data/CATEGORIES";

const CategoryList = ({ activeCategory, handleCategoryClick }) => {
    return (
        <div className="flex flex-col justify-center max-w-full bg-transparent px-4 sm:px-6 lg:px-8 mt-4">
            <div>
                <ul className="flex flex-row mb-0 gap-4 bg-gray-700 overflow-y-auto scrollbar-hide max-w-full">
                    {CATEGORIES.map((category) => (
                        <CategoryButton key={category.name} category={category.name} onClick={handleCategoryClick} currCategory={activeCategory} />
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default CategoryList;