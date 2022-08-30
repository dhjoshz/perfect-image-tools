import { Image } from '@models';
import { Logger } from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ProcessImageCommand } from 'src/resources/images/commands/processImage.cmd';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  maxHttpBufferSize: 1e80,
})
export class EventsGateway {
  private logger = new Logger(EventsGateway.name);

  @Inject()
  private readonly imageCommand: ProcessImageCommand;

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('connection')
  handleConnection() {
    this.logger.debug('New Connection');
  }

  @SubscribeMessage('new-message')
  handleMessage(@MessageBody() message: string) {
    this.logger.debug(message);
    this.server.emit('response', message);
  }

  @SubscribeMessage('new-file')
  handleFile(@MessageBody() object: any) {
    this.logger.debug(typeof Object.keys(object));
    this.server.emit('response', object);
  }

  @SubscribeMessage('process-image')
  processImage(@MessageBody() object: any) {
    this.logger.debug('PROCESS IMAGE');
    console.log(object);
    return this.imageCommand.execute(
      { originalname: 'wsimage.png', buffer: object.file },
      object.imageProperties,
    );

    // this.server.emit('process-image-response', (object) => {
    //   return this.imageCommand.execute(
    //     { originalname: 'wsimage.png', buffer: object.file },
    //     object.imageProperties,
    //   );
    // });
  }
}
