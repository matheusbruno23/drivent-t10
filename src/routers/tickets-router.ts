import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getTicketTypes, getTickets , createTicket } from "@/controllers";


const ticketsRouter = Router()


ticketsRouter.get("/" , authenticateToken ,getTickets)
ticketsRouter.get("/types" , authenticateToken ,getTicketTypes)
ticketsRouter.post("/" , authenticateToken ,createTicket)


export {ticketsRouter}