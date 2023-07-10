import { AuthenticatedRequest } from "@/middlewares"
import {Response} from "express"
import httpStatus from "http-status"
import ticketService from "@/services/tickets-service"



export async function getTickets(req: AuthenticatedRequest , res:Response){
    const {userId} = req

    try {
        const ticket = await ticketService.getTicketsByUserId(userId)
        return res.status(httpStatus.OK).send(ticket)
    } catch (error) {
        return res.sendStatus(httpStatus.NOT_FOUND)
    }
}

export async function getTicketTypes(req: AuthenticatedRequest  , res:Response) {
    try {
        const ticketTypes = await ticketService.getTicketType()
        return res.status(httpStatus.OK).send(ticketTypes)
    } catch (error) {
        return res.sendStatus(httpStatus.NO_CONTENT);
    }
}

export async function createTicket(req: AuthenticatedRequest  , res:Response) {
    const {userId} = req
    const {ticketTypeId} = req.body 

    if(!ticketTypeId) return res.sendStatus(httpStatus.BAD_REQUEST)

    try {
        const ticket = await ticketService.createTicket(userId, ticketTypeId)

        return res.status(httpStatus.OK).send(ticket)

    } catch (error) {

        return res.sendStatus(httpStatus.NO_CONTENT);
        
    }
}