# react-beauty-link

A React hook that automatically converts URLs in text into beautiful, clickable links with page titles, favicons, and file type icons.

## Features

- 🔗 **Automatic URL Detection** - Finds and converts HTTPS URLs in text
- 🎨 **Beautiful Link Previews** - Shows page titles instead of raw URLs
- 🌐 **Favicon Display** - Fetches and displays website favicons
- 📄 **File Type Icons** - Shows Nerd Font icons for 60+ file types (PDF, DOC, images, code, etc.)
- ⚙️ **Configurable** - Control how links open (new tab, new window, or same tab)
- 📏 **Smart Truncation** - Limits title length to 60 characters
- 🎯 **TypeScript Support** - Full type safety included
- 🚀 **Lightweight** - No heavy dependencies
- ⚡ **Fast** - Skips metadata fetching for file URLs

## Installation

```bash
npm install react-beauty-link
```

Or with yarn:

```bash
yarn add react-beauty-link
```

Or with pnpm:

```bash
pnpm add react-beauty-link
```

## Usage

### Basic Example

```tsx
import { useBeautyLink } from 'react-beauty-link';

function App() {
  const text = "Check out https://react.dev for React docs!";
  const linkedContent = useBeautyLink(text);

  return <div>{linkedContent}</div>;
}
```

### With File Links

The hook automatically detects file extensions and shows appropriate icons:

```tsx
import { useBeautyLink } from 'react-beauty-link';

function App() {
  const text = `
    Download report: https://example.com/quarterly-report.pdf
    View code: https://github.com/user/repo/main.tsx
    Get package: https://example.com/app.zip
  `;
  const linkedContent = useBeautyLink(text);

  return <div>{linkedContent}</div>;
}
```

Result:
- 📕 `quarterly-report.pdf` (with red PDF icon)
- ⚛️ `main.tsx` (with React icon)
- 📦 `app.zip` (with archive icon)

### With Custom Target

Control how links open:

```tsx
import { useBeautyLink } from 'react-beauty-link';

function App() {
  const text = "Visit https://github.com and https://npmjs.com";
  
  // Open in new tab (default)
  const newTabLinks = useBeautyLink(text, 'new-tab');
  
  // Open in new window
  const newWindowLinks = useBeautyLink(text, 'new-window');
  
  // Open in same tab
  const sameTabLinks = useBeautyLink(text, 'self');

  return (
    <div>
      <p>{newTabLinks}</p>
      <p>{newWindowLinks}</p>
      <p>{sameTabLinks}</p>
    </div>
  );
}
```

### TypeScript

```tsx
import { useBeautyLink, LinkTarget } from 'react-beauty-link';

function App() {
  const text = "Check out https://typescript.org";
  const target: LinkTarget = 'new-tab'; // 'new-tab' | 'new-window' | 'self'
  const linkedContent = useBeautyLink(text, target);

  return <div>{linkedContent}</div>;
}
```

## API

### `useBeautyLink(text: string, target?: LinkTarget): ReactNode[]`

Converts URLs in text to clickable links with titles and favicons.

#### Parameters

- **`text`** (string, required): The text containing URLs to linkify
- **`target`** (LinkTarget, optional): How links should open
  - `'new-tab'` (default): Opens in a new browser tab
  - `'new-window'`: Opens in a new browser window (800x600)
  - `'self'`: Opens in the same tab

#### Returns

- Array of React nodes containing text and link elements

### Types

```typescript
type LinkTarget = 'new-tab' | 'new-window' | 'self';
```

## How It Works

1. **URL Detection**: Scans text for HTTPS URLs (matches until first space)
2. **File Type Check**: If URL has a file extension, shows Nerd Font icon and filename
3. **Metadata Fetching**: For regular URLs, retrieves page title and favicon via CORS proxies
4. **Fallback Handling**: Uses Google's favicon service if fetching fails
5. **Rendering**: Creates beautiful links with icons and truncated titles

## Supported File Types

The hook supports 60+ file types with Nerd Font icons:

- **Documents**: PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, TXT
- **Code**: JS, TS, JSX, TSX, PY, JAVA, PHP, RB, GO, RS, HTML, CSS, JSON, MD, SQL
- **Media**: JPG, PNG, GIF, SVG, MP4, AVI, MOV, MP3, WAV, FLAC
- **Archives**: ZIP, RAR, 7Z, TAR, GZ

See [FILE_TYPE_SUPPORT.md](FILE_TYPE_SUPPORT.md) for the complete list with colors.

## Examples

### Before
```
Check out https://react.dev for React documentation
```

### After
```
Check out [🌐 React] for React documentation
```
(Where [🌐 React] is a clickable link with the actual favicon and page title)

## Styling

Links are rendered with the following default styles:
- Color: `#646cff`
- Text decoration: `underline`
- Display: `inline-flex` with icons and text aligned
- Icon size: `16x16px`

You can override these styles using CSS:

```css
/* Target all linkified links */
a[target="_blank"] {
  color: #your-color;
  text-decoration: none;
}
```

## Browser Support

Works in all modern browsers that support:
- ES2020
- React 18+
- Fetch API
- DOMParser

## Notes

- Only detects HTTPS URLs (not HTTP)
- URLs are matched until the first space character
- Fetching metadata requires CORS proxies (included)
- Google Favicon Service is used as a reliable fallback

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Issues

If you find a bug or have a feature request, please open an issue on [GitHub](https://github.com/yourusername/react-beauty-link/issues).

## Author

Your Name - [your.email@example.com](mailto:your.email@example.com)
