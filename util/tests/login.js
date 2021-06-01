const request = require('supertest')

module.exports = async function(name){
    const credential = {
        email: name + '@test.com',
        password: 'password'
    }
    const res = await request('http://localhost:4000')
    .post('/login')
    .send(credential)
    return res.header['auth-token']
}