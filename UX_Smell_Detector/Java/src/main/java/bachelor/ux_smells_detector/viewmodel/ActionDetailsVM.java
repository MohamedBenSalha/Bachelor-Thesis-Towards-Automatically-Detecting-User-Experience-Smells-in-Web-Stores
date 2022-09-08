package bachelor.ux_smells_detector.viewmodel;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record ActionDetailsVM(

        String pageId,
        String pageTitle,
        String pageIdAction,
        String idPageView,
        String pageLoadTimeMilliseconds,
        String title,
        String subtitle,
        String url,
        String eventCategory,
        String eventAction,
        String eventName,
        String pageLoadTime,
        String type,
        String timeSpent,
        String timestamp) {

}
