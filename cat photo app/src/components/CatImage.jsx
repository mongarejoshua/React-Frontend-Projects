import { useState } from 'react'

export default function CatImage({ src, alt, className = '', loading = 'lazy' }) {
  const [hasError, setHasError] = useState(false)

  if (hasError) {
    return (
      <div className={`image-fallback ${className}`} role="img" aria-label={`${alt} image unavailable`}>
        <i className="bi bi-image" aria-hidden="true" />
        <span>Photo unavailable</span>
      </div>
    )
  }

  return (
    <img
      className={className}
      src={src}
      alt={alt}
      loading={loading}
      onError={() => setHasError(true)}
    />
  )
}
