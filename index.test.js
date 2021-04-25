describe('Configrations Check', () => {
    it('should test that true === true', () => {
        expect(true).toBe(true)
    })
    it('NODE_ENV=test', () => {
        expect(process.env.NODE_ENV).toBe("test")
    })
})