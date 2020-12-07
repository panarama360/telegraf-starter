import {Start, TFContext, TFController} from "ts-telegraf-decorators";
import {Context} from "telegraf";

@TFController()
export class MainController{

    @Start()
    start(@TFContext() ctx: Context & {user: any}){
        console.log('start', ctx.user);
    }
}