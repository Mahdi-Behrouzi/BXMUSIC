// pages/home.js — placeholder
export function renderHome(root, tracks) {
  // simple rendering example
  if (!root) return;
  const el = root.querySelector('#madeForYou');
  if (el) el.innerHTML = '<div style="padding:12px;color:var(--faint)">Home scaffold ready</div>';
}
