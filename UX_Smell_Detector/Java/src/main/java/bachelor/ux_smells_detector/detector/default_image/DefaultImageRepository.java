package bachelor.ux_smells_detector.detector.default_image;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DefaultImageRepository extends MongoRepository<DefaultImageEntity, String> {

    DefaultImageEntity findByPageUrl(String pageUrl);

    List<DefaultImageEntity> findByImageUrl(String imageUrl);

    DefaultImageEntity findByPageUrlAndImageUrl(String pageUrl, String imageUrl);


}
