# CPS 230 Risk Assessment Copilot - Deployment Guide

This guide provides step-by-step instructions for deploying the CPS 230 Risk Assessment Copilot in Microsoft Copilot Studio. Follow these instructions to configure and publish the agent for your organization.

## Prerequisites

Before you begin, ensure you have:

1. **Microsoft Copilot Studio access** with administrator or creator permissions
2. **SharePoint site** set up to host knowledge sources:
   - Process documentation PDFs (in a dedicated library)
   - Risk Taxonomy document
   - CPS 230 Assessment Instructions
   - Operational Risk Controls Framework
   - CPS 230 Process Analysis Template
3. **Microsoft Teams admin access** (for publishing the agent to Teams)
4. Relevant **permissions** to access all required SharePoint documents

## Step 1: Create a New Copilot Agent

1. Log in to [Microsoft Copilot Studio](https://copilotstudio.microsoft.com/)
2. Click on **+ Create** and select **Copilot**
3. Enter agent details:
   - **Name:** CPS 230 Risk Assessment Copilot
   - **Description:** An AI assistant that helps risk and compliance teams analyze business process documentation for operational risks and controls in compliance with APRA CPS 230.
4. Click **Create**

## Step 2: Configure Base Instructions

1. In your new Copilot, go to the **Configure** tab
2. Under **Base instructions**, paste the content from [system-prompt.md](system-prompt.md)
3. Click **Save**

## Step 3: Add Knowledge Sources

1. Go to the **Knowledge** section in Copilot Studio
2. Click **Add knowledge**
3. Add the SharePoint site containing process documentation:
   - Select **SharePoint** as the source type
   - Enter the URL of your SharePoint site (e.g., https://<tenant>.sharepoint.com/sites/CPS230Processes)
   - Name it "Process Documentation Library"
   - Enable access by toggling it on
   - Click **Add**

4. Add additional knowledge sources for key documents:
   - Click **Add knowledge** again
   - Select **SharePoint** or **Public website** as appropriate
   - Add Risk Taxonomy document URL
   - Name it "Risk Taxonomy"
   - Click **Add**

5. Repeat for:
   - CPS 230 Assessment Instructions (named "Assessment Instructions")
   - Operational Risk Controls Framework (named "Controls Framework")
   - CPS 230 Process Analysis Template (named "Output Template")

## Step 4: Configure Starter Prompts

1. Go to the **Conversation starters** section
2. Click **Add conversation starter**
3. Add each prompt from the [starter-prompts.md](starter-prompts.md) file
4. For the greeting message, go to **Configure** > **Greeting message** and paste the greeting text

## Step 5: Test the Copilot Agent

1. Click on the **Test** button in the top right corner
2. Try several test scenarios:
   - Upload a sample process document (or provide a SharePoint link)
   - Ask for a process summary
   - Request a failure point analysis
   - Test various prompts and verify responses

3. Verify that:
   - The agent follows the 6-step methodology
   - Knowledge sources are being retrieved correctly
   - Outputs match the expected template format
   - The agent maintains conversation context across steps

## Step 6: Configure Deployment Settings

1. Go to the **Manage** tab
2. Under **Security**, set appropriate access permissions:
   - Determine which users/groups can access the agent
   - Configure data retention policies if needed

3. Under **Versions**, ensure you're using the latest tested version

## Step 7: Publish to Microsoft Teams

1. Go to the **Publish** tab
2. Click **Publish**
3. Select **Microsoft Teams** as the channel
4. Configure Teams settings:
   - Choose whether to publish to the entire organization or specific teams/groups
   - Set up any required channel configurations
   - Configure appearance settings

5. Click **Publish**

## Step 8: Document and Communicate

1. Create a user guide for end users explaining:
   - How to access the Copilot agent in Teams
   - Best practices for interacting with the agent
   - Example workflow for completing a full process analysis
   - Limitations and known issues

2. Distribute the guide to relevant risk and compliance teams

3. Consider scheduling training sessions to demonstrate the agent's capabilities

## Step 9: Monitoring and Maintenance

1. Set up regular review periods to:
   - Check agent performance and accuracy
   - Update knowledge sources as processes or requirements change
   - Refine the system prompt based on user feedback

2. Establish a feedback collection process:
   - Create a Teams channel for agent feedback
   - Set up a periodic review meeting with key stakeholders
   - Track common issues or enhancement requests

3. Plan for version control:
   - Document changes to the agent in a change log
   - Test significant changes before publishing
   - Communicate updates to users

## Step 10: Governance and Compliance

1. Ensure the agent deployment complies with:
   - Organization's AI governance framework
   - Data protection policies
   - Access control requirements

2. Document:
   - Who has access to the agent
   - What data sources it uses
   - The approval process for future changes

3. Consider whether any specific APRA-related notifications or documentation are required

## Troubleshooting

### Common Issues and Solutions

1. **Agent cannot access SharePoint documents**
   - Verify permissions are correctly set for the service account
   - Check that SharePoint links are correctly formatted
   - Ensure documents are in supported formats

2. **Agent responses are inaccurate**
   - Review and refine the system prompt
   - Check that knowledge sources are up-to-date
   - Consider adding more examples or specific instructions

3. **Agent is not maintaining context across the conversation**
   - Check conversation session settings
   - Review system prompt for clarity on maintaining conversation state
   - Consider breaking more complex analyses into smaller steps

## Support

For additional support, contact:
- Microsoft Copilot Studio support
- Your organization's IT support team
- Your designated Copilot administrator 