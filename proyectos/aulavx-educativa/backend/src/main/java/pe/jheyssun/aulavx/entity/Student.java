package pe.jheyssun.aulavx.entity;

import jakarta.persistence.*;
@Entity @Table(name="students", indexes=@Index(name="idx_student_name",columnList="last_name,first_name"))
public class Student {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY) public Long id;
    @Column(nullable=false,unique=true,length=20) public String code;
    @Column(name="first_name",nullable=false,length=80) public String firstName;
    @Column(name="last_name",nullable=false,length=100) public String lastName;
    @Column(nullable=false,unique=true,length=120) public String email;
    @Column(nullable=false,length=100) public String program;
    @Column(nullable=false) public boolean active=true;
}
