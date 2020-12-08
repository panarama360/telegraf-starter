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
        console.log('Delete Token');
        await bot.telegram.deleteWebhook()
        console.log('URL: ', `${process.env.URL}/bot${process.env.BOT_TOKEN}`);
        await bot.telegram.setWebhook(`${process.env.URL}/bot${process.env.BOT_TOKEN}`);
        bot.startWebhook(`/bot${process.env.BOT_TOKEN}`, null, +process.env.PORT);
    }
}

start();