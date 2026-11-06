export function normalizeHex(value) {
  const raw = value.trim().replace(/^#/, '');
  const expanded = raw.length === 3 ? raw.split('').map((part) => part + part).join('') : raw;
  return /^[\da-fA-F]{6}$/.test(expanded) ? `#${expanded.toLowerCase()}` : null;
}

export function hexToRgb(hex) {
  const normalized = normalizeHex(hex);
  if (!normalized) return null;
  const value = normalized.slice(1);
  return {
    r: Number.parseInt(value.slice(0, 2), 16),
    g: Number.parseInt(value.slice(2, 4), 16),
    b: Number.parseInt(value.slice(4, 6), 16),
  };
}

export function randomHex() {
  return `#${Math.floor(Math.random() * 0x1000000).toString(16).padStart(6, '0')}`;
}
