import * as React from "react";
import type { ThemeProviderProps, ThemeColors } from "@/lib/theme";

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
    if (value !== undefined) {
      const cssVariableName = `--${key}`;
      if (targetElement instanceof HTMLElement) {
        targetElement.style.setProperty(cssVariableName, value);
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
 *     primary: '222.2 47.4% 11.2%',
 *     'primary-foreground': '210 40% 98%',
 *   }}
 *   darkTheme={{
 *     primary: '210 40% 98%',
 *     'primary-foreground': '222.2 47.4% 11.2%',
 *   }}
 * >
 *   <App />
 * </ThemeProvider>
 * ```
 */
export function ThemeProvider({
  theme,
  darkTheme,
  scope,
  children,
}: ThemeProviderProps) {
  // Apply light theme to :root (always applied)
  React.useEffect(() => {
    if (typeof document === "undefined") return;
    applyTheme(theme, scope);

    return () => {
      removeTheme(theme, scope);
    };
  }, [theme, scope]);

  // Apply dark theme when dark mode is active (overrides light theme)
  React.useEffect(() => {
    if (!darkTheme || typeof document === "undefined") return;

    const updateTheme = () => {
      const isDark =
        document.documentElement.classList.contains("dark") ||
        document.documentElement.getAttribute("data-theme") === "dark";

      if (isDark) {
        // Apply dark theme variables (will override light theme)
        applyTheme(darkTheme, scope);
      } else {
        // Remove dark theme variables (light theme will show through)
        removeTheme(darkTheme, scope);
      }
    };

    // Check initial state
    updateTheme();

    // Watch for dark mode changes
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });

    return () => {
      observer.disconnect();
      removeTheme(darkTheme, scope);
    };
  }, [darkTheme, scope]);

  return <>{children}</>;
}
