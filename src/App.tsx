import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useBeautyLink } from './hooks/useBeautyLink'

function App() {
  const [count, setCount] = useState(0)
  
  // Example text with HTTPS URLs
  const exampleText = `Check out these links:

Websites: https://react.dev and https://vitejs.dev

Documents: https://example.com/report.pdf and https://example.com/presentation.pptx

Spreadsheets: https://example.com/data.xlsx

Code files: https://github.com/user/repo/main.tsx and https://example.com/script.py

Media: https://example.com/video.mp4 and https://example.com/song.mp3

Archives: https://example.com/package.zip`;
  
  const linkedText = useBeautyLink(exampleText, 'new-tab', '#3d85c6')

  return (
    <>
      <div className="card" style={{ marginTop: '2rem' }}>
        <h2>useBeautyLink Hook Demo</h2>
        <p style={{ textAlign: 'left', lineHeight: '2', whiteSpace: 'pre-line' }}>
          {linkedText}
        </p>
        <div style={{ marginTop: '2rem', padding: '1rem', background: '#1a1a1a', borderRadius: '8px', textAlign: 'left' }}>
          <h3 style={{ marginTop: 0, fontSize: '1rem' }}>Features:</h3>
          <ul style={{ margin: 0, paddingLeft: '1.5rem', fontSize: '0.9rem', lineHeight: '1.6' }}>
            <li>🌐 Websites show favicons and page titles</li>
            <li>📄 Files show Nerd Font icons based on extension</li>
            <li>🎨 Color-coded by file type</li>
            <li>⚡ Fast - No metadata fetch for files</li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default App
