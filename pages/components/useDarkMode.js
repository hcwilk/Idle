import { useEffect, useState } from "react";

function useDarkMode() {

  const [theme, setColorTheme] = useState(
    typeof window !== "undefined" ? localStorage.theme : "light"
  );

  const colorTheme = theme === "dark" ? "light" : "dark";

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove(colorTheme);
    root.classList.add(theme);

	setColorTheme(theme)

    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  return [colorTheme, setColorTheme];
}

export default useDarkMode;