import * as React from "react";
import type { ThemeProviderProps, ThemeColors } from "@/lib/theme";

/**
 * Converts hex color to HSL format (without hsl() wrapper)
 * Accepts formats: #rgb, #rrggbb, #rrggbbaa
 */
function hexToHsl(hex: string): string {
  // Remove # if present
  hex = hex.replace("#", "");

  // Handle 3-digit hex
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((char) => char + char)
      .join("");
  }

  // Parse RGB values
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  // Find min and max
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  // Convert to percentages and round
  h = Math.round(h * 360 * 10) / 10;
  s = Math.round(s * 100 * 10) / 10;
  const lPercent = Math.round(l * 100 * 10) / 10;

  return `${h} ${s}% ${lPercent}%`;
}

/**
 * Converts a color value to HSL format if needed
 * Accepts hex (#1a1a1a) or HSL (222.2 47.4% 11.2%) format
 */
function normalizeColor(color: string | undefined): string {
  if (!color) return "";
  
  // If it's already HSL format (contains %), return as is
  if (color.includes("%")) {
    return color;
  }

  // If it's a hex color, convert it
  if (color.startsWith("#")) {
    return hexToHsl(color);
  }

  // If it's radius or other non-color value, return as is
  return color;
}

/**
 * Applies CSS variables to the specified scope element
 */
function applyTheme(
  theme: ThemeColors | undefined,
  scope: string | undefined
): void {
  if (!theme) return;

  const targetElement = scope
    ? document.querySelector(scope)
    : document.documentElement;

  if (!targetElement) {
    console.warn(
      `ThemeProvider: Could not find element with selector "${scope}". Applying theme to :root instead.`
    );
    return;
  }

  // Apply each theme color as a CSS variable
  Object.entries(theme).forEach(([key, value]) => {
    if (value !== undefined && typeof value === "string") {
      const cssVariableName = `--${key}`;
      if (targetElement instanceof HTMLElement) {
        // Convert hex to HSL if needed (except for radius which is not a color)
        const normalizedValue =
          key === "radius" ? value : normalizeColor(value);
        targetElement.style.setProperty(cssVariableName, normalizedValue);
      }
    }
  });
}

/**
 * Removes CSS variables from the specified scope element
 */
function removeTheme(
  theme: ThemeColors | undefined,
  scope: string | undefined
): void {
  if (!theme) return;

  const targetElement = scope
    ? document.querySelector(scope)
    : document.documentElement;

  if (!targetElement) return;

  // Remove each theme color CSS variable
  Object.keys(theme).forEach((key) => {
    const cssVariableName = `--${key}`;
    if (targetElement instanceof HTMLElement) {
      targetElement.style.removeProperty(cssVariableName);
    }
  });
}

/**
 * ThemeProvider component that applies custom theme colors to all components
 * 
 * @example
 * ```tsx
 * <ThemeProvider
 *   theme={{
 *     primary: '#1a1a1a',
 *     'primary-foreground': '#f5f5f5',
 *   }}
 * >
 *   <App />
 * </ThemeProvider>
 * ```
 */
export function ThemeProvider({
  theme,
  scope,
  children,
}: ThemeProviderProps) {
  // Apply theme to :root
  React.useEffect(() => {
    if (typeof document === "undefined") return;
    applyTheme(theme, scope);

    return () => {
      removeTheme(theme, scope);
    };
  }, [theme, scope]);

  return <>{children}</>;
}
