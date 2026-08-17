---
title: Comments for collaboration and activity tracking
description: Add comments, mention team members, and track activity on work items
---

# Work Item Comments

Comments are threaded, rich-text messages attached to a work item. They are the primary place for discussion — asking questions, sharing context, reviewing decisions, or signalling blockers — without editing the work item's description or fields.

Every comment is associated with a specific work item and scoped to a project and workspace. Comments appear in the activity panel of a work item alongside system-generated activity events (field changes, state transitions, assignments), but comments and activity are distinct things: activity is system-written and immutable; comments are user-written and editable.

## Add a comment to a work item

![Work item comments](https://media.docs.plane.so/issues/work-item-comments.webp#hero)

1. Open a work item.
2. Navigate to the **Activity** or **Comments** section in the detail panel.
3. Click the comment input area.
4. Type your comment. Use **Shift+Enter** to add a line break.
5. Press **Enter** (or **Mod+Enter** if you have changed your shortcut) to submit, or click the **Comment** button.

Your comment appears immediately in the activity feed with a timestamp and your profile picture.

### Rich text formatting

The comment editor is a full rich text environment. You can format text (bold, italic, code, lists, headings), embed images, and insert links. Pressing **Shift+Enter** inserts a line break without submitting the comment.

**Available formatting:**

- **Bold** - Emphasize important points
- _Italic_ - Add subtle emphasis
- `Code` - Share code snippets or technical terms
- Bullet lists - Organize information
- Numbered lists - Create step-by-step instructions
- Block quotes - Quote previous comments or external sources
- Code blocks - Share longer code snippets with syntax
- Links - Reference external resources

## Reply to comments

Comments support one level of threading. Any top-level comment can receive replies. Replies are displayed nested under the parent and show a count of how many replies exist and which members participated. The reply editor behaves identically to the top-level comment editor, including shortcut and mention support.

Replies inherit the access level of their parent comment and cannot be changed independently.

### Create a threaded reply

![Reply to comments](https://media.docs.plane.so/issues/reply-to-comments.webp#hero)

1. Hover over a comment.
2. Click the **Reply** icon or **Reply** button that appears in the comment toolbar.
3. Type your reply in the reply input that opens below the comment.
4. Click **Add reply** to post your reply.

Replies appear nested under the original comment, making it easy to follow the conversation thread. Team members get notified when you reply to their comments.

## Mention team members

Tag team members in comments to notify them and draw their attention to specific work items.

1. While typing a comment, type `@` followed by the name of the member you want to mention.
2. A suggestion list appears. Use the arrow keys or mouse to select the target.
3. Press **Enter** or click to insert the mention.

**What happens**

- The mentioned person receives an email notification (if they have notifications enabled)
- The work item appears in their Inbox

## React to a comment

1. Hover over the comment.
2. Click the **emoji** icon in the comment toolbar.
3. Select an emoji from the picker.

Your reaction appears below the comment. Click an existing reaction to add your vote to it or to toggle it off.

## Copy a link to a specific comment

Share a direct link to a specific comment for reference in other discussions or documents.

1. Hover over any comment.
2. Click the three dots (⋯) menu.
3. Select **Copy link**.

The link copies to your clipboard. When someone clicks the link, they'll be taken directly to that work item with the comment.

## Edit a comment

Update your comments to fix errors or add additional context.

1. Hover over your comment.
2. Click the **Edit** (pencil) icon.
3. Modify the comment text in the editor that opens inline.
4. Submit to save, or press **Escape** to cancel.

Edited comments show an **edited** label with the edit timestamp. The previous version of the comment is preserved in the work item activity log.

You can only edit your own comments.

## Delete a comment

Remove comments that are no longer relevant or were posted in error.

1. Hover over your comment.
2. Click the three dots (⋯) menu.
3. Select **Delete**.
4. Confirm the deletion.

You can only delete your own comments. Admins can delete other members' comments.

::: warning
Deletion is permanent. The deletion event is recorded in the work item activity log.
:::

## Activity tracking

The Activity log shows a chronological history of everything that happens on a work item, including comments and system updates.

### Activity types tracked

**System activities:**

- Work item creation
- Status changes (To Do → In Progress → Done)
- Assignee changes
- Priority updates
- Estimate changes
- Due date modifications
- Module or cycle assignments
- Label additions or removals
- Relation changes (blocking, blocked by, etc.)

**User activities:**

- Comments posted
- Time logged ([Worklogs](/core-concepts/issues/time-tracking))
- Attachments uploaded
- Description edits

Every comment action — creation, edit, or deletion — is recorded as a work item activity event. This means the full comment history (including the text of previous versions on edit) is preserved in the activity log. Reaction events are also logged.

Comment edits display an **edited** indicator with the `edited_at` timestamp. The original text is accessible in the activity log.

### Filter activity

Show only specific types of activity to focus on what matters.

1. Click the **Filters** button in the Activity panel.
2. Select **Assignee** to see relevant activity.
3. The activity log updates immediately.

### Sort activity

Change the order in which activities appear.

**Sort options:**

- **Newest first** (default) - Most recent activity at the top
- **Oldest first** - Original activity at the top

Click the sort icon next to Filters to toggle between sort orders.

## Notification preferences

Members can configure whether they receive email notifications for new comments on work items they are involved in. This is set per-workspace and can be further overridden at the project level. The preferences cover two triggers:

- **Comment** — a new comment is posted on a work item you are subscribed to, assigned to, or created
- **Mention** — you are @mentioned in a comment

## Comment submit shortcut

By default, pressing **Enter** submits a comment. Pressing **Shift+Enter** always inserts a line break regardless of this setting.

If you prefer to use Enter freely for line breaks and only submit intentionally, you can switch the shortcut to **Mod+Enter** (Ctrl+Enter on Windows/Linux, ⌘+Enter on macOS) in your profile preferences. This setting is stored on your user profile and applies globally — it affects the comment create form, the comment edit form, and the reply editor, across all projects and workspaces.

The setting is per-user, not per-workspace. Other members are not affected by your preference.
