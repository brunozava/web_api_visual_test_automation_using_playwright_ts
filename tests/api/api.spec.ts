import { test, expect } from '@playwright/test'

test.describe.parallel('api testing', () => {
const baseUrl = 'https://reqres.in/api'
    test('simple api test - assert response status', async ({ request }) => {
        const response = await request.get(`${baseUrl}/users/2`)
        expect(response.status()).toBe(200)

        const responseBody = JSON.parse(await response.text())
    })

    test('simple api test - assert invalid endpoint', async ({ request }) => {
        const response = await request.get(`${baseUrl}/users/non-existing-endpoint`)
        expect(response.status()).toBe(404)
    })

    test('GET request - get user detail ', async ({ request }) => {
        const response = await request.get(`${baseUrl}/users/1`)
        const responseBody = JSON.parse(await response.text())

        expect(response.status()).toBe(200)
        expect(responseBody.data.id).toBe(1)
        expect(responseBody.data.first_name).toEqual('George')
        expect(responseBody.data.last_name).toBe('Bluth')
        expect(responseBody.data.email).toBeTruthy()
    })

    test('POST request - create new user ', async ({ request }) => {
        const response = await request.post(`${baseUrl}/users/`, {
            data: {
                id: 1253,
            },
        })
        const responseBody = JSON.parse(await response.text())
        expect(responseBody.id).toBe(1253)
        expect(responseBody.createdAt).toBeTruthy()
    })

    test('POST request - login ', async ({ request }) => {
        const response = await request.post(`${baseUrl}/login/`, {
            data: {
                email: "eve.holt@reqres.in",
                password: "cityslicka"
            },
        })
        const responseBody = JSON.parse(await response.text())
        expect(response.status()).toBe(200)
        expect(responseBody.token).toBeTruthy()
    })

    test('POST request - login fail ', async ({ request }) => {
        const response = await request.post(`${baseUrl}/login/`, {
            data: {
                email: "peter@klaven"
            },
        })
        const responseBody = JSON.parse(await response.text())
        expect(response.status()).toBe(400)
        expect(responseBody.error).toBe('Missing password')
    })

    test('PUT request - update user ', async ({ request }) => {
        const response = await request.put(`${baseUrl}/users/2`, {
            data: {
                name: "new name",
                job: "new job"
            },
        })
        const responseBody = JSON.parse(await response.text())
        expect(response.status()).toBe(200)
        expect(responseBody.name).toBe('new name')
        expect(responseBody.job).toBe('new job')
        expect(responseBody.updatedAt).toBeTruthy()
    })

    test('DELETE request - delete user ', async ({ request }) => {
        const response = await request.delete(`${baseUrl}/users/2`)
        expect(response.status()).toBe(204)
    })
})