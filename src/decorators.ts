import {createParamDecorator} from "ts-telegraf-decorators";

export const CurrentUser = createParamDecorator(ctx => {
    return (ctx as any).user;
})