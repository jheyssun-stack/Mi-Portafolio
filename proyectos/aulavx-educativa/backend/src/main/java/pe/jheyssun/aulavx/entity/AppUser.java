package pe.jheyssun.aulavx.entity;

import jakarta.persistence.*;
@Entity @Table(name="users")
public class AppUser {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY) public Long id;
    @Column(nullable=false, unique=true, length=120) public String email;
    @Column(nullable=false, length=100) public String fullName;
    @Column(nullable=false, length=100) public String passwordHash;
    @Enumerated(EnumType.STRING) @Column(nullable=false, length=20) public Role role;
    @Column(nullable=false) public boolean active=true;
    public enum Role { ADMIN, TEACHER, STUDENT }
}
