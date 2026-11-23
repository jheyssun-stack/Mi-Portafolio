package pe.jheyssun.aulavx.entity;

import jakarta.persistence.*;
@Entity @Table(name="courses")
public class Course {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY) public Long id;
    @Column(nullable=false,unique=true,length=20) public String code;
    @Column(nullable=false,length=120) public String name;
    @Column(length=600) public String description;
    @Column(nullable=false) public int credits;
    @Column(nullable=false) public boolean active=true;
}
