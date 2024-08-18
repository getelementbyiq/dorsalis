export const loadGoogleFont = async (fontName) => {
  const fontUrl = `https://fonts.googleapis.com/css2?family=${fontName.replace(
    / /g,
    "+"
  )}&display=swap`;

  try {
    const response = await fetch(fontUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch font: ${response.statusText}`);
    }
    const css = await response.text();
    const style = document.createElement("style");
    style.textContent = css;
    document.head.append(style);
    console.log(`Font ${fontName} has been loaded.`);
  } catch (error) {
    console.error(`Failed to load font ${fontName}:`, error);
  }
};
