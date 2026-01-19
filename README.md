# react-beauty-link

A React hook that automatically converts URLs in text into beautiful, clickable links with page titles, favicons, and file type icons.

[![npm version](https://img.shields.io/npm/v/react-beauty-link.svg)](https://www.npmjs.com/package/react-beauty-link)
[![npm downloads](https://img.shields.io/npm/dm/react-beauty-link.svg)](https://www.npmjs.com/package/react-beauty-link)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

### 🔗 Smart URL Detection
- Automatically finds and converts HTTPS URLs in any text
- Matches URLs until the first space or end of string
- Supports URLs with query parameters, hash fragments, and ports
- Preserves surrounding text perfectly

### 🎨 Beautiful Link Previews
- **Website Links**: Shows page title + favicon
- **File Links**: Shows filename + file type icon
- **Custom Colors**: Set your own link color to match your theme
- **Smart Truncation**: Long titles automatically truncated to 60 characters

### 📄 File Type Icons
- **60+ File Types Supported** with beautiful Nerd Font icons
- **Color-coded by category**: Documents (red), Code (language colors), Media (purple/pink), Archives (orange)
- **Fast rendering**: No metadata fetching needed for file links
- Supports: PDF, DOC, XLSX, images, videos, code files, archives, and more

### ⚙️ Highly Configurable
- **Link Target**: Control where links open (new tab, new window, or same page)
- **Custom Colors**: Match your app's color scheme
- **TypeScript First**: Full type safety and IntelliSense support

### 🚀 Performance
- **Lightweight**: ~8.5KB (2.8KB gzipped)
- **No dependencies**: Only React as peer dependency
- **Optimized**: Skips metadata fetching for file URLs
- **Smart caching**: Metadata cached during component lifecycle

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

## 📖 Usage

### Basic Example

```tsx
import { useBeautyLink } from 'react-beauty-link';

function App() {
  const text = "Check out https://react.dev for React docs!";
  const linkedContent = useBeautyLink(text);

  return <div>{linkedContent}</div>;
}
```

**Result**: Displays "Check out [🌐 React] for React docs!" with a clickable link showing the React favicon and page title.

---

### Multiple URLs in Text

The hook handles multiple URLs seamlessly:

```tsx
import { useBeautyLink } from 'react-beauty-link';

function App() {
  const text = "Visit https://react.dev and https://vitejs.dev for modern web development!";
  const linkedContent = useBeautyLink(text);

  return <div>{linkedContent}</div>;
}
```

**Result**: Both URLs become beautiful links with their respective favicons and titles, while preserving the text in between.

---

### File Links with Automatic Icons

The hook automatically detects 60+ file extensions and shows appropriate icons:

```tsx
import { useBeautyLink } from 'react-beauty-link';

function DocumentList() {
  const text = `
    📋 Reports:
    - Q4 Report: https://example.com/quarterly-report.pdf
    - Budget: https://example.com/budget-2024.xlsx
    
    💻 Code:
    - Component: https://github.com/user/repo/Component.tsx
    - Styles: https://github.com/user/repo/styles.css
    
    📦 Downloads:
    - Package: https://example.com/app-v1.2.3.zip
    - Installer: https://example.com/setup.exe
  `;
  
  const linkedContent = useBeautyLink(text);

  return <div style={{ whiteSpace: 'pre-line' }}>{linkedContent}</div>;
}
```

**Result**:
- 📕 `quarterly-report.pdf` - Red PDF icon
- 📊 `budget-2024.xlsx` - Green Excel icon
- ⚛️ `Component.tsx` - Cyan React icon
- 🎨 `styles.css` - Blue CSS icon
- 📦 `app-v1.2.3.zip` - Orange archive icon
- 💾 `setup.exe` - File icon

---

### Custom Link Target

Control how links open:

```tsx
import { useBeautyLink } from 'react-beauty-link';

function App() {
  const text = "Documentation: https://docs.example.com";
  
  // Open in new tab (default)
  const newTabLinks = useBeautyLink(text, 'new-tab');
  
  // Open in new window with specific dimensions
  const newWindowLinks = useBeautyLink(text, 'new-window');
  
  // Open in same tab (SPA navigation)
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

---

### Custom Link Colors

Match your app's theme by customizing link colors:

```tsx
import { useBeautyLink } from 'react-beauty-link';

function ThemedLinks() {
  const text = "Check out https://react.dev";
  
  // Use your brand color
  const brandLinks = useBeautyLink(text, 'new-tab', '#FF6B6B');
  
  // Dark mode
  const darkLinks = useBeautyLink(text, 'new-tab', '#60A5FA');
  
  // Light mode
  const lightLinks = useBeautyLink(text, 'new-tab', '#2563EB');

  return (
    <div>
      <div style={{ background: '#fff', padding: '1rem' }}>
        {lightLinks}
      </div>
      <div style={{ background: '#1a1a1a', padding: '1rem' }}>
        {darkLinks}
      </div>
      <div style={{ background: '#f5f5f5', padding: '1rem' }}>
        {brandLinks}
      </div>
    </div>
  );
}
```

---

### TypeScript Usage

Full TypeScript support with type safety:

```tsx
import { useBeautyLink, type LinkTarget } from 'react-beauty-link';

interface MessageProps {
  content: string;
  linkBehavior?: LinkTarget;
  linkColor?: string;
}

function Message({ content, linkBehavior = 'new-tab', linkColor }: MessageProps) {
  const linkedContent = useBeautyLink(content, linkBehavior, linkColor);

  return <div className="message">{linkedContent}</div>;
}

// Usage
function App() {
  return (
    <>
      <Message content="Visit https://typescript.org" />
      <Message 
        content="Download https://example.com/guide.pdf" 
        linkBehavior="self"
        linkColor="#10b981"
      />
    </>
  );
}
```

---

### Real-World Example: Comment Section

```tsx
import { useBeautyLink } from 'react-beauty-link';

interface Comment {
  id: string;
  author: string;
  text: string;
  timestamp: Date;
}

function CommentList({ comments }: { comments: Comment[] }) {
  return (
    <div className="comments">
      {comments.map(comment => {
        const linkedText = useBeautyLink(comment.text, 'new-tab', '#646cff');
        
        return (
          <div key={comment.id} className="comment">
            <div className="comment-header">
              <strong>{comment.author}</strong>
              <span>{comment.timestamp.toLocaleDateString()}</span>
            </div>
            <div className="comment-body">
              {linkedText}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Example usage
const sampleComments: Comment[] = [
  {
    id: '1',
    author: 'Alice',
    text: 'Great article! Here\'s a related resource: https://react.dev/learn',
    timestamp: new Date('2024-01-15')
  },
  {
    id: '2',
    author: 'Bob',
    text: 'I\'ve attached the slides: https://example.com/presentation.pptx',
    timestamp: new Date('2024-01-16')
  }
];
```

## 🔧 API Reference

### `useBeautyLink(text, target?, customColor?)`

Converts URLs in text to clickable links with titles, favicons, and file type icons.

```typescript
function useBeautyLink(
  text: string,
  target?: LinkTarget,
  customColor?: string
): ReactNode[]
```

#### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| **`text`** | `string` | *required* | The text containing URLs to linkify |
| **`target`** | `LinkTarget` | `'new-tab'` | How links should open |
| **`customColor`** | `string` | `'#646cff'` | Custom color for links (any valid CSS color) |

#### `LinkTarget` Options

| Value | Behavior | Use Case |
|-------|----------|----------|
| `'new-tab'` | Opens in new browser tab with `target="_blank"` | Default, safest for external links |
| `'new-window'` | Opens in new window (800x600) | Popup-style windows |
| `'self'` | Opens in same tab with `target="_self"` | SPA navigation, internal docs |

#### Returns

`ReactNode[]` - Array of React nodes containing:
- Plain text segments (as strings)
- Link elements (as React elements with icons and titles)

#### Color Examples

```typescript
// Hex colors
useBeautyLink(text, 'new-tab', '#FF6B6B');

// RGB/RGBA
useBeautyLink(text, 'new-tab', 'rgb(100, 108, 255)');

// Named colors
useBeautyLink(text, 'new-tab', 'crimson');

// HSL
useBeautyLink(text, 'new-tab', 'hsl(220, 100%, 66%)');
```

### TypeScript Types

```typescript
import type { LinkTarget, ReactNode } from 'react-beauty-link';

type LinkTarget = 'new-tab' | 'new-window' | 'self';
```

## ⚡ How It Works

### Processing Pipeline

```
1. Text Input
   ↓
2. URL Detection (Regex matching HTTPS URLs)
   ↓
3. File Extension Check
   ├─→ Has extension → Use Nerd Font icon + filename
   └─→ No extension → Fetch metadata (title + favicon)
   ↓
4. Render Links
   ├─→ Apply custom color
   ├─→ Add target attributes
   └─→ Truncate long titles (60 chars)
   ↓
5. Return ReactNode[] (text segments + link elements)
```

### Key Features

- **🔍 Smart Detection**: Uses regex to find HTTPS URLs, stopping at first space
- **📦 Zero Metadata for Files**: File links render instantly without network requests
- **🌐 Reliable Favicon Fetching**: Multiple CORS proxies with Google Favicon fallback
- **♻️ Efficient Caching**: Metadata cached during component lifecycle
- **🎯 React Integration**: Returns native React elements, not dangerouslySetInnerHTML

### URL Matching Details

- **Pattern**: `/(https:\/\/[^\s]+)/g`
- **Supports**: Query params, hash fragments, ports, special characters
- **Stops at**: First space or end of string
- **Example**: `"Text https://example.com:3000/path?q=1#top more text"`
  - Matches: `https://example.com:3000/path?q=1#top`

## 📄 Supported File Types (60+)

### Documents (Red Theme)
| Extension | Icon | Color | Description |
|-----------|------|-------|-------------|
| `pdf` | 󰈦 | `#e74856` | PDF documents |
| `doc`, `docx` | 󰈬 | `#2b579a` | Microsoft Word |
| `xls`, `xlsx` | 󰈛 | `#207245` | Microsoft Excel |
| `ppt`, `pptx` | 󰈧 | `#d24726` | Microsoft PowerPoint |
| `txt` | 󰈙 | `#6c757d` | Plain text |

### Programming Languages
| Extension | Icon | Color | Language |
|-----------|------|-------|----------|
| `js` | 󰌞 | `#f0db4f` | JavaScript |
| `ts` | 󰛦 | `#3178c6` | TypeScript |
| `jsx`, `tsx` | 󰜈 | `#61dafb` | React |
| `py` | 󰌠 | `#3776ab` | Python |
| `java` | 󰬷 | `#007396` | Java |
| `php` | 󰌟 | `#777bb4` | PHP |
| `rb` | 󰴭 | `#cc342d` | Ruby |
| `go` | 󰟓 | `#00add8` | Go |
| `rs` | 󱘗 | `#dea584` | Rust |
| `html` | 󰌝 | `#e34c26` | HTML |
| `css` | 󰌜 | `#264de4` | CSS |

### Data & Config Files
| Extension | Icon | Color | Description |
|-----------|------|-------|-------------|
| `json` | 󰘦 | `#f7df1e` | JSON |
| `xml` | 󰗀 | `#ff6600` | XML |
| `yaml`, `yml` | 󰈙 | `#cb171e` | YAML |
| `md` | 󰍔 | `#083fa1` | Markdown |
| `sql` | 󰆼 | `#00758f` | SQL |
| `sh` | 󰆍 | `#89e051` | Shell scripts |

### Media Files
| Extension | Icon | Color | Type |
|-----------|------|-------|------|
| `jpg`, `jpeg`, `png`, `gif`, `webp` | 󰈟 | `#a855f7` | Images |
| `svg` | 󰜡 | `#f97316` | Vector graphics |
| `mp4`, `avi`, `mov`, `mkv`, `webm` | 󰕧 | `#ec4899` | Video |
| `mp3`, `wav`, `flac`, `ogg` | 󰈣 | `#10b981` | Audio |

### Archives
| Extension | Icon | Color | Format |
|-----------|------|-------|--------|
| `zip`, `rar`, `7z`, `tar`, `gz` | 󰗄 | `#e89f1c` | Compressed |

**Note**: Icons require a Nerd Font to display properly. The hook includes a CDN fallback font.

## 🎨 Styling

### Default Styles

Links are rendered with these default inline styles:

```css
{
  color: '#646cff',
  textDecoration: 'underline',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px'
}
```

Icons (favicons and file type icons):
```css
{
  width: '16px',
  height: '16px'
}
```

### Customizing Styles

#### Option 1: Use the `customColor` Parameter

```tsx
// Brand color
const linkedContent = useBeautyLink(text, 'new-tab', '#FF6B6B');

// Theme-aware
const linkedContent = useBeautyLink(
  text, 
  'new-tab', 
  isDarkMode ? '#60A5FA' : '#2563EB'
);
```

#### Option 2: Override with CSS

```css
/* Target all beauty links */
a[href^="https://"] {
  color: #your-color !important;
  text-decoration: none;
  font-weight: 500;
}

/* Hover effects */
a[href^="https://"]:hover {
  color: #your-hover-color;
  text-decoration: underline;
}

/* Different styles for file links */
a[href$=".pdf"],
a[href$=".doc"],
a[href$=".zip"] {
  background: #f3f4f6;
  padding: 2px 8px;
  border-radius: 4px;
}
```

#### Option 3: Wrapper Component

```tsx
import { useBeautyLink } from 'react-beauty-link';
import './custom-links.css';

function StyledBeautyLink({ text }: { text: string }) {
  const linkedContent = useBeautyLink(text, 'new-tab', '#10b981');
  
  return (
    <div className="beauty-link-wrapper">
      {linkedContent}
    </div>
  );
}
```

```css
/* custom-links.css */
.beauty-link-wrapper a {
  transition: all 0.2s ease;
  border-bottom: 2px solid transparent;
}

.beauty-link-wrapper a:hover {
  border-bottom-color: currentColor;
  transform: translateY(-1px);
}
```

## 💡 Common Use Cases

### Blog Comments

```tsx
function CommentSection({ comments }) {
  return comments.map(comment => (
    <div key={comment.id} className="comment">
      <p>{useBeautyLink(comment.text)}</p>
    </div>
  ));
}
```

### Chat Messages

```tsx
function ChatMessage({ message }) {
  const linkedContent = useBeautyLink(
    message.text,
    'new-tab',
    message.isUser ? '#3b82f6' : '#10b981'
  );
  
  return (
    <div className={message.isUser ? 'user-message' : 'other-message'}>
      {linkedContent}
    </div>
  );
}
```

### Documentation Display

```tsx
function Documentation({ content }) {
  // Automatically linkify code examples, file references, etc.
  const linkedContent = useBeautyLink(content, 'new-tab', '#8b5cf6');
  
  return (
    <article className="prose">
      {linkedContent}
    </article>
  );
}
```

### Email Template Preview

```tsx
function EmailPreview({ emailBody }) {
  const linkedContent = useBeautyLink(emailBody, 'new-tab');
  
  return (
    <div className="email-preview" style={{ whiteSpace: 'pre-wrap' }}>
      {linkedContent}
    </div>
  );
}
```

## 🎯 Advanced Examples

### With React Context for Theming

```tsx
import { createContext, useContext } from 'react';
import { useBeautyLink } from 'react-beauty-link';

const ThemeContext = createContext({ linkColor: '#646cff' });

function ThemedContent({ text }: { text: string }) {
  const { linkColor } = useContext(ThemeContext);
  const linkedContent = useBeautyLink(text, 'new-tab', linkColor);
  
  return <div>{linkedContent}</div>;
}

// Usage
function App() {
  return (
    <ThemeContext.Provider value={{ linkColor: '#FF6B6B' }}>
      <ThemedContent text="Visit https://react.dev" />
    </ThemeContext.Provider>
  );
}
```

### With Dynamic Content

```tsx
function LiveFeed({ messages }: { messages: Message[] }) {
  return (
    <div className="feed">
      {messages.map(msg => {
        const linkedContent = useBeautyLink(
          msg.content,
          'new-tab',
          msg.priority === 'high' ? '#ef4444' : '#646cff'
        );
        
        return (
          <div key={msg.id} className="feed-item">
            <span className="timestamp">{msg.time}</span>
            <div className="content">{linkedContent}</div>
          </div>
        );
      })}
    </div>
  );
}
```

## 🌐 Browser Support

Works in all modern browsers that support:

| Feature | Required | Browsers |
|---------|----------|----------|
| ES2020 | Yes | Chrome 80+, Firefox 74+, Safari 13.1+, Edge 80+ |
| React 18+ | Yes | All modern browsers |
| Fetch API | Yes | Chrome 42+, Firefox 39+, Safari 10.1+, Edge 14+ |
| DOMParser | Yes | All modern browsers |

**Tested on:**
- ✅ Chrome/Edge 100+
- ✅ Firefox 100+
- ✅ Safari 15+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 Important Notes

### Security
- ✅ **HTTPS Only**: Only detects HTTPS URLs for security
- ✅ **`rel="noopener noreferrer"`**: Automatically added to new tab/window links
- ✅ **No XSS Risk**: Uses React elements, not `dangerouslySetInnerHTML`

### Limitations
- 🚫 **HTTP URLs**: Only HTTPS URLs are detected and linkified
- 🚫 **Email/Phone**: Doesn't detect `mailto:` or `tel:` links
- ⚠️ **CORS**: Metadata fetching requires CORS proxies (built-in fallbacks included)
- ⚠️ **URL Boundaries**: URLs must be separated by spaces

### Performance
- ⚡ **File Links**: No network requests for file URLs (instant rendering)
- ⚡ **Caching**: Metadata cached during component lifecycle
- ⚡ **Bundle Size**: ~8.5KB minified, ~2.8KB gzipped

## 🔍 Troubleshooting

### Icons Not Displaying

**Problem**: File type icons show as squares or missing glyphs

**Solution**: The hook includes a Nerd Font CDN fallback. If icons still don't show:

```tsx
// Add this to your app's HTML head or CSS
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/ryanoasis/nerd-fonts@v3.1.1/patched-fonts/NerdFontsSymbolsOnly/SymbolsNerdFont-Regular.ttf" />
```

### Metadata Not Loading

**Problem**: Website links show URLs instead of titles

**Solution**: The hook uses CORS proxies. If failing consistently:

```tsx
// Check browser console for errors
// Metadata fetching may be blocked by:
// 1. Ad blockers (whitelist the CORS proxy domains)
// 2. Strict CSP policies
// 3. Network restrictions
```

### Links Not Clickable

**Problem**: Links render but aren't clickable

**Solution**: Check for CSS conflicts:

```css
/* Make sure links aren't being disabled */
a[href] {
  pointer-events: auto !important;
}
```

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### Reporting Issues
- 🐛 [Report bugs](https://github.com/D3vMob/beautyLink/issues/new?labels=bug)
- 💡 [Request features](https://github.com/D3vMob/beautyLink/issues/new?labels=enhancement)
- 📖 [Improve documentation](https://github.com/D3vMob/beautyLink/issues/new?labels=documentation)

### Development

```bash
# Clone the repo
git clone https://github.com/D3vMob/beautyLink.git
cd beautyLink

# Install dependencies
pnpm install

# Run development server
pnpm dev

# Run tests
pnpm test

# Build library
pnpm run build:lib
```

### Pull Request Process

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests if applicable
5. Run tests (`pnpm test`)
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

## 📄 License

MIT © [Andre Desbiens](https://github.com/D3vMob)

See [LICENSE](LICENSE) for more information.

## 🙏 Acknowledgments

- [Nerd Fonts](https://www.nerdfonts.com/) - Beautiful file type icons
- [React](https://react.dev/) - The UI library
- [Vite](https://vitejs.dev/) - Build tool

## 📦 Related Packages

Looking for more? Check out these related packages:

- **Linkify Libraries**: For basic URL detection without styling
- **React Markdown**: For full markdown rendering with links
- **React Link Preview**: For rich link previews with images

## 📮 Support

- 📧 **Email**: desbiensa1@gmail.com
- 🐙 **GitHub**: [@D3vMob](https://github.com/D3vMob)
- 📦 **npm**: [react-beauty-link](https://www.npmjs.com/package/react-beauty-link)

## ⭐ Star History

If you find this package useful, please consider giving it a star on GitHub!

[![Star History Chart](https://api.star-history.com/svg?repos=D3vMob/beautyLink&type=Date)](https://star-history.com/#D3vMob/beautyLink&Date)

---

Made with ❤️ by [Andre Desbiens](https://github.com/D3vMob)
