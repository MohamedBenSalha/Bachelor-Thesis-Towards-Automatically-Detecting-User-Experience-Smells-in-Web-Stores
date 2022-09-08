package bachelor.ux_smells_detector.detector.erasing_info_on_error;

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
public class ErasingInfoOnErrorService {

    private final VisitDetailsRepository visitDetailsRepository;
    private final ErasingInfoOnErrorRepository erasingInfoOnErrorRepository;
    private final String afterSubmission = "After";
    private final String beforeSubmission = "Before";


    public void findErasingInfoOnErrorForms(List<VisitDetails> givenVisitDetails, String formEventCategory) {
        final List<VisitDetails> allVisitDetailsRelatedToForms;
        final List<VisitDetails> allVisitDetails;
        allVisitDetails = Objects.requireNonNullElseGet(givenVisitDetails, this.visitDetailsRepository::findAll);

        // filter all visits to actions that have used a form
        allVisitDetailsRelatedToForms = allVisitDetails.stream()
                .filter(visitDetails ->
                        !visitDetails.getActionDetails().stream().filter(actionDetails ->
                                StringUtils.equals(actionDetails.getEventCategory(),
                                        formEventCategory)).toList().isEmpty())
                .toList();


        for (final VisitDetails visitDetails : allVisitDetailsRelatedToForms) {
            // action details having the number of filled forms before submitting
            ActionDetails beforeActionDetails = null;
            // action details having the number of filled forms after submitting (error)
            ActionDetails afterActionDetails = null;
            for (final ActionDetails actionDetails : visitDetails.getActionDetails()) {
                if (StringUtils.equals(actionDetails.getType(), "event")) {
                    // check that filled fields have been deleted after an error occurred
                    if (afterActionDetails != null && beforeActionDetails != null
                            && afterActionDetails.getEventValue() == 0 && beforeActionDetails.getEventValue() != 0) {
                        // check whether this form has been recognized as such (erasing info on error)
                        if (this.erasingInfoOnErrorRepository.findByPageUrl(actionDetails.getUrl()) == null) {
                            final ErasingInfoOnErrorEntity erasingInfoOnErrorEntity =
                                    ErasingInfoOnErrorEntity.builder().pageUrl(actionDetails.getUrl()).build();
                            this.erasingInfoOnErrorRepository.save(erasingInfoOnErrorEntity);
                            log.info("An erasing form on error has been recognized");
                        }
                        beforeActionDetails = null;
                        afterActionDetails = null;
                    }
                    // find before action details, where the number of filled fields in the form is saved
                    if (StringUtils.equals(actionDetails.getEventAction(), beforeSubmission)) {
                        if (beforeActionDetails == null) {
                            beforeActionDetails = actionDetails;
                        }
                        // find after action details, where the number of filled fields in the form is saved
                    } else if (StringUtils.equals(actionDetails.getEventAction(),
                            afterSubmission)) {
                        if (afterActionDetails == null) {
                            afterActionDetails = actionDetails;
                        }

                    }
                }

            }
        }


    }
}



