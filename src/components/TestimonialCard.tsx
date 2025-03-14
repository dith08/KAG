import { FaStar } from "react-icons/fa";

interface Testimonial {
  id: number;
  name: string;
  image: string;
  review: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "John Doe",
    image: "https://via.placeholder.com/80",
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    rating: 4,
  },
  {
    id: 2,
    name: "Jane Smith",
    image: "https://via.placeholder.com/80",
    review:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    rating: 5,
  },
  {
    id: 3,
    name: "Michael Johnson",
    image: "https://via.placeholder.com/80",
    review:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    rating: 3,
  },
  {
    id: 4,
    name: "Emily Brown",
    image: "https://via.placeholder.com/80",
    review:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    rating: 4,
  },
];

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({
  testimonial,
}) => {
  return (
    <div className="w-full h-64 bg-yellow-400 rounded-lg shadow-lg flex">
      <div className="w-1/4 bg-green-600 flex items-center justify-center">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-20 h-20 rounded-full border-2 border-white"
        />
      </div>
      <div className="w-3/4 p-4 flex flex-col items-start">
        <h3 className="font-bold text-lg">{testimonial.name}</h3>
        <p className="text-sm mt-2">{testimonial.review}</p>
        <div className="flex mt-3">
          {Array.from({ length: 5 }, (_, i) => (
            <FaStar
              key={i}
              className={`text-lg ${
                i < testimonial.rating ? "text-yellow-500" : "text-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
