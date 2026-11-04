import { useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Bell, BriefcaseBusiness, CalendarDays, ChevronDown, CircleDollarSign, LayoutDashboard, Menu, MoreHorizontal, Settings, Target, Users, UserRoundPlus, X, ArrowUpRight, ArrowDownRight, Handshake, CheckCircle2, TrendingUp, FileBarChart } from 'lucide-react'
import { activities, dashboardMocks, periods, type PeriodKey } from './data/dashboard'
import { Card } from './components/ui/card'
import { cn } from './lib/utils'
import './styles.css'

const money = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })
const number = new Intl.NumberFormat('pt-BR')
const nav = [{label:'Dashboard',icon:LayoutDashboard},{label:'Leads',icon:UserRoundPlus},{label:'Clientes',icon:Users},{label:'Oportunidades',icon:BriefcaseBusiness},{label:'Funil de Vendas',icon:Target},{label:'Atividades',icon:CalendarDays},{label:'Relatórios',icon:FileBarChart}]

function Delta({ value, suffix = '%' }: { value: number; suffix?: string }) { const good = value >= 0; return <span className={cn('delta', good ? 'positive' : 'negative')}>{good ? <ArrowUpRight size={14}/> : <ArrowDownRight size={14}/>} {Math.abs(value).toLocaleString('pt-BR')}{suffix}</span> }
function MiniLine({ data }: { data: number[] }) { const max=Math.max(...data), min=Math.min(...data), width=88, h=31; const p=data.map((n,i)=>`${(i/(data.length-1))*width},${h-4-((n-min)/(max-min||1))*(h-9)}`).join(' '); return <svg viewBox={`0 0 ${width} ${h}`} className="mini-line" aria-hidden="true"><polyline points={p} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg> }
function IconFor({ kind }: {kind:string}) { const props={size:17}; return kind==='lead'?<UserRoundPlus {...props}/>:kind==='opportunity'?<BriefcaseBusiness {...props}/>:kind==='sale'?<CircleDollarSign {...props}/>:kind==='move'?<TrendingUp {...props}/>:kind==='meeting'?<CalendarDays {...props}/>:<CheckCircle2 {...props}/> }

export default function App() {
  const [period, setPeriod] = useState<PeriodKey>('30d'); const [open, setOpen] = useState(false); const [menu, setMenu] = useState(false)
  const data = dashboardMocks[period]; const totals = useMemo(()=>{const leads=data.series.reduce((a,b)=>a+b.leads,0);const converted=data.series.reduce((a,b)=>a+b.convertidos,0); return { leads, converted, conversion: (converted/leads)*100}},[data])
  const kpis = [
    {title:'Receita total',value:money.format(data.receita),change:data.receitaDelta,icon:CircleDollarSign,color:'blue',trend:data.series.map(x=>x.receita)},
    {title:'Taxa de conversão',value:`${totals.conversion.toFixed(1).replace('.',',')}%`,change:1.8,icon:Target,color:'violet',trend:data.series.map(x=>x.convertidos)},
    {title:'Clientes em potencial',value:number.format(data.potential),change:data.potentialDelta,icon:Users,color:'amber',trend:data.series.map(x=>x.leads)},
    {title:'Total de leads',value:number.format(totals.leads),change:data.leadsDelta,icon:UserRoundPlus,color:'cyan',trend:data.series.map(x=>x.leads)},
  ]
  return <div className="app-shell">
    <aside className={cn('sidebar', menu && 'mobile-open')}>
      <div className="brand"><div className="brand-mark"><span></span><span></span><span></span></div><strong>Autentic<span>Flow</span></strong><button className="close" onClick={()=>setMenu(false)}><X size={19}/></button></div>
      <nav>{nav.map(({label,icon:Icon})=><button className={cn('nav-link', label==='Dashboard'&&'active')} key={label}><Icon size={19}/><span>{label}</span>{label==='Leads'&&<em>12</em>}</button>)}</nav>
      <div className="side-bottom"><button className="nav-link"><Settings size={19}/><span>Configurações</span></button><div className="help"><div>?</div><span><b>Precisa de ajuda?</b><small>Acesse nosso suporte</small></span></div></div>
    </aside>
    {menu&&<button className="backdrop" onClick={()=>setMenu(false)} aria-label="Fechar menu"/>}
    <main className="content">
      <header className="topbar"><button className="menu-btn" onClick={()=>setMenu(true)}><Menu/></button><div className="title"><h1>Dashboard</h1><p>Acompanhe o desempenho do seu processo comercial.</p></div><div className="header-actions"><div className="period-select"><CalendarDays size={17}/><select value={period} onChange={e=>setPeriod(e.target.value as PeriodKey)}>{periods.map(p=><option value={p.value} key={p.value}>{p.label}</option>)}</select><ChevronDown size={15}/></div><button className="icon-button"><Bell size={20}/><i/></button><div className="profile"><div className="avatar">RS</div><div><b>Rafael Silva</b><small>Administrador</small></div><ChevronDown size={15}/></div></div></header>
      <div className="dashboard-body"><div className="welcome"><div><p className="eyebrow">VISÃO GERAL</p><h2>Olá, Rafael <span>👋</span></h2><p>Aqui está o resumo das suas vendas e oportunidades.</p></div><button className="ghost-action"><MoreHorizontal size={19}/></button></div>
      <div className="kpi-grid">{kpis.map(({title,value,change,icon:Icon,color,trend},i)=><Card className="kpi" key={title}><div className="kpi-head"><div className={cn('kpi-icon',color)}><Icon size={20}/></div><Delta value={change} suffix={i===1?' p.p.':'%'}/></div><p>{title}</p><h3>{value}</h3><div className="kpi-foot"><span>vs. período anterior</span><MiniLine data={trend}/></div></Card>)}</div>
      <div className="charts"><Card className="chart-card revenue"><div className="card-title"><div><h3>Evolução da receita</h3><p>Comparativo com o período anterior</p></div><div className="legend"><span><i className="now"/>Período atual</span><span><i/>Período anterior</span></div></div><div className="chart"><ResponsiveContainer width="100%" height="100%"><AreaChart data={data.series} margin={{top:12,right:4,left:-10,bottom:0}}><defs><linearGradient id="income" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#2563eb" stopOpacity=".23"/><stop offset="100%" stopColor="#2563eb" stopOpacity="0"/></linearGradient></defs><CartesianGrid vertical={false} stroke="#e9eef5"/><XAxis dataKey="label" tickLine={false} axisLine={false} tick={{fill:'#7a879b',fontSize:12}} dy={10}/><YAxis tickFormatter={v=>`R$ ${v/1000}k`} tickLine={false} axisLine={false} tick={{fill:'#7a879b',fontSize:11}}/><Tooltip formatter={(value)=>[money.format(Number(value ?? 0)),'']} contentStyle={{borderRadius:12,border:'1px solid #e5eaf1',boxShadow:'0 8px 24px #0f172a12'}}/><Area type="monotone" dataKey="anterior" stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 5" fill="none"/><Area type="monotone" dataKey="receita" stroke="#2563eb" strokeWidth={2.6} fill="url(#income)"/></AreaChart></ResponsiveContainer></div></Card>
      <Card className="chart-card leads"><div className="card-title"><div><h3>Leads e conversões</h3><p>Resultados por período</p></div><button className="more"><MoreHorizontal size={19}/></button></div><div className="small-legend"><span><i className="lead-dot"/>Leads</span><span><i className="convert-dot"/>Convertidos</span></div><div className="chart"><ResponsiveContainer width="100%" height="100%"><BarChart data={data.series} margin={{top:6,right:0,left:-22,bottom:0}} barGap={4}><CartesianGrid vertical={false} stroke="#edf1f6"/><XAxis dataKey="label" tickLine={false} axisLine={false} tick={{fill:'#7a879b',fontSize:11}} dy={9}/><YAxis tickLine={false} axisLine={false} tick={{fill:'#7a879b',fontSize:11}}/><Tooltip cursor={{fill:'#f5f8fc'}} contentStyle={{borderRadius:12,border:'1px solid #e5eaf1'}}/><Bar dataKey="leads" fill="#bfdbfe" radius={[5,5,0,0]} maxBarSize={28}/><Bar dataKey="convertidos" fill="#2563eb" radius={[5,5,0,0]} maxBarSize={28}/></BarChart></ResponsiveContainer></div></Card></div>
      <Card className="activities"><div className="card-title"><div><h3>Últimas atividades</h3><p>Acompanhe as movimentações recentes do seu CRM.</p></div><button className="all-button">Ver todas <ArrowUpRight size={15}/></button></div><div className="timeline">{activities.map((a,index)=><div className="activity" key={a.title+a.subject}><div className="activity-icon"><IconFor kind={a.kind}/></div>{index<activities.length-1&&<div className="line"/>}<div className="activity-text"><p>{a.title}<strong> — {a.subject}</strong></p><span>{a.user} <b>•</b> {a.time}</span></div><button className="row-more"><MoreHorizontal size={18}/></button></div>)}</div></Card>
      </div>
    </main>
  </div>
}

createRoot(document.getElementById('root')!).render(<App />)
