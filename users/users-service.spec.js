const { isValid } = require('./users-service')

describe('testing user validation function', () => {

    it('should reject req.body with no password', () => {

        const user = {
            username: 'mixo'
        }
        expect(isValid(user)).toBeFalsy()
    })

    it('should accept req.body required fields', () => {

        const user = {
            username: 'mixoo',
            password: '123abc'
        }
        expect(isValid(user)).toBeTruthy()
    })
}) 