# WandPress 🪄

> WordPress admin-inspired React component library and design system. Built with **React 18/19**, **TypeScript**, **Tailwind CSS**, and **Radix UI** primitives.

[![npm version](https://img.shields.io/npm/v/wandpress.svg)](https://www.npmjs.com/package/wandpress)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/jonbuster/wandpress?style=social)](https://github.com/jonbuster/wandpress)

WandPress is a comprehensive suite of accessible, copy-pasteable React components faithful to the WordPress administration design language.

---

## 🚀 Quick Install (via npm)

```bash
npm install wandpress
```

```tsx
import { Button, CardAccordion, Select, PostsTableTemplate } from 'wandpress'
import 'wandpress/wandpress.css'
```

---

## ✨ Features

- 🎨 **Faithful WP Aesthetic**: Exact WordPress admin palette (`#2271b1` primary, `#f0f0f1` surface, `#1d2327` dark).
- ♿ **Accessible by Default**: Powered by Radix UI primitives with complete keyboard navigation, ARIA attributes, and focus management.
- 🧩 **29+ Ready Components**: Buttons, Cards, Dialogs, Dropdowns, Sheets/Drawers, Tabs, Toasts, Switches, Accordions, Media Uploaders, and a ⌘K Command Palette.
- 📄 **Full Page Admin Templates**: Interactive Posts Table with bulk actions and inline quick-edit, plus a full Settings Screen with tabbed forms.
- ⚡ **Zero Hassle**: Built with Vite and Tailwind CSS. Clean, tree-shakeable, and easily customizable.

---

## 🛠️ Local Development & Docs

```bash
# Clone the repository
git clone https://github.com/jonbuster/wandpress.git
cd wandpress

# Install dependencies
npm install

# Start local development server
npm run dev
```

Visit `http://localhost:5173/` in your browser.

---

## 📦 Components Directory

All components are located in [`src/components/ui/`](src/components/ui/):

- **Accordion** (`accordion.tsx`)
- **Alert** (`alert.tsx`)
- **Avatar** (`avatar.tsx`)
- **Badge** (`badge.tsx`)
- **Breadcrumb** (`breadcrumb.tsx`)
- **Button** (`button.tsx`)
- **Card & CardAccordion** (`card.tsx`)
- **Checkbox & CheckboxField** (`checkbox.tsx`)
- **Command Palette (⌘K)** (`command.tsx`)
- **Dashboard Grid** (`dashboard.tsx`)
- **Dialog / Modal** (`dialog.tsx`)
- **Dropdown Menu** (`dropdown-menu.tsx`)
- **Empty State** (`empty-state.tsx`)
- **Inputs & Textarea** (`input.tsx`, `textarea.tsx`)
- **Media Uploader / Dropzone** (`media-uploader.tsx`)
- **Navigation (Topbar & Sidebar)** (`topbar.tsx`, `sidebar.tsx`)
- **Pagination** (`pagination.tsx`)
- **Popover** (`popover.tsx`)
- **Progress Bar** (`progress.tsx`)
- **Radio Group & RadioField** (`radio-group.tsx`)
- **Search Input** (`search-input.tsx`)
- **Select (Custom)** (`select.tsx`)
- **Sheet / Drawer** (`sheet.tsx`)
- **Spinner & Skeleton** (`spinner.tsx`)
- **Switch / Toggle** (`switch.tsx`)
- **Table** (`table.tsx`)
- **Tabs** (`tabs.tsx`)
- **Toast & useToast** (`toast.tsx`)
- **Tooltip** (`tooltip.tsx`)
- **Welcome Banner** (`welcome-banner.tsx`)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) — free for personal and commercial use.
