import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Inject,
  Post,
  UploadedFile,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProcessImageCommand } from './commands/processImage.cmd';
import { Image } from '@models';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiExtraModels,
  ApiOkResponse,
  ApiTags,
  ApiUnsupportedMediaTypeResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { catchError, throwError } from 'rxjs';
import { Express } from 'express';
import {
  ImagePropertiesTransformerPipe,
  ImageValidatorPipe,
  ImagePropertiesValidatorPipe,
} from '@pipes';
import { ImageFiltersBadRequestException } from '@exceptions';

@ApiTags('images')
@Controller('images')
export class ImagesController {
  @Inject()
  private readonly imageCommand: ProcessImageCommand;

  private errorHandler = (error) => {
    let handledError = error;
    if (error instanceof ImageFiltersBadRequestException) {
      handledError = new BadRequestException(error.response);
    }
    return throwError(() => handledError);
  };

  @ApiConsumes('multipart/form-data')
  @ApiExtraModels(Image)
  @ApiBody({
    description:
      'This request needs an image file and a image properties schema',
    schema: {
      type: 'object',
      properties: {
        properties: {
          $ref: getSchemaPath(Image),
          type: 'string',
        },
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiOkResponse({
    description: 'Image processed successfully',
    schema: {
      type: 'object',
      properties: {
        type: {
          type: 'string',
        },
        data: {
          type: 'array',
          items: {
            type: 'number',
          },
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Invalid image properties',
  })
  @ApiUnsupportedMediaTypeResponse({
    description: 'Invalid image file',
  })
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @UsePipes(
    new ImageValidatorPipe(),
    new ImagePropertiesTransformerPipe(),
    new ImagePropertiesValidatorPipe(),
  )
  @HttpCode(200)
  processImage(
    @UploadedFile() image: Express.Multer.File,
    @Body() imageProperties: Image,
  ) {
    return this.imageCommand
      .execute(image, imageProperties)
      .pipe(catchError((err) => this.errorHandler(err)));
  }
}
