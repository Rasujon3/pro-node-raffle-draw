const Ticket = require("./Ticket");
const { readFile, writeFile } = require("./utils");

const tickets = Symbol("tickets");

class TicketCollection {
  constructor() {
    this[tickets] = [];
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
    return ticket;
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
    ticket.username = ticketBody.username ?? ticket.username;
    ticket.price = ticketBody.price ?? ticket.price;

    return ticket;
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
      return true;
    }
  }
}

const collection = new TicketCollection();
