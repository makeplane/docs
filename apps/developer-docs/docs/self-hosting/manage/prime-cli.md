---
title: Command line tools
description: Use Plane Prime CLI for managing your self-hosted instance. Commands for setup, configuration, upgrades, and troubleshooting from the terminal.
keywords: plane cli, prime cli, command line tools, plane management, plane setup commands, self-hosting, plane terminal
---

# Command line tools

Our command-line tool is here to make managing your Plane instance simple. You can handle installs, upgrades, and general management without needing to be a Docker expert.

## Prime CLI <Badge type="info" text="Commercial Edition" /> <Badge type="tip" text="Docker" />

The Prime CLI provides commands for common tasks like configuring services, monitoring health, managing backups, and upgrading your Plane instance.

::: warning
**Prime CLI is for Docker installations only.** These commands only work on Plane instances originally installed using `prime-cli`.
:::

Bring up the Prime CLI with `sudo prime-cli` from any directory on your machine.

- The three operators you will use the most are:
  - `start`
    You will use this to start a service in the Docker network with the name of the service.

  - `stop`
    You will use this to stop a service in the Docker network with the name of the service.

  - `restart`
    You will use this to restart a service in the Docker network with the name of the service as a `{param or flag}`.

- Often, you will want to monitor the health of your instance and see if some services are up or down. Use `monitor` to do that.

- `healthcheck` is another useful utility that lets you see the status and errors, if any, of all running services

- `repair` automatically diagnoses and fixes common errors in your Plane instance. This command also resets all configuration values in the plane.env file to their defaults.

- `update-cli` downloads and installs the latest version of Prime CLI.
  ::: tip
  It is highly recommend to run this first before you download any Plane updates. The latest version of the CLI ensures your Plane upgrades happen smoothly.
  :::

For more advanced admins that want greater control over their instance, the list of additional commands available on Prime CLI follow.

- `configure`
  Brings up a step form to let you specify the following.

::: details Steps to configure your instance

- `Listening port`  
  Specify the port that the built-in reverse proxy will use

  Default value: `80`

- `Max file-upload size`  
  Specify a size in MBs for how big each file uploaded to your Plane app can be

  Default value: `5 MB`

- `External Postgres URL`
  Specify the URL of your own hosted Postgres if you would like to change the database your Plane app uses.

Default database: Postgres 15.5 in the Docker container

- `External Redis URL`
  Specify the URL of your own hosted REdis if you would like to change the default Redis Plane ships with.

Default Redis: Redis 7.2.4

- `External storage`
  Specify your AWS S3 bucket's credentials in the format below to change storage from the default Plane ships with.
- AWS Access Key ID
- AWS Secret Access Key
- AWS S3 Bucket Name

Default storage: MinIO

- Confirm your choices on the screen ↓.
  This restarts your instance with the new configs.
  :::

- `upgrade`

checks your instance for available version upgrades and asks you for a confirmation before downloading the latest available version.

1. Typing `YES` lets the CLI automatically download's the latest version and installs it. Then it restarts the instance to load the latest app.
2. Typing `NO` cancels the upgrade.

- `uninstall`

uninstalls Plane. Before it goes through, it asks you for a confirmation.

1. Typing `YES` lets the CLI clean up the `/opt/plane` folder, leaving behind the `/opt/plane/data` and `/opt/plane/logs` folders.
2. Typing `NO` cancels the uninstall.

::: details Setup.sh script • Community Edition

The setup script `setup.sh` provides a menu-driven interface to help you install and manage your Plane instance.

#### Usage

To run the setup.sh script, use the following command in your terminal from the directory where the script is located:

```bash
./setup.sh
```

This will launch an interactive menu with options to manage various aspects of your Plane instance.

```bash
Select a Action you want to perform:
   1) Install
   2) Start
   3) Stop
   4) Restart
   5) Upgrade
   6) View Logs
   7) Backup Data
   8) Exit
```

#### Actions

- **Install**  
  Installs the Plane Community Edition on your machine. Choose this option if you are setting up Plane for the first time.

- **Start**  
  Starts the Plane server and all related services.

- **Stop**  
  Stops the Plane server and all services currently running on the machine.

- **Restart**  
  Restarts the Plane server and all associated services.

- **Upgrade**
  Upgrades Plane to the latest available version. This will stop all services, update the necessary files, and then restart Plane with the latest configuration. See [Update Plane](/self-hosting/manage/upgrade-plane#prerequisites) for more info.

  > [!WARNING]
  > It's recommended to create a backup before upgrading your instance. See [Backup and restore](/self-hosting/manage/backup-restore#backup-data).

- **View Logs**
  Displays real-time logs of specific Plane services. See [View logs](/self-hosting/manage/view-logs) for more info.

  > [!TIP]
  > Use **View Logs** to monitor service performance or troubleshoot issues. Press `CTRL+C` to exit the log view and return to the main menu.

- **Backup Data**
  Creates a backup of your current Plane installation, including all data. See [Backup and restore data](/self-hosting/manage/backup-restore#backup-data) for more info.

- **Exit**  
  Closes the setup script and returns you to the command line.

:::

## Troubleshoot

- [Failed to update Prime CLI](/self-hosting/troubleshoot/cli-errors#failed-to-update-prime-cli)
