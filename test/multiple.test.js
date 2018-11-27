const config = require('./fixture/nuxt-multiple-sitemap.config')
const { createConfig, get } = require('./utils')

// let nuxt
//
// test.before(async () => {
//   nuxt = await createConfig(config)
// })
//
// test('Route / exists and renders correcly', async t => {
//   const context = {}
//   const { html } = await nuxt.renderRoute('/', context)
//   t.true(html.includes('Works!'))
// })
//
// test('Main sitemap should exists', async t => {
//   let { body, statusCode } = await get('/sitemap.xml')
//   t.is(statusCode, 200)
//   t.true(body.includes('<loc>http://localhost:3001/</loc>'))
//   t.true(true)
// })
//
// test('Second sitemap should exists', async t => {
//   let { body, statusCode } = await get('/testing.xml')
//   t.is(statusCode, 200)
//   t.true(body.includes('<loc>http://localhost:3001/</loc>'))
//   t.true(true)
// })
//
// test.after.always('Closing server and nuxt.js', () => {
//   nuxt.close()
// })

describe('multiple sitemaps', () => {
  let nuxt

  beforeAll(async done => {
    nuxt = await createConfig(config)
    done()
  }, 60000)

  afterAll(async done => {
    await nuxt.close()
    done()
  })

  test('Route / exists and renders correcly', async done => {
    const context = {}
    const { html } = await nuxt.renderRoute('/', context)
    expect(html).toContain('/index')
    done()
  })

  test('Main sitemap should exists', async done => {
    let { body, statusCode } = await get('/sitemap.xml')
    expect(statusCode).toEqual(200)
    expect(body).toContain('<loc>http://localhost:3000/</loc>')
    done()
  })

  test('Second sitemap should exists', async done => {
    let { body, statusCode } = await get('/testing.xml')
    expect(statusCode).toEqual(200)
    expect(body).toContain('<loc>http://localhost:3000/</loc>')
    done()
  })
})
