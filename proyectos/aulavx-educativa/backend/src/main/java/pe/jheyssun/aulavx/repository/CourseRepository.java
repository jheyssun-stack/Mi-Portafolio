package pe.jheyssun.aulavx.repository;
import pe.jheyssun.aulavx.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
public interface CourseRepository extends JpaRepository<Course,Long> { boolean existsByCodeIgnoreCase(String code); }
