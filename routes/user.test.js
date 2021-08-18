const request = require('supertest')
const { extractUpdateUserStructure } = require('../util/schemas/user')
const tokenOf = require('../util/tests/login')
const { RolesTypes } = require('../util/types/roles-types')

describe('Users Routes', () => {

  // it('GET: fetch an array of users', async () => {
  //   const res = await request('http://localhost:4000')
  //   .get('/users')
  //   expect(res.statusCode).toEqual(200)
  //   expect(Array.isArray(res.body)).toEqual(true)
  // })
  
  it('Check for TEST USERS FOR ALL ROLES', async () => {
    const res = await request('http://localhost:4000')
      .get('/users')
    const emails = res.body.map(user => user.email)
    expect(emails.includes(`${RolesTypes.Admin}@test.com`.toLowerCase())).toEqual(true)
    expect(emails.includes(`${RolesTypes.Maintainer}@test.com`.toLowerCase())).toEqual(true)
    expect(emails.includes(`${RolesTypes.User}@test.com`.toLowerCase())).toEqual(true)
  })
  
  describe("GET:{userId}", ()=>{
    it('fetch a user', async () => {
      const usersRes = await request('http://localhost:4000')
      .get('/users')
      const user = usersRes.body[0]
      const userRes = await request('http://localhost:4000')
      .get('/users/' + user._id)
      expect(userRes.statusCode).toEqual(200)
      expect(userRes.body._id).toEqual(user._id)
    })

    it('do not pass a user id, it should fetch an array of users', async () => {
      const userRes = await request('http://localhost:4000')
      .get('/users/')

      expect(userRes.statusCode).toEqual(200)
      expect(Array.isArray(userRes.body)).toBeTruthy()
    })

    it('pass a not existing user id, should return Not Found', async () => {
      const userRes = await request('http://localhost:4000')
      .get('/users/' + '60ad612f08af4d23bcb72000')

      expect(userRes.statusCode).toEqual(404)
      expect(typeof userRes.body).toEqual('string')
    })

    it('pass a wrong mongoose id, should return Unprocessable Entity', async () => {
      const userRes = await request('http://localhost:4000')
      .get('/users/' + '0123')

      expect(userRes.statusCode).toEqual(422)
      expect(typeof userRes.body).toEqual('string')
    })
  })

  describe("POST, PUT, and DELETE", ()=>{
    const name = `test${Math.random()}`
    let user = {
      email: `${name}@test.com`,
      password: "password",
      roleId: "60affa60010f82a1f2d5697c",
      name,
      birthdate: new Date()
    }      
    let adminToken, testUserToken, _id;
    
    beforeAll(async () => {
      adminToken = await tokenOf(RolesTypes.Admin)
    });
    
    it('POST: add a user', async () => {
      
      const res = await request('http://localhost:4000')
        .post('/users')
        .set({'auth-token': adminToken})
        .send(user)
      _id = res.body._id
      expect(res.statusCode).toEqual(200)
      expect(res.body.name).toEqual(name)
      expect(res.body.email).toEqual(user.email)
      expect(res.body.roleId).toEqual(user.roleId)
    })

    it('POST: change password', async () => {
      
      testUserToken = await tokenOf(name)
      const res = await request('http://localhost:4000')
        .post('/users/change-password')
        .set({'auth-token': testUserToken})
        .send({
          oldPassword: "password",
          newPassword: "newPassword"
        })
      expect(res.statusCode).toEqual(200)
      expect(res.body._id).toEqual(_id)
      expect(res.body.name).toEqual(name)
      expect(res.body.email).toEqual(user.email)
      expect(res.body.roleId).toEqual(user.roleId)
    })
      
    it('PUT: update a user', async () => {
      user.name = "updated" + user.name
      const res = await request('http://localhost:4000')
        .put('/users/' + _id)
        .set({'auth-token': adminToken})
        .send(extractUpdateUserStructure(user))
      expect(res.statusCode).toEqual(200)
      expect(res.body._id).toEqual(_id)
      expect(res.body.name).toEqual(user.name)
      expect(res.body.email).toEqual(user.email)
      expect(res.body.roleId).toEqual(user.roleId)
    })

    it('DELETE: delete a user', async () => {
      const res = await request('http://localhost:4000')
        .delete('/users/' + _id)
        .set({'auth-token': adminToken})
        .send(user)
      expect(res.statusCode).toEqual(200)
      expect(res.body._id).toEqual(_id)
      expect(res.body.name).toEqual(user.name)
      expect(res.body.email).toEqual(user.email)
      expect(res.body.roleId).toEqual(user.roleId)
    })
  })

})