import {
  BriefcaseBusiness,
  CalendarDays,
  FileBarChart,
  LayoutDashboard,
  Settings,
  Target,
  Users,
  UserRoundPlus,
  X,
} from 'lucide-react'
import { cn } from '../../lib/utils'
const nav = [
  { label: 'Dashboard', icon: LayoutDashboard },
  { label: 'Leads', icon: UserRoundPlus },
  { label: 'Clientes', icon: Users },
  { label: 'Oportunidades', icon: BriefcaseBusiness },
  { label: 'Funil de Vendas', icon: Target },
  { label: 'Atividades', icon: CalendarDays },
  { label: 'Relatórios', icon: FileBarChart },
]
interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}
export function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <aside className={cn('sidebar', isOpen && 'mobile-open')}>
      <div className="brand">
        <div className="brand-mark">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <strong>
          Autentic<span>Flow</span>
        </strong>
        <button className="close" onClick={onClose} aria-label="Fechar menu">
          <X size={19} />
        </button>
      </div>
      <nav>
        {nav.map(({ label, icon: Icon }) => (
          <button
            className={cn('nav-link', label === 'Dashboard' && 'active')}
            key={label}
          >
            <Icon size={19} />
            <span>{label}</span>
            {label === 'Leads' && <em>12</em>}
          </button>
        ))}
      </nav>
      <div className="side-bottom">
        <button className="nav-link">
          <Settings size={19} />
          <span>Configurações</span>
        </button>
        <div className="help">
          <div>?</div>
          <span>
            <b>Precisa de ajuda?</b>
            <small>Acesse nosso suporte</small>
          </span>
        </div>
      </div>
    </aside>
  )
}
