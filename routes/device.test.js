const request = require('supertest')
const tokenOf = require('../util/tests/login')
const { RolesTypes } = require('../util/types/roles-types')
const { extractUpdateDeviceStructure } = require('../util/schemas/device')

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

  describe("POST, PUT, and DELETE", ()=>{
    let device = {
      name: `test${Math.random()}`,
      assignedUserId: null
    }      
    let adminToken, _id;
    
    beforeAll(async () => {
      adminToken = await tokenOf(RolesTypes.Admin)
    });
    
    it('POST: add a  device', async () => {
      
      const res = await request('http://localhost:4000')
        .post('/devices')
        .set({'auth-token': adminToken})
        .send(device)
      _id = res.body._id
      expect(res.statusCode).toEqual(200)
      expect(res.body.name).toEqual(device.name)
      expect(res.body.assignedUserId).toEqual(device.assignedUserId)
    })

    it('PUT: assign user', async () => {
      const usersRes = await request('http://localhost:4000')
      .get('/users')
      const user = usersRes.body[0]
      device.assignedUserId = user._id
      const res = await request('http://localhost:4000')
        .put(`/devices/${_id}`)
        .set({'auth-token': adminToken})
        .send(device)
      expect(res.statusCode).toEqual(200)
      expect(res.body._id).toEqual(_id)
      expect(res.body.name).toEqual(device.name)
      expect(res.body.assignedUserId).toEqual(device.assignedUserId)
      // Ensure that `assigningHistory` have the newly added `assignedUserId`
      expect(
        res.body.assigningHistory[res.body.assigningHistory.length -1].userId
        ).toEqual(device.assignedUserId)
    })

    it('POST: assign a Maintainer', async () => {
      const usersRes = await request('http://localhost:4000')
      .get('/users')
      const maintainer = usersRes.body.find(user=>user.email === 'maintainer@test.com')
      const maintainenceEntry= {
        description: 'test',
        maintenanceUserId: maintainer._id
      }
      const res = await request('http://localhost:4000')
        .post(`/devices/${_id}/maintenance`)
        .set({'auth-token': adminToken})
        .send(maintainenceEntry)
      expect(res.statusCode).toEqual(200)
      expect(res.body._id).toEqual(_id)
      // Ensure that `maintenanceHistory` have the newly added maintenanceEntry
      const lastEntry = res.body.maintenanceHistory[res.body.maintenanceHistory.length -1];
      expect(lastEntry.description).toEqual(maintainenceEntry.description)
      expect(lastEntry.maintenanceUserId).toEqual(maintainenceEntry.maintenanceUserId)
    })

    it('DELETE: delete a device', async () => {
      const res = await request('http://localhost:4000')
        .delete('/devices/' + _id)
        .set({'auth-token': adminToken})
        // .send()
      expect(res.statusCode).toEqual(200)
      expect(res.body._id).toEqual(_id)
      expect(res.body.name).toEqual(device.name)
    })
  })

})