const request = require('supertest')
const { AddUserSchema } = require('../util/schemas/user')


describe('Users Routes', () => {
  
  describe('/users', () => {

    it('should fetch an array of users', async () => {
      const res = await request('http://localhost:4000')
        .get('/users')
      expect(res.statusCode).toEqual(200)
      expect(Array.isArray(res.body)).toEqual(true)
    })
      
    it('should fetch a user', async () => {
      const usersRes = await request('http://localhost:4000')
        .get('/users')
      const user = usersRes.body[0]
      const userRes = await request('http://localhost:4000')
        .get('/users/' + user._id)
      expect(userRes.statusCode).toEqual(200)
      expect(userRes.body._id).toEqual(user._id)
    })

  })

})

// describe('Post API Endpoints', () => {
//   it('should create a new user', async () => {
//     const fetchUsers = await request('http://localhost:4000').get('/users')
//     const userId = fetchUsers.body[0]._id
//     const correctDevice = {
//       "name": "test",
//       "userId": userId,
//       "history": [userId]
//     }

//     const res = await request('http://localhost:4000')
//       .post('/devices')
//       .send(correctDevice)
    
//     expect(res.statusCode).toEqual(200)
//     expect(res.body.name).toEqual(correctDevice.name)
//     expect(res.body.userId).toEqual(correctDevice.userId)
//     expect(res.body.history).toEqual(correctDevice.history)
//     expect(Boolean(res.body._id)).toBeTruthy()
//   })
// })