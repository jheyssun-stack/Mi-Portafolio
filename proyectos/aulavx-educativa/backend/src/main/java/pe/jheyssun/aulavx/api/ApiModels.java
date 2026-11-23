package pe.jheyssun.aulavx.api;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDate;
public final class ApiModels {
 private ApiModels(){}
 public record LoginRequest(@NotBlank @Email String email,@NotBlank String password){}
 public record UserView(String email,String fullName,String role){}
 public record LoginResponse(String token,String tokenType,UserView user){}
 public record StudentInput(@NotBlank @Size(max=20) String code,@NotBlank @Size(max=80) String firstName,@NotBlank @Size(max=100) String lastName,@NotBlank @Email @Size(max=120) String email,@NotBlank @Size(max=100) String program,boolean active){}
 public record CourseInput(@NotBlank @Size(max=20) String code,@NotBlank @Size(max=120) String name,@Size(max=600) String description,@Min(1) @Max(20) int credits,boolean active){}
 public record EnrollmentInput(@NotNull Long studentId,@NotNull Long courseId,@NotBlank @Pattern(regexp="20[0-9]{2}-[1-2]") String term,@Pattern(regexp="ACTIVE|COMPLETED|CANCELLED") String status){}
 public record GradeInput(@NotNull Long enrollmentId,@NotBlank @Size(max=120) String title,@NotNull @DecimalMin("0.00") BigDecimal score,@NotNull @DecimalMin("0.01") BigDecimal maxScore,LocalDate gradedAt){}
 public record EnrollmentView(Long id,Long studentId,String studentName,String studentCode,Long courseId,String courseName,String courseCode,String term,String status,LocalDate createdAt){}
 public record GradeView(Long id,Long enrollmentId,String studentName,String studentCode,String courseName,String title,BigDecimal score,BigDecimal maxScore,LocalDate gradedAt){}
 public record DashboardView(long students,long activeStudents,long courses,long enrollments,long grades,BigDecimal average){}
 public record ErrorView(String message){}
}
