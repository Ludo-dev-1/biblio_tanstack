import { createFileRoute, useNavigate } from '@tanstack/react-router'
import {  useState } from 'react'
import {getRoles, loginFunction } from '#/auth/service.ts'

export const Route = createFileRoute('/login')({
  component: login,
})

function login() {

  const navigate=useNavigate()
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    loginFunction(email, password)
      .then(() => {
        const token = localStorage.getItem('token')

        if (token) {
          const roles = getRoles(token)

          localStorage.setItem('roles', JSON.stringify(roles))
        }

        localStorage.setItem('email', email)
        localStorage.setItem('name', name)

        navigate({ to: '/' })
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <form
        className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg"
        onSubmit={handleSubmit}
      >
        <h1 className="mb-6 text-center text-3xl font-bold text-slate-800">
          Connexion
        </h1>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Nom
          </label>

          <input
            id="name"
            name="name"
            type="name"
            placeholder="nom"
            className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Email
          </label>

          <input
            id="email"
            name="email"
            type="email"
            placeholder="john@example.com"
            className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Mot de passe
          </label>

          <input
            id="password"
            name="password"
            type="password"
            placeholder="********"
            className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 active:scale-[0.99]"
        >
          Se connecter
        </button>
      </form>
    </div>
  )
}
