import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { deleteBook } from '#/book/serviceBook.ts'

export const Route = createFileRoute('/_admin/deleteBook/$id')({
  component: DeleteBook,
})

function DeleteBook() {
  const { id } = Route.useParams()
  const navigate = useNavigate()

  async function handleDelete() {
    try {
      await deleteBook(id)

      navigate({
        to: '/',
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="p-6">
      <div className="mb-6 rounded-lg border border-amber-300 bg-amber-50 p-4">
        🔒 Route protégée par le parent <code>/admin</code>
      </div>
      <h1 className="mb-4 text-2xl font-bold">Suppression d'un livre</h1>

      <p className="mb-4">Voulez-vous vraiment supprimer le livre :</p>

      <p className="mb-6 font-mono">{id}</p>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={handleDelete}
          className="rounded bg-red-600 px-4 py-2 text-white"
        >
          Supprimer
        </button>

        <Link to="/" className="rounded bg-gray-600 px-4 py-2 text-white">
          Annuler
        </Link>
      </div>
    </div>
  )
}
