package app.auth;


import app.domain.User;
import app.dto.UserDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
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

        UserDTO userDate = getUserDate(token);

        String userName = userDate.getName();
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority(userDate.getRole());
        Collection<? extends GrantedAuthority> authorities = Collections.singletonList(authority);
        return new UsernamePasswordAuthenticationToken(userName, token, authorities);

    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }

    public String generateToken(UserDTO userDate) {
        Date expirationDate = new Date(System.currentTimeMillis() + jwtExpirationInMs);
        SecretKey secretKey = Keys.hmacShaKeyFor(jwtSecret.getBytes());

        return Jwts.builder()
                .claim("userDate", userDate)
                .setIssuedAt(new Date())
                .setExpiration(expirationDate)
                .signWith(secretKey)
                .compact();
    }

    public UserDTO getUserDate(String token){
        Jws<Claims> claimsJws = Jwts.parserBuilder()
                .setSigningKey(getSecretKey())
                .build()
                .parseClaimsJws(token);

        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.convertValue(claimsJws.getBody().get("userDate"), UserDTO.class);
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