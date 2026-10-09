import { createFileRoute, Link } from '@tanstack/react-router'
import { getBook } from '#/book/serviceBook.ts'

export const Route = createFileRoute('/details/$id')({
  loader: async ({ params }) => {
    return getBook(params.id)
  },

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
    const book : Book = Route.useLoaderData()
    const { id } = Route.useParams()

    return (
      <div>
        <h1>Titre : {book.title}</h1>
        <p>Auteur : {book.author}</p>
        <p>Année de publication : {book.yearPublished}</p>
        <p>Catégorie : {book.category}</p>
        <p>Nombre d'exemplaire : {book.exemplaryNumber}</p>
        <Link
          to="/admin/deleteBook/$id"
          className="mt-6 inline-block rounded-lg bg-red-600 px-4 py-2 font-semibold text-white hover:bg-green-700"
          params={id}
        >
          Supprimer un livre
        </Link>
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

