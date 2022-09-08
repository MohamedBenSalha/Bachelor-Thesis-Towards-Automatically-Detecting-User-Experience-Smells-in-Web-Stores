package bachelor.ux_smells_detector.collector;

import bachelor.ux_smells_detector.entity.VisitDetails;
import bachelor.ux_smells_detector.repository.VisitDetailsRepository;
import bachelor.ux_smells_detector.utils.EncodeUtils;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.CollectionType;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.exception.ExceptionUtils;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Slf4j
@Transactional
@AllArgsConstructor
public class VisitDetailsService {

    public static final long BUCKET_SIZE = 5L;
    // 45015L is the first ID as starting to track the test shop. IDs <= 45015 belong to other websites.
    public static final long FIRST_ID_VISIT_TEST_SHOP = 45015L;
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final CollectionType javaType = objectMapper.getTypeFactory().constructCollectionType(List.class,
            VisitDetails.class);
    private final VisitDetailsRepository visitDetailsRepository;

    /**
     * Visitor details recorded by Matomo are retrieved. The lower limit is set by the variable visitId and the
     * number of visitors is set by filterLimit
     *
     * @param visitId     the value starting from which the data will be retrieved
     * @param filterLimit amount of data to retrieve
     * @return List with filterLimit VisitsDetails
     * @throws IOException          if an error occurs when reading the parameters of the request
     * @throws InterruptedException if the request is interrupted
     */
    public List<VisitDetails> getVisitDetailsFromMatomo(Long visitId, Long filterLimit, String keyAuth, String hostName, String idSite) throws IOException,
            InterruptedException {
        Map<String, String> requestParameters = new HashMap<>();
        requestParameters.put("token_auth", keyAuth);
        requestParameters.put("idSite", idSite);
        requestParameters.put("module", "API");
        requestParameters.put("method", "Live.getLastVisitsDetails");
        requestParameters.put("format", "json");
        requestParameters.put("filter_sort_column", "idVisit");
        if (visitId >= 0) {
            requestParameters.put("segment", "visitId>=" + visitId);
            requestParameters.put("filter_Limit", filterLimit.toString());
            requestParameters.put("filter_sort_order", "asc");
        } else {
            requestParameters.put("filter_Limit", "1");
            requestParameters.put("filter_sort_order", "desc");
        }
        String encodedURL = requestParameters.keySet().stream().map(key -> {
            try {
                return key + "=" + EncodeUtils.encodeValue(requestParameters.get(key));
            } catch (UnsupportedEncodingException e) {
                log.error(ExceptionUtils.getMessage(e), e);
            }
            return requestParameters.get(key);
        }).collect(Collectors.joining("&", hostName, ""));

        final HttpResponse<String> response =
                HttpClient.newHttpClient().send(HttpRequest.newBuilder().uri(URI.create(encodedURL)).GET().build(),
                        HttpResponse.BodyHandlers.ofString());

        return objectMapper.readValue(response.body(), javaType);
    }


    public List<VisitDetails> syncDataFromMatomo(String keyAuth, String hostName, String idSite) throws IOException, InterruptedException {
        final VisitDetails lastVisitDetailsInDB = this.visitDetailsRepository.findTopByOrderByIdVisitDesc();
        Long dbLastVisitDetailsId = lastVisitDetailsInDB == null ? FIRST_ID_VISIT_TEST_SHOP :
                lastVisitDetailsInDB.getIdVisit();
        final Long matomoLastIdVisit = Collections.max(
                this.getVisitDetailsFromMatomo(-1L, BUCKET_SIZE, keyAuth, hostName, idSite).stream().map(VisitDetails::getIdVisit).toList());
        List<VisitDetails> allNewSyncedVisitDetails = new ArrayList<>();
        while ((matomoLastIdVisit - dbLastVisitDetailsId) > 0) {
            log.info("API Call");
            final List<VisitDetails> visitDetails = this.getVisitDetailsFromMatomo(dbLastVisitDetailsId, BUCKET_SIZE,
                    keyAuth, hostName, idSite);
            log.info("Segment > " + dbLastVisitDetailsId);
            allNewSyncedVisitDetails.addAll(visitDetails);
            visitDetails.sort(Comparator.comparing(VisitDetails::getIdVisit));
            for (VisitDetails visitDetailsToSave : visitDetails) {
                if (this.visitDetailsRepository.findByIdVisit(visitDetailsToSave.getIdVisit()) == null) {
                    log.info("save visit details with ID " + visitDetailsToSave.getIdVisit());
                    this.visitDetailsRepository.save(visitDetailsToSave);
                }
                dbLastVisitDetailsId = visitDetailsToSave.getIdVisit();
            }
        }
        return allNewSyncedVisitDetails;
    }
}
