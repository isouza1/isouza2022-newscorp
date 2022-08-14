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
import org.springframework.web.bind.annotation.RequestMethod;
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

	// @PostMapping(value = "/register", produces = "application/json")
	@RequestMapping(value="/register", method=RequestMethod.POST, consumes = "application/json")
	public ResponseEntity<String> register(HttpSession session, @RequestBody UserTO userTO) {
		System.out.println("Inside register: username=" + userTO.getEmail() + ", password=" + userTO.getPassword());
		// session.setAttribute(userVO.getEmail(), userVO);
		System.out.println("Creating list of authority");
		ArrayList<SimpleGrantedAuthority> grantedAuthoritiesList = new ArrayList<>();
		grantedAuthoritiesList.add(new SimpleGrantedAuthority("USER"));

		try {

			inMemoryUserDetailsManager
					.createUser(new User(userTO.getEmail(), passwordEncoder.encode(userTO.getPassword()),
							grantedAuthoritiesList));

			System.out.println("Success creating user inMemoryUserDetailsManager: " + inMemoryUserDetailsManager);

		} catch (IllegalArgumentException e) {
			System.out.println("Registration failed");
			return new ResponseEntity("User already exists", HttpStatus.BAD_REQUEST);
		}

		// return new ResponseEntity<UserVO>(new UserVO(userVO.getEmail()),
		// HttpStatus.OK);
		System.out.println("Registration succesful, returning sucess status");
		return new ResponseEntity<String>("{\"password\":null,\"email\":\"" + userTO.getEmail() +
				"\",\"fname\":null,\"lname\":null}", HttpStatus.OK);
	}
}
