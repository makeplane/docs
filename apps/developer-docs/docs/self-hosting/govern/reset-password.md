---
title: Reset password
description: Reset user and admin passwords for self-hosted Plane. Recover access to your instance using CLI commands or database operations.
keywords: plane password reset, admin password recovery, plane account recovery, self-hosting, plane login issues
---

# Reset password

Users can reset their password through the terminal of the Plane application. You need to login to backend docker container and run the below command for resetting a user’s password.

1. Get the container id for **plane-api**.

```bash
docker ps
```

2. Log in to the container.

```bash
docker exec -it <container_id> /bin/sh
```

3. Run the reset password command.

```bash
 python manage.py reset_password <email>
```

::: tip
The email should be of an already existing user on the Plane application. If the email is not attached to any user the command will throw an error.
:::
