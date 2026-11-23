package pe.jheyssun.aulavx.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
@Entity @Table(name="enrollments",uniqueConstraints=@UniqueConstraint(name="uk_enrollment_student_course_term",columnNames={"student_id","course_id","term"}))
public class Enrollment {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY) public Long id;
    @ManyToOne(optional=false,fetch=FetchType.LAZY) @JoinColumn(name="student_id",nullable=false) public Student student;
    @ManyToOne(optional=false,fetch=FetchType.LAZY) @JoinColumn(name="course_id",nullable=false) public Course course;
    @Column(nullable=false,length=20) public String term;
    @Column(nullable=false,length=20) public String status="ACTIVE";
    @Column(name="created_at",nullable=false) public LocalDate createdAt=LocalDate.now();
}
