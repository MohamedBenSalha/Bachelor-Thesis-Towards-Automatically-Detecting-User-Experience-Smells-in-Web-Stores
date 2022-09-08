package bachelor.ux_smells_detector.configuration;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.ConstructorBinding;

@ConstructorBinding
@ConfigurationProperties(prefix = "finder")
public record UXSmellsParameter(
        float standardLoadingSpeed,
        String add,
        String delete,
        String checkImageAPI,
        String imageLinksEvent,
        String formEventCategory,
        String errorPageIdentifier,
        String matomoTokenAuth,
        String clickEvent,
        String matomoHostName,
        String matomoSiteId
) {


}
