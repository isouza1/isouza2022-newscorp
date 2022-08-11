package com.example.demo;

public class UserVO {

    private String password;
    private String email;
    private String fname;
    private String lname;

    UserVO() {
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

    public static class Builder {

        private String password;
        private String email;
        private String fname;
        private String lname;

        public Builder() {
        }

        Builder(String password, String email, String fname, String lname) {
            this.password = password;
            this.email = email;
            this.fname = fname;
            this.lname = lname;
        }

        public Builder password(String password) {
            this.password = password;
            return Builder.this;
        }

        public Builder email(String email) {
            this.email = email;
            return Builder.this;
        }

        public Builder fname(String fname) {
            this.fname = fname;
            return Builder.this;
        }

        public Builder lname(String lname) {
            this.lname = lname;
            return Builder.this;
        }

        public UserVO build() {

            return new UserVO(this);
        }
    }

    private UserVO(Builder builder) {
        this.password = builder.password;
        this.email = builder.email;
        this.fname = builder.fname;
        this.lname = builder.lname;
    }

    public UserVO(String email) {
        this.email = email; 
    }

    public void doSomething() {
        // do something
    }
}
