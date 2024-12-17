const privateKey = 'ZPYu33tz8QYU3hwJQXgHpZsKfYn0r2poopBx7x1n3rmeIvuGU4wf65kk6rV1DrN';
export default class AuthController {

  constructor() {}
  login(username = '', password = '') {
    const accessToken = this.createJwt({
      privateKey,
      expiresInHours: 6, // expires in 6 hours
      data: {
        iss: Session.getActiveUser().getEmail(),
        userId: 123,
        name: 'Amit Agarwal',
      },
    });
    Logger.log(accessToken);
    return  {
      access_token: accessToken,
      expires_in: 86400,
      token_type: "Bearer",
      scope: "PublicApi.Access"
    } ;
  }
  information(jwt = '', ) {
    return this.parseJwt(jwt, privateKey);
  }

  parseJwt(jsonWebToken, privateKey) {
    const [header, payload, signature] = jsonWebToken.split('.');
    const signatureBytes = Utilities.computeHmacSha256Signature(`${header}.${payload}`, privateKey);
    const validSignature = Utilities.base64EncodeWebSafe(signatureBytes);
    if (signature === validSignature.replace(/=+$/, '')) {
      const blob = Utilities.newBlob(Utilities.base64Decode(payload)).getDataAsString();
      const { exp, ...data } = JSON.parse(blob);
      if (new Date(exp * 1000) < new Date()) {
        // throw new Error('The token has expired');
        return { msg: 'The token has expired' };
      } else {
        Logger.log(data);
        return  data;
      }
    } else {
      Logger.log('🔴', 'Invalid Signature');
      return { msg: 'Invalid Signature' };
    }
  };
   createJwt({ privateKey, expiresInHours, data = {} }) {
    // Sign token using HMAC with SHA-256 algorithm
    const header = {
      alg: 'HS256',
      typ: 'JWT',
    };
    const now = Date.now();
    const expires = new Date(now);
    expires.setHours(expires.getHours() + expiresInHours);

    // iat = issued time, exp = expiration time
    const payload = {
      exp: Math.round(expires.getTime() / 1000),
      iat: Math.round(now / 1000),
    };
    // add user payload
    Object.keys(data).forEach(function (key) {
      payload[key] = data[key];
    });
    const base64Encode = (text, json = true) => {
      const data = json ? JSON.stringify(text) : text;
      return Utilities.base64EncodeWebSafe(data).replace(/=+$/, '');
    };
    const toSign = `${base64Encode(header)}.${base64Encode(payload)}`;
    const signatureBytes = Utilities.computeHmacSha256Signature(toSign, privateKey);
    const signature = base64Encode(signatureBytes, false);
    return `${toSign}.${signature}`;
  };
}
