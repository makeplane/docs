---
title: AI powered assistant for project management
description: Plane AI is your intelligent assistant for finding project data, analyzing work items, and managing tasks using natural language.
---
<div class="tag-wrapper">
  <h1>AI-powered assistant for Plane</h1>
  <Tags :tags='[{ name: "Pro", additionalClass: "pro" }]' />
  <Tags :tags='[{ name: "Business", additionalClass: "business" }]' />
</div>

Plane AI is an AI assistant that helps you interact with your Plane workspace using natural language. Instead of navigating through menus and filters, you can simply ask Plane AI questions about your projects, work items, and documentation in plain English.

Think of Plane AI as a knowledgeable team member who has instant access to all your project data. You can ask it to find specific issues, analyze project progress, search through documentation, or help you understand complex relationships between work items.

![Plane AI chat sidebar](https://media.docs.plane.so/pi-chat/pi-chat-sidebar.webp#hero)

## What Plane AI can do today

Plane AI excels at finding and analyzing information from your Plane workspace:

**Search and discovery**
- Find work items by describing what you're looking for: "Show me all bugs related to user authentication".
- Search across project documentation and Pages.
- Discover related work items and identify potential duplicates through AI-powered matching with similarity scoring.
- Access official Plane documentation and feature guides.
- Cross-project discovery to find related content across multiple projects

**Creation and management**   

- Create work items through natural language commands
- Generate projects, cycles, and modules with AI assistance
- Automatically populate properties and descriptions based on context

**Data analysis and insights**
- Analyze project progress and team performance with real-time queries.
- Generate reports on work item status and trends using complex filtering and aggregations
- Identify bottlenecks and overdue tasks through intelligent database querying
- Compare data across different time periods or projects.
- Handle temporal queries and understand relationships between entities.
- Convert natural language to optimized SQL queries for structured Plane data

**Contextual assistance**
- Get help with Plane features and workflows.
- Find best practices and usage recommendations.
- Understand relationships between projects, cycles, and modules.
- Navigate complex project structures.
- Access step-by-step instructions and how-to guidance. 

## What Plane AI cannot do (yet)

While Plane AI can now create and edit work items, projects, cycles, and modules, some capabilities are still in development:

- ❌ Execute complex automated workflows
- ❌ Handle bulk operations across multiple items simultaneously

## How to use Plane AI

### Access Plane AI

Plane AI is accessible from the left sidebar (AI icon for a dedicated chat interface with recent history) or directly within a project's Work Items and Cycles pages (AI icon on the top right to start a new chat in a side panel without leaving your view).

Plane AI is accessible in two ways:

- Click the AI icon in the left sidebar for a dedicated chat interface with full conversation history and workspace-level context. This is your main hub for cross-project analysis, documentation search, and saved conversations.

- Click the AI assistant on the top right while viewing any project section to open a contextual assistant that automatically understands where you are and what you're looking at.

  ![Plane AI assistant](https://media.docs.plane.so/pi-chat/ai-assistant.webp#hero)

### Start a conversation

1. Type your question in the chat input at the bottom of the Plane AI interface.
2. Plane AI will process your query and provide a response.
3. You can ask follow-up questions to dive deeper into the results.
4. Use `@mentions` for direct entity reference, for eg., "@WEB-4651 what's the status of this work item?"

![Plane AI chat mentions](https://media.docs.plane.so/pi-chat/pi-chat-mentions.webp#hero)

### Create items with Plane AI

Plane AI can create work items, projects, cycles, and modules through natural language commands.

::: info
Creating items requires [Build mode](#build-mode).
:::

#### Create a work item

1. Ensure you have a project selected using the Focus selector.
2. Type a creation command describing what you want to create:
    ```
      Create a bug report for the login page crash
    ```
3. Plane AI processes your request and shows its thinking.
4. Once completed, the work item is created and you'll see a success confirmation with the work item ID.

The newly created work item will include:
- Automatically generated title based on your description
- AI-generated description summarizing the work item
- Appropriate work item type (bug, feature, etc.) inferred from your command
- Default project properties

::: tip
Be specific in your commands. Include details like priority, assignees, or descriptions to help Plane AI create more complete work items. For example: "Create a high-priority bug for the payment gateway timeout issue and assign it to the backend team."
:::

### Ask and build modes
Plane AI operates in two distinct modes to balance information retrieval with project management actions: **Ask** mode and **Build** mode. You can switch between these modes using the mode selector at the bottom of the chat interface.

#### Ask mode
Ask mode is designed for answering questions, retrieving information, and finding insights from your Plane workspace. In this mode, Plane AI is read-only—it cannot modify, create, or delete any data.

![Ask mode](https://media.docs.plane.so/pi-chat/ask-mode.webp#hero)

What you can do in Ask mode:

- Search the Plane documentation: "How do I create a new cycle?" or "What are Modules?".
- Query your workspace data: "Show me all high-priority bugs assigned to me".
- Analyze trends: "Summarize the progress of the Frontend Revamp project".
- Find specific items: "Find the issue regarding the login crash".
- Get context: Ask about the status of specific cycles or modules.

Example queries:

- "What issues are currently blocking the release?"
- "How many open bugs are there in the Mobile project?"
- "Summarize the latest comments on issue PAI-123"

#### Build mode
Build mode is designed for action and execution. Switch to Build Mode when you need to create, update, or manage data within Plane.

![Build mode](https://media.docs.plane.so/pi-chat/build-mode.webp#hero)

::: warning
Build mode actions respect your Plane permissions. You can only perform actions you're authorized to do manually. Some operations (like deleting projects or managing workspace features) require admin permissions.
:::

#### What you can do in Build mode

Build mode gives you the ability to create, update, and manage nearly every aspect of your Plane workspace through natural language commands. Here's what Plane AI can do for you:

**Work items**

Create and manage work items with full control:
- Create new work items with complete details (title, description, priority, assignees, labels, start/due dates).
- Update any field on existing work items.
- Delete work items permanently.
- Add [relations](/core-concepts/issues/overview#add-relations to work items (blocking, blocked by, relates to, duplicate of, etc.).

Add context and collaboration:
- Add comments to any work item.
- Edit or delete existing comments.
- Log time spent on work items.
- Edit or delete time log entries.
- Add, edit, or remove external URL references..

*Example commands:*
```
Create a high-priority bug for login timeout, assign to Sarah, and add label "authentication"
Update WEB-123 to set priority to urgent and move to In Progress
Delete all comments on MOB-456 that mention the old API
Log 2 hours of work on CORE-789
```

**Projects**

Manage your projects:
- Create new projects with descriptions.
- Update project details (name, description, identifier, cover image).
- Delete projects.
- Enable or disable project features (Epics, Cycles, Modules, Pages, Views).

*Example commands:*
```
Create a new project called "Mobile App Redesign" with identifier MOB
Enable Cycles and Modules for the Backend project
Update the API project description to include our new architecture goals
```

**Cycles**

Plan and manage your cycles:
- Create new cycles with start and end dates.
- Update cycle details (name, dates, description, owner).
- Delete cycles.
- Archive completed cycles or restore archived ones.
- Add or remove work items from cycles.
- Transfer all remaining work items from one cycle to another.

*Example commands:*
```
Create a new cycle "Sprint 24" starting next Monday for 2 weeks
Move all incomplete items from Sprint 23 to Sprint 24
Archive the Q3 Planning cycle
Add all authentication bugs to the current sprint
```

**Modules**

Organize work into modules:
- Create new modules.
- Update module details (name, description, dates).
- Delete or archive modules.
- Add or remove work items from modules.

*Example commands:*
```
Create a module called "User Authentication Overhaul"
Add all login-related issues to the Authentication module
Archive the Payment Gateway module
```

**Workflows and organization**

Customize your project workflows:
- Create custom workflow states (e.g., "In Review", "Ready for QA", "Deployed").
- Update state properties (name, group,).
- Delete workflow states.
- Create, update, or delete work item labels.
- Create, update, or delete custom work item types.

*Example commands:*
```
Create a new workflow state "Pending Review" in the In Progress group
Add a label "technical-debt" with red color
Create a custom work item type called "Spike" for research tasks
```

**Custom properties**

Extend work items with custom fields:
- Create new custom property definitions.
- Update property settings and options.
- Delete custom properties.
- Set or update property values on work items.
- Manage dropdown options for select properties.

*Example commands:*
```
Create a custom property "Severity" with options Critical, High, Medium, Low
Update the "Customer Impact" property to add a new option "Revenue Blocking"
Set the "Estimated Hours" property to 8 for all bugs in this sprint
```

**Pages and documentation**

Create and organize knowledge:
- Create new pages within projects.
- Create new pages within workspaces.

*Example commands:*
```
Create a project page titled "API Integration Guidelines"
Create a workspace page for our Q4 OKRs
```

**Intake and triage**

Manage incoming requests:
- Create new intake items.
- Update intake item details (title, description, priority).
- Delete intake items.

*Example commands:*
```
Create an intake item for the customer feature request about dark mode
Update intake item INT-45 to high priority
```

**Initiatives**

Align work with strategic goals:
- Create, update, or delete initiatives.
- Create, update, or delete initiative-specific labels.
- Attach or remove labels from initiatives.
- Link or unlink projects to initiatives.
- Link or unlink epics to initiatives.

*Example commands:*
```
Create an initiative "Improve Platform Performance"
Link the Backend Optimization project to the Performance initiative
Add the "Q4 Priority" label to the User Experience initiative
```

**Teamspaces**

Manage teams and collaboration spaces:
- Create, update, or delete teamspaces.
- Add or remove members from teamspaces.
- Add or remove projects from teamspaces.
- Create, update, or delete sticky notes for brainstorming.

*Example commands:*
```
Create a teamspace called "Frontend Team"
Add Sarah and Mike to the Design teamspace
```

**Sticky notes**
Brainstorm and capture ideas:
- Create, update, or delete sticky notes.

*Example commands:*
```
Create sticky notes for today's retrospective ideas
Update the sticky note about API redesign to include performance concerns
```

**Customer management**

Track and manage customer information:
- Create new customer profiles.
- Update customer information (name, contact details, revenue, industry).
- Delete customer records.

*Example commands:*
```
Create a customer profile for Acme Corp with $50k annual revenue
Update the contact email for TechStart Inc
```

**Workspace configuration**

Control workspace-level features:
- Enable or disable workspace features (Initiatives, Teamspaces, Customers, Analytics).

*Example commands:*
```
Enable Initiatives for this workspace
Disable the Customers feature
```

::: tip
**Be specific with commands** The more details you provide, the better Plane AI can execute your request. Instead of "create a bug", try "create a high-priority bug for the payment gateway timeout, assign to backend team, and add to Sprint 24".
:::

### Attach files

Click the **attachment icon** in the chat input to upload files:
- Screenshots and images for visual context
- Documents for reference
- Error logs or data files for analysis

Plane AI can reference attachments in its responses and help you analyze the content.

### Use voice input

Click the **microphone icon** to speak your query instead of typing. Plane AI transcribes your speech and processes it as a text query, useful for:
- Quick queries on mobile
- Complex questions that are faster to speak
- Hands-free operation

### Thread organization and management

- All conversations are saved and organized in persistent conversation threads.
- Automatic chat titling based on content.
- Mark important conversations as favorites for easy access.
- Search and revisit past conversations.
- Delete and rename chats with full management capabilities.

Conversational features

- Maintain context across multiple exchanges with multi-turn conversations.
- Support for markdown, code blocks, tables, and lists with rich formatting.
- Automatically create clickable links to work items and pages through entity linking.

### Workspace and project context

![Project context](https://media.docs.plane.so/pi-chat/project-context.webp#hero)

Notice the **Focus** selector at the bottom of the chat interface.
- Set your conversation scope to a specific workspace.
- Switch between different workspaces if you have access to multiple ones.
- Ensure Plane AI searches and analyzes data from the right context.
- Narrow context to individual projects when needed.

#### AI assistant in-context mode
When you open Plane AI assistant from the top right of a project or work item page, the assistant automatically understands your current context and tailors its responses accordingly.

**Project context**  
When you open Plane AI while viewing a project's Work Items or Cycles pages, all your queries automatically focus on that specific project. You don't need to specify which project you're asking about - Plane AI already knows.

![Work item context](https://media.docs.plane.so/pi-chat/work-item-context.webp#hero)

**Work item context**  
When you open Plane AI while viewing a specific work item, the assistant understands you're asking about that particular item. The work item ID appears in the chat interface, and all queries relate to that work item unless you specify otherwise.

This contextual awareness makes Plane AI faster and more intuitive. You can ask questions naturally without constantly specifying what you're talking about.

### Plane AI's reasoning and responses

Plane AI includes a **Show thinking** feature that reveals how it processes your queries.
- Click **Show thinking** to see Plane AI's step-by-step reasoning process.
- Watch as Plane AI understands your query, plans its approach, and executes database searches.
- This transparency helps you understand why Plane AI provides certain results and how to refine your questions.

Plane AI provides structured responses that may include:
- Direct answers with relevant data from live Plane databases.
- Tables and lists for organized information with complex filtering.
- Links to specific work items and pages with clickable references.
- Explanations of why certain results were included with reasoning.
- Aggregations and analytics that generate insights from project data.
- Relationship mapping showing connections between entities.

When Plane AI references work items, it will show you the title and provide clickable links to view them directly in Plane.

### Get better results

**Be specific about your needs**
- Instead of: "Show me issues"
- Try: "Show me high-priority bugs in the mobile app project from last month"

**Use natural language**
- "What tasks are overdue in my current sprint?"
- "Who has been working on authentication issues?"
- "Find documentation about setting up webhooks"

**Ask follow-up questions**
- Plane AI remembers your conversation context
- Build on previous queries: "Now show me only the ones assigned to Sarah"
- Ask for different formats: "Can you show this as a summary instead?"

### Sample queries to try

Based on the interface, here are some example questions you might ask:

**Personal work insights**
- "Who commented on my work items recently?"
- "What did I complete this week?"
- "What's the progress of work items in current active cycles?"

**Project analysis**
- "Show me all items in the backlog for this project"
- "What work is planned for the next sprint?"
- "Which items are ready for development?"

**Team coordination**
- "What's blocking our current sprint work?"
- "Show me overdue items across all projects"
- "Which team members need more work assigned?"

### Manage your conversations

- **Recent chats**: Access your conversation history from the **Recents** section in the sidebar.
- **New conversations**: Click "New chat" to start fresh when switching topics.
- **Contextual help**: Plane AI will suggest relevant follow-up questions based on your queries

### Response interactions

At the bottom of each Plane AI response, you'll find:
- **Thumbs up/down**: Rate the helpfulness of Plane AI's response.
- **Copy**: Copy the response text for use elsewhere.
- **Share**: Share the conversation or specific responses with team members.

## Platform availability

Plane AI works across all your devices:

- **Web interface**: Access Plane AI directly within your Plane workspace.
- **Mobile apps**: Native iOS and Android apps with full Plane AI functionality.
- **Sync across devices**: Your conversation history stays consistent everywhere.

## Privacy and permissions

Plane AI respects your Plane permissions and workspace boundaries:
- You can only access data you normally have permission to view.
- Conversations are scoped to your current workspace.
- Plane AI cannot see or access other workspaces you don't belong to.

## Tips for effective use

**Start broad, then narrow down**. Begin with general queries and use Plane AI's responses to refine your search:
1. "Show me recent bugs"
2. "Focus on the ones from the authentication module"
3. "Which of these are assigned to the backend team?"

**Use Plane AI for discovery**
- "What documentation exists about our API?"
- "Find all work items mentioning performance issues"
- "Show me pages related to user onboarding"

**Leverage context awareness**
Plane AI understands your project structure and relationships:
- "What's blocking the login feature work?"
- "Find related issues to PROJ-123"
- "Show me work items similar to this bug report"

If Plane AI doesn't understand your query or provides unexpected results:
- Try rephrasing your question with different terms
- Be more specific about timeframes, projects, or work item types
- Ask Plane AI to explain its reasoning: "Why did you include these results?"

Plane AI is continuously learning and improving. The more you use it, the better it becomes at understanding your team's specific needs and terminology.

Add this section at the very end of the document, after "What's coming next":

## Turn off Plane AI for your workspace

Workspace admins can disable Plane AI if your organization prefers not to use AI assistance.

1. Navigate to **[Workspace Settings](/core-concepts/workspaces/overview#access-workspace-settings)**.
2. Go to **Plane AI** in the sidebar.
3. Toggle off **Turn on AI for this workspace**.

![Disable Plane AI](https://media.docs.plane.so/pi-chat/turn-off-ai.webp#hero)

Once disabled, Plane AI becomes inaccessible to all workspace members. Conversation history is preserved and restored when re-enabled.