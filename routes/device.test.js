const request = require('supertest')
const app = require('../app')
const Device = require('../models/device');
const User = require('../models/user');

describe('GET Endpoints', () => {
  it('should fetch all devices', async () => {
    const res = await request(app).get('/devices')
    console.log(res)
    expect(res.statusCode).toEqual(200)
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