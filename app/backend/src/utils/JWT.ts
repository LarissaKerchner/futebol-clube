import { JwtPayload, Secret, sign, verify } from 'jsonwebtoken';

export default class JWT {
  private static secret: Secret = process.env.JWT_SECRET || 'secret';

  static sign(payload: JwtPayload): string {
    return sign({ ...payload }, this.secret);
  }

  static verify(token: string): JwtPayload | string {
    const payload = verify(token, this.secret);
    return payload;
  }
}
