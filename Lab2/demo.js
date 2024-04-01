const myMod = require("./modules/module.js");
// console.log(myMod);
let MyInfo = myMod.FlightTickets;

let passenger1 = new MyInfo();
let passenger2 = new MyInfo();

passenger1.addItem(1, 1500, "Egypt", "USA", "05/04/2024");
passenger2.addItem(2, 3000, "Italy", "Egypt", "05/04/2025");

passenger1.updateTicketInfo(1, {
  deptAirport: "france",
  arrivalAirport: "egypt",
  travelDate: "05/06/2025",
});

console.log(passenger1.getFlightInfo());
