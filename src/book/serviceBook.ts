import { httpClient } from '../api/http-client'

export interface BookRequest {
  id?: string
  title: string
  author: string
  category: string
  yearPublished: number
  exemplaryNumber: number
}
export async function getBooksAuthor() {
  const token = localStorage.getItem('token')

  const response = await httpClient.get('/api/books', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const authors = response.data.map((book: any) => book.author)

  // Crée une nouvelle instance de Set en utilisant les valeurs du tableau authors,
  // un Set est comme un tableau sauf qu'il n'accepte pas les doublons
  const uniqueAuthors = new Set(authors)

  return uniqueAuthors.size
}

export async function getAllBook() {
  const token = localStorage.getItem('token')
  const response = await httpClient.get('/api/books', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  console.log(response.data)
  return response.data
}
export async function getAllBookWithLoader() {
  await new Promise((resolve) => setTimeout(resolve, 3000))

  const token = localStorage.getItem('token')

  const response = await httpClient.get('/api/books', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data
}
export async function getBook(id: string) {
  const token = localStorage.getItem('token')

  const response = await httpClient.get('/api/books/' + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data
}

export async function deleteBook(id: string) {
  const token = localStorage.getItem('token')

  return httpClient.delete(`/api/books/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export async function addBook(book: BookRequest) {
  const token = localStorage.getItem('token')

  const response = await httpClient.post('/api/books', book, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data
}
