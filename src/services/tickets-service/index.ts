import { notFoundError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketsRepository from "@/repositories/tickets-repository";
import { TicketStatus } from "@prisma/client";

async function getTicketType () {
    const ticketTypes = await ticketsRepository.findTicketTypes()
    if(!ticketTypes) throw notFoundError()

    return ticketTypes

}
async function getTicketsByUserId (userId: number) {
    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId)
    if(!enrollment) throw notFoundError()

    const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id)
    if(!ticket) throw notFoundError()

    return ticket
}
async function createTicket (userId: number , ticketTypeId : number) {
    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId)
    if(!enrollment) throw notFoundError()

    const ticketData = {
        ticketTypeId,
        enrollmentId: enrollment.id,
        status: TicketStatus.RESERVED
    }

    await ticketsRepository.createTicket(ticketData)

    const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id)

    return ticket
}

const ticketService = {getTicketType , getTicketsByUserId , createTicket }

export default ticketService