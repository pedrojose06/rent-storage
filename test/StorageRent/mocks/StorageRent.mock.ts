// filepath: /Users/esapiens/Documents/pedro/projetos/rent-storage/test/StorageRent/StorageRent.mock.ts

import {
  Contract,
  MonthlyRentRecord,
} from '../../../src/StorageRent/StorageRent'

export const DUE_DAY_EQUALS_LEASE_DAY: Contract = {
  baseMonthlyRent: 100.0,
  leaseStartDate: new Date('2023-01-01T00:00:00'),
  windowStartDate: new Date('2023-01-01T00:00:00'),
  windowEndDate: new Date('2023-03-31T00:00:00'),
  dayOfMonthRentDue: 1,
  rentRateChangeFrequency: 1,
  rentChangeRate: 0.1,
}

export const EXPECT_DUE_DAY_EQUALS_LEASE_DAY: MonthlyRentRecord[] = [
  {
    vacancy: false,
    rentAmount: 100.0,
    rentDueDate: new Date('2023-01-01T00:00:00'),
  },
  {
    vacancy: false,
    rentAmount: 110.0,
    rentDueDate: new Date('2023-02-01T00:00:00'),
  },
  {
    vacancy: false,
    rentAmount: 121.0,
    rentDueDate: new Date('2023-03-01T00:00:00'),
  },
]

export const LEASE_DAY_BEFORE_MONTH_DUE_DAY: Contract = {
  baseMonthlyRent: 100.0,
  leaseStartDate: new Date('2023-01-01T00:00:00'),
  windowStartDate: new Date('2023-01-01T00:00:00'),
  windowEndDate: new Date('2023-03-31T00:00:00'),
  dayOfMonthRentDue: 15,
  rentRateChangeFrequency: 1,
  rentChangeRate: 0.1,
}

export const EXPECT_LEASE_DAY_BEFORE_MONTH_DUE_DAY: MonthlyRentRecord[] = [
  {
    vacancy: false,
    rentAmount: 46.67,
    rentDueDate: new Date('2023-01-01T00:00:00'),
  },
  {
    vacancy: false,
    rentAmount: 100,
    rentDueDate: new Date('2023-01-15T00:00:00'),
  },
  {
    vacancy: false,
    rentAmount: 110.0,
    rentDueDate: new Date('2023-02-15T00:00:00'),
  },
  {
    vacancy: false,
    rentAmount: 121.0,
    rentDueDate: new Date('2023-03-15T00:00:00'),
  },
]

export const MONTH_DUE_DAY_IN_LAST_DAY_MONTH: Contract = {
  baseMonthlyRent: 100.0,
  leaseStartDate: new Date('2023-01-02T00:00:00'),
  windowStartDate: new Date('2023-01-02T00:00:00'),
  windowEndDate: new Date('2023-04-31T00:00:00'),
  dayOfMonthRentDue: 31,
  rentRateChangeFrequency: 1,
  rentChangeRate: 0.1,
}

export const EXPECT_DUE_DATE_IN_FEBRUARY: MonthlyRentRecord[] = [
  {
    vacancy: false,
    rentAmount: 96.67,
    rentDueDate: new Date('2023-01-02T00:00:00'),
  },
  {
    vacancy: false,
    rentAmount: 100.0,
    rentDueDate: new Date('2023-01-31T00:00:00'),
  },
  {
    vacancy: false,
    rentAmount: 110.0,
    rentDueDate: new Date('2023-02-28T00:00:00'),
  },
  {
    vacancy: false,
    rentAmount: 121.0,
    rentDueDate: new Date('2023-03-31T00:00:00'),
  },
  {
    vacancy: false,
    rentAmount: 133.1,
    rentDueDate: new Date('2023-04-30T00:00:00'),
  },
]

export const RENT_CHANGE_FREQUENCY: Contract = {
  baseMonthlyRent: 100.0,
  leaseStartDate: new Date('2023-01-01T00:00:00'),
  windowStartDate: new Date('2023-01-01T00:00:00'),
  windowEndDate: new Date('2023-10-31T00:00:00'),
  dayOfMonthRentDue: 1,
  rentRateChangeFrequency: 3,
  rentChangeRate: 0.1,
}

export const EXPECT_RENT_CHANGE_FREQUENCY: MonthlyRentRecord[] = [
  {
    vacancy: false,
    rentAmount: 100,
    rentDueDate: new Date('2023-01-01T00:00:00'),
  },
  {
    vacancy: false,
    rentAmount: 110,
    rentDueDate: new Date('2023-02-01T00:00:00'),
  },
  {
    vacancy: false,
    rentAmount: 110,
    rentDueDate: new Date('2023-03-01T00:00:00'),
  },
  {
    vacancy: false,
    rentAmount: 110,
    rentDueDate: new Date('2023-04-01T00:00:00'),
  },
  {
    vacancy: false,
    rentAmount: 121,
    rentDueDate: new Date('2023-05-01T00:00:00'),
  },
  {
    vacancy: false,
    rentAmount: 121,
    rentDueDate: new Date('2023-06-01T00:00:00'),
  },
]
