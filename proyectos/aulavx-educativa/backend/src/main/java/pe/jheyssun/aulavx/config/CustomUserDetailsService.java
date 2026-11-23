package pe.jheyssun.aulavx.config;
import pe.jheyssun.aulavx.entity.AppUser;
import pe.jheyssun.aulavx.repository.UserRepository;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;
@Service
public class CustomUserDetailsService implements UserDetailsService {
    private final UserRepository users;
    public CustomUserDetailsService(UserRepository users){this.users=users;}
    @Override public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        AppUser user=users.findByEmailIgnoreCase(email).orElseThrow(()->new UsernameNotFoundException("Cuenta no encontrada"));
        if(!user.active) throw new DisabledException("Cuenta desactivada");
        return User.withUsername(user.email).password(user.passwordHash).authorities("ROLE_"+user.role.name()).build();
    }
}
