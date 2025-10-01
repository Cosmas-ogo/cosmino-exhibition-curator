import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ExhibitionProvider } from "../context/ExhibitionContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Toaster from "../components/Toaster";
import Home from "../pages/Home";
import Exhibition from "../pages/Exhibition";
import About from "../pages/About";

const qc = new QueryClient();

export default function AppRouter() {
  return (
    <QueryClientProvider client={qc}>
      <ExhibitionProvider>
        <BrowserRouter>
          <div className="flex min-h-screen flex-col">
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/exhibition" element={<Exhibition />} />
              <Route path="/about" element={<About />} />
              <Route
                path="*"
                element={
                  <main className="mx-auto max-w-3xl px-3 py-6">
                    <h1 className="text-xl font-semibold">Not Found</h1>
                    <p className="mt-2">
                      Return to{" "}
                      <Link className="underline" to="/">
                        home
                      </Link>
                      .
                    </p>
                  </main>
                }
              />
            </Routes>
            <Footer />
            <Toaster />
          </div>
        </BrowserRouter>
      </ExhibitionProvider>
    </QueryClientProvider>
  );
}
