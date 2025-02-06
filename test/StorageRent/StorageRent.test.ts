import { calculateMonthlyRent } from '../../src/StorageRent/StorageRent'
import {
  DUE_DAY_EQUALS_LEASE_DAY,
  EXPECT_DUE_DAY_EQUALS_LEASE_DAY,
  LEASE_DAY_BEFORE_MONTH_DUE_DAY,
  EXPECT_LEASE_DAY_BEFORE_MONTH_DUE_DAY,
  MONTH_DUE_DAY_IN_LAST_DAY_MONTH,
  EXPECT_DUE_DATE_IN_FEBRUARY,
  RENT_CHANGE_FREQUENCY,
  EXPECT_RENT_CHANGE_FREQUENCY,
  RENT_DECREASE_WHEN_VACANCY,
  EXPECT_RENT_DECREASE_WHEN_VACANCY,
} from './mocks/StorageRent.mock'

describe('calculateMonthlyRent function', () => {
  it('should return MonthlyRentRecords', () => {
    const result = calculateMonthlyRent(DUE_DAY_EQUALS_LEASE_DAY)

    expect(result).toEqual(EXPECT_DUE_DAY_EQUALS_LEASE_DAY)
  })

  it('should return MonthlyRentRecords validate first payment due date and first month pro-rate when lease start is before monthly due date', () => {
    const result = calculateMonthlyRent(LEASE_DAY_BEFORE_MONTH_DUE_DAY)

    expect(result).toEqual(EXPECT_LEASE_DAY_BEFORE_MONTH_DUE_DAY)
  })

  it('should return MonthlyRentRecords validate if put correct the last day in due rent ', () => {
    const result = calculateMonthlyRent(MONTH_DUE_DAY_IN_LAST_DAY_MONTH)

    expect(result).toEqual(EXPECT_DUE_DATE_IN_FEBRUARY)
  })

  it('should return MonthlyRentRecords validate if rent change after achieve the rate frequency', () => {
    const result = calculateMonthlyRent(RENT_CHANGE_FREQUENCY)

    expect(result).toEqual(EXPECT_RENT_CHANGE_FREQUENCY)
  })

  it('should return MonthlyRentRecords validate if rent decreaase when rent rate is < 0 and vacancy should be true', () => {
    const result = calculateMonthlyRent(RENT_DECREASE_WHEN_VACANCY)

    expect(result).toEqual(EXPECT_RENT_DECREASE_WHEN_VACANCY)
  })
})
