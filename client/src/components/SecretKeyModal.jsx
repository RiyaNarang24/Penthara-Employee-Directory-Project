import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
function SecretKeyModal({ onVerify, onCancel, loading, error }) {
  const [showSecret, setShowSecret] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();

    const secretKey = event.target.secretKey.value.trim();

    if (!secretKey) {
      return;
    }

    onVerify(secretKey);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-2xl border border-[var(--color-border)] bg-white p-6 shadow-xl">
        <div className="mb-5">
          <h2 className="text-xl font-semibold text-[var(--color-heading)]">
            Admin Access
          </h2>

          <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">
            Enter the secret key to continue with this action.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <label
            htmlFor="secretKey"
            className="block text-sm font-medium text-[var(--color-heading)]"
          >
            Secret Key
          </label>

          <div className="relative mt-2">
           <input
           id="secretKey"
           name="secretKey"
           type={showSecret ? "text" : "password"}
           autoFocus
           placeholder="Enter secret key"
           className="w-full rounded-xl border border-[var(--color-border)] bg-white px-4 py-3 pr-11 text-sm text-[var(--color-text)] outline-none transition placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-secondary)] focus:ring-4 focus:ring-blue-100"
           />

          <button
          type="button"
          onClick={() => setShowSecret(!showSecret)}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-[var(--color-text-muted)] transition hover:text-[var(--color-primary)]"
          aria-label={showSecret ? "Hide secret key" : "Show secret key"}
          >
          {showSecret ? (
         <EyeOff className="h-5 w-5" />
          ) : (
        <Eye className="h-5 w-5" />
         )}
        </button>
         </div>

          {error && (
            <p className="mt-2 text-sm text-[var(--color-danger)]">
              {error}
            </p>
          )}

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="rounded-xl border border-[var(--color-border)] bg-white px-4 py-2.5 text-sm font-medium text-[var(--color-text)] transition hover:bg-[var(--color-primary-soft)]"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-[var(--color-primary)] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-[var(--color-violet)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Verifying..." : "Verify"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SecretKeyModal;