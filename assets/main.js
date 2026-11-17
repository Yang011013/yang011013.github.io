'use strict';

// Progressive enhancement: the complete homepage stays readable without JS.
const filters = document.querySelector('.filters');
const papers = [...document.querySelectorAll('.pub-row')];
const filterStatus = document.querySelector('#filter-status');
if (filters) {
  filters.hidden = false;
  const allCount = filters.querySelector('[data-filter="all"] span');
  if (allCount) allCount.textContent = String(papers.length);
  filters.addEventListener('click', event => {
    const button = event.target.closest('button[data-filter]');
    if (!button) return;
    const selected = button.dataset.filter;
    let visible = 0;
    for (const paper of papers) {
      const matches = selected === 'all' || paper.dataset.category.split(' ').includes(selected);
      paper.hidden = !matches;
      if (matches) visible += 1;
    }
    for (const option of filters.querySelectorAll('button')) {
      option.setAttribute('aria-pressed', String(option === button));
    }
    filterStatus.textContent = `Showing ${visible} of ${papers.length} publications.`;
  });
}

let toastTimer;
function notify(message) {
  const toast = document.querySelector('.toast');
  window.clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add('visible');
  toastTimer = window.setTimeout(() => toast.classList.remove('visible'), 3000);
}

async function copyText(value) {
  if (navigator.clipboard && window.isSecureContext) {
    try { await navigator.clipboard.writeText(value); return true; } catch (_) { /* use local fallback */ }
  }
  const input = document.createElement('textarea');
  input.value = value;
  input.setAttribute('readonly', '');
  input.style.position = 'fixed';
  input.style.left = '-10000px';
  document.body.append(input);
  const focused = document.activeElement;
  input.select();
  let copied = false;
  try { copied = document.execCommand('copy'); } catch (_) { copied = false; }
  input.remove();
  if (focused instanceof HTMLElement) focused.focus({ preventScroll: true });
  return copied;
}

for (const button of document.querySelectorAll('.copy-citation')) {
  button.addEventListener('click', async () => {
    const content = button.closest('.citation').querySelector('code').textContent;
    const copied = await copyText(content);
    notify(copied ? 'Citation copied ♡' : 'Please select the citation text and copy it.');
  });
}

const emailButton = document.querySelector('[data-copy-email]');
if (emailButton) {
  emailButton.hidden = false;
  emailButton.addEventListener('click', async () => {
    const address = emailButton.parentElement.querySelector('a').getAttribute('href').replace(/^mailto:/, '');
    const copied = await copyText(address);
    notify(copied ? 'Email address copied ♡' : 'Please select the email address and copy it.');
  });
}

const navLinks = [...document.querySelectorAll('.main-nav a')];
const sections = navLinks.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
let navFrame = false;
function updateNavigation() {
  navFrame = false;
  const threshold = document.querySelector('.site-header').getBoundingClientRect().height + 40;
  let current = sections[0];
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= threshold) current = section;
  }
  if (!current) return;
  for (const link of navLinks) {
    const active = link.getAttribute('href') === `#${current.id}`;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
  }
}
function scheduleNavigation() {
  if (!navFrame) { navFrame = true; window.requestAnimationFrame(updateNavigation); }
}
window.addEventListener('scroll', scheduleNavigation, { passive: true });
window.addEventListener('resize', scheduleNavigation, { passive: true });
updateNavigation();
