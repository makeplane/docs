# Contribution Guide for Plane Docs

Thank you for considering contributing to Plane docs! Your contributions help improve the quality and accessibility of our documentation for all users. Please follow the guidelines outlined below to ensure a smooth contribution process.

### 1. Create a New Issue (if it doesn't exist)
If you encounter a problem or wish to suggest an improvement in the documentation that hasn't been addressed yet, please create a new issue. Be sure to check existing issues to avoid duplication. Include a clear description of the problem or enhancement you're suggesting.

### 2. Create a New Branch from Master
Before making any changes, create a new branch from the `master` branch. This branch will contain your proposed changes and keep the `master` branch clean for stable releases.

```bash
git checkout master
git pull origin master
git checkout -b <branch-name>
```

### 3. Make Changes in the Appropriate Page
Navigate to the relevant documentation page in the repository and make your changes. Ensure that your changes align with our style guide and maintain consistency across the documentation.

### 4. Raise a Pull Request (PR)
Once your changes are ready, raise a pull request (PR) to merge your branch into the `master` branch. Please provide a descriptive title and detailed description of your changes.

### 5. Leave a Clear Commit Message
When committing your changes, leave a clear and concise message that links to the corresponding issue (if applicable) and explains the fix or enhancement you've made.

```bash
git add .
git commit -m "Fixes #<issue-number>: Description of the fix or enhancement"
```

### 6. Link the Issue to the Pull Request
In your pull request description, be sure to reference the related issue using GitHub's syntax (`#<issue-number>`). This links the PR to the issue and helps maintain context.

### 7. Sign the Contributor License Agreement (CLA)
Before we can merge your contribution, you must sign our contributor license agreement (CLA). This agreement ensures that your contributions comply with our licensing terms.

### 8. Assign a Reviewer from Our Team
Once your PR is submitted, a member of our team will be assigned to review your changes. They will provide feedback and may request revisions if necessary. Please respond promptly to any review comments to expedite the merging process.

Thank you for contributing to our documentation! We appreciate your efforts in making our product documentation more comprehensive and user-friendly. If you have any questions or need assistance, feel free to reach out to our team. Happy contributing!