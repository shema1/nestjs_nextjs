import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const start = async () => {
  try {
    const PORT = process.env.PORT || 5000
    const app = await NestFactory.create(AppModule);
    app.enableCors()
    const config = new DocumentBuilder()
      .setTitle("Custom app")
      .setDescription('Documentation')
      .setVersion('1.0.0')
      .build()

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('/api/docs', app, document)

    await app.listen(PORT, () => console.log(`server started on port ${PORT}`))
  } catch (error) {
    console.log(error);
  }
};

start()