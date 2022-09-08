package bachelor.ux_smells_detector.detector.page_load_time;

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
public class PageLoadTimeEntity extends AbstractEntity {


    @Column(length = 5000, nullable = false, unique = true)
    private String pageUrl;

    @Column
    private double maxPageLoadTime;

    @Column
    private String dateMaxLoadTime;

    @Column
    private double currentPageLoadTime;

    @Column
    private String dateCurrentPageLoadTime;
}
