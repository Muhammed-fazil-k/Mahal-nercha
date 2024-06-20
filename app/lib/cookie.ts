import { SignJWT } from 'jose';
import { cookies } from 'next/headers';

const ALGORITHM = 'HS256';
const MAX_AGE = 60 * 60 * 24 * 30;
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
const encrypt = async (data: {}) => {
  const payload = await new SignJWT(data)
    .setProtectedHeader({ alg: ALGORITHM })
    .setIssuedAt()
    .setExpirationTime('1 day from now')
    .sign(JWT_SECRET);
  return payload;
};
const setCookie = async (name: string, value: {}) => {
  const expires = new Date(MAX_AGE);
  const encyptedData = await encrypt({ value, expires });
  cookies().set(name, encyptedData, {
    httpOnly: true,
    maxAge: MAX_AGE,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
};

export { setCookie };
