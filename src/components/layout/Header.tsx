import type { ReactNode } from 'react'
import { Bell, ChevronDown, Menu } from 'lucide-react'
interface HeaderProps {
  title: string
  description: string
  actions?: ReactNode
  onOpenMenu: () => void
}
export function Header({
  title,
  description,
  actions,
  onOpenMenu,
}: HeaderProps) {
  return (
    <header className="topbar">
      <button className="menu-btn" onClick={onOpenMenu} aria-label="Abrir menu">
        <Menu />
      </button>
      <div className="title">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <div className="header-actions">
        {actions}
        <button className="icon-button" aria-label="Notificações">
          <Bell size={20} />
          <i />
        </button>
        <div className="profile">
          <div className="avatar">RS</div>
          <div>
            <b>Rafael Silva</b>
            <small>Administrador</small>
          </div>
          <ChevronDown size={15} />
        </div>
      </div>
    </header>
  )
}
