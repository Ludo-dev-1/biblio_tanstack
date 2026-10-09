import { createFileRoute } from '@tanstack/react-router'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const Route = createFileRoute('/access-denied')({
  component: AccessDenied,
})

function AccessDenied() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <h2 className="text-2xl font-bold text-red-600">
        Vous n'êtes pas autorisé à accéder à cette page
      </h2>
    </div>
  )
}
