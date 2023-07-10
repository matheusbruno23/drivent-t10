import { notFoundError } from "@/errors";
import { TicketStatus } from "@prisma/client";

async function getTicketType () {
    const ticketTypes = await ticketRepository.findTicketTypes()
    if(!ticketTypes) throw notFoundError()

    return ticketTypes

}
async function getTicketsByUserId () {

}
async function createTicket () {

}

const ticketService = {getTicketType , getTicketsByUserId , createTicket }

export default ticketService