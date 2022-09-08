# Smell Events

> By not using an established e-commerce solution in our test store, the use of Matomo Tag Manager was not possible.
Therefore, we collected the necessary data via JavaScript snippet we included in the test shop.

## Default Image

### Attributes that are stored for this smell:

- pageUrl: where the image occurred
- imageUrl: Link from image for recognition with other potential default images

### Matomo Events

> This event was obtained using a JS snippet. The src of img tag and location.referrer 
were extracted and concatenated with a "->" character. 
- Event Type: outlink (default, if saving links)
- Url: "page_url "+"->"+"image_url"

## Erasing Information on Error

> For this smell, two events were always collected, one representing the number of filled fields before the error 
and the other after.

### Attributes that are stored for this smell:

- pageUrl: where the form is located

### Matomo Events 

#### First Event: 

- Type: event
- Event Category: Form
- Event Action: Before
- Event Name: number_filled_fields
- Event Value: x, where x is the number of filled fields


#### Second Event:

- Type: event
- Event Category: Form
- Event Action: After
- Event Name: number_filled_fields
- Event Value: x, where x is the number of filled fields


## Large Page Load Time

> This value is calculated by Matomo by default.

### Attributes that are stored for this smell:

- pageUrl: page that takes long to load

#### Values to compare whether the smell still occurs over time:

- maxPageLoadTime:
- dateMaxLoadTime:
- currentPageLoadTime:
- dateCurrentPageLoadTime:

## Broken Links

> For this smell, two events were always collected, one representing the element leading triggering the 
> broken link and the other one the broken link itself. <br>
> Error Page is recognized as such by JS, by analyzing the DOM for an element that indicates a broken link.

### Attributes that are stored for this smell:

- pageUrl: the page not accessible due to the broken link
- trigger: which elements triggers the broken link
- triggerLocation: on which page is the trigger located

### Matomo Events

#### First Event:

- Type: event
- Event Category: Click
- Event Action: "Element Clicked" (e.g. "Product", "Contact", "Login")
- Event Name: "Product Name" (if Event Action is "Product", else null)

#### Second Event:

- Type: event
- Event Category: Page
- Event Action: Error Page



## Missing Bulk Actions

### Attributes that are stored for this smell:

- pageUrl: where the missing bulk actions occurred
- action: which bulk actions (e.g. "Delete")

### Matomo Events

- Type: event
- Event Category: "action" (e.g. "Delete")
