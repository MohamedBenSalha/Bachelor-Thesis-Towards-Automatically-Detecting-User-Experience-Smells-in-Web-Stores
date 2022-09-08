package bachelor.ux_smells_detector.detector.broken_link;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BrokenLinkRepository extends MongoRepository<BrokenLinkEntity, String> {
    BrokenLinkEntity findByPageUrl(String url);

    BrokenLinkEntity findByPageUrlOrTrigger(String pageUrl, String trigger);

    BrokenLinkEntity findByTrigger(String trigger);
}
