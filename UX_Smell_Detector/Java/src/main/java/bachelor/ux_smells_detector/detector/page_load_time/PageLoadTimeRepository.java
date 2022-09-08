package bachelor.ux_smells_detector.detector.page_load_time;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PageLoadTimeRepository extends MongoRepository<PageLoadTimeEntity, String> {

    PageLoadTimeEntity findByPageUrl(String pageUrl);
}

