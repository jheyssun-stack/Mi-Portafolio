package pe.jheyssun.aulavx.config;
import pe.jheyssun.aulavx.entity.*;
import pe.jheyssun.aulavx.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.math.BigDecimal;
@Configuration
public class DemoData {
 @Bean CommandLineRunner seed(UserRepository users,StudentRepository students,CourseRepository courses,EnrollmentRepository enrollments,GradeRepository grades,PasswordEncoder encoder){return args->{
   if(users.count()==0){user(users,encoder,"admin@aulavx.edu","Jheyssun Vargas","AulaVX2026!",AppUser.Role.ADMIN);user(users,encoder,"docente@aulavx.edu","María Salazar","Docente2026!",AppUser.Role.TEACHER);user(users,encoder,"estudiante@aulavx.edu","Luis Quispe","Alumno2026!",AppUser.Role.STUDENT);}
   if(students.count()==0){students.save(student("2026001","Luis","Quispe","luis.quispe@aulavx.edu","Ingeniería de Sistemas"));students.save(student("2026002","Camila","Rojas","camila.rojas@aulavx.edu","Ingeniería de Sistemas"));students.save(student("2026003","Mateo","Huamán","mateo.huaman@aulavx.edu","Administración"));}
   if(courses.count()==0){courses.save(course("SIS101","Fundamentos de programación","Resolución de problemas, algoritmos y Java.",4));courses.save(course("SIS204","Base de datos I","Modelo relacional, SQL y normalización.",4));courses.save(course("SIS221","Desarrollo web","Interfaces React e integración con API REST.",3));}
   if(enrollments.count()==0&&students.count()>0&&courses.count()>0){Enrollment e=new Enrollment();e.student=students.findAll().get(0);e.course=courses.findAll().get(0);e.term="2026-1";e=enrollments.save(e);Grade g=new Grade();g.enrollment=e;g.title="Práctica 1";g.score=new BigDecimal("17.50");g.maxScore=new BigDecimal("20.00");grades.save(g);}
  };}
 private static void user(UserRepository r,PasswordEncoder e,String email,String name,String pass,AppUser.Role role){AppUser u=new AppUser();u.email=email;u.fullName=name;u.passwordHash=e.encode(pass);u.role=role;r.save(u);}
 private static Student student(String code,String first,String last,String email,String program){Student s=new Student();s.code=code;s.firstName=first;s.lastName=last;s.email=email;s.program=program;return s;}
 private static Course course(String code,String name,String desc,int credits){Course c=new Course();c.code=code;c.name=name;c.description=desc;c.credits=credits;return c;}
}
