package bachelor.ux_smells_detector.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.List;

@Setter
@Getter
@Document
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table
@JsonIgnoreProperties(ignoreUnknown = true)
public class VisitDetails extends AbstractEntity {

    // Matomo Visit ID
    @Column
    private Long idVisit;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ActionDetails> actionDetails;

    @Column
    private String visitorId;

    @Column
    private String visitorType;

    @Column
    private String actions;

    @Column
    private String lastActionDateTime;

    @Column
    private String firstActionTimestamp;

    @Column
    private String languageCode;

    @Column
    private String visitCount;

    @Column
    private String searches;

    @Column
    private String interactions;

    @Column
    private String referrerType;

    @Column
    private String referrerTypeName;

    @Column
    private String referrerName;

    @Column
    private String referrerUrl;

    @Column
    private String deviceType;

    @Column
    private String deviceBrand;

    @Column
    private String deviceModel;

    @Column
    private String operatingSystem;

    @Column
    private String visitDuration;

    @Column
    private String browser;

    @Column
    private String events;

    @Column
    private String country;

    @Column
    private String region;

    @Column
    private String city;

    @Column
    private String location;

    @Column
    private String visitLocalTime;

    @Column
    private String resolution;

}
