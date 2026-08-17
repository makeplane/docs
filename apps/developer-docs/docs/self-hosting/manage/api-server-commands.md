---
title: API Server Commands
description: Reference for all custom Django management commands available in the Plane API server for user management, data operations, instance configuration, and maintenance.
keywords: plane management commands, django manage.py, plane admin commands, plane cli, self-hosted plane commands, plane database commands, plane instance setup
---

# API Server Commands

This page lists all custom Django management commands available in the Plane API server. These commands help you manage users, configure your instance, maintain data integrity, and perform administrative operations.

All commands are run via:

```bash
python manage.py <command> [arguments]
```

Or inside Docker:

```bash
docker compose exec api python manage.py <command> [arguments]
```

## User management

### `activate_user`

Activates a deactivated user account by their email address. Use this when a user has been disabled and needs to regain access to the platform.

```bash
python manage.py activate_user user@example.com
```

| Argument | Required | Description                   |
| -------- | -------- | ----------------------------- |
| `email`  | Yes      | Email of the user to activate |

### `create_instance_admin`

Adds a user as an instance administrator, giving them access to the admin panel (God mode) for managing instance-wide settings, configurations, and user management.

```bash
python manage.py create_instance_admin admin@example.com
```

| Argument      | Required | Description                     |
| ------------- | -------- | ------------------------------- |
| `admin_email` | Yes      | Email of the user to make admin |

### `create_project_member`

Adds a workspace member to a specific project with a designated role. The user must already be a member of the workspace. Arguments can be provided via flags or interactively.

```bash
python manage.py create_project_member
python manage.py create_project_member --project_id <uuid> --user_email user@example.com --role 20
```

| Argument       | Required | Description               |
| -------------- | -------- | ------------------------- |
| `--project_id` | No       | Project UUID              |
| `--user_email` | No       | User email address        |
| `--role`       | No       | Role level in the project |

### `delete_user`

Permanently deletes a user account and cleans up associated token constraints. Use with caution as this operation is irreversible.

```bash
python manage.py delete_user --email user@example.com
```

| Argument  | Required | Description                 |
| --------- | -------- | --------------------------- |
| `--email` | Yes      | Email of the user to delete |

### `invalidate_passwords`

Invalidates passwords for users specified by email addresses or a CSV file. Affected users will need to reset their passwords on next login. Supports dry-run mode to preview which accounts would be affected. Useful for security incidents or enforced password rotation.

```bash
python manage.py invalidate_passwords --email user1@example.com,user2@example.com
python manage.py invalidate_passwords --csv /path/to/emails.csv --column email_address
python manage.py invalidate_passwords --email user@example.com --dry-run
```

| Argument    | Required                    | Description                        |
| ----------- | --------------------------- | ---------------------------------- |
| `--email`   | One of `--email` or `--csv` | Comma-separated email addresses    |
| `--csv`     | One of `--email` or `--csv` | Path to CSV file with emails       |
| `--column`  | No                          | CSV column name (default: `email`) |
| `--dry-run` | No                          | Preview changes without applying   |

### `reset_password`

Interactively resets a user's password. Prompts for the new password and validates its strength before applying the change. Use this when a user is locked out and cannot use the self-service password reset flow.

```bash
python manage.py reset_password user@example.com
```

| Argument | Required | Description       |
| -------- | -------- | ----------------- |
| `email`  | Yes      | Email of the user |

## Workspace and project operations

### `change_ownership`

Transfers workspace ownership to a different user. The specified user is set as the workspace admin and becomes the new owner. Useful when the original workspace creator leaves the organization or ownership needs to be reassigned.

```bash
python manage.py change_ownership --email new-owner@example.com --workspace_slug my-workspace
```

| Argument           | Required | Description       |
| ------------------ | -------- | ----------------- |
| `--email`          | Yes      | New owner's email |
| `--workspace_slug` | Yes      | Workspace slug    |

### `test_email`

Sends a test email to a specified recipient to verify that the email configuration (SMTP settings, templates, etc.) is working correctly. Useful during initial setup or after changing email settings.

```bash
python manage.py test_email recipient@example.com
```

| Argument   | Required | Description             |
| ---------- | -------- | ----------------------- |
| `to_email` | Yes      | Recipient email address |

## Data maintenance

### `fix_duplicate_sequences`

Fixes duplicate issue sequence IDs within a project using PostgreSQL advisory locks to ensure safe concurrent access. Use this when issues in a project have conflicting sequence numbers.

```bash
python manage.py fix_duplicate_sequences PROJECT-123
```

| Argument           | Required | Description                            |
| ------------------ | -------- | -------------------------------------- |
| `issue_identifier` | Yes      | Issue identifier (e.g., `PROJECT-123`) |

### `fix_workspace_duplicate_sequences`

Scans all projects in a workspace for duplicate issue sequences and fixes them. Supports dry-run mode to preview changes and can be scoped to a single project. Use this for bulk sequence repair across an entire workspace.

```bash
python manage.py fix_workspace_duplicate_sequences my-workspace
python manage.py fix_workspace_duplicate_sequences my-workspace --project-id <uuid>
python manage.py fix_workspace_duplicate_sequences my-workspace --dry-run
python manage.py fix_workspace_duplicate_sequences my-workspace --auto-confirm
```

| Argument         | Required | Description                      |
| ---------------- | -------- | -------------------------------- |
| `workspace_slug` | Yes      | Workspace slug                   |
| `--project-id`   | No       | Limit to a specific project      |
| `--dry-run`      | No       | Preview changes without applying |
| `--auto-confirm` | No       | Skip confirmation prompts        |

### `clear_cache`

Clears the application cache to remove stale values. Can target a specific cache key or clear the entire cache. Typically used before server restarts or when cached data becomes inconsistent.

```bash
python manage.py clear_cache
python manage.py clear_cache --key my_cache_key
```

| Argument | Required | Description                 |
| -------- | -------- | --------------------------- |
| `--key`  | No       | Specific cache key to clear |

## Storage

### `create_bucket`

Creates the default S3/MinIO storage bucket for file uploads if it doesn't already exist. Should be run during initial instance setup to ensure the storage backend is ready.

```bash
python manage.py create_bucket
```

### `update_bucket`

Checks S3/MinIO bucket permissions and applies the public access policy if needed. Run this after changing storage configuration or if file access permissions are not working correctly.

```bash
python manage.py update_bucket
```

## Search and indexing

### `generate_index`

Deletes and recreates the Elasticsearch index for issues, then performs a bulk re-index of all issue data. Use this to rebuild the search index from scratch when it becomes corrupted or out of sync.

```bash
python manage.py generate_index
```

### `manage_search_index`

Manages the OpenSearch index with support for background execution via Celery and optional vectorization. Acts as a wrapper around OpenSearch index operations, making it easy to trigger re-indexing and vector embedding generation.

```bash
python manage.py manage_search_index
python manage.py manage_search_index --background
python manage.py manage_search_index --background --vectorize
```

| Argument       | Required | Description                                                    |
| -------------- | -------- | -------------------------------------------------------------- |
| `--background` | No       | Run via Celery background task                                 |
| `--vectorize`  | No       | Trigger vectorization after indexing (requires `--background`) |

### `monitor_search_queue`

Monitors and manages OpenSearch batch update Redis queues. Provides real-time visibility into queue health, supports cleanup of stale queues, and offers an emergency force-drain option for stuck queues.

```bash
python manage.py monitor_search_queue status
python manage.py monitor_search_queue watch
python manage.py monitor_search_queue cleanup
python manage.py monitor_search_queue force-drain
```

| Subcommand    | Description                           |
| ------------- | ------------------------------------- |
| `status`      | Show current queue status (default)   |
| `watch`       | Watch queues in real-time             |
| `cleanup`     | Clean up stale queues                 |
| `force-drain` | Emergency force drain (**dangerous**) |

## Data migration

### `generate_cycle_progress`

Generates EntityProgress data for a specific cycle by replaying issue state activity history. Useful for backfilling progress metrics when cycle progress data is missing or needs recalculation.

```bash
python manage.py generate_cycle_progress <cycle_uuid>
```

| Argument   | Required | Description |
| ---------- | -------- | ----------- |
| `cycle_id` | Yes      | Cycle UUID  |

### `silo_credentials_email_update`

Schedules a background task to update silo (integration) credentials from the old schema to the new schema. Part of the integration system migration process.

```bash
python manage.py silo_credentials_email_update
```

### `silo_data_migration`

Schedules a background task to migrate silo (integration) data from the old schema to the new schema. Used during major version upgrades that change the integration data structure.

```bash
python manage.py silo_data_migration
```

### `split_remaining_github_econnections`

Splits GitHub entity connections that haven't been migrated to the new schema. Targets specific connection IDs that were missed during the initial migration.

```bash
python manage.py split_remaining_github_econnections --entity_connections_ids_not_split id1,id2,id3
```

| Argument                             | Required | Description                            |
| ------------------------------------ | -------- | -------------------------------------- |
| `--entity_connections_ids_not_split` | No       | Comma-separated list of connection IDs |

## Log management

### `hard_delete_api_logs`

Schedules a background task to permanently delete old API log records from the database. Prompts interactively for the age threshold. Helps manage database size by purging historical API logs.

```bash
python manage.py hard_delete_api_logs
```

### `hard_delete_email_notification_logs`

Schedules a background task to permanently delete old email notification log records. Prompts interactively for the age threshold. Useful for database maintenance and storage reclamation.

```bash
python manage.py hard_delete_email_notification_logs
```

### `hard_delete_recent_visits`

Schedules a background task to permanently delete old user recent visit records. Prompts interactively for the age threshold. Keeps the recent visits table from growing unbounded.

```bash
python manage.py hard_delete_recent_visits
```

### `hard_delete_webhook_log`

Schedules a background task to permanently delete old webhook log records. Prompts interactively for the age threshold. Prevents webhook logs from consuming excessive database storage.

```bash
python manage.py hard_delete_webhook_log
```

## Marketplace

### `publish_template`

Publishes or unpublishes a template to/from the marketplace. Published templates become available for other workspaces to discover and use. Includes verification steps during publishing.

```bash
python manage.py publish_template <template_id>
python manage.py publish_template <template_id> --action unpublish
```

| Argument      | Required | Description                                   |
| ------------- | -------- | --------------------------------------------- |
| `template_id` | Yes      | Template UUID                                 |
| `--action`    | No       | `publish` or `unpublish` (default: `publish`) |

### `reset_marketplace_app_secrets`

Deletes and recreates all marketplace application secrets. Use this when secrets have been compromised or need to be rotated for security purposes.

```bash
python manage.py reset_marketplace_app_secrets
```

### `update_marketplace_app`

Comprehensive management tool for marketplace apps. Supports publishing, unpublishing, assigning workspace owners, toggling internal/external visibility, setting priority and status, and configuring authorization requirements.

```bash
python manage.py update_marketplace_app assign-owner <app_id> --workspace-slug my-ws
python manage.py update_marketplace_app publish <app_id>
python manage.py update_marketplace_app unpublish <app_id>
python manage.py update_marketplace_app make-app-internal <app_id>
python manage.py update_marketplace_app make-app-external <app_id>
python manage.py update_marketplace_app set-app-priority <app_id> --priority 10
python manage.py update_marketplace_app set-app-status <app_id> --status active
python manage.py update_marketplace_app skip-app-authorization <app_id>
python manage.py update_marketplace_app mandate-app-authorization <app_id>
```

| Subcommand                  | Description                     |
| --------------------------- | ------------------------------- |
| `assign-owner`              | Assign a workspace as app owner |
| `publish`                   | Publish the app                 |
| `unpublish`                 | Unpublish the app               |
| `make-app-internal`         | Mark app as internal            |
| `make-app-external`         | Mark app as external            |
| `set-app-priority`          | Set app display priority        |
| `set-app-status`            | Set app status                  |
| `skip-app-authorization`    | Allow skipping authorization    |
| `mandate-app-authorization` | Require authorization           |
