import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/details/$id')({
  component: detailsPage,
})

function detailsPage() {
  const { id } = Route.useParams()

  return (
    <div>
      <h1>Détail du livre {id}</h1>
      <Link to="/"> Retour à l'accueil </Link>
    </div>
  )
}
