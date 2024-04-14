import { prisma } from "../src/database/prisma"


export async function seed(){

  await prisma.event.create({
    data:{
      title:'Smad code',
      details:"candidatura de novos membros",
      slug:"Smad-code",
      maximumAttendees:1000,
    }
  })
}


seed().then(()=>{
  console.log("database Seeded");
  prisma.$disconnect();
})