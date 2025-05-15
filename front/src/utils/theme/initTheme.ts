const initTheme = () => {
  const root = document.documentElement
  const stored = localStorage.getItem('theme') as 'light' | 'dark' | null
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

  const theme = stored || (prefersDark ? 'dark' : 'light')

  root.classList.remove('light', 'dark')
  root.classList.add(theme)
}

export default initTheme;