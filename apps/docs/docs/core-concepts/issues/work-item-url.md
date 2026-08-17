---
title: Create work items via URL
description: Use a URL to trigger the creation of a new work item in Plane and pre-fill fields using query parameters.
---

# Create work items via URL

Plane provides a special URL that triggers the creation of a new work item in any browser. You can add query parameters to this URL to pre-fill work item fields, making it easy to create work items from external tools, bookmarks, or shared links.

## Base URL

**For Plane Cloud**  
`https://app.plane.so/work-items/new`.

For self-hosted instances, replace `app.plane.so` with your domain, e.g., `https://plane.yourdomain.com/work-items/new`.

When you visit this URL, Plane authenticates you, redirects to your last active workspace, and opens the work item creation modal. Any query parameters you include will pre-fill the corresponding fields.

## Build a URL with parameters

Start with the base URL, add `?`, then append parameters in `name=value` format. Separate multiple parameters with `&`.

```bash
https://app.plane.so/work-items/new?title=Fix+bug&priority=high&assignee=me
```

A few formatting rules:

- Use `+` or `%20` for spaces in text values.
- URL-encode special characters in descriptions.
- Separate multiple values (like assignees) with commas.

## Query parameters reference

### workspace

Overrides the default behavior of redirecting to your last active workspace. Pass a workspace slug to land in a specific workspace instead.

```
https://app.plane.so/work-items/new?workspace=plane
```

### title

Sets the work item title. Replace spaces with `+` or `%20`.

```
https://app.plane.so/work-items/new?title=Fix+login+bug
```

```
https://app.plane.so/work-items/new?title=Implement%20new%20feature
```

### description

Sets the work item description. For anything beyond simple text, URL-encode the content to handle special characters and line breaks.

```
https://app.plane.so/work-items/new?description=This+is+a+bug+description
```

Combined with a title:

```
https://app.plane.so/work-items/new?title=Bug+Report&description=Steps+to+reproduce
```

### project

Assigns the work item to a project. You can use either the project identifier (the short code like `WEB` or `MOBILE`) or the project's UUID.

```
https://app.plane.so/work-items/new?project=WEB
```

```
https://app.plane.so/work-items/new?project=MOBILE&title=New+feature
```

### priority

Sets the priority level. Accepts `urgent`, `high`, `medium`, `low`, or `none`. Values are case-insensitive, so `High`, `HIGH`, and `high` all work.

```
https://app.plane.so/work-items/new?priority=urgent
```

```
https://app.plane.so/work-items/new?priority=high&title=Critical+fix
```

```
https://app.plane.so/work-items/new?priority=Medium
```

### assignee

Assigns one or more team members to the work item. You can specify assignees by UUID, display name, or use `me` to assign to whoever opens the URL. For names with spaces, use `+` or `%20`. To assign multiple people, separate values with commas.

Assign to yourself:

```
https://app.plane.so/work-items/new?assignee=me
```

Assign by display name:

```
https://app.plane.so/work-items/new?assignee=john
```

Assign by full name:

```
https://app.plane.so/work-items/new?assignee=Erin+Baker
```

Assign multiple people:

```
https://app.plane.so/work-items/new?assignee=me,john,jane
```

### start_date

Sets the start date. Use `YYYY-MM-DD` or ISO 8601 format for consistency, though any format that JavaScript's `Date` can parse will work.

```
https://app.plane.so/work-items/new?start_date=2024-03-15
```

### due_date

Sets the due date (also called target date). Same format rules as `start_date`.

```
https://app.plane.so/work-items/new?due_date=2024-03-30
```

## Examples

**Bug report with title and description:**

```
https://app.plane.so/work-items/new?title=Login+button+not+working&description=Users+cannot+click+the+login+button+on+mobile
```

**High-priority task assigned to yourself:**

```
https://app.plane.so/work-items/new?project=WEB&priority=high&assignee=me&title=Fix+authentication+bug
```

**Fully populated work item:**

```
https://app.plane.so/work-items/new?title=Implement+dark+mode&description=Add+dark+mode+support+to+the+dashboard&project=FRONTEND&priority=medium&assignee=me,john&start_date=2024-03-15&due_date=2024-03-30
```

## Things to know

- **Authentication required**  
  Users must be logged in. If they're not, Plane redirects them to sign in first, then continues to the work item modal.
- **Invalid values are ignored**  
  If a project identifier or display name doesn't match an existing record, Plane skips that parameter and processes the rest.
- **Case doesn't matter**  
  Values like priority and project identifier are case-insensitive.
- **Users can still edit**  
  Pre-filled values aren't locked. After the modal opens, users can change any field before creating the work item.
