---
title: Plane Compose
description: Define Plane projects, workflows, and work items in YAML files. Version control your project structure and sync bidirectionally with Plane using the command line.
keywords: plane compose, plane yaml, infrastructure as code, plane cli, plane project configuration, plane version control, plane sync, plane command line tool
---

# Plane Compose

Plane Compose is a command-line tool that lets you define and manage Plane projects using YAML configuration files. Think of it as "project as code", you write your project structure, schema, and work items in files, version control them with Git, and sync them with Plane.

## Prerequisites

- Python 3.10 or later. Verify with `python3 --version`.
- pipx. Plane Compose is distributed as a Python package and pipx is the recommended installer. If you do not have pipx:

```bash
# macOS
brew install pipx
pipx ensurepath

# Linux / Windows (via pip)
pip install --user pipx
pipx ensurepath
```

- A Plane account with access to at least one workspace.
- An API token. You will need it during authentication.

## Install Plane Compose

```bash
pipx install plane-compose
```

The package is published at [https://pypi.org/project/plane-compose/](https://pypi.org/project/plane-compose/).

To upgrade to the latest version:

```bash
pipx upgrade plane-compose
```

## Authenticate

```bash
plane auth login
```

You will be prompted for:

- **Server URL** - leave blank for `https://api.plane.so`; enter your instance URL if self-hosted
- **Auth type** - `pat` for a Personal Access Token, `workspace` for a workspace-scoped token
- **Token** - your API key, generated at `https://app.plane.so/<workspace-slug>/settings/account/api-tokens/`
- **Workspace** - your workspace slug (the URL segment after `app.plane.so/`)
- **Connection name** - a label for this connection (e.g. `personal`, `work`, `staging`), leave blank for default; used to identify it in `plane auth list-connections`

Verify it worked:

```bash
plane auth list-connections
```

To add credentials for a second workspace or a different Plane instance, run `plane auth login` again. Each login creates a separate connection. Link a workspace to a specific connection:

```bash
plane auth connect-workspace <workspace-slug> --connection <connection-name>
```

Remove a connection:

```bash
plane auth logout <connection-name>
```

## Project operations

### Start a new project

```bash
plane init <project-key> --workspace <workspace-slug>
```

This creates the project directory with the given key and generates the full file structure inside it.

To start from a template instead of the default schema:

```bash
plane init <project-key> --workspace <workspace-slug> --template ./templates/standard

# or a Git URL:
plane init <project-key> --workspace <workspace-slug> \
  --template https://github.com/<org>/<repo>/templates/<template-name>
```

Before pushing, edit your schema files to define your project's structure. See the **Define your project schema** guide below.

Then push the schema to create the project in Plane:

```bash
cd <project-key>
plane schema push
```

`plane.yaml` is updated with the project UUID after this runs.

### Define your project schema

After `plane init`, the `schema/` directory contains default files. Edit them to match your project's actual structure before pushing.

**Edit the files in this order** - each file can only reference names defined in the files before it.

1. **Define your states**

Open `schema/states.yaml`. Every state belongs to one of five groups: `backlog`, `unstarted`, `started`, `completed`, `cancelled`. Exactly one state should have `is_default: true`.

```yaml
states:
  Backlog:
    group: backlog
    color: "#858585"
    is_default: true
    allow_issue_creation: true
  In Progress:
    group: started
    color: "#f59e0b"
  Done:
    group: completed
    color: "#22c55e"
  Cancelled:
    group: cancelled
    color: "#ef4444"
```

See the `schema/states.yaml` reference for all fields.

2. **Define your labels**

Open `schema/labels.yaml`. Labels are flat - no nesting.

```yaml
labels:
  - name: backend
    color: "#3b82f6"
  - name: frontend
    color: "#8b5cf6"
```

3. **Define your workflows**

Open `schema/workflows.yaml`. A workflow ties a set of states together and optionally restricts which transitions are allowed. Use only state names defined in `schema/states.yaml`.

```yaml
workflows:
  default:
    is_active: true
    work_item_types:
      - Story
      - Bug
    states:
      - Backlog
      - In Progress
      - Done
      - Cancelled
```

Without a `transitions` block, any state change is permitted. See the `schema/workflows.yaml` reference for transition and approval syntax.

4. **Define your work item types**

Open `schema/types.yaml`. Each type references a workflow by name. Use only workflow names defined in `schema/workflows.yaml`.

```yaml
work_item_types:
  Story:
    description: A unit of user-facing work
    workflow: default
    is_epic: false
  Bug:
    description: A defect requiring correction
    workflow: default
```

To add custom properties to a type, see the `schema/types.yaml` reference.

5. **Set your default type in `plane.yaml`**

Open `plane.yaml` and set `defaults.type` to the type name used when a work item does not specify one:

```yaml
defaults:
  type: Story
  workflow: default
```

6. **Toggle features**

Open `schema/features.yaml` and disable features your project does not need. Disabling a feature hides it from the Plane UI and causes Plane Compose to skip its corresponding work file on push and pull.

```yaml
features:
  cycles: true
  modules: true
  pages: false
```

7. **Validate**

Check for errors without making any API calls:

```bash
plane schema validate
```

Fix any reported errors before proceeding.

8. **Push the schema**

Then push the schema to create the project in Plane:

```bash
cd my-project
plane schema push
```

`plane.yaml` is updated with the project UUID after this runs.

This creates the project in Plane if it does not exist yet and pushes your types, states, labels, and workflows. `plane.yaml` is updated with the project UUID after this runs.

### Clone an existing project

Use this when the project already exists in Plane and you want to manage it locally.

```bash
plane clone <project-uuid> --workspace <workspace-slug>
```

:::info
Use `--connection <connection-name>` if the workspace slug is common across multiple connections.
:::

This downloads `plane.yaml`, all schema files, and all work files into a new local directory. The schema files will reflect what is currently in Plane, you can edit them and push changes back.

### Push changes to Plane

`plane push` pushes everything - schema and work files - in the correct order. `plane schema push` pushes schema only and is equivalent to `plane push --schema-only`. Use `plane schema push` when you are setting up a project for the first time and have no work items yet, or when you want to push schema changes without touching work items. Use `plane push` for all other cases.

From inside the project directory:

```bash
plane push
```

Preview what will change before pushing:

```bash
plane push --dry-run
```

If you have only changed schema files:

```bash
plane push --schema-only
```

If you have only changed work items:

```bash
plane push --work-only
```

### Pull remote changes from Plane

Use this when changes have been made in Plane (via the UI or by other users) and you want to bring them into your local files.

```bash
plane pull
```

To keep local additions and apply remote changes without losing local-only items:

```bash
plane pull --merge
```

To overwrite local files entirely with what is in Plane:

```bash
plane pull --force
```

### Import schema changes made in Plane

Use this when someone has modified work item types, states, labels, or workflows directly in the Plane UI and your local schema files are now out of sync.

To reconnect local names to their remote IDs without changing any YAML (safe, no file changes):

```bash
plane schema import
```

To add items that exist in Plane but are absent from your local files, without touching what you already have:

```bash
plane schema import --merge
```

To replace your local schema files entirely with whatever is in Plane:

```bash
plane schema import --force
```

### Upgrade a project to a new template version

Use this when your team has updated the standard template and you want to bring an existing project in line with it.

Preview the changes first:

```bash
plane upgrade --template https://github.com/<org>/<repo>/templates/<template-name> --dry-run
```

Apply the upgrade:

```bash
plane upgrade --template https://github.com/<org>/<repo>/templates/<template-name>
```

The template merges over your local schema. Items unique to your project are preserved; conflicts are resolved in favour of the template.

### Run Plane Compose in CI/CD

Authenticate non-interactively using flags:

```bash
plane auth login \
  --server-url https://api.plane.so \
  --auth-type pat \
  --token "$PLANE_TOKEN" \
  --workspace <workspace-slug>
```

Push without prompts and with a machine-readable exit code:

```bash
plane push --force --no-conflict-check --exit-code
```

Exit code values: `0` - no changes needed, `1` - error, `2` - changes were applied.

## Workspace operations

### Manage workspace configuration

Clone workspace-level configuration to a local directory:

```bash
plane ws clone <workspace-slug> -c <connection-name>
```

After making changes locally, push them to Plane:

```bash
plane ws push
```

To pull the latest workspace state from Plane:

```bash
plane ws pull
```

To pull and preserve local additions:

```bash
plane ws pull --merge
```

### Work with multiple projects

From a directory containing multiple project subdirectories:

```bash
plane push --all
plane pull --all
plane status --all
```

To limit to a specific workspace:

```bash
plane push --all --workspace <workspace-slug>
```

To filter by project name pattern:

```bash
plane push --all --filter "<pattern>"
```

## Recover from sync problems

**State file deleted or corrupted:**

```bash
plane schema import   # reconnects schema names to remote IDs
plane pull            # restores work item entries
```

**A specific item is stuck or needs to be re-created:**

```bash
plane state remove types.<type-name>
plane state remove work_items.<item-id>
```

**All work items need to be re-pushed:**

```bash
plane state clear-items
plane push
```

**A push was interrupted and some items failed:**

```bash
plane push --resume
```

**Diagnosing what went wrong:**

```bash
plane --debug push
tail -f ~/.config/plane-compose/plane.log
```

---

## Reference

### CLI commands

---

#### `plane init`

Initialises a new project directory with the standard file structure: `plane.yaml`, `schema/`, `work/`, and `.plane/state.json`. If a template is specified, schema and work files are pre-populated from the template source. If called without arguments, the command runs interactively and prompts for workspace and project values.

```
plane init [PROJECT] [--workspace WS] [--connection CONN]
           [--path PATH] [--template TEMPLATE]
```

| Option                | Description                                                                                                                                                                                                                                                               |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `PROJECT`             | Name of the directory to create and the project key written into `plane.yaml` under `project.key`.                                                                                                                                                                        |
| `--workspace WS`      | Slug of the Plane workspace this project belongs to. Written into `plane.yaml`.                                                                                                                                                                                           |
| `--connection CONN`   | ID of the connection to use for API calls during initialisation. Defaults to the connection linked to the workspace.                                                                                                                                                      |
| `--path PATH`         | Parent directory in which to create the project folder. Defaults to the current working directory.                                                                                                                                                                        |
| `--template TEMPLATE` | Source for pre-populating the schema and work files. Accepts a built-in name (e.g. `default`), a local filesystem path, a Git HTTPS URL, or a Git SSH URL. The resolved value is written to `plane.yaml` under `template` so that `plane upgrade` can reference it later. |

---

#### `plane auth login`

Stores a new set of credentials as a connection in `~/.config/plane-compose/config.json` and links it to a workspace. When all flags are provided, the command runs non-interactively, making it suitable for CI/CD pipelines. On success, prints the generated connection ID.

```
plane auth login [--connection CONN] [--server-url URL] [--auth-type TYPE]
                 [--token TOKEN] [--workspace WS]
```

| Option              | Description                                                                                                                                                                                            |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `--connection CONN` | Name or ID to assign to this connection. Used to identify it in `plane auth list-connections` and to reference it with `--connection` in other commands. If omitted, a name is prompted interactively. |
| `--server-url URL`  | Base URL of the Plane API. Defaults to `https://api.plane.so`. Set this to your instance URL when using a self-hosted deployment.                                                                      |
| `--auth-type TYPE`  | Token type. `pat` for a Personal Access Token scoped to a user. `workspace` for a workspace-scoped token.                                                                                              |
| `--token TOKEN`     | The API token value.                                                                                                                                                                                   |
| `--workspace WS`    | Workspace slug to associate with this connection. The association is stored so that commands can resolve credentials from `plane.yaml` automatically.                                                  |

---

#### `plane auth logout`

Removes a stored connection and all its associated workspace links from `~/.config/plane-compose/config.json`. This operation is irreversible without re-authenticating.

```
plane auth logout CONNECTION_ID [--force]
```

| Option          | Description                                                                |
| --------------- | -------------------------------------------------------------------------- |
| `CONNECTION_ID` | ID of the connection to remove, as shown by `plane auth list-connections`. |
| `--force`       | Skips the confirmation prompt before deletion.                             |

---

#### `plane auth list-connections`

Prints all stored connections with their server URL, auth type, and linked workspaces. The default workspace is marked with ★. Aliases: `whoami`, `connections`, `list`.

```
plane auth list-connections
```

---

#### `plane auth connect-workspace`

Associates a workspace slug with an existing connection. After this, any command targeting that workspace will use the specified connection's credentials without requiring an explicit `--connection` flag.

```
plane auth connect-workspace WORKSPACE_SLUG --connection CONN_ID
```

| Option                 | Description                                   |
| ---------------------- | --------------------------------------------- |
| `WORKSPACE_SLUG`       | The Plane workspace slug to link.             |
| `--connection CONN_ID` | ID of the connection to link it to. Required. |

---

#### `plane auth disconnect-workspace`

Removes the association between a workspace slug and a connection. After this, commands targeting that workspace will require an explicit `--connection` flag or re-authentication.

```
plane auth disconnect-workspace WORKSPACE_SLUG [--connection CONN_ID]
```

| Option                 | Description                                                                                                                                      |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `WORKSPACE_SLUG`       | The workspace slug to unlink.                                                                                                                    |
| `--connection CONN_ID` | ID of the connection to unlink from. If omitted and the workspace has only one associated connection, that connection is unlinked automatically. |

---

#### `plane schema validate`

Checks all schema files in the project for structural errors, unknown field types, missing required fields, and invalid references. Runs entirely offline - no API connection is made. Exits with a non-zero code if any errors are found.

```
plane schema validate [PROJECT] [--path PATH]
```

| Option        | Description                                                  |
| ------------- | ------------------------------------------------------------ |
| `PROJECT`     | Project key or directory. Defaults to the current directory. |
| `--path PATH` | Explicit filesystem path to the project root.                |

---

#### `plane schema push`

Pushes local schema files to Plane. Creates the project in Plane if it does not already exist. Applies changes to work item types, states, workflows, and labels in the order required by the Plane API. On first push, writes the project UUID back into `plane.yaml`. Updates `.plane/state.json` with remote ID mappings for all pushed schema items.

```
plane schema push [PROJECT] [--path PATH] [--dry-run] [--force]
```

| Option        | Description                                                                                     |
| ------------- | ----------------------------------------------------------------------------------------------- |
| `PROJECT`     | Project key or directory. Defaults to the current directory.                                    |
| `--path PATH` | Explicit filesystem path to the project root.                                                   |
| `--dry-run`   | Computes and displays the full change plan without making any API calls or modifying any files. |
| `--force`     | Skips the interactive confirmation prompt before applying changes.                              |

---

#### `plane schema import`

Reads the current schema from the Plane remote and reconciles it with local files. Without flags, only `.plane/state.json` is updated - no YAML files are modified. This is the safe mode for reconnecting local names to remote IDs after out-of-band changes.

```
plane schema import [PROJECT] [--path PATH] [--merge] [--force]
```

| Option        | Description                                                                                                                                        |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `PROJECT`     | Project key or directory. Defaults to the current directory.                                                                                       |
| `--path PATH` | Explicit filesystem path to the project root.                                                                                                      |
| `--merge`     | Writes remote schema items that are absent from local files into the appropriate YAML files. Existing local items are not modified. Additive only. |
| `--force`     | Replaces the contents of local schema files entirely with what is returned from the Plane API. Any local-only items are lost.                      |

---

#### `plane schema diff`

Fetches the current schema from Plane and compares it to local schema files. Prints a structured diff showing which types, states, workflows, and labels differ. Makes no changes to local files or the remote.

```
plane schema diff [PROJECT] [--path PATH]
```

| Option        | Description                                                  |
| ------------- | ------------------------------------------------------------ |
| `PROJECT`     | Project key or directory. Defaults to the current directory. |
| `--path PATH` | Explicit filesystem path to the project root.                |

---

#### `plane push`

Pushes schema and work data to Plane in dependency order: schema first (types, states, workflows, labels), then work items, then cycles and modules, then milestones. Skips items whose content hash matches the hash stored in `.plane/state.json`. Updates state after each successful push. If the schema push fails, work data push does not proceed.

```
plane push [PROJECT] [--path PATH] [--connection CONN]
           [--dry-run] [--force] [--schema-only] [--work-only]
           [--skip SECTION] [--all] [--workspace WS] [--filter PATTERN]
           [--no-conflict-check] [--exit-code] [--resume]
```

| Option                | Description                                                                                                                                                        |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `PROJECT`             | Project key or directory. Defaults to the current directory.                                                                                                       |
| `--path PATH`         | Explicit filesystem path to the project root.                                                                                                                      |
| `--connection CONN`   | Overrides the connection resolved from `plane.yaml` for this invocation only.                                                                                      |
| `--dry-run`           | Computes and displays the full change plan without making any API calls or writing to state.                                                                       |
| `--force`             | Skips the interactive confirmation prompt before applying changes.                                                                                                 |
| `--schema-only`       | Pushes only schema files. Equivalent to running `plane schema push`. Skips `workitems`, `cycles`, `modules`, and `milestones`.                                     |
| `--work-only`         | Skips the schema push phase and pushes only work files. Requires schema to already be in sync.                                                                     |
| `--skip SECTION`      | Excludes a specific section from the push. Repeatable. Valid values: `workitems`, `cycles`, `modules`, `milestones`.                                               |
| `--all`               | Discovers all project directories under the current directory and pushes each one.                                                                                 |
| `--workspace WS`      | When used with `--all`, restricts discovery to projects belonging to this workspace.                                                                               |
| `--filter PATTERN`    | When used with `--all`, applies a glob pattern to filter project directory names.                                                                                  |
| `--no-conflict-check` | Skips the pre-push API call that detects remote conflicts. Reduces API usage. Recommended for CI/CD pipelines where conflicts are not expected.                    |
| `--exit-code`         | Returns a differentiated exit code: `0` if no changes were needed, `1` on error, `2` if changes were successfully applied. Useful for scripting and CI gate logic. |
| `--resume`            | Reads the failure log from the previous push and retries only the items that failed. Items that succeeded in the previous run are not re-pushed.                   |

---

#### `plane pull`

Fetches schema and work data from Plane and writes it to local files. Without flags, overwrites local files with remote content after prompting for confirmation. Updates `.plane/state.json` with the latest remote IDs and content hashes.

```
plane pull [PROJECT] [--path PATH] [--connection CONN]
           [--merge] [--force] [--schema-only] [--work-only]
           [--skip SECTION] [--with-properties] [--no-properties]
           [--all] [--workspace WS] [--filter PATTERN]
```

| Option              | Description                                                                                                                         |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `PROJECT`           | Project key or directory. Defaults to the current directory.                                                                        |
| `--path PATH`       | Explicit filesystem path to the project root.                                                                                       |
| `--connection CONN` | Overrides the connection resolved from `plane.yaml` for this invocation only.                                                       |
| `--merge`           | Applies remote changes to local files while preserving items that exist locally but not remotely. Local-only items are not deleted. |
| `--force`           | Overwrites local files with remote content without prompting. Local-only items are lost.                                            |
| `--schema-only`     | Pulls only schema files. Skips `workitems`, `cycles`, `modules`, and `milestones`.                                                  |
| `--work-only`       | Pulls only work files. Skips schema.                                                                                                |
| `--skip SECTION`    | Excludes a specific section from the pull. Repeatable. Valid values: `workitems`, `cycles`, `modules`, `milestones`.                |
| `--with-properties` | Includes custom property values in the pulled work items. Enabled by default.                                                       |
| `--no-properties`   | Excludes custom property values from pulled work items. The `properties` map is omitted from each work item in the output file.     |
| `--all`             | Discovers all project directories under the current directory and pulls each one.                                                   |
| `--workspace WS`    | When used with `--all`, restricts discovery to projects belonging to this workspace.                                                |
| `--filter PATTERN`  | When used with `--all`, applies a glob pattern to filter project directory names.                                                   |

---

#### `plane clone`

Downloads a complete Plane project - including `plane.yaml`, all schema files, and all work files - into a new local directory. Initialises `.plane/state.json` with the remote IDs of all cloned items. The project must already exist in Plane.

```
plane clone PROJECT [--directory DIR] [--path PATH]
            [--workspace WS] [--connection CONN]
            [--schema-only] [--skip SECTION] [--with-properties]
```

| Option              | Description                                                                                                                                                         |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `PROJECT`           | Project identifier. Accepts three formats: `workspace/KEY` shorthand (e.g. `myteam/API`), a project key with `--workspace` flag, or a UUID with `--workspace` flag. |
| `--directory DIR`   | Name of the local directory to create. Defaults to the project key.                                                                                                 |
| `--path PATH`       | Parent directory in which to create the project folder. Defaults to the current working directory.                                                                  |
| `--workspace WS`    | Workspace slug. Required when `PROJECT` is a key or UUID rather than a shorthand.                                                                                   |
| `--connection CONN` | Overrides the connection resolved from the workspace for this invocation only.                                                                                      |
| `--schema-only`     | Downloads schema files only. Skips `workitems`, `cycles`, `modules`, and `milestones`.                                                                              |
| `--skip SECTION`    | Excludes a specific section from the clone. Repeatable. Valid values: `workitems`, `cycles`, `modules`, `milestones`.                                               |
| `--with-properties` | Includes custom property values in the cloned work items. Enabled by default.                                                                                       |

---

#### `plane diff`

Fetches work items from Plane and compares them to local work files. Classifies each item into one of six categories and prints a structured report. Makes no changes to local files or the remote.

```
plane diff [PROJECT] [--path PATH] [--connection CONN]
```

| Option              | Description                                                                   |
| ------------------- | ----------------------------------------------------------------------------- |
| `PROJECT`           | Project key or directory. Defaults to the current directory.                  |
| `--path PATH`       | Explicit filesystem path to the project root.                                 |
| `--connection CONN` | Overrides the connection resolved from `plane.yaml` for this invocation only. |

**Output categories:**

| Category          | Meaning                                                                                          |
| ----------------- | ------------------------------------------------------------------------------------------------ |
| `new_local`       | Item exists in local files but has no corresponding remote record.                               |
| `modified_local`  | Item exists both locally and remotely, and the local version differs from the remote.            |
| `modified_remote` | Item exists both locally and remotely, and the remote version differs from what was last synced. |
| `conflicts`       | Item has been modified both locally and remotely since the last sync.                            |
| `in_sync`         | Local and remote versions are identical.                                                         |
| `deleted_remote`  | Item has been deleted from Plane but still exists in local files.                                |

---

#### `plane validate`

Validates work item files against the project schema. Checks for unknown type names, unknown state names, unknown label names, invalid priority values, duplicate `id` values, malformed dates, and missing required fields. By default, fetches the current schema from Plane to validate against. Exits with a non-zero code if any errors are found.

```
plane validate [PATH] [--offline] [--json]
```

| Option      | Description                                                                                                 |
| ----------- | ----------------------------------------------------------------------------------------------------------- |
| `PATH`      | Filesystem path to the project root. Defaults to the current directory.                                     |
| `--offline` | Skips the API call to fetch the remote schema. Validates only against local schema files.                   |
| `--json`    | Outputs validation errors as a JSON array instead of formatted text. Useful for scripting and CI pipelines. |

---

#### `plane status`

Reads `.plane/state.json` and the local work files to produce a summary of the project's sync state: schema sync status, number of work items pending push, number of items in sync, and the timestamp of the last successful push. Does not make any API calls.

```
plane status [PATH] [--all] [--workspace WS] [--filter PATTERN] [--json]
```

| Option             | Description                                                                                |
| ------------------ | ------------------------------------------------------------------------------------------ |
| `PATH`             | Filesystem path to the project root. Defaults to the current directory.                    |
| `--all`            | Discovers all project directories under the current directory and reports status for each. |
| `--workspace WS`   | When used with `--all`, restricts discovery to projects belonging to this workspace.       |
| `--filter PATTERN` | When used with `--all`, applies a glob pattern to filter project directory names.          |
| `--json`           | Outputs the status report as JSON.                                                         |

---

#### `plane upgrade`

Applies a template to an existing project's schema. Pulls the latest schema from Plane first (unless `--skip-pull` is set), then computes a three-way merge between the current local schema, the current remote schema, and the template. Items present only in the template are added. Items in conflict between template and local are resolved in favour of the template. Items present only locally are preserved. Presents a plan before applying.

```
plane upgrade [PROJECT] --template TEMPLATE [--path PATH]
              [--include-data] [--dry-run] [--force]
              [--skip-pull] [--schema-only]
```

| Option                | Description                                                                                                                  |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `PROJECT`             | Project key or directory. Defaults to the current directory.                                                                 |
| `--template TEMPLATE` | Template source. Required. Accepts a built-in name, a local path, a Git HTTPS URL, or a Git SSH URL.                         |
| `--path PATH`         | Explicit filesystem path to the project root.                                                                                |
| `--include-data`      | Also copies cycles, modules, and work items from the template into the local work files.                                     |
| `--dry-run`           | Computes and displays the upgrade plan without modifying any files or making any API calls.                                  |
| `--force`             | Skips the interactive confirmation prompt before applying the upgrade.                                                       |
| `--skip-pull`         | Skips pulling the latest schema from Plane before computing the merge. Uses the current local schema as the base.            |
| `--schema-only`       | Applies only schema changes from the template. Does not copy cycles, modules, or work items even if `--include-data` is set. |

---

#### `plane state show`

Prints the contents of `.plane/state.json` as a structured report showing remote ID mappings and content hashes for schema items and work items. Makes no API calls.

```
plane state show [PROJECT] [--path PATH] [--json]
```

| Option        | Description                                                  |
| ------------- | ------------------------------------------------------------ |
| `PROJECT`     | Project key or directory. Defaults to the current directory. |
| `--path PATH` | Explicit filesystem path to the project root.                |
| `--json`      | Outputs the state as raw JSON.                               |

---

#### `plane state reset`

Clears all entries from `.plane/state.json`. After a reset, the next `plane push` treats every local item as new and attempts to create it in Plane. Use with caution - this can result in duplicate remote items if the project already exists in Plane.

```
plane state reset [PROJECT] [--path PATH] [--force]
```

| Option        | Description                                                  |
| ------------- | ------------------------------------------------------------ |
| `PROJECT`     | Project key or directory. Defaults to the current directory. |
| `--path PATH` | Explicit filesystem path to the project root.                |
| `--force`     | Skips the confirmation prompt.                               |

---

#### `plane state clear-items`

Removes only the `work_items` section of `.plane/state.json`, leaving schema state intact. The next `plane push` re-pushes all work items as if they are new, but schema items are not affected.

```
plane state clear-items [PROJECT] [--path PATH] [--force]
```

| Option        | Description                                                  |
| ------------- | ------------------------------------------------------------ |
| `PROJECT`     | Project key or directory. Defaults to the current directory. |
| `--path PATH` | Explicit filesystem path to the project root.                |
| `--force`     | Skips the confirmation prompt.                               |

---

#### `plane state remove`

Removes a single entry from `.plane/state.json` identified by a dot-separated path. On the next push, the removed item is treated as new.

```
plane state remove PATH_STR [PROJECT] [--path PATH]
```

| Option        | Description                                                                                                                                                                                                  |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `PATH_STR`    | Dot-separated path into the state object. For example: `types.Story` removes the Story type mapping; `states.Done` removes the Done state mapping; `work_items.AUTH-1` removes a specific work item mapping. |
| `PROJECT`     | Project key or directory. Defaults to the current directory.                                                                                                                                                 |
| `--path PATH` | Explicit filesystem path to the project root.                                                                                                                                                                |

---

#### `plane ws clone`

Downloads workspace-level configuration - including `workspace.yaml`, workspace schema files, and member data - into a new local directory. Initialises `.plane/state.json` with remote ID mappings.

```
plane ws clone WORKSPACE [--directory DIR] [--path PATH]
               [--connection CONN] [--force] [--skip SECTION]
```

| Option              | Description                                                                           |
| ------------------- | ------------------------------------------------------------------------------------- |
| `WORKSPACE`         | Workspace slug to clone.                                                              |
| `--directory DIR`   | Name of the local directory to create. Defaults to the workspace slug.                |
| `--path PATH`       | Parent directory for the workspace folder. Defaults to the current working directory. |
| `--connection CONN` | Overrides the connection resolved from the workspace slug for this invocation only.   |
| `--force`           | Overwrites an existing local directory without prompting.                             |
| `--skip SECTION`    | Excludes a section from the clone. Valid values: `releases`.                          |

---

#### `plane ws pull`

Fetches workspace-level configuration from Plane and writes it to local workspace files. Behaviour with respect to local content is controlled by `--merge` and `--force`, identical in semantics to `plane pull`.

```
plane ws pull [WORKSPACE] [--path PATH] [--merge] [--force] [--skip SECTION]
```

| Option           | Description                                                                              |
| ---------------- | ---------------------------------------------------------------------------------------- |
| `WORKSPACE`      | Workspace slug. Defaults to the value in `workspace.yaml`.                               |
| `--path PATH`    | Explicit filesystem path to the workspace root.                                          |
| `--merge`        | Preserves local-only items while applying remote changes.                                |
| `--force`        | Overwrites local files with remote content without prompting. Local-only items are lost. |
| `--skip SECTION` | Excludes a section from the pull. Valid values: `releases`.                              |

---

#### `plane ws push`

Pushes local workspace configuration files to Plane. Updates `.plane/state.json` with remote ID mappings for all pushed items.

```
plane ws push [WORKSPACE] [--path PATH] [--dry-run] [--force]
```

| Option        | Description                                                         |
| ------------- | ------------------------------------------------------------------- |
| `WORKSPACE`   | Workspace slug. Defaults to the value in `workspace.yaml`.          |
| `--path PATH` | Explicit filesystem path to the workspace root.                     |
| `--dry-run`   | Computes and displays the change plan without making any API calls. |
| `--force`     | Skips the interactive confirmation prompt.                          |

---

#### `plane ws diff`

Fetches workspace configuration from Plane and compares it to local workspace files. Prints a structured diff. Makes no changes.

```
plane ws diff [WORKSPACE] [--path PATH]
```

| Option        | Description                                                |
| ------------- | ---------------------------------------------------------- |
| `WORKSPACE`   | Workspace slug. Defaults to the value in `workspace.yaml`. |
| `--path PATH` | Explicit filesystem path to the workspace root.            |

---

#### `plane ws upgrade`

Applies a template to an existing workspace's schema. Follows the same merge logic as `plane upgrade`.

```
plane ws upgrade [WORKSPACE] [--path PATH] [--template TEMPLATE]
                 [--dry-run] [--force] [--skip-pull] [--schema-only]
```

| Option                | Description                                                                          |
| --------------------- | ------------------------------------------------------------------------------------ |
| `WORKSPACE`           | Workspace slug. Defaults to the value in `workspace.yaml`.                           |
| `--path PATH`         | Explicit filesystem path to the workspace root.                                      |
| `--template TEMPLATE` | Template source. Accepts a built-in name, local path, Git HTTPS URL, or Git SSH URL. |
| `--dry-run`           | Displays the upgrade plan without applying it.                                       |
| `--force`             | Skips the confirmation prompt.                                                       |
| `--skip-pull`         | Skips pulling the latest workspace schema from Plane before computing the merge.     |
| `--schema-only`       | Applies only schema changes. Does not copy data from the template.                   |

---

#### `plane ws state show / reset / clear / remove`

Manage workspace sync state in `.plane/state.json` within the workspace directory. Semantics are identical to their project-level equivalents.

```
plane ws state show [WORKSPACE] [--path PATH] [--json]
plane ws state reset [WORKSPACE] [--path PATH] [--force]
plane ws state clear [WORKSPACE] [--path PATH] [--force]
plane ws state remove PATH_STR [WORKSPACE] [--path PATH]
```

`PATH_STR` examples for workspace state: `workitemtypes.types.Task`, `members.dev@example.com`, `releases.tags.v1.0`.

---

#### `plane rate stats`

Prints the current rate limit window statistics: total requests made, requests remaining, and the time until the window resets. Reads from local counters; does not make an API call.

```
plane rate stats
```

---

#### `plane rate reset`

Resets the local rate limit counters to zero. Does not affect Plane's server-side rate limiting.

```
plane rate reset
```

---

#### Global options

These options are accepted by every `plane` command.

| Option            | Description                                                                                  |
| ----------------- | -------------------------------------------------------------------------------------------- |
| `--version`, `-V` | Prints the installed version of Plane Compose and exits.                                     |
| `--verbose`, `-v` | Enables verbose output. Prints additional detail about each operation as it runs.            |
| `--debug`         | Enables debug-level logging. Writes a structured log to `~/.config/plane-compose/plane.log`. |

---

### Configuration files

#### Project directory structure

```
<project>/
├── plane.yaml
├── schema/
│   ├── types.yaml
│   ├── states.yaml
│   ├── workflows.yaml
│   ├── labels.yaml
│   ├── features.yaml
│   ├── members.yaml             # populated on pull; read-only
│   ├── workitem_templates.yaml  # populated on pull
│   └── page_templates.yaml      # populated on pull
├── work/
│   ├── workitems.yaml
│   ├── cycles.yaml
│   ├── modules.yaml
│   └── milestones.yaml
├── .plane/
│   ├── state.json               # sync state; do not edit manually
│   └── .state.lock              # held during active sync operations
└── .gitignore
```

Workspace directory (created by `plane ws clone`):

```
<workspace>/
├── workspace.yaml
├── schema/
│   └── workitem_types.yaml      # workspace-level WIT definitions (Enterprise)
└── .plane/
    └── state.json
```

---

#### `plane.yaml`

The primary configuration file for a project. Identifies the project, specifies the workspace and connection, and sets defaults used when work item fields are omitted.

| Field                 | Type   | Description                                                                                                                                                 |
| --------------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `type`                | string | Always `project`. Identifies this directory as a project as opposed to a workspace.                                                                         |
| `workspace`           | string | Slug of the Plane workspace this project belongs to. Used to resolve the correct connection from `~/.config/plane-compose/config.json`.                     |
| `connection`          | string | Optional. ID of a specific connection to use for all operations on this project. Overrides the workspace-to-connection mapping.                             |
| `project.key`         | string | Short project identifier, maximum 10 uppercase characters. Used as the prefix in work item sequence IDs (e.g. `API-42`).                                    |
| `project.name`        | string | Human-readable project name as displayed in Plane.                                                                                                          |
| `project.uuid`        | string | Remote UUID of the project. Populated automatically after the first `plane schema push`. Do not set manually.                                               |
| `project.description` | string | Optional project description as displayed in Plane.                                                                                                         |
| `project.network`     | string | Visibility setting. `public` makes the project visible to all workspace members. `private` restricts visibility. Defaults to `public`.                      |
| `project.timezone`    | string | IANA timezone string (e.g. `UTC`, `America/New_York`). Affects due date display and cycle date calculations in Plane.                                       |
| `defaults.type`       | string | Default work item type applied when a work item in `work/workitems.yaml` does not specify a `type` field. Must match a key in `schema/types.yaml`.          |
| `defaults.workflow`   | string | Default workflow applied when a work item type does not specify one. Must match a key in `schema/workflows.yaml`.                                           |
| `template`            | string | Source of the template used during `plane init` or `plane upgrade`. Written automatically; used by `plane upgrade` to know where to pull the template from. |

```yaml
type: project
workspace: myteam
connection: conn-1
project:
  key: API
  name: API Project
  uuid: abc-123-def-456
  description: ""
  network: public
  timezone: UTC
defaults:
  type: Story
  workflow: default
template: default
```

---

#### `workspace.yaml`

The configuration file for a workspace directory created by `plane ws clone`. Identifies the workspace and connection, and contains workspace-level member data.

| Field                    | Type   | Description                                                                                                     |
| ------------------------ | ------ | --------------------------------------------------------------------------------------------------------------- |
| `workspace`              | string | Slug of the Plane workspace. Used to resolve the correct connection from `~/.config/plane-compose/config.json`. |
| `connection`             | string | Optional. ID of a specific connection to pin to this workspace directory.                                       |
| `workspace_features`     | map    | Optional. Workspace-level feature flag overrides. Keys are feature names; values are `true` or `false`.         |
| `members`                | list   | Workspace members. Populated automatically on `plane ws pull`. Read-only - do not edit manually.                |
| `members[].id`           | string | Remote UUID of the member.                                                                                      |
| `members[].email`        | string | Email address of the member.                                                                                    |
| `members[].display_name` | string | Display name of the member as shown in Plane.                                                                   |

```yaml
workspace: myteam
connection: conn-1
workspace_features:
  epics: true
members:
  - id: abc-123
    email: dev@example.com
    display_name: Dev User
```

---

#### `schema/types.yaml`

Defines the work item types available in the project. Each key is the type name. Types control which workflow applies, whether the type can act as an parent, its icon in the Plane UI, and which custom properties are attached.

| Field                         | Type    | Description                                                                                                                                                              |
| ----------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `<TypeName>`                  | map     | Top-level key is the type name as referenced in work items and workflows.                                                                                                |
| `description`                 | string  | Human-readable description of the type, displayed in the Plane UI.                                                                                                       |
| `workflow`                    | string  | Name of the workflow from `schema/workflows.yaml` that governs state transitions for this type.                                                                          |
| `is_epic`                     | boolean | When `true`, work items of this type can act as parents for other work items, enabling hierarchy. Defaults to `false`. Requires `epics: true` in `schema/features.yaml`. |
| `logo_props.icon`             | string  | Name of the icon displayed for this type in the Plane UI.                                                                                                                |
| `logo_props.background_color` | string  | Hex colour string for the icon background (e.g. `#6366f1`).                                                                                                              |
| `properties`                  | list    | List of custom property definitions attached to this type.                                                                                                               |
| `properties[].name`           | string  | Property name as displayed in the Plane UI and as the key in work item `properties` maps.                                                                                |
| `properties[].type`           | string  | Data type of the property. See property type table below.                                                                                                                |
| `properties[].required`       | boolean | When `true`, the property must have a value before a work item of this type can be marked as done.                                                                       |
| `properties[].options`        | list    | List of option strings. Required when `type` is `option`.                                                                                                                |
| `properties[].is_multi`       | boolean | When `true` and `type` is `option`, the property accepts multiple selected values. Defaults to `false`.                                                                  |

**Property types:**

| Type             | Description                                       | Notes                                                                          |
| ---------------- | ------------------------------------------------- | ------------------------------------------------------------------------------ |
| `text`           | Single or multi-line text input.                  | Alias: `string`.                                                               |
| `number`         | Integer numeric value.                            |                                                                                |
| `decimal`        | Floating-point numeric value.                     |                                                                                |
| `date`           | Calendar date in `YYYY-MM-DD` format.             |                                                                                |
| `datetime`       | Date and time in ISO 8601 format.                 |                                                                                |
| `option`         | Dropdown selector, single or multi-select.        | Alias: `enum`. Requires `options` list. Add `is_multi: true` for multi-select. |
| `boolean`        | True/false checkbox.                              |                                                                                |
| `url`            | URL string with validation.                       |                                                                                |
| `email`          | Email address string with validation.             |                                                                                |
| `member_picker`  | Reference to one or more Plane workspace members. |                                                                                |
| `relation`       | Reference to another work item or user.           | Set `relation_type: user` or `relation_type: issue`.                           |
| `release_picker` | Reference to a Plane release tag.                 | Populated on pull; push is blocked by the Plane API. Read-only in practice.    |
| `file`           | File attachment reference.                        |                                                                                |
| `formula`        | Computed value derived from other fields.         | Push not yet supported.                                                        |

```yaml
work_item_types:
  Story:
    description: A unit of user-facing work
    workflow: default
    is_epic: false
    logo_props:
      icon: bookmark
      background_color: "#6366f1"
    properties:
      - name: Severity
        type: option
        required: false
        options:
          - Minor
          - Major
          - Critical
        is_multi: false
  Bug:
    description: A defect requiring correction
    workflow: default
    properties:
      - name: Reproducible
        type: boolean
        required: true
```

---

#### `schema/states.yaml`

Defines the states available in the project. Each key is the state name as referenced in work items and workflows. States are grouped into one of five standard Plane groups that determine how Plane treats them in reporting and cycle calculations.

| Field                  | Type    | Description                                                                                                                                                                     |
| ---------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<StateName>`          | map     | Top-level key is the state name, referenced in `work/workitems.yaml` and `schema/workflows.yaml`.                                                                               |
| `group`                | string  | Functional category of the state. One of: `backlog`, `unstarted`, `started`, `completed`, `cancelled`. Determines how Plane aggregates and reports on work items in this state. |
| `color`                | string  | Hex colour string used to represent this state in the Plane UI (e.g. `#22c55e`).                                                                                                |
| `allow_issue_creation` | boolean | When `true`, new work items can be created directly in this state. Defaults to `true`.                                                                                          |
| `is_default`           | boolean | When `true`, this state is assigned to new work items that do not specify a state. Only one state per project should have `is_default: true`.                                   |

```yaml
states:
  Backlog:
    group: backlog
    color: "#858585"
    allow_issue_creation: true
    is_default: true
  Todo:
    group: unstarted
    color: "#d1d5db"
  In Progress:
    group: started
    color: "#f59e0b"
  Done:
    group: completed
    color: "#22c55e"
  Cancelled:
    group: cancelled
    color: "#ef4444"
```

---

#### `schema/workflows.yaml`

Defines the workflows available in the project. Each workflow associates a set of states with a set of work item types and optionally restricts which state transitions are permitted. When no transitions are defined, any state change is allowed.

| Field                                      | Type    | Description                                                                                                                                                                                                     |
| ------------------------------------------ | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<WorkflowName>`                           | map     | Top-level key is the workflow name, referenced from `schema/types.yaml` and `plane.yaml`.                                                                                                                       |
| `description`                              | string  | Human-readable description of the workflow.                                                                                                                                                                     |
| `is_active`                                | boolean | When `false`, the workflow is defined but not enforced by Plane.                                                                                                                                                |
| `work_item_types`                          | list    | Names of work item types from `schema/types.yaml` that this workflow governs.                                                                                                                                   |
| `states`                                   | list    | Names of states from `schema/states.yaml` that are valid within this workflow.                                                                                                                                  |
| `transitions`                              | map     | Optional. Defines which state transitions are permitted. Keys are source state names; values are lists of allowed target transitions. When absent, all transitions between the workflow's states are permitted. |
| `transitions.<State>[].to`                 | string  | Name of the target state for this transition. Must be in the workflow's `states` list.                                                                                                                          |
| `transitions.<State>[].type`               | string  | `transition` for a direct state change. `approval` for a change that requires approval before completing.                                                                                                       |
| `transitions.<State>[].required_approvals` | integer | For `approval` type only. Number of approvers required. `null` means all listed approvers must approve.                                                                                                         |
| `transitions.<State>[].approvers`          | list    | For `approval` type only. Email addresses of Plane members who can approve the transition.                                                                                                                      |

```yaml
workflows:
  default:
    description: Standard engineering workflow
    is_active: true
    work_item_types:
      - Story
      - Bug
    states:
      - Backlog
      - Todo
      - In Progress
      - Done
    transitions:
      Todo:
        - to: In Progress
          type: transition
      In Progress:
        - to: Done
          type: approval
          required_approvals: 1
          approvers:
            - lead@example.com
        - to: Todo
          type: transition
```

---

#### `schema/labels.yaml`

Defines the labels available in the project. Labels are flat - no nesting. Each entry in the list defines one label.

| Field   | Type   | Description                                                                                  |
| ------- | ------ | -------------------------------------------------------------------------------------------- |
| `name`  | string | Label name as referenced in work item `labels` lists.                                        |
| `color` | string | Hex colour string used to render the label chip in the Plane UI.                             |
| `id`    | string | Remote UUID of the label. Populated automatically after the first push. Do not set manually. |

```yaml
labels:
  - name: backend
    color: "#3b82f6"
  - name: frontend
    color: "#8b5cf6"
  - name: infrastructure
    color: "#10b981"
```

---

#### `schema/features.yaml`

Controls which Plane features are enabled for the project. Disabling a feature hides it from the Plane UI and prevents Plane Compose from pushing or pulling data for that section.

| Field             | Type    | Description                                                                                          |
| ----------------- | ------- | ---------------------------------------------------------------------------------------------------- |
| `cycles`          | boolean | Enables time-boxed sprint cycles. When `false`, `work/cycles.yaml` is ignored on push and pull.      |
| `modules`         | boolean | Enables modules for grouping work by feature area. When `false`, `work/modules.yaml` is ignored.     |
| `pages`           | boolean | Enables wiki-style pages within the project.                                                         |
| `views`           | boolean | Enables saved filtered views.                                                                        |
| `intakes`         | boolean | Enables a public intake form for submitting work items from outside the workspace.                   |
| `epics`           | boolean | Enables work item hierarchy. Requires at least one type with `is_epic: true` in `schema/types.yaml`. |
| `work_item_types` | boolean | Enables custom work item types. When `false`, Plane uses only the default type.                      |
| `workflows`       | boolean | Enables custom workflow enforcement. When `false`, state transitions are unrestricted.               |
| `parallel_cycles` | boolean | Allows multiple active cycles to run simultaneously.                                                 |
| `project_updates` | boolean | Enables the project updates feed.                                                                    |

```yaml
features:
  cycles: true
  modules: true
  pages: true
  views: true
  intakes: false
  epics: true
  work_item_types: true
  workflows: true
  parallel_cycles: false
  project_updates: false
```

---

#### `work/workitems.yaml`

Defines the work items to be synced to Plane. Contains a single top-level `workitems` key whose value is a list. Each list entry represents one work item.

| Field          | Type   | Required    | Description                                                                                                                                                                                                                                                                                      |
| -------------- | ------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `id`           | string | Recommended | Stable local identifier chosen by the author. Used as the tracking key in `.plane/state.json`. If omitted, Plane Compose derives the key from a hash of the item's content - title or description changes will then generate a new key and cause a duplicate to be created instead of an update. |
| `title`        | string | Yes         | Work item title as displayed in Plane.                                                                                                                                                                                                                                                           |
| `type`         | string | No          | Name of the work item type from `schema/types.yaml`. Defaults to `defaults.type` in `plane.yaml`.                                                                                                                                                                                                |
| `state`        | string | No          | Name of the state from `schema/states.yaml`. Defaults to the state with `is_default: true`.                                                                                                                                                                                                      |
| `priority`     | string | No          | Priority level. One of: `urgent`, `high`, `medium`, `low`, `none`. Defaults to `none`.                                                                                                                                                                                                           |
| `labels`       | list   | No          | List of label names from `schema/labels.yaml`.                                                                                                                                                                                                                                                   |
| `assignees`    | list   | No          | List of email addresses of Plane workspace members to assign to this work item.                                                                                                                                                                                                                  |
| `watchers`     | list   | No          | List of email addresses of Plane workspace members who receive notifications for this work item.                                                                                                                                                                                                 |
| `start_date`   | string | No          | Planned start date in `YYYY-MM-DD` format.                                                                                                                                                                                                                                                       |
| `due_date`     | string | No          | Planned due date in `YYYY-MM-DD` format.                                                                                                                                                                                                                                                         |
| `description`  | string | No          | Full description in Markdown format.                                                                                                                                                                                                                                                             |
| `parent`       | string | No          | Sequence ID of the parent work item (e.g. `API-5`). Requires `epics: true` in `schema/features.yaml` and a type with `is_epic: true`.                                                                                                                                                            |
| `blocked_by`   | list   | No          | List of sequence IDs of work items that must be completed before this one can begin.                                                                                                                                                                                                             |
| `blocking`     | list   | No          | List of sequence IDs of work items that cannot begin until this one is completed.                                                                                                                                                                                                                |
| `duplicate_of` | string | No          | Sequence ID of the work item this one duplicates.                                                                                                                                                                                                                                                |
| `relates_to`   | list   | No          | List of sequence IDs of work items related to this one without a specific dependency relationship.                                                                                                                                                                                               |
| `properties`   | map    | No          | Custom property values. Keys are property names as defined in the type's `properties` list in `schema/types.yaml`. Values must match the property type.                                                                                                                                          |

```yaml
workitems:
  - id: "auth-oauth"
    title: Implement OAuth2 login
    type: Story
    state: Backlog
    priority: high
    labels:
      - backend
    assignees:
      - dev@example.com
    watchers:
      - pm@example.com
    start_date: "2026-06-01"
    due_date: "2026-06-15"
    description: |
      Add OAuth2 authentication using the provider SDK.
    parent: "API-5"
    blocked_by:
      - "API-3"
    blocking:
      - "API-9"
    properties:
      Severity: Major
```

---

#### `work/cycles.yaml`

Defines time-boxed sprint cycles. The `status` field is computed by Plane based on dates relative to the current time and is read-only - do not set it manually. The `id` field is populated automatically after the first push.

| Field         | Type   | Description                                                                        |
| ------------- | ------ | ---------------------------------------------------------------------------------- |
| `name`        | string | Cycle name as displayed in Plane. Used as the tracking key in state.               |
| `description` | string | Optional description of the cycle's goal or scope.                                 |
| `start_date`  | string | Cycle start date in `YYYY-MM-DD` format.                                           |
| `end_date`    | string | Cycle end date in `YYYY-MM-DD` format.                                             |
| `id`          | string | Remote UUID of the cycle. Populated automatically after push. Do not set manually. |

```yaml
cycles:
  - name: Sprint 1
    description: Foundation sprint
    start_date: "2026-06-01"
    end_date: "2026-06-14"
    id: abc-123
```

---

#### `work/modules.yaml`

Defines modules that group work by feature or initiative. The `status` field is computed by Plane and is read-only. The `id` field is populated automatically after the first push.

| Field         | Type   | Description                                                                         |
| ------------- | ------ | ----------------------------------------------------------------------------------- |
| `name`        | string | Module name as displayed in Plane. Used as the tracking key in state.               |
| `description` | string | Optional description of the module's scope.                                         |
| `start_date`  | string | Module start date in `YYYY-MM-DD` format.                                           |
| `end_date`    | string | Module end date in `YYYY-MM-DD` format.                                             |
| `id`          | string | Remote UUID of the module. Populated automatically after push. Do not set manually. |

```yaml
modules:
  - name: Authentication
    description: All auth-related work items
    start_date: "2026-06-01"
    end_date: "2026-07-01"
    id: abc-123
```

---

#### `work/milestones.yaml`

Defines milestones that mark significant points in the project timeline. The `id` field is populated automatically after the first push.

| Field         | Type   | Description                                                                                                          |
| ------------- | ------ | -------------------------------------------------------------------------------------------------------------------- |
| `name`        | string | Milestone name as displayed in Plane. Used as the tracking key in state. Maps to the `title` field in the Plane API. |
| `target_date` | string | Target completion date in `YYYY-MM-DD` format.                                                                       |
| `work_items`  | list   | List of work item sequence IDs (e.g. `API-1`) to associate with this milestone.                                      |
| `id`          | string | Remote UUID of the milestone. Populated automatically after push. Do not set manually.                               |

```yaml
milestones:
  - name: v1.0 Release
    target_date: "2026-08-01"
    work_items:
      - "API-1"
      - "API-5"
    id: abc-123
```

### Troubleshooting

#### Authentication failed (401)

The stored token is invalid, expired, or has been revoked. Remove the connection and re-authenticate:

```bash
plane auth logout <connection-name>
plane auth login
```

#### Permission denied (403)

The authenticated user does not have access to the requested workspace or project. Verify workspace membership with `plane auth list-connections`. Contact the workspace administrator to request access.

#### Project not found (404)

The `project.uuid` in `plane.yaml` does not correspond to an existing project. This occurs when the project has been deleted from Plane or when `plane.yaml` from one environment is used in another. Remove the `uuid` field from `plane.yaml` and run `plane schema push` to create a new project and update the UUID.

#### Rate limit exceeded (429)

Plane Compose has exceeded the API request limit for the current time window. Run `plane rate stats` to see how many requests remain and when the window resets. To reduce the request rate:

```bash
PLANE_RATE_LIMIT_PER_MINUTE=30 plane push
```

#### Duplicate work items

Work items were pushed without a stable `id` field. When the title or description was subsequently changed, the content hash changed, causing Plane Compose to treat the item as new rather than an update. A second item was created in Plane. To fix: add a stable `id` to the item in the YAML file, remove the old state entry with `plane state remove work_items.<item-id>`, delete the duplicate from Plane manually, then push.

#### State file out of sync or deleted

```bash
plane schema import   # rebuilds schema entries from remote IDs
plane pull            # rebuilds work item entries from remote data
```

#### Push fails partway through

If a push is interrupted before completion, the next `plane push --resume` reads the failure log written during the interrupted run and retries only the items that did not succeed. Items that pushed successfully are not re-pushed.

---

## Explanation

### Why project as code

Project management tools like Plane are rich and powerful, but they have a structural problem: the configuration of a project - its work item types, its workflows, its state definitions - lives exclusively inside the tool. There is no file you can open, no diff you can review, no commit history you can trace. When a workflow changes, you cannot see who changed it, when, or why. When a project template drifts across teams, you have no way to detect it. When you want to spin up a new project that mirrors an existing one, you configure it manually from memory.

Plane Compose addresses this by treating the project as an artifact that lives in your repository. The schema and work items are YAML files. Changes go through pull requests. History is in Git.

### The local-first model

In a bidirectional sync tool, neither side is fully in control - changes can originate anywhere and the tool tries to merge them. This creates ambiguity: if a state is renamed both locally and in the UI at the same time, which one wins? Who is responsible for the project structure?

Plane Compose takes a deliberate position: local files are the source of truth. The Plane remote is the target. You declare what you want; Plane Compose makes it so. Remote changes do not flow back automatically - you pull them deliberately when you choose to accept them, review the diff, and commit.

This asymmetry is a feature, not a limitation. It means the project schema has a single authoritative home: your repository. It means changes are proposed through pull requests, reviewed by teammates, and tracked in Git history. It means a new team member can understand the entire project structure by reading YAML files rather than navigating a UI.

The tradeoff is that Plane Compose requires discipline. If your team routinely reconfigures projects through the Plane UI and rarely pulls those changes back into local files, the local files drift out of date and lose their value as the source of truth. The model works best when local files are treated as the real project definition and the UI is used for day-to-day work on individual items, not for structural changes.

### The connection model

The simplest possible authentication design would be a single API key stored somewhere on disk. Plane Compose uses a more structured model - connections - because a single key assumption breaks quickly in practice.

Different workspaces may require different credentials. A developer might have access to a `myteam` workspace with a personal token and a `client-project` workspace under a separate account. A CI/CD system may use a workspace-scoped service token. A self-hosted Plane instance has a different server URL entirely.

A connection bundles three things: a server URL, an auth type, and a token. Each connection gets a name. Workspaces are then linked to connections, so that when a command reads `workspace: myteam` from `plane.yaml`, it knows which set of credentials to use without you specifying it each time.

This design also separates identity from configuration. `plane.yaml` contains the workspace slug - a human-readable project identity - but not the credentials. The credentials live in `~/.config/plane-compose/config.json`, separate from the repository. You can commit `plane.yaml` to Git without leaking tokens.

### Schema and work as separate concerns

Plane Compose separates project content into two categories with different natures and different lifecycles.

Schema files define _what is possible_: the types of work items that exist, the states they can move through, the labels available, the features enabled. Schema changes infrequently, is owned by leads or architects, and has consequences across the entire project.

Work files define _what is happening_: the actual items, sprints, modules, and milestones. Work changes constantly - every day, by everyone on the team.

This distinction shapes how you use Plane Compose. Schema is the part of the project you want to version-control rigorously, review carefully, and propagate from a template. Work is the part you might generate programmatically, import from another source, or let the team manage through the Plane UI. Some teams commit both to Git. Others commit only schema and treat work items as data managed through Plane directly. Both are valid.

The separation also clarifies the dependency direction: schema must exist before work can be pushed, because work items reference type names, state names, and label names that need to resolve to remote UUIDs. This is why `plane push` always applies schema before work.
