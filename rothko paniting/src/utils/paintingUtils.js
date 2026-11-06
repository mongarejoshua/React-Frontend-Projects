import { presets } from '../data/presets.js';
import { randomHex } from './colorUtils.js';

export const initialPainting = {
  title: 'Untitled No. 01',
  background: '#782f28',
  spacing: 10,
  border: false,
  shapes: presets[0].shapes.map((shape, index) => ({ ...shape, id: `shape-${index + 1}`, name: `Field ${index + 1}`, layoutOrder: index, baseColor: shape.color })),
};

const varied = (value, amount, min, max) => Math.round(Math.min(max, Math.max(min, value + (Math.random() * amount * 2 - amount))));

export function fromPreset(preset) {
  return {
    ...initialPainting,
    title: preset.name,
    background: preset.background,
    shapes: preset.shapes.map((shape, index) => ({ ...shape, id: `shape-${Date.now()}-${index}`, name: `Field ${index + 1}`, layoutOrder: index, baseColor: shape.color })),
  };
}

export function getFieldTop(painting, shape) {
  const layout = [...painting.shapes].sort((a, b) => (a.layoutOrder ?? painting.shapes.indexOf(a)) - (b.layoutOrder ?? painting.shapes.indexOf(b)));
  const position = layout.findIndex((field) => field.id === shape.id);
  const offset = (position - (layout.length - 1) / 2) * (Number(painting.spacing) || 0) / 2;
  return Math.max(0, Math.min(100 - shape.height, shape.y + offset));
}

export function makeRandomPainting() {
  const source = presets[Math.floor(Math.random() * presets.length)];
  const shapes = source.shapes.map((shape, index) => {
    const width = varied(shape.width, 10, 42, 84);
    const height = varied(shape.height, 5, 15, 34);
    const spacingOffset = (index - (source.shapes.length - 1) / 2) * 5;
    return {
      ...shape,
      id: `shape-${Date.now()}-${index}`,
      name: `Field ${index + 1}`,
      layoutOrder: index,
      x: Math.min(varied(shape.x, 6, 8, 30), 100 - width),
      y: Math.min(varied(shape.y, 5, index === 0 ? 8 : 47, index === 0 ? 39 : 75), Math.floor(100 - height - spacingOffset)),
      width,
      height,
      opacity: Number(Math.max(0.76, Math.min(1, shape.opacity + (Math.random() * 0.24 - 0.12))).toFixed(2)),
      color: Math.random() > 0.55 ? randomHex() : shape.color,
      baseColor: shape.color,
    };
  });
  return { ...fromPreset(source), title: 'A happy accident', background: Math.random() > 0.35 ? source.background : randomHex(), shapes };
}

export function createExportSvg(painting, width = 1600, height = 2000) {
  const shapes = painting.shapes.map((shape) => {
    const x = width * shape.x / 100;
    const y = height * getFieldTop(painting, shape) / 100;
    const w = width * shape.width / 100;
    const h = height * shape.height / 100;
    const radius = Math.max(0, Math.min(Number(shape.radius) || 0, 24));
    const inset = Math.min(3, Math.min(w, h) * 0.015);
    return `<rect x="${x + inset}" y="${y + inset}" width="${Math.max(0, w - inset * 2)}" height="${Math.max(0, h - inset * 2)}" rx="${w * radius / 100}" ry="${h * radius * .68 / 100}" fill="${shape.color}" fill-opacity="${shape.opacity}"${painting.border ? ` stroke="#f4e8d0" stroke-opacity=".42" stroke-width="${width * .002}"` : ''}/>`;
  }).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><defs><filter id="grain"><feTurbulence type="fractalNoise" baseFrequency=".7" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="table" tableValues="0 .055"/></feComponentTransfer><feBlend in="SourceGraphic" mode="soft-light"/></filter></defs><rect width="100%" height="100%" fill="${painting.background}"/>${shapes}<rect width="100%" height="100%" filter="url(#grain)" opacity=".34" style="mix-blend-mode:soft-light"/></svg>`;
}
