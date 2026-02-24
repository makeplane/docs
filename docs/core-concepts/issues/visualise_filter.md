---
title: Filter work items
description: Learn how to filter work items in Plane.
---

# Filter work items

Filters help you find exactly the work items you need by applying conditions across multiple fields. Whether you're looking for overdue tasks assigned to your team or tracking items in specific states, filters give you the control to slice through your work items with precision.

With rich filters, you can now choose from different operators for each field type, giving you even more control over how you filter your work items.

![Filter work items](https://media.docs.plane.so/issues/filter-work-items.webp#hero)

## How to use filters

Filters live in their own dedicated row below the main toolbar, making them always accessible while you work with your work items.

### Basic filtering

To start filtering your work items:

1. Click the Filters icon button to open a dropdown with all the fields.
2. Select any field (State, Priority, Assignee, etc.) to add a filter condition.
3. Choose your operator from the dropdown (like "is", "is not", "after", etc.).
4. Select one or more values you want to filter the field by.
5. Your work items update instantly to match your criteria.

### Build complex filters

You can combine multiple filters to create powerful queries:

**Find urgent items for your team:**

- Set **Priority** → **is** → `High`
- Add **Assignee** → **in** → [Select team members]
- Add **State** → **is not** → `Done`

**Track overdue work:**

- Set **Target date** → **before** → [Select date]
- Add **State group** → **is not** → `Completed`

**Review items without assignments:**

- Set **Assignee** → is → [Leave empty]
- Add State → in → [Backlog, To Do]

### Work with date filters

Date filters are particularly powerful for project management:

**This week's deliverables:**

- Set **Target date** → **between** → [[Select date range]

**Items starting soon:**

- Set **Start Date** → **after or on** → [Select date]
- Add **Start Date** → **before or on** → [Select date]

**Overdue items:**

- Set **Target date** → **before** → [Select date]
- Add **State group** → **is not** → [Completed]

## Manage your filters

- **Clear specific filters:**  
  Click the **X** next to any filter condition to remove just that filter.

- **Clear all filters:**  
  Use the **Clear all** button to start fresh.

- **Save your view:**  
  Once you've built the perfect filter combination, use **Save view** to preserve your configuration as a custom view for easy access in the future. Views allow you to quickly switch between different perspectives, such as a high-priority tasks dashboard or a specific team’s workload. See [Views](/core-concepts/views) for more details.

## Filter operators reference

Each field supports different operators to give you precise control over your filtering.

::: info Operator availability
**Free plan**  
You get essential filtering with the `is` operator, plus `between` for date fields. This covers the most common filtering needs.

**Paid plans**  
Unlock advanced filtering with additional operators including `is not`, `is not any of`, `after`, `before`, and more specialized conditions. We will be adding more conditions here such as `not in`, `contains`, `is empty`, etc. .
:::

### Title

Filter work items by their title text to find specific work items.

| Operator | Description | Use case |
|----------|-------------|----------|
| `is` | Exact title match | Title is exactly "Login bug" |
| `is not` | Not exact title match | Title is not "Login bug" |
| `contains` | Title contains text | Title contains "authentication" |
| `does not contain` | Title does not contain text | Title does not contain "deprecated" |

### Milestone

Filter work items by their associated milestone to track progress toward major goals or releases.

| Operator | Description | Use case |
|----------|-------------|----------|
| `is` | Exactly this milestone | Items in Q1 Launch milestone |
| `is any of` | Any of these milestones | In Q1 Launch or Beta Release |
| `is not` | Not this specific milestone | Not in Q1 Launch |
| `is not any of` | Not in any of these milestones | Not in Q1 Launch or Beta Release |
| `is empty` | No milestone assigned | Items without any milestone |

### Type

Filter by custom work item types, such as Bug, Feature, or Task.

| Operator        | Description                  | Use case                             |
| --------------- | ---------------------------- | ------------------------------------ |
| `is`            | Exactly matches one type     | Show only work items with type _Bug_ |
| `is any of`     | Matches any of several types | Bugs or Tasks only                   |
| `is not`        | Excludes one type            | Everything except Bug                |
| `is not any of` | Excludes several types       | Not Bugs or Tasks                    |

### State

View work items based on their current state, such as Todo, In Progress, or Done.

| Operator        | Description                   | Use case               |
| --------------- | ----------------------------- | ---------------------- |
| `is`            | Exactly matches one state     | Only items In Progress |
| `is any of`     | Matches any of several states | Todo or In Progress    |
| `is not`        | Excludes one state            | Everything except Done |
| `is not any of` | Excludes several states       | Not Done or Cancelled  |

### State Group

View all, active or backlog work items.

| Operator        | Description                   | Use case                     |
| --------------- | ----------------------------- | ---------------------------- |
| `is`            | Exactly matches one group     | Show only Started work items |
| `is any of`     | Matches any of several groups | Backlog or Unstarted         |
| `is not`        | Excludes one group            | Everything except Backlog    |
| `is not any of` | Excludes several groups       | Not Backlog or Cancelled     |

### Assignees

Focus on work items assigned to specific team members to track workloads or identify pending tasks.

| Operator | Description | Use case |
|----------|-------------|----------|
| `is` | Exactly matches one person | Find work assigned to Sarah |
| `is any of` | Matches any of multiple people | Show work for the frontend team |
| `is not` | Excludes one person | Hide items assigned to John |
| `is not any of` | Excludes multiple people | Not assigned to John or Sarah |
| `is empty` | No assignee | Unassigned work items |

### Priority

Filter work items by their priority level (e.g., Urgent, High, Medium, Low) to focus on the most critical tasks.

| Operator        | Description                       | Use case                       |
| --------------- | --------------------------------- | ------------------------------ |
| `is`            | Exactly matches one priority      | Only high priority items       |
| `is any of`     | Matches any of several priorities | High or medium priority        |
| `is not`        | Excludes one priority             | Everything except low priority |
| `is not any of` | Excludes several priorities       | Not low or none priority       |

### Mentions

Filter tasks where you or another team member has been mentioned to ensure no critical tasks are missed.

| Operator | Description | Use case |
|----------|-------------|----------|
| `is` | Exactly matches one person | Items mentioning Sarah |
| `is any of` | Matches any of multiple people | Mentioning team leads |
| `is not` | Excludes one person | Not mentioning John |
| `is not any of` | Excludes multiple people | Not mentioning John or Sarah |
| `is empty` | No mentions | Items with no mentions |

### Label

Filter work items based on custom tags, such as "Frontend", or "Marketing".

| Operator | Description | Use case |
|----------|-------------|----------|
| `is` | Exact label match | Label exactly "bug" |
| `is any of` | Matches any of the Labels| frontend or backend |
| `is not` | Not exact label match | Label not exactly "bug" |
| `is not any of` | Excludes several labels | Not frontend or backend |
| `is empty` | No labels | Items without any labels |

### Cycle

View work items tied to specific cycles to monitor progress within a timeframe.

| Operator        | Description                | Use case               |
| --------------- | -------------------------- | ---------------------- |
| `is`            | Exactly this cycle         | Items in Sprint 23     |
| `is any of`     | Any of these cycles        | In Sprint 23 or 24     |
| `is not`        | Not this specific cycle    | Not in Sprint 23       |
| `is not any of` | Not in any of these cycles | Not in Sprint 23 or 24 |
| `is empty` | No cycle assigned | Items not in any cycle |

### Module

Filter work items by their associated module to analyze related tasks together.

| Operator | Description | Use case |
|----------|-------------|----------|
| `is` | Exactly this module | Items in Authentication module |
| `is any of` | Any of these modules | In API development or Data management modules |
| `is not` | Not this specific module | Not in Authentication module |
| `is not any of` | Not in any of these modules | Not in API or Data management |
| `is empty` | No module assigned | Items not in any module |

### Start date, Due date, Created at, and Updated at

Filter work items by start dates to view tasks that are planned or already in progress, and by target dates to track upcoming deadlines or overdue tasks. For even more flexibility, you can specify a custom date range to focus on a specific timeframe.

| Operator | Description | Use case |
|----------|-------------|----------|
| `is` | Exactly this date | Items due today |
| `is not` | Not this specific date | Not due today |
| `before` | Earlier than this date | Due before Monday |
| `not before` | This date or later | Not due before Monday (due Monday or later) |
| `before or on` | This date or earlier | Due Monday or earlier |
| `not before or on` | Later than this date | Not due Monday or earlier (due after Monday) |
| `after` | Later than this date | Due after Friday |
| `not after` | This date or earlier | Not due after Friday (due Friday or earlier) |
| `after or on` | This date or later | Due Friday or later |
| `not after or on` | Earlier than this date | Not due Friday or later (due before Friday) |
| `between` | Within date range | Due this week |
| `not between` | Outside date range | Not due this week |
| `is empty` | No date set | Items without start date or target date |

### Created by

Identify work items created by specific individuals.

| Operator        | Description                    | Use case                        |
| --------------- | ------------------------------ | ------------------------------- |
| `is`            | Exactly matches one person     | Items created by Sarah          |
| `is any of`     | Matches any of multiple people | Show work for the frontend team |
| `is not`        | Excludes one person            | Not created by John             |
| `is not any of` | Excludes multiple people       | Not created by John or Sarah    |

### Custom properties

Filter work items by any custom properties defined for each work item type in your project. The available operators depend on the property type.

**Text properties**
| Operator | Description | Use case |
|----------|-------------|----------|
| `is` | Exact text match | Name is exactly "Login feature" |
| `is not` | Not exact text match | Name is not "Login feature" |
| `contains` | Text contains value | Description contains "authentication" |
| `does not contain` | Text does not contain value | Description does not contain "deprecated" |
| `is empty` | No text entered | Items with empty description field |

**Number properties**
| Operator | Description | Use case |
|----------|-------------|----------|
| `is` | Exactly this number | Story points is 8 |
| `is not` | Not this number | Estimated hours is not 5 |
| `less than` | Below this value | Priority score less than 50 |
| `not less than` | This value or above | Complexity not less than 3 |
| `less than or equal` | This value or below | Effort less than or equal 10 |
| `not less than or equal` | Above this value | Risk level not less than or equal 5 |
| `greater than` | Above this value | Technical complexity greater than 3 |
| `not greater than` | This value or below | Customer impact not greater than 7 |
| `greater than or equal` | This value or above | Business value greater than or equal 50 |
| `not greater than or equal` | Below this value | Severity not greater than or equal 8 |
| `between` | Within numeric range | Estimated hours between 5 and 10 |
| `not between` | Outside numeric range | Priority score not between 20 and 40 |
| `is empty` | No number entered | Items without impact score |

**Dropdown properties**
| Operator | Description | Use case |
|----------|-------------|----------|
| `is` | Exactly this option | Severity is Critical |
| `is any of` | Any of these options | Status is Approved or Pending |
| `is not` | Not this option | Category is not Bug |
| `is not any of` | Not any of these options | Environment not Staging or Development |
| `is empty` | No option selected | Items without severity set |

**Boolean properties**
| Operator | Description | Use case |
|----------|-------------|----------|
| `is` | Matches boolean value | Is blocking is True |
| `is not` | Does not match boolean value | Requires review is not False |

**Date properties**
| Operator | Description | Use case |
|----------|-------------|----------|
| `is` | Exactly this date | Review date is today |
| `is not` | Not this specific date | Launch date is not tomorrow |
| `before` | Earlier than this date | Deadline before next Monday |
| `not before` | This date or later | Start date not before January 1 |
| `before or on` | This date or earlier | Due date before or on Friday |
| `not before or on` | Later than this date | Planned date not before or on March 15 |
| `after` | Later than this date | Completion date after Q1 end |
| `not after` | This date or earlier | Target date not after June 30 |
| `after or on` | This date or later | Delivery date after or on release day |
| `not after or on` | Earlier than this date | Milestone not after or on sprint end |
| `between` | Within date range | Review period between Jan 1 and Jan 31 |
| `not between` | Outside date range | Availability not between holidays |
| `is empty` | No date set | Items without start date or target date |

**Member picker properties**
| Operator | Description | Use case |
|----------|-------------|----------|
| `is` | Exactly this member | Reviewer is Sarah |
| `is any of` | Any of these members | Code owner is John or Emily |
| `is not` | Not this member | Quality checker is not Mike |
| `is not any of` | Not any of these members | Approver not John or Sarah |
| `is empty` | No member selected | Items without reviewers assigned |

**URL properties**
| Operator | Description | Use case |
|----------|-------------|----------|
| `is` | Exact URL match | Design link is exactly [URL] |
| `is not` | Not this exact URL | Documentation link is not [URL] |
| `contains` | URL contains text | Reference URL contains "figma.com" |
| `does not contain` | URL does not contain text | External link does not contain "staging" |
