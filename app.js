'use strict';
(() => {
  const key = 'agent90-launch-checklist-v1';
  const boxes = [...document.querySelectorAll('[data-task]')];
  const label = document.getElementById('progress-label');
  const progress = document.getElementById('progress');
  const encouragement = document.getElementById('encouragement');
  let saved = {};
  try { const value = JSON.parse(localStorage.getItem(key) || '{}'); if (value && typeof value === 'object' && !Array.isArray(value)) saved = value; } catch (_) {}
  boxes.forEach(box => { box.checked = saved[box.dataset.task] === true; });
  function render(persist) {
    const count = boxes.filter(box => box.checked).length;
    label.textContent = `${count} of ${boxes.length} complete`;
    progress.value = count;
    encouragement.textContent = count === boxes.length ? 'Checklist complete. Take a moment to review your work, then launch with confidence.' : count ? 'Good progress. Every checked step makes your launch stronger.' : 'Start with one step. Build momentum from there.';
    if (persist) {
      try { localStorage.setItem(key, JSON.stringify(Object.fromEntries(boxes.map(box => [box.dataset.task, box.checked])))); }
      catch (_) { encouragement.textContent += ' Browser storage is unavailable; progress lasts for this visit.'; }
    }
  }
  boxes.forEach(box => box.addEventListener('change', () => render(true)));
  document.getElementById('reset').addEventListener('click', () => { boxes.forEach(box => { box.checked = false; }); render(true); });
  render(false);
})();
