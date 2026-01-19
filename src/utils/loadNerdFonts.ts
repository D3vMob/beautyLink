// Load Nerd Fonts dynamically for file type icons
let fontsLoaded = false;

export function loadNerdFonts() {
  // SSR check
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }

  // Only inject once
  if (fontsLoaded) {
    return;
  }

  const styleId = 'react-beauty-link-nerd-fonts';
  
  // Check if already injected
  if (document.getElementById(styleId)) {
    fontsLoaded = true;
    return;
  }

  try {
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      /* react-beauty-link: Nerd Font Symbols */
      @font-face {
        font-family: 'Symbols Nerd Font';
        src: url('https://cdn.jsdelivr.net/gh/ryanoasis/nerd-fonts@v3.1.1/patched-fonts/NerdFontsSymbolsOnly/SymbolsNerdFont-Regular.ttf') format('truetype');
        font-weight: normal;
        font-style: normal;
        font-display: swap;
      }

      @font-face {
        font-family: 'Symbols Nerd Font Mono';
        src: url('https://cdn.jsdelivr.net/gh/ryanoasis/nerd-fonts@v3.1.1/patched-fonts/NerdFontsSymbolsOnly/SymbolsNerdFontMono-Regular.ttf') format('truetype');
        font-weight: normal;
        font-style: normal;
        font-display: swap;
      }
    `;

    document.head.appendChild(style);
    fontsLoaded = true;
    
    // Debug log (can be removed in production)
    if (typeof console !== 'undefined' && console.debug) {
      console.debug('[react-beauty-link] Nerd Fonts loaded successfully');
    }
  } catch (error) {
    console.error('[react-beauty-link] Failed to load Nerd Fonts:', error);
  }
}
