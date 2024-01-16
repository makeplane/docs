---
title: Reset password
pageTitle: Reset password | Plane
description: ''
---

Users can reset their password through the terminal of the Plane application. You need to login to backend docker container and run the below command for resetting a user's password.

1.  Get the container id for `plane-backend`

    ```jsx
    docker ps
    ```

2. Log in to the container

    ```jsx
    docker exec -it <container_id> /bin/sh
    ```

3. Run the reset password command

    ```jsx
    python manage.py reset_password <email>
    ```

{% callout type="note" %}
The email should be of an already existing user on the Plane application. If the email is not attached to any user the command will throw an error.
{% /callout %}
