package bachelor.ux_smells_detector.viewmodel;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;


@JsonIgnoreProperties(ignoreUnknown = true)
public record VisitDetailsVM(

        String idSite,
        Long idVisit,
        List<ActionDetailsVM> actionDetails,
        String visitIp,
        String visitorId,
        String siteName,
        String visitorType,
        String actions,
        String lastActionDateTime,
        String firstActionTimestamp,
        String languageCode,
        String visitCount,
        String searches,
        String interactions,
        String referrerType,
        String referrerTypeName,
        String referrerName,
        String referrerUrl,
        String deviceType,
        String deviceBrand,
        String deviceModel,
        String operatingSystem,
        String visitDuration,
        String browser,
        String browserName,
        String browserVersion,
        String events,
        String country,
        String region,
        String city,
        String location,
        String latitude,
        String longitude,
        String visitLocalTime,
        String resolution

) {
}
