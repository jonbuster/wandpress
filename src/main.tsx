import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ToastContextProvider } from './components/ui/toast.tsx'
import { TooltipProvider } from './components/ui/tooltip.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastContextProvider>
      <TooltipProvider delayDuration={200}>
        <App />
      </TooltipProvider>
    </ToastContextProvider>
  </StrictMode>,
)
