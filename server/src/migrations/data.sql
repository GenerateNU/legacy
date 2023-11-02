-- Creating test personas
INSERT INTO personas (persona_title, persona_description, created_at, updated_at) VALUES 
('Procrastinating Rookie', 'Compassionate and reassuring', clock_timestamp(), clock_timestamp()),
('Adventurous Optimist', 'Informed and death positive', clock_timestamp(), clock_timestamp()),
('Adventurous Optimist with Wealth', 'Expert driven and death positive', clock_timestamp(), clock_timestamp());

-- Creating test users
INSERT INTO users (username, password, email, persona_id, created_at, updated_at) VALUES 
('testuser1', 'password', 'user1@example.com', 1, clock_timestamp(), clock_timestamp()),
('testuser2', 'password', 'user2@example.com', 2, clock_timestamp(), clock_timestamp()),
('testuser3', 'password', 'user3@example.com', 3, clock_timestamp(), clock_timestamp()),
('testuser4', 'password', 'user4@example.com', 1, clock_timestamp(), clock_timestamp()),
('testuser5', 'password', 'user5@example.com', 2, clock_timestamp(), clock_timestamp());

-- Creating user profile
INSERT INTO user_profiles (name, user_id, date_of_birth, phone_number, created_at, updated_at) VALUES 
('Test User 1', 1, '1990-01-01', '5555555555', clock_timestamp(), clock_timestamp()),
('Test User 2', 2, '1990-01-01', '5555555555', clock_timestamp(), clock_timestamp()),
('Test User 3', 3, '1990-01-01', '5555555555', clock_timestamp(), clock_timestamp()),
('Test User 4', 4, '1990-01-01', '5555555555', clock_timestamp(), clock_timestamp()),
('Test User 5', 5, '1990-01-01', '5555555555', clock_timestamp(), clock_timestamp());

-- Creating test tasks
INSERT INTO tasks (task_name, task_description, created_at, updated_at) VALUES 
('Acknowledging Fear', 'Acknowledge your aversion to end of life planning', clock_timestamp(), clock_timestamp()),
('Understanding EOLP', 'Create familiarity with the process', clock_timestamp(), clock_timestamp()),
('Values and Priorities', 'Define your values and priorities', clock_timestamp(), clock_timestamp()),
('Initial Plan', 'Create an initial end-of-life plan', clock_timestamp(), clock_timestamp()),
('Existing Financials', 'Review your existing financial plan', clock_timestamp(), clock_timestamp()),
('Non-financial Aspects', 'Explore non-financial aspects', clock_timestamp(), clock_timestamp()),
('Will', 'Create a comprehensive will', clock_timestamp(), clock_timestamp()),
('Specific Wishes', 'Communicate any specific wishes', clock_timestamp(), clock_timestamp()),
('Plan Moving Forward', 'Regularly review and update', clock_timestamp(), clock_timestamp()),
('Assemble Team', 'Assemble your financial team', clock_timestamp(), clock_timestamp()),
('Living Trust', 'Establish a revocable living trust', clock_timestamp(), clock_timestamp()),
('Tax Planning', 'Leverage tax planning strategies', clock_timestamp(), clock_timestamp()),
('Family Governance', 'Develop a family governance plan.', clock_timestamp(), clock_timestamp()),
('Emotional and Spiritual', 'Address emotional and spiritual concerns.', clock_timestamp(), clock_timestamp()),
('Create Project', 'Create a legacy project', clock_timestamp(), clock_timestamp());

-- Creating test task progress
INSERT INTO task_progresses (user_id, task_id, completed) VALUES 
(1, 1, True),
(1, 2, True),
(1, 3, False),
(1, 4, True);


-- Creating test subtasks
INSERT INTO sub_tasks (task_id, task_name, task_description, created_at, updated_at) VALUES
(1, 'Research Fear', 'Research books, articles, or podcasts on overcoming fear of death.', clock_timestamp(), clock_timestamp()),
(1, 'Connect With Support', 'Connect with a local support group for individuals facing similar fears.', clock_timestamp(), clock_timestamp()),
(1, 'Manage Anxiety', 'Explore mindfulness or meditation practices to help manage anxiety related to end-of-life topics.', clock_timestamp(), clock_timestamp()),
(2, 'Create Checklist', 'Create a checklist of basic personal information needed for end-of-life planning.', clock_timestamp(), clock_timestamp()),
(3, 'Your Values', 'Write down your personal values and beliefs.', clock_timestamp(), clock_timestamp()),
(3, 'Causes to Support', 'Identify specific causes or charities you would like to support', clock_timestamp(), clock_timestamp()),
(3, 'Legacy Statement', 'Legacy statement or ethical will to pass on your values to loved ones.', clock_timestamp(), clock_timestamp()),
(4, 'Draft Intentions', 'Draft a simple letter of intent outlining your wishes for end-of-life care.', clock_timestamp(), clock_timestamp()),
(4, 'Legal Plans', 'Complete healthcare proxies and power of attorney agents.', clock_timestamp(), clock_timestamp()),
(5, 'Financial Inventory', 'Conduct a thorough inventory of all financial accounts and assets.', clock_timestamp(), clock_timestamp()),
(5, 'Life Insurance', 'Review and update your life insurance policies, including coverage amounts and beneficiaries.', clock_timestamp(), clock_timestamp()),
(5, 'Financial Document Storage', 'Store digital copies of important financial documents in a secure location.', clock_timestamp(), clock_timestamp()),
(6, 'Personal Values', 'Create a comprehensive list of your personal values, preferences', clock_timestamp(), clock_timestamp()),
(6, 'Important Contacts', 'Create a comprehensive list of  important contacts.', clock_timestamp(), clock_timestamp()),
(6, 'Organ Donation', 'Document your preferred organ donation choices', clock_timestamp(), clock_timestamp()),
(6, 'Burial/Cremation', 'Document your preferred  burial or cremation preferences.', clock_timestamp(), clock_timestamp()),
(6, 'Eulogy', 'Create a eulogy for yourself', clock_timestamp(), clock_timestamp()),
(7, 'Asset Distribution', 'Leverage draft specific clauses regarding asset distribution, including any conditional bequests.', clock_timestamp(), clock_timestamp()),
(7, 'Minor Children', 'Designate a guardian for minor children and establish trusts for their care.', clock_timestamp(), clock_timestamp()),
(7, 'Digital Assets', 'Include provisions for digital assets, such as passwords and access instructions.', clock_timestamp(), clock_timestamp()),
(8, 'Family Members', 'Schedule individual meetings with family members to discuss your end-of-life plans.', clock_timestamp(), clock_timestamp()),
(8, 'Financial Institutions', 'Provide your executor with a detailed list of your financial institutions, account numbers, and contact information.', clock_timestamp(), clock_timestamp()),
(8, 'Important Document Location', 'Share the location of your important documents, such as your will and healthcare directives.', clock_timestamp(), clock_timestamp()),
(9, 'Annual Reminder', 'Set up an automated annual reminder for financial plan reviews.', clock_timestamp(), clock_timestamp()),
(9, 'Major Life Change Updates', 'Update your beneficiaries and estate plan whenever you experience significant life changes, such as marriage, divorce, or the birth of a child.', clock_timestamp(), clock_timestamp()),
(9, 'Periodic Preference Reviews', 'Conduct periodic reviews of your funeral or memorial preferences and make adjustments as needed.', clock_timestamp(), clock_timestamp()),
(10, 'Find Lawyer', 'Research and interview multiple trust and estate lawyers to find the most suitable one.', clock_timestamp(), clock_timestamp()),
(10, 'Financial Planner', 'Hire a financial planner to create a detailed financial roadmap and investment strategy.', clock_timestamp(), clock_timestamp()),
(10, 'Certified Public Accountant', 'Collaborate with a certified public accountant (CPA) to address tax planning and compliance.', clock_timestamp(), clock_timestamp()),
(11, 'Comprehensive Trust Document', 'Consult with your trust and estate lawyer to draft a comprehensive trust document.', clock_timestamp(), clock_timestamp()),
(11, 'Asset Inventory', 'Review and update your asset inventory to ensure all valuable assets are included in the trust.', clock_timestamp(), clock_timestamp()),
(11, 'Backup Successor Trustees', 'Appoint backup successor trustees and provide them with necessary information.', clock_timestamp(), clock_timestamp()),
(12, 'Tax Planning Calendar', 'Create a comprehensive tax planning calendar outlining important deadlines.', clock_timestamp(), clock_timestamp()),
(12, 'Reducing Estate Tax Liability', 'Implement gifting strategies to reduce potential estate tax liability.', clock_timestamp(), clock_timestamp()),
(12, 'Charitable Giving', 'Consult with a philanthropic advisor to structure charitable giving in a tax-efficient manner.', clock_timestamp(), clock_timestamp()),
(15, 'Family Meetings', 'Schedule regular family meetings, including an annual retreat to discuss long-term objectives.', clock_timestamp(), clock_timestamp()),
(13, 'Family Counseling', 'Work with a family therapist or counselor to facilitate constructive communication and conflict resolution strategies.', clock_timestamp(), clock_timestamp()),
(13, 'Family Mission', 'Create a family mission statement or constitution outlining the family''s values, mission, and governance principles.', clock_timestamp(), clock_timestamp()),
(14, 'Death Doula', 'Arrange meetings with a death doula and spiritual advisor to explore emotional and spiritual concerns.', clock_timestamp(), clock_timestamp()),
(15, 'Life Story', 'Record your life story and personal anecdotes to pass on your legacy.', clock_timestamp(), clock_timestamp()),
(15, 'Family Philanthropic Participation', 'Establish a process for family members to participate in philanthropic initiatives and maintain alignment with family values.', clock_timestamp(), clock_timestamp());

-- Insert relationships into the persona_tasks junction table

-- Persona 1: Procrastinating Rookie
INSERT INTO persona_tasks (persona_id, task_id) VALUES
(1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6), (1, 7), (1, 8);

-- Persona 2: Adventurous Optimist
INSERT INTO persona_tasks (persona_id, task_id) VALUES
(2, 4), (2, 5), (2, 6), (2, 6), (2, 6), (2, 7), (2, 8), (2, 9), (2, 9), (2, 9), (2, 10), (2, 11), (2, 12), (2, 13), (2, 14), (2, 15);

-- Persona 3: Adventurous Optimist with Wealth
INSERT INTO persona_tasks (persona_id, task_id) VALUES
(3, 10), (3, 11), (3, 12), (3, 13), (3, 11), (3, 14), (3, 15), (3, 16), (3, 17), (3, 18), (3, 19), (3, 20), (3, 21), (3, 22), (3, 23), (3, 24), (3, 25), (3, 26), (3, 27), (3, 28);

-- Creating test guides
INSERT INTO guides (guide_name, title, sub_title, author, author_image_url, mins_read, date, full_text) VALUES
('Test Guide', 'Preserving Your Legacy:', 'Practical Steps for Funeral Affordability', 'Barack Obama', 'https://images1.penguinrandomhouse.com/author/22627', 5, '2023-10-17T23:05:10.4895-04:00', 'In the grand symphony of life, there are few certainties. Among them, one stands out starkly: our time here is finite. Yet, it''s the inevitability of our final encore that many of us prefer not to dwell on. This is entirely human, but it''s a fact that can''t be brushed aside indefinitely. End-of-life planning, while often seen as daunting, can be transformed into an empowering process—a legacy of care and love for our loved ones. The Price of Peace of Mind The mention of end-of-life planning often brings to mind wills, trusts, and the distribution of assets. While these are crucial aspects, there''s another vital component that deserves your attention: funeral planning. The cost of funeral services can be staggering, leaving families not just grieving but also grappling with unexpected financial burdens. In today''s world, the average cost of a funeral can easily reach several thousand dollars, making it one of life''s most substantial expenses. This reality prompts a critical question: How can we ensure a dignified farewell without burdening our loved ones? The Legacy Solution At Legacy, we understand the importance of preserving your legacy while also being mindful of the costs involved. Our mission is to empower you to take control of your end-of-life planning with joyous urgency. We believe that by confronting these realities and making thoughtful decisions today, you can grant your loved ones the gift of peace of mind tomorrow. Step 1: Explore Your Options The first step to achieving affordable funeral arrangements is to explore your options. Funeral costs can vary significantly based on factors such as location, type of service, and personal preferences. By researching local funeral homes and considering cremation or green burial alternatives, you can discover cost-effective choices without compromising on respect and reverence. Step 2: Pre-Planning with Legacy One of the most practical ways to ease the financial burden of your final arrangements is through pre-planning. Legacy offers an intuitive platform that enables you to pre-plan your funeral with ease. By making decisions in advance and securing funds for your funeral, you ensure that your wishes are honored while alleviating the financial stress on your loved ones. Step 3: Share Your Plan Transparency is key. Once you''ve made your end-of-life plans, communicate them with your family and loved ones. Sharing your wishes not only fosters understanding but also avoids any unexpected surprises when the time comes. It ensures that your choices are respected and followed, offering a sense of closure to your loved ones. Step 4: Seek Professional Guidance Navigating the intricacies of end-of-life planning can be overwhelming. That''s where our team at Legacy shines. We connect you with trusted professionals who can provide expert guidance on legal and financial matters. Our extensive network of attorneys, doulas, and funeral planning experts ensures that you have the support you need. Step 5: Embrace Peace of Mind With your end-of-life plans in place, you can embrace the present with newfound peace of mind. Legacy''s platform streamlines the process, making it accessible, affordable, and personal. By preserving your legacy today, you create a lasting memory of love, thoughtfulness, and consideration for those who matter most. In Conclusion Preserving your legacy is a journey of love and responsibility. It''s about ensuring that your final chapter is both a celebration of life and a testament to your care for those who will remember you. Legacy is your partner in this journey, offering expertise, affordability, and a deep commitment to making the end-of-life planning process as smooth as possible. As you reflect on your life''s journey, consider the importance of end-of-life planning. Embrace the joyful urgency of today, and gift your loved ones the solace of knowing your final wishes are honored.');
