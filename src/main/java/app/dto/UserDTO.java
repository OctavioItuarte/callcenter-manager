package app.dto;

import app.domain.User;

import java.util.Set;

public class UserDTO {

    private String email;
    private String role;
    private String trunk;
    private String name;
    private Set<String> formatCall;

    public UserDTO() {
    }

    public UserDTO(User user) {
        this.email = user.getEmail();
        this.role = user.getRole();
        this.trunk = user.getTrunk();
        this.name = user.getName();
        this.formatCall = user.getFormatCall();
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String rol) {
        this.role = rol;
    }

    public String getTrunk() {
        return trunk;
    }

    public void setTrunk(String trunk) {
        this.trunk = trunk;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<String> getFormatCall() {
        return formatCall;
    }

    public void setFormatCall(Set<String> formatCall) {
        this.formatCall = formatCall;
    }
}
