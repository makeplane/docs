---
title: Work item comments overview
description: The Plane API v2 work item comment object. HTML bodies, INTERNAL and EXTERNAL access, the sub-resource path, and why comments never conflict.
keywords: plane api v2, work item comments, issue comments, comment_html, comment access, internal comment, external comment
---

# Work item comments overview

A comment is a note posted on a single work item. Comments are a **sub-resource of a work item**, not a
project-level collection: every route is mounted under the work item, so a comment can only be read or written
through the work item it belongs to.

```text
/api/v2/workspaces/{slug}/projects/{project_id}/work-items/{work_item_id}/comments/
```

That means the collection routes carry three path parameters (`slug`, `project_id`, `work_item_id`) and the
detail routes carry four (plus `pk`). There is no workspace-wide or project-wide comment feed — to gather
comments across work items, list them per work item.

[Learn more about work item comments](https://docs.plane.so/core-concepts/issues/overview#comment-on-work-items)

<div class="api-two-column">
<div class="api-left">

## The comment object

### Attributes

- `id` _string (uuid)_

  Unique identifier for the comment.

- `work_item_id` _string (uuid)_

  The work item this comment is attached to. Always matches the `work_item_id` in the request path.

- `comment_html` _string_

  The comment body, as HTML. This is the field you write.

- `comment_stripped` _string_

  The plain-text version of `comment_html`, derived server-side. It is what `?search=` matches, so markup never
  affects a search hit. Read-only — you never send it.

- `access` _string_

  Visibility of the comment. One of `INTERNAL` or `EXTERNAL`. `INTERNAL` keeps the comment inside the project
  team; `EXTERNAL` marks it as visible outside the team, for example on a published project.

- `actor_id` _string (uuid)_ or _null_

  The author of the comment — the principal that posted it. Set server-side from the authenticated caller, so
  you cannot post a comment on someone else's behalf.

- `edited_at` _string (date-time)_ or _null_

  When the comment was last updated through a `PATCH`. `null` on a comment that has never been edited, which is
  how clients render an "edited" marker.

- `external_id` , `external_source` _string_ or _null_

  Correlation fields for sync and import. Together they let you map a comment to a record in another system and
  find it again with `?external_id=` and `?external_source=`.

- `created_at` _string (date-time)_

  When the comment was created.

- `created_by_id` _string (uuid)_ or _null_

  The user record that created the comment. For comments posted by a person this is the same user as
  `actor_id`; `actor_id` is the domain field that Plane renders as the comment author.

::: tip Write `comment_html`, read `comment_stripped`
`comment_html` is the only body field you can set. Plane derives `comment_stripped` from it on every write, so
the two never drift apart.
:::

</div>
<div class="api-right">

<ResponsePanel status="200" title="THE COMMENT OBJECT">

```json
{
  "id": "c1f7a3d9-2b64-4f80-9c1a-3d5e8b2a6c47",
  "work_item_id": "8f4c2b1e-0d3a-4f7b-9c21-6e5a8b7d4f13",
  "comment_html": "<p>Deployed the fix to staging. Please re-test.</p>",
  "comment_stripped": "Deployed the fix to staging. Please re-test.",
  "access": "INTERNAL",
  "actor_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
  "external_id": null,
  "external_source": null,
  "edited_at": null,
  "created_at": "2026-01-14T09:22:41.478363Z",
  "created_by_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430"
}
```

</ResponsePanel>

</div>
</div>

## Endpoints

| Method   | Path                                                                                         | Description         |
| -------- | -------------------------------------------------------------------------------------------- | ------------------- |
| `GET`    | `/api/v2/workspaces/{slug}/projects/{project_id}/work-items/{work_item_id}/comments/`        | List comments       |
| `POST`   | `/api/v2/workspaces/{slug}/projects/{project_id}/work-items/{work_item_id}/comments/`        | Create a comment    |
| `POST`   | `/api/v2/workspaces/{slug}/projects/{project_id}/work-items/{work_item_id}/comments/bulk/`   | Bulk write comments |
| `POST`   | `/api/v2/workspaces/{slug}/projects/{project_id}/work-items/{work_item_id}/comments/upsert/` | Upsert a comment    |
| `DELETE` | `/api/v2/workspaces/{slug}/projects/{project_id}/work-items/{work_item_id}/comments/{pk}/`   | Delete a comment    |
| `GET`    | `/api/v2/workspaces/{slug}/projects/{project_id}/work-items/{work_item_id}/comments/{pk}/`   | Get a comment       |
| `PATCH`  | `/api/v2/workspaces/{slug}/projects/{project_id}/work-items/{work_item_id}/comments/{pk}/`   | Update a comment    |

## Comments are not deduplicated

::: info The API will not collapse duplicates for you
Nothing about a comment's body or `external_id` identifies it uniquely, so posting the same `comment_html`
twice creates two comments. If your integration must post a comment at most once, send an `external_id` and
look for it first with `GET …/comments/?external_id=…&external_source=…` before creating.

Writes can still fail with `409 conflict`, so branch on the `code` in the problem response instead of assuming
a create always succeeds.
:::

## Access and visibility

`access` is set per comment and can be changed later with a `PATCH`. Filter a list down to one visibility with
`?access=INTERNAL` or `?access=EXTERNAL` when you need only the comments a particular audience can see.

## Reads follow the parent work item

Comment visibility is inherited from the work item in the path — there is no per-comment read permission. A
`pk` that belongs to a different work item is not visible on this route and returns `404 not_found`,
the same as a comment id that does not exist. Existence is never leaked.

## Changed from v1

- The path segment is `/work-items/{work_item_id}/comments/` and the parent id is reported as **`work_item_id`**
  instead of `issue`.
- `actor` is now **`actor_id`**, and `created_by` is now **`created_by_id`**.
- Reads no longer return `updated_at`, `updated_by`, `deleted_at`, `project`, `workspace`, `comment_json`,
  `attachments`, or `is_member`.
- `edited_at` is stamped by Plane on every `PATCH`.

See [Migrating from v1](/api-reference/v2/migrating-from-v1) for the full list.
