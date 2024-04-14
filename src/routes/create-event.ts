import { FastifyInstance } from "fastify";
import { prisma } from "../database/prisma"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { z } from "zod"
import { generateSlug } from "../utils/generate-slug";
import { BadRequest } from "./_errors/bad-request";



export async function createEvent(app:FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post('/events',{
    schema:{

      body:z.object({
        title: z.string({ invalid_type_error :"O titulo tem de ser um texto."}).min(4),
        details: z.string().max(100).nullable(),
        maximumAttendees: z.number().int().positive().nullable()
      }),
      response:{
        201:z.object({
          eventId:z.string().uuid()
        })
      }
    }
  }, async (req, res) => {
  
    const { title, details, maximumAttendees } =req.body;
    const slug = generateSlug(title)
  
    const eventWithSameSlug = await prisma.event.findUnique({
      where: {
        slug,
      }
    })
    if (eventWithSameSlug !== null) {
      throw new BadRequest("Já existe um evento com esse titulo.")
    }
  
    const event = await prisma.event.create({
      data: {
        title,
        details,
        maximumAttendees,
        slug
      }
    })
  
    return res.status(201).send({ eventId: event.id });
  })
}
