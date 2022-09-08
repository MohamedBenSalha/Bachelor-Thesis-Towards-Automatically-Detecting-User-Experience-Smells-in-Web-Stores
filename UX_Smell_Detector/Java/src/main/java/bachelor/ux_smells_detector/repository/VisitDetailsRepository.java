package bachelor.ux_smells_detector.repository;

import bachelor.ux_smells_detector.entity.VisitDetails;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VisitDetailsRepository extends MongoRepository<VisitDetails, String> {

    VisitDetails findTopByOrderByIdVisitDesc();

    VisitDetails findByIdVisit(Long idVisit);

    List<VisitDetails> findAllByIdVisitGreaterThanEqual(long idVisit);

    List<VisitDetails> findAllByIdVisitLessThanEqual(long idVisit);
}
