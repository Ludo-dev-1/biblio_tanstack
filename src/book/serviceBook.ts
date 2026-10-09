import { httpClient } from '../api/http-client'

export interface BookRequest {
  title: string
  author: string
  category: string
  yearPublished: number
  exemplaryNumber: number
}

export async function getAllBook() {
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