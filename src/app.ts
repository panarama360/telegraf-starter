import {buildBot} from 'ts-telegraf-decorators';
import {Container} from "typedi";
import {PrismaClient} from "@prisma/client";
import {Telegraf} from 'telegraf'
import {initUser} from "./user.middleware";
import {MainController} from "./controllers/main.controller";
async function start(){
    Container.set(PrismaClient, new PrismaClient());
    const bot = new Telegraf(process.env.BOT_TOKEN)
    bot.use(initUser);
    buildBot({
        bot,
        container: Container,
        controllers: [MainController],
    });
    if(process.env.NODE_ENV == 'development') {
        await bot.launch();
    }else {
        await bot.telegram.deleteWebhook()
        await bot.telegram.setWebhook(process.env.URL_HOOK+process.env.SECRET_PATH);
        await bot.startWebhook(process.env.SECRET_PATH, null, +process.env.PORT);
    }
}

start();