package pe.jheyssun.aulavx.config;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtService jwt; private final CustomUserDetailsService users;
    public JwtAuthenticationFilter(JwtService jwt,CustomUserDetailsService users){this.jwt=jwt;this.users=users;}
    @Override protected void doFilterInternal(HttpServletRequest request,HttpServletResponse response,FilterChain chain)throws ServletException,IOException{
        String auth=request.getHeader("Authorization");
        if(auth!=null&&auth.startsWith("Bearer ")&&SecurityContextHolder.getContext().getAuthentication()==null){
            try{String email=jwt.subject(auth.substring(7));UserDetails details=users.loadUserByUsername(email);UsernamePasswordAuthenticationToken token=new UsernamePasswordAuthenticationToken(details,null,details.getAuthorities());token.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));SecurityContextHolder.getContext().setAuthentication(token);}
            catch(RuntimeException ignored){SecurityContextHolder.clearContext();}
        }
        chain.doFilter(request,response);
    }
}
