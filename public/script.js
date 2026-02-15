async function shortenUrl() {
  const urlInput = document.getElementById("urlInput");
  const url = urlInput.value.trim();

  if (!url) {
    alert("Please enter a URL");
    return;
  }

  try {
    const response = await fetch("/shorten", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });

    const data = await response.json();

    if (response.ok) {
      document.getElementById("shortUrl").textContent = data.shortUrl;
      const resultDiv = document.getElementById("result");
      resultDiv.style.display = "block";
      resultDiv.classList.add("show");
      document.getElementById("copyMessage").textContent = "";
    } else {
      alert("Error: " + data.error);
    }
  } catch (error) {
    alert("Error shortening URL: " + error.message);
    console.error(error);
  }
}

async function copyToClipboard() {
  const shortUrl = document.getElementById("shortUrl").textContent;

  try {
    await navigator.clipboard.writeText(shortUrl);
    document.getElementById("copyMessage").textContent =
      "✓ Copied to clipboard!";

    // Clear message after 2 seconds
    setTimeout(() => {
      document.getElementById("copyMessage").textContent = "";
    }, 2000);
  } catch (error) {
    alert("Failed to copy to clipboard");
  }
}

// Allow Enter key to submit
document.getElementById("urlInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    shortenUrl();
  }
});
