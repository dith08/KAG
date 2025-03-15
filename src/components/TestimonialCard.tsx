import { Icon } from "@iconify/react";

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
    image: "/images/man.png",
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    rating: 4,
  },
  {
    id: 2,
    name: "Jane Smith",
    image: "/images/man.png",
    review:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    rating: 5,
  },
  {
    id: 3,
    name: "Michael Johnson",
    image: "/images/man.png",
    review:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    rating: 3,
  },
  {
    id: 4,
    name: "Emily Brown",
    image: "/images/man.png",
    review:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    rating: 4,
  },
];

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({
  testimonial,
}) => {
  return (
    <div className="w-full h-64 bg-yellow-500 rounded-lg shadow-lg flex">
      <div className="w-1/4 bg-green-600 rounded-l-lg flex items-center justify-center">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-20 h-20 rounded-full border-2 border-white"
        />
      </div>
      <div className="w-3/4 p-4 flex flex-col text-start">
        <h3 className="font-bold text-white text-2xl mb-2">{testimonial.name}</h3>
        <p className="text-base text-white mb-4">{testimonial.review}</p>
        <div className="flex mt-auto pt-4">
          {Array.from({ length: 5 }, (_, i) => (
            <Icon
              key={i}
              icon={i < testimonial.rating ? "mdi:star" : "mdi:star-outline"}
              className="text-2xl text-white"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
