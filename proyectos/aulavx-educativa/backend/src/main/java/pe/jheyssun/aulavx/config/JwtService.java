package pe.jheyssun.aulavx.config;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Date;
import javax.crypto.SecretKey;
@Service
public class JwtService {
    private final JwtProperties properties;
    public JwtService(JwtProperties properties){this.properties=properties;}
    private SecretKey key(){return Keys.hmacShaKeyFor(properties.getSecret().getBytes(StandardCharsets.UTF_8));}
    public String create(String email,String role){Instant now=Instant.now();return Jwts.builder().subject(email).claim("role",role).issuedAt(Date.from(now)).expiration(Date.from(now.plusSeconds(properties.getExpirationMinutes()*60))).signWith(key()).compact();}
    public String subject(String token){return Jwts.parser().verifyWith(key()).build().parseSignedClaims(token).getPayload().getSubject();}
}
