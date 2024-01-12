import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';

@Module({
  controllers: [ChatController],
  providers: [ChatService,PrismaService, ChatGateway]
})
export class ChatModule {}