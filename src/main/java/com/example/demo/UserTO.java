package com.example.demo;

import java.io.Serializable;

public class UserTO implements Serializable {

    private String password;
    private String email;
    private String fname;
    private String lname;

    UserTO() {
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFname() {
        return fname;
    }

    public void setFname(String fname) {
        this.fname = fname;
    }

    public String getLname() {
        return lname;
    }

    public void setLname(String lname) {
        this.lname = lname;
    }

    public UserTO(String email) {
        this.email = email; 
    }

}
