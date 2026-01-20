import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { FILE_TYPE_ICONS } from '../utils/fileIcons';
import { loadNerdFonts } from '../utils/loadNerdFonts';

// Load fonts immediately when module is imported (browser only, one-time)
if (typeof window !== 'undefined') {
  loadNerdFonts();
}

interface LinkMetadata {
  title: string;
  favicon: string | null;
}

export type LinkTarget = 'new-tab' | 'new-window' | 'self';


function getFileExtension(url: string): string | null {
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    const lastDot = pathname.lastIndexOf('.');
    if (lastDot === -1 || lastDot === pathname.length - 1) return null;
    return pathname.substring(lastDot + 1).toLowerCase();
  } catch {
    return null;
  }
}

/**
 * Custom hook that converts HTTPS URLs in a string into clickable links
 * with page titles and favicons
 * @param text - The input string containing potential URLs
 * @param target - How to open links: 'new-tab' (default), 'new-window', or 'self'
 * @param customColor - Custom color for links (optional)
 * @returns An array of React nodes with text and links
 */
export const useBeautyLink = (text: string, target: LinkTarget = 'new-tab', customColor?: string): ReactNode[] => {
  const urlRegex = /(https:\/\/[^\s]+)/g;
  const [linkMetadata, setLinkMetadata] = useState<Record<string, LinkMetadata>>({});
  
  const urls = Array.from(text.matchAll(urlRegex)).map(match => match[0]);

  useEffect(() => {
    const fetchAllMetadata = async () => {
      for (const url of urls) {
        if (!linkMetadata[url]) {
          const extension = getFileExtension(url);
          
          // If it's a file URL, skip metadata fetching and use filename
          if (extension && FILE_TYPE_ICONS[extension]) {
            const filename = url.split('/').pop() || url;
            setLinkMetadata(prev => ({
              ...prev,
              [url]: {
                title: decodeURIComponent(filename),
                favicon: null
              }
            }));
            continue;
          }
          
          try {
            const metadata = await fetchLinkMetadata(url);
            if (process.env.NODE_ENV === 'development') {
              console.debug('[react-beauty-link] Metadata fetched:', url);
            }
            setLinkMetadata(prev => ({
              ...prev,
              [url]: metadata
            }));
          } catch (error) {
            // Silently fall back to URL - this is expected behavior
            if (process.env.NODE_ENV === 'development') {
              console.debug('[react-beauty-link] Using URL fallback for:', url);
            }
            setLinkMetadata(prev => ({
              ...prev,
              [url]: {
                title: url,
                favicon: null
              }
            }));
          }
        }
      }
    };

    fetchAllMetadata();
  }, [text, JSON.stringify(urls)]);

  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let match;

  urlRegex.lastIndex = 0;
  while ((match = urlRegex.exec(text)) !== null) {
    const url = match[0];
    const startIndex = match.index;

    if (startIndex > lastIndex) {
      parts.push(text.substring(lastIndex, startIndex));
    }

    const metadata = linkMetadata[url];
    const displayTitle = metadata?.title 
      ? (metadata.title.length > 60 ? metadata.title.substring(0, 60) + '...' : metadata.title)
      : url;
    
    const faviconUrl = metadata?.favicon;
    const extension = getFileExtension(url);
    const fileIcon = extension ? FILE_TYPE_ICONS[extension] : null;

    const getTargetAttributes = () => {
      switch (target) {
        case 'new-window':
          return {
            target: '_blank',
            rel: 'noopener noreferrer',
            onClick: (e: React.MouseEvent) => {
              e.preventDefault();
              window.open(url, '_blank', 'noopener,noreferrer,width=800,height=600');
            }
          };
        case 'self':
          return {
            target: '_self'
          };
        case 'new-tab':
        default:
          return {
            target: '_blank',
            rel: 'noopener noreferrer'
          };
      }
    };

    parts.push(
      <a
        key={`link-${startIndex}`}
        href={url}
        {...getTargetAttributes()}
        style={{ 
          color: customColor || '#646cff', 
          textDecoration: 'underline',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px'
        }}
      >
        {fileIcon ? (
          <span 
            style={{ 
              fontFamily: '"Symbols Nerd Font Mono", "Symbols Nerd Font", "Nerd Font", "FiraCode Nerd Font", monospace',
              fontSize: '16px',
              color: fileIcon.color,
              lineHeight: 1,
              display: 'inline-block',
              width: '16px',
              textAlign: 'center',
              fontWeight: 'normal'
            }}
            aria-hidden="true"
          >
            {fileIcon.icon}
          </span>
        ) : faviconUrl ? (
          <img 
            src={faviconUrl} 
            alt="" 
            style={{ width: '16px', height: '16px' }}
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"%3E%3Cpath d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/%3E%3Cpath d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/%3E%3C/svg%3E';
            }}
          />
        ) : (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
          </svg>
        )}
        <span>{displayTitle}</span>
      </a>
    );

    lastIndex = startIndex + url.length;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : [text];
};

/**
 * Fetches metadata (title and favicon) for a given URL
 */
async function fetchLinkMetadata(url: string): Promise<LinkMetadata> {
  try {
    const urlObj = new URL(url);
    const origin = urlObj.origin;
    
    const proxies = [
      `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`,
      `https://corsproxy.io/?${encodeURIComponent(url)}`,
      `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`,
    ];
    
    let html = '';
    let success = false;
    
    for (const proxyUrl of proxies) {
      try {
        const response = await fetch(proxyUrl, { 
          signal: AbortSignal.timeout(5000) // 5 second timeout (faster failover)
        });
        
        if (!response.ok) continue;
        
        const data = await response.json();
        html = data.contents || data;
        success = true;
        break;
      } catch (err) {
        // Only log in development mode to reduce console noise
        if (process.env.NODE_ENV === 'development') {
          const errorName = err instanceof Error ? err.name : 'Unknown error';
          console.debug('[react-beauty-link] Proxy failed:', proxyUrl.split('?')[0], errorName);
        }
        continue;
      }
    }
    
    if (!success || !html) {
      throw new Error('All proxies failed');
    }
    
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    let title = 
      doc.querySelector('meta[property="og:title"]')?.getAttribute('content') ||
      doc.querySelector('meta[name="twitter:title"]')?.getAttribute('content') ||
      doc.querySelector('title')?.textContent ||
      url;
    
    title = title.trim();
    
    let favicon = `https://www.google.com/s2/favicons?domain=${urlObj.hostname}&sz=32`;
    
    const faviconLink = 
      doc.querySelector('link[rel="icon"]')?.getAttribute('href') ||
      doc.querySelector('link[rel="shortcut icon"]')?.getAttribute('href') ||
      doc.querySelector('link[rel="apple-touch-icon"]')?.getAttribute('href');
    
    if (faviconLink) {
      if (faviconLink.startsWith('http')) {
        favicon = faviconLink;
      } else if (faviconLink.startsWith('//')) {
        favicon = 'https:' + faviconLink;
      } else if (faviconLink.startsWith('/')) {
        favicon = origin + faviconLink;
      } else {
        favicon = origin + '/' + faviconLink;
      }
    }
    
    return { title, favicon };
  } catch (error) {
    // Graceful fallback - use hostname and Google favicon service
    if (process.env.NODE_ENV === 'development') {
      console.debug('[react-beauty-link] Metadata fetch failed, using fallback');
    }
    const urlObj = new URL(url);
    return {
      title: urlObj.hostname,
      favicon: `https://www.google.com/s2/favicons?domain=${urlObj.hostname}&sz=32`
    };
  }
}
