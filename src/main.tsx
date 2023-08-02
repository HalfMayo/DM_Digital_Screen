import React from 'react'
import ReactDOM from 'react-dom/client'
import Initiative from './components/InitiativeOrder'
import './index.css'
import { FightersProvider } from './contexts/FightersContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <FightersProvider>
      <Initiative />
    </FightersProvider>
  </React.StrictMode>,
)
