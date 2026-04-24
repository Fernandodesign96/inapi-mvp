'use client'

import { useEffect } from 'react'

export function ClarityScript() {
  useEffect(() => {
    // Solo ejecutar en producción
    if (process.env.NODE_ENV !== 'production') return

    // Verificar que no esté ya inicializado
    if (typeof window !== 'undefined' && !(window as Window & { clarity?: unknown }).clarity) {
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.async = true
      script.innerHTML = `
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "wcuqei4rxp");
      `
      document.head.appendChild(script)
    }
  }, [])

  return null
}
