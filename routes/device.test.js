const request = require('supertest')
const tokenOf = require('../util/tests/login')
const { RolesTypes } = require('../util/types/roles-types')

describe('Devices Routes', () => {

  it('GET: fetch an array of devices', async () => {
    const res = await request('http://localhost:4000')
    .get('/devices')
    expect(res.statusCode).toEqual(200)
    expect(Array.isArray(res.body)).toEqual(true)
  })
  
  it('GET:{deviceId} fetch a device', async () => {
    const devicesRes = await request('http://localhost:4000')
    .get('/devices')
    const device = devicesRes.body[0]
    const deviceRes = await request('http://localhost:4000')
    .get('/devices/' + device._id)
    expect(deviceRes.statusCode).toEqual(200)
    expect(deviceRes.body._id).toEqual(device._id)
  })

  // describe("POST, PUT, and DELETE", ()=>{
  //   const name = `test${Math.random()}`
  //   let device = {
  //     email: `${name}@test.com`,
  //     password: "password",
  //     roleId: "60affa60010f82a1f2d5697c",
  //     name,
  //     birthdate: new Date()
  //   }      
  //   let adminToken, testUserToken, _id;
    
  //   beforeAll(async () => {
  //     adminToken = await tokenOf(RolesTypes.Admin)
  //   });
    
  //   it('POST: add a device', async () => {
      
  //     const res = await request('http://localhost:4000')
  //       .post('/devices')
  //       .set({'auth-token': adminToken})
  //       .send(device)
  //     _id = res.body._id
  //     expect(res.statusCode).toEqual(200)
  //     expect(res.body.name).toEqual(name)
  //     expect(res.body.email).toEqual(device.email)
  //     expect(res.body.roleId).toEqual(device.roleId)
  //   })
      
  //   it('PUT: update a device', async () => {
  //     device.name = "updated" + device.name
  //     device.email = "updated" + device.email
  //     const res = await request('http://localhost:4000')
  //       .put('/devices/' + _id)
  //       .set({'auth-token': adminToken})
  //       .send(device)
  //     expect(res.statusCode).toEqual(200)
  //     expect(res.body._id).toEqual(_id)
  //     expect(res.body.name).toEqual(device.name)
  //     expect(res.body.email).toEqual(device.email)
  //     expect(res.body.roleId).toEqual(device.roleId)
  //   })

  //   it('DELETE: delete a device', async () => {
  //     const res = await request('http://localhost:4000')
  //       .delete('/devices/' + _id)
  //       .set({'auth-token': adminToken})
  //       .send(device)
  //     expect(res.statusCode).toEqual(200)
  //     expect(res.body._id).toEqual(_id)
  //     expect(res.body.name).toEqual(device.name)
  //     expect(res.body.email).toEqual(device.email)
  //     expect(res.body.roleId).toEqual(device.roleId)
  //   })
  // })

})