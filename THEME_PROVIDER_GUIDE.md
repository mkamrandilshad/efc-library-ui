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
   - Provide different color schemes for light mode and dark mode
   - ThemeProvider automatically switches colors when dark mode is activated

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
        primary: '222.2 47.4% 11.2%',  // Your primary color
        'primary-foreground': '210 40% 98%',  // Text color on primary
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

```tsx
import { ThemeProvider } from 'efc-ui-library';

function App() {
  return (
    <ThemeProvider
      theme={{
        // Light mode colors
        primary: '222.2 47.4% 11.2%',
        'primary-foreground': '210 40% 98%',
        background: '0 0% 100%',
        foreground: '222.2 84% 4.9%',
      }}
      darkTheme={{
        // Dark mode colors
        primary: '210 40% 98%',
        'primary-foreground': '222.2 47.4% 11.2%',
        background: '222.2 84% 4.9%',
        foreground: '210 40% 98%',
      }}
    >
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
        background: '0 0% 100%',
        foreground: '222.2 84% 4.9%',
        
        // Primary brand colors
        primary: '222.2 47.4% 11.2%',
        'primary-foreground': '210 40% 98%',
        
        // Secondary colors
        secondary: '210 40% 96.1%',
        'secondary-foreground': '222.2 47.4% 11.2%',
        
        // Accent colors
        accent: '210 40% 96.1%',
        'accent-foreground': '222.2 47.4% 11.2%',
        
        // Muted colors
        muted: '210 40% 96.1%',
        'muted-foreground': '215.4 16.3% 46.9%',
        
        // Destructive/error colors
        destructive: '0 84.2% 60.2%',
        'destructive-foreground': '210 40% 98%',
        
        // Border and input colors
        border: '214.3 31.8% 91.4%',
        input: '214.3 31.8% 91.4%',
        ring: '222.2 84% 4.9%',
        
        // Card colors
        card: '0 0% 100%',
        'card-foreground': '222.2 84% 4.9%',
        
        // Popover colors
        popover: '0 0% 100%',
        'popover-foreground': '222.2 84% 4.9%',
        
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

**Important**: Colors must be provided in **HSL format without the `hsl()` wrapper**.

- ✅ **Correct**: `'222.2 47.4% 11.2%'`
- ❌ **Wrong**: `'hsl(222.2, 47.4%, 11.2%)'`
- ❌ **Wrong**: `'#1a1a1a'`

### How to Convert Your Colors to HSL Format

If you have a hex color like `#1a1a1a`, you can convert it:

1. **Online Tool**: Use a color converter like [HSL Color Picker](https://hslpicker.com/)
2. **CSS**: Use browser DevTools to inspect any element and see its HSL value
3. **JavaScript**: 
   ```javascript
   // Convert hex to HSL
   function hexToHsl(hex) {
     // ... conversion logic
     return `${h} ${s}% ${l}%`;
   }
   ```

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
✅ **Dark Mode Ready**: Built-in support for light/dark themes  
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
