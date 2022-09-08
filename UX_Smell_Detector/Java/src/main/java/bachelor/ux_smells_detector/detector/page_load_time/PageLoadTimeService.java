package bachelor.ux_smells_detector.detector.page_load_time;

import bachelor.ux_smells_detector.entity.ActionDetails;
import bachelor.ux_smells_detector.entity.VisitDetails;
import bachelor.ux_smells_detector.repository.VisitDetailsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;

@Service
@Slf4j
@RequiredArgsConstructor
public class PageLoadTimeService {

    private final VisitDetailsRepository visitDetailsRepository;
    private final PageLoadTimeRepository pageLoadTimeRepository;

    public void findLargePageLoadTimes(List<VisitDetails> visitDetails, float standardPageLoadTime) {
        final List<ActionDetails> allActionsRelatedToPageLoadTime;
        final List<VisitDetails> allVisitDetails;
        final List<ActionDetails> allActionDetails;
        allVisitDetails = Objects.requireNonNullElseGet(visitDetails,
                this.visitDetailsRepository::findAll);
        allVisitDetails.sort(Comparator.comparing(VisitDetails::getIdVisit));
        allActionDetails = allVisitDetails.stream().map(VisitDetails::getActionDetails).flatMap(List::stream).toList();
        // filter and map all visits to action details that have a page load time value
        allActionsRelatedToPageLoadTime = allVisitDetails.stream()
                .map(VisitDetails::getActionDetails).flatMap(List::stream)
                .filter(Objects::nonNull)
                .filter(actionDetails -> actionDetails.getPageLoadTime() != null).toList();

        // get all distinct pages have been visited
        final List<String> allPages =
                allActionsRelatedToPageLoadTime.stream().map(ActionDetails::getUrl).distinct().toList();

        for (final String page : allPages) {
            /* filter all action details have been performed on the "page" having a page load time higher than the
             *  standard one
             */
            final List<ActionDetails> relevantActionDetailsOnSamePage = allActionsRelatedToPageLoadTime.stream()
                    .filter(actionDetails -> actionDetails.getUrl().equals(page) && mapTimeStringToTimeSeconds(actionDetails.getPageLoadTime()) > standardPageLoadTime).toList();
            final List<Double> largePageLoadTimesOfPage = relevantActionDetailsOnSamePage.stream()
                    //      map "2.41s" to 2.41
                    .map(actionDetails -> mapTimeStringToTimeSeconds(actionDetails.getPageLoadTime()))
                    .filter(duration -> duration > standardPageLoadTime)
                    .toList();

            if (!largePageLoadTimesOfPage.isEmpty()) {
                double pageLoadTimeDuration = Collections.max(largePageLoadTimesOfPage);
                int indexOfMax = largePageLoadTimesOfPage.indexOf(pageLoadTimeDuration);

                final PageLoadTimeEntity existingPageLoadTimeEntity = this.pageLoadTimeRepository.findByPageUrl(page);
                ActionDetails mostCurrentActionDetailsToUrl = getMostCurrentActionDetailsToUrl(allActionDetails, page);

                if (existingPageLoadTimeEntity == null) {
                    if (mostCurrentActionDetailsToUrl != null) {

                        final PageLoadTimeEntity pageLoadTimeEntity =
                                PageLoadTimeEntity.builder()
                                        .pageUrl(page)
                                        .maxPageLoadTime(pageLoadTimeDuration)
                                        .dateMaxLoadTime(relevantActionDetailsOnSamePage.get(indexOfMax).getServerTimePretty())
                                        .currentPageLoadTime(mapTimeStringToTimeSeconds(mostCurrentActionDetailsToUrl.getPageLoadTime()))
                                        .dateCurrentPageLoadTime(mostCurrentActionDetailsToUrl.getServerTimePretty())
                                        .build();
                        this.pageLoadTimeRepository.save(pageLoadTimeEntity);
                        log.info("A large loading page has been recognized");

                    }
                } else {
                    /*
                     * Add the latest values to a page that previously had a high page load time to check whether the
                     * page load time has changed.
                     */
                    if (mostCurrentActionDetailsToUrl != null) {
                        if (pageLoadTimeDuration > existingPageLoadTimeEntity.getMaxPageLoadTime()) {
                            existingPageLoadTimeEntity.setMaxPageLoadTime(pageLoadTimeDuration);
                        }
                        existingPageLoadTimeEntity.setCurrentPageLoadTime(mapTimeStringToTimeSeconds(mostCurrentActionDetailsToUrl.getPageLoadTime()));
                        existingPageLoadTimeEntity.setDateCurrentPageLoadTime(mostCurrentActionDetailsToUrl.getServerTimePretty());
                        this.pageLoadTimeRepository.save(existingPageLoadTimeEntity);
                    }
                }
            }
        }
    }


    private ActionDetails getMostCurrentActionDetailsToUrl(List<ActionDetails> actionDetails, String url) {
        if (actionDetails != null && !url.isEmpty()) {
            // Backwards to get the latest one
            for (int i = actionDetails.size() - 1; i >= 0; i--) {
                ActionDetails currentActionDetails = actionDetails.get(i);
                if (StringUtils.equals(currentActionDetails.getUrl(), url) && currentActionDetails.getPageLoadTime() != null) {
                    return currentActionDetails;
                }
            }
        }
        // this never happens, because at least one actionDetails exists with the given url
        return null;

    }

    private double mapTimeStringToTimeSeconds(String timeInSecondsString) {
        // page load time from matomo looks like "2.41s" -> map to 2.41 for comparison purposes
        return Double.parseDouble(timeInSecondsString.substring(0,
                timeInSecondsString.length() - 1));
    }
}
