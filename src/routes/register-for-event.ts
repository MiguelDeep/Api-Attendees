import { prisma } from "../database/prisma"
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { z } from "zod"
import { BadRequest } from "./_errors/bad-request";



export async function registerForEvent(app: FastifyInstance) {

  app.withTypeProvider<ZodTypeProvider>().post("/events/:eventId/attendees", {
    schema: {

      body: z.object({
        name: z.string().min(4),
        email: z.string().email(),
      }),
      params: z.object({
        eventId: z.string().uuid()
      }),
      response: {
        201: z.object({
          attendeeId: z.number(),
        })
      }
    }
  }, async (req, res) => {

    const { eventId } = req.params
    const { name, email } = req.body

    const attendeeFromEmail = await prisma.attendee.findUnique({
      where: {
        eventId_email: {
          eventId,
          email
        }
      }
    })

    const [eventQuantity,event] = await Promise.all([
       prisma.attendee.count({
        where: {
          eventId
        }
      }),
       prisma.event.findUnique({
        where:{
          id: eventId
        }
      })
    ])



    //Logica de excesso de participantes de um evento.
    if ( event?.maximumAttendees && eventQuantity >=  event.maximumAttendees) {
      throw new BadRequest("Excedeu o limite de participante.")
    }
      
    //Logica para evitar que mesmo participantes possam se cadastrar e varios eventos.
    if (attendeeFromEmail !== null) {
      throw new BadRequest("Este email ja foi registado.")
    }

    const attendee = await prisma.attendee.create({
      data: {
        name,
        email,
        eventId
      }
    })

    return res.status(201).send({ attendeeId: attendee.id })

  })
}
