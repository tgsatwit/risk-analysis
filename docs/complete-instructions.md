**Implementation Plan: Custom Copilot Agent for CPS 230 Risk Assessment**

This report outlines a comprehensive plan to build a **bespoke Microsoft Copilot Studio agent** for an Australian superannuation company’s large-scale risk assessment initiative (aligned with APRA CPS 230). The agent will evaluate ~50 internal business process documents (e.g. PDFs with process maps, instructions, controls) and assist risk teams in a structured 6-step analysis. We detail the creation of the agent, configuration of its prompts and knowledge sources, integration with SharePoint for document access, conversation flow design, required templates/files, and enterprise deployment considerations.


**1. Designing the Custom Copilot Agent (“Risk Assessment Copilot”)**

**Objective & Scope:** The custom Copilot agent (“CPS 230 Risk Assessment Copilot”) will act as a virtual risk analyst, guiding users through summarizing processes, identifying failure points, categorizing risks, and analyzing controls. It is modeled after Microsoft’s _Field Service Agent_ concept – a domain-specific Copilot that draws on internal knowledge to provide expert guidance. The agent will be purpose-built for **operational risk analysis** and **process evaluation** in compliance with APRA CPS 230.


**Agent Creation in Copilot Studio:** Using Microsoft Copilot Studio’s no-code interface, we will create a new agent and define its core profile:

• **Name & Description:** e.g. _“CPS 230 Risk Analyst Copilot”_ – an AI assistant that helps risk and compliance teams analyze business process documentation for operational risks and controls. This description is entered during agent creation to establish its role and domain. (For example, the Field Service agent is described as assisting on-site repairs with product knowledge【18†】.)

• **Base Instructions:** We input high-level instructions (system prompt) describing the agent’s persona, goals, and conversational style . In our case, the agent will be instructed to behave as an _experienced risk management SME_ familiar with the company’s operations and CPS 230 requirements . It will be told that its purpose is to help the user perform a structured risk assessment on any given process document. This includes following the specific 6-step methodology and producing outputs in the required format. (The language in the user’s provided CPS 230 workshop prep guide – e.g. _“act as an experienced SME… understand both practical execution and associated risks”_ – will be incorporated to set the agent’s expertise and context.)

• **Knowledge Integration:** We will integrate the agent with the company’s internal knowledge sources so it can “read” and reference the process documentation and guidelines. Copilot Studio allows us to **add organizational data as knowledge sources** (e.g. SharePoint sites, specific documents, or databases) with just a few clicks . During creation, we’ll use the _Add knowledge_ feature to connect the SharePoint library where the 50 process PDFs reside (see Section 3). This enables the agent to retrieve content from these documents when answering questions. We will also add other reference materials (risk taxonomy, control frameworks, instruction files) as knowledge sources or include their content in the prompt, so the agent has all necessary context.


_Figure 1: Configuring a custom Copilot agent in Copilot Studio (Field Service Agent example) – The creator provides a SharePoint site URL as a knowledge source (“Product troubleshooting” library) so the agent can retrieve internal documentation_ _._

• **Conversation Capabilities:** Our agent will be focused on **multi-turn analytical conversations** rather than one-off Q&A. In Copilot Studio, after defining the agent’s name/description, we will switch to the **Configure** settings to fine-tune its behavior. We will ensure the agent can handle a **6-step dialogue** (detailed in Section 2) by embedding the step-by-step approach into its system prompt and by providing starter prompts that guide the user. The agent will be able to accept a process document (as an attachment or link) and then interactively produce: summaries, tables, lists of failures, risk registers, and control analysis. It will maintain context across turns so the outputs of earlier steps feed into later steps. For example, after summarizing a process, it will “remember” the key steps when looking for failure points in the next user query.

In summary, the agent will be created in Copilot Studio with a clear identity (CPS 230 risk analysis assistant), appropriate tone (formal, informative), and access to internal process documents and reference knowledge. This lays the foundation for the agent to perform the specialized tasks required in the risk assessment.


**2. Configuring the Agent for a 6-Step Risk Assessment Process**

We will configure the agent’s **system prompt, knowledge base, and conversation flow** to support the following 6-step assessment methodology:

**(1) Summarize the process documentation** – **(2) Extract key process details (steps, roles, systems, controls)** – **(3) Identify potential failure points (“what can go wrong”)** – **(4) Classify failures using the operational risk taxonomy** – **(5) Recommend expected controls (per risk management framework)** – **(6) Identify documented controls & perform gap analysis**.

These steps correspond to the CPS 230 workshop preparation instructions provided by the user and align with the sections of the CPS 230 output template. The agent will be guided through each step as follows:


**Step 1: Summarize the Process Documentation**

When the user provides a process document, the first task is to generate an **executive summary** of that process. We will instruct the agent to produce a clear, concise overview covering the process’s overall purpose, scope, and flow . This summary should explain _what the process is intended to achieve, how it starts and ends, and any critical points or compliance considerations_ . The tone will be factual and high-level (suitable for a quick understanding by workshop participants). To support this, the system prompt includes guidance like: _“Summarize the process in a few paragraphs, focusing on objectives, key stages, decision points, and critical dependencies. Avoid extraneous detail.”_ This instruction is drawn from the provided CPS 230 prep guide, which emphasizes a 2-page summary highlighting overall purpose, flow, key decision points, and important regulatory or dependency notes .

The agent will use the content of the uploaded PDF to pull out the main ideas. For example, if the process is “Member Onboarding,” the summary would state the goal (onboarding a new member), outline the stages (application, verification, account setup, confirmation), mention who is involved (teams or systems), and note any compliance aspects (e.g. KYC requirements). By configuring the agent with this step, we ensure **every analysis begins with context**. The summary provides a foundation for deeper analysis and can be reviewed by the user for accuracy before moving on.

  

**Step 2: Extract Key Process Steps, Roles, and Systems**

Next, the agent will produce a **Process Summary Table** that captures the key elements of the process in a structured format. We have a template for this in the CPS 230 output (Section 1: Process Summary Table), which the agent will emulate. The system prompt explicitly defines the table columns and their meanings, so the agent knows how to organize the information . The columns (as per the template) are: **Process Step**, **Intended Purpose**, **Key Activities**, **Key Systems Used**, **Roles/Teams Involved**, **Tools & Templates**, and **Key Dependencies** . Each row will represent one major step in the process, listed in logical order.

To configure this, we will embed in the agent’s instructions a description of each column. For example: _“Identify the major steps of the process (up to 10). For each step, state its purpose (why it exists), list 2-5 critical activities in that step, the primary IT systems or applications used, the roles or teams involved, any specific tools/forms used, and any key dependencies or prerequisites for the step.”_ This mirrors the workshop instruction which says each row is one step with those specific details . We will also load the **CPS 230 Process Analysis Template** as a reference (either in prompt or as a file in the knowledge base) so the agent understands the exact format expected .

The agent, upon user request (e.g. “List the key steps and details of this process”), will parse the content of the documentation to fill in this table. For instance, if Step 1 of the process is “Receive Application”, the agent will create a row: _Process Step:_ Receive Application; _Intended Purpose:_ initiate the onboarding by collecting member info; _Key Activities:_ (bullet points like “Collect application form”, “Enter member data into system”); _Key Systems:_ CRM system; _Roles:_ Call Center team; _Tools & Templates:_ New Member Form; _Dependencies:_ applicant provides required documents. This structured output provides a **comprehensive overview of the process** at a granular level, which is crucial for subsequently pinpointing risks. It also directly populates Section 1 of the CPS 230 template .

_(Note: In practice, the user might combine Step 1 and Step 2 by asking the agent for a “process summary” – the agent can then output a brief narrative followed by the summary table. We can configure the agent to handle such combined queries. Alternatively, the user can ask for the narrative first, then the table. The agent’s design is flexible to either approach.)_

  

**Step 3: Identify Failure Points (“What Can Go Wrong”)**

With the process clearly documented, the agent will help identify **potential failure points or vulnerabilities** at each step. We configure the agent to perform a _Failure Point Analysis_ as described in the CPS 230 instructions (Section 2 of the template). The agent’s prompt includes guidance such as: _“For each process step identified, list the key things that could go wrong (failure points). For each failure, explain the possible causes and the potential impacts if it occurs.”_ We’ve defined a format for this analysis in the template: additional columns for **Failure Point**, **Potential Causes**, and **Potential Impacts** per step .

The agent will use the process step breakdown from Step 2 as a basis and brainstorm 3–5 meaningful failure scenarios per step . To ensure quality, the system instructions emphasize **realistic, significant failures** – focusing on scenarios that have a non-negligible impact or have happened in similar contexts (rather than trivial issues) . This is aligned with the provided guide which instructs focusing on failures that could seriously disrupt the process, have occurred before, or are common in industry . For example, for a data entry step, a failure point might be “Incorrect data entered into system”; causes: human error or unclear instructions; impacts: downstream processes receive wrong data, causing rework or compliance issues.

In practice, the user might prompt: “Identify what could go wrong at each step and what the causes/impacts would be.” The agent will then produce an **extended table or list** – often it’s easiest to expand the Process Summary Table by adding the failure and cause/impact columns, or to list each step with sub-bullets for failures. We will ensure the agent knows the preferred format (the template suggests an expanded table for workshop documentation). An example output (in line with the template and instructions) might be:

• **Step 3: Verify Documents**

– _Failure Point:_ Missing or illegible documents
– _Potential Causes:_ Applicant did not provide all required documents; poor image quality of scanned IDs.
– _Potential Impacts:_ Delays in verification process; potential non-compliance with ID requirements.

• **Step 3: Verify Documents**

– _Failure Point:_ Verification step overlooked due to time pressure
– _Potential Causes:_ Staff bypassing checklist; high volume of applications.
– _Potential Impacts:_ Unverified identities leading to regulatory breach.

_(The above would be repeated for each critical step.)_

  
By configuring the agent with this analytical capability, we equip it to produce Section 2 of the CPS 230 report. The failure point analysis surfaces the weak links in the process that need to be managed.

  

**Step 4: Classify Failures via Risk Taxonomy**

After identifying “what can go wrong,” the agent will help translate these into formal **risk categories** using the company’s operational risk taxonomy. We have provided the agent with the **Risk Management Taxonomy for the Australian Super Company** – a list of 20 key risks across categories like Operational, Market, Liquidity, Strategic . In the Operational risk category (most relevant here), sub-categories include People Risk, Process Risk, System Risk, External Event Risk, Regulatory/Compliance Risk, Project Risk . Each failure point or group of related failures can be mapped to one of these risk types.

To configure this step, we will load the risk taxonomy (as a PDF or extracted list) into the agent’s knowledge sources, and instruct the agent to **categorize each identified risk**. In the system prompt, we include: _“Use the organization’s risk taxonomy to classify each risk (e.g. People, Process, Systems, External, Compliance, etc.). The taxonomy is provided as reference.”_ For example, if one failure point is “third-party service not available,” the agent should recognize it as _External Event Risk – Vendor/Outsourcing Risk_ . If another is “staff makes a mistake,” that could fall under _People Risk – Conduct or Training Risk_. By doing this classification, the agent will populate the **“Risk Category”** column in the consolidated risk register (Section 3 of the output template) .

The user may not need to prompt separately for this if we design the agent to include categories when consolidating the risk register. In the CPS 230 instructions, when creating the risk register (Step 3 in the guide), one of the tasks is to _“Categorize the risk (operational, technological, people, third-party, etc.)”_ . We will ensure the agent does this automatically. However, the user could also explicitly ask, for instance: “Classify these failure points into risk types.” The agent will then reply with something like: _“Failure A -> Process Risk; Failure B -> System Risk; Failure C -> People Risk,”_ referencing the taxonomy definitions.

Using the standardized taxonomy ensures consistency and alignment with enterprise risk language. The risk taxonomy file (which the company can update over time) will be an important knowledge source for the agent. Our configuration will make the agent consult this file when it needs definitions or examples of risk categories, so it uses the correct terminology (e.g., distinguishing *“IT Infrastructure Risk” vs “Data Quality Risk” under System Risk , or identifying something as *“Compliance Process Risk” if it relates to regulatory implementation failures ).

By the end of this step, each risk (derived from the failure analysis) will be labeled under the appropriate category. This fulfills the CPS 230 requirement to show that risks are identified and categorized systematically (important for APRA compliance). It will also set the stage for control recommendations by risk type.

  

**Step 5: Recommend Expected Controls (Risk Framework Alignment)**

With a set of categorized risks in hand (essentially a draft risk register), the Copilot agent will next suggest **controls that should be in place** to mitigate these risks. This step leverages the company’s risk management framework and industry best practices. We will configure the agent with knowledge or rules about typical controls for common risk types. Additionally, if the company provides a “risk and control library” or any policy documents (for example, a list of standard controls for key operational risks), those will be added to the agent’s knowledge base to ground its answers.

In the agent’s system instructions, we include guidance for control recommendation, for instance: _“For each identified risk, list the expected controls that a well-managed process should have to prevent or detect the risk. Include at least one preventative and one detective control if applicable_ _. Classify each control by type (Preventative/Detective/Corrective) and by category (Manual/Automated/Semi-automated).”_ The CPS 230 template Section 4 (“Control Analysis”) provides a structure we will follow: an **Expected Controls** list for each risk, with columns for Control Type and Control Category . We’ve also specified these definitions in the instructions file, so the agent knows what each means (e.g., _Preventative vs Detective control_, _Manual vs Automated control_ ). The agent will use the risk context to propose relevant controls. For example: for a risk of “Incorrect data entry” (People/Process Risk), expected controls might include _“Dual data entry check (Preventative, Manual)”_ and _“Regular data audit reports (Detective, Automated)”_. For a risk of “System outage” (Systems Risk), expected controls might be _“Redundant system availability (Preventative, Automated)”_ and _“Monitoring alerts for downtime (Detective, Automated)”_.

We instruct the agent to leverage any **internal control frameworks** provided. If the company has a documented risk-control matrix or control standards (say, based on CPS 234 or internal policies), hosting that document for the agent will make recommendations more tailored. In absence of a specific control library, the agent will rely on its generalized knowledge (the underlying AI has broad knowledge of common controls) combined with the risk taxonomy for context. Our system prompt emphasizes that controls should be _reasonable and expected for the given type of risk, not random._ We also note that the agent should **not assume a control exists** yet – just recommend what _should_ exist in an ideal scenario (the next step will check whether it does exist in the documentation).

In summary, at this step the agent produces a list of **“Expected Controls” per risk**, including a brief description and classification. This populates the first part of Section 4 of the output (the agent might format it as a sub-table under each risk ID). The user can prompt this by saying “What controls would you expect for these risks?” and the agent will answer accordingly. We ensure the answer is structured, for example:

• **Risk 2 (Data entry error):**

**Expected Control:** Maker-checker validation (double approval of entries) – **Type:** Preventative – **Category:** Manual.
**Expected Control:** Input format validation in system – **Type:** Preventative – **Category:** Automated.
**Expected Control:** Daily reconciliation of entries – **Type:** Detective – **Category:** Semi-automated.

_(This is just an example; the actual controls will depend on the risk and any internal guidance provided.)_

By configuring the agent to perform this way, we align with the risk management framework concept in CPS 230, which expects that for identified risks, appropriate controls are considered.


**Step 6: Identify Existing Controls and Perform Gap Analysis**

The final configured capability is for the agent to compare the **expected controls** against the **process documentation** to see what controls are already in place and where gaps exist. Essentially, the agent will scan the original process document (and any related materials provided) for evidence of each expected control or any control activities, and then do a **gap analysis**. This addresses CPS 230’s requirement to assess the effectiveness of controls and identify control shortcomings.

We will set up the agent’s system prompt with specific instructions for gap analysis, following the guidance from the CPS 230 workshop prep and template. Key points include :

• Mark each expected control as one of: **“Present and clearly documented,” “Partially evident,” or “No evidence of control.”** (These exact phrases are provided to the agent to use when categorizing the gap . This ensures consistency in language.)

• If a control is present or partial, the agent should cite the part of the process doc that indicates it (e.g., “Step 4 includes a supervisory approval – evidence of control present”). This is the **Process Evidence** column in the template .

• If a control is missing (no evidence), the agent should state that plainly and not assume it exists .

• For each control that is partially or not present, the agent should recommend **Next Steps** to address the gap . This could be a remediation suggestion or further inquiry, such as “Consider implementing XYZ control” or “Verify if this control is handled in another process outside this document.” The instructions file provides examples like “Interview process owner about approval workflows” or “Check if compensating controls exist” .

  

To enable this, the agent will use its retrieval ability on the process document content. Our knowledge integration (Section 3) ensures the agent can search the text of the PDF for keywords related to controls (e.g., “reconciliation”, “approval”, “review”, “check”) and find if they are mentioned. We instruct the agent to correlate those mentions with the expected controls list. For instance, if an expected control was “segregation of duties” and the document says “Step 5: Finance team reviews the entry made by Operations team”, the agent will recognize that as evidence of segregation of duties in place (control present). If an expected control was “system validation” and the document has no mention of validation or error checks, the agent concludes “No evidence of control” for that item.

  

The output format will mirror the **Control Analysis table** in the template: for each Risk, list each expected control with columns indicating the control type/category, the evidence found (if any), gap assessment, and recommended next steps . We will have the agent present this in a readable table or structured list. An example snippet for one risk:

• **Risk 2 (Data entry error):**

– _Expected Control:_ **Dual data entry check** – _Type:_ Preventative (Manual) – _Evidence:_ **No evidence in process doc** – _Gap Analysis:_ **No evidence of control** – _Next Steps:_ Consider adding a peer review step for data entries.

– _Expected Control:_ **System input validation** – _Type:_ Preventative (Automated) – _Evidence:_ Process doc p.3: _“System prompts user if mandatory fields are empty”_ – _Gap Analysis:_ **Control present (partially)** – _Next Steps:_ Confirm if validation covers all data errors.

– _Expected Control:_ **Daily reconciliation report** – _Type:_ Detective (Semi-automated) – _Evidence:_ Process doc p.4: _“Team lead reviews daily input logs”_ – _Gap Analysis:_ **Control present and clearly documented** – _Next Steps:_ None (monitor effectiveness).

  

This illustrates how the agent’s answer might look. We will ensure the agent uses the exact terminology for gap status as provided (present, partially evident, no evidence) , and that it provides a next-step action for any gap . The system prompt and the instruction file both reinforce this behavior (e.g., _“Where no evidence exists, clearly state ‘No evidence of control’ rather than making assumptions”_ ).

  

At this point, the agent will have completed the structured 6-step analysis for the process: summarized it, identified key components, highlighted what can go wrong, consolidated risks with categories, suggested what controls should be there, and checked what controls are actually there. The conversation with the agent thus produces a comprehensive draft of the CPS 230 assessment output for that process, following the exact template provided.

  

It’s important to note that throughout these steps, the agent’s **system prompt** maintains the analytical context. It will remember earlier parts of the conversation (e.g., the process steps from Step 2) and use them in later steps (e.g., referring to those steps when listing affected steps in the risk register, or when searching for evidence of controls in those steps). We also instruct the agent to maintain _consistent terminology_ (for example, use the same step names and risk names throughout) and to focus on quality over quantity – producing a few well-thought-out points rather than many weak ones . This ensures the final output is coherent and suitable for review in a CPS 230 compliance workshop.

  

**3. Integrating SharePoint for Document Knowledge Access**

  

To enable the agent to reference internal documents (process PDFs, templates, etc.), we will configure **SharePoint integration** in Copilot Studio. The goal is that the agent can securely retrieve content from the company’s SharePoint when the user provides a document or asks about it.

  

**SharePoint Document Library Setup:** First, the 50+ process documents and supporting files should be stored in a SharePoint site or document library that the Copilot agent can access. For example, we might create a site called “CPS230 Risk Assessment” with libraries for _Process Docs_, _Taxonomy & Framework_, _Instructions_, etc. Each process PDF would be in the Process Docs library, and files like the risk taxonomy PDF or CPS 230 instructions can be in another library or folder.

  

**Adding SharePoint as a Knowledge Source:** In Copilot Studio, on the agent’s **Overview** page, there is a **Knowledge** section where we can add sources. We will click **“Add knowledge”** and select the appropriate source type. Copilot Studio currently supports adding SharePoint content and “public websites” as knowledge sources . In our case, since it’s within the Microsoft 365 environment, we can add the SharePoint site directly:

• Choose **SharePoint** (for internal content). We’ll enter the URL of the SharePoint site or library that contains the process documents. For instance: https://<tenant>.sharepoint.com/sites/CPS230Processes. We enable access so the agent can index/read files from this location (ensuring the account used has at least read permissions). The interface has a field to _“Enter URL of a SharePoint site”_ and an on/off toggle to include it【36†】. We will toggle it on, and name this source “Process Documentation Library”. (In the Field Service agent example, this is analogous to providing the product info SharePoint site【18†】.)

• We will also add **the specific knowledge documents** via URLs if needed. For example, the **Risk Taxonomy PDF** could be uploaded to SharePoint (or converted to a web page) and we’ll add its URL as a knowledge source (if it’s not covered by the site-wide add). Alternatively, since the taxonomy is short, we might embed it in the prompt. But to keep it updateable by the risk team, hosting it on SharePoint and adding it as a source is ideal. Similarly, the **CPS 230 instructions** file can be added. In Copilot Studio’s _Add knowledge_ wizard, we would select _Public website_ for these (if treating them as standalone documents accessible via a link). We can provide the direct sharing link (if the SharePoint file is shared internally or publicly) and name them “Risk Taxonomy” and “Assessment Instructions” respectively.

• If there is an internal **Risk Management Framework or Controls Catalog** document, we will also add that. This ensures the agent can quote or draw details from the company’s official risk management policies when suggesting controls.

  

By configuring these knowledge sources, **the agent can reference internal content by URL** during conversation. For example, if a user says “Here is the link to the process doc” or even just names the process (if the agent’s search can find it in SharePoint), the agent will fetch the relevant content. The Copilot’s retrieval mechanism will parse the text of those PDFs or documents in real time to ground the answers it gives. This is how the agent will pull details like specific process steps or evidence of controls from the documentation.

  

**Access and Security:** The agent operates within the Microsoft 365 environment, so it respects the **user’s permissions** on documents. Only content the user (or the agent’s configured service account) can access will be retrievable. All data remains within the M365 **trust boundary** – when the agent searches SharePoint, it’s using Graph API under the hood, and no data is exposed externally . We will ensure the SharePoint content is properly permissioned: e.g., all relevant risk team members have read access. We might create a dedicated M365 group for the risk assessment project and put all relevant SharePoint assets in a site accessible to that group.

  

**Testing the Setup:** After adding the knowledge sources, we will use Copilot Studio’s built-in test chat to verify the agent can indeed find info. For instance, we’ll ask the agent a question that requires looking at one of the process PDFs (“What is the first step of the  process?”) – the agent should respond based on the document’s content. If it cannot, we may need to adjust (e.g., ensure the URL was indexed correctly or the content is in a supported format – PDFs are supported for indexing).

  

**Referencing via URL in Conversation:** Users can also directly reference documents by URL in a chat message. For example: _“Analyze the process described in [SharePoint link].”_ Because we have configured the agent with access, it should open that link (the Copilot will fetch the content behind the scenes) and then proceed. We will instruct users on this capability in training materials. Alternatively, if the user uploads a file through the Teams chat interface with the agent, the agent should similarly be able to use it (in Teams, an uploaded file can be treated as a message attachment, though currently the Copilot might not automatically ingest an attachment unless it’s turned into text – we will emphasize using SharePoint links for consistency).

  

In summary, **SharePoint integration** is configured to allow the agent to _“read”_ internal process docs and reference files. This is accomplished by adding the SharePoint site and key files as knowledge sources in Copilot Studio . All data remains internal and secure, and the agent’s answers will be grounded in the actual content of those documents rather than just the base AI model’s knowledge. This setup is crucial: without it, the agent would only guess based on general knowledge, but with it, the agent can quote specifics (like step names, or control descriptions) from the company’s own documentation during the risk assessment dialogue.

  

**4. Agent Prompt Design: System Prompt & Starter Prompts**

  

To ensure the agent follows the structured analysis approach in every conversation, we will carefully craft the **system prompt (instructions)** and define useful **starter prompts**. These configurations control how the agent behaves and how the user initiates the interaction.

  

**System Prompt (Agent Instructions)**

  

The **system prompt** in Copilot Studio is where we define the agent’s role, rules, and style. For our Risk Assessment Copilot, the system prompt will encapsulate the CPS 230 methodology and the agent’s domain expertise. Key elements to include:

• **Role and Expertise:** We state that _“You are an AI Copilot assisting with operational risk assessments for an Australian superannuation company. You act as an experienced risk & compliance professional, with deep knowledge of the company’s processes and APRA CPS 230 requirements.”_ This sets the tone that the agent’s answers should reflect an expert perspective (as if a senior risk analyst is speaking). It mirrors the language from the provided instructions asking the AI to act as an experienced SME .

• **Goals and Tasks:** We enumerate the 6 steps as the agent’s primary tasks. For example: _“Your objective is to help the user analyze a business process in six steps: (1) Summarize the process documentation; (2) Present a table of key process steps, roles, systems, etc.; (3) Identify potential failure points for each step; (4) Consolidate these into risks and categorize them using the company’s risk taxonomy; (5) Recommend expected controls for each risk based on our risk management framework; (6) Perform a gap analysis between expected controls and the controls evidenced in the documentation.”_ By explicitly listing these in the system prompt, the agent is always aware of the overall workflow and can guide the user if needed. It will also ensure that if the user’s query is vague (e.g. “help me analyze this process”), the agent knows to break down the response into those steps.

• **Knowledge and References:** In the prompt, we’ll remind the agent that it has access to certain reference materials. For instance: _“You have access to the company’s process documentation (via SharePoint), a Risk Taxonomy document (which outlines categories like People, Process, System risks_ _), and CPS 230 analysis guidelines. Use these sources to inform your answers.”_ This lets the agent know it should utilize the knowledge base we configured. We might even include a brief excerpt of the risk taxonomy in the prompt as a quick reference (for example, list the top-level categories and a couple of sub-risk examples for each). However, since we’ve added the entire taxonomy file to knowledge, a summary may not be necessary. The key is the agent knows it should classify risks in those terms.

• **Formatting Instructions:** We will tell the agent to follow the output format of the CPS 230 template. For instance: _“Present your answers in structured form as much as possible. Use tables for the process summary and control analysis steps (Steps 2 and 6). Use clear bullet points for listing failure points and controls. Follow the exact column names and layout given in the template.”_ We will include the template’s column names in the instructions for clarity (e.g., _“The Process Summary table columns are: Process Step, Intended Purpose, Key Activities, Key Systems, Roles/Teams, Tools/Templates, Dependencies”_ ). Similarly for the risk register and control table. This explicit guidance will make the agent’s outputs neatly align with the expected format (which reduces editing work later).

• **Tone and Style:** We set the tone as _professional, clear, and objective_. The agent should avoid overly casual language or unsupported assertions. It should also be concise – e.g., summarize rather than copy large text verbatim, and use bullet points for readability. The instructions from the user emphasized focusing on clarity and that the final materials should be digestible quickly , so we will reinforce that: _“Keep answers concise and to-the-point. Prefer bullet lists or tables over long paragraphs. Ensure the output can be reviewed in 15-20 minutes, highlighting key points (quality over quantity)_ _.”_

• **Accuracy and Limitations:** We include rules like: _“If a certain analysis cannot be done with the given information, communicate what is missing rather than guessing.”_ For example, if the user asks for a gap analysis but hasn’t provided the process doc, the agent should ask for the doc rather than making one up. We will also reiterate the **don’t invent controls** rule here: _“Do not assume a control exists if not mentioned_ _. If documentation is silent, treat it as no evidence.”_ This prevents hallucination of facts. Additionally, the system prompt might instruct the agent to always explain its reasoning when asked, and to use the user’s provided content to back up its statements (this is more implicit due to how grounding works, but stating it helps).

By defining these elements in the system prompt, we create a robust “operating manual” for the agent. For example, a portion of the system prompt might look like:

  
> **System Instruction (excerpt):** You are the “CPS 230 Risk Assessment Copilot.” You assist in analyzing business process documentation for risks and controls. Always follow this approach:
> 1. **Process Summary:** If the user provides a document, summarize its purpose, flow, and key points. Keep it brief and clear.
> 2. **Process Details Table:** Identify up to 10 major steps and document: Step Name, Purpose, Activities, Systems, Roles, Tools, Dependencies in a table format.
> 3. **Failure Points:** For each step, list what could go wrong (3-5 points) with causes and impacts.
> 4. **Risk Register:** Consolidate failure points into distinct risks. Write a risk statement for each (“Risk that … occurs due to …, resulting in …”). Include which steps are impacted and categorize each risk (People, Process, Systems, etc., per the taxonomy).
> 5. **Expected Controls:** For each risk, list expected controls. Indicate Control Type (Preventative/Detective/Corrective) and Category (Manual/Automated/Semi-automated).

> 6. **Gap Analysis:** Compare expected controls to the documentation. Mark each as “Present,” “Partial,” or “No evidence.” Suggest next steps for any gaps.
>   
> • **Style:** Use tables and bullet points as specified. Be concise and factual. Reference the document content for evidence. Do not fabricate information or controls not found in the documents.
> • **Knowledge:** You have access to the process docs and reference files (risk taxonomy, etc.) – use them to ground your answers.
> • **Goal:** Help the user produce a CPS 230 compliance analysis ready for review.

_(The above is an illustrative snippet – the actual system prompt will be configured in Copilot Studio’s interface. It may not appear exactly to end-users, but it governs the agent’s behavior.)_

These instructions ensure that **no matter how a user interacts with the agent, it will try to adhere to this structured approach**. Even if a user asks something out of sequence, the agent can gently steer the conversation back to these steps if relevant.

  

**Starter Prompts and Conversation Start**

When a user initiates a chat with the Copilot agent (for example, opening it in Teams or on the web), we want to provide some guidance or example to kick off the interaction. We will configure a friendly **greeting message** and a couple of **starter prompt suggestions** to help users get started.

• **Greeting Message:** This is the first message the agent might present (or it may simply be an empty prompt waiting for user input, depending on configuration). We plan to set a greeting along the lines of: _“Hello! I’m the CPS 230 Risk Assessment Copilot, here to help analyze your business processes for operational risks and controls. Upload a process document or provide a SharePoint link to begin, and I will guide you through a risk assessment step by step.”_ This welcome message introduces the agent’s purpose and instructs the user on what to do first (provide a document). It also sets expectations that the agent will go step-by-step.

• **Suggested Starter Prompts:** Copilot Studio allows configuring “starter prompts” (common queries users can click on). We will include a few relevant ones, such as:
• _“Summarize this process and list its key steps.”_
• _“What could go wrong in this process?”_
• _“Generate a risk register from the process failures.”_
• _“Assess the controls and identify any gaps.”_

These correspond to the phases of the analysis. For instance, if a user has just provided a doc, they could click “Summarize this process…” and the agent will proceed with Step 1 and 2 output. These prompts act as a menu of capabilities and remind users of the workflow.

• **User Guidance:** We will also leverage user training and possibly the conversation start to instruct _how to provide input_. For example, since the agent works best with the actual document text, we’ll encourage use of SharePoint links or the attach feature. The greeting or an initial system note might include: “(Note: I have access to documents on SharePoint. You can paste a link to a PDF or type the name of the process document, and I will retrieve it.)”. This way, users know they don’t have to paste entire text, just reference the file.

The **starter prompts and greeting** make the user experience smoother, especially for first-time users who might not know what to ask. It aligns with the Field Service agent pattern where, upon launch, the agent might show example help topics (as seen in Figure 1, the Field Service agent card suggested topics like “Troubleshooting” or “Site preparation”). In our case, the suggestions are tailored to risk assessment tasks.

All these configurations (system prompt, greeting, suggestions) will be set in Copilot Studio under the agent’s settings. They ensure that both the agent and the user are on the same page regarding the process to follow, resulting in a structured and efficient interaction.

  

**5. User Interaction Workflow**

With the agent built and configured, this section describes **how users will use the Copilot agent in practice**. This workflow is what we will communicate to the risk and compliance team when rolling out the tool. It covers how to initiate the analysis, how each step is conducted in the chat, and how to capture the results.

**Step 1: Accessing the Copilot Agent** – Users (risk analysts, process owners, etc.) can access the agent via **Microsoft Teams** (if deployed there) or via a web interface. In Teams, the agent might appear as a chat contact or an app. For example, a user could go to the Teams search bar and type the agent’s name, or find it in the Teams app launcher if published org-wide. We will ensure the agent is published and **available to the appropriate user group** (initially, likely the risk and compliance team only). The user starts a new chat with the agent, which triggers the greeting message as described in Section 4.
**Step 2: Providing Process Documentation** – The first thing the user will do is tell the agent which process to analyze. There are a few ways this can happen, and we will support multiple:
• **Via Link:** The user pastes the SharePoint URL of the process PDF or document into the chat, possibly with a prompt like “Please analyze this process: [SharePoint link].” The agent, seeing a URL, will fetch the document content (since that domain is in its knowledge base) and acknowledge it.
• **Via Attachment:** In Teams chat, the user can upload the PDF file directly in the conversation. We will test this scenario; if the Copilot agent can’t directly read an attachment, the user may need to upload the file to SharePoint first (hence the link method is preferred). We will document the best practice for users (most likely: use SharePoint links for now).
• **Via Name/Reference:** If all process docs are indexed in the agent’s knowledge, the user might simply say “Analyze the Member Onboarding process.” The agent could then search its knowledge base for “Member Onboarding” and find the corresponding document. We will verify if keyword search works reliably. To be safe, providing the link or at least a unique document title is recommended.

Once the agent has access to the document, it might respond with a confirmation like “Got it. I have the process document for ‘Member Onboarding’. How would you like to proceed?” Or it might jump straight into a summary if the user’s prompt indicated that. The system is flexible here; the user could explicitly instruct the first action or the agent might proactively start summarizing if that’s the default behavior we set.

**Step 3: Summarization Output** – Assuming the user’s initial request is to summarize (or the agent asks and the user confirms), the agent will produce the **Step 1 summary**. This will appear as a message in the chat, typically a few short paragraphs giving the high-level overview. The agent will likely follow immediately with **Step 2** – the process detail table – unless we’ve broken that into a separate prompt. We anticipate it might be useful to get both in one go (since they are closely related). If so, the agent’s first answer could be structured as: first the executive summary (text), followed by “**Process Summary Table:**” and a nicely formatted table with the columns and rows for each step. Microsoft Teams supports formatting like tables in adaptive cards or Markdown in the Copilot response – we’ll ensure the formatting is clear (the template uses tables which might render as text in chat; if needed, the agent can format as markdown table or a list of step entries).

The user reviews this output. This is an opportunity to verify that the agent correctly understood the document. If something looks off, the user can clarify or correct it by messaging the agent. For example, “The purpose of Step 2 is slightly different, it should be X, not what you said.” The agent will then adjust that detail. This interactive review is valuable – it ensures any AI misinterpretation is caught early. In our training for users, we will encourage them to sanity-check the summary before moving on.

**Step 4: Failure Point Analysis** – Once the process summary is agreed upon, the user (or the agent, after giving the summary) moves to the next step. The user might type: _“Identify the key failure points in each step.”_ The agent will then generate the Step 3 output, analyzing each process step for things that could go wrong, with causes and impacts. This might come as another table or a structured list. The user waits for the agent’s answer, which could be somewhat lengthy (as it has to list failures for each step). We anticipate the agent will do it systematically.

When the agent sends the failure analysis, the user reads through these points. They might discuss some of them in the chat, e.g., “Yes, missing documents is indeed a failure mode for Step 1. Also consider if system downtime could be a failure in Step 3.” If the user adds a failure the agent missed, the agent can incorporate it (we’ve given it flexibility to update its analysis if new info is provided). This back-and-forth can refine the list of failure points. The agent’s memory in the chat will keep track of any additions or changes as the conversation continues.


**Step 5: Risk Consolidation** – Next, the user asks for a consolidated risk register. For example: _“Consolidate these into a risk register with categories.”_ The agent will then take the identified failure points, group related ones, and formulate risk statements (Step 4 in instructions). It will output something like a table with Risk IDs (R1, R2, …), each with a statement, category, references to which steps and failure points relate to it . This is delivered as another response in the chat.

The user reviews the risk register. They might ask follow-ups like “Why did you classify R3 as a People Risk?” and the agent can explain, citing the taxonomy (perhaps it responds: “Because the failure points leading to R3 involve human errors and training issues, which fall under People Risk as per our taxonomy .”). This shows the value of the integrated taxonomy knowledge. If a risk statement isn’t worded well, the user can ask the agent to rephrase or make it more specific, and the agent will comply. The conversation allows iterative refinement—much faster than writing a risk register from scratch.

**Step 6: Control Recommendations** – Once the risks are finalized, the user prompts the agent for controls: _“For each of these risks, what controls should we have?”_ The agent will produce the Step 5 output: a list of expected controls under each risk, with types and categories noted. This might be formatted as sub-lists or a combined table. In chat, we might see the agent enumerate Risk 1’s controls, then Risk 2’s, etc., for clarity.

The user examines these suggestions. They might discuss them: “Are there any preventative controls missing for R1?” or “Our policy already requires a reconciliation – did you mention that?” The agent can cross-check and either add a missing expected control or acknowledge a control if it was indeed expected and it listed it. Because the agent is drawing from its knowledge of standard controls, the user may need to ensure they align with actual company practices. If the company has unique controls, the user can mention them and the agent will include them going forward in the analysis (the agent can adapt during the conversation – e.g., if user says “We also have an automated workflow that addresses this,” the agent can treat that as an expected control or evidence of control).

**Step 7: Control Gap Analysis** – Finally, the user requests the gap analysis: _“Now check which of those controls exist in the process documentation and identify gaps.”_ The agent will then perform Step 6. In the chat, this may be a detailed answer, potentially broken down by risk. It will likely say for each risk: _Control 1 – present/absent, evidence, gap status, next step; Control 2 – … etc._ The formatting might be a series of lines or a small table for each control. The agent will use wording like “Control present and clearly documented” or “No evidence of this control in the document” as configured .

The user reviews these findings. This essentially completes the analysis. The user might ask for clarification on any “partial” or “no evidence” findings (e.g., “Where exactly did you see evidence for Control 2?”). The agent can answer by quoting the exact sentence from the process doc that it found. Because the agent can retrieve document context, it might even already include a reference in its answer (“… as described in Step 4 of the document”). We will train the users to interpret the gap analysis and possibly confirm anything uncertain with process owners outside the chat if needed.

**Step 8: Output Consolidation and Next Steps** – At this point, the conversation with the agent contains the full set of outputs for the process. The user can now compile these into the final report or template. There are a few ways to handle this: the user could copy the content from the chat and paste it into the Word template (since the agent’s tables correspond to sections of the template). We might also explore if the agent can directly format the final answer as a filled-in template. For instance, the user could say “Summarize all results in the final template format.” If the agent is capable, it might output a single message with all sections (Summary, Table, Failures, Risk Register, Control Analysis) nicely organized. However, that could be very large for chat. It might be better to keep them section by section as we did.

A practical approach is that after the chat, the user uses the content to finalize the documentation. The agent’s job (copilot) is done once the analysis is provided. The user can then save the chat transcript (if needed) or simply use the extracted insights.

For each new process, the user will start a **new session** with the agent (to avoid confusion between different process analyses in one long chat). We will advise them to do one process per conversation or explicitly reset context when switching to a new process.
  

**User Workflow Summary:**

1. **Launch Copilot Agent** (in Teams or web) – greet message appears.
2. **Provide process doc** (link or name or file) and instruct to analyze.
3. **Receive Process Summary** (narrative + table). Review and correct if needed.
4. **Request Failure Point Analysis** – agent provides it. Discuss/refine if needed.
5. **Request Risk Register** – agent provides consolidated risks with categories. Adjust if needed.
6. **Request Control Recommendations** – agent lists expected controls per risk. Review/modify as needed.
7. **Request Gap Analysis** – agent identifies which controls are documented vs missing.
8. **Review all outputs** – ask follow-ups for clarification if required.
9. **Finalize documentation** – copy results into CPS 230 report template, or save the conversation output. Possibly ask the agent to output in a document format if supported in future.
10. **Repeat for next process.**

Throughout this workflow, the agent acts as a **smart assistant**, doing heavy-lifting (reading docs, generating tables, recalling taxonomy info) while the human user supervises and directs the analysis. This greatly speeds up what would otherwise be a manual, time-consuming task for each process. We will ensure users are trained in how to best prompt the agent and how to verify its outputs.

  

**6. Templates and Supporting Files**

A few template files and reference documents are required to support the agent’s proper functioning and to align outputs with expectations. Below is a list of these files, their purpose, and how we will use them in the Copilot setup:

|**Template / File**|**Description & Purpose**|**Usage in Copilot Agent**|
|---|---|---|
|**CPS 230 Process Analysis Template** (Output Format) – _Provided by user_|The structured template for documenting process risk assessments, as required for CPS 230 compliance. It includes four sections: **Process Summary Table**, **Failure Point Analysis**, **Consolidated Risk Register**, and **Control Analysis** with defined columns and layout . This is essentially the “report” we want to generate for each process. It was provided by the user (e.g., as a Word document)._Columns Example:_ Process Summary Table has columns “Process Step, Intended Purpose, Key Activities, Key Systems, Roles/Teams, Tools & Templates, Dependencies” . The Risk Register has columns “Risk ID, Risk Statement, Risk Category, Process Steps Affected, Contributing Failure Points” , etc.|**Agent Output Guidance:** The agent is instructed to format its answers according to this template. We directly reference these column names and section structures in the system prompt so the agent’s tables match the template. The user will ultimately populate this template with the agent’s outputs, so alignment is critical. The file itself can be hosted on SharePoint for reference, but primarily it guides the agent’s formatting.|
|**Risk Taxonomy Document/Template** – _Provided by user_|A document outlining the **standard risk taxonomy** for the company. In the provided example (“Risk Management Taxonomy for Australian Super Company”), there are 4 major categories (Operational, Market, Liquidity, Strategic) with sub-risks listed (Operational has 14 sub-risks across People, Process, System, etc.) . This taxonomy will serve as the _standard classification scheme_ for operational risks in assessments. The company may have its own version; the file acts as a template for them to review or customize (e.g., add/remove risks relevant to their business).|**Knowledge Source & Classification:** This file will be added to the Copilot agent’s knowledge base. The agent will use it when categorizing risks (Step 4). For example, if the agent sees a failure related to vendors, it will map it to _“Vendor/Outsourcing Risk”_ as defined in the taxonomy . By having the exact wording and categories from the company’s taxonomy, the agent’s output will use consistent terminology. The company should keep this file up-to-date; if they adjust their risk categories, updating this document (and re-uploading if needed) will update the agent’s knowledge.|
|**CPS 230 Assessment Instructions** (Methodology Guide) – _Provided by user_|A document detailing the step-by-step methodology for the CPS 230 risk assessment workshops. This includes the instructions for process summary, failure analysis, risk consolidation, and control gap analysis (as seen in the “Workshop Preparation Instructions” provided) . It essentially serves as a playbook for how to perform the analysis and what the outputs should contain.|**System Prompt & Reference:** Key content from this instructions file is woven into the agent’s system prompt. We use it as the basis for the rules the agent follows (e.g., number of failure points per step, risk statement format , gap analysis criteria ). We also host the full instructions on SharePoint so the agent can reference it if needed (and so users can open it to understand the logic). Having it on SharePoint as a PDF or OneNote page with a URL means we can easily update the methodology and have the agent align with any changes (by updating the prompt or the reference). This file ensures the agent’s behavior stays aligned with the intended workshop approach.|
|**Operational Risk Controls Framework** (Controls Library) – _Company to provide_|_(Optional but recommended)_ A document or spreadsheet listing common controls and risk management principles used by the company. For example, it might enumerate preventative/detective controls for typical processes or outline minimum control standards for certain risk types. APRA CPS 230 expects a robust risk management framework; this file would capture the control aspect of that framework. If the company has an existing controls repository or policies (like “Key Controls for Outsourcing Risks”), those can be compiled here.|**Knowledge Source for Controls:** If provided, this will be added to the agent’s knowledge sources. The agent will draw on it in Step 5 when recommending controls. For instance, if the framework document says “For data accuracy risks, reconciliation and dual-input are required controls,” the agent will be more likely to recommend those. It helps tailor the AI’s generic knowledge to the company’s specific control environment. If such a file is not available at project start, the agent will rely on general knowledge and SME input; however, we suggest developing this template for consistency. The agent’s system prompt can also include hints from this (e.g., “remember, our policy is every critical process must have a reconciliation control”). Keeping this file internal (SharePoint) ensures sensitive control info remains private while enabling the agent to be more accurate.|
|**SharePoint Knowledge Base** (Process Documents Library)|Not a single file, but the collection of all **process documentation PDFs** (50+ files). This acts as the “corpus” of information the agent uses to extract specifics about each process.|**Primary Data for Analysis:** These documents are the ones the users will point the agent to for each analysis. They are stored in SharePoint and connected via Copilot Studio knowledge. While not templates per se, it’s important to list them as part of the supporting materials. We will maintain the library by adding new process docs or updated versions as needed. The agent will always fetch the latest content (since it searches the live SharePoint content). We should ensure documents are named clearly and have consistent structure where possible (to make the agent’s job easier in parsing them).|

In summary, the above files/templates are essential for the Copilot agent to function correctly and output useful results. We will ensure each is accessible to the agent (through configuration) and to users (for reference and maintenance). The CPS 230 output template and risk taxonomy were provided by the user and have been directly incorporated into the agent’s design. The instructions file is effectively the blueprint for the agent’s conversational behavior. Any additional internal frameworks (like the controls library) will further enhance the agent’s alignment with the company’s risk management practices.

  

**7. Enterprise Deployment and Governance**

Deploying this custom Copilot agent in an enterprise environment requires attention to governance, security, and user management. Below are key considerations and guidance for rolling out the “CPS 230 Risk Assessment Copilot” in the company:

  

**Permissions and Access Control**

Building and deploying the agent will likely involve an administrator or an owner account in Copilot Studio. Once built, we can **publish the agent to the organization or a specific group**. Initially, we may restrict access to a pilot group (e.g., the risk team) to gather feedback. Copilot Studio provides centralized controls for this – in the admin center, we can manage who has permission to create agents and who can use them . We will ensure that only authorized individuals (perhaps risk/compliance personnel) can invoke this agent, especially since it will have access to sensitive internal documents.

The agent itself does not bypass document permissions: if a user who does not have access to a certain SharePoint file tries to get info, the agent should not retrieve it for them. This permission trimming is inherent to Microsoft Graph data access. We will test such scenarios to confirm. Additionally, the admin can configure **Data Loss Prevention (DLP)** policies and sensitivity labels which remain enforced even when the agent accesses data . The agent’s knowledge sources are all within the tenant’s secure boundary, and no data is shared to external services aside from the OpenAI model (which receives prompts and context but not in a way that violates tenant boundaries – Microsoft’s design ensures that) .

We will document that **users should treat the agent’s output as internal** and handle it per classification (most outputs will be “Internal Use Only” or even confidential, given they discuss risks and controls). Standard infosec guidelines for handling such information apply.

  

**Teams Integration and User Experience**

We plan to deploy the agent into **Microsoft Teams** for ease of use. Copilot Studio allows publishing the agent to a Teams experience (possibly appearing as a chatbot in the Teams chat interface). The steps typically involve publishing from Copilot Studio (which might give a direct link or add it to a catalog) . Once published, users can add the agent to their Teams chat contacts or perhaps we can pin it as an app. We might create a Teams channel for the risk assessment project and add the bot to that channel for group usage if collaborative analysis is desired.

For one-on-one use, a user can simply start a new chat with the agent’s name (like how they’d chat with a colleague). For group collaboration, we can invite the agent into a Team meeting or group chat during a workshop – for example, during a risk workshop, a facilitator could query the agent in real-time in front of participants (screen-sharing the output or everyone in the meeting seeing the agent’s responses). This could be powerful: multiple people could see the agent’s answers and agree or ask follow-ups. We will need to manage the conversation carefully in such scenarios to avoid confusion (only one user should query at a time).

We will provide guidance on how to invoke the agent in Teams and what commands to use. Possibly, we’ll create a help command like “help” that if a user types, the agent responds with a quick summary of what it can do (and the 6 steps). This acts as in-line documentation for end users.

  

**Security and Privacy**

Using the Copilot agent should not introduce new security risks if configured correctly. The data stays within Microsoft 365 environment – any content the agent uses from SharePoint never leaves the tenant’s control (the large language model processes it but doesn’t learn it; Microsoft 365 Copilot is designed such that customer data is not used to train the foundation model). We will verify that our configuration abides by **APRA’s prudential standards on data (CPS 234)** – meaning that sensitive data is handled with care. In practice, the agent is an approved internal tool, so it should meet APRA’s requirements as long as the company’s M365 environment is compliant.

We will emphasize that **no personal customer data** should be shared with the agent beyond what’s in the process docs. The focus is on process and risk info, which is less sensitive than, say, PII. Nonetheless, if any of the process documentation contains personal data or commercially sensitive info, it inherits the security of SharePoint (access control, logging of access, etc.). Each user’s queries and the agent’s responses might be stored in logs for a short time (for auditing or troubleshooting by Microsoft), but those are within the tenant and subject to admin oversight.

From a **privacy perspective**, all users interacting with the agent should be made aware that it’s an AI system that may have limitations. We’ll include a notice in the conversation start or training materials that “This AI agent generates responses based on provided data; please review its outputs for accuracy.” This aligns with responsible AI use – users remain the decision-makers, the agent is an assistant.

  

**Collaboration and Iteration**

As mentioned, the agent can be used individually or in group settings. For collaboration: if multiple team members want to work on the same process, they could either (a) each use the agent separately and compare notes, or (b) use it in a shared Teams channel so everyone sees the Q&A. We will determine the preferred mode. A shared channel bot might be useful for workshop settings, whereas individual chats might be better for preparatory analysis work.

We will also set up a feedback loop: perhaps a dedicated Team or channel where users can post if the Copilot gave a wrong or strange answer. This will help us fine-tune the agent’s prompts or add missing knowledge. Copilot Studio will allow us to update the agent’s instructions and knowledge iteratively; having user feedback is valuable for continuous improvement.

  

**Versioning and Maintenance**

The agent is essentially a product that will evolve. We will maintain **version control** through a few practices:

• **Change Log:** Document any changes we make to the system prompt or knowledge sources (e.g., “v1.1 – updated risk taxonomy to add new risk category X; v1.2 – refined prompt to clarify control evidence phrasing”). This can be kept in a SharePoint list or document.
• **Testing Updates:** Copilot Studio allows testing changes in real-time. We will do periodic tests (especially if we update the taxonomy or instructions) to ensure the agent still behaves as expected. For major changes, we might test in a non-production copy of the agent first.
• **Publishing New Versions:** When ready, we publish updates. Users might not even notice beyond improved accuracy. If any behavior changes (e.g., format tweaks), we’ll communicate that.
• **Backup:** Keep backup copies of the prompts and any custom content offline, in case we need to recreate the agent or roll back.

  

Since this agent will be used for an extended project (analyzing 50 processes over some weeks or months), we anticipate doing an initial calibration on a couple of processes, then adjusting the agent, then rolling it out for the bulk of processes. After all analyses are done, the agent can still remain as a **knowledge asset**. For example, later if someone wants to revisit a process, they could query the agent “What were the key risks identified for Process X?” assuming we either keep the conversation logs or feed the results back into knowledge. There’s potential to store the outputs (risk registers, etc.) in SharePoint and link that to the agent too, making it a reference tool in the future.

**Compliance and Governance**

Finally, from a governance standpoint, this custom agent will be managed under the company’s AI governance framework (if one exists). Microsoft provides admin center controls to monitor Copilot usage. We can enable **audit logging** for the agent’s activities – for instance, which user accessed it and possibly what knowledge source was queried (not the content of their question, but the act of access). This might help in compliance reporting or if APRA auditors want to know how AI is being used in risk management. We will coordinate with IT security and compliance teams to ensure using the Copilot agent meets all internal policies.

Microsoft’s documentation confirms that **Copilot agents can be governed centrally**, with controls on sharing and data usage . We’ll leverage those – e.g., if the risk team wants to share the agent with another department, that requires approval.

In summary, enterprise deployment of the CPS 230 Risk Assessment Copilot will be done carefully. We will start with limited user testing, enforce proper permissions, integrate it into Teams for easy access, and maintain the solution over time. Security and compliance are built-in via the M365 platform (data stays in tenant, with DLP and labeling adherence ). By following this plan, the company can confidently use the custom Copilot agent to enhance its risk assessment process while maintaining control and oversight typical of any enterprise system.

---

**Sources:**
1. Microsoft Copilot Studio Blog – _Natural language agent creation and knowledge integration_
2. Microsoft Copilot Studio Blog – _Governance: access controls and data staying within M365 boundary_
3. CPS 230 Workshop Prep Instructions (user-provided) – _Step-by-step analysis guidelines_
4. CPS 230 Process Analysis Template (user-provided) – _Defined output format and sections_
5. Risk Management Taxonomy for Australian Super Company (user-provided) – _Standard risk categories for classification_
6. Microsoft Copilot Studio Quickstart – _Adding knowledge sources via URL/SharePoint_
7. Field Service Agent Example (Microsoft Build Demo) – _Illustration of agent configuration with SharePoint knowledge_【18†】