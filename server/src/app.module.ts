import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PatientsModule } from './patients/patients.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      global: true,
      secret: 'your-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
    PatientsModule,
    AuthModule,
  ],
})
export class AppModule {}