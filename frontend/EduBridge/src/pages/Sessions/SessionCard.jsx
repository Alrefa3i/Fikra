import { useCart } from "react-use-cart";
const SessionCard = ({ image, price, title, category, rating, students }) => {
    const { addItem } = useCart();
    return (
        <div className="card card-compact w-full bg-base-100 shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
            <figure>
                <img src={image} alt={title} className="w-full h-40 object-cover" />
            </figure>
            <div className="card-body p-4">
                <span className="badge badge-secondary mb-2">{category}</span>
                <h3 className="card-title font-bold text-lg text-gray-900 dark:text-white">{title}</h3>
                <div className="flex justify-between items-center mt-3">
                    <p className="text-xl font-bold text-primary">${price}</p>
                    <div className="flex flex-col items-end text-sm">
                        <span className="text-yellow-500">⭐ {rating}</span>
                        <span className="text-gray-600 dark:text-gray-400">{students.toLocaleString()} students</span>
                    </div>
                </div>
                <button
                    onClick={() => addItem({ image, price, title, category })}
                    className="btn btn-primary mt-4 w-full"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default SessionCard