const supertest = require('supertest')
const server = require('./server')
const db = require('../database/dbConfig')

describe('server.js', () => {
    beforeAll(async () => {
        await db('users').truncate()
        await db('users').insert([
            {
                username: "emixo",
                password: "blahblah"
            }
        ])
    })

    it('POST /api/auth/register', () => {
        return supertest(server)
            .post('/api/auth/register')
            .send({ username: 'mixo', password: '123xyz' })
            .then(res => {
                expect(res.status).toBe(201)
            })
    })

    it('POST /api/auth/register', () => {
        return supertest(server)
            .post('/api/auth/register')
            .send({ username: 'roongy', password: '123def' })
            .then(res => {
                expect(res.body.username).toBe('roongy')
                expect(res.body.password).not.toBe('123def')
            })
    })

    it('POST /api/auth/login', () => {
        return supertest(server)
            .post('/api/auth/login')
            .send({ username: 'mixo', password: '123xyz' })
            .then(res => {
                expect(res.status).toBe(200)
            })
    })

    it('POST /api/auth/login', () => {
        return supertest(server)
            .post('/api/auth/login')
            .send({ username: 'xiana', password: '123xyz' })
            .then(res => {
                expect(res.body.token).not.toBeUndefined()
            })
    })

    it('GET /api/jokes', () => {
        return supertest(server)
            .get('/api/jokes')
            .then(res => {
                expect(res.status).toBe(401)
            })
    })

    it('GET /api/jokes', async () => {
        const res = await supertest(server)
            .post('/api/auth/login')
            .send({ username: 'roongytoongy', password: '123def' })

        return supertest(server)
            .get('/api/jokes')
            .set({ Authorization: res.body.token })
            .then(res => {
                expect(res.status).toBe(200)
            })
    })
})