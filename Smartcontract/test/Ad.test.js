const Ad = artifacts.require('./Ad.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('Ad', (accounts) => {
  let contract

  before(async () => {
    contract = await Ad.deployed()
  })

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = contract.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('has a name', async () => {
      const name = await contract.name()
      assert.equal(name, 'Ad')
    })

    it('has a symbol', async () => {
      const symbol = await contract.symbol()
      assert.equal(symbol, 'AD')
    })

  })

  describe('minting', async () => {

    it('creates a new token', async () => {
      const result = await contract.mint('my first ad','address of my first ad',10)
      const totalSupply = await contract.totalSupply()
      // SUCCESS
      assert.equal(totalSupply, 1)
      const event = result.logs[0].args
      assert.equal(event.tokenId.toNumber(), 1, 'id is correct')
      assert.equal(event.from, '0x0000000000000000000000000000000000000000', 'from is correct')
      assert.equal(event.to, accounts[0], 'to is correct')
    })
  })

  describe('indexing', async () => {
    it('lists ads', async () => {
      // Mint 3 more tokens
      await contract.mint('my second ad','address of my second ad',20)
      await contract.mint('my third ad','address of my third ad',30)
      await contract.mint('my fourth ad','address of my fourth ad',40)
      const totalSupply = await contract.getNumberofAds()

      let index
      let ad
      let result = []

      for (var i = 0; i < totalSupply; i++) {
        index = await contract.getAdIdByIndex(i)
        ad = await contract.getAdByTokenId(index)
        result.push(ad.adName)
      }

      let expected = ['my first ad', 'my second ad', 'my third ad', 'my fourth ad']
      assert.equal(result.join(','), expected.join(','))
    })
  })

})
