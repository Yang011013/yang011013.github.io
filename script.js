"use strict";

const citations = {
  scout: {
    label: "SCOUT · ACM Multimedia 2026 (arXiv citation)",
    bib: `@misc{zhong2026scout,
  title = {{SCOUT}: Self-Checking and Recovery-Aware Tool-Thought Agents for Ultra-Long Egocentric Video Reasoning},
  author = {Keyang Zhong and Kuo Wang and Peng Liu and Quanlong Zheng and Junlin Xie and Zhijia Liang and Yanhao Zhang and Guanbin Li},
  year = {2026},
  eprint = {2608.07959},
  archivePrefix = {arXiv},
  note = {Accepted at ACM Multimedia 2026},
  url = {https://arxiv.org/abs/2608.07959}
}`
  },
  streamspatial: {
    label: "StreamSpatial · ECCV 2026",
    bib: `@inproceedings{xie2026streamspatial,
  title = {{StreamSpatial}: A Benchmark and Framework for Streaming 3D Visual-Spatial Reasoning},
  author = {Junlin Xie and Keyang Zhong and Quanlong Zheng and Ruifei Zhang and Kuo Wang and Yanhao Zhang and Haonan Lu and Xiang Wan and Guanbin Li},
  booktitle = {European Conference on Computer Vision},
  year = {2026},
  url = {https://guanbinli.com/papers/SpatialStream_ECCV26.pdf}
}`
  },
  multiagent: {
    label: "Collaborative Multi-Agent Scripts Generation · ACL 2026 Findings",
    bib: `@inproceedings{zhong-etal-2026-collaborative,
  title = {Collaborative Multi-Agent Scripts Generation for Enhancing Imperfect-Information Reasoning in Murder Mystery Games},
  author = {Zhong, Keyang and Xie, Junlin and Wu, Hefeng and Li, Haofeng and Li, Guanbin},
  booktitle = {Findings of the Association for Computational Linguistics: ACL 2026},
  year = {2026},
  month = jul,
  publisher = {Association for Computational Linguistics},
  pages = {15796--15819},
  doi = {10.18653/v1/2026.findings-acl.774},
  url = {https://aclanthology.org/2026.findings-acl.774/}
}`
  }
};

let language = "en";
let activeFilter = "all";
let toastTimer;
let lastCitationTrigger = null;
const dialog = document.getElementById("citation-dialog");
const citationText = document.getElementById("citation-text");
const languageButton = document.getElementById("language-toggle");

function updateFilterStatus() {
  const count = [...document.querySelectorAll(".publication")].filter(p => !p.hidden).length;
  document.getElementById("filter-status").textContent = language === "en" ? `Showing ${count} publications.` : `正在显示 ${count} 篇论文。`;
}

function setLanguage(next) {
  language = next === "zh" ? "zh" : "en";
  document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  document.querySelectorAll("[data-en][data-zh]").forEach(element => {
    // Heading decoration is reconstructed after the text changes.
    element.textContent = element.dataset[language];
  });
  const heading = document.getElementById("publications-title");
  const flower = document.createElement("span");
  flower.className = "title-flower";
  flower.setAttribute("aria-hidden", "true");
  flower.textContent = "✧";
  heading.append(flower);
  languageButton.querySelector(".language-en").classList.toggle("selected", language === "en");
  languageButton.querySelector(".language-zh").classList.toggle("selected", language === "zh");
  languageButton.setAttribute("aria-label", language === "en" ? "切换为中文" : "Switch to English");
  document.getElementById("copy-email").setAttribute("aria-label", language === "en" ? "Copy email address" : "复制邮箱地址");
  document.getElementById("copy-email").title = language === "en" ? "Copy email" : "复制邮箱";
  document.getElementById("close-citation").setAttribute("aria-label", language === "en" ? "Close citation" : "关闭引用");
  updateFilterStatus();
  try { localStorage.setItem("keyang-homepage-language", language); } catch (_) { /* Preferences are optional. */ }
}

function applyFilter(filter) {
  activeFilter = filter;
  document.querySelectorAll(".filter").forEach(button => {
    const selected = button.dataset.filter === filter;
    button.classList.toggle("active", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
  document.querySelectorAll(".publication").forEach(paper => {
    paper.hidden = filter !== "all" && !paper.dataset.topics.split(" ").includes(filter);
  });
  updateFilterStatus();
}

function showToast(message) {
  clearTimeout(toastTimer);
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("visible");
  toastTimer = setTimeout(() => toast.classList.remove("visible"), 2600);
}

async function copyText(text, message) {
  try {
    if (!navigator.clipboard?.writeText) throw new Error("Clipboard API unavailable");
    await navigator.clipboard.writeText(text);
  } catch (_) {
    // Keep copying usable when the exported website is opened directly from disk.
    const input = document.createElement("textarea");
    input.value = text;
    input.setAttribute("readonly", "");
    input.style.cssText = "position:fixed;opacity:0;top:0;left:0;";
    (dialog.open ? dialog : document.body).append(input);
    input.select();
    const copied = document.execCommand("copy");
    input.remove();
    if (!copied) {
      showToast(language === "en" ? "Please select the text and copy it manually." : "请选中文字后手动复制。");
      return false;
    }
  }
  showToast(message);
  return true;
}

languageButton.addEventListener("click", () => setLanguage(language === "en" ? "zh" : "en"));
document.querySelectorAll(".filter").forEach(button => button.addEventListener("click", () => applyFilter(button.dataset.filter)));
document.querySelectorAll("[data-cite]").forEach(button => button.addEventListener("click", () => {
  const citation = citations[button.dataset.cite];
  lastCitationTrigger = button;
  document.getElementById("citation-label").textContent = citation.label;
  citationText.textContent = citation.bib;
  dialog.showModal();
}));
document.getElementById("close-citation").addEventListener("click", () => dialog.close());
dialog.addEventListener("close", () => lastCitationTrigger?.focus());
dialog.addEventListener("click", event => {
  const box = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom)) dialog.close();
});
document.getElementById("copy-citation").addEventListener("click", async () => {
  const copied = await copyText(citationText.textContent, language === "en" ? "BibTeX copied. Happy writing!" : "BibTeX 已复制，写作顺利！");
  if (copied) {
    const label = document.querySelector("#copy-citation span");
    label.textContent = language === "en" ? "Copied!" : "已复制！";
    setTimeout(() => { label.textContent = label.dataset[language]; }, 2200);
  }
});
document.getElementById("copy-email").addEventListener("click", () => copyText("zhongky23@mail2.sysu.edu.cn", language === "en" ? "Email address copied." : "邮箱地址已复制。"));

// An anchor to a particular paper always reveals it, even after filtering.
function revealLinkedPaper() {
  const id = decodeURIComponent(location.hash.slice(1));
  if (!id.startsWith("paper-")) return;
  const paper = document.getElementById(id);
  if (paper?.hidden) {
    applyFilter("all");
    requestAnimationFrame(() => paper.scrollIntoView({ behavior: "auto", block: "start" }));
  }
}
window.addEventListener("hashchange", revealLinkedPaper);
document.querySelectorAll('a[href^="#paper-"]').forEach(link => link.addEventListener("click", () => {
  const paper = document.getElementById(link.hash.slice(1));
  if (paper?.hidden) applyFilter("all");
}));

if ("IntersectionObserver" in window) {
  const navLinks = [...document.querySelectorAll(".main-nav a")];
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => {
        const current = link.hash === `#${entry.target.id}`;
        link.classList.toggle("current", current);
        if (current) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    });
  }, { rootMargin: "-12% 0px -65% 0px", threshold: 0 });
  document.querySelectorAll("#about, #publications, #projects, #contact").forEach(section => sectionObserver.observe(section));
}

try {
  const saved = localStorage.getItem("keyang-homepage-language");
  if (saved === "zh") setLanguage("zh");
} catch (_) { /* No persistence is needed to use the website. */ }
revealLinkedPaper();
