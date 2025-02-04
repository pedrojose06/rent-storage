import { calculateMonthlyRent, MonthlyRentRecord, MonthlyRentRecords } from "../../src/StorageRent/StorageRent";

const contract = {

    baseMonthlyRent : 100.00,
    leaseStartDate : new Date("2023-01-01T00:00:00"),
    windowStartDate : new Date("2023-01-01T00:00:00"),
    windowEndDate : new Date("2023-03-31T00:00:00"),
    dayOfMonthRentDue : 1,
    rentRateChangeFrequency : 1,
    rentChangeRate : .1,
}

describe("calculateMonthlyRent function", () => {
  
    it("should return MonthlyRentRecords", () => {


        const result = calculateMonthlyRent(contract);

        const expectedResult = [
            {
                vacancy: false,
                rentAmount: 100.00,
                rentDueDate: new Date("2023-01-01T00:00:00")
            },
            {
                vacancy: false,
                rentAmount: 110.00, 
                rentDueDate: new Date("2023-02-01T00:00:00")
            },
            {
                vacancy: false,
                rentAmount: 121.00,
                rentDueDate: new Date("2023-03-01T00:00:00")
            }
        ];

        expect(result).toEqual(expectedResult);
    });

    it("should return MonthlyRentRecords validate first payment due date and first month pro-rate when lease start is before monthly due date", () => {
    
        const result = calculateMonthlyRent(contract);
    
        const expectedResult = [
            {
                vacancy: false,
                rentAmount: 46.67,
                rentDueDate: new Date("2023-01-01T00:00:00")
            },
            {
                vacancy: false,
                rentAmount: 100,
                rentDueDate: new Date("2023-01-15T00:00:00")
            },
            {
                vacancy: false,
                rentAmount: 110.00, 
                rentDueDate: new Date("2023-02-15T00:00:00")
            },
            {
                vacancy: false,
                rentAmount: 121.00,
                rentDueDate: new Date("2023-03-15T00:00:00")
            }
        ];
    
        expect(result).toEqual(expectedResult);
      });
    });
