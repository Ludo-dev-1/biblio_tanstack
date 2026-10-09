import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { logoutFunction } from '#/auth/service.ts'
import { useState } from 'react'

export const Route = createFileRoute('/')({ component: Home })

function Home() {

 const navigate = useNavigate()
  const name = localStorage.getItem('name')

const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'))

  function logout(){
    logoutFunction()
    navigate({ to: '/' })
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
        {!isAuthenticated ? (
          <div className="w-full max-w-lg rounded-xl bg-white p-8 text-center shadow-lg">
            <h1 className="mb-4 text-4xl font-bold text-slate-800">
              Bienvenue sur la Web Biblio by TanStack
            </h1>

            <p className="mb-8 text-slate-600">
              Pour voir la liste des livres, merci de vous connecter ou de créer
              un compte.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
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
            </div>
          </div>
        ) : (
          <div className="w-full max-w-2xl rounded-xl bg-white p-8 shadow-lg">
            <h1>Bienvenue {name}</h1>
            <h2 className="mb-6 text-3xl font-bold">Liste des livres</h2>

            <ul className="space-y-3">
              <li>
                <Link
                  to="/details/$id"
                  params={{ id: '1' }}
                  className="text-blue-600 hover:underline"
                >
                  Livre 1
                </Link>
              </li>

              <li>
                <Link
                  to="/details/$id"
                  params={{ id: '2' }}
                  className="text-blue-600 hover:underline"
                >
                  Livre 2
                </Link>
              </li>
            </ul>

            <Link
              to="/addbook"
              className="mt-6 inline-block rounded-lg bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-700"
            >
              Ajouter un livre
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
