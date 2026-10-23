import { createFileRoute, Link } from '@tanstack/react-router'
import type { BookRequest } from '#/book/serviceBook.ts'
import { getBook } from '#/book/serviceBook.ts'

export const Route = createFileRoute('/details/$id')({
  loader: async ({ params }) => {
    return getBook(params.id)
  },

  component: DetailsPage,
})

function DetailsPage() {
  const book: BookRequest = Route.useLoaderData()

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-100 p-6">
      <div className="mx-auto max-w-5xl">
        <Link
          to="/book"
          className="mb-6 inline-flex items-center gap-2 text-slate-600 transition hover:text-slate-900"
        >
          ← Retour au catalogue
        </Link>

        <div className="overflow-hidden rounded-3xl bg-white shadow-2xl">
          <div className="bg-gradient-to-r from-amber-600 to-orange-500 p-10 text-white">
            <span className="rounded-full bg-white/20 px-4 py-1 text-sm font-medium backdrop-blur">
              📚 Fiche Livre
            </span>

            <h1 className="mt-4 text-5xl font-black">{book.title}</h1>

            <p className="mt-3 text-lg text-amber-100">Par {book.author}</p>
          </div>

          <div className="grid gap-8 p-8 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6">
              <p className="text-sm font-medium text-slate-500">Auteur</p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {book.author}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6">
              <p className="text-sm font-medium text-slate-500">
                Année de publication
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {book.yearPublished}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6">
              <p className="text-sm font-medium text-slate-500">Catégorie</p>

              <div className="mt-3 inline-block rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-700">
                {book.category}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6">
              <p className="text-sm font-medium text-slate-500">
                Nombre d'exemplaires
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {book.exemplaryNumber}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 border-t border-slate-200 p-8 sm:flex-row">
            <Link
              to="/deleteBook/$id"
              params={{ id: String(book.id) }}
              className="rounded-2xl bg-red-600 px-6 py-4 text-center font-semibold text-white transition-all hover:-translate-y-1 hover:bg-red-700 hover:shadow-xl"
            >
              🗑️ Supprimer le livre
            </Link>

            <Link
              to="/book"
              className="rounded-2xl border border-slate-300 px-6 py-4 text-center font-semibold text-slate-700 transition-all hover:bg-slate-100"
            >
              Retour au catalogue
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

/*
export const Route = createFileRoute('/details/$id')({
  component: DetailsPage,
})

interface Book {
  title: string
  author: string
  yearPublished: string
  category: string
  exemplaryNumber: number
}

function DetailsPage() {
  const [book, setBook] = useState<Book | null>(null)

  const { id } = Route.useParams()

  useEffect(() => {
    getBook(id).then((data) => setBook(data))
  }, [id])

  if (!book) {
    return <div>Chargement...</div>
  }

  return (
     <div>
        <h1>Titre : {book.title}</h1>
        <p>Auteur : {book.author}</p>
        <p>Année de publication : {book.yearPublished}</p>
        <p>Catégorie : {book.category}</p>
        <p>Nombre d'exemplaire : {book.exemplaryNumber}</p>
      </div>
  )
}*/
