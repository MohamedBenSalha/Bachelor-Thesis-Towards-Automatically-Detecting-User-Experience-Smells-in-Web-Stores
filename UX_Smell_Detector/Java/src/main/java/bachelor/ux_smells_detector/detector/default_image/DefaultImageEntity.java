package bachelor.ux_smells_detector.detector.default_image;

import bachelor.ux_smells_detector.entity.AbstractEntity;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Column;
import javax.persistence.Table;

@Setter
@Getter
@Document
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table
@JsonIgnoreProperties(ignoreUnknown = true)
public class DefaultImageEntity extends AbstractEntity {

    @Column(length = 5000, nullable = false, unique = true)
    private String pageUrl;

    @Column(length = 5000)
    private String imageUrl;
}
