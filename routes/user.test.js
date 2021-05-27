const request = require('supertest')
const { AddUserSchema } = require('../util/schemas/user')


describe('Users Routes', () => {
  
  describe('/users', () => {

    it('GET: fetch an array of users', async () => {
      const res = await request('http://localhost:4000')
        .get('/users')
      expect(res.statusCode).toEqual(200)
      expect(Array.isArray(res.body)).toEqual(true)
    })
      
    it('GET:{userId} fetch a user', async () => {
      const usersRes = await request('http://localhost:4000')
      .get('/users')
      const user = usersRes.body[0]
      const userRes = await request('http://localhost:4000')
      .get('/users/' + user._id)
      expect(userRes.statusCode).toEqual(200)
      expect(userRes.body._id).toEqual(user._id)
    })
    
    it('POST: add a user', async () => {
      const name = `test${Math.random()}`
      const user = {
        email: `${name}@test.com`,
        password: "test",
        roleId: "60affa60010f82a1f2d5697c",
        name,
        birthdate: new Date()
      }      
      const res = await request('http://localhost:4000')
        .post('/users')
        .send(user)
      // expect(res.statusCode).toEqual(200)
      // expect(Array.isArray(res.body)).toEqual(true)
      console.log(res.body)
    })
      
  })

})
