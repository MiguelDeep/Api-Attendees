import fastify from "fastify"
import { serializerCompiler, validatorCompiler ,jsonSchemaTransform} from "fastify-type-provider-zod"
import { fastifySwagger } from "@fastify/swagger"
import { fastifySwaggerUi } from "@fastify/swagger-ui"
import { createEvent } from "./routes/create-event";
import { registerForEvent } from "./routes/register-for-event";
import { getEvent } from "./routes/get-event";
import { getAttendeeBadges } from "./routes/gets-attendee-badge";
import { checkIn } from "./routes/check-in";
import { getEventsAttendees } from "./routes/get-event-attendees";
import { errorHandler } from "./error-handler";
import fastifyCors from "@fastify/cors"


const app = fastify()
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.register(fastifySwagger, {
  swagger: {
    consumes: ['application/json'],
    produces: ['application/json'],
    info: {
      title: 'pass.in',
      description: 'Espercificações da API para o back-end',
      version: '1.0.0'
    }
  },
  transform:jsonSchemaTransform
})
app.register(fastifySwaggerUi,{
 routePrefix:'/docs'
})
app.register(fastifyCors,{
  origin:'*'/*Esse arquivo usa-se para espercificar o front-end que pode ter acesso ao meu backend para consumo, substituimos o (*) pelo dominio do front-end.*/
})


app.register(createEvent)
app.register(registerForEvent)
app.register(getEvent)
app.register(getAttendeeBadges)
app.register(checkIn)
app.register(getEventsAttendees)
app.setErrorHandler(errorHandler)
//server configuration
app.listen({ port: 3333,host:'0.0.0.0' }).then(() => {
  console.log("listening on port 3333")
})
//pnpm i prisma
//npx prisma init --datasource-provider SQLite

//using npx prisma db seed for execute archive seed.ts