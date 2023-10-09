INSERT INTO tasks (id, task_name, task_description)  VALUES
(0, 'Acknowledging Fear', 'Acknowledge your aversion to end of life planning'),
(1, 'Understanding EOLP', 'Create familiarity with the process'),
(2, 'Values and Priorities', 'Define your values and priorities'),
(3, 'Initial Plan', 'Create an initial end-of-life plan'),

(4, 'Existing Financials', 'Review your existing financial plan'),
(5, 'Non-financial Aspects', 'Explore non-financial aspects'),
(6, 'Will', 'Create a comprehensive will'),
(7, 'Specific Wishes', 'Communicate any specific wishes'),
(8, 'Plan Moving Forward', 'Regularly review and update'),

(9, 'Assemble Team', 'Assemble your financial team'),
(10, 'Living Trust', 'Establish a revocable living trust'),
(11, 'Tax Planning', 'Leverage tax planning strategies'),
(12, 'Family Governance', 'Develop a family governance plan.'),
(13, 'Emotional and Spiritual', 'Address emotional and spiritual concerns.'),
(14, 'Create Project', 'Create a legacy project')

INSERT INTO sub_tasks(task_id, task_name, task_description) VALUES
(0, 'Research Fear', 'Research books, articles, or podcasts on overcoming fear of death.'),
(0, 'Connect With Support', 'Connect with a local support group for individuals facing similar fears.'),
(0, 'Manage Anxiety', 'Explore mindfulness or meditation practices to help manage anxiety related to end-of-life topics.'),

(1, 'Create Checklist', 'Create a checklist of basic personal information needed for end-of-life planning.'),

(2, 'Your Values', 'Write down your personal values and beliefs.'),
(2, 'Causes to Support', 'Identify specific causes or charities you would like to support'),
(2, 'Legacy Statement', 'Legacy statement or ethical will to pass on your values to loved ones.'),

(3, 'Draft Intentions', 'Draft a simple letter of intent outlining your wishes for end-of-life care.'),
(3, 'Legal Plans', 'Complete healthcare proxies and power of attorney agents.'),


(4, 'Financial Inventory', 'Conduct a thorough inventory of all financial accounts and assets.'),
(4, 'Life Insurance', 'Review and update your life insurance policies, including coverage amounts and beneficiaries.'),
(4, 'Financial Document Storage', 'Store digital copies of important financial documents in a secure location.'),

(5, 'Personal Values', 'Create a comprehensive list of your personal values, preferences'),
(5, 'Important Contacts', 'Create a comprehensive list of  important contacts.'),
(5, 'Organ Donation', 'Document your preferred organ donation choices'),
(5, 'Burial/Cremation', 'Document your preferred  burial or cremation preferences.'),
(5, 'Eulogy', 'Create a eulogy for yourself')

(6, 'Asset Distribution', 'Leverage draft specific clauses regarding asset distribution, including any conditional bequests.'),
(6, 'Minor Children', 'Designate a guardian for minor children and establish trusts for their care.'),
(6, 'Digital Assets', 'Include provisions for digital assets, such as passwords and access instructions.'),

(7, 'Family Members', 'Schedule individual meetings with family members to discuss your end-of-life plans.'),
(7, 'Financial Institutions', 'Provide your executor with a detailed list of your financial institutions, account numbers, and contact information.'),
(7, 'Important Document Location', 'Share the location of your important documents, such as your will and healthcare directives.'),

(8, 'Annual Reminder', 'Set up an automated annual reminder for financial plan reviews.'),
(8, 'Major Life Change Updates', 'Update your beneficiaries and estate plan whenever you experience significant life changes, such as marriage, divorce, or the birth of a child.'),
(8, 'Periodic Preference Reviews', 'Conduct periodic reviews of your funeral or memorial preferences and make adjustments as needed.'),



(9, 'Find Lawyer', 'Research and interview multiple trust and estate lawyers to find the most suitable one.'),
(9, 'Financial Planner', 'Hire a financial planner to create a detailed financial roadmap and investment strategy.'),
(9, 'Certified Public Accountant', 'Collaborate with a certified public accountant (CPA) to address tax planning and compliance.'),

(10, 'Comprehensive Trust Document', 'Consult with your trust and estate lawyer to draft a comprehensive trust document.'),
(10, 'Asset Inventory', 'Review and update your asset inventory to ensure all valuable assets are included in the trust.'),
(10, 'Backup Successor Trustees', 'Appoint backup successor trustees and provide them with necessary information.'),

(11, 'Tax Planning Calendar', 'Create a comprehensive tax planning calendar outlining important deadlines.'),
(11, 'Reducing Estate Tax Liability', 'Implement gifting strategies to reduce potential estate tax liability.'),
(11, 'Charitable Giving', 'Consult with a philanthropic advisor to structure charitable giving in a tax-efficient manner.'),

(12, 'Family Meetings', 'Schedule regular family meetings, including an annual retreat to discuss long-term objectives.'),
(12, 'Family Counseling', 'Work with a family therapist or counselor to facilitate constructive communication and conflict resolution strategies.'),
(12, 'Family Mission', 'Create a family mission statement or constitution outlining the family''s values, mission, and governance principles.'),

(13, 'Death Doula', 'Arrange meetings with a death doula and spiritual advisor to explore emotional and spiritual concerns.'),

(14, 'Life Story', 'Record your life story and personal anecdotes to pass on your legacy.'),
(14, 'Family Philanthropic Participation', 'Establish a process for family members to participate in philanthropic initiatives and maintain alignment with family values.')
