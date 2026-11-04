import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider, useAuth } from './features/auth/AuthProvider'
import { LoginPage } from './features/auth/LoginPage'

const DashboardPage = lazy(() =>
  import('./features/dashboard/DashboardPage').then((module) => ({
    default: module.DashboardPage,
  })),
)
const CustomersPage = lazy(() =>
  import('./features/customers/CustomersPage').then((module) => ({
    default: module.CustomersPage,
  })),
)
const NewCustomerPage = lazy(() =>
  import('./features/customers/NewCustomerPage').then((module) => ({
    default: module.NewCustomerPage,
  })),
)
const CustomerProfilePage = lazy(() =>
  import('./features/customers/CustomerProfilePage').then((module) => ({
    default: module.CustomerProfilePage,
  })),
)

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { session } = useAuth()
  return session ? children : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Suspense
          fallback={
            <div
              role="status"
              className="grid min-h-svh place-items-center bg-white text-sm text-slate-500"
            >
              Carregando...
            </div>
          }
        >
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/clientes"
              element={
                <ProtectedRoute>
                  <CustomersPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/clientes/novo"
              element={
                <ProtectedRoute>
                  <NewCustomerPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/clientes/:id"
              element={
                <ProtectedRoute>
                  <CustomerProfilePage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  )
}
