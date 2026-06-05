---
title: Organize your Plane Wiki
description: Organize your Plane wiki with Collections. Create public or Invite Only collections and control access with View, Comment, and Edit roles.
---

# Collections <Badge type="info" text="Pro" />

Collections are how Plane organizes your wiki pages. Think of them as folders for your workspace's knowledge. Every wiki page in your workspace lives inside a collection, and you can control exactly who gets to see each one.

In your wiki sidebar, collections appear as a flat list. When you expand a collection, you see the pages inside it, and each page can have its own nested pages beneath it. The collections themselves don't nest inside each other, just the pages do.

## The General collection

Every workspace starts with one collection called **General**. Plane creates it automatically, and it works as the default landing spot for any new wiki page you create without explicitly placing it somewhere else. You can add pages to it and move pages out of it, but you can't rename it or delete it.

## Collections visibility

Plane gives you two kinds of collections, and the difference comes down to who can see what's inside.

### Public collections

Public collections are visible to everyone in your workspace with a Member or Admin role. Anyone with those roles can read pages in a public collection, and create one.

### Private collections <Badge type="tip" text="Business" />

Private collections are visible only to the people you explicitly invite. If you haven't invited someone, the collection doesn't show up in their sidebar at all. This makes Private collections the right choice for anything sensitive like internal proposals, confidential decisions, HR documents, or anything that shouldn't be visible workspace-wide.

For a full breakdown of what each role can do across all collection actions, see the [permissions matrix](/roles-and-permissions/permissions-matrix#wiki-collections).

## Create a collection

**Create a public collection**

1. In your wiki sidebar, click the **+** next to **Collections**.
2. Enter a name.
3. Leave the visibility as **Public**.
4. Click **Create collection**.

**Create a private collection**

1. In your wiki sidebar, click the **+** next to **Collections**.
2. Enter a name.
3. Select **Private** as the visibility.
4. Click **Create collection**.

The collection appears in your sidebar immediately. Since no one else can see it yet, your next step is to invite the people who need access.

:::warning
You can't change a collection's visibility after you create it. If you need to switch, say, from private to public, create the new collection first, move your pages to it, then delete the old one. If you delete private collection before moving its pages, they'll be archived automatically.
:::

## Create a new page inside a collection

You can create a new page directly from a collection without going through the main wiki page creation flow.

1. Open the collection.
2. Click the **+** menu inside the collection view.
3. Select **Create new page**.

Plane creates the page and adds it to that collection immediately. It works just like creating any other wiki page, the only difference is it lands in the collection you're already in, rather than the General collection.

## Add an existing page to a collection

If a page already exists and you want to move it into a collection, you add it from inside the collection.

1. Open the collection.
2. Click the **+** button inside the collection, then select **Add existing page**.
3. Search for the page by name, or browse the list.
4. Select one or more pages and confirm.

A few things to keep in mind:

- A page can only belong to one collection at a time. Adding it to a new collection removes it from its current one.
- **For private collections**, only root-level pages can be added. You can't independently add a child page, it inherits its parent's collection. If you want a child page in a private collection, move its parent there and the children follow automatically.
- The search shows only eligible pages. Pages that don't appear are either already in this collection, or aren't eligible (for example, a child page when adding to a private collection).

## Edit a collection

You can rename a collection or change its icon at any time, the visibility setting is the only thing you can't change after creation. This does not apply to the General collection, which can't be renamed.

1. Open the collection's options menu (the **···** next to its name in the sidebar).
2. Select **Edit**.
3. Update the name, or click the icon to pick a new emoji or icon.
4. Save.

## Manage access in a private collection

Once you create a private collection, you manage who can access it through the collection's share settings.

**Invite a member**

1. Open the private collection.
2. Click the **Share** button (or open the collection's options menu and select **Share**).
3. Search for a workspace member by name or email.
4. Choose their access level:
   - **View** — they can read pages but not edit or comment
   - **Comment** — they can read and leave comments
   - **Edit** — they can read, comment, and edit pages
5. Click **Save**.

The member can now see and access the collection according to the level you set.

**Change a member's access level**

1. Open the collection's **Share** settings.
2. Find the member in the list.
3. Click their current access level and select a new one.

**Remove a member**

1. Open the collection's **Share** settings.
2. Find the member in the list.
3. Click the remove option next to their name.

They immediately lose access to the collection and all pages inside it.

:::info
**Workspace owners and admins always have full access** to every private collection in the workspace, regardless of whether they're in the members list.
:::

## Search and filter pages within a collection

When a collection has many pages, you can search and filter to find what you need.

- **Search** - type in the search box inside the collection view to filter pages by name in real time.
- **Filter** - use the filter menu to narrow pages by creator, date created, or your favorited pages.

These controls apply only to the current collection view, they don't affect other collections or the sidebar.

## Move pages between collections

Drag the page to its destination collection in the wiki sidebar. Depending on the visibility change involved, Plane shows a confirmation dialog before completing the move.

The page moves immediately. Nested pages follow their parent. If you move a parent page, all its children move with it.

- **Moving a page into a private collection** automatically makes that page private. Only people with access to the collection will be able to see it.
- **Moving a page out of a private collection** into a public one makes it visible to the whole workspace again.
- **Removing a page from a private collection without moving it elsewhere** keeps the page private. It doesn't automatically become public. You'll need to update the page's own access setting manually if you want to make it public again.

## Reorder collections and pages

**Reorder collections in the sidebar**

Drag a collection up or down in the sidebar list to change its position.

**Reorder pages within a collection**

Inside a collection, drag pages up or down to change the order they appear in. This affects how pages show up in the collection view and in the sidebar when the collection is expanded.

## Delete a collection

1. Open the collection's options menu.
2. Select **Delete**.
3. Confirm the deletion.

**What happens to the pages**

For **public collections**, Plane gives you a choice when you delete.

- **Delete collection only** - the collection is removed and the pages return to the General collection.
- **Delete collection and archive pages** - the collection is removed and all its pages are archived. Archived pages aren't permanently deleted; you can find and restore them from your workspace archive.

For **private collections**, pages are always archived when you delete the collection, there's no option to keep them unarchived.

:::info
You can't delete the **General** collection.
:::

## See also

- [Wiki](/core-concepts/pages/wiki)
- [Collections permissions matrix](/roles-and-permissions/permissions-matrix#wiki-collections)
