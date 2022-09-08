# Literature review methodology

## Methodology

The following figure demonstrates the literature review approach:

![literature](assets/literature_research.jpg)

At the beginning, different search engines were selected. The keywords for the search combinations are selected on the basis of the terms in the working title.

**Search Engines:**

- Google
- Google Scholar
- Google Books
- Crossref
- IEEE
- SpringerLink
- DBLP

**Search Keywords:**

- Bucket 1:
  - (Automatic) Detection
  - (Automatic) Recognition
  - Evaluation

- Bucket 2:
  - User Experience
  - Usability

- Bucket 3:
  - Smells
  - Fails
  - Anti-patterns
  - Mistakes

- Bucket 4:
  - Web Stores
  - E-Commerce
  - Online Shops

The buckets each consist of aliases from the same concept.
The keywords from buckets 2 and 3 were combined to find smells.
These were in turn supplemented with the words from bucket 4 when searching specifically for smells in web stores.
In order to look for existing methods to automatically detect UX smells, the keywords from all buckets were combined in their order.
The keywords from bucket 4 were not always included because the detection of UX smells in all types of websites and not only web stores was relevant for the work.

The first entries are analyzed by reading the title, the abstract and the conclusion as well as the table of contents to check for relevance.
Specifically, this means that the table of contents was searched for a listing of smells.
The aim was to enhance our catalog with further relevant smells and to make it as overarching as possible.
Also, the table of contents was searched for methods for automatic detections.
By doing so, already existing approaches to the respective smells could be considered as a guideline for our tool.
If at least one of the aforementioned sections was missing, the paper was roughly skimmed to find possible relevance in terms of values or facts.

Furthermore, the snowball sampling method was appli

## Papers

> Relevant papers while doing the research.

| Paper                                | Description                                                                                                                                        | Particularities                                                                         |
|------------------------------------- |--------------------------------------------------------------------------------------------------------------------------------------------------- |---------------------------------------------------------------------------------------- |
| Sniffing out User Experience Smells  | Contains 10 UX smells and their fixes. The smells are presented in real life examples and therefore difficult to imagine in the context of UI/UX.  | Has not even been referenced so far and is **not a scientific text** in terms of structure :warning: |
| Data-Driven Usability Refactoring: Tools and Challenges |  | Can be used as a reference to support the hypothesis (SMEs don't have the resources to care enough about UX) :white_check_mark: |
| Automatic detection of usability smells in web applications |  Contains 16 *Usability* smells with refactoring approaches. |-  Can be used as a reference to support the hypothesis  :white_check_mark: <br> - The smells are occupied with examples from the UI/UX area. <br> - Refactoring approaches to each smell are given. - Related Work part is very important to see other approaches. <br> - Definition of Bad Usability Smells <br> - Contains Behavioral Pattern for each defined Bad Usability Smell(may be needed for the techniques to implement)|
| Patterns for Improving Mobile User Experience |  | Although UX for mobile devices is referenced here, there are a few patterns and anti-patterns that can be relevant |
| Customizable Automatic Detection of Bad Usability Smells in  Mobile Accessed Web Applications | Contains a description of a method for the automatic detection of usability smells. In addition, a few usability smells for mobile phone devices were given. |  |
| GUI Bloopers 2.0: Common User Interface Design Don'ts and Dos | Contains Principles and ***Bloopers*** (GUI, Navigation, Textual, Interaction, Responsiveness, Management) | - available as [ebook](https://books.google.de/books?hl=en&lr=&id=cIY0JOAkLoYC&oi=fnd&pg=PP1&dq=J.+Johnson.+GUI+Bloopers+2.0.+Morgan+Kaufmann,+2007&ots=uZxlTh0SoI&sig=BPeUfWpMPjTiiTtKRV0AH5JhZp0#v=onepage&q=J.%20Johnson.%20GUI%20Bloopers%202.0.%20Morgan%20Kaufmann%2C%202007&f=false), but not complete. <br>    |
|White Hat UX: The Next Generation in User Experience| Includes three categories depending on the influence: Black, Grey and White anti-patterns. Most of the anti-patterns are explained with a text and an example picture and for those there are solutions on how to prevent them. | Also includes motivation for my work (see comments in the PDF). |
| Usage-Based Automatic Detection of Usability Smells | Includes 4 usability smells with examples and with description for detection | Detection techniques are described with mathematic formula |

Furthermore, the **snowball sampling** method was applied to the relevant papers.
