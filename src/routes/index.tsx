import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { logoutFunction } from '#/auth/service.ts'
import { useState } from 'react'

export const Route = createFileRoute('/')({
  component: Home,
})
function Home() {
  const navigate = useNavigate()

  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('token'),
  )

  function logout() {
    logoutFunction()
    navigate({ to: '/login' })
  }

  return (
    <>
      <button
        type="button"
        onClick={() => {
          logout()
          setIsAuthenticated(false)
        }}
      >
        Se déconnecter
      </button>

      <div className="flex min-h-screen items-center justify-center bg-slate-100 p-8">
        <div className="w-full max-w-lg rounded-xl bg-white p-8 text-center shadow-lg">
          <h1 className="mb-4 text-4xl font-bold text-slate-800">
            Bienvenue sur la Web Biblio by TanStack
          </h1>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            {isAuthenticated ? (
              <Link
                to="/book"
                className="rounded-lg border border-slate-300 px-6 py-3 font-semibold text-slate-700 hover:bg-slate-100"
              >
                Accéder aux livres
              </Link>
            ) : (
              <>
                <p className="mb-8 text-slate-600">
                  Pour voir la liste des livres, merci de vous connecter ou de
                  créer un compte.
                </p>
                <Link
                  to="/register"
                  className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
                >
                  Créer un compte
                </Link>

                <Link
                  to="/login"
                  className="rounded-lg border border-slate-300 px-6 py-3 font-semibold text-slate-700 hover:bg-slate-100"
                >
                  Se connecter
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
