package app.repository;

import app.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {


    @Query("SELECT u FROM User u WHERE u.role <> 'admin'")
    List<User> findAllNonAdminUsers();

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    void deleteUserByEmail(String email);
}
