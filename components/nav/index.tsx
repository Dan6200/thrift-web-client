'use client'
import React, { useState, useEffect } from 'react'

export function Nav({ children, ...props }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches
  )
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  }, [darkMode])
  return (
    <div className="flex flex-row items-center justify-between w-full px-4 py-4  border-b border-gray-900 dark:border-gray-200">
      {children}
      <button
        className="dark:border-gray-200 border-gray-900 border-[.5pt] rounded-md px-4 py-2"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
    </div>
  )
}
