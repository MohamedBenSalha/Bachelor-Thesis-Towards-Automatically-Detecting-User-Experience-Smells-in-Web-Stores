package bachelor.ux_smells_detector.detector.default_image;

import bachelor.ux_smells_detector.entity.ActionDetails;
import bachelor.ux_smells_detector.entity.VisitDetails;
import bachelor.ux_smells_detector.repository.VisitDetailsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Objects;

@Service
@Slf4j
@RequiredArgsConstructor
public class DefaultImageService {

    private final VisitDetailsRepository visitDetailsRepository;
    private final DefaultImageRepository defaultImageRepository;

    public void findDefaultImages(List<VisitDetails> visitDetails, String imageLinksEvent,
                                  String checkImageAPI) throws IOException, JSONException {
        final List<ActionDetails> allActionDetailsRelatedToDefaultImages;
        final List<VisitDetails> allVisitDetails;
        allVisitDetails = Objects.requireNonNullElseGet(visitDetails, this.visitDetailsRepository::findAll);

        // filter and map all visits to actions that have encountered an image
        allActionDetailsRelatedToDefaultImages = allVisitDetails.stream()
                .map(VisitDetails::getActionDetails).flatMap(List::stream)
                .filter(Objects::nonNull)
                .filter(actionDetails -> StringUtils.equals(actionDetails.getType(), imageLinksEvent)
                        && actionDetails.getUrl().contains("->")).toList();

        for (final ActionDetails actionDetails : allActionDetailsRelatedToDefaultImages) {
            // Url was configured in Matomo as follows: pageUrl -> imageUrl
            String[] parts = actionDetails.getUrl().split("->");
            final String pageUrl = parts[0];
            final String imageURl = parts[1];
            // If the page and image have not yet been recognised, scan images
            if (this.defaultImageRepository.findByPageUrlAndImageUrl(pageUrl, imageURl) == null) {
                // If only the link from the image has not yet been recognised, examine the image.
                if (this.defaultImageRepository.findByImageUrl(imageURl).isEmpty()) {
                    // Send a HTTP request to Flask Server to check the image for default using ML classification.
                    CloseableHttpClient httpclient = HttpClients.createDefault();
                    HttpPost httppost = new HttpPost(checkImageAPI);
                    JSONObject paramsJson = new JSONObject();
                    paramsJson.put("image_link", imageURl);
                    StringEntity entity = new StringEntity(paramsJson.toString());
                    httppost.setEntity(entity);
                    httppost.setHeader("Accept", "application/json");
                    httppost.setHeader("Content-type", "application/json");
                    // Execute and get the response.
                    CloseableHttpResponse response = httpclient.execute(httppost);
                    HttpEntity responseBodyEntity = response.getEntity();
                    if (responseBodyEntity != null
                            && Boolean.parseBoolean(EntityUtils.toString(responseBodyEntity, "UTF-8"))) {
                        final DefaultImageEntity defaultImageEntity =
                                DefaultImageEntity.builder().pageUrl(pageUrl).imageUrl(imageURl).build();
                        this.defaultImageRepository.save(defaultImageEntity);
                        log.info("A default image has been recognized");

                    }
                    /* If the image was recognised on another page, do not analyse the image, but save it directly
                     * with the new page (for performance and optimization purposes).
                     */
                } else {

                    final DefaultImageEntity defaultImageEntity =
                            DefaultImageEntity.builder().pageUrl(pageUrl).imageUrl(imageURl).build();
                    this.defaultImageRepository.save(defaultImageEntity);
                    log.info("A default image has been recognized");
                }
            }
        }
    }
}
