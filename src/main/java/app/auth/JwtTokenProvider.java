package app.auth;


import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;
import javax.crypto.SecretKey;
import java.security.Key;
import java.util.Collection;
import java.util.Collections;
import java.util.Date;


@Component
public class JwtTokenProvider implements AuthenticationProvider {

    private final String jwtSecret;
    private final int jwtExpirationInMs;

    public JwtTokenProvider(@Value("${app.jwtExpirationInMs}") int jwtExpirationInMs,
                            @Value("${app.jwtSecret}") String jwtSecret) {
        this.jwtExpirationInMs = jwtExpirationInMs;
        this.jwtSecret = jwtSecret;
    }

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String token = (String) authentication.getCredentials();
        if (!validateToken(token)) {
            return null;
        }
        String userName = getNameUserFromToken(token);
        Collection<? extends GrantedAuthority> authorities = getRolesFromToken(token);
        return new UsernamePasswordAuthenticationToken(userName, token, authorities);

    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }

    public String generateToken(String userName, String role, String trunk) {
        Date expirationDate = new Date(System.currentTimeMillis() + jwtExpirationInMs);
        SecretKey secretKey = Keys.hmacShaKeyFor(jwtSecret.getBytes());

        return Jwts.builder()
                .setSubject(userName)
                .claim("role", role)
                .claim("trunk", trunk)
                .setIssuedAt(new Date())
                .setExpiration(expirationDate)
                .signWith(secretKey)
                .compact();
    }

    public String getNameUserFromToken(String token) {
        Jws<Claims> claimsJws = Jwts.parserBuilder()
                .setSigningKey(getSecretKey())
                .build()
                .parseClaimsJws(token);

        return claimsJws.getBody().getSubject();
    }

    public String getRoleFromToken(String token) {
        Jws<Claims> claimsJws = Jwts.parserBuilder()
                .setSigningKey(getSecretKey())
                .build()
                .parseClaimsJws(token);

        return (String) claimsJws.getBody().get("role");
    }

    public String getTrunkFromToken(String token){
        Jws<Claims> claimsJws = Jwts.parserBuilder()
                .setSigningKey(getSecretKey())
                .build()
                .parseClaimsJws(token);

        return (String) claimsJws.getBody().get("trunk");
    }

    public Collection<? extends GrantedAuthority> getRolesFromToken(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(getSecretKey())
                .build()
                .parseClaimsJws(token)
                .getBody();

        String role = (String) claims.get("role");

        SimpleGrantedAuthority authority = new SimpleGrantedAuthority(role);

        return Collections.singletonList(authority);
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(getSecretKey())
                    .build()
                    .parseClaimsJws(token);


            return true;
        } catch (Exception ex) {

            System.out.println("Error al validar el token: " + ex.getMessage());
            return false;
        }
    }

    private Key getSecretKey() {
        return Keys.hmacShaKeyFor(jwtSecret.getBytes());
    }
}