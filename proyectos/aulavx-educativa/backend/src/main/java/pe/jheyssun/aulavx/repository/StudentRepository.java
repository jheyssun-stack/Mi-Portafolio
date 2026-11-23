package pe.jheyssun.aulavx.repository;
import pe.jheyssun.aulavx.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
public interface StudentRepository extends JpaRepository<Student,Long> { boolean existsByCodeIgnoreCase(String code); boolean existsByEmailIgnoreCase(String email); }
