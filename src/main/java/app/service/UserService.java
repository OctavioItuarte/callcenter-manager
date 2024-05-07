package app.service;


import app.domain.User;
import app.dto.UserDTO;
import app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Validated
public class UserService {

    @Autowired
    private UserRepository  userRepository;

    private final BCryptPasswordEncoder passwordEncoder;

    public UserService(BCryptPasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }


    private List<UserDTO> goToDTO(List<User> users){
        ArrayList<UserDTO> usersDTO = new ArrayList<>();
        for(User u: users){
            UserDTO userDto = new UserDTO(u);
            usersDTO.add(userDto);
        }
        return usersDTO;
    }

    public List<UserDTO> getAllUsers(){
        return this.goToDTO(this.userRepository.findAllNonAdminUsers());
    }


    public void userRegister(@Valid User user){

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole("normal");
        userRepository.save(user);
    }

    public Optional<User> getUserByEmail(String email){
        return this.userRepository.findByEmail(email);
    }

    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    public boolean deleteUserByEmail(String email){
        Optional<User> user = this.userRepository.findByEmail(email);

        if(user.isPresent()){
            if(user.get().getRole().equals("admin")) {
                return false;
            }
            this.userRepository.deleteUserByEmail(email);
            return true;
        }
        else
            return false;
    }
}
