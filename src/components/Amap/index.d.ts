interface Location { lat: number, lng: number }

interface AddressType {
  id: string,
  name: string,
  address: any,
  district: string,
  location: Location,
  typecode: string,
  adcode: string,
  value?: any,
  label?: string,
}

type AddressListType = AddressType[];

export type { Location, AddressType, AddressListType };