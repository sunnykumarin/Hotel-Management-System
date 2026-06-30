import Title from "./Title";
import StarRating from "./StarRating";
import { testimonials } from "../assets/assets";

const Testimonial = () => {
  return (
    <section className="bg-slate-50 px-6 pt-20 pb-30 md:px-16 lg:px-24">
      <Title
        title="What Our Guests Say"
        subTitle="Discover why discerning travelers consistently choose Roomora for their exclusive and luxurious accommodations around the world."
      />

      <div className="mt-20 flex flex-wrap justify-center gap-6">
        {testimonials.map((testimonial) => (
          <article
            key={testimonial.id}
            className="max-w-sm rounded-xl bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="flex items-center gap-3">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                loading="lazy"
                className="h-14 w-14 rounded-full object-cover"
              />

              <div>
                <h3 className="font-playfair text-xl">
                  {testimonial.name}
                </h3>

                <p className="text-sm text-gray-500">
                  {testimonial.address}
                </p>
              </div>
            </div>

            <div className="mt-4">
              <StarRating rating={testimonial.rating} />
            </div>

            <p className="mt-4 text-gray-500 leading-7">
              {testimonial.review}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Testimonial;