import bookCover from "../assets/bookcover.png";
import {useNavigate } from "react-router-dom";

//opening screen
function BookCover() {
  const navigate = useNavigate();

  return (
    <section className="flex min-h-screen items-center justify-center px-6 py-10">
      <div className="flex flex-col items-center">
        <button
          type="button"
          onClick={() => navigate("/employees")}
          className="group relative cursor-pointer outline-none"
          aria-label="Open Employee Directory"
        >
          <img
            src={bookCover}
            alt="Penthara Employee Directory"
            className="w-[280px] mix-blend-multiply transition duration-500 ease-out group-hover:-translate-y-2 group-hover:scale-[1.02] group-focus-visible:ring-4 group-focus-visible:ring-[var(--color-primary-soft)] sm:w-[340px] md:w-[390px]"
          />
        </button>

        <p className="mt-7 text-sm font-medium text-[var(--color-primary)]">
          Click to open
        </p>

        <p className="mt-1 text-xs text-slate-400">
          Employee Directory
        </p>
      </div>
    </section>
  );
}

export default BookCover;