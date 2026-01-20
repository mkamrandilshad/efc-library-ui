# efc-ui-library

A production-ready, reusable React UI component library based on shadcn/ui, customized for personal use and publishable to npm.

## Features

- 🎨 Built with shadcn/ui patterns
- ⚡️ TypeScript support with full type definitions
- 🎯 Tailwind CSS for styling
- 📦 ESM + CJS builds with tsup
- 🔄 React 18 compatible
- 🚀 Next.js App Router ready
- ♿️ Accessible components using Radix UI primitives

## Installation

```bash
npm install efc-ui-library
```

## Peer Dependencies

This library requires the following peer dependencies:

```bash
npm install react react-dom
```

## Setup

### 1. Import Styles

Import the CSS file in your application's entry point:

**For React (Vite):**
```tsx
// main.tsx or App.tsx
import "efc-ui-library/styles";
```

**For Next.js (App Router):**
```tsx
// app/layout.tsx
import "efc-ui-library/styles";
```

### 2. Configure Tailwind CSS

Add the library's content paths to your `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/efc-ui-library/dist/**/*.{js,mjs}",
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
    },
  },
  plugins: [],
}
```

### 3. Add CSS Variables (Optional)

If you want to customize the theme, add CSS variables to your global CSS:

```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    /* ... other variables */
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    /* ... other dark mode variables */
  }
}
```

## Usage

### Button

```tsx
import { Button } from "efc-ui-library";

function App() {
  return (
    <div>
      <Button>Default</Button>
      <Button variant="destructive">Delete</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
      <Button size="sm">Small</Button>
      <Button size="lg">Large</Button>
    </div>
  );
}
```

### Input

```tsx
import { Input } from "efc-ui-library";

function App() {
  return (
    <div>
      <Input type="email" placeholder="Email" />
      <Input type="password" placeholder="Password" />
    </div>
  );
}
```

### Dialog

```tsx
import { Button, Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "efc-ui-library";

function App() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

### Sidebar

```tsx
import { useState } from "react";
import { Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarTrigger, Button } from "efc-ui-library";

function App() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <SidebarTrigger onClick={() => setOpen(true)}>
        Open Sidebar
      </SidebarTrigger>
      <Sidebar open={open} onOpenChange={setOpen}>
        <SidebarHeader>
          <h2>Menu</h2>
        </SidebarHeader>
        <SidebarContent>
          <nav>
            <a href="#">Home</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
          </nav>
        </SidebarContent>
        <SidebarFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Close
          </Button>
        </SidebarFooter>
      </Sidebar>
    </div>
  );
}
```

### Table

#### Basic Table

```tsx
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "efc-ui-library";

function App() {
  return (
    <Table>
      <TableCaption>A list of recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">INV001</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell className="text-right">$250.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">INV002</TableCell>
          <TableCell>Pending</TableCell>
          <TableCell>PayPal</TableCell>
          <TableCell className="text-right">$150.00</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
```

#### Custom Table with Selection and Actions

```tsx
import { useState } from "react";
import {
  CustomTable,
  Button,
  DropdownMenuItem,
} from "efc-ui-library";
import type { ColumnDefinition } from "efc-ui-library";

function App() {
  const [selectedRows, setSelectedRows] = useState<boolean[]>([]);
  const [isSelectAll, setIsSelectAll] = useState(false);

  const data = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "User" },
  ];

  const columns: ColumnDefinition[] = [
    {
      key: "name",
      label: "Name",
      onSort: () => console.log("Sort by name"),
    },
    {
      key: "email",
      label: "Email",
      hideOnMobile: true,
    },
    {
      key: "role",
      label: "Role",
      type: "dropdown",
      filters: [
        { label: "All", value: "all" },
        { label: "Admin", value: "admin" },
        { label: "User", value: "user" },
      ],
      currentFilterIndex: 0,
      onFilterChange: (filter) => console.log("Filter:", filter),
    },
  ];

  const handleRowSelect = (index: number, selected: boolean) => {
    const newSelection = [...selectedRows];
    newSelection[index] = selected;
    setSelectedRows(newSelection);
  };

  const handleSelectAll = (selected: boolean) => {
    setIsSelectAll(selected);
    setSelectedRows(data.map(() => selected));
  };

  const bulkActions = (selectedCount: number) => (
    <>
      <DropdownMenuItem>Delete ({selectedCount})</DropdownMenuItem>
      <DropdownMenuItem>Export ({selectedCount})</DropdownMenuItem>
    </>
  );

  const rowActions = (row: any) => (
    <>
      <DropdownMenuItem>Edit</DropdownMenuItem>
      <DropdownMenuItem>Delete</DropdownMenuItem>
    </>
  );

  return (
    <CustomTable
      columns={columns}
      data={data}
      selectedRows={selectedRows}
      onRowSelect={handleRowSelect}
      isSelectAll={isSelectAll}
      onSelectAll={handleSelectAll}
      bulkActions={bulkActions}
      rowActions={rowActions}
      showSelection={true}
      showActions={true}
      caption="User Management"
    />
  );
}
```

### Rich Text Editor

#### Basic Rich Text Editor

```tsx
import { RichTextEditor } from "efc-ui-library";

function App() {
  const handleContentChange = (html: string) => {
    console.log("Content changed:", html);
  };

  return (
    <RichTextEditor
      onContentChange={handleContentChange}
      defaultContent="<p>Start typing...</p>"
    />
  );
}
```

#### Rich Text Editor with File Upload

```tsx
import { RichTextEditor } from "efc-ui-library";
import type { FileAttachment } from "efc-ui-library";

function App() {
  const handleFileUpload = async (file: File): Promise<FileAttachment> => {
    // Upload file to your server
    const formData = new FormData();
    formData.append("file", file);
    
    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    
    const result = await response.json();
    return {
      id: result.id,
      filename: file.name,
    };
  };

  const handleFileChange = (files: FileAttachment[]) => {
    console.log("Files attached:", files);
  };

  return (
    <RichTextEditor
      onFileUpload={handleFileUpload}
      onFileChange={handleFileChange}
      onContentChange={(html) => console.log("Content:", html)}
    />
  );
}
```

#### Rich Text Editor with Merge Fields and Templates

```tsx
import { RichTextEditor } from "efc-ui-library";
import type { MergeField, Template } from "efc-ui-library";

function App() {
  const mergeFields: MergeField[] = [
    { id: "1", label: "First Name", value: "{{firstName}}", category: "User" },
    { id: "2", label: "Last Name", value: "{{lastName}}", category: "User" },
    { id: "3", label: "Email", value: "{{email}}", category: "Contact" },
  ];

  const templates: Template[] = [
    {
      id: "1",
      name: "Welcome Email",
      content: "<p>Hello {{firstName}}, welcome to our platform!</p>",
    },
    {
      id: "2",
      name: "Password Reset",
      content: "<p>Click here to reset your password: {{resetLink}}</p>",
    },
  ];

  return (
    <RichTextEditor
      hasMergeFields={true}
      hasTemplates={true}
      mergeFields={mergeFields}
      templates={templates}
      mergeFieldFilter={(field) => field.category === "User"}
      onContentChange={(html) => console.log("Content:", html)}
    />
  );
}
```

## Development

### Build

```bash
npm run build
```

### Watch Mode

```bash
npm run dev
```

### Type Check

```bash
npm run type-check
```

## Publishing to npm

### 1. Build the Library

```bash
npm run build
```

### 2. Login to npm

```bash
npm login
```

### 3. Publish

```bash
npm publish
```

### 4. Publish with Specific Version

```bash
npm version patch  # or minor, major
npm publish
```

### 5. Publish to a Scope (Optional)

If you want to publish under a scope (e.g., `@your-username/efc-ui-library`):

1. Update `package.json`:
```json
{
  "name": "@your-username/efc-ui-library",
  ...
}
```

2. Publish:
```bash
npm publish --access public
```

### 6. Update Version and Publish

```bash
# Patch version (1.0.0 -> 1.0.1)
npm version patch && npm publish

# Minor version (1.0.0 -> 1.1.0)
npm version minor && npm publish

# Major version (1.0.0 -> 2.0.0)
npm version major && npm publish
```

## Project Structure

```
efc-ui-library/
├── src/
│   ├── components/
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── dialog.tsx
│   │   └── sidebar.tsx
│   ├── lib/
│   │   └── utils.ts
│   ├── styles/
│   │   └── index.css
│   └── index.ts
├── dist/              # Generated build output
├── tsup.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## License

MIT

## Version Compatibility

### React
- **Supported:** React 18.0.0 - 18.x.x
- **Tested against:** React 18.0.0, 18.2.0, 18.3.0
- **Future:** React 19 compatibility will be tested before release

### Node.js
- **Minimum:** Node.js 18.0.0
- **Recommended:** Node.js 20.x LTS
- **Tested against:** Node.js 18.x, 20.x, 22.x

### Update Policy
- Minor and patch updates are automatically tested via CI/CD
- Major version updates require manual testing and approval
- Breaking changes will be documented in CHANGELOG.md

## Pre-Release Checklist

- [ ] Test against latest React 18.x version
- [ ] Test against latest Node.js LTS
- [ ] Run compatibility test matrix
- [ ] Check for deprecation warnings
- [ ] Verify all peer dependencies are compatible
- [ ] Update CHANGELOG.md with compatibility notes
- [ ] Test in Next.js 13+ and 14+
- [ ] Test in Vite projects
- [ ] Verify TypeScript compilation succeeds