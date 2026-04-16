// package com.edutech.progressive.jwt;

// import java.nio.charset.StandardCharsets;
// import java.util.Date;
// import java.util.HashMap;
// import java.util.Map;

// import javax.crypto.SecretKey;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.stereotype.Component;

// import com.edutech.progressive.entity.User;
// import com.edutech.progressive.repository.UserRepository;

// import io.jsonwebtoken.Claims;
// import io.jsonwebtoken.Jwts;
// import io.jsonwebtoken.SignatureAlgorithm;
// import io.jsonwebtoken.security.Keys;

// @Component
// public class JwtUtil {

//     private static final String SECRET = "your_secret_key_which_is_at_least_32_bytes";
//     private static final SecretKey SECRET_KEY =
//             Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8));

//     private static final long JWT_VALIDITY = 1000 * 60 * 60; // 1 hour

//     @Autowired
//     private UserRepository userRepository;

//     public JwtUtil() {
//     }

//     public JwtUtil(UserRepository userRepository) {
//         this.userRepository = userRepository;
//     }

//     public String generateToken(String username) {
//         Map<String, Object> claims = new HashMap<>();

//         User user = userRepository.findByUsername(username);
//         if (user != null) {
//             claims.put("role", user.getRole());
//         }

//         return Jwts.builder()
//                 .setClaims(claims)
//                 .setSubject(username)
//                 .setIssuedAt(new Date(System.currentTimeMillis()))
//                 .setExpiration(new Date(System.currentTimeMillis() + JWT_VALIDITY))
//                 .signWith(SECRET_KEY, SignatureAlgorithm.HS256)
//                 .compact();
//     }

//     public Claims extractAllClaims(String token) {
//         try {
//             return Jwts.parserBuilder()
//                     .setSigningKey(SECRET_KEY)
//                     .build()
//                     .parseClaimsJws(token)
//                     .getBody();
//         } catch (Exception e) {
//             return null;
//         }
//     }

//     public String extractUsername(String token) {
//         Claims claims = extractAllClaims(token);
//         return claims != null ? claims.getSubject() : null;
//     }

//     public boolean isTokenExpired(String token) {
//         Claims claims = extractAllClaims(token);
//         if (claims == null) {
//             return true;
//         }
//         return claims.getExpiration().before(new Date());
//     }

//     public boolean validateToken(String token, UserDetails userDetails) {
//         String username = extractUsername(token);
//         return username != null
//                 && username.equals(userDetails.getUsername())
//                 && !isTokenExpired(token);
//     }
// }


package com.edutech.progressive.jwt;
 
import com.edutech.progressive.entity.User;
 
import com.edutech.progressive.repository.UserRepository;
 
import io.jsonwebtoken.Claims;
 
import io.jsonwebtoken.Jwts;
 
import io.jsonwebtoken.SignatureAlgorithm;
 
import org.springframework.beans.factory.annotation.Autowired;
 
import org.springframework.security.core.userdetails.UserDetails;
 
import org.springframework.stereotype.Component;
 
import java.util.Date;
 
import java.util.HashMap;
 
import java.util.Map;
 
@Component
 
public class JwtUtil {
 
    private UserRepository userRepository;
 
    @Autowired
 
    public JwtUtil(UserRepository userRepository) {
 
        this.userRepository = userRepository;
 
    }
 
    private final String secret = "secretKey000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";
 
    private final int expiration = 86400;
 
    public String generateToken(String username) {
 
        Date now = new Date();
 
        Date expiryDate = new Date(now.getTime() + expiration * 1000);
 
        User user = userRepository.findByUsername(username);
 
        Map<String, Object> claims = new HashMap<>();
 
        claims.put("sub", username);
 
        // Assign role based on user type
 
        claims.put("role", user.getRole());
 
        return Jwts.builder()
 
                .setClaims(claims)
 
                .setIssuedAt(now)
 
                .setExpiration(expiryDate)
 
                .signWith(SignatureAlgorithm.HS512, secret)
 
                .compact();
 
    }
 
    public Claims extractAllClaims(String token) {
 
        Claims claims;
 
        try {
 
            claims = Jwts.parser()
 
                    .setSigningKey(secret)
 
                    .parseClaimsJws(token)
 
                    .getBody();
 
        } catch (Exception e) {
 
            claims = null;
 
        }
 
        return claims;
 
    }
 
    public String extractUsername(String token) {
 
        Claims claims = Jwts.parser()
 
                .setSigningKey(secret)
 
                .parseClaimsJws(token)
 
                .getBody();
 
        return claims.getSubject();
 
    }
 
    public boolean isTokenExpired(String token) {
 
        Date expirationDate = Jwts.parser()
 
                .setSigningKey(secret)
 
                .parseClaimsJws(token)
 
                .getBody()
 
                .getExpiration();
 
        return expirationDate.before(new Date());
 
    }
 
    public boolean validateToken(String token, UserDetails userDetails) {
 
        final String username = extractUsername(token);
 
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
 
    }
 
}