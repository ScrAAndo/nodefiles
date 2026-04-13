var readLineSync = require("readline-sync")


var employees = []
var employeeCount = readLineSync.question("How many employees do you have? ")

for (var i = 0; i < employeeCount; i++) {

    var name = readLineSync.question("What is the name of employee " + (i + 1) + "? ")
    var hoursWorked = readLineSync.question("How many hours did " + name + " work? ")
    var hourlyRate = readLineSync.question("What is " + name + "'s hourly rate? ")

    var overtimePay = 0
    if (hoursWorked > 40) {
        var regularHours = 40
        var overtimeHours = hoursWorked - 40
        var regularPay = regularHours * hourlyRate
        var overtimePay = overtimeHours * hourlyRate * 1.5
        var pay = regularPay + overtimePay
    } else {
        var pay = hoursWorked * hourlyRate
    }
    var totalPay = pay + overtimePay

    var employee = {
        name: name,
        hoursWorked: hoursWorked,
        overtimePay: overtimePay,
        totalPay: totalPay
    }

    employees.push(employee)
}


console.log("\nPayroll Information:\n")
for (var i = 0; i < employees.length; i++) {
    var employee = employees[i]
   console.log(employee.name)
    console.log("Total hours Worked: " + employee.hoursWorked)
    console.log("Regular Pay: $" + (employee.totalPay - employee.overtimePay).toFixed(2))
    console.log("Overtime Pay: $" + employee.overtimePay.toFixed(2))
    console.log("Total Pay: $" + employee.totalPay.toFixed(2))
    console.log("\n-----------------------------\n")
}
highestPaidEmployee = employees.reduce((prev, current) => (prev.totalPay > current.totalPay) ? prev : current)
console.log("The highest paid employee is " + highestPaidEmployee.name + " with a total pay of $" + highestPaidEmployee.totalPay.toFixed(2) + "\n")