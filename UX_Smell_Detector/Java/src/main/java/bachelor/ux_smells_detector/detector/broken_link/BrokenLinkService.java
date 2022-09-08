package bachelor.ux_smells_detector.detector.broken_link;

import bachelor.ux_smells_detector.entity.ActionDetails;
import bachelor.ux_smells_detector.entity.VisitDetails;
import bachelor.ux_smells_detector.repository.VisitDetailsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@Slf4j
@RequiredArgsConstructor
public class BrokenLinkService {

    private final VisitDetailsRepository visitDetailsRepository;
    private final BrokenLinkRepository brokenLinkRepository;


    public void findBrokenLinks(List<VisitDetails> givenVisitDetails, String brokenLinksIdentifier,
                                String triggerIdentifier) {
        final List<VisitDetails> allVisitedDetailsContaining404Page;
        final List<VisitDetails> allVisitDetails;
        allVisitDetails = Objects.requireNonNullElseGet(givenVisitDetails, this.visitDetailsRepository::findAll);

        // filter all visits that have encountered a broken link
        allVisitedDetailsContaining404Page =
                allVisitDetails.stream().filter(visitDetails -> !visitDetails.getActionDetails().stream()
                        .filter(actionDetails -> StringUtils.equals(actionDetails.getEventAction(),
                                brokenLinksIdentifier)).toList().isEmpty()).toList();
        for (final VisitDetails visitDetails : allVisitedDetailsContaining404Page) {
            // filter all actions details that represent the broken link or the trigger
            List<ActionDetails> processedActionDetails =
                    visitDetails.getActionDetails().stream()
                            .filter(actionDetails -> StringUtils.equals(brokenLinksIdentifier,
                                    actionDetails.getEventAction()) || StringUtils.equals(actionDetails.getEventCategory(),
                                    triggerIdentifier))
                            .toList();

            /*
             * Backwards, because the trigger comes before the broken link in the sequence. Therefore,
             * first find the broken link and then start the search for the trigger.
             */
            for (int i = processedActionDetails.size() - 1; i >= 0; i--) {
                ActionDetails currentActionDetails = processedActionDetails.get(i);
                if (StringUtils.equals(brokenLinksIdentifier, currentActionDetails.getEventAction())) {
                    // If there is a broken link, search the previous action details for the trigger.
                    int index = i - 1;

                    boolean found = false;
                    while (!found && index >= 0) {
                        ActionDetails potentialTriggerActionDetails = processedActionDetails.get(index);

                        if (StringUtils.equals(triggerIdentifier,
                                processedActionDetails.get(index).getEventCategory())) {
                            String trigger =
                                    potentialTriggerActionDetails.getEventAction() + (potentialTriggerActionDetails.getEventName() != null ? " " + potentialTriggerActionDetails.getEventName() : "");
                            found = true;
                            // If the trigger and broken link have not yet been recognised, save them.
                            if (this.brokenLinkRepository
                                    .findByPageUrlOrTrigger(currentActionDetails
                                                    .getUrl(),
                                            trigger) == null) {

                                final BrokenLinkEntity brokenLink =
                                        BrokenLinkEntity
                                                .builder()
                                                .pageUrl(currentActionDetails.getUrl())
                                                .trigger(trigger)
                                                .triggerLocation(potentialTriggerActionDetails.getUrl())
                                                .build();
                                this.brokenLinkRepository.save(brokenLink);
                                log.info("A broken link page has been recognized");
                            }
                        }
                        index--;
                    }


                }

            }
        }

    }


}



