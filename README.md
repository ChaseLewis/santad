# Santad

**Svelte Ant Design** — A Svelte 5 component library inspired by [Ant Design](https://ant.design/).

📖 **[Component Demos](https://chaselewis.github.io/santad/)**

> ⚠️ **Early Development**: This library is in active development. APIs may change.

## Features

- 🎨 **Ant Design Aesthetics** — Faithful recreation of Ant Design's look and feel
- ⚡ **Svelte 5 Runes** — Built with `$state`, `$derived`, `$effect`, and Snippets
- 🌗 **Dark Mode** — Built-in light/dark theme support with system preference detection
- 🎯 **TypeScript** — Full type safety with exported types
- 🧩 **Semantic Styling** — Customize components with `classNames` and `styles` props
- 📦 **Tree-shakeable** — Import only what you need

## Installation

```bash
npm install santad
```

## Quick Start

```svelte
<script>
  import { ConfigProvider, Button, Input, Tabs, TabPane } from 'santad';
  import 'santad/styles';
</script>

<ConfigProvider>
  <Button type="primary">Click me</Button>
  
  <Input placeholder="Enter text..." />
  
  <Tabs defaultActiveKey="1">
    <TabPane key="1" label="Tab 1">
      Content of Tab 1
    </TabPane>
    <TabPane key="2" label="Tab 2">
      Content of Tab 2
    </TabPane>
  </Tabs>
</ConfigProvider>
```

## Components

| Component | Description |
|-----------|-------------|
| **Button** | Primary, default, dashed, text, and link button variants |
| **ButtonGroup** | Group buttons together |
| **Card** | Container for content with optional header/footer |
| **Checkbox** | Checkbox input with indeterminate state support |
| **Flex** | Flexbox layout component |
| **Input** | Text input with prefix/suffix support |
| **Password** | Password input with visibility toggle |
| **Search** | Search input with search button |
| **TextArea** | Multi-line text input with auto-resize |
| **Radio** | Radio button and radio group |
| **Switch** | Toggle switch |
| **Tabs** | Tabbed navigation with line, card, and editable-card types |
| **TabPane** | Individual tab pane content |

## Theming

### Dark Mode

```svelte
<ConfigProvider theme={{ mode: 'dark' }}>
  <!-- Your app -->
</ConfigProvider>
```

### System Preference

```svelte
<ConfigProvider theme={{ mode: 'system' }}>
  <!-- Automatically follows system dark/light preference -->
</ConfigProvider>
```

### Custom Theme

```svelte
<ConfigProvider 
  theme={{ 
    mode: 'light',
    token: {
      colorPrimary: '#722ed1',
      borderRadius: 8,
    }
  }}
>
  <!-- Purple-themed app -->
</ConfigProvider>
```

## Semantic Styling

Components support Ant Design 6.0-style semantic styling with `classNames` and `styles` props:

```svelte
<Button
  classNames={{
    root: 'my-button',
    icon: 'my-button-icon',
  }}
  styles={{
    root: 'font-weight: bold;',
    icon: 'color: gold;',
  }}
>
  Styled Button
</Button>

<Tabs
  classNames={{
    tab: 'custom-tab',
    tabActive: 'custom-tab-active',
    indicator: 'custom-indicator',
  }}
  styles={{
    indicator: 'background: linear-gradient(90deg, #722ed1, #eb2f96);',
  }}
>
  <TabPane key="1" label="Gradient">Custom styled tabs</TabPane>
</Tabs>
```

## Component Sizing

```svelte
<ConfigProvider size="large">
  <!-- All components will be large by default -->
  <Button>Large Button</Button>
  <Input placeholder="Large input" />
</ConfigProvider>

<!-- Or per-component -->
<Button size="small">Small</Button>
<Button size="middle">Middle</Button>
<Button size="large">Large</Button>
```

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build library
npm run package

# Type check
npm run check
```

## Project Structure

```
src/
├── lib/
│   ├── components/      # UI components
│   │   ├── button/
│   │   ├── card/
│   │   ├── checkbox/
│   │   ├── flex/
│   │   ├── input/
│   │   ├── radio/
│   │   ├── switch/
│   │   └── tabs/
│   ├── config/          # ConfigProvider and context
│   ├── styles/          # CSS variables and base styles
│   ├── theme/           # Theme tokens and utilities
│   └── utils/           # Shared utilities (wave animation, etc.)
└── routes/              # Demo pages
```

## License

MIT

