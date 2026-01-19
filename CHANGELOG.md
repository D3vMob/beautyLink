# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned
- Add customizable styling options
- Support for HTTP URLs (currently HTTPS only)
- Caching mechanism for fetched metadata
- Custom fallback icons

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
