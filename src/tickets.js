const Ticket = require("./Ticket");
const { readFile, writeFile } = require("./utils");

const tickets = Symbol("tickets");

class TicketCollection {
  constructor() {
    (async function () {
      this[tickets] = await readFile();
    }.bind(this));
  }
  /**
   * create and save a new ticket
   * @param {string} username
   * @param {number} price
   * @return {ticket}
   */
  create(username, price) {
    const ticket = new Ticket(username, price);
    this[tickets].push(ticket);
    writeFile(this[tickets]);
    return ticket;
  }

  createBulk(username, price, quantity) {
    const result = [];
    for (let i = 0; i < quantity; i++) {
      const ticket = this.create(username, price);
      result.push(ticket);
    }
    writeFile(this[tickets]);
    return result;
  }

  /**
   * return all tickets from db
   */

  find() {
    return this[tickets];
  }

  /**
   * Find single ticket by id
   * @param {string} id
   * @return {ticket}
   */

  findById(id) {
    const ticket = this[tickets].find(
      /**
       * @param {Ticket} ticket
       */
      (ticket) => ticket.id === id
    );
    return ticket;
  }

  /**
   * Find tickets by username
   * @param {string} username
   * @return {tickets[]}
   */

  findByUsername(username) {
    const tickets = this[tickets].filter(
      /**
       * @param {Ticket} ticket
       */
      (ticket) => ticket.username === username
    );
    return tickets;
  }

  /**
   * update by id
   * @param {string} ticketId
   * @param {{username:string,price:number}} ticketBody
   * @return {Ticket}
   */

  updateById(ticketId, ticketBody) {
    const ticket = this.findById(ticketId);
    if (ticket) {
      ticket.username = ticketBody.username ?? ticket.username;
      ticket.price = ticketBody.price ?? ticket.price;
    }
    writeFile(this[tickets]);
    return ticket;
  }

  updateBulk(username, ticketBody) {
    const userTickets = this.findByUsername(username);
    const updatedTickets = userTickets.map((ticket) =>
      this.updateById(ticket.id, ticketBody)
    );

    writeFile(this[tickets]);
    return updatedTickets;
  }

  /**
   * delete ticket by id
   * @param {string} ticketId
   * @return {boolean}
   */

  deleteById(ticketId) {
    const index = this[tickets].findIndex(
      /**
       * @param {Ticket} ticket
       */
      (ticket) => ticket.id === ticketId
    );
    if (index === -1) {
      return false;
    } else {
      this[tickets].splice(index, 1);
      writeFile(this[tickets]);
      return true;
    }
  }

  deleteBulk(username) {
    const userTickets = this.findByUsername(username);
    const deleteResult = userTickets.map((ticket) =>
      this.deleteById(ticket.id)
    );
    writeFile(this[tickets]);
    return deleteResult;
  }
  draw(winnerCount) {
    const winnerIndexes = new Array(winnerCount);
    let winnerIndex = 0;
    while (winnerIndex < winnerCount) {
      let ticketIndex = Math.floor(Math.random() * this[tickets].length);
      if (!winnerIndexes.includes(ticketIndex)) {
        winnerIndexes[winnerIndex++] = ticketIndex;
        continue;
      } else {
      }
    }

    const winners = winnerIndexes.map((index) => this[tickets][index]);
    return winners;
  }
}

const ticketCollection = new TicketCollection();
module.exports = ticketCollection;
