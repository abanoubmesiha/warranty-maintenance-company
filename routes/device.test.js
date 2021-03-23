const request = require('supertest')
const app = require('../app')
const Device = require('../models/device');
const User = require('../models/user');

describe('/devices - GET API Endpoints', () => {
  it('should fetch devices with 200 status', async () => {
    const res = await request('http://localhost:4000').get('/devices')
    expect(res.statusCode).toEqual(200)
  })
  
  it('should return array', async () => {
    const res = await request('http://localhost:4000').get('/devices')
    expect(Array.isArray(res.body)).toEqual(true)
  })

  it('should return array that is not empty', async () => {
    const res = await request('http://localhost:4000').get('/devices')
    expect(res.body.length).toBeGreaterThan(0)
  })
})

// describe('Post Endpoints', () => {
//   let correctDevice;
//   beforeEach = async () => {
//       await Device.deleteMany({});
//       let userId = (await User.findOne())._id
//       correctDevice = {
//         name: 'test',
//         userId,
//         history: [userId]
//       }
//   }
//   it('should create a new device', async () => {
//     const res = await request(app)
//       .post('/devices')
//       .send(correctDevice)
//     console.log(res);
//     expect(res.statusCode).toEqual(200)
//     expect(res.body).toHaveProperty('post')
//   })
// })