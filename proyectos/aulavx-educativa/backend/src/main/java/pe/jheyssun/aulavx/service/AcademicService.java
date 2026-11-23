package pe.jheyssun.aulavx.service;
import pe.jheyssun.aulavx.api.ApiModels;
import pe.jheyssun.aulavx.entity.*;
import pe.jheyssun.aulavx.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.*;
import java.util.*;
import java.util.stream.Collectors;
@Service @Transactional
public class AcademicService {
 private final StudentRepository students;private final CourseRepository courses;private final EnrollmentRepository enrollments;private final GradeRepository grades;
 public AcademicService(StudentRepository s,CourseRepository c,EnrollmentRepository e,GradeRepository g){students=s;courses=c;enrollments=e;grades=g;}
 public List<Student> students(String q){String x=q==null?"":q.trim().toLowerCase();return students.findAll().stream().filter(s->x.isEmpty()||(s.code+" "+s.firstName+" "+s.lastName+" "+s.email+" "+s.program).toLowerCase().contains(x)).sorted(Comparator.comparing(s->s.lastName+" "+s.firstName)).collect(Collectors.toList());}
 public Student saveStudent(Long id,ApiModels.StudentInput in){Student s=id==null?new Student():students.findById(id).orElseThrow(()->new NoSuchElementException("Estudiante no encontrado."));s.code=in.code().trim().toUpperCase();s.firstName=in.firstName().trim();s.lastName=in.lastName().trim();s.email=in.email().trim().toLowerCase();s.program=in.program().trim();s.active=in.active();return students.save(s);}
 public Student student(Long id){return students.findById(id).orElseThrow(()->new NoSuchElementException("Estudiante no encontrado."));}
 public void deleteStudent(Long id){Student s=student(id);s.active=false;students.save(s);}
 public List<Course> courses(String q){String x=q==null?"":q.trim().toLowerCase();return courses.findAll().stream().filter(c->x.isEmpty()||(c.code+" "+c.name+" "+c.description).toLowerCase().contains(x)).sorted(Comparator.comparing(c->c.name)).collect(Collectors.toList());}
 public Course saveCourse(Long id,ApiModels.CourseInput in){Course c=id==null?new Course():courses.findById(id).orElseThrow(()->new NoSuchElementException("Curso no encontrado."));c.code=in.code().trim().toUpperCase();c.name=in.name().trim();c.description=in.description()==null?"":in.description().trim();c.credits=in.credits();c.active=in.active();return courses.save(c);}
 public void deleteCourse(Long id){Course c=courses.findById(id).orElseThrow(()->new NoSuchElementException("Curso no encontrado."));c.active=false;courses.save(c);}
 public List<ApiModels.EnrollmentView> enrollments(){return enrollments.findAll().stream().sorted(Comparator.comparing(e->e.createdAt,Comparator.nullsLast(Comparator.reverseOrder()))).map(this::enrollmentView).collect(Collectors.toList());}
 public ApiModels.EnrollmentView saveEnrollment(Long id,ApiModels.EnrollmentInput in){Enrollment e=id==null?new Enrollment():enrollments.findById(id).orElseThrow(()->new NoSuchElementException("Matrícula no encontrada."));e.student=students.findById(in.studentId()).orElseThrow(()->new NoSuchElementException("Estudiante no encontrado."));e.course=courses.findById(in.courseId()).orElseThrow(()->new NoSuchElementException("Curso no encontrado."));e.term=in.term();e.status=in.status()==null||in.status().isBlank()?"ACTIVE":in.status();if(id==null&&enrollments.existsByStudentIdAndCourseIdAndTerm(e.student.id,e.course.id,e.term))throw new IllegalArgumentException("El estudiante ya tiene matrícula en ese curso y periodo.");return enrollmentView(enrollments.save(e));}
 public void cancelEnrollment(Long id){Enrollment e=enrollments.findById(id).orElseThrow(()->new NoSuchElementException("Matrícula no encontrada."));e.status="CANCELLED";enrollments.save(e);}
 public List<ApiModels.GradeView> grades(){return grades.findAll().stream().sorted(Comparator.comparing(g->g.gradedAt,Comparator.nullsLast(Comparator.reverseOrder()))).map(this::gradeView).collect(Collectors.toList());}
 public ApiModels.GradeView saveGrade(Long id,ApiModels.GradeInput in){if(in.score().compareTo(in.maxScore())>0)throw new IllegalArgumentException("La nota no puede superar la nota máxima.");Grade g=id==null?new Grade():grades.findById(id).orElseThrow(()->new NoSuchElementException("Nota no encontrada."));g.enrollment=enrollments.findById(in.enrollmentId()).orElseThrow(()->new NoSuchElementException("Matrícula no encontrada."));g.title=in.title().trim();g.score=in.score().setScale(2,RoundingMode.HALF_UP);g.maxScore=in.maxScore().setScale(2,RoundingMode.HALF_UP);g.gradedAt=in.gradedAt()==null?java.time.LocalDate.now():in.gradedAt();return gradeView(grades.save(g));}
 public void deleteGrade(Long id){if(!grades.existsById(id))throw new NoSuchElementException("Nota no encontrada.");grades.deleteById(id);}
 public ApiModels.DashboardView dashboard(){List<Grade> all=grades.findAll();BigDecimal avg=all.isEmpty()?BigDecimal.ZERO:all.stream().map(g->g.score.multiply(BigDecimal.valueOf(20)).divide(g.maxScore,2,RoundingMode.HALF_UP)).reduce(BigDecimal.ZERO,BigDecimal::add).divide(BigDecimal.valueOf(all.size()),2,RoundingMode.HALF_UP);return new ApiModels.DashboardView(students.count(),students.findAll().stream().filter(s->s.active).count(),courses.count(),enrollments.count(),grades.count(),avg);}
 private ApiModels.EnrollmentView enrollmentView(Enrollment e){return new ApiModels.EnrollmentView(e.id,e.student.id,e.student.firstName+" "+e.student.lastName,e.student.code,e.course.id,e.course.name,e.course.code,e.term,e.status,e.createdAt);}
 private ApiModels.GradeView gradeView(Grade g){Enrollment e=g.enrollment;return new ApiModels.GradeView(g.id,e.id,e.student.firstName+" "+e.student.lastName,e.student.code,e.course.name,g.title,g.score,g.maxScore,g.gradedAt);}
}
