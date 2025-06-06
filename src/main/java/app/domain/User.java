package app.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.util.HashSet;
import java.util.Set;


@Entity
@Table(name = "`user`")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull(message = "El nombre no puede ser nulo")
    private String name;
    @NotNull(message = "La contraseña no puede ser nula")
    @Size(min = 6, message = "La contraseña debe tener al menos 6 caracteres")
    @Pattern(regexp = "^(?=.*[A-Z]).+$", message = "La contraseña debe contener al menos una mayúscula")
    private String password;
    @NotNull(message = "El correo electrónico no puede ser nulo")
    @Email(message = "Debe ser una dirección de correo electrónico válida")
    private String email;
    private String role;
    private String trunk;

    @ElementCollection
    private Set<String> formatCall;

    public User(){
        this.formatCall = new HashSet<>();
    }

    @PreRemove
    private void removeFormatCalls() {
        formatCall.clear();
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public Set<String> getFormatCall() {
        return new HashSet<>(this.formatCall);
    }

    public void setFormatCall(Set formatCall) {
        this.formatCall = formatCall;
    }
}
