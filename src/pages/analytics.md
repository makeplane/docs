---
title: Plane Analytics
pageTitle: Plane Analytics | Plane
description: Crystal clear, cutting-edge, crucial - Project Analytics for everyone.
---

![Snapshot of Plane Analytics in Action](https://ik.imagekit.io/ul3fbpqfo/Plane_Documentation/Plane_Analytics_Screenshot.png?updatedAt=1684829498067)

## What is Plane Analytics?

Imagine transforming your entire Workspace data into a structured dataset that provides actionable insights, enhancing your understanding of your work. Plane Analytics does just that, acting as your personal analyst. It swiftly answers your queries, forecasts demand, and determines scope within moments. Dive into data with Plane Analytics and make smarter decisions.

### Plane Analytics Levels

Plane Analytics can be utilized at two distinct levels:

- **Workspace Level:** Users in the **`Owner`** or **`Admin`** roles have access to Plane Analytics at the Workspace level. You can locate it on the left sidebar, just beneath your Dashboard.
- **Project Level:** Users assigned the **`Owner`**, **`Admin`**, or **`Member`** roles can avail Plane Analytics at the Project level. To utilize this feature within a Project, navigate to your respective Project Issues, and you'll find it on the top bar, adjacent to the **`Views`** section.
- **Cycle and Module Level**: Operating within the Project Level, Plane Analytics efficiently filters issues specific to a given Cycle or Module, subsequently generating pertinent insights. To access this, navigate to Cycle/Module and hit Plane Analytics on the top bar.

### **Exploring Plane Analytics**

Upon entering Plane Analytics, you'll encounter two distinct tabs:

1. Scope and Demand
2. Custom Analytics

Let's dive into what these entail.

### **Scope and Demand**

This tab showcases a pre-designed dashboard focused on Scope and Demand. Functional at both Workspace and Project Levels, this dashboard offers a snapshot of all issues and their progress, calculated based on the states of the issues.

*All about the first card - Total **Demand**.*

- **Open Tasks**: This encompasses the total number of tasks listed under the **`Backlog`**, **`Unstarted`**, and **`Started`** states.
    
> At the Workspace level, it aggregates all open tasks from all Projects within the Workspace. On the other hand, at the Project level, it solely counts the issues present within the specified project.
    

Situated beneath Open Tasks, you'll discover a comprehensive summary of the total number of issues in the aforementioned three states, coupled with a percentage distribution in relation to the **`Completed`** and **`Cancelled`** states.

- **Estimate Demand:** This feature provides a swift insight into the ratio of the sum of Estimates for the **`Backlog`**, **`Unstarted`**, and **`Started`** states to the total sum of Estimates for all issues.
    
> On the Workspace level, Estimate Demand applies this calculation to all issues across every project within the workspace. Conversely, at the Project level, it computes the estimates for issues within a selected Project.

The second card - Total **Scope**.

Scope provides a summary of your team's bandwidth. Here, you'll find the total number of **`Backlog`**, **`Unstarted`**, and **`Started`** issues assigned to each member of your Workspace or Project.

This feature allows you to swiftly understand who has more issues assigned, and who has the bandwidth to tackle additional issues. For customization by different groups, use the Custom Analytics.

Directly beneath the Scope and Demand section, you'll find couple of Leaderboards for celebration 🎉. These display the top performers in issue closure, as well as notable contributors to issue initiation. To cap it all off, a comprehensive graph illustrates the total number of issues closed throughout the entire year.

### Custom Analytics

Welcome to the realm of Bar charts.

Custom Analytics is the hub of answers pertaining to your work. Here, we will guide you on how to leverage it to its fullest potential.

Upon accessing Custom Analytics, three distinct properties will greet you - **`Measure`**, **`Dimension`**, and **`Group`**.

**Measure:** The foundation of Plane is built upon Issues, and the Measure property echoes this centrality. This property consists of two attributes: **`Issue Count`** and **`Estimate`**. These attributes form the Y-axis of your chart.

**Dimension:** This property is where you can utilize all the issue properties to derive insights based on the chosen Measure. The following attributes are currently supported:

- State name
- State group
- Priority
- Label
- Assignee
- Estimate point
- Cycle

Each attribute in the Dimension property aids in understanding the Measure property from a different perspective, offering detailed analysis based on the selected attribute.

**Group:** The Group property enables you to delve deeper into your insights by constructing stacked bar charts. It's important to note that although the same attributes are sourced from the Dimension property, any selected attribute in the Group property will disappear from the Dimension property. This offers a way to further categorize and understand the data in your Dimension attribute, creating a more layered insight into your work.

### Exporting Analytics

For backup purposes and further analysis, data from Plane Analytics can be effortlessly exported into a CSV format with a single click. The CSV data will then be shared with the specified user.

Please note that only users with **`Owner`** or **`Admin`** roles in a workspace can access these exports.