import { FastifyInstance } from "fastify";
import { prisma } from "../database/prisma"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { z } from "zod"
import { BadRequest } from "./_errors/bad-request";



export async function checkIn(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get('/attendees/:attendeeId/check-in', {
    schema: {

      params: z.object({
        attendeeId: z.coerce.number().int()
      }),
      response: {
        201:z.string()
      }
    }
  }, async (req, res) => {

    const { attendeeId } = req.params


    const attendeeCheckIn = await prisma.checkIn.findUnique({
      where: {
        attendeeId,
      }
    })


    if (attendeeCheckIn !== null) {
      throw new BadRequest("CheckIn ja existe")
    }

    await prisma.checkIn.create({
      data: {
        attendeeId
      }
    })

    return res.status(201).send("check-in feito com  sucesso!" )
  })
}
