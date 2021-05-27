const request = require('supertest')

describe('/devices - GET API Endpoints', () => {
  let res;
  beforeEach(async ()=>{
    res = await request('http://localhost:4000').get('/devices')
  })
  it('should fetch devices with 200 status', () => {
    expect(res.statusCode).toEqual(200)
  })
  
  it('should return array', () => {
    expect(Array.isArray(res.body)).toEqual(true)
  })
})

// describe('Post Endpoints', () => {
//   it('should create a new device', async () => {
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