import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({log:["info" , 'query'],})

async function main() {
    await prisma.user.create({
        data:{
        email:"Nasi12@gmail.com",
        name: "Nasir Nadaf"
        }
    })
    
}

main()