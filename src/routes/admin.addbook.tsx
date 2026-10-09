import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { addBook } from '#/book/serviceBook'

export const Route = createFileRoute('/admin/addbook')({
  component: AddBook,
})

function AddBook() {
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [category, setCategory] = useState('')
  const [yearPublished, setYearPublished] = useState('')
  const [exemplaryNumber, setExemplaryNumber] = useState('')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    try {
      await addBook({
        title,
        author,
        category,
        yearPublished: Number(yearPublished),
        exemplaryNumber: Number(exemplaryNumber),
      })

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
      <h1 className="mb-6 text-2xl font-bold">Ajouter un livre</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          placeholder="Titre"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder="Auteur"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />

        <input
          placeholder="Catégorie"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          type="number"
          placeholder="Année"
          value={yearPublished}
          onChange={(e) => setYearPublished(e.target.value)}
        />

        <input
          type="number"
          placeholder="Nombre d'exemplaires"
          value={exemplaryNumber}
          onChange={(e) => setExemplaryNumber(e.target.value)}
        />

        <button
          type="submit"
          className="rounded bg-green-600 px-4 py-2 text-white"
        >
          Ajouter
        </button>
      </form>
    </div>
  )
}