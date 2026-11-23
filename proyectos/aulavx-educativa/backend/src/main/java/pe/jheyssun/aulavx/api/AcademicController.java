package pe.jheyssun.aulavx.api;
import pe.jheyssun.aulavx.entity.*;
import pe.jheyssun.aulavx.service.AcademicService;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController @RequestMapping("/api")
public class AcademicController {
 private final AcademicService service;
 public AcademicController(AcademicService service){this.service=service;}
 @GetMapping("/dashboard") public ApiModels.DashboardView dashboard(){return service.dashboard();}
 @GetMapping("/students") @PreAuthorize("hasAnyRole('ADMIN','TEACHER')") public List<Student> students(@RequestParam(required=false) String q){return service.students(q);}
 @PostMapping("/students") @PreAuthorize("hasRole('ADMIN')") public Student createStudent(@Valid @RequestBody ApiModels.StudentInput in){return service.saveStudent(null,in);}
 @PutMapping("/students/{id}") @PreAuthorize("hasRole('ADMIN')") public Student updateStudent(@PathVariable Long id,@Valid @RequestBody ApiModels.StudentInput in){return service.saveStudent(id,in);}
 @DeleteMapping("/students/{id}") @PreAuthorize("hasRole('ADMIN')") public void deactivateStudent(@PathVariable Long id){service.deleteStudent(id);}
 @GetMapping("/courses") public List<Course> courses(@RequestParam(required=false) String q){return service.courses(q);}
 @PostMapping("/courses") @PreAuthorize("hasAnyRole('ADMIN','TEACHER')") public Course createCourse(@Valid @RequestBody ApiModels.CourseInput in){return service.saveCourse(null,in);}
 @PutMapping("/courses/{id}") @PreAuthorize("hasAnyRole('ADMIN','TEACHER')") public Course updateCourse(@PathVariable Long id,@Valid @RequestBody ApiModels.CourseInput in){return service.saveCourse(id,in);}
 @DeleteMapping("/courses/{id}") @PreAuthorize("hasRole('ADMIN')") public void deactivateCourse(@PathVariable Long id){service.deleteCourse(id);}
 @GetMapping("/enrollments") @PreAuthorize("hasAnyRole('ADMIN','TEACHER')") public List<ApiModels.EnrollmentView> enrollments(){return service.enrollments();}
 @PostMapping("/enrollments") @PreAuthorize("hasRole('ADMIN')") public ApiModels.EnrollmentView createEnrollment(@Valid @RequestBody ApiModels.EnrollmentInput in){return service.saveEnrollment(null,in);}
 @PutMapping("/enrollments/{id}") @PreAuthorize("hasRole('ADMIN')") public ApiModels.EnrollmentView updateEnrollment(@PathVariable Long id,@Valid @RequestBody ApiModels.EnrollmentInput in){return service.saveEnrollment(id,in);}
 @DeleteMapping("/enrollments/{id}") @PreAuthorize("hasRole('ADMIN')") public void cancelEnrollment(@PathVariable Long id){service.cancelEnrollment(id);}
 @GetMapping("/grades") @PreAuthorize("hasAnyRole('ADMIN','TEACHER')") public List<ApiModels.GradeView> grades(){return service.grades();}
 @PostMapping("/grades") @PreAuthorize("hasAnyRole('ADMIN','TEACHER')") public ApiModels.GradeView createGrade(@Valid @RequestBody ApiModels.GradeInput in){return service.saveGrade(null,in);}
 @PutMapping("/grades/{id}") @PreAuthorize("hasAnyRole('ADMIN','TEACHER')") public ApiModels.GradeView updateGrade(@PathVariable Long id,@Valid @RequestBody ApiModels.GradeInput in){return service.saveGrade(id,in);}
 @DeleteMapping("/grades/{id}") @PreAuthorize("hasAnyRole('ADMIN','TEACHER')") public void deleteGrade(@PathVariable Long id){service.deleteGrade(id);}
}
