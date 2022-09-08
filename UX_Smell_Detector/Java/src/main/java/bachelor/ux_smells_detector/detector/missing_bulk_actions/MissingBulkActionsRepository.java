package bachelor.ux_smells_detector.detector.missing_bulk_actions;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MissingBulkActionsRepository extends MongoRepository<MissingBulkActionsEntity, String> {

    MissingBulkActionsEntity findByPageUrlAndAction(String pageUrl, String action);

    List<MissingBulkActionsEntity> findByAction(String action);

}
