async function translateText() {
  const text = document.getElementById("inputText").value.trim();
  const target = document.getElementById("targetLanguage").value;
  const output = document.getElementById("translationResult");
  const loading = document.getElementById("loading");

  if (!text) {
    alert("Enter text to translate!");
    return;
  }

  loading.style.display = "block";
  output.textContent = "";

  try {
    const url =
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${target}&dt=t&q=${encodeURIComponent(text)}`;

    const response = await fetch(url);
    if (!response.ok) throw new Error("Network response not OK");

    const data = await response.json();
    // Extract translated text
    const result = Array.isArray(data[0])
      ? data[0].map(item => item[0]).join(" ")
      : "";
    output.textContent = result || "Translation not found.";
  } catch (error) {
    console.error(error);
    output.textContent = "Error during translation.";
  } finally {
    loading.style.display = "none";
  }
}
