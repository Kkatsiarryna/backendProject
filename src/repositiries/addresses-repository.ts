
const addresses = [
    {id: 1, value: '0x1234567890'},
    {id: 2, value: '0x1234567890'},
    {id: 3, value: '0x1234567890'}
]

export const addressesRepository = {
    getAddresses(){
        return addresses
    },
    getAddressesById(id: number){
        let foundedAddress=  addresses.find(el => el.id === id)
        return foundedAddress
    }
}