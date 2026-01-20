# ThemeProvider Implementation - Client Guide


## What is ThemeProvider?

ThemeProvider is a React component that lets you set custom colors for your entire UI library. Instead of modifying CSS files or individual components, you can pass your brand colors to ThemeProvider, and all components (buttons, cards, inputs, etc.) will automatically use those colors.

---

## What Can You Do With ThemeProvider?

### 1. **Customize Primary Brand Colors**
   - Set your main brand color (primary)
   - All buttons, links, and primary UI elements will use this color

### 2. **Customize All Theme Colors**
   - Background colors
   - Text/foreground colors
   - Secondary colors
   - Accent colors
   - Destructive/error colors
   - Border colors
   - And many more...

### 3. **Support Light and Dark Modes**
   - Handle dark/light mode switching in your application
   - Pass the appropriate theme based on the current mode
   - ThemeProvider will apply whichever theme you pass

### 4. **Apply to Specific Sections (Optional)**
   - Apply theme to the entire app (default)
   - Or scope it to specific sections using the `scope` prop

---

## How to Use ThemeProvider

### Basic Usage

```tsx
import { ThemeProvider } from 'efc-ui-library';

function App() {
  return (
    <ThemeProvider
      theme={{
        primary: '#1a1a1a',  // Your primary color (hex format)
        'primary-foreground': '#f5f5f5',  // Text color on primary
        // Add more colors as needed
      }}
    >
      {/* Your app components */}
      <YourApp />
    </ThemeProvider>
  );
}
```

### With Dark Mode Support

ThemeProvider accepts a single `theme` prop. To support dark/light mode, handle the mode switching in your application and pass the appropriate theme:

```tsx
import { ThemeProvider } from 'efc-ui-library';
import { useTheme } from 'next-themes'; // or your theme hook

function App() {
  const { theme: mode } = useTheme(); // 'light' or 'dark'
  
  const lightTheme = {
    primary: '#1a1a1a',
    'primary-foreground': '#f5f5f5',
    background: '#ffffff',
    foreground: '#0a0a0a',
  };
  
  const darkTheme = {
    primary: '#f5f5f5',
    'primary-foreground': '#1a1a1a',
    background: '#0a0a0a',
    foreground: '#f5f5f5',
  };
  
  return (
    <ThemeProvider theme={mode === 'dark' ? darkTheme : lightTheme}>
      <YourApp />
    </ThemeProvider>
  );
}
```

### Complete Example with All Colors

```tsx
import { ThemeProvider } from 'efc-ui-library';

function App() {
  return (
    <ThemeProvider
      theme={{
        // Base colors
        background: '#ffffff',
        foreground: '#0a0a0a',
        
        // Primary brand colors
        primary: '#1a1a1a',
        'primary-foreground': '#f5f5f5',
        
        // Secondary colors
        secondary: '#f0f0f0',
        'secondary-foreground': '#1a1a1a',
        
        // Accent colors
        accent: '#f0f0f0',
        'accent-foreground': '#1a1a1a',
        
        // Muted colors
        muted: '#f0f0f0',
        'muted-foreground': '#737373',
        
        // Destructive/error colors
        destructive: '#ef4444',
        'destructive-foreground': '#f5f5f5',
        
        // Border and input colors
        border: '#e5e5e5',
        input: '#e5e5e5',
        ring: '#0a0a0a',
        
        // Card colors
        card: '#ffffff',
        'card-foreground': '#0a0a0a',
        
        // Popover colors
        popover: '#ffffff',
        'popover-foreground': '#0a0a0a',
        
        // Border radius
        radius: '0.5rem',
      }}
    >
      <YourApp />
    </ThemeProvider>
  );
}
```

---

## Color Format

**Important**: Colors should be provided in **hex format** (e.g., `'#1a1a1a'`).

- ✅ **Correct**: `'#1a1a1a'` (hex format - recommended)
- ✅ **Also Accepted**: `'222.2 47.4% 11.2%'` (HSL format - will work but hex is preferred)
- ❌ **Wrong**: `'hsl(222.2, 47.4%, 11.2%)'` (with hsl() wrapper)

### Supported Hex Formats

You can use any of these hex formats:
- `'#1a1a1a'` - Standard 6-digit hex
- `'#1a1'` - Short 3-digit hex (will be expanded to `#11aa11`)
- `'#1a1a1aff'` - 8-digit hex with alpha (alpha channel is ignored)

### Why Hex Format?

Hex colors are:
- ✅ More familiar and commonly used
- ✅ Easy to copy from design tools (Figma, Sketch, etc.)
- ✅ Automatically converted to HSL internally
- ✅ No conversion needed on your end

---

## Available Color Properties

You can customize any of these color properties:

| Property | Description |
|----------|-------------|
| `background` | Main background color |
| `foreground` | Main text color |
| `primary` | Primary brand color |
| `primary-foreground` | Text color on primary backgrounds |
| `secondary` | Secondary color |
| `secondary-foreground` | Text color on secondary backgrounds |
| `accent` | Accent color |
| `accent-foreground` | Text color on accent backgrounds |
| `muted` | Muted/subtle color |
| `muted-foreground` | Text color on muted backgrounds |
| `destructive` | Error/destructive action color |
| `destructive-foreground` | Text color on destructive backgrounds |
| `border` | Border color |
| `input` | Input border color |
| `ring` | Focus ring color |
| `card` | Card background color |
| `card-foreground` | Card text color |
| `popover` | Popover background color |
| `popover-foreground` | Popover text color |
| `radius` | Border radius value (e.g., `'0.5rem'`) |
| `chart-1` through `chart-5` | Chart colors |
| `sidebar-*` | Sidebar-specific colors |

**Note**: All properties are optional. You only need to provide the colors you want to customize.



## Benefits

✅ **Centralized Theming**: Change all component colors from one place  
✅ **Type-Safe**: Full TypeScript support with autocomplete  
✅ **Flexible**: Only override the colors you need  
✅ **Dark Mode Ready**: Easy to integrate with your dark/light mode system  
✅ **No CSS Changes**: No need to modify CSS files or component styles  
✅ **Automatic Updates**: All components automatically use your theme colors  

---

## Technical Details

- **Component Name**: `ThemeProvider`
- **Location**: Exported from `efc-ui-library`
- **Type Exports**: `ThemeColors`, `ThemeProviderProps` (for TypeScript)
- **Implementation**: Uses CSS custom properties (CSS variables) under the hood
- **Compatibility**: Works with all existing components in the library

---

## Support

If you encounter any issues or need help customizing your theme, please reach out with:
1. The error message (if any)
2. Your ThemeProvider configuration
3. The component that's not updating as expected

---

**Last Updated**: ThemeProvider is fully implemented and ready for use in version 1.0.0 of efc-ui-library.
