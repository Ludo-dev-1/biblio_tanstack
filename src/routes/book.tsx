import { createFileRoute, Link } from '@tanstack/react-router'
import type { BookRequest } from '#/book/serviceBook.ts'
/* import { getAllBookWithLoader } from '#/book/serviceBook.ts'*/
import { getAllBook } from '#/book/serviceBook.ts'

export const Route = createFileRoute('/book')({
  loader: getAllBook,

  // le pendingComponent se déclenche si le chargment dépasse une seconde
  // ici j'ai mis une div avec un texte, mais on pourrait très bien mettre
  // un composant avec un loader.
  pendingComponent: () => <div>Chargement des livres...</div>,

  // L'errorComponent se déclenche s'il y a une erreur lors du chargement,
  // un composant serait plus approprié, mais c'était juste pour l'exemple.
  errorComponent: () => <div>Erreur lors du chargement des livres</div>,

  component: Books,
})

function Books() {
  const books: [BookRequest] = Route.useLoaderData()
  const name = localStorage.getItem('name')

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-100">
      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Header */}
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-amber-600">
              Bibliothèque numérique
            </p>

            <h1 className="mt-2 text-5xl font-black text-slate-900">
              Bonjour {name}
            </h1>

            <p className="mt-3 text-lg text-slate-600">
              Explorez et gérez votre collection de livres.
            </p>
          </div>

          <Link
            to="/addbook"
            className="rounded-2xl bg-slate-900 px-6 py-4 text-center font-semibold text-white transition-all hover:-translate-y-1 hover:bg-slate-800 hover:shadow-xl"
          >
            ➕ Ajouter un livre
          </Link>
        </div>

        {/* Stats */}
        <div className="mb-10 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-lg">
            <p className="text-sm text-slate-500">Livres enregistrés</p>
            <p className="mt-2 text-4xl font-bold text-slate-900">
              {books.length}
            </p>
          </div>

          <div className="rounded-2xl bg-amber-100 p-6 shadow-lg">
            <p className="text-sm text-amber-700">Catalogue</p>
            <p className="mt-2 text-2xl font-bold text-amber-900">Disponible</p>
          </div>

          <div className="rounded-2xl bg-slate-900 p-6 text-white shadow-lg">
            <p className="text-sm opacity-70">Application</p>
            <p className="mt-2 text-2xl font-bold">TanStack Biblio</p>
          </div>
        </div>

        {/* Livres */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {books.map((book) => (
            <Link
              key={book.id}
              to="/details/$id"
              params={{
                id: String(book.id),
              }}
              className="group rounded-3xl border border-amber-100 bg-white p-6 transition-all hover:-translate-y-2 hover:border-amber-300 hover:shadow-2xl"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                  Livre
                </span>

                <span className="text-slate-400 transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>

              <h3 className="line-clamp-2 text-xl font-bold text-slate-900">
                {book.title}
              </h3>

              <p className="mt-3 text-sm text-slate-500">
                Cliquez pour consulter les détails du livre.
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
