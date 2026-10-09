import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/addbook')({
  component: addBook,
})

function addBook() {
  return <div>Hello "/addbook"!</div>
}
