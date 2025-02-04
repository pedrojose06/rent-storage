const contracts = 
    {
        baseMonthlyRent : 100.00,
        leaseStartDate : new Date("2023-01-01T00:00:00"),
        windowStartDate : new Date("2023-01-01T00:00:00"),
        windowEndDate : new Date("2023-03-31T00:00:00"),
        dayOfMonthRentDue : 1,
        rentRateChangeFrequency : 1,
        rentChangeRate : .1,
    } as Contract;

export type MonthlyRentRecord = {
    vacancy: boolean,
    rentAmount: number,
    rentDueDate: Date
}

export type MonthlyRentRecords = Array<MonthlyRentRecord>;

export type Contract = {
    baseMonthlyRent: number, 
    leaseStartDate: Date, 
    windowStartDate: Date, 
    windowEndDate: Date, 
    dayOfMonthRentDue: number, 
    rentRateChangeFrequency: number, 
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

export function calculateMonthMissedRent(windowEndDate, windowStartDate) : number {

    if(windowStartDate.getFullYear() > windowEndDate.getFullYear()) return -1;    

    if(windowStartDate.getFullYear() === windowEndDate.getFullYear()) {
        return windowEndDate.getMonth() - windowStartDate.getMonth();
    }

    const countMonthsInYear = ((windowEndDate.getFullYear() - windowStartDate.getFullYear() - 1) * 12);

    if (windowStartDate.getMonth() > windowEndDate.getMonth()) {
        return windowStartDate.getMonth() - windowEndDate.getMonth() + countMonthsInYear;
    }

    return windowEndDate.getMonth() - windowStartDate.getMonth()  + countMonthsInYear;
    
}

export function correctRentDueDate(leaseStartDate: Date, windowStartDate: Date, dayOfMonthRentDue: number) : Date {
    // if (leaseStartDate.getDate() < dayOfMonthRentDue) {
    //     return new Date(leaseStartDate.getFullYear(), leaseStartDate.getMonth(), dayOfMonthRentDue);
    // }
    return new Date(leaseStartDate.getFullYear(), leaseStartDate.getMonth() + 1, dayOfMonthRentDue);

}

export function calculateMonthlyRent(contract: Contract) : MonthlyRentRecords {

    const monthlyRentRecords : MonthlyRentRecords = [
        {
            vacancy: false,
            rentAmount: contract.baseMonthlyRent,
            rentDueDate: contract.windowStartDate
        }
    ];

    const {windowEndDate, windowStartDate} = contract;
    
    for (let i = 0; i < calculateMonthMissedRent(windowEndDate, windowStartDate); i++) {
        monthlyRentRecords.push({
            vacancy: false,
            rentAmount: Number.parseFloat(calculateNewMonthlyRent(monthlyRentRecords[i].rentAmount, contract.rentChangeRate).toFixed(2)),
            rentDueDate: correctRentDueDate(monthlyRentRecords[i].rentDueDate, windowStartDate, contract.dayOfMonthRentDue)
        });
    }

    console.log(monthlyRentRecords);

    
    return monthlyRentRecords;    
}

    const result = calculateMonthlyRent(contracts);


/**
 * Calculates the new monthly rent
 * 
 * @param baseMonthlyRent : the base amount of rent
 * @param rentChangeRate : the rate that rent my increase or decrease (positive for increase, negative for decrease)
 * @returns number
 * 
 */
function calculateNewMonthlyRent(baseMonthlyRent: number, rentChangeRate: number) {
    return baseMonthlyRent * (1 + rentChangeRate);
}

/**
 * Determines if the year is a leap year
 * 
 * @param year 
 * @returns boolean
 * 
 */
function isLeapYear(year: number) {
    return (year % 4 === 0 && year % 100 !== 0);
}
