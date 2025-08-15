'use client'

import { useEffect, useState } from "react"

export const  useRenderReady = (condition) => {
    const [isReady, setIsReady] = useState(false)
    
      useEffect(() => {
        if (condition) {
          requestAnimationFrame(() => {
            // Ждём когда браузер освободится после отрисовки
            if ('requestIdleCallback' in window) {
              requestIdleCallback(() => setIsReady(true))
            } else {
              // Для старых браузеров
              setTimeout(() => setIsReady(true), 0)
            }
          })
        }
      }, [condition])

      return isReady
}