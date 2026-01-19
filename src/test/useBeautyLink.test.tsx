import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useBeautyLink } from '../hooks/useBeautyLink';
import { isValidElement } from 'react';

describe('useBeautyLink', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('URL Detection', () => {
    it('should detect single HTTPS URL in text', () => {
      const { result } = renderHook(() => 
        useBeautyLink('Check out https://example.com')
      );
      
      expect(result.current).toHaveLength(2); // Text + link
      expect(result.current[0]).toBe('Check out ');
    });

    it('should detect multiple HTTPS URLs in text', () => {
      const { result } = renderHook(() => 
        useBeautyLink('Visit https://example.com and https://test.com')
      );
      
      expect(result.current.length).toBeGreaterThan(2); // Text + link1 + text + link2
    });

    it('should not detect HTTP URLs (only HTTPS)', () => {
      const { result } = renderHook(() => 
        useBeautyLink('Visit http://example.com')
      );
      
      expect(result.current).toHaveLength(1);
      expect(result.current[0]).toBe('Visit http://example.com');
    });

    it('should handle text with no URLs', () => {
      const { result } = renderHook(() => 
        useBeautyLink('Just plain text')
      );
      
      expect(result.current).toHaveLength(1);
      expect(result.current[0]).toBe('Just plain text');
    });

    it('should stop URL at first space', () => {
      const { result } = renderHook(() => 
        useBeautyLink('Link https://example.com is here')
      );
      
      expect(result.current).toHaveLength(3); // Text + link + text
      expect(result.current[2]).toBe(' is here');
    });
  });

  describe('File Type Detection', () => {
    it('should detect PDF file extension', async () => {
      const { result } = renderHook(() => 
        useBeautyLink('Download https://example.com/document.pdf')
      );
      
      await waitFor(() => {
        const linkElement = result.current[1];
        expect(isValidElement(linkElement)).toBe(true);
      });
    });

    it('should detect code file extensions', async () => {
      const extensions = ['js', 'ts', 'tsx', 'py', 'java'];
      
      for (const ext of extensions) {
        const { result } = renderHook(() => 
          useBeautyLink(`https://example.com/file.${ext}`)
        );
        
        await waitFor(() => {
          expect(result.current).toHaveLength(1);
          expect(isValidElement(result.current[0])).toBe(true);
        });
      }
    });

    it('should detect archive file extensions', async () => {
      const { result } = renderHook(() => 
        useBeautyLink('https://example.com/package.zip')
      );
      
      await waitFor(() => {
        expect(isValidElement(result.current[0])).toBe(true);
      });
    });

    it('should detect image file extensions', async () => {
      const { result } = renderHook(() => 
        useBeautyLink('https://example.com/photo.jpg')
      );
      
      await waitFor(() => {
        expect(isValidElement(result.current[0])).toBe(true);
      });
    });

    it('should use filename for file URLs', async () => {
      const { result } = renderHook(() => 
        useBeautyLink('https://example.com/my-document.pdf')
      );
      
      await waitFor(() => {
        expect(result.current).toHaveLength(1);
      }, { timeout: 500 });
    });

    it('should handle URL-encoded filenames', async () => {
      const { result } = renderHook(() => 
        useBeautyLink('https://example.com/my%20document.pdf')
      );
      
      await waitFor(() => {
        expect(result.current).toHaveLength(1);
      }, { timeout: 500 });
    });
  });

  describe('Link Target Attributes', () => {
    it('should default to new-tab target', () => {
      const { result } = renderHook(() => 
        useBeautyLink('https://example.com')
      );
      
      const linkElement = result.current[0] as any;
      expect(linkElement.props.target).toBe('_blank');
      expect(linkElement.props.rel).toBe('noopener noreferrer');
    });

    it('should set new-tab target explicitly', () => {
      const { result } = renderHook(() => 
        useBeautyLink('https://example.com', 'new-tab')
      );
      
      const linkElement = result.current[0] as any;
      expect(linkElement.props.target).toBe('_blank');
    });

    it('should set self target', () => {
      const { result } = renderHook(() => 
        useBeautyLink('https://example.com', 'self')
      );
      
      const linkElement = result.current[0] as any;
      expect(linkElement.props.target).toBe('_self');
    });

    it('should set new-window target', () => {
      const { result } = renderHook(() => 
        useBeautyLink('https://example.com', 'new-window')
      );
      
      const linkElement = result.current[0] as any;
      expect(linkElement.props.target).toBe('_blank');
      expect(linkElement.props.onClick).toBeDefined();
    });
  });

  describe('Link Rendering', () => {
    it('should render link as React element', () => {
      const { result } = renderHook(() => 
        useBeautyLink('https://example.com')
      );
      
      expect(isValidElement(result.current[0])).toBe(true);
    });

    it('should set correct href attribute', () => {
      const { result } = renderHook(() => 
        useBeautyLink('https://example.com')
      );
      
      const linkElement = result.current[0] as any;
      expect(linkElement.props.href).toBe('https://example.com');
    });

    it('should have proper styling', () => {
      const { result } = renderHook(() => 
        useBeautyLink('https://example.com')
      );
      
      const linkElement = result.current[0] as any;
      expect(linkElement.props.style).toMatchObject({
        color: '#646cff',
        textDecoration: 'underline',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px'
      });
    });

    it('should generate unique keys for multiple links', () => {
      const { result } = renderHook(() => 
        useBeautyLink('Visit https://example.com and https://test.com')
      );
      
      const link1 = result.current[1] as any;
      const link2 = result.current[3] as any;
      
      expect(link1.key).not.toBe(link2.key);
    });
  });

  describe('Title Truncation', () => {
    it('should not truncate short titles', async () => {
      const { result } = renderHook(() => 
        useBeautyLink('https://example.com/short.pdf')
      );
      
      await waitFor(() => {
        const linkElement = result.current[0] as any;
        const title = linkElement.props.children[1].props.children;
        expect(title).not.toContain('...');
      }, { timeout: 500 });
    });

    it('should truncate long titles to 60 characters', async () => {
      const longFilename = 'a'.repeat(70) + '.pdf';
      const { result } = renderHook(() => 
        useBeautyLink(`https://example.com/${longFilename}`)
      );
      
      await waitFor(() => {
        const linkElement = result.current[0] as any;
        const title = linkElement.props.children[1].props.children;
        expect(title).toContain('...');
        expect(title.length).toBeLessThanOrEqual(63); // 60 + '...'
      }, { timeout: 500 });
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty string', () => {
      const { result } = renderHook(() => 
        useBeautyLink('')
      );
      
      expect(result.current).toHaveLength(1);
      expect(result.current[0]).toBe('');
    });

    it('should handle URL at start of text', () => {
      const { result } = renderHook(() => 
        useBeautyLink('https://example.com is cool')
      );
      
      expect(result.current[0]).not.toBe('');
      expect(isValidElement(result.current[0])).toBe(true);
    });

    it('should handle URL at end of text', () => {
      const { result } = renderHook(() => 
        useBeautyLink('Visit https://example.com')
      );
      
      expect(result.current).toHaveLength(2);
      expect(result.current[0]).toBe('Visit ');
    });

    it('should handle consecutive URLs', () => {
      const { result } = renderHook(() => 
        useBeautyLink('https://example.com https://test.com')
      );
      
      expect(result.current.length).toBeGreaterThanOrEqual(3);
    });

    it('should handle URLs with query parameters', () => {
      const { result } = renderHook(() => 
        useBeautyLink('https://example.com?param=value&other=test')
      );
      
      const linkElement = result.current[0] as any;
      expect(linkElement.props.href).toContain('?param=value&other=test');
    });

    it('should handle URLs with hash fragments', () => {
      const { result } = renderHook(() => 
        useBeautyLink('https://example.com#section')
      );
      
      const linkElement = result.current[0] as any;
      expect(linkElement.props.href).toContain('#section');
    });

    it('should handle URLs with ports', () => {
      const { result } = renderHook(() => 
        useBeautyLink('https://example.com:3000/path')
      );
      
      const linkElement = result.current[0] as any;
      expect(linkElement.props.href).toBe('https://example.com:3000/path');
    });

    it('should handle multiple file URLs', async () => {
      const { result } = renderHook(() => 
        useBeautyLink('Download https://example.com/file1.pdf and https://example.com/file2.zip')
      );
      
      await waitFor(() => {
        expect(result.current.length).toBeGreaterThan(3);
      }, { timeout: 500 });
    });
  });

  describe('Icon Rendering', () => {
    it('should render file icon for PDF files', async () => {
      const { result } = renderHook(() => 
        useBeautyLink('https://example.com/doc.pdf')
      );
      
      await waitFor(() => {
        const linkElement = result.current[0] as any;
        const icon = linkElement.props.children[0];
        expect(icon.type).toBe('span'); // Nerd font icon is wrapped in span
      }, { timeout: 500 });
    });

    it('should render SVG icon for non-file URLs initially', () => {
      const { result } = renderHook(() => 
        useBeautyLink('https://example.com')
      );
      
      const linkElement = result.current[0] as any;
      const icon = linkElement.props.children[0];
      expect(icon.type).toBe('svg');
    });
  });

  describe('React Hook Behavior', () => {
    it('should update when text changes', () => {
      const { result, rerender } = renderHook(
        ({ text }) => useBeautyLink(text),
        { initialProps: { text: 'https://example.com' } }
      );
      
      expect(result.current).toHaveLength(1);
      
      rerender({ text: 'https://test.com' });
      
      const newLinkElement = result.current[0] as any;
      expect(newLinkElement.props.href).toBe('https://test.com');
    });

    it('should update when target changes', () => {
      const { result, rerender } = renderHook(
        ({ target }) => useBeautyLink('https://example.com', target),
        { initialProps: { target: 'new-tab' as const } }
      );
      
      const linkElement1 = result.current[0] as any;
      expect(linkElement1.props.target).toBe('_blank');
      
      rerender({ target: 'self' as const });
      
      const linkElement2 = result.current[0] as any;
      expect(linkElement2.props.target).toBe('_self');
    });
  });

  describe('Mixed Content', () => {
    it('should handle mix of text, URLs, and file URLs', async () => {
      const { result } = renderHook(() => 
        useBeautyLink('Visit https://example.com or download https://example.com/file.pdf for details')
      );
      
      await waitFor(() => {
        expect(result.current.length).toBeGreaterThan(4);
      }, { timeout: 500 });
    });

    it('should preserve text between links', () => {
      const { result } = renderHook(() => 
        useBeautyLink('First https://example.com then https://test.com last')
      );
      
      expect(result.current[0]).toBe('First ');
      expect(result.current[2]).toBe(' then ');
      expect(result.current[4]).toBe(' last');
    });
  });

  describe('Special Characters', () => {
    it('should handle URLs with special characters', () => {
      const { result } = renderHook(() => 
        useBeautyLink('https://example.com/path-with_special.chars')
      );
      
      const linkElement = result.current[0] as any;
      expect(linkElement.props.href).toBe('https://example.com/path-with_special.chars');
    });

    it('should handle text with newlines', () => {
      const { result } = renderHook(() => 
        useBeautyLink('Line 1\nhttps://example.com\nLine 3')
      );
      
      expect(result.current).toHaveLength(3);
      expect(result.current[0]).toBe('Line 1\n');
      expect(result.current[2]).toBe('\nLine 3');
    });
  });
});
