import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import { isAdmin } from '#/auth/service.ts'

export const Route = createFileRoute('/admin')({
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

  component: AdminLayout,
})

function AdminLayout() {
  return (
    <div>
      <h1>Administration</h1>
      <Outlet />
    </div>
  )
}
