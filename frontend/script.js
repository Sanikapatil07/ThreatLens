const analyzeBtn = document.getElementById("analyzeBtn");
const messageInput = document.getElementById("messageInput");
const responseOutput = document.getElementById("responseOutput");

const analyzeTab = document.getElementById("analyzeTab");
const historyTab = document.getElementById("historyTab");
const analyzeSection = document.getElementById("analyzeSection");
const historySection = document.getElementById("historySection");

const historyContainer = document.getElementById("historyContainer");
const toggleHistoryBtn = document.getElementById("toggleHistoryBtn");
const clearHistoryBtn = document.getElementById("clearHistoryBtn");

let showAllHistory = false;
let historyData = [];

/* ---------------- ANALYZE MESSAGE ---------------- */

analyzeBtn.addEventListener("click", async () => {
  const message = messageInput.value.trim();

  if (!message) {
    responseOutput.innerHTML = `
      <div class="output-card">
        <h3>Input required</h3>
        <p>Please enter a message to analyze.</p>
      </div>
    `;
    return;
  }

  responseOutput.innerHTML = `
    <div class="output-card">
      <p>Analyzing message…</p>
    </div>
  `;

  try {
    const response = await fetch("http://localhost:5000/api/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message })
    });

    const data = await response.json();

    const finalRisk = data.finalRiskScore;

    // Determine visual class based on FINAL score
    let riskClass = "risk-low";
    if (data.riskLevel === "High") riskClass = "risk-high";
    else if (data.riskLevel === "Medium") riskClass = "risk-medium";


    responseOutput.innerHTML = `
      <div class="output-card">
        <span class="risk ${riskClass}">
          ${data.riskLevel} Risk
        </span>

        <p>${data.explanation}</p>

        <div class="risk-score">
          <strong>Phishing Risk:</strong> ${finalRisk}%
          <div class="progress-bar">
            <div class="progress-fill ${riskClass}" style="width:${finalRisk}%"></div>
          </div>
        </div>
      </div>
    `;

    // Reload history after new analysis
    loadHistory();

  } catch (error) {
    responseOutput.innerHTML = `
      <div class="output-card">
        <h3>Error</h3>
        <p>Could not connect to server. Make sure backend is running.</p>
      </div>
    `;
  }
});

/* ---------------- LOAD HISTORY ---------------- */

async function loadHistory() {
  try {
    const response = await fetch("http://localhost:5000/api/history");
    historyData = await response.json();
    renderHistory();
  } catch (error) {
    historyContainer.innerHTML = "<p>Could not load history.</p>";
  }
}

/* ---------------- RENDER HISTORY ---------------- */

function renderHistory() {
  historyContainer.innerHTML = "";

  const dataToShow = showAllHistory
    ? historyData
    : historyData.slice(0, 3);

  dataToShow.forEach(item => {
    let riskClass = "history-low";
    if (item.riskLevel === "High") riskClass = "history-high";
    else if (item.riskLevel === "Medium") riskClass = "history-medium";

    historyContainer.innerHTML += `
      <div class="history-card ${riskClass}">
        <p><strong>Message:</strong> ${item.message}</p>
        <p><strong>Risk:</strong> ${item.riskLevel}</p>
        <p><strong>Explanation:</strong> ${item.explanation}</p>
      </div>
    `;
  });
}

/* ---------------- BUTTON CONTROLS ---------------- */

toggleHistoryBtn.addEventListener("click", () => {
  showAllHistory = !showAllHistory;
  toggleHistoryBtn.textContent = showAllHistory ? "Show Less" : "Show More";
  renderHistory();
});

clearHistoryBtn.addEventListener("click", async () => {
  try {
    await fetch("http://localhost:5000/api/history", {
      method: "DELETE"
    });

    historyData = [];
    showAllHistory = false;
    toggleHistoryBtn.textContent = "Show More";
    historyContainer.innerHTML = "<p>No history available.</p>";

  } catch (error) {
    alert("Failed to clear history");
  }
});

/* ---------------- INIT ---------------- */

loadHistory();

/* ---------------- NAVBAR TAB SWITCHING ---------------- */

analyzeTab.addEventListener("click", () => {
  analyzeSection.style.display = "block";
  historySection.style.display = "none";
  analyzeTab.classList.add("active");
  historyTab.classList.remove("active");
});

historyTab.addEventListener("click", () => {
  analyzeSection.style.display = "none";
  historySection.style.display = "block";
  historyTab.classList.add("active");
  analyzeTab.classList.remove("active");
});



