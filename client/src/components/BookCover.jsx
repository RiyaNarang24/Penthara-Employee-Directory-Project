import bookCover from "../assets/bookcover.png";
import { useNavigate } from "react-router-dom";

// Opening screen
function BookCover() {
  const navigate = useNavigate();

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-10">
      {/* Decorative circles */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-purple-200/60 blur-sm" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-pink-200/60 blur-sm" />

      <div className="relative z-10 flex flex-col items-center text-center">
        <button
          type="button"
          onClick={() => navigate("/employees")}
          className="group relative cursor-pointer outline-none"
          aria-label="Open Employee Directory"
        >
          <img
            src={bookCover}
            alt="Penthara Employee Directory"
            className="w-[390px] mix-blend-multiply transition duration-500 ease-out group-hover:-translate-y-2 group-hover:scale-[1.02] group-focus-visible:ring-4 group-focus-visible:ring-[var(--color-primary-soft)]"
          />
        </button>

        {/* Description below the book */}
        <h1 className="mt-7 text-3xl font-bold tracking-tight text-[var(--color-heading)] sm:text-4xl">
          Your people, beautifully organised.
        </h1>

        <p className="mt-3 max-w-xl text-sm leading-6 text-[var(--color-text)] sm:text-base">
          A thoughtful space to keep every member of your team close at hand.
        </p>

        <button
           type="button"
           onClick={() => navigate("/employees")}
          className="mt-6 text-sm font-medium text-[var(--color-primary)] transition hover:underline"
          >     
           Click to open
          </button>

        <p className="mt-1 text-xs text-[var(--color-text-muted)]">
          Employee Directory
        </p>
      </div>
    </section>
  );
}

export default BookCover;