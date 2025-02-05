const contracts = {
  baseMonthlyRent: 100.0,
  leaseStartDate: new Date('2023-01-01T00:00:00'),
  windowStartDate: new Date('2023-01-01T00:00:00'),
  windowEndDate: new Date('2023-03-31T00:00:00'),
  dayOfMonthRentDue: 15,
  rentRateChangeFrequency: 1,
  rentChangeRate: 0.1,
} as Contract

export type MonthlyRentRecord = {
  vacancy: boolean
  rentAmount: number
  rentDueDate: Date
}

export type MonthlyRentRecords = Array<MonthlyRentRecord>

export type Contract = {
  baseMonthlyRent: number
  leaseStartDate: Date
  windowStartDate: Date
  windowEndDate: Date
  dayOfMonthRentDue: number
  rentRateChangeFrequency: number
  rentChangeRate: number
}

/**
 * Determines the vacancy, rent amount and due date for each month in a given time window
 *
 * @param baseMonthlyRent : The base or starting monthly rent for unit (Number)
 * @param leaseStartDate : The date that the tenant's lease starts (Date)
 * @param windowStartDate : The first date of the given time window (Date)
 * @param windowEndDate : The last date of the given time window (Date)
 * @param dayOfMonthRentDue : The day of each month on which rent is due (Number)
 * @param rentRateChangeFrequency : The frequency in months the rent is changed (Number)
 * @param rentChangeRate : The rate to increase or decrease rent, input as decimal (not %), positive for increase, negative for decrease (Number),
 * @returns Array<MonthlyRentRecord>;
 */

function roundToTwoDecimalPlaces(value: number): number {
  return Math.round(value * 100) / 100
}

export function calculateMonthDifference(
  windowEndDate,
  windowStartDate
): number {
  if (windowStartDate.getFullYear() > windowEndDate.getFullYear()) return -1

  if (windowStartDate.getFullYear() === windowEndDate.getFullYear()) {
    return windowEndDate.getMonth() - windowStartDate.getMonth()
  }

  const countMonthsInYear =
    (windowEndDate.getFullYear() - windowStartDate.getFullYear() - 1) * 12

  if (windowStartDate.getMonth() > windowEndDate.getMonth()) {
    return (
      windowStartDate.getMonth() - windowEndDate.getMonth() + countMonthsInYear
    )
  }

  return (
    windowEndDate.getMonth() - windowStartDate.getMonth() + countMonthsInYear
  )
}

export function verifyDayOfMonthRentDue(
  dayOfMonthRentDue: number,
  leaseStartDate: Date,
  baseMonthlyRent: number
) {
  if (dayOfMonthRentDue === leaseStartDate.getDate()) {
    return
  }
  const isLeaseStartDateLastDayOfMonth = Number(
    dayOfMonthRentDue < leaseStartDate.getDate()
  )

  const calcRent = () =>
    roundToTwoDecimalPlaces(
      baseMonthlyRent *
        (isLeaseStartDateLastDayOfMonth -
          (dayOfMonthRentDue - leaseStartDate.getDate()) / 30) *
        (isLeaseStartDateLastDayOfMonth ? 1 : -1)
    )

  return [
    {
      vacancy: false,
      rentAmount: calcRent(),
      rentDueDate: leaseStartDate,
    },
  ] as MonthlyRentRecords
}

export function correctRentDueDate(
  leaseStartDate: Date,
  dayOfMonthRentDue: number
): Date {
  return new Date(
    leaseStartDate.getFullYear(),
    leaseStartDate.getMonth() + 1,
    dayOfMonthRentDue
  )
}

export function calculateMonthlyRent(contract: Contract): MonthlyRentRecords {
  const {
    dayOfMonthRentDue,
    windowEndDate,
    windowStartDate,
    baseMonthlyRent,
    leaseStartDate,
    rentChangeRate,
  } = contract

  const firstMonthRent = verifyDayOfMonthRentDue(
    dayOfMonthRentDue,
    windowStartDate,
    baseMonthlyRent
  )
  const monthlyRentRecords = [] as MonthlyRentRecords

  firstMonthRent && monthlyRentRecords.push(...firstMonthRent)

  monthlyRentRecords.push({
    vacancy: false,
    rentAmount: baseMonthlyRent,
    rentDueDate: firstMonthRent
      ? new Date(
          leaseStartDate.getFullYear(),
          leaseStartDate.getMonth(),
          dayOfMonthRentDue
        )
      : windowStartDate,
  })

  for (
    let i = 1;
    i <= calculateMonthDifference(windowEndDate, windowStartDate);
    i++
  ) {
    const rentDueDate = correctRentDueDate(
      leaseStartDate,
      windowStartDate,
      dayOfMonthRentDue
    )
    rentDueDate.setMonth(windowStartDate.getMonth() + i)

    const rentAmount = Number.parseFloat(
      (baseMonthlyRent * (1 + rentChangeRate) ** i).toFixed(2)
    )

    monthlyRentRecords.push({
      vacancy: false,
      rentAmount: rentAmount,
      rentDueDate: rentDueDate,
    })
  }

  return monthlyRentRecords
}

/**
 * Calculates the new monthly rent
 *
 * @param baseMonthlyRent : the base amount of rent
 * @param rentChangeRate : the rate that rent my increase or decrease (positive for increase, negative for decrease)
 * @returns number
 *
 */
function calculateNewMonthlyRent(
  baseMonthlyRent: number,
  rentChangeRate: number
) {
  return baseMonthlyRent * (1 + rentChangeRate)
}

/**
 * Determines if the year is a leap year
 *
 * @param year
 * @returns boolean
 *
 */
function isLeapYear(year: number) {
  return year % 4 === 0 && year % 100 !== 0
}
