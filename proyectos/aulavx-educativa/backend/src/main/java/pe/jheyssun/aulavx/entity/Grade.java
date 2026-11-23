package pe.jheyssun.aulavx.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
@Entity @Table(name="grades")
public class Grade {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY) public Long id;
    @ManyToOne(optional=false,fetch=FetchType.LAZY) @JoinColumn(name="enrollment_id",nullable=false) public Enrollment enrollment;
    @Column(nullable=false,length=120) public String title;
    @Column(nullable=false,precision=5,scale=2) public BigDecimal score;
    @Column(name="max_score",nullable=false,precision=5,scale=2) public BigDecimal maxScore;
    @Column(name="graded_at",nullable=false) public LocalDate gradedAt=LocalDate.now();
}
