package app.repository;

import app.domain.Call;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CallRepository extends JpaRepository<Call, Long> {

    List<Call> findByFileId(Long fileId);

    List<Call> findBySourceTrunkOrderByDestinationTrunk(String trunk);
}
