package app.service;


import app.domain.User;
import app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository  userRepository;


    private BCryptPasswordEncoder passwordEncoder;


    public void userRegister(User user){

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRol("normal");
        userRepository.save(user);
    }
}
