import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { FriendsModule } from './friends/friends.module';
import { JwtModule } from '@nestjs/jwt';
import { GameGateway } from './game/game.gateway';
import { UserService } from './user/user.service';
import { json } from 'express';
import { GameModule } from './game/game.module';
import { OnlineModule } from './online/online.module';
import { RoomService } from './game/room/room.service';
import { UpdateService } from './game/update/update.service';
import { RecentModule } from './search/recent.module';
import { ChatModule } from './chat/chat.module';


@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET, // Replace with your actual secret key
            signOptions: { expiresIn: '1h' }, // Set the token expiration time
        }),
        ConfigModule.forRoot({
            isGlobal: true
        }), AuthModule, UserModule, BookmarkModule, PrismaModule, FriendsModule ,GameModule,OnlineModule, RecentModule, ChatModule],
    providers: [GameGateway, UserService,RoomService,UpdateService],
    controllers: [],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
      consumer.apply(json({ limit: '10mb' })).forRoutes('*');
    }
}
