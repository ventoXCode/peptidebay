/* ─────────────────────────────────────────────
   PeptideBay – script.js
   Search, filter, and modal logic
───────────────────────────────────────────── */

const ICONS = {
  peptide: "🧬",
  supplement: "💊",
};

const SUBCATEGORY_ICONS = {
  "Healing & Recovery": "🔬",
  "Anti-Aging & Skin": "✨",
  "Growth Hormone": "📈",
  "Sexual Health": "❤️",
  "Nootropic & Mental Health": "🧠",
  "Anti-Aging & Longevity": "⏳",
  "Metabolic & Performance": "⚡",
  "Immune Support": "🛡️",
  "Hormonal & Reproductive": "🔄",
  "Performance & Strength": "💪",
  "Protein & Amino Acids": "🥩",
  "Minerals & Electrolytes": "⚗️",
  Vitamins: "🌟",
  "Essential Fats": "🐟",
  "Adaptogens & Herbs": "🌿",
  "Nootropics & Cognitive": "🧠",
  "Metabolic & Blood Sugar": "🩸",
  "Cellular Energy": "⚡",
  Antioxidants: "🛡️",
  "Sleep & Recovery": "🌙",
  "Structural & Joint": "🦴",
  "Gut Health": "🫀",
};

function getEvidenceLevel(text) {
  if (!text) return "default";
  const t = text.toLowerCase();
  if (t.includes("grade a") || t.includes("extremely well") || t.includes("very strong") || t.includes("strong"))
    return "strong";
  if (t.includes("moderate") || t.includes("good")) return "moderate";
  if (t.includes("emerging") || t.includes("growing")) return "emerging";
  if (t.includes("preclinical") || t.includes("animal") || t.includes("research phase")) return "preclinical";
  return "default";
}

function evidenceLabel(level) {
  const map = {
    strong: "Strong Evidence",
    moderate: "Moderate Evidence",
    emerging: "Emerging Evidence",
    preclinical: "Preclinical",
    default: "Research Stage",
  };
  return map[level] || "Research Stage";
}

function getIcon(item) {
  return SUBCATEGORY_ICONS[item.subcategory] || ICONS[item.category] || "💊";
}

function buildTagHTML(tags) {
  return tags
    .slice(0, 5)
    .map((t) => `<span class="tag">${t}</span>`)
    .join("");
}

function buildCardHTML(item) {
  const evidenceField = item.evidence || item.researchStatus || "";
  const level = getEvidenceLevel(evidenceField);
  const icon = getIcon(item);
  const dosageLabel = "Dosage";
  const benefitsPreview = item.benefits
    .slice(0, 3)
    .map((b) => `<li>${b}</li>`)
    .join("");

  return `
    <article class="card" data-id="${item.id}" tabindex="0" role="button" aria-label="View details for ${item.name}">
      <div class="card-header">
        <div class="card-icon ${item.category}">${icon}</div>
        <div class="card-title">
          <h3>${item.name}</h3>
          ${item.fullName ? `<div class="full-name">${item.fullName}</div>` : ""}
        </div>
        <span class="type-badge ${item.category}">${item.category}</span>
      </div>
      <div class="subcategory-label">${item.subcategory}</div>
      <p class="card-desc">${item.description}</p>
      <ul class="card-benefits-preview">${benefitsPreview}</ul>
      <div class="card-dosage">
        <strong>${dosageLabel}</strong>
        ${item.dosage}
      </div>
      <div class="tags">${buildTagHTML(item.tags)}</div>
      <div class="card-footer">
        <span class="evidence-badge ${level}">${evidenceLabel(level)}</span>
        <span class="read-more">View details →</span>
      </div>
    </article>`;
}

function buildModalHTML(item) {
  const evidenceField = item.evidence || item.researchStatus || "";
  const level = getEvidenceLevel(evidenceField);
  const icon = getIcon(item);
  const benefitsHTML = item.benefits.map((b) => `<li>${b}</li>`).join("");
  const sideEffectsHTML = item.sideEffects.map((s) => `<li>${s}</li>`).join("");
  const allTagsHTML = item.tags.map((t) => `<span class="tag">${t}</span>`).join("");

  const extraInfoRows = [];
  if (item.halfLife) {
    extraInfoRows.push(`<div class="info-item"><div class="label">Half-Life</div><div class="value">${item.halfLife}</div></div>`);
  }
  if (item.timing) {
    extraInfoRows.push(`<div class="info-item"><div class="label">Best Timing</div><div class="value">${item.timing}</div></div>`);
  }

  return `
    <div class="modal-overlay" id="modalOverlay" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
      <div class="modal">
        <div class="modal-header">
          <div class="modal-icon ${item.category}">${icon}</div>
          <div class="modal-title-wrap">
            <h2 id="modalTitle">${item.name}</h2>
            ${item.fullName ? `<div class="modal-full-name">${item.fullName}</div>` : ""}
            <div class="modal-badges">
              <span class="type-badge ${item.category}">${item.category}</span>
              <span class="subcategory-label">${item.subcategory}</span>
            </div>
          </div>
          <button class="modal-close" id="modalClose" aria-label="Close dialog">&times;</button>
        </div>
        <div class="modal-body">
          <div class="modal-section">
            <h4>Overview</h4>
            <p>${item.description}</p>
          </div>
          <div class="modal-section">
            <h4>Benefits</h4>
            <ul class="benefits">${benefitsHTML}</ul>
          </div>
          <div class="modal-section">
            <h4>Dosage &amp; Administration</h4>
            <div class="info-grid">
              <div class="info-item" style="grid-column: 1 / -1">
                <div class="label">Recommended Dosage</div>
                <div class="value">${item.dosage}</div>
              </div>
              ${extraInfoRows.join("")}
            </div>
          </div>
          <div class="modal-section">
            <h4>Potential Side Effects</h4>
            <ul class="effects">${sideEffectsHTML}</ul>
          </div>
          <div class="modal-section">
            <h4>Research &amp; Evidence</h4>
            <div class="research-banner">
              <strong>Research Status</strong>
              ${evidenceField}
            </div>
          </div>
          <div class="modal-section">
            <h4>Tags</h4>
            <div class="tags">${allTagsHTML}</div>
          </div>
        </div>
      </div>
    </div>`;
}

/* ─── State ─── */
let currentFilter = "all";
let currentCategory = "all";
let currentSearch = "";

function filteredItems() {
  return allData.filter((item) => {
    const matchType =
      currentFilter === "all" ||
      item.category === currentFilter;
    const matchCategory =
      currentCategory === "all" ||
      item.subcategory === currentCategory;
    const q = currentSearch.toLowerCase();
    const matchSearch =
      !q ||
      item.name.toLowerCase().includes(q) ||
      (item.fullName || "").toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.tags.some((t) => t.toLowerCase().includes(q)) ||
      item.subcategory.toLowerCase().includes(q) ||
      item.benefits.some((b) => b.toLowerCase().includes(q));
    return matchType && matchCategory && matchSearch;
  });
}

function renderGrid() {
  const grid = document.getElementById("grid");
  const countEl = document.getElementById("resultsCount");
  const items = filteredItems();
  countEl.textContent = `${items.length} result${items.length !== 1 ? "s" : ""}`;

  if (items.length === 0) {
    grid.innerHTML = `
      <div class="no-results">
        <h3>No results found</h3>
        <p>Try a different search term or clear your filters.</p>
      </div>`;
    return;
  }
  grid.innerHTML = items.map(buildCardHTML).join("");

  grid.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", () => openModal(card.dataset.id));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") openModal(card.dataset.id);
    });
  });
}

function openModal(id) {
  const item = allData.find((d) => d.id === id);
  if (!item) return;
  document.body.insertAdjacentHTML("beforeend", buildModalHTML(item));
  const overlay = document.getElementById("modalOverlay");
  document.getElementById("modalClose").addEventListener("click", closeModal);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener("keydown", handleEsc);
  document.body.style.overflow = "hidden";
  document.getElementById("modalClose").focus();
}

function closeModal() {
  const overlay = document.getElementById("modalOverlay");
  if (overlay) overlay.remove();
  document.body.style.overflow = "";
  document.removeEventListener("keydown", handleEsc);
}

function handleEsc(e) {
  if (e.key === "Escape") closeModal();
}

/* ─── Populate category dropdown ─── */
function populateCategoryFilter() {
  const select = document.getElementById("categoryFilter");
  const categories = [...new Set(allData.map((d) => d.subcategory))].sort();
  categories.forEach((cat) => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    select.appendChild(opt);
  });
}

/* ─── Init ─── */
document.addEventListener("DOMContentLoaded", () => {
  populateCategoryFilter();
  renderGrid();

  /* Search */
  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", (e) => {
    currentSearch = e.target.value;
    renderGrid();
  });

  /* Type filter buttons */
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentFilter = btn.dataset.filter;
      renderGrid();
    });
  });

  /* Category dropdown */
  document.getElementById("categoryFilter").addEventListener("change", (e) => {
    currentCategory = e.target.value;
    renderGrid();
  });
});
