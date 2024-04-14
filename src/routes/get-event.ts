import { prisma } from "../database/prisma"
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { z } from "zod"
import { BadRequest } from "./_errors/bad-request";



export async function getEvent(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get("/events/:eventId", {
    schema: {
  
      params: z.object({
        eventId: z.string().uuid()
      }),
      response: {
        200: z.object({
          id: z.string().uuid(),
          title: z.string().nullable(),
          details: z.string().nullable(),
          slug: z.string(),
          maximumAttendee: z.number().int().nullable(),
          attendees: z.number().int()
        })
      }
    }
  }, async (req, res) => {
    const { eventId } = req.params
    const events = await prisma.event.findUnique({
      select: {
        id: true,
        title: true,
        slug: true,
        details: true,
        maximumAttendees: true,
        _count: {
          select: {
            attendees: true,
          }
        }
      },
      where: {
        id: eventId
      }
    })
    if (events == null) {
      throw new BadRequest("Error not found: " + events)
    }
    return res.status(200).send({
      id: events.id,
      title: events.title,
      details: events.details,
      slug: events.slug,
      maximumAttendee: events.maximumAttendees,
      attendees: events._count.attendees

    })
  })

}