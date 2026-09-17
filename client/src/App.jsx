import { BrowserRouter, Routes, Route } from "react-router-dom";

import BookCover from "./components/BookCover";
import EmployeeDirectory from "./pages/EmployeeDirectory";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[var(--color-background)]">
        <Routes>
          <Route
            path="/"
            element={<BookCover />}
          />

          <Route
            path="/employees"
            element={<EmployeeDirectory />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;