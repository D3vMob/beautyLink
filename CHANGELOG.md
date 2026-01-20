# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned
- Support for HTTP URLs (currently HTTPS only)
- Persistent caching mechanism for fetched metadata
- Custom fallback icons

## [1.1.6] - 2026-01-19

### Changed
- **Improved error handling**: Reduced console noise for metadata fetching
  - Changed from `console.warn`/`console.error` to `console.debug`
  - Errors only shown in development mode (`NODE_ENV === 'development'`)
  - Production builds are now completely silent
  - Added third CORS proxy (api.codetabs.com) for better reliability
  
### Fixed
- Reduced timeout from 10s to 5s for faster proxy failover
- Better TypeScript error handling for proxy failures
- More informative debug messages with cleaner formatting

### Technical
- Bundle size: ESM 10.13 kB (3.31 kB gzipped), CJS 7.14 kB (2.90 kB gzipped)
- Proxy errors are expected behavior and handled gracefully
- Metadata failures automatically fall back to URL + Google favicon

## [1.1.5] - 2026-01-19

### Fixed
- **Critical**: Fixed font loading timing issue where icons appeared as squares
  - Moved font loading from `useEffect` to module-level execution
  - Fonts now load immediately when module is imported, before first render
  - Ensures icons display correctly on first render in consumer projects
  
### Changed
- Font loading is now synchronous at module import time (SSR-safe)
- Added `typeof window` check for better SSR/Node.js compatibility
- Enhanced error handling and debug logging for font loading
- Exported `loadNerdFonts()` utility for manual triggering if needed

### Technical
- Bundle size: ESM 9.74 kB (3.22 kB gzipped), CJS 6.81 kB (2.81 kB gzipped)
- Font loading happens once per application, cached globally
- Added console.debug message for successful font loading

## [1.1.3] - 2026-01-19

### Fixed
- **Critical**: File type icons now load correctly when package is used in other projects
  - Added automatic Nerd Font loading via dynamic style injection
  - Fonts are loaded once per application lifecycle
  - No manual setup required by consumers

### Changed
- Nerd Fonts are now automatically injected into the document head when hook is first used
- Improved bundle size optimization (ESM: 9.45 kB, CJS: 6.56 kB)

### Technical
- Added `loadNerdFonts()` utility for dynamic font loading
- Fonts loaded from jsDelivr CDN with proper fallbacks
- SSR-safe font loading (checks for `document` existence)

## [1.1.2] - 2026-01-19

### Added
- **Custom link colors** via third parameter `customColor`
- Comprehensive README documentation with 60+ examples
- Detailed API reference with parameter tables
- Complete file type support matrix with icons and colors
- Advanced usage examples (theming, context, dynamic content)
- Troubleshooting guide
- Browser compatibility matrix

### Changed
- Enhanced README from 221 to 795 lines
- Improved documentation structure with emojis and tables
- Added styling customization guide

## [1.1.1] - 2026-01-19

### Changed
- Minor documentation improvements
- Repository URL corrections

## [1.1.0] - 2026-01-18

### Added
- **File type icon support** with 60+ file extensions
- Nerd Font icons for documents, code, media, and archives
- Color-coded icons by file category
- Automatic file extension detection
- Fast rendering for file URLs (no metadata fetching)

### Changed
- Improved performance by skipping metadata fetch for file URLs
- Enhanced TypeScript types with `verbatimModuleSyntax` support

### Fixed
- TypeScript import errors with strict module syntax
- Test suite hanging/freezing issues (changed to run-once mode)

## [1.0.0] - 2026-01-18

### Added
- Initial release
- `useBeautyLink` hook to convert URLs in text to beautiful links
- Automatic fetching of page titles and favicons
- Configurable link target (new-tab, new-window, self)
- TypeScript support with full type definitions
- Smart title truncation (max 60 characters)
- Fallback to generic link icon when favicon unavailable
- Support for React 18+ and 19+

### Features
- HTTPS URL detection with regex matching
- Multiple CORS proxy fallbacks
- Google Favicon Service as reliable fallback
- Error handling with graceful degradation
- ESM and CommonJS builds
- Source maps for debugging

---

## Version History

- **1.0.0**: Initial public release

---

## How to Update This Changelog

When releasing a new version:

1. Move items from "Unreleased" to a new version section
2. Add the version number and date
3. Group changes into categories:
   - **Added** for new features
   - **Changed** for changes in existing functionality
   - **Deprecated** for soon-to-be removed features
   - **Removed** for now removed features
   - **Fixed** for any bug fixes
   - **Security** for vulnerability fixes

Example:

```markdown
## [1.1.0] - 2026-02-15

### Added
- Custom styling options via props
- HTTP URL support

### Fixed
- Memory leak when unmounting component
- Favicon loading race condition
```
