import useTheme from "../utils/theme/useTheme";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="rounded-lg text-xl transition bg-palette-sand dark:bg-palette-roseDark text-black dark:text-palette-mauveDark"
    >
      <i
        className={`fa-solid transition-transform duration-300 ${
          theme === "light" ? "fa-moon rotate-0" : "fa-sun rotate-180"
        }`}
      />
    </button>
  );
};

export default ThemeToggle;
