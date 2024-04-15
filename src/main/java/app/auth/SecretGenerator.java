package app.auth;

import java.security.SecureRandom;
import java.util.Base64;

public class SecretGenerator {

    public static String generateSecretKey() {

        byte[] secretBytes = generateRandomBytes(32);
        return Base64.getEncoder().encodeToString(secretBytes);
    }
    private static byte[] generateRandomBytes(int length) {
        byte[] randomBytes = new byte[length];
        SecureRandom secureRandom = new SecureRandom();
        secureRandom.nextBytes(randomBytes);
        return randomBytes;
    }
}
