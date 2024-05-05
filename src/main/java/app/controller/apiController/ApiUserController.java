package app.controller.apiController;

import app.domain.User;
import app.dto.UserDTO;
import app.service.AuthService;
import app.service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;


import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.naming.AuthenticationException;
import java.util.List;


@RestController
@Validated
public class ApiUserController {

    @Autowired
    private AuthService authService;

    @Autowired
    private UserService userService;

    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers(){
        List<UserDTO> users = this.userService.getAllUsers();
        if(!users.isEmpty()) {
            return ResponseEntity.status(HttpStatus.OK).body(users);
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontraron usarios");
        }
    }



    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@Valid @RequestBody User user) {
        if(this.userService.existsByEmail(user.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("El email ya está en uso.");
        }
        userService.userRegister(user);
        return ResponseEntity.status(HttpStatus.CREATED).body("Usuario creado exitosamente");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user, HttpServletResponse response) {
        try {
            String token = authService.authUser(user.getEmail(), user.getPassword());

            Cookie cookie = new Cookie("token", token);
            cookie.setPath("/");
            response.addCookie(cookie);

            return ResponseEntity.ok(token);
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Correo electrónico o contraseña incorrectos");
        }
    }

    @Transactional
    @DeleteMapping("/delete/{email}")
    public ResponseEntity<?> deleteUser(@PathVariable String email){
        boolean deleted = userService.deleteUserByEmail(email);

        if (deleted) {
            return new ResponseEntity<>("Usuario con el email " + email + " ha sido borrado con exito", HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>("Usuario con el email " + email + " no existe", HttpStatus.NOT_FOUND);
        }

    }

}
