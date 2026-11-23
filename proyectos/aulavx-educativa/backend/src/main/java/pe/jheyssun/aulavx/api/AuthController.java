package pe.jheyssun.aulavx.api;
import pe.jheyssun.aulavx.config.JwtService;
import pe.jheyssun.aulavx.entity.AppUser;
import pe.jheyssun.aulavx.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.*;
import org.springframework.web.bind.annotation.*;
@RestController @RequestMapping("/api/auth")
public class AuthController {
 private final AuthenticationManager auth;private final UserRepository users;private final JwtService jwt;
 public AuthController(AuthenticationManager auth,UserRepository users,JwtService jwt){this.auth=auth;this.users=users;this.jwt=jwt;}
 @PostMapping("/login") public ApiModels.LoginResponse login(@Valid @RequestBody ApiModels.LoginRequest body){auth.authenticate(new UsernamePasswordAuthenticationToken(body.email().toLowerCase(),body.password()));AppUser user=users.findByEmailIgnoreCase(body.email()).orElseThrow();return new ApiModels.LoginResponse(jwt.create(user.email,user.role.name()),"Bearer",new ApiModels.UserView(user.email,user.fullName,user.role.name()));}
}
