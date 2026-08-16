---
title: LDAP authentication
description: Setup LDAP authentication for Plane. Configure Lightweight Directory Access Protocol for directory-based authentication.
keywords: plane ldap, ldap authentication, active directory, directory service, ldap configuration, enterprise authentication, self-hosting
---

# LDAP authentication <Badge type="warning" text="Enterprise Grid" />

LDAP (Lightweight Directory Access Protocol) authentication lets your team sign in to Plane using their existing corporate credentials. Instead of creating separate Plane passwords, users authenticate through your organization's directory service.

## Before you begin

You'll need:

- Plane Commercial Edition with an active Enterprise Grid license.
  - Don't have an Enterprise license? Contact Sales at [sales@plane.so](mailto:sales@plane.so) to get started.
  - Already have a license? See how to [activate your Enterprise license](/self-hosting/manage/manage-licenses/activate-enterprise).
- Connection details for your LDAP server.
- A service account on your LDAP server with read-only access to the user directory.

## Configure LDAP authentication

1. Sign in to your Plane instance in [God Mode](/self-hosting/govern/instance-admin).
   ![Turn on LDAP](/images/ldap/enable-ldap.webp#hero)
2. Select **Authentication** from the left pane.
3. Click **Configure** next to **LDAP** at the bottom of the page.
4. Enter your LDAP server details.
   ![LDAP configuration](/images/ldap/ldap-configuration.webp#hero)
   - **Server URI (required)**
     This is the address of your LDAP server. Include the protocol and port number.

     **Format:**
     - For unencrypted connections: `ldap://hostname:389`
     - For encrypted connections (recommended): `ldaps://hostname:636`

     **Examples:**

     ```
     ldap://ldap.company.com:389
     ldaps://ad.company.com:636
     ldap://192.168.1.100:389
     ```

   - **Bind DN (required)**

     This is the username of the service account that Plane will use to search your directory. Think of it as Plane's "read-only" account on your LDAP server.

     The format varies depending on your directory service:

     **Active Directory examples:**

     ```
     cn=PlaneService,ou=Service Accounts,dc=company,dc=com
     plane-svc@company.com
     ```

     **OpenLDAP examples:**

     ```
     cn=admin,dc=example,dc=com
     cn=readonly,ou=services,dc=example,dc=com
     ```

   - **Bind Password (required)**

     Enter the password for your service account (Bind DN). Plane encrypts and stores this securely in its database.

   - **User Search Base (required)**

     This defines where in your directory Plane should look for users. Think of it as the "starting folder" for user searches.

     Use the most specific path possible for better performance.

     **Examples:**

     ```
     ou=users,dc=example,dc=com
     ou=employees,ou=people,dc=company,dc=com
     cn=users,dc=company,dc=local
     ```

   - **User Search Filter (optional)**

     This tells Plane how to find users when they try to sign in. Use `{username}` as a placeholder - Plane replaces it with whatever the user types in the login field.

     **Common filters by directory type:**

     | Directory Type   | Filter                           | What it does                     |
     | ---------------- | -------------------------------- | -------------------------------- |
     | OpenLDAP         | `(uid={username})`               | Searches by user ID              |
     | Active Directory | `(sAMAccountName={username})`    | Searches by Windows login name   |
     | Active Directory | `(userPrincipalName={username})` | Searches by email-style username |
     | Any              | `(mail={username})`              | Searches by email address        |

     **Default:** If you don't specify a filter, Plane uses `(uid={username})`.

     **Combined filter example:**\
      If you want users to sign in with either their username OR email:

     ```
     (|(uid={username})(mail={username}))
     ```

   - **User Attributes (optional)**

     List the LDAP attributes Plane should retrieve to create user profiles. Plane uses these to populate the user's display name and email in Plane.

     **How Plane maps attributes:**

     | Plane needs   | LDAP provides (in order of preference)                       |
     | ------------- | ------------------------------------------------------------ |
     | Email address | `mail`, `userPrincipalName`                                  |
     | First name    | `givenName`, or first part of `cn` if `givenName` is missing |
     | Last name     | `sn`, or last part of `cn` if `sn` is missing                |

     **Recommended setting:**

     ```
     mail,cn,givenName,sn,userPrincipalName,displayName
     ```

     **Default:** If you don't specify attributes, Plane uses `mail,cn,givenName,sn`.

   - **Provider Name (optional)**

     This is the label that appears on Plane's login button. Choose something your team will recognize.

     **Examples:**
     - `Corporate Directory`
     - `Company SSO`
     - `Active Directory`

     **Default:** If you don't specify a name, Plane shows `LDAP`.

     The login button will display as: **"Sign in with [Provider Name]"**

5. Click **Save changes** to apply your LDAP settings. Plane will validate the connection to your LDAP server.

6. Users will see **Sign in with LDAP** on Plane's login page and can use their directory credentials to sign in.
   ![Sign in using LDAP](/images/ldap/sign-in-ldap.webp#hero)

## How LDAP authentication works

LDAP authentication in Plane works through a two-phase process. First, Plane locates the user in your directory, then it verifies their credentials. This separation is fundamental to how LDAP works and explains why you need both a service account (Bind DN) and the user's own credentials.

### The service account pattern

Unlike simpler authentication systems where you might directly check a username and password against a database, LDAP uses what's called a "bind" operation. Plane needs to authenticate twice: once as itself (using the Bind DN) to search your directory, and once as the user to verify their password.

This is why you configure a Bind DN and password - it's Plane's identity on your LDAP server. Think of it as Plane introducing itself before asking about your users. The Bind DN only needs read access because Plane is just looking up information, never modifying your directory.

### The authentication flow

When a user tries to sign in, here's what happens behind the scenes:

**Connection and service authentication**  
Plane connects to your LDAP server using the Server URI, then authenticates using the Bind DN credentials. If this fails, no users can sign in; the service account must work first.

**User search**  
Now authenticated, Plane searches for the user starting from the User Search Base and applying the User Search Filter. For example, if a user enters "jsmith" and your filter is `(uid={username})`, Plane searches for `(uid=jsmith)`. The search returns the user's distinguished name (DN), their full path in the directory.

**User authentication**  
Plane now attempts to bind again using the user's DN and their entered password. If the bind succeeds, the password is correct. This is why LDAP authentication is secure. Plane never stores user passwords; they go straight to your LDAP server for verification.

**Profile creation**  
Once authentication succeeds, Plane retrieves the User Attributes you configured (like email, first name, last name) from the user's LDAP record. If this is the user's first time signing in, Plane creates their profile using this information. If they've signed in before, Plane updates their profile with any changes from LDAP.

**Session establishment**  
Finally, Plane creates a session for the user and redirects them into the workspace. From this point on, the user's session works identically to any other Plane session. The LDAP interaction is complete.

### Why search filters matter

The User Search Filter determines sign-in flexibility. A simple filter like `(uid={username})` requires exact usernames, but you can make it more flexible:

`(mail={username})` lets users sign in with email
`(|(uid={username})(mail={username}))` allows either username or email

Filters can also restrict access: `(&(uid={username})(memberOf=cn=plane-users,ou=groups,dc=company,dc=com))` only permits specific group members.

### The role of user attributes

User Attributes tell Plane which LDAP fields to retrieve after authentication. This is separate from the search filter. The filter finds the user, the attributes populate their profile.

Plane specifically looks for email addresses (required) and names (optional). If your LDAP server uses different attribute names, you need to include them.
