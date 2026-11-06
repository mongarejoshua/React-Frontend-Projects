import { getFieldTop } from '../utils/paintingUtils.js';

export default function PaintingCanvas({ painting, selectedId, onSelect }) {
  return (
    <div className="canvas-wrap">
      <div className="painting-canvas" style={{ backgroundColor: painting.background }} aria-label="Interactive painting preview">
        {painting.shapes.map((shape, index) => {
          return (
            <button
              type="button"
              key={shape.id}
              className={`paint-field ${selectedId === shape.id ? 'paint-field-selected' : ''}`}
              style={{
                '--field-color': shape.color,
                '--field-opacity': shape.opacity,
                '--field-radius': `${shape.radius}%`,
                left: `${shape.x}%`,
                top: `${getFieldTop(painting, shape)}%`,
                width: `${shape.width}%`,
                height: `${shape.height}%`,
                zIndex: index + 1,
                border: painting.border ? '1px solid rgba(255,244,221,.5)' : 'none',
              }}
              onClick={() => onSelect(shape.id)}
              aria-label={`Select ${shape.name}`}
              title={`${shape.name} · select to edit`}
            />
          );
        })}
        <span className="canvas-grain" />
      </div>
      <div className="canvas-meta"><span><i className="bi bi-arrows-angle-expand" /> Portrait · 4:5</span><span>{painting.shapes.length} colour fields</span></div>
    </div>
  );
}
