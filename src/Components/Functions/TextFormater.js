export const formatText = (text) => {
  // Ersetzen von ***text*** durch <strong><em>text</em></strong>
  const boldItalicText = text.replace(
    /\*\*\*(.*?)\*\*\*/g,
    "<strong><em>$1</em></strong>"
  );

  // Ersetzen von **text** durch <strong>text</strong>
  const boldText = boldItalicText.replace(
    /\*\*(.*?)\*\*/g,
    "<strong>$1</strong>"
  );

  // Ersetzen von *text* durch <em>text</em>
  const italicText = boldText.replace(/\*(.*?)\*/g, "<em>$1</em>");

  // Ersetzen von Zeilenumbrüchen (falls benötigt)
  const formattedText = italicText.replace(/\n/g, "<br />");

  return formattedText;
};
