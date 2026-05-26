import { CSSProperties } from 'react';

interface SkeletonProps {
  /** Width of the skeleton element. Defaults to 100%. */
  width?: string;
  /** Height of the skeleton element. Defaults to 14px. */
  height?: string;
  /** Additional class names to merge in. */
  className?: string;
  /** Additional inline styles (e.g. borderRadius overrides). */
  style?: CSSProperties;
}

/**
 * Skeleton
 *
 * A single skeleton placeholder element. Uses the `.skeleton` class defined
 * in globals.css which applies the shimmer animation using a CSS gradient.
 *
 * Compose multiple Skeleton elements to build skeleton versions of any UI.
 *
 * @example
 * // Text line
 * <Skeleton width="120px" height="12px" />
 *
 * // Avatar circle
 * <Skeleton width="40px" height="40px" style={{ borderRadius: '50%' }} />
 *
 * // Full-width block
 * <Skeleton height="80px" />
 */
export function Skeleton({ width = '100%', height = '14px', className = '', style }: SkeletonProps) {
  return (
    <div
      className={`skeleton ${className}`.trim()}
      style={{ width, height, ...style }}
      role="status"
      aria-label="Loading..."
      aria-busy="true"
    />
  );
}
