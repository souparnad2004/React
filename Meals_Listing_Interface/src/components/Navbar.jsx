import { useEffect, useState } from "react";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 1);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0f1115]/80 backdrop-blur-md shadow-lg fixed"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-5 py-4">
        
        {/* Logo */}
        <h2 className="font-semibold text-lg tracking-wide">
          🍽️ Meals Daily
        </h2>

        {/* Links */}
        <ul className="flex items-center gap-6 text-sm">
          <li>
            <p className="hover:text-white/70 transition font-medium" href="/">
              Recipes
            </p>
          </li>
          <li>
            <p className="hover:text-white/70 transition font-medium" href="/account">
              Account
            </p>
          </li>
        </ul>

      </div>
    </nav>
  );
}

export default Navbar;