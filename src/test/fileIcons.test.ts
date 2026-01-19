import { describe, it, expect } from 'vitest';
import { FILE_TYPE_ICONS } from '../utils/fileIcons';

describe('FILE_TYPE_ICONS', () => {
  describe('Document Icons', () => {
    it('should have PDF icon configuration', () => {
      expect(FILE_TYPE_ICONS['pdf']).toBeDefined();
      expect(FILE_TYPE_ICONS['pdf'].icon).toBeTruthy();
      expect(FILE_TYPE_ICONS['pdf'].color).toBe('#e74856');
    });

    it('should have Word document icons', () => {
      expect(FILE_TYPE_ICONS['doc']).toBeDefined();
      expect(FILE_TYPE_ICONS['docx']).toBeDefined();
      expect(FILE_TYPE_ICONS['doc'].color).toBe('#2b579a');
    });

    it('should have Excel spreadsheet icons', () => {
      expect(FILE_TYPE_ICONS['xls']).toBeDefined();
      expect(FILE_TYPE_ICONS['xlsx']).toBeDefined();
      expect(FILE_TYPE_ICONS['xls'].color).toBe('#207245');
    });

    it('should have PowerPoint icons', () => {
      expect(FILE_TYPE_ICONS['ppt']).toBeDefined();
      expect(FILE_TYPE_ICONS['pptx']).toBeDefined();
      expect(FILE_TYPE_ICONS['ppt'].color).toBe('#d24726');
    });

    it('should have text file icon', () => {
      expect(FILE_TYPE_ICONS['txt']).toBeDefined();
      expect(FILE_TYPE_ICONS['txt'].color).toBe('#6c757d');
    });
  });

  describe('Archive Icons', () => {
    it('should have archive file icons', () => {
      const archives = ['zip', 'rar', '7z', 'tar', 'gz'];
      archives.forEach(ext => {
        expect(FILE_TYPE_ICONS[ext]).toBeDefined();
        expect(FILE_TYPE_ICONS[ext].color).toBe('#e89f1c');
      });
    });
  });

  describe('Image Icons', () => {
    it('should have common image format icons', () => {
      const images = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
      images.forEach(ext => {
        expect(FILE_TYPE_ICONS[ext]).toBeDefined();
        expect(FILE_TYPE_ICONS[ext].color).toBe('#a855f7');
      });
    });

    it('should have SVG icon with different color', () => {
      expect(FILE_TYPE_ICONS['svg']).toBeDefined();
      expect(FILE_TYPE_ICONS['svg'].color).toBe('#f97316');
    });
  });

  describe('Video Icons', () => {
    it('should have video format icons', () => {
      const videos = ['mp4', 'avi', 'mov', 'mkv', 'webm'];
      videos.forEach(ext => {
        expect(FILE_TYPE_ICONS[ext]).toBeDefined();
        expect(FILE_TYPE_ICONS[ext].color).toBe('#ec4899');
      });
    });
  });

  describe('Audio Icons', () => {
    it('should have audio format icons', () => {
      const audio = ['mp3', 'wav', 'flac', 'ogg'];
      audio.forEach(ext => {
        expect(FILE_TYPE_ICONS[ext]).toBeDefined();
        expect(FILE_TYPE_ICONS[ext].color).toBe('#10b981');
      });
    });
  });

  describe('Code File Icons', () => {
    it('should have JavaScript icons', () => {
      expect(FILE_TYPE_ICONS['js']).toBeDefined();
      expect(FILE_TYPE_ICONS['js'].color).toBe('#f0db4f');
    });

    it('should have TypeScript icons', () => {
      expect(FILE_TYPE_ICONS['ts']).toBeDefined();
      expect(FILE_TYPE_ICONS['ts'].color).toBe('#3178c6');
    });

    it('should have React component icons', () => {
      expect(FILE_TYPE_ICONS['jsx']).toBeDefined();
      expect(FILE_TYPE_ICONS['tsx']).toBeDefined();
      expect(FILE_TYPE_ICONS['jsx'].color).toBe('#61dafb');
      expect(FILE_TYPE_ICONS['tsx'].color).toBe('#61dafb');
    });

    it('should have Python icon', () => {
      expect(FILE_TYPE_ICONS['py']).toBeDefined();
      expect(FILE_TYPE_ICONS['py'].color).toBe('#3776ab');
    });

    it('should have various programming language icons', () => {
      const languages = {
        'java': '#007396',
        'php': '#777bb4',
        'rb': '#cc342d',
        'go': '#00add8',
        'rs': '#dea584',
      };

      Object.entries(languages).forEach(([ext, color]) => {
        expect(FILE_TYPE_ICONS[ext]).toBeDefined();
        expect(FILE_TYPE_ICONS[ext].color).toBe(color);
      });
    });

    it('should have web development icons', () => {
      expect(FILE_TYPE_ICONS['html']).toBeDefined();
      expect(FILE_TYPE_ICONS['css']).toBeDefined();
      expect(FILE_TYPE_ICONS['html'].color).toBe('#e34c26');
      expect(FILE_TYPE_ICONS['css'].color).toBe('#264de4');
    });

    it('should have data format icons', () => {
      expect(FILE_TYPE_ICONS['json']).toBeDefined();
      expect(FILE_TYPE_ICONS['xml']).toBeDefined();
      expect(FILE_TYPE_ICONS['yaml']).toBeDefined();
      expect(FILE_TYPE_ICONS['yml']).toBeDefined();
    });

    it('should have markdown icon', () => {
      expect(FILE_TYPE_ICONS['md']).toBeDefined();
      expect(FILE_TYPE_ICONS['md'].color).toBe('#083fa1');
    });

    it('should have SQL icon', () => {
      expect(FILE_TYPE_ICONS['sql']).toBeDefined();
      expect(FILE_TYPE_ICONS['sql'].color).toBe('#00758f');
    });

    it('should have shell script icon', () => {
      expect(FILE_TYPE_ICONS['sh']).toBeDefined();
      expect(FILE_TYPE_ICONS['sh'].color).toBe('#89e051');
    });
  });

  describe('Icon Structure', () => {
    it('should have icon and color for all entries', () => {
      Object.entries(FILE_TYPE_ICONS).forEach(([ext, config]) => {
        expect(config.icon).toBeTruthy();
        expect(config.color).toBeTruthy();
        expect(config.color).toMatch(/^#[0-9a-f]{6}$/i); // Valid hex color
      });
    });

    it('should have unique icons for different file categories', () => {
      const pdfIcon = FILE_TYPE_ICONS['pdf'].icon;
      const zipIcon = FILE_TYPE_ICONS['zip'].icon;
      const jsIcon = FILE_TYPE_ICONS['js'].icon;
      
      expect(pdfIcon).not.toBe(zipIcon);
      expect(pdfIcon).not.toBe(jsIcon);
      expect(zipIcon).not.toBe(jsIcon);
    });

    it('should have consistent colors within file categories', () => {
      // All archives should have the same color
      expect(FILE_TYPE_ICONS['zip'].color).toBe(FILE_TYPE_ICONS['rar'].color);
      expect(FILE_TYPE_ICONS['zip'].color).toBe(FILE_TYPE_ICONS['7z'].color);
      
      // All videos should have the same color
      expect(FILE_TYPE_ICONS['mp4'].color).toBe(FILE_TYPE_ICONS['avi'].color);
      expect(FILE_TYPE_ICONS['mp4'].color).toBe(FILE_TYPE_ICONS['mov'].color);
    });
  });

  describe('Coverage', () => {
    it('should support common document formats', () => {
      const docs = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt'];
      docs.forEach(ext => {
        expect(FILE_TYPE_ICONS[ext]).toBeDefined();
      });
    });

    it('should support common code file formats', () => {
      const code = ['js', 'ts', 'jsx', 'tsx', 'py', 'java', 'html', 'css', 'json', 'md'];
      code.forEach(ext => {
        expect(FILE_TYPE_ICONS[ext]).toBeDefined();
      });
    });

    it('should support common media formats', () => {
      const media = ['jpg', 'png', 'gif', 'mp4', 'mp3'];
      media.forEach(ext => {
        expect(FILE_TYPE_ICONS[ext]).toBeDefined();
      });
    });

    it('should support common archive formats', () => {
      const archives = ['zip', 'rar', '7z', 'tar', 'gz'];
      archives.forEach(ext => {
        expect(FILE_TYPE_ICONS[ext]).toBeDefined();
      });
    });
  });

  describe('Case Sensitivity', () => {
    it('should be case-insensitive ready (all lowercase keys)', () => {
      Object.keys(FILE_TYPE_ICONS).forEach(ext => {
        expect(ext).toBe(ext.toLowerCase());
      });
    });
  });
});
