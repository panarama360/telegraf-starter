import {Container} from "typedi";
import {PrismaClient} from "@prisma/client";

export async function initUser (ctx, next) {
    const prisma = Container.get(PrismaClient);
    const user = await prisma.user.upsert({
        where: {
            chatId: ctx.message.from.id.toString()
        },
        create: {
            chatId: ctx.message.from.id.toString(),
            isBot: ctx.message.from.is_bot,
            firstName: ctx.message.from.first_name,
            username: ctx.message.from.username,
            lastName: ctx.message.from.last_name,
            languageCode: ctx.message.from.language_code,
        },
        update: {

        }
    });
    (ctx as any).user = user;
    next();
}