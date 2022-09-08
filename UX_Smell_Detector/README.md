# UXSD Guide

> UXSD is a tool for automatic detection of UX smells in web stores.

## Prerequisites

| Language / Framework | Version  |
| -------------------- | -------- |
| Java                 | 18.0.2.1 |
| Python               | 3.9.6    |
| Maven                | 3.8.1    |
| MongoDB              | 5.0.8    |

## Quick Start

- Integrate Matomo in your web store by adding the tracking code (JavaScript Snippet) to all headers or footers of your website. <br> More details can be found in [Matomo documentation](https://matomo.org/guides/)
  - If you want to use the test store:  add the required data in ``app.module.ts`` (trackerUrl, siteId, scriptUrl).
- Create the custom events necessary for the detection using the [Tag Manager](https://matomo.org/guide/tag-manager/getting-started-with-tag-manager/).<br>
  A list of UX smells and their associated custom events can be found in [smells_events.md](Java/smells_event.md)
- Create `token_auth` in Matomo to retrieve the user data via API.
- Change the `token_auth` in the `application.properties`.
- DO NOT MODIFY EVERYTHING ELSE IN THE `application.properties`. This is necessary for the recognition of the custom events defined in the last step.
- Start the FLASK API by navigating into its folder **Python**:
  - Install all libraries by executing `pip install -r requirements.txt`
  - Run the project by executing `flask run`.
- Start the Spring Boot API by navigating into its folder **Java**:
  - Install all dependencies by executing `mvn clean install`.
  - Run the project by executing `mvn spring-boot:run`.
- If user data have been recorded and UX smells have been triggered, the found UX smells are stored in the database with the corresponding details.
