package app.repository;

import app.domain.File;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FileRepository extends JpaRepository<File, Long> {

    boolean existsByName(String name);

    Optional<File> findFileByName(String name);

}
