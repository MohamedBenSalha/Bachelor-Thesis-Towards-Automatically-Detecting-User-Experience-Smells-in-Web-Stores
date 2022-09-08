package bachelor.ux_smells_detector.entity;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Column;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Setter
@Getter
@Document
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table
@JsonIgnoreProperties(ignoreUnknown = true)
public class ActionDetails extends AbstractEntity {
    @ManyToOne
    private VisitDetails visitDetails;

    @Column
    private String pageId;

    @Column(length = 5000)
    private String url;

    @Column
    private String eventCategory;

    @Column(length = 5000)
    private String eventAction;

    @Column(length = 5000)
    private String eventName;

    @Column
    private String pageLoadTime;

    @Column
    private String type;

    @Column
    private String timeSpent;

    @Column
    private String timestamp;

    @Column
    private String title;

    @Column
    private String subtitle;

    @Column
    private String serverTimePretty;

    @Column
    private String pageTitle;

    @Column
    private int eventValue;

}
