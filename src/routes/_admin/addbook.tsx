import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { addBook } from '#/book/serviceBook.ts'

export const Route = createFileRoute('/_admin/addbook')({
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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-100 p-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 px-6 py-4 text-amber-800 shadow-sm">
          🔒 Espace administrateur • Ajout d'un nouvel ouvrage
        </div>

        <div className="overflow-hidden rounded-3xl bg-white shadow-2xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-600 to-orange-500 p-8 text-white">
            <p className="text-sm uppercase tracking-widest text-amber-100">
              Bibliothèque
            </p>

            <h1 className="mt-2 text-4xl font-black">
              Ajouter un nouveau livre
            </h1>

            <p className="mt-3 text-amber-100">
              Enrichissez votre catalogue avec un nouvel ouvrage.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="grid gap-6 p-8 md:grid-cols-2"
          >
            <div className="flex flex-col gap-2">
              <label className="font-medium text-slate-700">
                Titre du livre
              </label>

              <input
                placeholder="Ex : Le Petit Prince"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="rounded-xl border border-slate-300 px-4 py-3 transition focus:border-amber-500 focus:outline-none focus:ring-4 focus:ring-amber-100"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-medium text-slate-700">Auteur</label>

              <input
                placeholder="Ex : Antoine de Saint-Exupéry"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="rounded-xl border border-slate-300 px-4 py-3 transition focus:border-amber-500 focus:outline-none focus:ring-4 focus:ring-amber-100"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-medium text-slate-700">Catégorie</label>

              <input
                placeholder="Roman, Science-Fiction..."
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="rounded-xl border border-slate-300 px-4 py-3 transition focus:border-amber-500 focus:outline-none focus:ring-4 focus:ring-amber-100"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-medium text-slate-700">
                Année de publication
              </label>

              <input
                type="number"
                placeholder="2025"
                value={yearPublished}
                onChange={(e) => setYearPublished(e.target.value)}
                className="rounded-xl border border-slate-300 px-4 py-3 transition focus:border-amber-500 focus:outline-none focus:ring-4 focus:ring-amber-100"
              />
            </div>

            <div className="md:col-span-2 flex flex-col gap-2">
              <label className="font-medium text-slate-700">
                Nombre d'exemplaires
              </label>

              <input
                type="number"
                placeholder="10"
                value={exemplaryNumber}
                onChange={(e) => setExemplaryNumber(e.target.value)}
                className="rounded-xl border border-slate-300 px-4 py-3 transition focus:border-amber-500 focus:outline-none focus:ring-4 focus:ring-amber-100"
              />
            </div>

            <div className="md:col-span-2 mt-4 flex justify-end gap-4">
              <button
                type="button"
                onClick={() => navigate({ to: '/book' })}
                className="rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Annuler
              </button>

              <button
                type="submit"
                className="rounded-xl bg-gradient-to-r from-amber-600 to-orange-500 px-8 py-3 font-semibold text-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                📚 Ajouter au catalogue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
