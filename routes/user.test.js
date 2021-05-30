const request = require('supertest')
const user = require('../models/user')
const loginWith = require('../util/tests/login')
const { RolesTypes } = require('../util/types/roles-types')

describe('Users Routes', () => {
  
  describe('/users', () => {

    it('GET: fetch an array of users', async () => {
      const res = await request('http://localhost:4000')
      .get('/users')
      expect(res.statusCode).toEqual(200)
      expect(Array.isArray(res.body)).toEqual(true)
    })
    
    it('Check for TEST USERS FOR ALL ROLES', async () => {
      const res = await request('http://localhost:4000')
        .get('/users')
      const emails = res.body.map(user => user.email)
      expect(emails.includes(`${RolesTypes.Admin}@test.com`.toLowerCase())).toEqual(true)
      expect(emails.includes(`${RolesTypes.Maintainer}@test.com`.toLowerCase())).toEqual(true)
      expect(emails.includes(`${RolesTypes.User}@test.com`.toLowerCase())).toEqual(true)
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

      const token = await loginWith(RolesTypes.Admin)
      
      const res = await request('http://localhost:4000')
        .post('/users')
        .set({'auth-token': token})
        .send(user)
      expect(res.statusCode).toEqual(200)
      expect(res.body.name).toEqual(name)
      expect(res.body.email).toEqual(user.email)
      expect(res.body.roleId).toEqual(user.roleId)
    })
      
  })

})
