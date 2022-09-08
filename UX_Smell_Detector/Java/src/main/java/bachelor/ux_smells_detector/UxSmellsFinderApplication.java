package bachelor.ux_smells_detector;

import bachelor.ux_smells_detector.collector.VisitDetailsService;
import bachelor.ux_smells_detector.configuration.UXSmellsParameter;
import bachelor.ux_smells_detector.entity.VisitDetails;
import bachelor.ux_smells_detector.detector.broken_link.BrokenLinkService;
import bachelor.ux_smells_detector.detector.default_image.DefaultImageService;
import bachelor.ux_smells_detector.detector.erasing_info_on_error.ErasingInfoOnErrorService;
import bachelor.ux_smells_detector.detector.missing_bulk_actions.MissingBulkActionsService;
import bachelor.ux_smells_detector.detector.page_load_time.PageLoadTimeService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.context.event.EventListener;
import org.springframework.data.mongodb.config.EnableMongoAuditing;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.scheduling.annotation.EnableScheduling;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@SpringBootApplication
@EnableScheduling
@Slf4j
@AllArgsConstructor
@EnableMongoAuditing
@ConfigurationPropertiesScan
@EnableMongoRepositories
public class UxSmellsFinderApplication {

    private final VisitDetailsService visitDetailsService;
    private final BrokenLinkService brokenLinkService;
    private final DefaultImageService defaultImageService;
    private final PageLoadTimeService pageLoadTimeService;
    private final MissingBulkActionsService missingBulkActionsService;
    private final ErasingInfoOnErrorService erasingInfoOnErrorService;
    private final UXSmellsParameter uxSmellsParameter;


    public static void main(String[] args) {
        SpringApplication.run(UxSmellsFinderApplication.class, args);
    }

    @EventListener(ApplicationReadyEvent.class)
    public void init() throws IOException, InterruptedException, JSONException {
        log.info("Visit data are being synchronized...");
        List<VisitDetails> newSyncedVisitDetails = this.visitDetailsService.syncDataFromMatomo(uxSmellsParameter.matomoTokenAuth(), uxSmellsParameter.matomoHostName(), uxSmellsParameter.matomoSiteId());
        log.info("Broken page are being analyzed...");
        this.brokenLinkService.findBrokenLinks(newSyncedVisitDetails,
                uxSmellsParameter.errorPageIdentifier
                        (), uxSmellsParameter.clickEvent());
        log.info("Large load page time durations are being analyzed...");
        this.pageLoadTimeService.findLargePageLoadTimes(newSyncedVisitDetails, uxSmellsParameter.standardLoadingSpeed());
        log.info("Missing bulk actions are being analyzed...");
        this.missingBulkActionsService.findUnnecessaryBulkActions(newSyncedVisitDetails,
                Arrays.asList(uxSmellsParameter.add(), uxSmellsParameter.delete()));
        log.info("Forms: on error erasing are being analyzed...");
        this.erasingInfoOnErrorService.findErasingInfoOnErrorForms(newSyncedVisitDetails,
                uxSmellsParameter.formEventCategory());
        log.info("Default images are being analyzed...");
        this.defaultImageService.findDefaultImages(newSyncedVisitDetails, uxSmellsParameter.imageLinksEvent(),
                uxSmellsParameter.checkImageAPI());


    }

}
