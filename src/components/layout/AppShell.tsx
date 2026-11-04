import { useState, type ReactNode } from 'react'
import { Header } from './Header'
import { Sidebar } from './Sidebar'
interface AppShellProps {
  title: string
  description: string
  actions?: ReactNode
  children: ReactNode
}
export function AppShell({
  title,
  description,
  actions,
  children,
}: AppShellProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <div className="app-shell">
      <Sidebar isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      {menuOpen && (
        <button
          className="backdrop"
          onClick={() => setMenuOpen(false)}
          aria-label="Fechar menu"
        />
      )}
      <main className="content">
        <Header
          title={title}
          description={description}
          actions={actions}
          onOpenMenu={() => setMenuOpen(true)}
        />
        {children}
      </main>
    </div>
  )
}
