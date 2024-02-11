import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prismaService: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.NESTJS_JWT_SECRET,
    });
  }

  async validate(payload: any) {
    const foundAdmin = await this.prismaService.admin.findFirst({
      where: {
        id: payload.sub,
      },
    });

    if (!foundAdmin) {
      throw new UnauthorizedException("You don't have permissions enough.");
    }

    return { userId: payload.sub, name: payload.name };
  }
}
