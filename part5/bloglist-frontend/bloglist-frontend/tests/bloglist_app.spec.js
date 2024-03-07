import { test, expect, beforeEach, describe } from '@playwright/test'

describe('Note app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http:localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const locator = await page.getByText('Log in to application')
    await expect(locator).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByTestId('username').fill('mluukkai')
      await page.getByTestId('password').fill('salainen')
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('mluukkai logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByTestId('username').fill('mluukkai')
      await page.getByTestId('password').fill('wrong')
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('invalid username or password')).toBeVisible()

    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page, request }) => {
      await request.post('http:localhost:3003/api/testing/reset')
      await request.post('http://localhost:3003/api/users', {
        data: {
          name: 'Matti Luukkainen',
          username: 'mluukkai',
          password: 'salainen'
        }
      })

      await page.goto('http://localhost:5173')
      await page.getByTestId('username').fill('mluukkai')
      await page.getByTestId('password').fill('salainen')
      await page.getByRole('button', { name: 'login' }).click()
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'new blog' }).click()
      await page.getByPlaceholder('please write your title here').fill('test title')
      await page.getByPlaceholder('please write the author here').fill('test author')
      await page.getByPlaceholder('please write the url here').fill('test url')
      await page.getByRole('button', { name: 'Submit' }).click()
      await expect(page.getByText('A new blog test title by test author is added')).toBeVisible()
    })

  })

  describe('When logged in and created a blog', () => {
    beforeEach(async ({ page, request }) => {
      await request.post('http:localhost:3003/api/testing/reset')
      await request.post('http://localhost:3003/api/users', {
        data: {
          name: 'Matti Luukkainen',
          username: 'mluukkai',
          password: 'salainen'
        }
      })

      await page.goto('http://localhost:5173')
      await page.getByTestId('username').fill('mluukkai')
      await page.getByTestId('password').fill('salainen')
      await page.getByRole('button', { name: 'login' }).click()

      await page.getByRole('button', { name: 'new blog' }).click()
      await page.getByPlaceholder('please write your title here').fill('test title')
      await page.getByPlaceholder('please write the author here').fill('test author')
      await page.getByPlaceholder('please write the url here').fill('test url')
      await page.getByRole('button', { name: 'Submit' }).click()
    })



    test('a new blog can be updated', async ({ page }) => {
      await expect(page.getByText('test title')).toBeVisible()
      await page.getByRole('button', { name: 'View details' }).click()
      await page.getByRole('button', { name: 'like it' }).click()
      await expect(page.getByText('Likes: 1')).toBeVisible()
      await page.getByRole('button', { name: 'like it' }).click()
      await expect(page.getByText('Likes: 2')).toBeVisible()

    })
  })

})



