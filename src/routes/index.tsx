import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { logoutFunction } from '#/auth/service.ts'
import { useState } from 'react'
import { getAllBook, getBooksAuthor } from '#/book/serviceBook.ts'

export const Route = createFileRoute('/')({
  loader: async () => {
    const [books, nbrAuthors] = await Promise.all([
      getAllBook(),
      getBooksAuthor(),
    ])

    return { books, nbrAuthors }
  },

  pendingComponent: () => <div>Chargement des livres...</div>,

  errorComponent: () => <div>Erreur lors du chargement des livres</div>,

  component: Home,
})
function Home() {
  const navigate = useNavigate()

  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('token'),
  )
  const { books, nbrAuthors } = Route.useLoaderData()

  function logout() {
    logoutFunction()
    navigate({ to: '/login' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-100">
      {isAuthenticated && (
        <div className="absolute right-6 top-6">
          <button
            type="button"
            onClick={() => {
              logout()
              setIsAuthenticated(false)
            }}
            className="rounded-full border border-red-200 bg-white px-5 py-2 text-sm font-medium text-red-600 shadow-sm transition-all hover:bg-red-50 hover:shadow-md"
          >
            Déconnexion
          </button>
        </div>
      )}

      <div className="mx-auto flex min-h-screen max-w-7xl items-center px-6">
        <div className="grid w-full items-center gap-16 lg:grid-cols-2">
          {/* Partie gauche */}
          <div>
            <span className="inline-block rounded-full bg-amber-100 px-4 py-1 text-sm font-medium text-amber-700">
              📚 Gestion de bibliothèque
            </span>

            <h1 className="mt-6 text-5xl font-black leading-tight text-slate-900">
              Votre collection de livres,
              <span className="block text-amber-600">
                organisée intelligemment.
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-slate-600">
              Consultez, ajoutez et gérez votre catalogue de livres simplement
              grâce à une interface moderne construite avec TanStack Router et
              React.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              {isAuthenticated ? (
                <Link
                  to="/book"
                  className="rounded-xl bg-slate-900 px-8 py-4 font-semibold text-white transition-all hover:-translate-y-1 hover:bg-slate-800 hover:shadow-xl"
                >
                  📖 Voir les livres
                </Link>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="rounded-xl bg-amber-500 px-8 py-4 font-semibold text-white transition-all hover:-translate-y-1 hover:bg-amber-600 hover:shadow-xl"
                  >
                    Créer un compte
                  </Link>

                  <Link
                    to="/login"
                    className="rounded-xl border border-slate-300 bg-white px-8 py-4 font-semibold text-slate-700 transition-all hover:-translate-y-1 hover:shadow-lg"
                  >
                    Se connecter
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Partie droite */}
          <div className="relative hidden lg:block">
            <div className="absolute -left-6 -top-6 h-32 w-32 rounded-full bg-amber-300/30 blur-3xl" />
            <div className="absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-orange-300/30 blur-3xl" />

            <div className="rounded-3xl border border-white/50 bg-white/70 p-10 shadow-2xl backdrop-blur">
              <div className="space-y-4">
                <div className="rounded-xl bg-slate-100 p-4">
                  <p className="text-sm text-slate-500">Livres référencés</p>
                  <p className="text-3xl font-bold text-slate-900">
                    {books.length}
                  </p>
                </div>

                <div className="rounded-xl bg-amber-50 p-4">
                  <p className="text-sm text-amber-700">Auteurs enregistrés</p>
                  <p className="text-3xl font-bold text-amber-900">
                    {nbrAuthors}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-900 p-4 text-white">
                  <p className="text-sm opacity-80">
                    Application React + TanStack
                  </p>
                  <p className="text-xl font-semibold">
                    Gestion rapide et intuitive
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
