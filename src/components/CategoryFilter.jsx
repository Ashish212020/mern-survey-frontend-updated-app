// FILE: client/src/components/CategoryFilter.jsx

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
            selectedCategory === category
              ? 'bg-indigo-600 text-white' // Style for the active button
              : 'bg-white text-gray-700 hover:bg-gray-100' // Style for inactive buttons
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
