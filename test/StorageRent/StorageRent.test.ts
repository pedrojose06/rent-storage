import { calculateMonthlyRent } from '../../src/StorageRent/StorageRent'

describe('calculateMonthlyRent function', () => {
  it('should return MonthlyRentRecords', () => {
    const contract = {
      baseMonthlyRent: 100.0,
      leaseStartDate: new Date('2023-01-01T00:00:00'),
      windowStartDate: new Date('2023-01-01T00:00:00'),
      windowEndDate: new Date('2023-03-31T00:00:00'),
      dayOfMonthRentDue: 1,
      rentRateChangeFrequency: 1,
      rentChangeRate: 0.1,
    }

    const result = calculateMonthlyRent(contract)

    const expectedResult = [
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

    expect(result).toEqual(expectedResult)
  })

  it('should return MonthlyRentRecords validate first payment due date and first month pro-rate when lease start is before monthly due date', () => {
    const contract = {
      baseMonthlyRent: 100.0,
      leaseStartDate: new Date('2023-01-01T00:00:00'),
      windowStartDate: new Date('2023-01-01T00:00:00'),
      windowEndDate: new Date('2023-03-31T00:00:00'),
      dayOfMonthRentDue: 15,
      rentRateChangeFrequency: 1,
      rentChangeRate: 0.1,
    }

    const result = calculateMonthlyRent(contract)

    const expectedResult = [
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

    expect(result).toEqual(expectedResult)
  })
})
