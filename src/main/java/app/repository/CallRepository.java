package app.repository;

import app.domain.Call;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface CallRepository extends JpaRepository<Call, Long> {

    List<Call> findByFileId(Long fileId);
    @Query(value = "SELECT * FROM call c WHERE (c.source_trunk = :trunk OR c.destination_trunk = :trunk) AND c.callee LIKE ANY (ARRAY[:start])", nativeQuery = true)
    List<Call> findByTrunkAndCalleeStartingWith(@Param("trunk") String trunk, @Param("start") String[] start);
}
