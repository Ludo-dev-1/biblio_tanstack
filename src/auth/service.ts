import { httpClient } from '../api/http-client'

export async function loginFunction(email: string, password: string) {
  const response = await httpClient.post('api/auth/login', { email, password })
  localStorage.setItem('token', response.data.token)
  return response
}

export function logoutFunction() {
  localStorage.removeItem(`token`)
  localStorage.removeItem('name')
  localStorage.removeItem('email')
}

export async function registerFunction(
  name: string,
  email: string,
  password: string,
) {
  const response = await httpClient.post(`api/auth/register`, {
    name,
    password,
    email,
  })
  return response
}
export function getRoles(token: string) {
  // Séparer le token par les points et récupérer le payload avec l'index 1
  const payload = token.split('.')[1]
  console.log('payload brut :' + payload)
  // Décoder le payload Base64 puis le convertir en objet JavaScript
  const data = JSON.parse(atob(payload))
  console.log('DATA : ', data)
  // Découper la chaîne des scopes en un tableau
  const authorities = data.scope.split(' ')
  console.log('AUTHORITIES : ', authorities)
  // Ne conserver que les scopes correspondant à des rôles
  return authorities.filter((authority: string) =>
    authority.startsWith('ROLE_'),
  )
}

export function hasRole(role: string | string[]): boolean {
  // Récupère le token stocké dans le localStorage
  const token = localStorage.getItem('token')
  // Si aucun token n'est présent, l'utilisateur n'est pas connecté
  if (!token) {
    return false
  }
  // Extrait la liste des rôles contenus dans le token grâce à GetRoles
  const roles = getRoles(token)
  console.log('roles :', roles)
  // Vérifie si le rôle demandé est présent dans la liste des rôles
  return roles.includes(role)
}

export function isAdmin(): boolean {
  const roles = localStorage.getItem('roles')

  if (!roles) {
    return false
  }

  return JSON.parse(roles).includes('ROLE_ADMIN')
}