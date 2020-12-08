import {Container} from "typedi";
import {PrismaClient} from "@prisma/client";
import {Context} from "telegraf";

export async function initUser (ctx: Context, next) {
    const prisma = Container.get(PrismaClient);
    const user = await prisma.user.upsert({
        where: {
            chatId: ctx.message.from.id.toString()
        },
        create: {
            chatId: ctx.chat.id.toString(),
            isBot: ctx.message?.from?.is_bot || false,
            firstName: ctx.chat.first_name,
            username: ctx.chat.username,
            lastName: ctx.chat.last_name,
            languageCode: ctx.message?.from?.language_code || 'en',
        },
        update: {

        }
    });
    (ctx as any).user = user;
    next();
}