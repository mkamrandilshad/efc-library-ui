/**
 * Theme configuration types for customizing component colors
 */

/**
 * Base theme color tokens that can be customized
 * Colors can be provided in hex format (e.g., '#1a1a1a') or HSL format (e.g., '222.2 47.4% 11.2%')
 * Hex colors will be automatically converted to HSL format internally
 */
export interface ThemeColors {
  /** Background color */
  background?: string;
  /** Foreground/text color */
  foreground?: string;
  /** Card background color */
  card?: string;
  /** Card foreground/text color */
  "card-foreground"?: string;
  /** Popover background color */
  popover?: string;
  /** Popover foreground/text color */
  "popover-foreground"?: string;
  /** Primary brand color */
  primary?: string;
  /** Primary foreground/text color */
  "primary-foreground"?: string;
  /** Secondary color */
  secondary?: string;
  /** Secondary foreground/text color */
  "secondary-foreground"?: string;
  /** Muted color */
  muted?: string;
  /** Muted foreground/text color */
  "muted-foreground"?: string;
  /** Accent color */
  accent?: string;
  /** Accent foreground/text color */
  "accent-foreground"?: string;
  /** Destructive/error color */
  destructive?: string;
  /** Destructive foreground/text color */
  "destructive-foreground"?: string;
  /** Border color */
  border?: string;
  /** Input border color */
  input?: string;
  /** Focus ring color */
  ring?: string;
  /** Chart color 1 */
  "chart-1"?: string;
  /** Chart color 2 */
  "chart-2"?: string;
  /** Chart color 3 */
  "chart-3"?: string;
  /** Chart color 4 */
  "chart-4"?: string;
  /** Chart color 5 */
  "chart-5"?: string;
  /** Sidebar background color */
  "sidebar-background"?: string;
  /** Sidebar foreground/text color */
  "sidebar-foreground"?: string;
  /** Sidebar primary color */
  "sidebar-primary"?: string;
  /** Sidebar primary foreground/text color */
  "sidebar-primary-foreground"?: string;
  /** Sidebar accent color */
  "sidebar-accent"?: string;
  /** Sidebar accent foreground/text color */
  "sidebar-accent-foreground"?: string;
  /** Sidebar border color */
  "sidebar-border"?: string;
  /** Sidebar ring color */
  "sidebar-ring"?: string;
  /** Border radius value */
  radius?: string;
}

/**
 * Props for the ThemeProvider component
 */
export interface ThemeProviderProps {
  /** Theme colors - the consuming application should handle dark/light mode switching */
  theme?: ThemeColors;
  /** Optional scope selector (e.g., a CSS class or ID) to apply theme to a specific element instead of :root */
  scope?: string;
  /** Child components */
  children: React.ReactNode;
}
