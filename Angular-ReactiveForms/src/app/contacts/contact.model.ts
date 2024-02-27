export interface Contact {
  id: string,
  personal: boolean,
  firstName: string,
  lastName: string,
  dateOfBirth: Date | null,
  favoritesRanking: number | null,
  phone: Phone,
  address: Address,
}

export interface Phone {
  phoneNumber: string,
  phoneType: string,
}

export interface Address {
  streetAddress: string,
  city: string,
  state: string,
  postalCode: string,
  addressType: string,
}

export const phoneTypes = [
  { title: 'Mobile', value: 'mobile' },
  { title: 'Work', value: 'work' },
  { title: 'Other', value: 'other' }
];

export const addressTypes = [
  { title: 'Home', value: 'home' },
  { title: 'Work', value: 'work' },
  { title: 'Other', value: 'other' }
]