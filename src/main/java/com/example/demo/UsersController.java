package com.example.demo;

import java.util.ArrayList;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// @CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/")
class UsersController {

	@Autowired
	public InMemoryUserDetailsManager inMemoryUserDetailsManager;

	@Autowired
	public PasswordEncoder passwordEncoder;

	@PostMapping(value = "/login", produces = "application/json")
	public ResponseEntity<String> login() {
		System.out.println("Login successful");
		return new ResponseEntity<String>("{ \"status\": \"success\" }",
				HttpStatus.OK);
	}

	@PostMapping(value = "/logout", produces = "application/json")
	public ResponseEntity<String> logout() {
		
		// could remove user from memory here ...
		// inMemoryUserDetailsManager.deleteUser(userFromSession.getEmail());

		System.out.println("LOGOUT successful");
		return new ResponseEntity<String>("{ \"status\": \"success\" }",
				HttpStatus.OK);
	}

	@PostMapping(value = "/register")
	public ResponseEntity<UserVO> register(HttpSession session, @RequestBody UserVO userVO) {
		session.setAttribute(userVO.getEmail(), userVO);
		ArrayList<SimpleGrantedAuthority> grantedAuthoritiesList = new ArrayList<>();
		grantedAuthoritiesList.add(new SimpleGrantedAuthority("USER"));

		try {
			inMemoryUserDetailsManager
					.createUser(new User(userVO.getEmail(), passwordEncoder.encode(userVO.getPassword()),
							grantedAuthoritiesList));

		} catch (IllegalArgumentException e) {
			System.out.println("Registration failed");
			return new ResponseEntity("User already exists", HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<UserVO>(new UserVO(userVO.getEmail()), HttpStatus.OK);
	}
}
