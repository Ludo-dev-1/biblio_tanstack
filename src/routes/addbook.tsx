import { createFileRoute, redirect } from '@tanstack/react-router'

import { isAdmin } from '#/auth/service'

export const Route = createFileRoute('/addbook')({
   beforeLoad: () => {
    const token = localStorage.getItem('token')

    if (!token) {
      throw redirect({
        to: '/login',
      })
    }

    if (!isAdmin()) {
      throw redirect({
        to: '/access-denied',
      })
    }
  },

  component: AddBook,
})

function AddBook() {
  return <div>Hello "/addbook"!</div>
}
