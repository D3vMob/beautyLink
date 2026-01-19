// Load Nerd Fonts dynamically for file type icons
let fontsLoaded = false;

export function loadNerdFonts() {
  // Only inject once
  if (fontsLoaded || typeof document === 'undefined') {
    return;
  }

  const styleId = 'react-beauty-link-nerd-fonts';
  
  // Check if already injected
  if (document.getElementById(styleId)) {
    fontsLoaded = true;
    return;
  }

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
}
