package pe.jheyssun.aulavx.repository;
import pe.jheyssun.aulavx.entity.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;
public interface EnrollmentRepository extends JpaRepository<Enrollment,Long> { boolean existsByStudentIdAndCourseIdAndTerm(Long studentId,Long courseId,String term); }
