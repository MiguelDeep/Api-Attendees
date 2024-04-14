import { prisma } from "../database/prisma"
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { z } from "zod"
import { BadRequest } from "./_errors/bad-request";



export async function getAttendeeBadges(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get("/view_attendee/:attendeeId/badge", {
    schema: {

      params: z.object({
        attendeeId: z.coerce.number().int()
      })
    
    }
  }, async (req, res) => {

    const { attendeeId } = req.params

    const view_attendee = await prisma.attendee.findUnique({
      select: {
        name: true,
        email: true,
        event:{
          select:{
            title:true,
            
          }
        } ,
      },
      where: {
        id: attendeeId,

      },

    })
    if(attendeeId === null){
      throw new BadRequest("Participante nao encontrado.")
    }
   const baseURL = req.protocol + "://" + req.hostname;
    const checkInURL= new URL(`/attendees/${attendeeId}/check-in`, baseURL)


    return res.send({
      badge:{
        name:view_attendee?.name,
        email:view_attendee?.email,
        event:view_attendee?.event.title,
        check_in:checkInURL,
      }
    })
    
})}
