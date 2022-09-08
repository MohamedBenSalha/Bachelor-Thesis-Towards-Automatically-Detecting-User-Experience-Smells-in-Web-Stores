package bachelor.ux_smells_detector.detector.missing_bulk_actions;

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
public class MissingBulkActionsService {

    private final VisitDetailsRepository visitDetailsRepository;
    private final MissingBulkActionsRepository missingBulkActionsRepository;

    public void findUnnecessaryBulkActions(final List<VisitDetails> visitDetailsList, final List<String> actions) {
        if (actions != null) {
            final List<VisitDetails> allVisitDetails;
            allVisitDetails = Objects.requireNonNullElseGet(visitDetailsList, this.visitDetailsRepository::findAll);

            for (final String action : actions) {
                // find missing bulk actions for each action
                findSpecificUnnecessaryActions(allVisitDetails, action);
            }
        }

    }

    private void findSpecificUnnecessaryActions(
            List<VisitDetails> allVisitDetails, final String action) {
        if (action != null && !action.isEmpty()) {
            // filter all visits to actions that have performed the same action at least 3 times
            List<VisitDetails> allVisitDetailsMoreThanTwoBulkActions = allVisitDetails.stream()
                    .filter(visitDetails ->
                            visitDetails.getActionDetails().stream().
                                    filter(actionDetails -> actionDetails.getEventCategory() != null && actionDetails.getEventCategory().equals(action)).toList().size() > 2)
                    .toList();


            for (final VisitDetails visitDetails : allVisitDetailsMoreThanTwoBulkActions) {
                final List<ActionDetails> actionDetails = visitDetails.getActionDetails();
                for (int i = 0; i < visitDetails.getActionDetails().size() - 2; i++) {
                    // 3 actions are at least required to detect this smell
                    if (StringUtils.equals(actionDetails.get(i).getEventCategory(), action)
                            && StringUtils.equals(actionDetails.get(i + 1).getEventCategory(), action)
                            && StringUtils.equals(actionDetails.get(i + 2).getEventCategory(), action)) {
                        // check whether this action on its page has been already recognized
                        if (this.missingBulkActionsRepository.findByPageUrlAndAction(actionDetails.get(i).getUrl(),
                                action) == null) {
                            final MissingBulkActionsEntity missingBulkActionsEntity =
                                    MissingBulkActionsEntity.builder()
                                            .action(action)
                                            .pageUrl(actionDetails.get(i).getUrl())
                                            .build();
                            log.info(action + " - Unnecessary bulk actions found");
                            this.missingBulkActionsRepository.save(missingBulkActionsEntity);
                        }
                    }
                }
            }


        }
    }
}