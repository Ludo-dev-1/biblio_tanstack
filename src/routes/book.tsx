import {createFileRoute, Link} from '@tanstack/react-router'
import type {BookRequest} from '#/book/serviceBook.ts'
/* import { getAllBookWithLoader } from '#/book/serviceBook.ts'*/
import {getAllBook} from '#/book/serviceBook.ts'

export const Route = createFileRoute('/book')({
  loader: getAllBook,

  pendingComponent: () => <div>Chargement des livres...</div>,

  errorComponent: () => <div>Erreur lors du chargement des livres</div>,

  component: Books,
})

function Books() {
  const books: [BookRequest] = Route.useLoaderData()
  const name = localStorage.getItem('name')

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-8">
      <div className="w-full max-w-2xl rounded-xl bg-white p-8 shadow-lg">
        <h1>Bienvenue {name}</h1>
        <h2 className="mb-6 text-3xl font-bold">Liste des livres</h2>

        <ul className="space-y-3">
          {books.map((book) => (
            <li key={book.id}>
              <Link
                to="/details/$id"
                params={{
                  id: book.id,
                }}
                className="text-blue-600 hover:underline"
              >
                {book.title}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          to="/admin/addbook"
          className="mt-6 inline-block rounded-lg bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-700"
        >
          Ajouter un livre
        </Link>
        {/*    <Link
          to="/addbook"
          className="mt-6 inline-block rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-green-700"
        >
          Ajouter un livre sans route Admin parent
        </Link>*/}
      </div>
    </div>
  )
}
