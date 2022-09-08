package bachelor.ux_smells_detector.detector.erasing_info_on_error;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ErasingInfoOnErrorRepository extends MongoRepository<ErasingInfoOnErrorEntity, String> {
    ErasingInfoOnErrorEntity findByPageUrl(String url);
}
