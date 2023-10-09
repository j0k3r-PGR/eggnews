package com.j0k3r.eggnews;

//import java.util.Set;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
//import org.springframework.context.annotation.Bean;
//import org.springframework.security.crypto.password.PasswordEncoder;
//
//import com.j0k3r.eggnews.models.auth.UserEntity;
//import com.j0k3r.eggnews.models.auth.Role;
//import com.j0k3r.eggnews.models.auth.RoleEntity;
//import com.j0k3r.eggnews.repositories.UserRepository;
//import java.util.Set;

@SpringBootApplication
public class EggnewsApplication {

	public static void main(String[] args) {
		SpringApplication.run(EggnewsApplication.class, args);
	}

//	@Autowired
//	private PasswordEncoder passwordEncoder;
//
//	@Autowired
//	private UserRepository userRepository;
//        
//	@Bean
//	CommandLineRunner init(){
//		return (args -> {
//			UserEntity user = UserEntity.builder()
//						.username("adminUser")
//						.password(passwordEncoder.encode("j0k3r#2023"))
//						.roles(Set.of(RoleEntity.builder()
//								.name(Role.valueOf(Role.ADMIN.name()))
//							.build()))
//						.name("J0k3r")
//						.surname("Rg")
//					.build();
//			
//			userRepository.save(user);
//
//			UserEntity user2 = UserEntity.builder()
//						.username("employeeUser")
//						.password(passwordEncoder.encode("employee#2023"))
//						.roles(Set.of(RoleEntity.builder()
//								.name(Role.valueOf(Role.EMPLEADO.name()))
//							.build()))
//						.name("Employee")
//						.surname("One")
//					.build();
//
//			userRepository.save(user2);
//
//			UserEntity user3 = UserEntity.builder()
//						.username("karinadell")
//						.password(passwordEncoder.encode("karinadell"))
//						.roles(Set.of(RoleEntity.builder()
//								.name(Role.valueOf(Role.USER.name()))
//							.build()))
//						.name("Karina")
//						.surname("Dell")
//					.build();
//			
//			userRepository.save(user3);
//		});
//	}

}
