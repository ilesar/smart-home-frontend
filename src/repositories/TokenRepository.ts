import Token from '@/api/models/Token';

export default class TokenRepository {
    public static getToken(): Token {
        return Token.query().first();
    }
}
