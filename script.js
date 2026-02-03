document.getElementById("search").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    let query = this.value.trim();
    if (!query) return;

    if (query.startsWith("http")) {
      window.location.href = query;
      return;
    }

    if (aiMode) {
      window.open(
        "https://chatgpt.com/?q=" + encodeURIComponent(query),
        "_blank"
      );
    } else {
      window.open(
        "https://www.google.com/search?q=" + encodeURIComponent(query),
        "_blank"
      );
    }
  }
});
let aiMode = false;
const aiToggle = document.getElementById("aiToggle");

aiToggle.addEventListener("click", () => {
  aiMode = !aiMode;
  aiToggle.classList.toggle("active");
});


document.querySelectorAll(".shortcut").forEach(icon => {
    icon.addEventListener("click", () => {
      window.open(icon.dataset.url, "_blank");
      });
    });    
document.querySelector(".add-shortcut").addEventListener("click", () => {
  const name = prompt("Shortcut name:");
  if (!name) return;

  let url = prompt("Shortcut URL:");
  if (!url) return;

  if (!url.startsWith("http")) {
    url = "https://" + url;
  }

  const shortcut = document.createElement("div");
  shortcut.className = "shortcut";
  shortcut.setAttribute("data-url", url);

  shortcut.innerHTML = `
    <i class="fa-solid fa-globe"></i>
    <span>${name}</span>
  `;

  shortcut.addEventListener("click", () => {
    window.open(url, "_blank");
  });

  document.querySelector(".shortcuts")
    .insertBefore(shortcut, document.querySelector(".add-shortcut"));
});
const bgUpload = document.getElementById("bgUpload");
const editBg = document.getElementById("editBg");

editBg.addEventListener("click", () => {
  bgUpload.click();
});

bgUpload.addEventListener("change", () => {
  const file = bgUpload.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    document.body.style.background =
      `url(${reader.result}) center / cover no-repeat`;
  };
  reader.readAsDataURL(file);
});
const toggleBtn = document.getElementById("themeToggle");

// Load saved theme
const savedTheme = localStorage.getItem("theme") || "light";
document.body.classList.add(savedTheme);
toggleBtn.textContent = savedTheme === "dark" ? "☀️" : "🌙";

// Toggle theme
toggleBtn.addEventListener("click", () => {
  if (document.body.classList.contains("light")) {
    document.body.classList.replace("light", "dark");
    localStorage.setItem("theme", "dark");
    toggleBtn.textContent = "☀️";
  } else {
    document.body.classList.replace("dark", "light");
    localStorage.setItem("theme", "light");
    toggleBtn.textContent = "🌙";
  }
});

