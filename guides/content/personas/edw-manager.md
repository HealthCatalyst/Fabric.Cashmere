# EDW Manager

###### Last updated Nov 30, 2020

:::

<div class="persona-header">

![Avatar Image](./assets/avatars/avatar30.svg)

<div>

# Edwin Henschen

### Enterprise Data Warehouse Manager

Data architect at a healthcare organization. Highly skilled in SQL, very knowledgeable about ETL processes and philosophies, and have lots of practical experience in data warehousing. EDW work is mostly in development.

</div>

</div>

---

## Goals

-   Load new tables to move data from a source system to the EDW
-   Decide which tables go in which batches
-   Organize batches so people understand what tables are in what batches, what dependencies they have, and what runs when
-   Schedule jobs so they don't overtax the EDW or source systems and complete within a certain time period so other jobs can run downstream
-   Provide second-level support for [Data Engineer](/content/personas/data-engineer) by debugging issues in EDW Console (if possible)

---

## Needs

-   On initial setup, go back and forth between the mapping source and error reports to resolve issues (may take a day or more)
-   Create a limited number of batches
-   Comprehend what batches will run, what's running now, a history of what batches have run and any failures
-   Organize downstream jobs conceptually so they can be sequenced correctly
-   Control the order in which tables in a batch run, taking into consideration disk space, bandwidth, table size, etc.
-   Have everything loaded each day by 7 or 8 a.m. - real-time data is better and the pressure for this is getting stronger
-   Customize jobs (will use SQL Agent jobs as an alternative if EDW Console doesn't allow it)

:::
