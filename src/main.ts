import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('KYC')
    .setDescription('The KYC API description')
    .setVersion('1.0')
    .addTag('KYC')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors();
  console.log(process.env.PORT);
  await app.listen(process.env.PORT);
}
bootstrap();
