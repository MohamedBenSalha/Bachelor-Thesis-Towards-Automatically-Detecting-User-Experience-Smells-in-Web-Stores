# Benchmark for the evaluation of UXSD

## Benchmark Setup

The smell instances listed in the following table have been incorporated into the test store for ten days from 27, July to 05, August 2022.  
An appeal was launched via LinkedIn, university platforms, fellow students and acquaintances to interact with the test store.

| **UX Smell**          | **Triggers**                                                                                                                 | **Further Details**                                                                                                                                                                                                                |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Missing Product Images       | 23 (out of 45) product tiles leading to product details pages                                                                         | These are the products whose titles do not contain the following terms: \{iPhone, Lenovo, Fernseher, MacBook, Wasserkocher\}                                                                                                                |
| Erasing Information on Error | Errors after form submission                                                                                                          | - Contact page <br>- Registration page  <br>- Delivery information page                                                                                                                                                           |
| Broken Links                 | Click elements leading to error pages                                                                                                 | - Tile of the product: *Apple iPhone 12 (Schwarz, 128 GB)* <br>- Tile of the product: *PUMA Herren Pullover* <br> - Navigation element: *Reset Password*  <br>- Navigation element: *Datenschutz* |
| Missing Bulk Actions         | Clicking the same element several times in a row                                                                                      | -  *Add To Cart* button in 45 product details pages <br>- *Delete* button in the cart page                                                                                                                              |
| Large Page Load Times        | - 9 pages with a lot of assets (e.g. images) <br>- Simulate various connection speeds to increase or decrease the page load time | Product or category pages, as they have a high number of images                                                                                                                                                                             |


## Benchmark Results

For the benchmark, we had 114 visits from Germany distributed as follows: 94 from Baden-Württemberg, 10 from Schleswig-Holstein, 4 from Hamburg, 4 from Sachsen-Anhalt and 2 from Hessen.
These visitors performed a total of 728 actions in the test store. These actions are divided into two categories.

| **UX Smell**          | **Precision**        | **Recall**                                | **F1-Score**       |
|------------------------------|-------------------------------|----------------------------------------------------|-----------------------------|
| Missing Product Images       | $\tfrac{14}{16} \approx 0.88$ | $\tfrac{14}{23} \approx 0.61$                      | $0.72$  |
| Erasing Information on Error | $\tfrac{2}{2} = 1.0$          | $\tfrac{2}{3} \approx 0.67$                        | $0.80$  |
| Broken Links                 | $\tfrac{3}{3} = 1.0$          | $\tfrac{3}{4} = 0.75$        | $0.85$                        |
| Missing Bulk Actions         | $\tfrac{4}{4} = 1.0$          | $\tfrac{4}{46} \approx 0.09$ | $0.16$                        |
| Large Page Load Times        | $\tfrac{5}{7} \approx 0.72$  | $\tfrac{5}{5} = 1.0$         | $0.83$     |                   |
