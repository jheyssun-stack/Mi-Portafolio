package pe.jheyssun.aulavx.api;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.*;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import java.util.NoSuchElementException;
@RestControllerAdvice
public class ApiExceptionHandler {
 @ExceptionHandler(MethodArgumentNotValidException.class) ResponseEntity<ApiModels.ErrorView> validation(MethodArgumentNotValidException e){String m=e.getBindingResult().getFieldErrors().stream().map(x->x.getField()+": "+x.getDefaultMessage()).findFirst().orElse("Revisa los datos ingresados");return ResponseEntity.badRequest().body(new ApiModels.ErrorView(m));}
 @ExceptionHandler(IllegalArgumentException.class) ResponseEntity<ApiModels.ErrorView> badRequest(IllegalArgumentException e){return ResponseEntity.badRequest().body(new ApiModels.ErrorView(e.getMessage()));}
 @ExceptionHandler(NoSuchElementException.class) ResponseEntity<ApiModels.ErrorView> missing(NoSuchElementException e){return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiModels.ErrorView(e.getMessage()));}
 @ExceptionHandler(DataIntegrityViolationException.class) ResponseEntity<ApiModels.ErrorView> duplicate(DataIntegrityViolationException e){return ResponseEntity.status(HttpStatus.CONFLICT).body(new ApiModels.ErrorView("No se puede guardar: existe un dato duplicado o hay registros relacionados."));}
 @ExceptionHandler(BadCredentialsException.class) ResponseEntity<ApiModels.ErrorView> credentials(BadCredentialsException e){return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ApiModels.ErrorView("Correo o contraseña incorrectos."));}
}
