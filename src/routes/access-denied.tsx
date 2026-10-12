import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/access-denied')({
  component: AccessDenied,
})

function AccessDenied() {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate({ to: '/' })
    }, 3000)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-red-600">
          Vous n'êtes pas autorisé à accéder à cette page
        </h2>

        <p className="mt-4 text-gray-600">
          Redirection vers l'accueil dans 3 secondes...
        </p>
      </div>
    </div>
  )
}
