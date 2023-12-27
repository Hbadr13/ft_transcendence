import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChatService {
    constructor(private prisma: PrismaService) {
    }

    /******************************************************* Channel Message ****************************************************************/

    async createChannel(body, idUser: number) {
        const room = await this.prisma.room.create({
            data: {
                name: body.name,
                description: body.description,
                type: body.type,
                password: body.password,
            },
        });
        await this.prisma.membership.create({
            data: {
                room: {
                    connect: {
                        id: room.id
                    }
                },
                user: {
                    connect: {
                        id: idUser
                    }
                },
                isOwner: true,
                isAdmin: true,
            }
        });
        await this.prisma.conversation.create({
            data: {
                type: 'channel',
                room: {
                    connect: {
                        id: room.id,
                    },
                },
            },
        });
    }

    async getAllChannelByUserId(idUser: number) {

        const room = await this.prisma.user.findUnique({
            where: {
                id: idUser
            },
            include: {
                memberships: {
                    select: {
                        room: {
                            select: {
                                id: true,
                                name: true,
                                type: true,
                                password: true,
                            }
                        }
                    }
                }
            }
        })
        const allRoom = room.memberships.map(membership => membership.room);
        return allRoom;
    }

    async joinChannel(idUser: number, idRoom: number, password: string) {
        const room = await this.prisma.room.findFirst({
            where: {
                id: idRoom
            }
        })
        if (!room)
            throw new NotFoundException('group not found')
        if (room.type == "public" || (room.type == "protected" && room.password == password)) {
            await this.prisma.membership.create({
                data: {
                    room: {
                        connect: {
                            id: idRoom,
                        }
                    },
                    user: {
                        connect: {
                            id: idUser,
                        }
                    },
                    isOwner: false,
                    isAdmin: false,
                    isBanned: false,
                }
            });
            let Conversation = await this.prisma.conversation.findUnique({
                where: {
                    type: 'channel',
                    roomId: idRoom
                }
            });
            Conversation = await this.prisma.conversation.update({
                where: {
                    id: Conversation.id
                },
                data: {
                    participants: {
                        connect: {
                            id: idUser
                        }
                    },
                }
            });
            return (room);
        }
        else {
            throw new NotFoundException('dont join channel')

        }

        // await this.prisma.message.create({
        //     data: {
        //         content: null,
        //         sender: {
        //             connect: {
        //                 id: idUser
        //             }
        //         },
        //         chat: {
        //             connect: {
        //                 id: Conversation.id
        //             }
        //         }
        //     }
        // });
    }

    async sendMessageToChannel(body, idRoom: number, idUser: number) {
        let Conversation = await this.prisma.conversation.findUnique({
            where: {
                type: 'channel',
                roomId: idRoom
            }
        });
        // console.log("Conversation:" ,Conversation)
        Conversation = await this.prisma.conversation.update({
            where: {
                id: Conversation.id
            },
            data: {
                participants: {
                    connect: {
                        id: idUser
                    }
                },
            }
        });
        await this.prisma.message.create({
            data: {
                content: body.content,
                sender: {
                    connect: {
                        id: idUser
                    }
                },
                chat: {
                    connect: {
                        id: Conversation.id
                    }
                }
            }
        });
    }

    async getallMessagesChannel(idUser: number, idRoom: number) {

        const user = await this.prisma.user.findUnique({
            where: {
                id: idUser,
            },
            include: {

                conversations: {
                    where: {
                        roomId: idRoom
                    },
                    select: {

                        messages: true,
                        participants: {
                            select: {
                                username: true,
                                foto_user: true,
                                id: true
                            }
                        }
                    },
                },
            }
        })
        if (!user.conversations[0])
            return 0;

        const conversation = user.conversations[0];
        conversation.messages.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

        const resultMessages = conversation.messages
            .map((message) => ({
                id: message.id,
                content: message.content,
                createdAt: message.createdAt,
                senderId: message.senderId,
                chatId: message.chatId,
                username: conversation.participants.find((participant) => participant.id === message.senderId)?.username,
                foto_user: conversation.participants.find((participant) => participant.id === message.senderId)?.foto_user,
            }));


        return resultMessages

    }

    async allUsersChannel(roomId: number) {
        let membership = await this.prisma.room.findFirst({
            where: {
                id: roomId,
            },
            select: {
                name: true,
                Memberships: {
                    select: {
                        isAdmin: true,
                        isOwner: true,
                        isBanned: true,
                        userId: true,
                        user: {
                            select: {
                                username: true,
                                foto_user: true,
                                id: true,
                            }
                        }
                    }
                }
            }
        })
        const participant = membership.Memberships.map((m) => ({
            id: m.user.id,
            username: m.user.username,
            isAdmin: m.isAdmin,
            isOwner: m.isOwner,
            isBanned: m.isBanned,
            foto_user: m.user.foto_user
        }));
        return participant;
    }


    async allChannel() {

        // let room = await this.prisma.user.findFirst({
        //     where: {
        //         id: userId
        //     },
        //     select: {

        //     }
        // })
        return await this.prisma.room.findMany({
            select: {
                id: true,
                name: true,
                type: true,
                description: true,
            }
        })
    }
    async upadteChannel(id: number, roomId: number, type: string, password: string) {

        const room = await this.prisma.membership.findFirst({

            where: {
                roomId: roomId
            },
        });
        if (room.userId != id) {
            throw new UnauthorizedException()
        }
        else {
                await this.prisma.room.update({

                    where: {
                        id: roomId
                    },
                    data: {
                        type: type,
                        password: password
                    }
                });
        }
    }
    async setAdmin(roomId: number, participantId: number) {
        let room = await this.prisma.room.findUnique({
            where: {
                id: roomId,
            },
            select: {
                Memberships: {
                    where: {
                        userId: participantId
                    },
                }
            }
        })
        const id = room.Memberships[0]?.id
        let membership = await this.prisma.membership.update({
            where: {
                id: id
            },
            data: {
                isAdmin: true
            }
        })
    }
    /******************************************************* Direct Message ****************************************************************/


    async sendDirectMessage(body, idSender: number, idReceiver: number) {
        let conversation = await this.prisma.conversation.findFirst({
            where: {
                type: 'direct',
                participants: {
                    every: {
                        id: {
                            in: [idSender, idReceiver]
                        },
                    },
                },
            },
        });
        if (!conversation) {
            conversation = await this.prisma.conversation.create({
                data: {
                    type: 'direct',
                    participants: {
                        connect: [
                            {
                                id: idSender
                            },
                            {
                                id: idReceiver
                            },
                        ],
                    }
                }
            })
        }
        const msg = await this.prisma.message.create({
            data: {
                content: body.content,
                sender: {
                    connect: {
                        id: idSender
                    }
                },
                chat: {
                    connect: {
                        id: conversation.id
                    }
                }
            }
        })
        await this.prisma.conversation.update({
            where: {
                id: conversation.id
            },
            data: {
                updatedAt: msg.createdAt
            }
        })
    }

    async getConversationDirect(idSender: number, idReceiver: number) {
        let conversation = await this.prisma.conversation.findFirst({
            where: {
                type: 'direct',
                participants: {
                    every: {
                        id: {
                            in: [idSender, idReceiver]
                        },
                    },
                },
            },
            select: {
                messages: true
            }
        });
        if (!conversation)
            throw new NotFoundException('messages is empty')

        conversation.messages.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        return await conversation.messages;

    }


    async deleteConversationDirect(idSender: number, idReceiver: number) {
        let conversation = await this.prisma.conversation.findFirst({
            where: {
                type: 'direct',
                participants: {
                    every: {
                        id: {
                            in: [idSender, idReceiver]
                        },
                    },
                },
            },
            select: {
                id: true
            }
        });
        await this.prisma.conversation.delete({
            where: {
                id: conversation.id,
            }
        })
    }

    async getConversationListDirect(idUser: number, type: string) {
        let conversation = await this.prisma.conversation.findMany({

            where: {
                type: type,
                participants: {
                    some: {
                        id: idUser,
                    },
                },
            },
            select: {
                participants: {
                    select: {
                        id: true,
                        foto_user: true,
                        username: true,
                    }
                },
                updatedAt: true,
            }
        });

        const result = conversation.map((item) => {
            const updatedParticipants = item.participants.filter((participant) => participant.id !== idUser);

            return {
                updatedAt: item.updatedAt,
                id: updatedParticipants.length > 0 ? updatedParticipants[0].id : null,
                username: updatedParticipants.length > 0 ? updatedParticipants[0].username : null,
                foto_user: updatedParticipants.length > 0 ? updatedParticipants[0].foto_user : null,
            };
        });
        result.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
        return await result
    }
}