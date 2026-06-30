import { assets } from "../assets/assets";
import Title from "./Title";

const NewsLetter = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO:
    // Call Newsletter API here
  };

  return (
    <section className="mx-2 my-30 flex max-w-5xl flex-col items-center rounded-2xl bg-gray-900 px-4 py-12 text-white md:py-16 lg:mx-auto lg:w-full">
      <Title
        title="Stay Inspired"
        subTitle="Join our newsletter and be the first to discover new destinations, exclusive offers, and travel inspiration."
      />

      <form
        onSubmit={handleSubmit}
        className="mt-6 flex flex-col items-center justify-center gap-4 md:flex-row"
      >
        <input
          type="email"
          autoComplete="email"
          aria-label="Email Address"
          placeholder="Enter your email"
          className="w-full max-w-72 rounded border border-white/20 bg-white/10 px-4 py-2.5 outline-none"
          required
        />

        <button
          type="submit"
          className="group flex items-center justify-center gap-2 rounded bg-black px-7 py-2.5 transition hover:bg-gray-800 active:scale-95"
        >
          Subscribe

          <img
            src={assets.arrowIcon}
            alt="Arrow"
            className="w-3.5 invert transition group-hover:translate-x-1"
          />
        </button>
      </form>

      <p className="mt-6 text-center text-xs text-gray-400">
        By subscribing, you agree to our Privacy Policy and consent to receive updates.
      </p>
    </section>
  );
};

export default NewsLetter;