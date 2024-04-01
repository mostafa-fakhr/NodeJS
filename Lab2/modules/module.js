class FlightTickets {
  #flightInfo = [];

  addItem(seatNum, flightNum, deptAirport, arrivalAirport, travelDate) {
    let newItem = {
      seatNum,
      flightNum,
      deptAirport,
      arrivalAirport,
      travelDate,
    };
    this.#flightInfo.push(newItem);
  }

  getFlightInfo() {
    return this.#flightInfo;
  }
  updateTicketInfo(seatNum, newData) {
    let index = this.#flightInfo.findIndex((ticket) => {
      return ticket.seatNum === seatNum;
    });
    if (index !== -1) {
      this.#flightInfo[index] = Object.assign(
        {},
        this.#flightInfo[index],
        newData
      );
    } else {
      console.log("Seat number not found");
    }
  }
}
module.exports = { FlightTickets };
