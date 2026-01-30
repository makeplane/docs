---
title: Permissions matrix
description: Manage user roles and permissions in workspaces.
---

# Permissions matrix

Permissions define what actions users can take within a workspace or project.

This reference provides a comprehensive breakdown of what each role can do across workspaces and projects. Use this matrix to understand exact permission boundaries when planning your team structure or troubleshooting access issues.

## Permission levels

<details>
    <summary><b>Workspaces</b></summary>
            <div>
            <table style="width: 100%; display: table; margin-left: 2px">
                <thead>
                    <tr>
                        <th>Permission</th>
                        <th>Admin</th>
                        <th>Member</th>
                        <th>Guest</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td> Access Workspace settings</td>
                        <td align="center"><span style="color: green; font-weight: bold; font-size: 16px">✓</span></td>
                        <td align="center"><span style="color: red; font-weight: bold; font-size: 16px">x</span></td>
                        <td align="center"><span style="color: red; font-weight: bold; font-size: 16px">x</span></td>
                    </tr>  
                    <tr>
                        <td> Create Workspace</td>
                        <td align="center"><span style="color: green; font-weight: bold; font-size: 16px">✓</span></td>
                        <td align="center"><span style="color: red; font-weight: bold; font-size: 16px">x</span></td>
                        <td align="center"><span style="color: red; font-weight: bold; font-size: 16px">x</span></td>
                    </tr>  
                    <tr>
                        <td>Update Workspace</td>
                        <td align="center"><span style="color: green; font-weight: bold; font-size: 16px">✓</span></td>
                        <td align="center"><span style="color: red; font-weight: bold; font-size: 16px">x</span></td>
                        <td align="center"><span style="color: red; font-weight: bold; font-size: 16px">x</span></td>
                    </tr> 
                    <tr>
                        <td>Delete Workspace</td>
                        <td align="center"><span style="color: green; font-weight: bold; font-size: 16px">✓</span></td>
                        <td align="center"><span style="color: red; font-weight: bold; font-size: 16px">x</span></td>
                        <td align="center"><span style="color: red; font-weight: bold; font-size: 16px">x</span></td>
                    </tr> 
                    <tr>
                        <td>Add user</td>
                        <td align="center"><span style="color: green; font-weight: bold; font-size: 16px">✓</span></td>
                        <td align="center"><span style="color: red; font-weight: bold; font-size: 16px">x</span></td>
                        <td align="center"><span style="color: red; font-weight: bold; font-size: 16px">x</span></td>
                    </tr> 
                    <tr>
                        <td>Remove user</td>
                        <td align="center"><span style="color: green; font-weight: bold; font-size: 16px">✓</span></td>
                        <td align="center"><span style="color: red; font-weight: bold; font-size: 16px">x</span></td>
                        <td align="center"><span style="color: red; font-weight: bold; font-size: 16px">x</span></td>
                    </tr> 
                    <tr>
                        <td>Change user role</td>
                        <td align="center"><span style="color: green; font-weight: bold; font-size: 16px">✓</span></td>
                        <td align="center"><span style="color: red; font-weight: bold; font-size: 16px">x</span></td>
                        <td align="center"><span style="color: red; font-weight: bold; font-size: 16px">x</span></td>
                    </tr> 
                    <tr>
                        <td>Manage Project states</td>
                        <td align="center"><span style="color: green; font-weight: bold; font-size: 16px">✓</span></td>
                        <td align="center"><span style="color: red; font-weight: bold; font-size: 16px">x</span></td>
                        <td align="center"><span style="color: red; font-weight: bold; font-size: 16px">x</span></td>
                    </tr> 
                    <tr>
                        <td>Manage Billing and plans</td>
                        <td align="center"><span style="color: green; font-weight: bold; font-size: 16px">✓</span></td>
                        <td align="center"><span style="color: red; font-weight: bold; font-size: 16px">x</span></td>
                        <td align="center"><span style="color: red; font-weight: bold; font-size: 16px">x</span></td>
                    </tr> 
                    <tr>
                        <td>Manage Integrations</td>
                        <td align="center"><span style="color: green; font-weight: bold; font-size: 16px">✓</span></td>
                        <td align="center"><span style="color: red; font-weight: bold; font-size: 16px">x</span></td>
                        <td align="center"><span style="color: red; font-weight: bold; font-size: 16px">x</span></td>
                    </tr> 
                    <tr>
                        <td>Manage Imports</td>
                        <td align="center"><span style="color: green; font-weight: bold; font-size: 16px">✓</span></td>
                        <td align="center"><span style="color: red; font-weight: bold; font-size: 16px">x</span></td>
                        <td align="center"><span style="color: red; font-weight: bold; font-size: 16px">x</span></td>
                    </tr> 
                    <tr>
                        <td>Manage Exports</td>
                        <td align="center"><span style="color: green; font-weight: bold; font-size: 16px">✓</span></td>
                        <td align="center"><span style="color: red; font-weight: bold; font-size: 16px">x</span></td>
                        <td align="center"><span style="color: red; font-weight: bold; font-size: 16px">x</span></td>
                    </tr> 
                    <tr>
                        <td>Manage Webhooks</td>
                        <td align="center"><span style="color: green; font-weight: bold; font-size: 16px">✓</span></td>
                        <td align="center"><span style="color: red; font-weight: bold; font-size: 16px">x</span></td>
                        <td align="center"><span style="color: red; font-weight: bold; font-size: 16px">x</span></td>
                    </tr> 
                    <tr>
                        <td>Manage API tokens</td>
                        <td align="center"><span style="color: green; font-weight: bold; font-size: 16px">✓</span></td>
                        <td align="center"><span style="color: red; font-weight: bold; font-size: 16px">x</span></td>
                        <td align="center"><span style="color: red; font-weight: bold; font-size: 16px">x</span></td>
                    </tr> 
                    <tr>
                        <td>Manage Worklogs</td>
                        <td align="center"><span style="color: green; font-weight: bold; font-size: 16px">✓</span></td>
                        <td align="center"><span style="color: red; font-weight: bold; font-size: 16px">x</span></td>
                        <td align="center"><span style="color: red; font-weight: bold; font-size: 16px">x</span></td>
                    </tr> 
                    <tr>
                        <td>Home</td>
                        <td align="center"><span style="color: green; font-weight: bold; font-size: 16px">✓</span></td>
                        <td align="center"><span style="color: green; font-weight: bold; font-size: 16px">✓</span></td>
                        <td align="center"><span style="color: green; font-weight: bold; font-size: 16px">✓</span></td>
                    </tr> 
                    <tr>
                        <td>Your work</td>
                        <td align="center"><span style="color: green; font-weight: bold; font-size: 16px">✓</span></td>
                        <td align="center"><span style="color: green; font-weight: bold; font-size: 16px">✓</span></td>
                        <td align="center"><span style="color: red; font-weight: bold; font-size: 16px">x</span></td>
                    </tr>
                    <tr>
                        <td>Inbox</td>
                        <td align="center"><span style="color: green; font-weight: bold; font-size: 16px">✓</span></td>
                        <td align="center"><span style="color: green; font-weight: bold; font-size: 16px">✓</span></td>
                        <td align="center"><span style="color: green; font-weight: bold; font-size: 16px">✓</span></td>
                    </tr>
                    <tr>
                        <td>Drafts</td>
                        <td align="center"><span style="color: green; font-weight: bold; font-size: 16px">✓</span></td>
                        <td align="center"><span style="color: green; font-weight: bold; font-size: 16px">✓</span></td>
                        <td align="center"><span style="color: red; font-weight: bold; font-size: 16px">x</span></td>
                    </tr>
                    <tr>
                        <td>Projects</td>
                        <td align="center"><span style="color: green; font-weight: bold; font-size: 16px">✓</span></td>
                        <td align="center"><span style="color: green; font-weight: bold; font-size: 16px">✓</span></td>
                        <td align="center"><span style="color: red; font-weight: bold; font-size: 16px">x</span></td>
                    </tr>
                    <tr>
                        <td>View private projects</td>
                        <td align="center"><span style="color: green; font-weight: bold; font-size: 16px">✓</span></td>
                        <td align="center"><span style="color: red; font-weight: bold; font-size: 16px">x</span></td>
                        <td align="center"><span style="color: red; font-weight: bold; font-size: 16px">x</span></td>
                    </tr> 
                    <tr>
                        <td>View public projects</td>
                        <td align="center"><span style="color: green; font-weight: bold; font-size: 16px">✓</span></td>
                        <td align="center"><span style="color: green; font-weight: bold; font-size: 16px">✓</span></td>
                        <td align="center"><span style="color: red; font-weight: bold; font-size: 16px">x</span></td>
                    </tr>
                    <tr>
                        <td>Join private projects</td>
                        <td align="center"><span style="color: green; font-weight: bold; font-size: 16px">✓</span></td>
                        <td align="center"><span style="color: red; font-weight: bold; font-size: 16px">x</span></td>
                        <td align="center"><span style="color: red; font-weight: bold; font-size: 16px">x</span></td>
                    </tr>
                    <tr>
                        <td>Join public projects</td>
                        <td align="center"><span style="color: green; font-weight: bold; font-size: 16px">✓</span></td>
                        <td align="center"><span style="color: green; font-weight: bold; font-size: 16px">✓</span></td>
                        <td align="center"><span style="color: red; font-weight: bold; font-size: 16px">x</span></td>
                    </tr>
                    <tr>
                        <td>Cycles</td>
                        <td align="center"><span style="color: green; font-weight: bold; font-size: 16px">✓</span></td>
                        <td align="center"><span style="color: green; font-weight: bold; font-size: 16px">✓</span></td>
                        <td align="center"><span style="color: red; font-weight: bold; font-size: 16px">x</span></td>
                    </tr>
                    <tr>
                        <td>Views</td>
                        <td align="center"><span style="color: green; font-weight: bold; font-size: 16px">✓</span></td>
                        <td align="center"><span style="color: green; font-weight: bold; font-size: 16px">✓</span></td>
                        <td align="center"><span style="color: green; font-weight: bold; font-size: 16px">✓</span></td>
                    </tr>
                    <tr>
                        <td>Analytics</td>
                        <td align="center"><span style="color: green; font-weight: bold; font-size: 16px">✓</span></td>
                        <td align="center"><span style="color: green; font-weight: bold; font-size: 16px">✓</span></td>
                        <td align="center"><span style="color: red; font-weight: bold; font-size: 16px">x</span></td>
                    </tr>
                    <tr>
                        <td>Your favourites</td>
                        <td align="center"><span style="color: green; font-weight: bold; font-size: 16px">✓</span></td>
                        <td align="center"><span style="color: green; font-weight: bold; font-size: 16px">✓</span></td>
                        <td align="center"><span style="color: red; font-weight: bold; font-size: 16px">x</span></td>
                    </tr>
                </tbody>
            </table>
        </div>

</details>

<details>
  <summary>
    <b>Projects</b>
  </summary>
      <div>
      <table style="width: 100%; display: table; margin-left: 2px">
        <thead>
          <tr>
            <th width="350">Permission</th>
            <th>Workspace Admin</th>
            <th>Project Admin</th>
            <th>Member</th>
            <th>Guest</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td> Access Project settings</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
          </tr>
          <tr>
            <td>Create Project</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
          </tr>
          <tr>
            <td>Update Project</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
          </tr>
          <tr>
            <td>Archive Project</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
          </tr>
          <tr>
            <td>Delete Project</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
          </tr>
          <tr>
            <td>Add user</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
          </tr>
          <tr>
            <td>Remove user</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
          </tr>
          <tr>
            <td>Change user role</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
          </tr>
          <tr>
            <td>Enable features</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
          </tr>
          <tr>
            <td>Manage work item states</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
          </tr>
          <tr>
            <td>Manage work item labels</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
          </tr>
          <tr>
            <td>Manage Estimates</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
          </tr>
          <tr>
            <td>Manage Automations</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
          </tr>
          <tr>
            <td>Manage work item types and custom properties</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
          </tr>
          <tr>
            <td>Add Project to favorites</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
          </tr>
          <tr>
            <td>Publish Project</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
          </tr>
          <tr>
            <td>Copy link</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
          </tr>
          <tr>
            <td>View Archived projects</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
</details>

<details>
  <summary>
    <b>Work items</b>
  </summary>
      <div>
      <table style="width: 100%; display: table; margin-left: 2px">
        <thead>
          <tr>
            <th>Permission</th>
            <th>Workspace Admin</th>
            <th>Project Admin</th>
            <th>Member</th>
            <th>Guest</th>
            <th>
              Guest with <br /> view access
            </th>
            <th>Comments</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Create Work item</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
            <td></td>
          </tr>
          <tr>
            <td>View Work items</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td>Guests without view access can only see their own work items accepted through Intake.</td>
          </tr>
          <tr>
            <td>Edit Work item</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
            <td></td>
          </tr>
          <tr>
            <td>Duplicate Work item</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
            <td></td>
          </tr>
          <tr>
            <td>Copy link</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
            <td></td>
          </tr>
          <tr>
            <td>Archive Work item</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
            <td></td>
          </tr>
          <tr>
            <td>Delete Work item</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
            <td></td>
          </tr>
          <tr>
            <td>Edit Work item properties</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
            <td></td>
          </tr>
          <tr>
            <td>View Work item activity</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td></td>
          </tr>
          <tr>
            <td>Log work</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
            <td></td>
          </tr>
          <tr>
            <td>Add Comments</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td></td>
          </tr>
          <tr>
            <td>View Comments</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td></td>
          </tr>
          <tr>
            <td>Add Reactions</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td></td>
          </tr>
          <tr>
            <td>View work item types</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td></td>
          </tr>
          <tr>
            <td>Use work item types</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
</details>

<details>
  <summary>
    <b>Cycles</b>
  </summary>
      <div>
      <table style="width: 100%; display: table; margin-left: 2px">
        <thead>
          <tr>
            <th>Permission</th>
            <th>Workspace Admin</th>
            <th>Project Admin</th>
            <th>Member</th>
            <th>Guest</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Create Cycle</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
          </tr>
          <tr>
            <td>View Cycles</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
          </tr>
          <tr>
            <td>View Cycle work items</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
          </tr>
          <tr>
            <td>Edit Cycle</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
          </tr>
          <tr>
            <td>Add work items</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
          </tr>
          <tr>
            <td>Archive Cycle</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
          </tr>
          <tr>
            <td>Delete Cycle</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
          </tr>
          <tr>
            <td>Copy link</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
          </tr>
          <tr>
            <td>Add Cycle to favorites</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
          </tr>
          <tr>
            <td>View Cycle details</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
          </tr>
          <tr>
            <td>Filter Cycles</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
          </tr>
          <tr>
            <td>Search Cycles</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
</details>

<details>
  <summary>
    <b>Modules</b>
  </summary>
      <div>
      <table style="width: 100%; display: table; margin-left: 2px">
        <thead>
          <tr>
            <th>Permission</th>
            <th>Workspace Admin</th>
            <th>Project Admin</th>
            <th>Member</th>
            <th>Guest</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Create Module</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
          </tr>
          <tr>
            <td>View Modules</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
          </tr>
          <tr>
            <td>View Module work items</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
          </tr>
          <tr>
            <td>Edit Module</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
          </tr>
          <tr>
            <td>Add work items</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
          </tr>
          <tr>
            <td>Archive Module</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
          </tr>
          <tr>
            <td>Delete Module</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
          </tr>
          <tr>
            <td>Copy link</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
          </tr>
          <tr>
            <td>Add Module to favorites</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
          </tr>
          <tr>
            <td>View Module details</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
          </tr>
          <tr>
            <td>Add links to Module</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
          </tr>
          <tr>
            <td>Sort Modules</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
          </tr>
          <tr>
            <td>Filter Modules</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
          </tr>
          <tr>
            <td>Search Modules</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
</details>

<details>
  <summary>
    <b>Views</b>
  </summary>
      <div>
      <table style="width: 100%; display: table; margin-left: 2px">
        <thead>
          <tr>
            <th>Permission</th>
            <th>Workspace Admin</th>
            <th>Project Admin</th>
            <th>Member</th>
            <th>Guest</th>
            <th>
              Guest with <br /> view access
            </th>
            <th>Comments</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Create View</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td></td>
          </tr>
          <tr>
            <td>See Views</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td>Guests without view access can only see the Views they create</td>
          </tr>
          <tr>
            <td>Edit View</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td></td>
          </tr>
          <tr>
            <td>Add work items</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
            <td></td>
          </tr>
          <tr>
            <td>Delete View</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td></td>
          </tr>
          <tr>
            <td>Sort Views</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td></td>
          </tr>
          <tr>
            <td>Filter Views</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td></td>
          </tr>
          <tr>
            <td>Search Views</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td></td>
          </tr>
          <tr>
            <td>Add View to favorites</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
            <td></td>
          </tr>
          <tr>
            <td>Publish View</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
            <td></td>
          </tr>
          <tr>
            <td>Copy link</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
</details>

<details>
  <summary>
    <b>Pages</b>
  </summary>
      <div>
      <table style="width: 100%; display: table; margin-left: 2px">
        <thead>
          <tr>
            <th>Permission</th>
            <th>Workspace Admin</th>
            <th>Project Admin</th>
            <th>Member</th>
            <th>Guest</th>
            <th>
              Guest with <br /> view access
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Create Page</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
          </tr>
          <tr>
            <td>View Pages</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
          </tr>
          <tr>
            <td>Edit Page</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
          </tr>
          <tr>
            <td>Archive Page</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
          </tr>
          <tr>
            <td>Delete Page</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
          </tr>
          <tr>
            <td>Add Page to favorites</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
          </tr>
          <tr>
            <td>Publish Page</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
          </tr>
          <tr>
            <td>Copy link</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
          </tr>
          <tr>
            <td>Sort Pages</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
          </tr>
          <tr>
            <td>Filter Pages</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
          </tr>
          <tr>
            <td>Search Pages</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
</details>

<details>
  <summary>
    <b>Intake</b>
  </summary>
      <div>
      <table style="width: 100%; display: table; margin-left: 2px">
        <thead>
          <tr>
            <th>Permission</th>
            <th>Workspace Admin</th>
            <th>Project Admin</th>
            <th>Member</th>
            <th>Guest</th>
            <th>
              Guest with <br /> view access
            </th>
            <th>Comments</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Create Intake work item</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td></td>
          </tr>
          <tr>
            <td>View Intake work items</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td> Guest without view access can only view the Intake work items they create</td>
          </tr>
          <tr>
            <td>Edit Intake work item</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
            <td> Guest without view access can only modify the Intake work items they create</td>
          </tr>
          <tr>
            <td>Accept Intake work item</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
            <td> </td>
          </tr>
          <tr>
            <td>Reject Intake work item</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
            <td> </td>
          </tr>
          <tr>
            <td>Snooze Intake work item</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
            <td> Members can't snooze work items created by other users</td>
          </tr>
          <tr>
            <td>Mark duplicate</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
            <td> Members can't mark duplicate Intake work items created by other users</td>
          </tr>
          <tr>
            <td>Delete Intake work item</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
            <td> Members can't delete Intake work items created by other users</td>
          </tr>
          <tr>
            <td>Add attachments</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td>Members and Guests can only attach files to the Intake work items they create</td>
          </tr>
          <tr>
            <td>Modify Intake work item properties</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td>Members and Guests can only modify Intake work item properties they create</td>
          </tr>
          <tr>
            <td>View activity</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td></td>
          </tr>
          <tr>
            <td>Add comments</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td></td>
          </tr>
          <tr>
            <td>Add reactions</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td></td>
          </tr>
          <tr>
            <td>Copy link</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: red; font-weight: bold; font-size: 16px">x</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td></td>
          </tr>
          <tr>
            <td>Sort Intake work items</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td></td>
          </tr>
          <tr>
            <td>Filter Intake work items</td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td align="center">
              <span style="color: green; font-weight: bold; font-size: 16px">✓</span>
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
</details>

## See also

- [Member roles](/workspaces-and-users/roles)
- [Manage members](/core-concepts/workspaces/members)
