import type { ReportTemplates } from '../types';
import { FieldType } from '../types';

export const reportTemplates: ReportTemplates = {
  'treasury': {
    key: 'treasury',
    name: "Treasury Department Quarterly Report",
    title: "Treasury Department Quarterly Report",
    sections: [
        {
            id: 'header',
            title: 'Basic Information',
            fields: [
              { id: 'churchName', label: 'Church Name', type: FieldType.TEXT, tooltip: 'e.g., Grace Seventh-day Adventist Church' },
              { id: 'quarter', label: 'Quarter & Period', type: FieldType.TEXT, tooltip: 'e.g., Q3 2025 (1 Jul 2025 - 30 Sep 2025)' },
              { id: 'preparedBy', label: 'Prepared by (Treasurer)', type: FieldType.TEXT, tooltip: 'e.g., John M.' },
              { id: 'date', label: 'Date', type: FieldType.DATE, tooltip: 'e.g., 30-Sep-2025' },
            ],
        },
        {
            id: 'executiveSummary',
            title: '1. Executive Summary',
            fields: [
              {
                id: 'summaryTable',
                label: '',
                type: FieldType.TABLE,
                columns: ['Item', 'Amount (K)'],
                editableFirstColumn: false,
                rows: [
                  { item: 'Opening cash balance', amount: 0, tooltips: { amount: 'e.g., K 12,450.00' } },
                  { item: 'Total receipts this quarter', amount: 0, tooltips: { amount: 'e.g., K 27,520.00' } },
                  { item: 'Total disbursements this quarter', amount: 0, tooltips: { amount: 'e.g., 20,720.00' } },
                  { item: 'Net change in cash', amount: 0, tooltips: { amount: 'e.g., 6,800.00' } },
                  { item: 'Closing cash balance', amount: 0, tooltips: { amount: 'e.g., 19,250.00' } },
                ],
              },
            ],
        },
        {
            id: 'financialSummary',
            title: '2. Comparative Financial Summary',
            fields: [
              {
                id: 'receiptsTable',
                label: 'Receipts',
                type: FieldType.TABLE,
                columns: ['Category', 'Amount (K)'],
                editableFirstColumn: false,
                rows: [
                  { category: 'Tithe Received', amount: 0, tooltips: { amount: 'e.g., K 18,200.00' } },
                  { category: 'Local Church Budget (LCB)', amount: 0, tooltips: { amount: 'e.g., K 6,400.00' } },
                  { category: 'Sabbath School Offering', amount: 0, tooltips: { amount: 'e.g., 820.00' } },
                  { category: 'Mission Offerings (Adventist Mission)', amount: 0, tooltips: { amount: 'e.g., K 1,150.00' } },
                  { category: 'Special/Designated Offerings', amount: 0, tooltips: { amount: 'e.g., 600.00' } },
                  { category: 'Other Income (rent)', amount: 0, tooltips: { amount: 'e.g., 350.00' } },
                  { category: 'Total Receipts', amount: 0, tooltips: { amount: 'e.g., 27,520.00' } },
                ]
              },
              {
                id: 'disbursementsTable',
                label: 'Disbursements',
                type: FieldType.TABLE,
                columns: ['Category', 'Amount (K)'],
                editableFirstColumn: false,
                rows: [
                  { category: 'Salaries & Benefits', amount: 0, tooltips: { amount: 'e.g., 10,500.00' } },
                  { category: 'Utilities (electric, water)', amount: 0, tooltips: { amount: 'e.g., 1,120.00' } },
                  { category: 'Maintenance & Repairs', amount: 0, tooltips: { amount: 'e.g., 1,800.00' } },
                  { category: 'Program Ministries', amount: 0, tooltips: { amount: 'e.g., 1,200.00' } },
                  { category: 'Outreach & Community Service', amount: 0, tooltips: { amount: 'e.g., 450.00' } },
                  { category: 'Office Supplies & Administration', amount: 0, tooltips: { amount: 'e.g., 300.00' } },
                  { category: 'Missions & Conference Apportionments', amount: 0, tooltips: { amount: 'e.g., 4,000.00' } },
                  { category: 'Loans / Mortgage Payments', amount: 0, tooltips: { amount: 'e.g., 1,200.00' } },
                  { category: 'Miscellaneous', amount: 0, tooltips: { amount: 'e.g., 150.00' } },
                  { category: 'Total Disbursements', amount: 0, tooltips: { amount: 'e.g., 20,720.00' } },
                  { category: 'Net Surplus / (Deficit)', amount: 0, tooltips: { amount: 'e.g., 6,800.00' } },
                ]
              }
            ]
        },
        {
            id: 'detailedSamples',
            title: '3. Detailed Samples',
            fields: [
              {
                id: 'receiptsDetailTable',
                label: 'Receipts - Detailed Sample',
                type: FieldType.TABLE,
                columns: ['Date', 'Source', 'Amount (K)', 'Ref'],
                rows: [
                    { date: '', source: '', amount: 0, ref: '', tooltips: { date: 'e.g., 03-Jul', source: 'e.g., Tithe - Envelopes', amount: 'e.g., 3,800.00', ref: 'e.g., Dep# 2025-07-03' } },
                    { date: '', source: '', amount: 0, ref: '', tooltips: { date: 'e.g., 10-Aug', source: 'e.g., LCB - Sunday fundraiser', amount: 'e.g., 2,100.00', ref: 'e.g., Dep# 2025-08-10' } },
                    { date: '', source: '', amount: 0, ref: '', tooltips: { date: 'e.g., 17-Aug', source: 'e.g., Rent (hall)', amount: 'e.g., 350.00', ref: 'e.g., Dep# 2025-08-17' } },
                ],
              },
              {
                id: 'disbursementsDetailTable',
                label: 'Disbursements - Detailed Sample',
                type: FieldType.TABLE,
                columns: ['Date', 'Payee / Purpose', 'Amount (K)', 'Check/EFT'],
                rows: [
                    { date: '', payee: '', amount: 0, ref: '', tooltips: { date: 'e.g., 05-Jul', payee: 'e.g., Pastor salary (Jul)', amount: 'e.g., 3,500.00', ref: 'e.g., EFT 6201' } },
                    { date: '', payee: '', amount: 0, ref: '', tooltips: { date: 'e.g., 12-Aug', payee: 'e.g., Electric bill (Aug)', amount: 'e.g., 620.00', ref: 'e.g., Chq 301' } },
                    { date: '', payee: '', amount: 0, ref: '', tooltips: { date: 'e.g., 15-Sep', payee: 'e.g., Repairs - roof leak', amount: 'e.g., 1,200.00', ref: 'e.g., Chq 305' } },
                ],
              },
            ],
        },
        {
            id: 'reconciliation',
            title: '4. Bank & Cash Reconciliation',
            fields: [
                { id: 'recon_bullets', label: 'End of Quarter Reconciliation', type: FieldType.BULLET, tooltip: 'e.g.,\n• Book (Treasurer) closing balance: K19,250.00\n• Bank statement balance: K18,900.00\n• Deposits in transit: K550.00\n• Outstanding checks: K200.00\n• Bank adjusted balance: K18,900 + K550 - K200 = K19,250.00' }
            ]
        },
        {
            id: 'remittances',
            title: '5. Remittances & Apportionments',
            fields: [
                 {
                    id: 'remittancesTable',
                    label: '',
                    type: FieldType.TABLE,
                    columns: ['Recipient', 'Amount Due', 'Amount Remitted', 'Date Remitted', 'Balance Due'],
                    rows: [
                        { recipient: '', due: 0, remitted: 0, date: '', balance: 0, tooltips: { recipient: 'e.g., Conference Apportionment', due: 'e.g., 4,000.00', remitted: 'e.g., 3,000.00', date: 'e.g., 20-Aug-2025', balance: 'e.g., 1,000.00' } },
                        { recipient: '', due: 0, remitted: 0, date: '', balance: 0, tooltips: { recipient: 'e.g., World Mission / Adventist Mission', due: 'e.g., 1,150.00', remitted: 'e.g., 1,150.00', date: 'e.g., 05-Sep-2025', balance: 'e.g., 0.00' } },
                    ]
                }
            ]
        },
        {
            id: 'funds',
            title: '6. Funds & Investments',
            fields: [
                 { id: 'funds_bullets', label: 'Sample Funds', type: FieldType.BULLET, tooltip: 'e.g.,\n• Building Fund - Opening K7,200.00; Receipts K1,500.00; Disbursements K500.00; Closing K8,200.00.\n• Savings (Reserve account) — Closing balance K6,100.00.\n• Loan: Adventist Credit Union — Original K50,000.00; Current balance K28,400.00.' }
            ]
        },
        {
            id: 'controls',
            title: '7. Internal Controls',
            fields: [
                 { id: 'controls_bullets', label: 'Sample Notes', type: FieldType.BULLET, tooltip: 'e.g.,\n• Offering counted by two counters (A and B).\n• Segregation of duties OK.\n• No irregularities noted.' }
            ]
        },
        {
            id: 'notes',
            title: '8. Notes / Variance Analysis & Recommendations',
            fields: [
                 { id: 'notes_bullets', label: '', type: FieldType.BULLET, tooltip: 'e.g.,\n• Conference apportionment short by K1,000 due to timing; prioritize remittance next month.\n• Building fund receipts trending up.\n• Recommendation: move petty cash reconciliation to monthly rather than quarterly.' }
            ]
        },
        {
            id: 'signatures',
            title: 'Signatures',
            fields: [
                {id: 'preparedBy', label: 'Prepared by', type: FieldType.SIGNATURE, tooltip: 'e.g.,\nName: John M. (Treasurer)\nDate: 30-Sep-2025'},
            ]
        }
    ]
  },
  'church-clerk': {
    key: 'church-clerk',
    name: "Clerk's Quarterly Report",
    title: "Church Clerk's Quarterly Report",
    sections: [
        {
            id: 'header',
            title: 'Basic Information',
            fields: [
              { id: 'churchName', label: 'Church Name', type: FieldType.TEXT, tooltip: 'e.g., Grace Seventh-day Adventist Church' },
              { id: 'quarter', label: 'Quarter', type: FieldType.TEXT, tooltip: 'e.g., Q3 2025' },
              { id: 'preparedBy', label: 'Prepared by (Church Clerk)', type: FieldType.TEXT, tooltip: 'e.g., Mary A.' },
              { id: 'date', label: 'Date', type: FieldType.DATE, tooltip: 'e.g., 30-Sep-2025' },
            ],
        },
        {
            id: 'executiveSummary',
            title: '1. Executive Summary',
            fields: [
                 {
                    id: 'summaryTable',
                    label: '',
                    type: FieldType.TABLE,
                    columns: ['Item', 'Number'],
                    editableFirstColumn: false,
                    rows: [
                      { item: 'Total membership (beginning of quarter)', number: 0, tooltips: { number: 'e.g., 312' } },
                      { item: 'Baptisms this quarter', number: 0, tooltips: { number: 'e.g., 4' } },
                      { item: 'Transfers in', number: 0, tooltips: { number: 'e.g., 3' } },
                      { item: 'Transfers out', number: 0, tooltips: { number: 'e.g., 2' } },
                      { item: 'Deaths', number: 0, tooltips: { number: 'e.g., 1' } },
                      { item: 'Net membership change', number: 0, tooltips: { number: 'e.g., +4' } },
                      { item: 'Total membership (end of quarter)', number: 0, tooltips: { number: 'e.g., 316' } },
                    ],
                },
            ]
        },
        {
            id: 'membershipStats',
            title: '2. Membership Statistics (Selected)',
            fields: [
                {
                    id: 'statsTable',
                    label: '',
                    type: FieldType.TABLE,
                    columns: ['Category', 'Current Quarter'],
                    editableFirstColumn: false,
                    rows: [
                      { category: 'Total Members (Active) - End', number: 0, tooltips: { number: 'e.g., 316' } },
                      { category: 'Baptized Members added', number: 0, tooltips: { number: 'e.g., 4' } },
                      { category: 'Transfers In', number: 0, tooltips: { number: 'e.g., 3' } },
                      { category: 'Transfers Out', number: 0, tooltips: { number: 'e.g., 2' } },
                      { category: 'Deaths', number: 0, tooltips: { number: 'e.g., 1' } },
                      { category: 'Certificates issued (membership/baptism)', number: 0, tooltips: { number: 'e.g., 7' } },
                    ]
                }
            ]
        },
        {
            id: 'membershipChanges',
            title: '3. Membership Changes — Sample Ledger Entries',
            fields: [
                {
                    id: 'ledgerTable',
                    label: '',
                    type: FieldType.TABLE,
                    columns: ['Date', 'Name', 'Change Type', 'From/To', 'Notes / Ref'],
                    rows: [
                        { date: '', name: '', type: '', fromto: '', notes: '', tooltips: { date: 'e.g., 10-Jul-2025', name: 'e.g., Anna K.', type: 'e.g., Baptism', fromto: 'e.g., —', notes: 'e.g., Baptized by Pastor J. — Cert #B-2025-07' } },
                        { date: '', name: '', type: '', fromto: '', notes: '', tooltips: { date: 'e.g., 02-Aug-2025', name: 'e.g., Peter M.', type: 'e.g., Transfer In', fromto: 'e.g., From Westside SDA', notes: 'e.g., Transfer letter received' } },
                        { date: '', name: '', type: '', fromto: '', notes: '', tooltips: { date: 'e.g., 16-Aug-2025', name: 'e.g., Samuel T.', type: 'e.g., Transfer Out', fromto: 'e.g., To Lakeside SDA', notes: 'e.g., Certificate mailed' } },
                        { date: '', name: '', type: '', fromto: '', notes: '', tooltips: { date: 'e.g., 18-Sep-2025', name: 'e.g., John E.', type: 'e.g., Death', fromto: 'e.g., —', notes: 'e.g., Funeral 20-Sep; death cert on file' } },
                    ]
                }
            ]
        },
        {
            id: 'otherRecords',
            title: '4. Other Records & Statistics',
            fields: [
                { id: 'baptisms', label: 'Baptisms & candidates', type: FieldType.BULLET, tooltip: 'e.g.,\n• Candidates presented for baptism: 5\n• Actual baptisms performed: 4\n• Candidates pending: 1' },
                { id: 'marriages', label: 'Marriages & Funerals', type: FieldType.BULLET, tooltip: 'e.g.,\n• Marriages registered: 1\n• Funerals recorded: 1' },
                { id: 'registers', label: 'Records & registers', type: FieldType.BULLET, tooltip: 'e.g.,\n• Membership register: Updated 30-Sep-2025\n• Baptismal register: Updated 30-Sep-2025\n• Backups: Electronic backup stored in Google Drive' },
                { id: 'attendance', label: 'Attendance & program records (averages)', type: FieldType.BULLET, tooltip: 'e.g.,\n• Average Sabbath School attendance: 96\n• Average Divine Service attendance: 220\n• Youth attendance (monthly average): 42' },
                { id: 'pastoral', label: 'Pastoral visits / member care', type: FieldType.BULLET, tooltip: 'e.g.,\n• Pastoral visits recorded: 18 visits this quarter\n• Noted needs: 4 families requested counseling' },
            ]
        },
        {
            id: 'admin',
            title: '5. Administration & Compliance',
            fields: [
                 { id: 'correspondence', label: 'Official correspondence & submissions', type: FieldType.BULLET, tooltip: 'e.g.,\n• Quarterly membership return to Conference filed: 29-Sep-2025\n• Transfer certificates issued: 3' },
                 { id: 'compliance', label: 'Compliance & internal controls', type: FieldType.BULLET, tooltip: 'e.g.,\n• Membership changes supported by certificates/minutes: Yes.\n• Minutes recorded: All membership actions recorded in Church Board minutes.\n• No discrepancies found in records.' },
            ]
        },
        {
            id: 'actions',
            title: '6. Action Items & Recommendations',
            fields: [
                { id: 'actionItems', label: '', type: FieldType.BULLET, tooltip: 'e.g.,\n• Follow up with one pending baptism candidate.\n• Send remaining transfer documents to receiving church (2 outstanding).\n• Perform annual backup validation.\n• Update the membership register to flag long-inactive members.' }
            ]
        },
        {
            id: 'summary',
            title: '7. Quick Combined One-line Bulletin Summary (Optional)',
            fields: [
                { id: 'bulletinSummary', label: '', type: FieldType.BULLET, tooltip: 'e.g.,\n• Receipts (Q3): K27,520\n• Disbursements (Q3): K20,720\n• Cash end: K19,250\n• Members end: 316\n• Baptisms: 4' }
            ]
        },
        {
            id: 'signatures',
            title: 'Signatures',
            fields: [
                {id: 'preparedBy', label: 'Prepared by', type: FieldType.SIGNATURE, tooltip: 'e.g.,\nName: Mary A. (Church Clerk)\nDate: 30-Sep-2025'},
            ]
        }
    ]
  },
  'branch-church': {
    key: 'branch-church',
    name: "Branch/Cell Church Quarterly Report",
    title: "Quarterly Report Form Branch/Cell Church",
    sections: [
        {
            id: 'generalInfo',
            title: 'General Information',
            fields: [
                { id: 'branchName', label: 'Branch Church Name', type: FieldType.TEXT, tooltip: 'e.g., Hope Branch SDA' },
                { id: 'reportingArea', label: 'Reporting Area', type: FieldType.TEXT, tooltip: 'e.g., North District' },
                { id: 'reportingQuarter', label: 'Reporting Quarter', type: FieldType.TEXT, tooltip: 'e.g., Q2' },
                { id: 'reportingLeader', label: 'Reporting Leader Name', type: FieldType.TEXT, tooltip: 'e.g., Elder John Doe' },
                { id: 'position', label: 'Position', type: FieldType.TEXT, tooltip: 'e.g., Branch Leader' },
                { id: 'dateSubmitted', label: 'Date Submitted', type: FieldType.DATE, tooltip: 'e.g., 2025-07-01' },
            ]
        },
        {
            id: 'generalMembership',
            title: '1. General Membership',
            fields: [
                {
                    id: 'membershipTable',
                    label: '',
                    type: FieldType.TABLE,
                    columns: ['Category', 'Details'],
                    editableFirstColumn: false,
                    rows: [
                        { category: 'Total Active Sabbath School Members', details: '', tooltips: { details: 'e.g., 45' } },
                        { category: 'New Members This Quarter', details: '', tooltips: { details: 'e.g., 3 (2 baptisms, 1 transfer)' } },
                        { category: 'Inactive Members (reasons if known)', details: '', tooltips: { details: 'e.g., 1 (relocated for work)' } },
                        { category: 'New Baptism Candidates', details: '', tooltips: { details: 'e.g., 5' } },
                        { category: 'Member Relocations / Transfers', details: '', tooltips: { details: 'e.g., 2 out, 1 in' } },
                        { category: 'New Interests', details: '', tooltips: { details: 'e.g., 8 from recent outreach' } },
                    ]
                }
            ]
        },
        {
            id: 'youthChildrenProgram',
            title: "2. Youth and Children's Program",
            fields: [
                {
                    id: 'youthChildrenTable',
                    label: '',
                    type: FieldType.TABLE,
                    columns: ['Date', 'Kids/Youth Activities Conducted', 'No. of Kids/Youths Involved', 'Details', 'Training Needs - Details'],
                    rows: [
                        { date: '', activity: '', involved: '', details: '', needs: '', tooltips: { date: 'e.g., 2025-04-15', activity: 'e.g., Youth Bible Quiz', involved: 'e.g., 15', details: 'e.g., Quiz covered the book of Daniel. Winners received prizes.', needs: 'e.g., Need more Bibles and study materials for youth.' } },
                        { date: '', activity: '', involved: '', details: '', needs: '' },
                        { date: '', activity: '', involved: '', details: '', needs: '' },
                    ]
                }
            ]
        },
        {
            id: 'bibleStudies',
            title: "3. Bible Studies",
            fields: [
                {
                    id: 'bibleStudiesTable',
                    label: '',
                    type: FieldType.TABLE,
                    columns: ['Frequency', 'Teacher(s)', 'Topics Covered', 'Attendance'],
                    rows: [
                        { frequency: '', teachers: '', topics: '', attendance: '', tooltips: { frequency: 'e.g., Weekly (Wednesday)', teachers: 'e.g., Elder Smith, Sis. Jane', topics: 'e.g., Steps to Christ, Prophecies of Daniel', attendance: 'e.g., Average 12' } },
                        { frequency: '', teachers: '', topics: '', attendance: '' },
                        { frequency: '', teachers: '', topics: '', attendance: '' },
                    ]
                }
            ]
        },
        {
            id: 'layActivities',
            title: "4. Lay Activities (e.g. Branch S. School, Youth Outreach)",
            fields: [
                {
                    id: 'layActivitiesTable',
                    label: '',
                    type: FieldType.TABLE,
                    columns: ['Date', 'Description of Activity', 'Participants', 'Results / Impact'],
                    rows: [
                        { date: '', description: '', participants: '', results: '', tooltips: { date: 'e.g., 2025-05-20', description: 'e.g., Community outreach with health talks', participants: 'e.g., 25 members, 40 community visitors', results: 'e.g., 5 new interests for Bible studies, positive community feedback.' } },
                        { date: '', description: '', participants: '', results: '' },
                        { date: '', description: '', participants: '', results: '' },
                    ]
                }
            ]
        },
        {
            id: 'specialServices',
            title: "5. Special Divine Services/Meetings/Highlights",
            fields: [
                {
                    id: 'specialServicesTable',
                    label: '',
                    type: FieldType.TABLE,
                    columns: ['Date', 'DS Worship/Meetings/Highlights', 'Guest Speaker(s) / Highlights'],
                    rows: [
                        { date: '', description: '', speaker: '', tooltips: { date: 'e.g., 2025-06-08', description: 'e.g., Family Life Emphasis Day', speaker: 'e.g., Pastor Miller from Main Church' } },
                        { date: '', description: '', speaker: '' },
                    ]
                }
            ]
        },
        {
            id: 'supportVisit',
            title: "6. Ministerial & Eldership Support/Visit",
            fields: [
                {
                    id: 'supportVisitTable',
                    label: '',
                    type: FieldType.TABLE,
                    columns: ['Category', 'Details'],
                    editableFirstColumn: false,
                    rows: [
                        { category: 'Support/Visits received from Main Church', details: '', tooltips: { details: 'e.g., Pastor visited twice for counseling and planning.' } },
                        { category: 'Support/Visits received from Branch Church (This is only to be filled by cell churches)', details: '', tooltips: { details: 'e.g., N/A for branch church, applicable for cell churches.' } },
                        { category: 'Ministerial Visits', details: '', tooltips: { details: 'e.g., District pastor attended branch board meeting in May.' } },
                        { category: 'Challenges in spiritual leadership (if any)', details: '', tooltips: { details: 'e.g., Need for more training for newly appointed deacons.' } },
                    ]
                }
            ]
        },
        {
            id: 'visitationPrograms',
            title: "7. Visitation Programs",
            fields: [
                {
                    id: 'visitationTable',
                    label: '',
                    type: FieldType.TABLE,
                    columns: ['Date', 'No. of Visits', 'Nature of Visit', 'Special Needs / Follow-ups Noted'],
                    rows: [
                        { date: '', visits: '', nature: '', needs: '', tooltips: { date: 'e.g., April-June', visits: 'e.g., 15', nature: 'e.g., Sick members, inactive members, new interests', needs: 'e.g., One family needs welfare support. Follow-up Bible studies with 3 interests.' } },
                        { date: '', visits: '', nature: '', needs: '' },
                        { date: '', visits: '', nature: '', needs: '' },
                    ]
                }
            ]
        },
        {
            id: 'prayerWalks',
            title: "8. Prayer Walks Conducted",
            fields: [
                {
                    id: 'prayerWalksTable',
                    label: '',
                    type: FieldType.TABLE,
                    columns: ['Frequency', 'Location', 'Participants', 'Outcomes/Testimonies'],
                    rows: [
                        { frequency: '', location: '', participants: '', outcomes: '', tooltips: { frequency: 'e.g., Monthly (First Sabbath)', location: 'e.g., Surrounding community, school area', participants: 'e.g., Average 10 members', outcomes: 'e.g., Members feel more connected to the community. One family requested prayer and is now attending church.' } },
                        { frequency: '', location: '', participants: '', outcomes: '' },
                    ]
                }
            ]
        },
        {
            id: 'womensMinistries',
            title: "9. Women's Ministries Activities",
            fields: [
                {
                    id: 'womensMinistriesTable',
                    label: '',
                    type: FieldType.TABLE,
                    columns: ['Date', 'Fellowship Meetings / Outreach Conducted', 'Attendance', 'Details'],
                    rows: [
                        { date: '', meetings: '', attendance: '', details: '', tooltips: { date: 'e.g., 2025-05-11', meetings: "e.g., Mother's Day special program & outreach", attendance: 'e.g., 30 members, 15 visitors', details: 'e.g., Honored mothers and distributed care packages to single mothers in the community.' } },
                        { date: '', meetings: '', attendance: '', details: '' },
                    ]
                }
            ]
        },
        {
            id: 'offeringsFinance',
            title: "10. Offerings & Finance",
            fields: [
                {
                    id: 'financeTable',
                    label: '',
                    type: FieldType.TABLE,
                    columns: ['Category', 'Details'],
                    editableFirstColumn: false,
                    rows: [
                        { category: 'Total Offerings Collected', details: '', tooltips: { details: 'e.g., K5,500' } },
                        { category: 'Transferred to Main Church (Yes/No)', details: '', tooltips: { details: 'e.g., Yes' } },
                        { category: 'If yes, then how much Transferred', details: '', tooltips: { details: 'e.g., K5,500 (100% of tithe and offerings)' } },
                        { category: 'Special Projects/Needs', details: '', tooltips: { details: 'e.g., Fundraising for new chairs started.' } },
                        { category: 'Donations/Pledges Made', details: '', tooltips: { details: 'e.g., Pledges of K800 for chairs project.' } },
                        { category: 'Summary of Needs Next Quarter', details: '', tooltips: { details: 'e.g., Need K2,000 to complete chair project.' } },
                        { category: 'If no normal Offering Collection Indicate reason', details: '', tooltips: { details: 'e.g., N/A' } },
                    ]
                }
            ]
        },
        {
            id: 'facilitiesLogistics',
            title: "11. Facilities & Logistics",
            fields: [
                {
                    id: 'facilitiesTable',
                    label: '',
                    type: FieldType.TABLE,
                    columns: ['Category', 'Details'],
                    editableFirstColumn: false,
                    rows: [
                        { category: 'Worship Venue Condition', details: '', tooltips: { details: 'e.g., Good, but needs painting.' } },
                        { category: 'Equipment Needs (chairs, tents, etc.)', details: '', tooltips: { details: 'e.g., 20 new chairs needed, 1 new tent for outreach.' } },
                        { category: 'Land or Property Progress', details: '', tooltips: { details: 'e.g., No new progress this quarter.' } },
                        { category: 'Challenges in Logistics', details: '', tooltips: { details: 'e.g., Transporting equipment for outreach events is a challenge.' } },
                    ]
                }
            ]
        },
        {
            id: 'challengesRecommendations',
            title: "12. Challenges & Recommendations",
            fields: [
                {
                    id: 'challengesTable',
                    label: '',
                    type: FieldType.TABLE,
                    columns: ['Category', 'Details'],
                    editableFirstColumn: false,
                    rows: [
                        { category: 'Main Challenges', details: '', tooltips: { details: 'e.g., Member retention after baptism. Lack of transport for activities.' } },
                        { category: 'Suggestions for Improvement', details: '', tooltips: { details: 'e.g., Start a mentorship program for new members. Fundraise for a small vehicle.' } },
                        { category: 'Support needed from Church Board/Ministers', details: '', tooltips: { details: 'e.g., Request for pastor to conduct a training on member retention.' } },
                    ]
                }
            ]
        },
        {
            id: 'acknowledgments',
            title: "13. Acknowledgments",
            fields: [
                {
                    id: 'acknowledgmentsTable',
                    label: '',
                    type: FieldType.TABLE,
                    columns: ['Category', 'Details'],
                    editableFirstColumn: false,
                    rows: [
                        { category: 'Recognition of Help Received', details: '', tooltips: { details: 'e.g., Thankful for the main church providing a guest speaker for our Family Life day.' } },
                        { category: 'Member Contributions Worth Noting', details: '', tooltips: { details: 'e.g., The Tano family for consistently providing their vehicle for visitation.' } },
                        { category: 'Encouraging Testimonies or Answered Prayers', details: '', tooltips: { details: 'e.g., Two families who were visited and prayed for have started attending church regularly.' } },
                    ]
                }
            ]
        },
        {
            id: 'summaryNextSteps',
            title: "14. Summary & Next Steps",
            fields: [
                {
                    id: 'summaryTable',
                    label: '',
                    type: FieldType.TABLE,
                    columns: ['Category', 'Details'],
                    editableFirstColumn: false,
                    rows: [
                        { category: 'Summary of Spiritual Health', details: '', tooltips: { details: 'e.g., The branch is spiritually vibrant, with active small groups and outreach. Growth is steady.' } },
                        { category: 'Goals for Next Quarter', details: '', tooltips: { details: 'e.g., Baptize 5 new candidates. Purchase 20 new chairs. Start a new Bible study group.' } },
                        { category: 'Planned Activities', details: '', tooltips: { details: 'e.g., Community Health Expo in July, Week of Prayer in August.' } },
                        { category: 'Summary Comment (optional)', details: '', tooltips: { details: 'e.g., A blessed quarter with visible growth and member involvement.' } },
                    ]
                }
            ]
        },
        {
            id: 'additionalPhotos',
            title: 'Additional Photos',
            fields: [
                { id: 'additional_photos', label: 'Attach additional photos or supporting documents if needed.', type: FieldType.PHOTOS },
            ]
        },
        {
            id: 'leaders',
            title: 'Branch/Cell Leaders',
            fields: [
                {
                    id: 'mainLeadersTable',
                    label: '',
                    type: FieldType.TABLE,
                    columns: ['Role', 'Details'],
                    editableFirstColumn: false,
                    rows: [
                        { role: 'Elder in Charge', details: '', tooltips: { details: 'e.g., John Doe' } },
                        { role: 'Contact', details: '', tooltips: { details: 'e.g., 123-456-7890' } },
                        { role: 'Report Submitted By', details: '', tooltips: { details: 'e.g., John Doe' } },
                        { role: 'Contact', details: '', tooltips: { details: 'e.g., 123-456-7890, johndoe@email.com' } },
                    ]
                },
                {
                    id: 'otherLeadersTable',
                    label: 'Other Leaders (Indicate Name and Position)',
                    type: FieldType.TABLE,
                    columns: ['Name', 'Position', 'Contact'],
                    rows: [
                        { name: '', position: '', contact: '', tooltips: { name: 'e.g., Jane Smith', position: 'e.g., Sabbath School Leader', contact: 'e.g., 987-654-3210' } },
                        { name: '', position: '', contact: '' },
                    ]
                }
            ]
        },
        {
            id: 'signatures',
            title: 'Signatures',
            fields: [
                {id: 'preparedBy', label: 'Prepared by', type: FieldType.SIGNATURE, tooltip: 'e.g.,\nName: Elder John Kena (Branch Church Leader)\nDate: 12/03/2005'},
            ]
        }
    ]
  },
  'elders': {
    key: 'elders',
    name: "Elders' Department Quarterly Report",
    title: "Elders' Department Quarterly Report",
    sections: [
        {
            id: 'header',
            title: 'Report Header',
            fields: [
              { id: 'churchName', label: 'Church Name', type: FieldType.TEXT, placeholder: 'e.g., Grace Seventh-day Adventist Church', tooltip: 'e.g., Grace Seventh-day Adventist Church' },
              { id: 'quarter', label: 'Quarter', type: FieldType.TEXT, placeholder: 'e.g., Q1 (Jan-Mar)', tooltip: 'e.g., Q1 (Jan-Mar)' },
              { id: 'year', label: 'Year', type: FieldType.NUMBER, placeholder: 'e.g., 2025', tooltip: 'e.g., 2025' },
            ],
        },
        {
            id: 'generalInfo',
            title: '1. General Information',
            fields: [
              {
                id: 'infoTable',
                label: '',
                type: FieldType.TABLE,
                columns: ['Item', 'Details'],
                editableFirstColumn: false,
                rows: [
                  { item: 'Church Name', details: '', tooltips: { details: 'e.g., Grace SDA Church' } },
                  { item: 'Mission/Conference', details: '', tooltips: { details: 'e.g., Central Valley Conference' } },
                  { item: 'Head Elder', details: '', tooltips: { details: 'e.g., Elder Joseph Amankwah' } },
                  { item: 'Number of Serving Elders', details: 0, tooltips: { details: 'e.g., 5' } },
                  { item: 'Date Submitted', details: '', tooltips: { details: 'e.g., April 6, 2025' } },
                ],
              },
            ],
        },
        {
            id: 'worship',
            title: '2. Worship & Service Leadership',
            fields: [
              {
                id: 'worshipTable',
                label: 'Activities',
                type: FieldType.TABLE,
                columns: ['Activity', 'Number Conducted', 'Notes'],
                rows: [
                  { activity: 'Sabbath Worship Services Led by Elders', number: 0, notes: '', tooltips: { number: 'e.g., 8', notes: 'e.g., Covered when pastor traveled' } },
                  { activity: 'Communion Services Assisted/Conducted', number: 0, notes: '', tooltips: { number: 'e.g., 1', notes: 'e.g., Assisted pastor in March' } },
                  { activity: 'Midweek Prayer Meetings Led', number: 0, notes: '', tooltips: { number: 'e.g., 10', notes: 'e.g., Rotated among elders' } },
                  { activity: 'Funerals, Weddings, Special Services', number: 0, notes: '', tooltips: { number: 'e.g., 3', notes: 'e.g., 2 funerals, 1 wedding' } },
                ],
                hasPhotoUploads: true,
              },
            ],
        },
        {
            id: 'pastoralCare',
            title: '3. Pastoral Care & Visitation',
            fields: [
                {
                    id: 'pastoralTable',
                    label: '',
                    type: FieldType.TABLE,
                    columns: ['Activity', 'Number/Details'],
                    editableFirstColumn: false,
                    rows: [
                        { activity: 'Home Visits', details: '', tooltips: { details: 'e.g., 22 families visited' } },
                        { activity: 'Hospital/Prison Visits', details: '', tooltips: { details: 'e.g., 7 (hospital only)' } },
                        { activity: 'Member Counselling/Prayer Sessions', details: '', tooltips: { details: 'e.g., 6 sessions' } },
                        { activity: 'Bible Studies Conducted', details: '', tooltips: { details: 'e.g., 12 ongoing' } },
                    ],
                    hasPhotoUploads: true,
                }
            ]
        },
        {
            id: 'leadership',
            title: '4. Leadership & Support',
            fields: [
                {
                    id: 'leadershipTable',
                    label: '',
                    type: FieldType.TABLE,
                    columns: ['Activity', 'Details'],
                    editableFirstColumn: false,
                    rows: [
                        { activity: 'Elders\' Meetings Held', details: '', tooltips: { details: 'e.g., 3 (monthly)' } },
                        { activity: 'Training/Workshops Attended', details: '', tooltips: { details: "e.g., District Elders' Seminar (Feb 15)" } },
                        { activity: 'Mentoring of Youth Leaders', details: '', tooltips: { details: 'e.g., 2 AY leaders being groomed' } },
                        { activity: 'Support to Other Church Departments', details: '', tooltips: { details: 'e.g., Helped Sabbath School Rally' } },
                    ],
                    hasPhotoUploads: true,
                }
            ]
        },
        {
            id: 'financial',
            title: '5. Financial Accountability (Budget Acquittal)',
            fields: [
                {
                    id: 'financialTable',
                    label: '',
                    type: FieldType.TABLE,
                    columns: ['Item', 'Approved Budget (GHS)', 'Actual Expenditure (GHS)', 'Balance (GHS)', 'Notes'],
                    rows: [
                        { item: 'Elders\' Meetings & Retreats', budget: 0, expenditure: 0, balance: 0, notes: '', tooltips: { budget: 'e.g., 2,000', expenditure: 'e.g., 1,650', balance: 'e.g., 350', notes: 'e.g., Food & transport for 3 meetings' } },
                        { item: 'Visitation & Pastoral Care', budget: 0, expenditure: 0, balance: 0, notes: '', tooltips: { budget: 'e.g., 1,500', expenditure: 'e.g., 1,200', balance: 'e.g., 300', notes: 'e.g., Fuel & welfare packages' } },
                        { item: 'Training & Workshops', budget: 0, expenditure: 0, balance: 0, notes: '', tooltips: { budget: 'e.g., 1,000', expenditure: 'e.g., 900', balance: 'e.g., 100', notes: 'e.g., 3 elders attended seminar' } },
                        { item: 'Evangelism/Support Programs', budget: 0, expenditure: 0, balance: 0, notes: '', tooltips: { budget: 'e.g., 2,500', expenditure: 'e.g., 2,300', balance: 'e.g., 200', notes: 'e.g., Supported Pathfinder Sabbath' } },
                        { item: 'Other (Emergency Support)', budget: 0, expenditure: 0, balance: 0, notes: '', tooltips: { budget: 'e.g., 800', expenditure: 'e.g., 750', balance: 'e.g., 50', notes: 'e.g., Assisted bereaved family' } },
                        { item: 'Total', budget: 0, expenditure: 0, balance: 0, notes: '', tooltips: { budget: 'e.g., 7,800', expenditure: 'e.g., 6,800', balance: 'e.g., 1,000', notes: '' } },
                    ]
                }
            ]
        },
        {
            id: 'challenges',
            title: '6. Challenges & Needs',
            fields: [{ id: 'challengesNeeds', label: '', type: FieldType.BULLET, tooltip: "e.g.,\n• Transport challenges for rural visitation.\n• Limited funds for welfare/visitation packages.\n• Some elders balancing work with ministry duties." }],
          },
          {
            id: 'plans',
            title: '7. Plans for Next Quarter',
            fields: [{ id: 'nextQuarterPlans', label: '', type: FieldType.BULLET, tooltip: "e.g.,\n• Organize a Family Week of Prayer (May).\n• Joint visitations with Deacons/Deaconesses.\n• Elders' Spiritual Retreat (June)." }],
          },
          {
            id: 'signatures',
            title: 'Signatures',
            fields: [
                {id: 'preparedBy', label: 'Prepared by', type: FieldType.SIGNATURE, tooltip: 'e.g.,\nName: Elder Joseph Amankwah\nDate: 06/04/2025'},
            ]
          }
    ]
  },
  'personal-ministries': {
    key: 'personal-ministries',
    name: "Personal Ministries Quarterly Report",
    title: "Personal Ministries Quarterly Report",
    sections: [
        {
            id: 'header',
            title: 'Report Header',
            fields: [
              { id: 'churchName', label: 'Church Name', type: FieldType.TEXT, tooltip: 'e.g., Grace Seventh-day Adventist Church' },
              { id: 'quarter', label: 'Quarter', type: FieldType.TEXT, tooltip: 'e.g., Q1' },
              { id: 'year', label: 'Year', type: FieldType.NUMBER, tooltip: 'e.g., 2025' },
            ],
        },
        {
            id: 'generalInfo',
            title: '1. General Information',
            fields: [
                {
                    id: 'infoTable',
                    label: '',
                    type: FieldType.TABLE,
                    columns: ['Item', 'Details'],
                    editableFirstColumn: false,
                    rows: [
                        { item: 'Church Name', details: '', tooltips: { details: 'e.g., Grace SDA Church' } },
                        { item: 'Mission/Conference', details: '', tooltips: { details: 'e.g., Central Valley Conference' } },
                        { item: 'Personal Ministries Leader', details: '', tooltips: { details: 'e.g., Sis. Lydia Nkrumah' } },
                        { item: 'Assistant/Secretary', details: '', tooltips: { details: 'e.g., Bro. Daniel Owusu' } },
                        { item: 'Date Submitted', details: '', tooltips: { details: 'e.g., April 7, 2025' } },
                    ]
                }
            ]
        },
        {
            id: 'evangelism',
            title: '2. Core Evangelism & Outreach',
            fields: [
                {
                    id: 'evangelismTable',
                    label: '',
                    type: FieldType.TABLE,
                    columns: ['Activity', 'Number/Details'],
                    editableFirstColumn: false,
                    rows: [
                        { activity: 'Bible Studies Given', details: '', tooltips: { details: 'e.g., 35 (23 completed, 12 ongoing)' } },
                        { activity: 'Missionary Contacts Made', details: '', tooltips: { details: 'e.g., 420' } },
                        { activity: 'Baptisms/Professions of Faith Resulting', details: '', tooltips: { details: 'e.g., 6 baptisms, 3 professions' } },
                        { activity: 'Tracts/Books Distributed', details: '', tooltips: { details: 'e.g., 1,200 tracts, 150 books' } },
                        { activity: 'Evangelistic Meetings/Crusades Held', details: '', tooltips: { details: 'e.g., 1-week revival (March)' } },
                        { activity: 'Interest Coordinator Follow-ups', details: '', tooltips: { details: 'e.g., 38 interests followed up' } },
                    ],
                    hasPhotoUploads: true,
                }
            ]
        },
        {
            id: 'subdivisions',
            title: '3. Departmental Subdivisions Activity Report',
            fields: [
                { id: 'bibleStudy', label: 'A. Bible Study Ministry / Lay Instructors', type: FieldType.BULLET, tooltip: 'e.g.,\n• Active Instructors: 5\n• New Studies: 18\n• Completions: 23\n• Challenges: 2 instructors need transportation support.' },
                { id: 'bibleStudy_photos', label: 'Photos for Bible Study Ministry', type: FieldType.PHOTOS },
                { id: 'smallGroups', label: 'B. Small Groups / Cell Ministry', type: FieldType.BULLET, tooltip: 'e.g.,\n• Active Groups: 4 (weekly)\n• Avg Attendance: 8–12 per group\n• Discipleship Focus: "Steps to Christ" series\n• New Members Integrated: 4' },
                { id: 'smallGroups_photos', label: 'Photos for Small Groups / Cell Ministry', type: FieldType.PHOTOS },
                { id: 'literature', label: 'C. Literature Evangelism / Missionary Volunteers', type: FieldType.BULLET, tooltip: 'e.g.,\n• Members Involved: 17\n• Tracts Distributed: 1,200\n• Books Shared: 150 ("The Great Controversy", "Hope Beyond Tomorrow")\n• Response: 19 people requested Bible studies' },
                { id: 'literature_photos', label: 'Photos for Literature Evangelism', type: FieldType.PHOTOS },
                { id: 'communityServices', label: 'D. Community Services / Dorcas', type: FieldType.BULLET, tooltip: 'e.g.,\n• Projects: Clothing and food donation drive\n• Served: 35 families\n• Partnerships: Local clinic & 2 schools\n• Emergency Aid: Assisted 3 members in crisis' },
                { id: 'communityServices_photos', label: 'Photos for Community Services / Dorcas', type: FieldType.PHOTOS },
                { id: 'adventistMen', label: 'E. Adventist Men', type: FieldType.BULLET, tooltip: "e.g.,\n• Projects: Assisted in widow home repair project\n• Evangelism: Led 1 men's prayer breakfast\n• Participants: 12 men actively involved" },
                { id: 'adventistMen_photos', label: 'Photos for Adventist Men Activities', type: FieldType.PHOTOS },
                { id: 'spiritOfProphecy', label: 'F. Spirit of Prophecy Promotion', type: FieldType.BULLET, tooltip: 'e.g.,\n• Books Shared: 40 SOP books\n• Reading Plan: Desire of Ages weekly discussion (in 2 groups)\n• Engagement: 28 members joined the plan' },
                { id: 'spiritOfProphecy_photos', label: 'Photos for Spirit of Prophecy Promotion', type: FieldType.PHOTOS },
            ]
        },
        {
            id: 'training',
            title: '4. Training & Member Involvement',
            fields: [
                {
                    id: 'trainingTable',
                    label: '',
                    type: FieldType.TABLE,
                    columns: ['Activity', 'Details/Numbers'],
                    editableFirstColumn: false,
                    rows: [
                        { activity: 'Training Seminars Held', details: '', tooltips: { details: 'e.g., Lay Bible Instructor Training (Feb 15)' } },
                        { activity: 'Members Trained', details: '', tooltips: { details: 'e.g., 25' } },
                        { activity: 'Outreach Participation Rate', details: '', tooltips: { details: 'e.g., ~60% of active members' } },
                        { activity: 'Special Days Observed', details: '', tooltips: { details: 'e.g., Global Youth Day (Mar 16), Lay Evangelism Day' } },
                    ],
                    hasPhotoUploads: true,
                }
            ]
        },
        {
            id: 'financial',
            title: '5. Financial Accountability (GHS)',
            fields: [
                {
                    id: 'financialTable',
                    label: '',
                    type: FieldType.TABLE,
                    columns: ['Item', 'Collected', 'Used', 'Balance', 'Notes'],
                    rows: [
                        { item: 'Personal Ministries Offerings', collected: 0, used: 0, balance: 0, notes: '', tooltips: { collected: 'e.g., 3,200', used: 'e.g., 2,800', balance: 'e.g., 400', notes: 'e.g., Tracts, Bibles, transport' } },
                        { item: 'Evangelism Fund', collected: 0, used: 0, balance: 0, notes: '', tooltips: { collected: 'e.g., 5,000', used: 'e.g., 4,700', balance: 'e.g., 300', notes: 'e.g., Crusade in March' } },
                        { item: 'Community Services Fund', collected: 0, used: 0, balance: 0, notes: '', tooltips: { collected: 'e.g., 2,500', used: 'e.g., 2,200', balance: 'e.g., 300', notes: 'e.g., Food & clothing distribution' } },
                        { item: 'Special Donations', collected: 0, used: 0, balance: 0, notes: '', tooltips: { collected: 'e.g., 1,200', used: 'e.g., 1,000', balance: 'e.g., 200', notes: 'e.g., SOP & Great Controversy distribution' } },
                        { item: 'Total', collected: 0, used: 0, balance: 0, notes: '', tooltips: { collected: 'e.g., 11,900', used: 'e.g., 10,700', balance: 'e.g., 1,200', notes: '' } },
                    ]
                }
            ]
        },
        { id: 'challenges', title: '6. Challenges & Needs', fields: [{ id: 'challengesNeeds', label: '', type: FieldType.BULLET, tooltip: 'e.g.,\n• Limited supply of Bible study guides\n• Lack of transport support for visitation\n• Few trained male leaders in literature evangelism' }] },
        { id: 'plans', title: '7. Plans for Next Quarter', fields: [{ id: 'nextQuarterPlans', label: '', type: FieldType.BULLET, tooltip: 'e.g.,\n• Evangelistic Crusade in June\n• Open 2 new small groups in the east district\n• Print/distribute 2,000 more tracts\n• Train 10 new literature evangelists' }] },
        {
            id: 'signatures',
            title: 'Signatures',
            fields: [
                {id: 'preparedBy', label: 'Prepared by', type: FieldType.SIGNATURE, tooltip: 'e.g.,\nName: Lydia Nkrumah\nDate: 07/04/2025'},
            ]
        }
    ]
  },
  'adventist-possibility-ministries': {
    key: 'adventist-possibility-ministries',
    name: 'Adventist Possibility Ministries Report',
    title: 'Adventist Possibility Ministries Quarterly Report',
    sections: [
        {
            id: 'header',
            title: 'Report Header',
            fields: [
                { id: 'churchName', label: 'Church Name', type: FieldType.TEXT, tooltip: 'e.g., Grace Seventh-day Adventist Church' },
                { id: 'quarter', label: 'Quarter', type: FieldType.TEXT, tooltip: 'e.g., Q1 (Jan-Mar)' },
                { id: 'year', label: 'Year', type: FieldType.NUMBER, tooltip: 'e.g., 2025' },
                { id: 'missionConference', label: 'Mission/Conference', type: FieldType.TEXT, tooltip: 'e.g., Morobe Mission' },
            ],
        },
        {
            id: 'generalInfo',
            title: '1. General Information',
            fields: [
                {
                    id: 'infoTable',
                    label: '',
                    type: FieldType.TABLE,
                    columns: ['Item', 'Details'],
                    editableFirstColumn: false,
                    rows: [
                        { item: 'APM Leader', details: '', tooltips: { details: 'e.g., Sister Eunice Mensah' } },
                        { item: 'Assistant/Secretary', details: '', tooltips: { details: 'e.g., Brother Kwaku Addai' } },
                        { item: 'Committee Members', details: 0, tooltips: { details: 'e.g., 4' } },
                        { item: 'Date Submitted', details: '', tooltips: { details: 'e.g., April 8, 2025' } },
                    ],
                },
            ],
        },
        {
            id: 'activities',
            title: '2. Core Ministry Areas & Activities',
            fields: [
                {
                    id: 'activitiesTable',
                    label: '',
                    type: FieldType.TABLE,
                    columns: ['Area of Ministry', 'Activities Conducted', 'Number/Details'],
                    rows: [
                        { area: 'Ministry to the Blind/Visually Impaired', activities: '', details: '', tooltips: { activities: 'e.g., Supplied Braille hymnals and audio Bible recordings', details: 'e.g., 3 members supported' } },
                        { area: 'Ministry to the Deaf/Hearing Impaired', activities: '', details: '', tooltips: { activities: 'e.g., Interpreter provided during Divine Service', details: 'e.g., Average 2 members weekly' } },
                        { area: 'Ministry to the Physically Challenged', activities: '', details: '', tooltips: { activities: 'e.g., Transportation assistance to church', details: 'e.g., 2 members supported' } },
                        { area: 'Ministry to Orphans & Vulnerable Children', activities: '', details: '', tooltips: { activities: 'e.g., School supplies distributed', details: 'e.g., 12 children' } },
                        { area: 'Ministry to Widows/Widowers & Single Parents', activities: '', details: '', tooltips: { activities: 'e.g., Monthly fellowship & prayer support', details: 'e.g., 15 widows attended' } },
                        { area: 'Ministry to the Elderly', activities: '', details: '', tooltips: { activities: 'e.g., Home visitation with food packages', details: 'e.g., 8 elderly visited' } },
                        { area: 'Awareness/Sensitization Programs', activities: '', details: '', tooltips: { activities: 'e.g., Disability Awareness Sabbath in March', details: 'e.g., Whole church participation' } },
                    ],
                    hasPhotoUploads: true,
                },
            ],
        },
        {
            id: 'participation',
            title: '3. Participation & Support',
            fields: [{ id: 'participationList', label: '', type: FieldType.BULLET, tooltip: 'e.g.,\n• Volunteers Involved: 14\n• Training Conducted: 1 (on inclusive ministry)\n• Families/Individuals Assisted: 40' }],
        },
        {
            id: 'financial',
            title: '4. Financial Accountability (GHS)',
            fields: [
                {
                    id: 'financialTable',
                    label: '',
                    type: FieldType.TABLE,
                    columns: ['Item', 'Collected', 'Used', 'Balance', 'Notes'],
                    rows: [
                        { item: 'APM Offerings', collected: 0, used: 0, balance: 0, notes: '', tooltips: { collected: 'e.g., 1,500', used: 'e.g., 1,200', balance: 'e.g., 300', notes: 'e.g., Food packages, transport' } },
                        { item: 'Welfare/Support Funds', collected: 0, used: 0, balance: 0, notes: '', tooltips: { collected: 'e.g., 2,000', used: 'e.g., 1,800', balance: 'e.g., 200', notes: 'e.g., School supplies for orphans' } },
                        { item: 'Special Donations', collected: 0, used: 0, balance: 0, notes: '', tooltips: { collected: 'e.g., 500', used: 'e.g., 400', balance: 'e.g., 100', notes: 'e.g., Audio Bibles' } },
                        { item: 'Total', collected: 0, used: 0, balance: 0, notes: '', tooltips: { collected: 'e.g., 4,000', used: 'e.g., 3,400', balance: 'e.g., 600', notes: '' } },
                    ],
                },
            ],
        },
        {
            id: 'challenges',
            title: '5. Challenges & Needs',
            fields: [{ id: 'challengesNeeds', label: '', type: FieldType.BULLET, tooltip: 'e.g.,\n• Lack of permanent sign language interpreter.\n• High demand for welfare support exceeding funds.\n• Some elderly members isolated in rural areas.' }],
        },
        {
            id: 'plans',
            title: '6. Plans for Next Quarter',
            fields: [{ id: 'nextQuarterPlans', label: '', type: FieldType.BULLET, tooltip: 'e.g.,\n• Launch training for youth in sign language.\n• Start quarterly fellowship for the elderly.\n• Fundraise for mobility aids (wheelchairs, walking sticks).' }],
        },
        {
            id: 'signatures',
            title: 'Signatures',
            fields: [
                { id: 'preparedBy', label: 'Prepared by', type: FieldType.SIGNATURE, tooltip: 'e.g.,\nName: Eunice Mensah\nDate: 08/04/2025' },
            ],
        },
    ],
  },
  'children-ministries': {
    key: 'children-ministries',
    name: "Children's Ministries Quarterly Report",
    title: "Children's Ministries Quarterly Report",
    sections: [
        {
            id: 'header',
            title: 'Report Header',
            fields: [
                { id: 'churchName', label: 'Church Name', type: FieldType.TEXT, tooltip: 'e.g., Grace Seventh-day Adventist Church' },
                { id: 'quarter', label: 'Quarter', type: FieldType.TEXT, tooltip: 'e.g., Q1 (Jan-Mar)' },
                { id: 'year', label: 'Year', type: FieldType.NUMBER, tooltip: 'e.g., 2025' },
                { id: 'missionConference', label: 'Mission/Conference', type: FieldType.TEXT, tooltip: 'e.g., Western Highlands Mission' },
            ],
        },
        {
            id: 'generalInfo',
            title: '1. General Information',
            fields: [
                {
                    id: 'infoTable',
                    label: '',
                    type: FieldType.TABLE,
                    columns: ['Item', 'Details'],
                    editableFirstColumn: false,
                    rows: [
                        { item: "Children's Ministries Leader", details: '', tooltips: { details: 'e.g., Brother Kwame Appiah' } },
                        { item: 'Assistant(s)', details: '', tooltips: { details: 'e.g., Sister Dora Asante' } },
                        { item: 'Teachers/Volunteers', details: 0, tooltips: { details: 'e.g., 6' } },
                        { item: 'Number of Children (0–14 years)', details: 0, tooltips: { details: 'e.g., 42' } },
                        { item: 'Date Submitted', details: '', tooltips: { details: 'e.g., April 8, 2025' } },
                    ],
                },
            ],
        },
        {
            id: 'sabbathSchoolDivisions',
            title: '2. Sabbath School Divisions',
            fields: [
                {
                    id: 'divisionsTable',
                    label: '',
                    type: FieldType.TABLE,
                    columns: ['Division', 'Number Enrolled', 'Average Attendance', 'Teachers Assigned', 'Notes'],
                    rows: [
                        { division: 'Beginners (0-2 yrs)', enrolled: 0, attendance: 0, teachers: 0, notes: '', tooltips: { enrolled: 'e.g., 5', attendance: 'e.g., 4', teachers: 'e.g., 1', notes: 'e.g., Regular attendance' } },
                        { division: 'Kindergarten (3-5 yrs)', enrolled: 0, attendance: 0, teachers: 0, notes: '', tooltips: { enrolled: 'e.g., 10', attendance: 'e.g., 9', teachers: 'e.g., 1', notes: 'e.g., Memory verses well learned' } },
                        { division: 'Primary (6-9 yrs)', enrolled: 0, attendance: 0, teachers: 0, notes: '', tooltips: { enrolled: 'e.g., 15', attendance: 'e.g., 12', teachers: 'e.g., 2', notes: 'e.g., Active in quizzes' } },
                        { division: 'Juniors (10-14 yrs)', enrolled: 0, attendance: 0, teachers: 0, notes: '', tooltips: { enrolled: 'e.g., 12', attendance: 'e.g., 11', teachers: 'e.g., 2', notes: 'e.g., Leading in song & prayer' } },
                        { division: 'Total', enrolled: 0, attendance: 0, teachers: 0, notes: '', tooltips: { enrolled: 'e.g., 42', attendance: 'e.g., 36', teachers: 'e.g., 6', notes: '' } },
                    ],
                },
            ],
        },
        {
            id: 'programs',
            title: '3. Programs & Activities Conducted',
            fields: [
                {
                    id: 'programsTable',
                    label: '',
                    type: FieldType.TABLE,
                    columns: ['Activity', 'Details/Results'],
                    editableFirstColumn: false,
                    rows: [
                        { activity: "Weekly Children's Sabbath School Classes", details: '', tooltips: { details: 'e.g., Held every Sabbath with lesson study and singing' } },
                        { activity: 'Vacation Bible School', details: '', tooltips: { details: 'e.g., Not held this quarter' } },
                        { activity: "Children's Sabbath / Special Days", details: '', tooltips: { details: 'e.g., Children led entire worship service in March' } },
                        { activity: 'Bible Quiz/Story Programs', details: '', tooltips: { details: 'e.g., Bible Quiz on Daniel held in February (8 winners awarded)' } },
                        { activity: 'Outreach/Mission Projects', details: '', tooltips: { details: 'e.g., Children visited local orphanage with 25 food packages' } },
                    ],
                    hasPhotoUploads: true,
                },
            ],
        },
        {
            id: 'participation',
            title: '4. Participation & Involvement',
            fields: [{ id: 'participationList', label: '', type: FieldType.BULLET, tooltip: 'e.g.,\n• Average Weekly Attendance: 36\n• Active Teachers/Volunteers: 6\n• Parent Involvement: 12 parents helped during orphanage visitation' }],
        },
        {
            id: 'financial',
            title: '5. Financial Accountability (GHS)',
            fields: [
                {
                    id: 'financialTable',
                    label: '',
                    type: FieldType.TABLE,
                    columns: ['Item', 'Collected', 'Used', 'Balance', 'Notes'],
                    rows: [
                        { item: "Children's Ministries Fund", collected: 0, used: 0, balance: 0, notes: '', tooltips: { collected: 'e.g., 1,200', used: 'e.g., 900', balance: 'e.g., 300', notes: 'e.g., Lesson materials, quiz prizes' } },
                        { item: 'Vacation Bible School Fund', collected: 0, used: 0, balance: 0, notes: '', tooltips: { collected: 'e.g., 0', used: 'e.g., 0', balance: 'e.g., 0', notes: 'e.g., Planned for next quarter' } },
                        { item: 'Special Donations', collected: 0, used: 0, balance: 0, notes: '', tooltips: { collected: 'e.g., 400', used: 'e.g., 350', balance: 'e.g., 50', notes: 'e.g., Orphanage outreach' } },
                        { item: 'Total', collected: 0, used: 0, balance: 0, notes: '', tooltips: { collected: 'e.g., 1,600', used: 'e.g., 1,250', balance: 'e.g., 350', notes: '' } },
                    ],
                },
            ],
        },
        { id: 'challenges', title: '6. Challenges & Needs', fields: [{ id: 'challengesNeeds', label: '', type: FieldType.BULLET, tooltip: "e.g.,\n• Limited supply of illustrated children's lesson guides.\n• No permanent instruments for children's music.\n• Need more training for new volunteer teachers." }] },
        { id: 'plans', title: '7. Plans for Next Quarter', fields: [{ id: 'nextQuarterPlans', label: '', type: FieldType.BULLET, tooltip: "e.g.,\n• Organize Vacation Bible School in June.\n• Hold Children's Campout for Juniors.\n• Launch a Children's Choir for Sabbath worship." }] },
        {
            id: 'signatures',
            title: 'Signatures',
            fields: [
                { id: 'preparedBy', label: 'Prepared by', type: FieldType.SIGNATURE, tooltip: 'e.g.,\nName: Kwame Appiah\nDate: 08/04/2025' },
            ],
        },
    ],
  },
  'communication': {
      key: 'communication',
      name: "Communication Department Quarterly Report",
      title: "Communication Department Quarterly Report",
      sections: [
          {
              id: 'header',
              title: 'Report Header',
              fields: [
                  { id: 'churchName', label: 'Church Name', type: FieldType.TEXT, tooltip: 'e.g., Grace Seventh-day Adventist Church' },
                  { id: 'quarter', label: 'Quarter', type: FieldType.TEXT, tooltip: 'e.g., Q1 (Jan-Mar)' },
                  { id: 'year', label: 'Year', type: FieldType.NUMBER, tooltip: 'e.g., 2025' },
                  { id: 'missionConference', label: 'Mission/Conference', type: FieldType.TEXT, tooltip: 'e.g., CPC' },
              ],
          },
          {
              id: 'generalInfo',
              title: '1. General Information',
              fields: [
                  {
                      id: 'infoTable',
                      label: '',
                      type: FieldType.TABLE,
                      columns: ['Item', 'Details'],
                      editableFirstColumn: false,
                      rows: [
                          { item: 'Communication Secretary', details: '', tooltips: { details: 'e.g., Sister Akua Bediako' } },
                          { item: 'Assistant(s)', details: '', tooltips: { details: 'e.g., Brother Samuel Tetteh' } },
                          { item: 'Committee Members', details: 0, tooltips: { details: 'e.g., 3' } },
                          { item: 'Date Submitted', details: '', tooltips: { details: 'e.g., April 9, 2025' } },
                      ],
                  },
              ],
          },
          {
              id: 'mediaPublicity',
              title: '2. Media & Publicity',
              fields: [
                  {
                      id: 'mediaTable',
                      label: '',
                      type: FieldType.TABLE,
                      columns: ['Activity', 'Number/Details'],
                      editableFirstColumn: false,
                      rows: [
                          { activity: 'Weekly Announcements Managed', details: '', tooltips: { details: 'e.g., 12 Sabbaths' } },
                          { activity: 'Church Bulletin/Newsletter Produced', details: '', tooltips: { details: 'e.g., 3 issues (monthly)' } },
                          { activity: 'Social Media Updates Posted', details: '', tooltips: { details: 'e.g., 22 updates on Facebook & WhatsApp' } },
                          { activity: 'Audio/Visual Support Provided', details: '', tooltips: { details: 'e.g., Every Sabbath & 2 funerals' } },
                          { activity: 'Photography/Videography Coverage', details: '', tooltips: { details: 'e.g., 5 events covered' } },
                          { activity: 'Special Events Publicized', details: '', tooltips: { details: 'e.g., Pathfinder Induction & Week of Prayer' } },
                      ],
                      hasPhotoUploads: true,
                  },
              ],
          },
          {
              id: 'memberCommunication',
              title: '3. Communication with Church Members & Conference',
              fields: [
                  {
                      id: 'memberCommTable',
                      label: '',
                      type: FieldType.TABLE,
                      columns: ['Activity', 'Number/Details'],
                      editableFirstColumn: false,
                      rows: [
                          { activity: 'Information Shared with Members', details: '', tooltips: { details: 'e.g., Weekly announcements on WhatsApp (avg. 150 members reached)' } },
                          { activity: 'Reports/Updates Sent to District/Conference', details: '', tooltips: { details: 'e.g., 2 reports (Pathfinder Induction, Evangelistic Campaign)' } },
                          { activity: 'Notices Circulated', details: '', tooltips: { details: 'e.g., Global Youth Day, Communion Service, Easter Camp Meeting' } },
                      ],
                  },
              ],
          },
          {
              id: 'training',
              title: '4. Training & Capacity Building',
              fields: [
                  {
                      id: 'trainingTable',
                      label: '',
                      type: FieldType.TABLE,
                      columns: ['Activity', 'Number/Details'],
                      editableFirstColumn: false,
                      rows: [
                          { activity: 'Media/Communication Trainings Conducted', details: '', tooltips: { details: 'e.g., 1 training on "Effective Church Media"' } },
                          { activity: 'Volunteers Trained', details: '', tooltips: { details: 'e.g., 4 (sound, PowerPoint, camera operations)' } },
                          { activity: 'Equipment Upgrades/Needs', details: '', tooltips: { details: 'e.g., Need projector & new microphone' } },
                      ],
                      hasPhotoUploads: true,
                  },
              ],
          },
          {
              id: 'financial',
              title: '5. Financial Accountability (GHS)',
              fields: [
                  {
                      id: 'financialTable',
                      label: '',
                      type: FieldType.TABLE,
                      columns: ['Item', 'Collected', 'Used', 'Balance', 'Notes'],
                      rows: [
                          { item: 'Communication Fund', collected: 0, used: 0, balance: 0, notes: '', tooltips: { collected: 'e.g., 1,000', used: 'e.g., 750', balance: 'e.g., 250', notes: 'e.g., Printing bulletins, internet data' } },
                          { item: 'Media/Technology Support', collected: 0, used: 0, balance: 0, notes: '', tooltips: { collected: 'e.g., 2,500', used: 'e.g., 2,200', balance: 'e.g., 300', notes: 'e.g., Repairs to speakers, batteries' } },
                          { item: 'Special Donations', collected: 0, used: 0, balance: 0, notes: '', tooltips: { collected: 'e.g., 800', used: 'e.g., 700', balance: 'e.g., 100', notes: 'e.g., Camera maintenance' } },
                          { item: 'Total', collected: 0, used: 0, balance: 0, notes: '', tooltips: { collected: 'e.g., 4,300', used: 'e.g., 3,650', balance: 'e.g., 650', notes: '' } },
                      ],
                  },
              ],
          },
          { id: 'challenges', title: '6. Challenges & Needs', fields: [{ id: 'challengesNeeds', label: '', type: FieldType.BULLET, tooltip: 'e.g.,\n• Outdated projector makes presentations difficult.\n• Limited volunteers for livestreaming services.\n• Need training in graphic design for bulletins.' }] },
          { id: 'plans', title: '7. Plans for Next Quarter', fields: [{ id: 'nextQuarterPlans', label: '', type: FieldType.BULLET, tooltip: 'e.g.,\n• Launch church YouTube channel for livestreaming.\n• Hold workshop for 10 youths on media & communication.\n• Acquire new projector and microphone through fundraising.' }] },
          {
              id: 'signatures',
              title: 'Signatures',
              fields: [
                  { id: 'preparedBy', label: 'Prepared by', type: FieldType.SIGNATURE, tooltip: 'e.g.,\nName: Akua Bediako\nDate: 09/04/2025' },
              ],
          },
      ],
  },
  'education': {
    key: 'education',
    name: "Education Department Quarterly Report",
    title: "Education Department Quarterly Report",
    sections: [
        {
            id: 'header',
            title: 'Report Header',
            fields: [
                { id: 'churchName', label: 'Church Name', type: FieldType.TEXT, tooltip: 'e.g., Kabiufa Seventh-day Adventist Church' },
                { id: 'quarter', label: 'Quarter', type: FieldType.TEXT, tooltip: 'e.g., Q1 (Jan-Mar)' },
                { id: 'year', label: 'Year', type: FieldType.NUMBER, tooltip: 'e.g., 2025' },
                { id: 'missionConference', label: 'Mission/Conference', type: FieldType.TEXT, tooltip: 'e.g., Eastern Highlands Simbu Mission' },
            ],
        },
        {
            id: 'generalInfo',
            title: '1. General Information',
            fields: [
                {
                    id: 'infoTable',
                    label: '',
                    type: FieldType.TABLE,
                    columns: ['Item', 'Details'],
                    editableFirstColumn: false,
                    rows: [
                        { item: 'Education Secretary', details: '', tooltips: { details: 'e.g., Elder Stephen Ofori' } },
                        { item: 'Assistant/Committee Members', details: '', tooltips: { details: 'e.g., 2' } },
                        { item: 'Home & School Association Active?', details: 'Yes', tooltips: { details: 'e.g., Yes' } },
                        { item: 'Date Submitted', details: '', tooltips: { details: 'e.g., April 9, 2025' } },
                    ],
                },
            ],
        },
        {
            id: 'programs',
            title: '2. Programs & Activities Conducted',
            fields: [
                {
                    id: 'programsTable',
                    label: '',
                    type: FieldType.TABLE,
                    columns: ['Activity', 'Details/Results'],
                    editableFirstColumn: false,
                    rows: [
                        { activity: 'Education Sabbath', details: '', tooltips: { details: 'e.g., Held on Feb 8, theme: "True Education"' } },
                        { activity: 'Promotion of Adventist Education', details: '', tooltips: { details: 'e.g., 2-week campaign encouraging parents to enrol children in Adventist schools' } },
                        { activity: 'Support to Adventist Schools', details: '', tooltips: { details: 'e.g., Donated books to Valley View Basic SDA School' } },
                        { activity: 'Scholarships/Bursaries', details: '', tooltips: { details: 'e.g., 3 students supported (GHS 500 each)' } },
                        { activity: 'Home & School Association', details: '', tooltips: { details: 'e.g., Parent-Teacher Fellowship on child discipline' } },
                        { activity: 'Career Guidance', details: '', tooltips: { details: 'e.g., Workshop for 20 secondary school students on career choices' } },
                    ],
                    hasPhotoUploads: true,
                },
            ],
        },
        {
            id: 'involvement',
            title: '3. Students & Teachers Involvement',
            fields: [
                {
                    id: 'involvementTable',
                    label: '',
                    type: FieldType.TABLE,
                    columns: ['Item', 'Number/Details'],
                    editableFirstColumn: false,
                    rows: [
                        { item: 'Adventist Teachers in Church', details: 0, tooltips: { details: 'e.g., 8' } },
                        { item: 'Students in Adventist Schools', details: 0, tooltips: { details: 'e.g., 32' } },
                        { item: 'Students in Public/Other Schools', details: 0, tooltips: { details: 'e.g., 47' } },
                        { item: 'Mentorship/Support Programs Conducted', details: '', tooltips: { details: 'e.g., Peer mentoring program started for 10 students' } },
                    ],
                },
            ],
        },
        {
            id: 'training',
            title: '4. Training & Capacity Building',
            fields: [
                {
                    id: 'trainingTable',
                    label: '',
                    type: FieldType.TABLE,
                    columns: ['Activity', 'Details'],
                    editableFirstColumn: false,
                    rows: [
                        { activity: 'Teacher/Parent Seminars', details: '', tooltips: { details: 'e.g., "Raising Godly Children" (Feb 22)' } },
                        { activity: 'Student Leadership Training', details: '', tooltips: { details: 'e.g., None this quarter' } },
                        { activity: 'Youth Education Workshops', details: '', tooltips: { details: 'e.g., Career Guidance Workshop (Mar 15)' } },
                        { activity: 'Other', details: '', tooltips: { details: 'e.g., Sponsored 2 teachers for District Education Training' } },
                    ],
                    hasPhotoUploads: true,
                },
            ],
        },
        {
            id: 'financial',
            title: '5. Financial Accountability (GHS)',
            fields: [
                {
                    id: 'financialTable',
                    label: '',
                    type: FieldType.TABLE,
                    columns: ['Item', 'Collected', 'Used', 'Balance', 'Notes'],
                    rows: [
                        { item: 'Education Department Fund', collected: 0, used: 0, balance: 0, notes: '', tooltips: { collected: 'e.g., 2,000', used: 'e.g., 1,500', balance: 'e.g., 500', notes: 'e.g., Books & Education Sabbath' } },
                        { item: 'Scholarship/Bursary Fund', collected: 0, used: 0, balance: 0, notes: '', tooltips: { collected: 'e.g., 2,000', used: 'e.g., 1,500', balance: 'e.g., 500', notes: 'e.g., Support to 3 students' } },
                        { item: 'Special Donations', collected: 0, used: 0, balance: 0, notes: '', tooltips: { collected: 'e.g., 1,200', used: 'e.g., 1,000', balance: 'e.g., 200', notes: 'e.g., Parent contributions' } },
                        { item: 'Total', collected: 0, used: 0, balance: 0, notes: '', tooltips: { collected: 'e.g., 5,200', used: 'e.g., 4,000', balance: 'e.g., 1,200', notes: '' } },
                    ],
                },
            ],
        },
        { id: 'challenges', title: '6. Challenges & Needs', fields: [{ id: 'challengesNeeds', label: '', type: FieldType.BULLET, tooltip: 'e.g.,\n• More scholarship requests than funds available.\n• Some parents reluctant to consider Adventist schools due to fees.\n• Limited teaching aids in Adventist schools nearby.' }] },
        { id: 'plans', title: '7. Plans for Next Quarter', fields: [{ id: 'nextQuarterPlans', label: '', type: FieldType.BULLET, tooltip: 'e.g.,\n• Organize Student Leadership Training workshop.\n• Raise GHS 5,000 for scholarship fund.\n• Launch annual "Adventist Education Awareness Day."' }] },
        {
            id: 'signatures',
            title: 'Signatures',
            fields: [
                { id: 'preparedBy', label: 'Prepared by', type: FieldType.SIGNATURE, tooltip: 'e.g.,\nName: Stephen Ofori\nDate: 09/04/2025' },
            ],
        },
    ],
  },
  'family-ministries': {
      key: 'family-ministries',
      name: "Family Ministries Quarterly Report",
      title: "Family Ministries Quarterly Report",
      sections: [
          {
              id: 'header',
              title: 'Report Header',
              fields: [
                  { id: 'churchName', label: 'Church Name', type: FieldType.TEXT, tooltip: 'e.g., Buin Seventh-day Adventist Church' },
                  { id: 'quarter', label: 'Quarter', type: FieldType.TEXT, tooltip: 'e.g., Q1 (Jan-Mar)' },
                  { id: 'year', label: 'Year', type: FieldType.NUMBER, tooltip: 'e.g., 2025' },
                  { id: 'missionConference', label: 'Mission/Conference', type: FieldType.TEXT, tooltip: 'e.g., Bougainville Mission' },
              ],
          },
          {
              id: 'generalInfo',
              title: '1. General Information',
              fields: [
                  {
                      id: 'infoTable',
                      label: '',
                      type: FieldType.TABLE,
                      columns: ['Item', 'Details'],
                      editableFirstColumn: false,
                      rows: [
                          { item: 'Family Ministries Leaders', details: '', tooltips: { details: 'e.g., Elder & Mrs. Kusi' } },
                          { item: 'Assistant(s) / Committee Members', details: '', tooltips: { details: 'e.g., 3' } },
                          { item: 'Date Submitted', details: '', tooltips: { details: 'e.g., April 10, 2025' } },
                      ],
                  },
              ],
          },
          {
              id: 'programs',
              title: '2. Programs & Activities Conducted',
              fields: [
                  {
                      id: 'programsTable',
                      label: '',
                      type: FieldType.TABLE,
                      columns: ['Activity', 'Theme/Details', 'Attendance/Results'],
                      rows: [
                          { activity: 'Family Life Sabbath', theme: '', attendance: '', tooltips: { theme: 'e.g., Theme: "Christ at the Center of the Home" – March 8', attendance: 'e.g., 120 participants' } },
                          { activity: 'Marriage Enrichment Program', theme: '', attendance: '', tooltips: { theme: 'e.g., Workshop: "Strengthening Communication in Marriage" - Feb 15', attendance: 'e.g., 25 couples' } },
                          { activity: 'Parenting Seminar', theme: '', attendance: '', tooltips: { theme: 'e.g., Seminar on "Raising Godly Children" – Jan 19', attendance: 'e.g., 40 parents' } },
                          { activity: 'Counseling Sessions', theme: '', attendance: '', tooltips: { theme: 'e.g., 6 private counseling sessions (3 couples, 2 parents, 1 youth)', attendance: 'e.g., Confidential' } },
                          { activity: 'Youth/Young Adult Family Program', theme: '', attendance: '', tooltips: { theme: 'e.g., Dialogue: "Preparing for Christian Marriage" – Mar 23', attendance: 'e.g., 28 youths' } },
                          { activity: 'Community/Outreach', theme: '', attendance: '', tooltips: { theme: 'e.g., Family outreach to local orphanage with food donation', attendance: 'e.g., 15 families participated' } },
                      ],
                      hasPhotoUploads: true,
                  },
              ],
          },
          {
              id: 'participation',
              title: '3. Participation & Involvement',
              fields: [{ id: 'participationList', label: '', type: FieldType.BULLET, tooltip: 'e.g.,\n• Families Reached: 55\n• Couples Reached: 25\n• Youth/Young Adults Reached: 28\n• Volunteers Involved: 10' }],
          },
          {
              id: 'collaboration',
              title: '4. Collaboration with Other Departments',
              fields: [
                  {
                      id: 'collabTable',
                      label: '',
                      type: FieldType.TABLE,
                      columns: ['Department', 'Joint Activities', 'Results'],
                      rows: [
                          { department: "Children's Ministries", activity: '', results: '', tooltips: { activity: 'e.g., Joint Parenting Seminar', results: 'e.g., 40 parents trained' } },
                          { department: 'Youth Ministries', activity: '', results: '', tooltips: { activity: 'e.g., Youth Family Dialogue', results: 'e.g., 28 youths engaged' } },
                          { department: 'Elders / Personal Ministries', activity: '', results: '', tooltips: { activity: 'e.g., Marriage counselling support', results: 'e.g., 3 couples assisted' } },
                      ],
                  },
              ],
          },
          {
              id: 'financial',
              title: '5. Financial Accountability (GHS)',
              fields: [
                  {
                      id: 'financialTable',
                      label: '',
                      type: FieldType.TABLE,
                      columns: ['Item', 'Collected', 'Used', 'Balance', 'Notes'],
                      rows: [
                          { item: 'Family Ministries Fund', collected: 0, used: 0, balance: 0, notes: '', tooltips: { collected: 'e.g., 2,500', used: 'e.g., 2,000', balance: 'e.g., 500', notes: 'e.g., Seminars, food' } },
                          { item: 'Marriage/Parenting Programs', collected: 0, used: 0, balance: 0, notes: '', tooltips: { collected: 'e.g., 1,800', used: 'e.g., 1,600', balance: 'e.g., 200', notes: 'e.g., Materials & honorarium' } },
                          { item: 'Retreats/Conferences', collected: 0, used: 0, balance: 0, notes: '', tooltips: { collected: 'e.g., 0', used: 'e.g., 0', balance: 'e.g., 0', notes: 'e.g., Planned for next quarter' } },
                          { item: 'Special Donations', collected: 0, used: 0, balance: 0, notes: '', tooltips: { collected: 'e.g., 700', used: 'e.g., 600', balance: 'e.g., 100', notes: 'e.g., Orphanage outreach' } },
                          { item: 'Total', collected: 0, used: 0, balance: 0, notes: '', tooltips: { collected: 'e.g., 5,000', used: 'e.g., 4,200', balance: 'e.g., 800', notes: '' } },
                      ],
                  },
              ],
          },
          { id: 'challenges', title: '6. Challenges & Needs', fields: [{ id: 'challengesNeeds', label: '', type: FieldType.BULLET, tooltip: 'e.g.,\n• Need for more trained counsellors.\n• Financial constraints for planned retreats.\n• Some couples hesitant to seek counselling.' }] },
          { id: 'plans', title: '7. Plans for Next Quarter', fields: [{ id: 'nextQuarterPlans', label: '', type: FieldType.BULLET, tooltip: 'e.g.,\n• Organize Marriage Retreat Weekend in June.\n• Launch Family Bible Study Initiative.\n• Partner with Health Ministries for wellness program.' }] },
          {
              id: 'signatures',
              title: 'Signatures',
              fields: [
                  { id: 'preparedBy', label: 'Prepared by', type: FieldType.SIGNATURE, tooltip: 'e.g.,\nName: Elder & Mrs. Kusi\nDate: 10/04/2025' },
              ],
          },
      ],
  },
  'health-ministries': {
      key: 'health-ministries',
      name: "Health Ministries Quarterly Report",
      title: "Health Ministries Quarterly Report",
      sections: [
          {
              id: 'header',
              title: 'Report Header',
              fields: [
                  { id: 'churchName', label: 'Church Name', type: FieldType.TEXT, tooltip: 'e.g., Talai Seventh-day Adventist Church' },
                  { id: 'quarter', label: 'Quarter', type: FieldType.TEXT, tooltip: 'e.g., Q1 (Jan-Mar)' },
                  { id: 'year', label: 'Year', type: FieldType.NUMBER, tooltip: 'e.g., 2025' },
                  { id: 'missionConference', label: 'Mission/Conference', type: FieldType.TEXT, tooltip: 'e.g., New Britain New Ireland Mission' },
              ],
          },
          {
              id: 'generalInfo',
              title: '1. General Information',
              fields: [
                  {
                      id: 'infoTable',
                      label: '',
                      type: FieldType.TABLE,
                      columns: ['Item', 'Details'],
                      editableFirstColumn: false,
                      rows: [
                          { item: 'Health Ministries Leader', details: '', tooltips: { details: 'e.g., Dr. Ruth Asare' } },
                          { item: 'Assistant(s) / Committee Members', details: '', tooltips: { details: 'e.g., 4' } },
                          { item: 'Date Submitted', details: '', tooltips: { details: 'e.g., April 11, 2025' } },
                      ],
                  },
              ],
          },
          {
              id: 'programs',
              title: '2. Programs & Activities Conducted',
              fields: [
                  {
                      id: 'programsTable',
                      label: '',
                      type: FieldType.TABLE,
                      columns: ['Activity', 'Theme/Details', 'Attendance/Results'],
                      rows: [
                          { activity: 'Health Emphasis Day', theme: '', attendance: '', tooltips: { theme: 'e.g., Theme: "God\'s Plan for Wholeness" - Feb 15', attendance: 'e.g., 120 members' } },
                          { activity: 'Health Seminar', theme: '', attendance: '', tooltips: { theme: 'e.g., Seminar on “Preventing Hypertension” – Jan 19', attendance: 'e.g., 80 attendees' } },
                          { activity: 'Cooking Class', theme: '', attendance: '', tooltips: { theme: 'e.g., Vegetarian cooking demo – Mar 9', attendance: 'e.g., 45 participants' } },
                          { activity: 'Medical Missionary Program', theme: '', attendance: '', tooltips: { theme: 'e.g., Door-to-door health literature + lifestyle talks', attendance: 'e.g., 60 homes visited' } },
                          { activity: 'Health Screening', theme: '', attendance: '', tooltips: { theme: 'e.g., BP, sugar & BMI checks – Mar 16', attendance: 'e.g., 75 people screened' } },
                          { activity: 'Community Health Expo', theme: '', attendance: '', tooltips: { theme: 'e.g., Joint with district clinic - Mar 30', attendance: 'e.g., 200 community members served' } },
                      ],
                      hasPhotoUploads: true,
                  },
              ],
          },
          {
              id: 'participation',
              title: '3. Participation & Involvement',
              fields: [{ id: 'participationList', label: '', type: FieldType.BULLET, tooltip: 'e.g.,\n• Church Members Reached: 180\n• Community Members Reached: 260\n• Health Professionals Involved: 6 (3 nurses, 2 doctors, 1 dietician)\n• Volunteers Engaged: 15' }],
          },
          {
              id: 'collaboration',
              title: '4. Collaboration with Other Departments',
              fields: [
                  {
                      id: 'collabTable',
                      label: '',
                      type: FieldType.TABLE,
                      columns: ['Department', 'Joint Activity', 'Results'],
                      rows: [
                          { department: 'Family Ministries', activity: '', results: '', tooltips: { activity: 'e.g., Parenting seminar included health segment', results: 'e.g., 40 families reached' } },
                          { department: 'Youth Ministries', activity: '', results: '', tooltips: { activity: 'e.g., Youth assisted in community health expo', results: 'e.g., 20 youth volunteers' } },
                          { department: 'Adventist Possibility Ministries', activity: '', results: '', tooltips: { activity: 'e.g., Provided health checks during elderly visitation', results: 'e.g., 10 elderly benefited' } },
                          { department: 'Personal Ministries', activity: '', results: '', tooltips: { activity: 'e.g., Integrated health talks into Bible study groups', results: 'e.g., 4 groups covered' } },
                      ],
                  },
              ],
          },
          {
              id: 'financial',
              title: '5. Financial Accountability (GHS)',
              fields: [
                  {
                      id: 'financialTable',
                      label: '',
                      type: FieldType.TABLE,
                      columns: ['Item', 'Collected', 'Used', 'Balance', 'Notes'],
                      rows: [
                          { item: 'Health Ministries Fund', collected: 0, used: 0, balance: 0, notes: '', tooltips: { collected: 'e.g., 2,800', used: 'e.g., 2,300', balance: 'e.g., 500', notes: 'e.g., Printing materials, snacks' } },
                          { item: 'Health Expo / Outreach Fund', collected: 0, used: 0, balance: 0, notes: '', tooltips: { collected: 'e.g., 3,500', used: 'e.g., 3,200', balance: 'e.g., 300', notes: 'e.g., Screening supplies' } },
                          { item: 'Special Donations', collected: 0, used: 0, balance: 0, notes: '', tooltips: { collected: 'e.g., 1,200', used: 'e.g., 1,000', balance: 'e.g., 200', notes: 'e.g., Cooking class sponsorship' } },
                          { item: 'Total', collected: 0, used: 0, balance: 0, notes: '', tooltips: { collected: 'e.g., 7,500', used: 'e.g., 6,500', balance: 'e.g., 1,000', notes: '' } },
                      ],
                  },
              ],
          },
          { id: 'challenges', title: '6. Challenges & Needs', fields: [{ id: 'challengesNeeds', label: '', type: FieldType.BULLET, tooltip: 'e.g.,\n• Limited funds for purchasing medical equipment.\n• Need projector for health education presentations.\n• Some community members lack follow-up after screenings.' }] },
          { id: 'plans', title: '7. Plans for Next Quarter', fields: [{ id: 'nextQuarterPlans', label: '', type: FieldType.BULLET, tooltip: 'e.g.,\n• Organize Wellness Retreat Weekend.\n• Train 10 members in Medical Missionary Work.\n• Start weekly exercise & lifestyle club at church grounds.' }] },
          {
              id: 'signatures',
              title: 'Signatures',
              fields: [
                  { id: 'preparedBy', label: 'Prepared by', type: FieldType.SIGNATURE, tooltip: 'e.g.,\nName: Dr. Ivanka Ruth\nDate: 11/04/2025' },
              ],
          },
      ],
  },
  'music': {
      key: 'music',
      name: "Music Department Quarterly Report",
      title: "Music Department Quarterly Report",
      sections: [
          {
              id: 'header',
              title: 'Report Header',
              fields: [
                  { id: 'churchName', label: 'Church Name', type: FieldType.TEXT, tooltip: 'e.g., Grace Seventh-day Adventist Church' },
                  { id: 'quarter', label: 'Quarter', type: FieldType.TEXT, tooltip: 'e.g., Q1 (Jan-Mar)' },
                  { id: 'year', label: 'Year', type: FieldType.NUMBER, tooltip: 'e.g., 2025' },
                  { id: 'missionConference', label: 'Mission/Conference', type: FieldType.TEXT, tooltip: 'e.g., Sepik Mission' },
              ],
          },
          {
              id: 'generalInfo',
              title: '1. General Information',
              fields: [
                  {
                      id: 'infoTable',
                      label: '',
                      type: FieldType.TABLE,
                      columns: ['Item', 'Details'],
                      editableFirstColumn: false,
                      rows: [
                          { item: 'Music Director', details: '', tooltips: { details: 'e.g., Brother Michael Owusu' } },
                          { item: 'Assistant(s)', details: '', tooltips: { details: 'e.g., Sister Afia Danquah' } },
                          { item: 'Choirs/Groups in Church', details: '', tooltips: { details: "e.g., Main Choir, Youth Choir, Children's Choir, Praise Team" } },
                          { item: 'Date Submitted', details: '', tooltips: { details: 'e.g., April 12, 2025' } },
                      ],
                  },
              ],
          },
          {
              id: 'choirs',
              title: '2. Choirs, Groups & Participation',
              fields: [
                  {
                      id: 'choirsTable',
                      label: '',
                      type: FieldType.TABLE,
                      columns: ['Group', 'Members', 'Frequency of Practice', 'Performances This Quarter', 'Notes'],
                      rows: [
                          { group: 'Main Church Choir', members: 0, frequency: '', performances: '', notes: '', tooltips: { members: 'e.g., 22', frequency: 'e.g., Twice weekly', performances: 'e.g., 12 Sabbaths + Week of Prayer', notes: 'e.g., Strong participation' } },
                          { group: 'Youth Choir', members: 0, frequency: '', performances: '', notes: '', tooltips: { members: 'e.g., 15', frequency: 'e.g., Once weekly', performances: 'e.g., 8 Sabbaths + Pathfinder Day', notes: 'e.g., Need more male voices' } },
                          { group: "Children's Choir", members: 0, frequency: '', performances: '', notes: '', tooltips: { members: 'e.g., 18', frequency: 'e.g., Weekly Sabbath afternoons', performances: 'e.g., 3 Sabbaths', notes: 'e.g., Parents supportive' } },
                          { group: 'Praise Team', members: 0, frequency: '', performances: '', notes: '', tooltips: { members: 'e.g., 10', frequency: 'e.g., Weekly', performances: 'e.g., Every Sabbath', notes: 'e.g., Rotational leadership' } },
                          { group: 'Quartet & Solos', members: 0, frequency: '', performances: '', notes: '', tooltips: { members: 'e.g., 4 groups', frequency: 'e.g., Varies', performances: 'e.g., 5 special items', notes: 'e.g., Encouraging growth' } },
                      ],
                  },
              ],
          },
          {
              id: 'programs',
              title: '3. Programs & Activities Conducted',
              fields: [
                  {
                      id: 'programsTable',
                      label: '',
                      type: FieldType.TABLE,
                      columns: ['Activity', 'Theme/Details', 'Attendance/Results'],
                      rows: [
                          { activity: 'Special Music for Worship', theme: '', attendance: '', tooltips: { theme: 'e.g., Choirs & Praise Team provided music each Sabbath', attendance: 'e.g., Blessed services' } },
                          { activity: 'Music Day', theme: '', attendance: '', tooltips: { theme: 'e.g., Theme: "Singing with the Spirit" – Feb 22', attendance: 'e.g., 250 attendees' } },
                          { activity: 'Concert / Outreach', theme: '', attendance: '', tooltips: { theme: 'e.g., Youth Choir outreach at local orphanage – Mar 15', attendance: 'e.g., 40 children reached' } },
                          { activity: 'Music Workshop', theme: '', attendance: '', tooltips: { theme: 'e.g., Training on voice techniques – Jan 26', attendance: 'e.g., 35 participants' } },
                          { activity: 'District/Conference Events', theme: '', attendance: '', tooltips: { theme: 'e.g., Main Choir sang at District Camp Meeting', attendance: 'e.g., Well received' } },
                      ],
                      hasPhotoUploads: true,
                  },
              ],
          },
          {
              id: 'development',
              title: '4. Member Development & Training',
              fields: [{ id: 'developmentList', label: '', type: FieldType.BULLET, tooltip: 'e.g.,\n• New Members Recruited: 7 (across choirs)\n• Training Conducted: Vocal training workshop\n• Instruments Available: 2 keyboards, 1 drum set, 2 microphones\n• Instruments Needed: Guitar, extra microphones, projector for lyrics' }],
          },
          {
              id: 'financial',
              title: '5. Financial Accountability (GHS)',
              fields: [
                  {
                      id: 'financialTable',
                      label: '',
                      type: FieldType.TABLE,
                      columns: ['Item', 'Collected', 'Used', 'Balance', 'Notes'],
                      rows: [
                          { item: 'Music Fund', collected: 0, used: 0, balance: 0, notes: '', tooltips: { collected: 'e.g., 2,200', used: 'e.g., 1,700', balance: 'e.g., 500', notes: 'e.g., Uniforms, refreshments' } },
                          { item: 'Concert/Outreach Support', collected: 0, used: 0, balance: 0, notes: '', tooltips: { collected: 'e.g., 1,500', used: 'e.g., 1,200', balance: 'e.g., 300', notes: 'e.g., Orphanage outreach' } },
                          { item: 'Instrument/Equipment Donations', collected: 0, used: 0, balance: 0, notes: '', tooltips: { collected: 'e.g., 1,000', used: 'e.g., 900', balance: 'e.g., 100', notes: 'e.g., Microphone repairs' } },
                          { item: 'Total', collected: 0, used: 0, balance: 0, notes: '', tooltips: { collected: 'e.g., 4,700', used: 'e.g., 3,800', balance: 'e.g., 900', notes: '' } },
                      ],
                  },
              ],
          },
          { id: 'challenges', title: '6. Challenges & Needs', fields: [{ id: 'challengesNeeds', label: '', type: FieldType.BULLET, tooltip: 'e.g.,\n• Shortage of microphones during large services.\n• Youth Choir needs stronger male participation.\n• Need projector for lyrics display to support congregational singing.' }] },
          { id: 'plans', title: '7. Plans for Next Quarter', fields: [{ id: 'nextQuarterPlans', label: '', type: FieldType.BULLET, tooltip: 'e.g.,\n• Organize Joint Choir Concert with two neighbouring SDA churches.\n• Train 5 new youth in instrumental music.\n• Fundraise for new projector & microphones.' }] },
          {
              id: 'signatures',
              title: 'Signatures',
              fields: [
                  { id: 'preparedBy', label: 'Prepared by', type: FieldType.SIGNATURE, tooltip: 'e.g.,\nName: Michael Owusu\nDate: 12/04/2025' },
              ],
          },
      ],
  },
  'parl': {
      key: 'parl',
      name: "Public Affairs & Religious Liberty (PARL) Report",
      title: "Public Affairs & Religious Liberty (PARL) Quarterly Report",
      sections: [
          {
              id: 'header',
              title: 'Report Header',
              fields: [
                  { id: 'churchName', label: 'Church Name', type: FieldType.TEXT, tooltip: 'e.g., Daru Town Seventh-day Adventist Church' },
                  { id: 'quarter', label: 'Quarter', type: FieldType.TEXT, tooltip: 'e.g., Q1 (Jan-Mar)' },
                  { id: 'year', label: 'Year', type: FieldType.NUMBER, tooltip: 'e.g., 2025' },
                  { id: 'missionConference', label: 'Mission/Conference', type: FieldType.TEXT, tooltip: 'e.g., South West Papua Mission' },
              ],
          },
          {
              id: 'generalInfo',
              title: '1. General Information',
              fields: [
                  {
                      id: 'infoTable',
                      label: '',
                      type: FieldType.TABLE,
                      columns: ['Item', 'Details'],
                      editableFirstColumn: false,
                      rows: [
                          { item: 'PARL Leader', details: '', tooltips: { details: 'e.g., Elder Richard Mensah' } },
                          { item: 'Assistant(s) / Committee Members', details: '', tooltips: { details: 'e.g., 2' } },
                          { item: 'Date Submitted', details: '', tooltips: { details: 'e.g., April 13, 2025' } },
                      ],
                  },
              ],
          },
          {
              id: 'programs',
              title: '2. Programs & Activities Conducted',
              fields: [
                  {
                      id: 'programsTable',
                      label: '',
                      type: FieldType.TABLE,
                      columns: ['Activity', 'Theme/Details', 'Attendance/Results'],
                      rows: [
                          { activity: 'Religious Liberty Sabbath', theme: '', attendance: '', tooltips: { theme: 'e.g., Theme: "Freedom of Conscience in Christ" - Jan 25', attendance: 'e.g., 180 attendees' } },
                          { activity: 'Awareness Program', theme: '', attendance: '', tooltips: { theme: 'e.g., Seminar on "Sabbath Rights at Work & School" - Feb 9', attendance: 'e.g., 60 members attended' } },
                          { activity: 'Advocacy for Members', theme: '', attendance: '', tooltips: { theme: 'e.g., Assisted 3 members with Sabbath accommodation letters', attendance: 'e.g., 2 cases resolved' } },
                          { activity: 'Community Engagement', theme: '', attendance: '', tooltips: { theme: 'e.g., Visited district assemblyman to introduce church values', attendance: 'e.g., 1 relationship established' } },
                          { activity: 'Relations with Civic Leaders', theme: '', attendance: '', tooltips: { theme: 'e.g., PARL leader attended interfaith forum in March', attendance: 'e.g., Good visibility for church' } },
                          { activity: 'Distribution of Liberty Magazines', theme: '', attendance: '', tooltips: { theme: 'e.g., 25 copies distributed to members & 5 to local officials', attendance: 'e.g., Positive feedback' } },
                      ],
                      hasPhotoUploads: true,
                  },
              ],
          },
          {
              id: 'memberSupport',
              title: '3. Member Support & Cases',
              fields: [
                  {
                      id: 'supportTable',
                      label: '',
                      type: FieldType.TABLE,
                      columns: ['Case Type', 'Number/Details', 'Outcome'],
                      rows: [
                          { case: 'Workplace Sabbath Accommodation', details: '', outcome: '', tooltips: { details: 'e.g., 2 cases (factory workers)', outcome: 'e.g., 1 approved, 1 pending' } },
                          { case: 'School/Exams Sabbath Accommodation', details: '', outcome: '', tooltips: { details: 'e.g., 1 case (secondary school student)', outcome: 'e.g., Approved reschedule' } },
                          { case: 'Other Religious Liberty Issues', details: '', outcome: '', tooltips: { details: 'e.g., None this quarter', outcome: 'e.g., —' } },
                      ],
                  },
              ],
          },
          {
              id: 'collaboration',
              title: '4. Collaboration with Other Departments',
              fields: [
                  {
                      id: 'collabTable',
                      label: '',
                      type: FieldType.TABLE,
                      columns: ['Department', 'Joint Activity', 'Results'],
                      rows: [
                          { department: 'Youth Ministries', activity: '', results: '', tooltips: { activity: 'e.g., Seminar for Adventist students on Sabbath issues', results: 'e.g., 20 youth trained' } },
                          { department: 'Education', activity: '', results: '', tooltips: { activity: 'e.g., Supported exam Sabbath accommodation for student', results: 'e.g., Successful' } },
                          { department: 'Elders/Church Board', activity: '', results: '', tooltips: { activity: 'e.g., Involved in letter-writing for workplace cases', results: 'e.g., Effective advocacy' } },
                      ],
                  },
              ],
          },
          {
              id: 'financial',
              title: '5. Financial Accountability (GHS)',
              fields: [
                  {
                      id: 'financialTable',
                      label: '',
                      type: FieldType.TABLE,
                      columns: ['Item', 'Collected', 'Used', 'Balance', 'Notes'],
                      rows: [
                          { item: 'PARL Fund', collected: 0, used: 0, balance: 0, notes: '', tooltips: { collected: 'e.g., 1,500', used: 'e.g., 1,200', balance: 'e.g., 300', notes: 'e.g., Travel, printing letters' } },
                          { item: 'Liberty Magazine Subscriptions', collected: 0, used: 0, balance: 0, notes: '', tooltips: { collected: 'e.g., 800', used: 'e.g., 700', balance: 'e.g., 100', notes: 'e.g., 30 copies ordered' } },
                          { item: 'Special Donations', collected: 0, used: 0, balance: 0, notes: '', tooltips: { collected: 'e.g., 500', used: 'e.g., 400', balance: 'e.g., 100', notes: 'e.g., Civic engagement' } },
                          { item: 'Total', collected: 0, used: 0, balance: 0, notes: '', tooltips: { collected: 'e.g., 2,800', used: 'e.g., 2,300', balance: 'e.g., 500', notes: '' } },
                      ],
                  },
              ],
          },
          { id: 'challenges', title: '6. Challenges & Needs', fields: [{ id: 'challengesNeeds', label: '', type: FieldType.BULLET, tooltip: 'e.g.,\n• Limited funds to subscribe to more Liberty Magazines.\n• Some employers resistant to Sabbath accommodation requests.\n• Need more church member awareness of religious rights.' }] },
          { id: 'plans', title: '7. Plans for Next Quarter', fields: [{ id: 'nextQuarterPlans', label: '', type: FieldType.BULLET, tooltip: 'e.g.,\n• Organize community interfaith dialogue on religious freedom.\n• Train 5 youth as Religious Liberty Ambassadors.\n• Distribute 50 Liberty Magazines to schools and local leaders.' }] },
          {
              id: 'signatures',
              title: 'Signatures',
              fields: [
                  { id: 'preparedBy', label: 'Prepared by', type: FieldType.SIGNATURE, tooltip: 'e.g.,\nName: Richard Mensah\nDate: 13/04/2025' },
              ],
          },
      ],
  },
  'sabbath-school': {
      key: 'sabbath-school',
      name: "Sabbath School Quarterly Report",
      title: "Sabbath School Quarterly Report",
      sections: [
          {
              id: 'header',
              title: 'Report Header',
              fields: [
                  { id: 'churchName', label: 'Church Name', type: FieldType.TEXT, tooltip: 'e.g., Makana Seventh-day Adventist Church' },
                  { id: 'quarter', label: 'Quarter', type: FieldType.TEXT, tooltip: 'e.g., Q1 (Jan-Mar)' },
                  { id: 'year', label: 'Year', type: FieldType.NUMBER, tooltip: 'e.g., 2025' },
                  { id: 'missionConference', label: 'Mission/Conference', type: FieldType.TEXT, tooltip: 'e.g., CPC' },
              ],
          },
          {
              id: 'generalInfo',
              title: '1. General Information',
              fields: [
                  {
                      id: 'infoTable',
                      label: '',
                      type: FieldType.TABLE,
                      columns: ['Item', 'Details'],
                      editableFirstColumn: false,
                      rows: [
                          { item: 'Sabbath School Superintendent', details: '', tooltips: { details: 'e.g., Sister Lydia Owusu' } },
                          { item: 'Assistant(s)', details: '', tooltips: { details: 'e.g., Elder Daniel Boateng' } },
                          { item: 'Secretary', details: '', tooltips: { details: 'e.g., Brother Samuel Adjei' } },
                          { item: 'Teachers/Facilitators', details: 0, tooltips: { details: 'e.g., 12' } },
                          { item: 'Date Submitted', details: '', tooltips: { details: 'e.g., April 14, 2025' } },
                      ],
                  },
              ],
          },
          {
              id: 'divisions',
              title: '2. Sabbath School Divisions',
              fields: [
                  {
                      id: 'divisionsTable',
                      label: '',
                      type: FieldType.TABLE,
                      columns: ['Division', 'Enrolled', 'Average Attendance', 'Teachers Assigned', 'Notes'],
                      rows: [
                          { division: 'Beginners (0-2 yrs)', enrolled: 0, attendance: 0, teachers: 0, notes: '', tooltips: { enrolled: 'e.g., 6', attendance: 'e.g., 5', teachers: 'e.g., 1', notes: 'e.g., Parents involved' } },
                          { division: 'Kindergarten (3-5 yrs)', enrolled: 0, attendance: 0, teachers: 0, notes: '', tooltips: { enrolled: 'e.g., 10', attendance: 'e.g., 9', teachers: 'e.g., 1', notes: 'e.g., Good participation' } },
                          { division: 'Primary (6-9 yrs)', enrolled: 0, attendance: 0, teachers: 0, notes: '', tooltips: { enrolled: 'e.g., 14', attendance: 'e.g., 12', teachers: 'e.g., 2', notes: 'e.g., Active in memory verses' } },
                          { division: 'Juniors (10-14 yrs)', enrolled: 0, attendance: 0, teachers: 0, notes: '', tooltips: { enrolled: 'e.g., 11', attendance: 'e.g., 10', teachers: 'e.g., 2', notes: 'e.g., Helped lead mission story' } },
                          { division: 'Youth / Young Adults', enrolled: 0, attendance: 0, teachers: 0, notes: '', tooltips: { enrolled: 'e.g., 18', attendance: 'e.g., 15', teachers: 'e.g., 3', notes: 'e.g., Strong discussion groups' } },
                          { division: 'Adults', enrolled: 0, attendance: 0, teachers: 0, notes: '', tooltips: { enrolled: 'e.g., 55', attendance: 'e.g., 45', teachers: 'e.g., 3', notes: 'e.g., Good attendance' } },
                          { division: 'Total', enrolled: 0, attendance: 0, teachers: 0, notes: '', tooltips: { enrolled: 'e.g., 114', attendance: 'e.g., 96', teachers: 'e.g., 12', notes: '' } },
                      ],
                  },
              ],
          },
          {
              id: 'weeklyPrograms',
              title: '3. Weekly Programs Conducted',
              fields: [
                  {
                      id: 'programsTable',
                      label: '',
                      type: FieldType.TABLE,
                      columns: ['Activity', 'Frequency', 'Notes'],
                      rows: [
                          { activity: 'Opening Exercises', frequency: '', notes: '', tooltips: { frequency: 'e.g., Every Sabbath', notes: 'e.g., Led by superintendent team' } },
                          { activity: 'Lesson Study', frequency: '', notes: '', tooltips: { frequency: 'e.g., Every Sabbath', notes: 'e.g., Divisions well attended' } },
                          { activity: 'Mission Story / Offering', frequency: '', notes: '', tooltips: { frequency: 'e.g., Every Sabbath', notes: 'e.g., Children often presented' } },
                          { activity: 'Special Programs', frequency: '', notes: '', tooltips: { frequency: 'e.g., Global Youth Day (Mar 15)', notes: 'e.g., Excellent youth involvement' } },
                      ],
                      hasPhotoUploads: true,
                  },
              ],
          },
          {
              id: 'outreach',
              title: '4. Outreach & Mission Activities',
              fields: [
                  {
                      id: 'outreachTable',
                      label: '',
                      type: FieldType.TABLE,
                      columns: ['Activity', 'Details', 'Results'],
                      rows: [
                          { activity: 'Sabbath School Action Units', details: '', results: '', tooltips: { details: 'e.g., 4 care groups active', results: 'e.g., 2 Bible studies ongoing' } },
                          { activity: 'Community Outreach', details: '', results: '', tooltips: { details: 'e.g., Visited local hospital – Feb 23', results: 'e.g., 30 patients prayed for, food donated' } },
                          { activity: 'Mission Offering Promotion', details: '', results: '', tooltips: { details: 'e.g., Mission spotlight presented weekly', results: 'e.g., GHS 2,300 raised' } },
                          { activity: 'Bible Studies', details: '', results: '', tooltips: { details: 'e.g., Juniors assisting in 1 evangelistic study', results: 'e.g., 3 interests identified' } },
                      ],
                      hasPhotoUploads: true,
                  },
              ],
          },
          {
              id: 'financial',
              title: '5. Financial Accountability (GHS)',
              fields: [
                  {
                      id: 'financialTable',
                      label: '',
                      type: FieldType.TABLE,
                      columns: ['Item', 'Collected', 'Used', 'Balance', 'Notes'],
                      rows: [
                          { item: 'Sabbath School Offerings', collected: 0, used: 0, balance: 0, notes: '', tooltips: { collected: 'e.g., 4,000', used: 'e.g., 3,500', balance: 'e.g., 500', notes: 'e.g., Lesson supplies, mission support' } },
                          { item: 'Mission Offerings', collected: 0, used: 0, balance: 0, notes: '', tooltips: { collected: 'e.g., 2,300', used: 'e.g., 2,300', balance: 'e.g., 0', notes: 'e.g., Forwarded to Conference' } },
                          { item: 'Special Donations', collected: 0, used: 0, balance: 0, notes: '', tooltips: { collected: 'e.g., 600', used: 'e.g., 500', balance: 'e.g., 100', notes: 'e.g., Hospital outreach' } },
                          { item: 'Total', collected: 0, used: 0, balance: 0, notes: '', tooltips: { collected: 'e.g., 6,900', used: 'e.g., 6,300', balance: 'e.g., 600', notes: '' } },
                      ],
                  },
              ],
          },
          { id: 'challenges', title: '6. Challenges & Needs', fields: [{ id: 'challengesNeeds', label: '', type: FieldType.BULLET, tooltip: "e.g.,\n• Some divisions lack enough illustrated lesson materials.\n• Limited classroom space for children's divisions.\n• Care group participation needs strengthening." }] },
          { id: 'plans', title: '7. Plans for Next Quarter', fields: [{ id: 'nextQuarterPlans', label: '', type: FieldType.BULLET, tooltip: "e.g.,\n• Organize Sabbath School Teachers Training Workshop.\n• Conduct joint outreach with Youth Department.\n• Fundraise for additional children's lesson supplies." }] },
          {
              id: 'signatures',
              title: 'Signatures',
              fields: [
                  { id: 'preparedBy', label: 'Prepared by', type: FieldType.SIGNATURE, tooltip: 'e.g.,\nName: Lydia Owusu' },
              ],
          },
      ],
  },
  'adventist-men': {
      key: 'adventist-men',
      name: "Adventist Men Department Quarterly Report",
      title: "Adventist Men Department Quarterly Report",
      sections: [
          {
              id: 'header',
              title: 'Report Header',
              fields: [
                  { id: 'churchName', label: 'Church Name', type: FieldType.TEXT, tooltip: 'e.g., Mt. Zion SDA Church' },
                  { id: 'missionConference', label: 'Mission/Conference', type: FieldType.TEXT, tooltip: 'e.g., Central Papua Conference' },
                  { id: 'quarterYear', label: 'Quarter/Year', type: FieldType.TEXT, tooltip: 'e.g., Q2 - 2025' },
              ],
          },
          {
              id: 'details',
              title: '1. Department Details',
              fields: [{ id: 'detailsList', label: '', type: FieldType.BULLET, defaultValue: ['Department Leader: ', 'Assistant Leader: ', 'Secretary/Clerk: ', 'Reports To: '], tooltip: 'e.g.,\n• Department Leader: Brother John Kila\n• Assistant Leader: Elder Mark Tano\n• Secretary/Clerk: Peter Oa\n• Reports To: Personal Ministries Department' }],
          },
          {
              id: 'membership',
              title: '2. Membership & Participation',
              fields: [
                  {
                      id: 'membershipTable',
                      label: '',
                      type: FieldType.TABLE,
                      columns: ['Category', 'Number', 'Notes/Comments'],
                      rows: [
                          { category: 'Total Baptized Men in Church', number: 0, notes: '', tooltips: { number: 'e.g., 85', notes: '' } },
                          { category: 'Registered Adventist Men Members', number: 0, notes: '', tooltips: { number: 'e.g., 62', notes: '' } },
                          { category: 'Active Participants this Quarter', number: 0, notes: '', tooltips: { number: 'e.g., 54', notes: '' } },
                          { category: 'New Members Joined', number: 0, notes: '', tooltips: { number: 'e.g., 3', notes: 'e.g., Young adults recently baptized' } },
                          { category: 'Members Lost/Inactive', number: 0, notes: '', tooltips: { number: 'e.g., 2', notes: 'e.g., Travel/work relocation' } },
                      ],
                  },
              ],
          },
          {
              id: 'evangelism',
              title: '3. Evangelism & Outreach',
              fields: [
                  {
                      id: 'evangelismTable',
                      label: '',
                      type: FieldType.TABLE,
                      columns: ['Activity/Program', 'Date(s)', 'Venue/Location', 'Attendance/Impact', 'Remarks'],
                      rows: [
                          { activity: 'Evangelistic Crusade', date: '', venue: '', impact: '', remarks: '', tooltips: { date: 'e.g., Apr 10-20', venue: 'e.g., Koki Market', impact: 'e.g., 250+ attended, 9 baptisms', remarks: "e.g., Supported by men's choir" } },
                          { activity: 'Bible Study Groups', date: '', venue: '', impact: '', remarks: '', tooltips: { date: 'e.g., Weekly', venue: 'e.g., 5 homes', impact: 'e.g., 40+ participants', remarks: 'e.g., Growth in spiritual interest' } },
                          { activity: 'Community Service (Cleanup)', date: '', venue: '', impact: '', remarks: '', tooltips: { date: 'e.g., May 5', venue: 'e.g., Local village', impact: 'e.g., 30 volunteers', remarks: 'e.g., Positive feedback from community' } },
                          { activity: 'Prison Ministry', date: '', venue: '', impact: '', remarks: '', tooltips: { date: 'e.g., Jun 12', venue: 'e.g., Bomana Prison', impact: 'e.g., 12 inmates attended', remarks: 'e.g., Shared Bibles and food parcels' } },
                      ],
                      hasPhotoUploads: true,
                  },
              ],
          },
          {
              id: 'fellowship',
              title: '4. Fellowship & Spiritual Growth',
              fields: [
                  {
                      id: 'fellowshipTable',
                      label: '',
                      type: FieldType.TABLE,
                      columns: ['Event/Activity', 'Date(s)', 'Attendance', 'Key Outcomes'],
                      rows: [
                          { event: "Men's Sunrise Prayer", date: '', attendance: '', outcomes: '', tooltips: { date: 'e.g., Every Sat 5am', attendance: 'e.g., Avg. 20 men', outcomes: 'e.g., Strengthened unity' } },
                          { event: 'Family Enrichment Sabbath', date: '', attendance: '', outcomes: '', tooltips: { date: 'e.g., May 18', attendance: 'e.g., 45 families', outcomes: 'e.g., Promoted stronger marriages' } },
                          { event: "Regional Men's Camp", date: '', attendance: '', outcomes: '', tooltips: { date: 'e.g., Jun 21-23', attendance: 'e.g., 70 men', outcomes: 'e.g., Focus on discipleship & leadership' } },
                      ],
                      hasPhotoUploads: true,
                  },
              ],
          },
          {
              id: 'training',
              title: '5. Training & Capacity Building',
              fields: [
                  {
                      id: 'trainingTable',
                      label: '',
                      type: FieldType.TABLE,
                      columns: ['Training/Workshop', 'Date(s)', 'Facilitator', 'Participants', 'Outcomes'],
                      rows: [
                          { training: 'Leadership & Evangelism', date: '', facilitator: '', participants: 0, outcomes: '', tooltips: { date: 'e.g., May 11', facilitator: 'e.g., Pastor Kepa', participants: 'e.g., 25', outcomes: 'e.g., Men equipped to lead Bible studies' } },
                      ],
                      hasPhotoUploads: true,
                  },
              ],
          },
          {
              id: 'financial',
              title: '6. Financial Report',
              fields: [
                  {
                      id: 'incomeTable',
                      label: 'Income',
                      type: FieldType.TABLE,
                      columns: ['Income Source', 'Amount', 'Notes'],
                      rows: [
                          { source: 'Offerings/Donations', amount: 0, notes: '', tooltips: { amount: 'e.g., K1,200', notes: 'e.g., Regular Sabbath giving' } },
                          { source: 'Special Projects', amount: 0, notes: '', tooltips: { amount: 'e.g., K800', notes: 'e.g., Camp fundraising' } },
                          { source: 'Conference/District Support', amount: 0, notes: '', tooltips: { amount: 'e.g., K500', notes: 'e.g., For outreach' } },
                          { source: 'Total Income', amount: 0, notes: '', tooltips: { amount: 'e.g., K2,500', notes: '' } },
                      ],
                  },
                  {
                      id: 'expenditureTable',
                      label: 'Expenditure',
                      type: FieldType.TABLE,
                      columns: ['Expenditure Category', 'Amount', 'Notes'],
                      rows: [
                          { category: 'Evangelism & Outreach', amount: 0, notes: '', tooltips: { amount: 'e.g., K1,000', notes: 'e.g., Crusade expenses' } },
                          { category: 'Fellowship/Retreats', amount: 0, notes: '', tooltips: { amount: 'e.g., K900', notes: 'e.g., Regional camp' } },
                          { category: 'Training', amount: 0, notes: '', tooltips: { amount: 'e.g., K300', notes: 'e.g., Workshop' } },
                          { category: 'Other (Materials)', amount: 0, notes: '', tooltips: { amount: 'e.g., K200', notes: 'e.g., Bibles, tracts' } },
                          { category: 'Total Expenditure', amount: 0, notes: '', tooltips: { amount: 'e.g., K2,400', notes: '' } },
                      ],
                  },
                   { id: 'balanceForward', label: 'Balance Carried Forward', type: FieldType.NUMBER, tooltip: 'e.g., K100' },
              ],
          },
          { id: 'challenges', title: '7. Challenges & Needs', fields: [{ id: 'challengesNeeds', label: '', type: FieldType.BULLET, tooltip: 'e.g.,\n• Need for more transport support during outreach.\n• More training for young men to take leadership roles.' }] },
          { id: 'plans', title: '8. Plans for Next Quarter', fields: [{ id: 'nextQuarterPlans', label: '', type: FieldType.BULLET, tooltip: 'e.g.,\n• Organize hospital visitation program.\n• Hold men\'s revival Sabbath.\n• Expand Bible study groups to two new areas.' }] },
          { id: 'recommendations', title: '9. Recommendations to Church Board', fields: [{ id: 'recommendationsList', label: '', type: FieldType.BULLET, tooltip: 'e.g.,\n• Approve budget support for transport (K300).\n• Encourage more men to be active in PM evangelistic programs.' }] },
          {
              id: 'signatures',
              title: 'Signatures',
              fields: [
                  { id: 'preparedBy', label: 'Prepared by', type: FieldType.SIGNATURE, tooltip: 'e.g.,\nName: Brother John Kila\nDate: 15/05/2025' },
              ],
          },
      ],
  },
  'bible-school': {
      key: 'bible-school',
      name: "Bible School Coordinator Quarterly Report",
      title: "Bible School Coordinator Quarterly Report",
      sections: [
          {
              id: 'header',
              title: 'Report Header',
              fields: [
                  { id: 'churchName', label: 'Church Name', type: FieldType.TEXT, tooltip: 'e.g., Kimininga SDA Church' },
                  { id: 'missionConference', label: 'Mission/Conference', type: FieldType.TEXT, tooltip: 'e.g., WHM' },
                  { id: 'quarterYear', label: 'Quarter/Year', type: FieldType.TEXT, tooltip: 'e.g., Q2 - 2025' },
              ],
          },
          {
              id: 'details',
              title: '1. Department Details',
              fields: [{ id: 'detailsList', label: '', type: FieldType.BULLET, defaultValue: ['Coordinator: ', 'Assistant: ', 'Secretary: ', 'Reports To: '], tooltip: 'e.g.,\n• Coordinator: Sister Maria Kuri\n• Assistant: Brother David Noki\n• Secretary: Anna Mero\n• Reports To: Personal Ministries Department' }],
          },
          {
              id: 'enrolment',
              title: '2. Enrolment & Participation',
              fields: [
                  {
                      id: 'enrolmentTable',
                      label: '',
                      type: FieldType.TABLE,
                      columns: ['Category', 'Number', 'Notes/Comments'],
                      rows: [
                          { category: 'Total Students Enrolled (to date)', number: 0, notes: '', tooltips: { number: 'e.g., 112', notes: 'e.g., Cumulative since 2023' } },
                          { category: 'New Students This Quarter', number: 0, notes: '', tooltips: { number: 'e.g., 25', notes: 'e.g., From recent crusade' } },
                          { category: 'Active Students', number: 0, notes: '', tooltips: { number: 'e.g., 68', notes: 'e.g., Returning lessons regularly' } },
                          { category: 'Inactive/Unresponsive Students', number: 0, notes: '', tooltips: { number: 'e.g., 12', notes: 'e.g., Need visitation' } },
                          { category: 'Students Completed Full Course', number: 0, notes: '', tooltips: { number: 'e.g., 9', notes: 'e.g., Ready for baptismal class' } },
                      ],
                  },
              ],
          },
          {
              id: 'lessons',
              title: '3. Lessons Distribution & Returns',
              fields: [
                  {
                      id: 'lessonsTable',
                      label: '',
                      type: FieldType.TABLE,
                      columns: ['Lesson Series Distributed', 'No. of Sets Given', 'No. Returned/Completed', 'Remarks'],
                      rows: [
                          { series: 'Discover Bible Guides', given: 0, returned: 0, remarks: '', tooltips: { given: 'e.g., 60', returned: 'e.g., 35', remarks: 'e.g., Some delayed returns' } },
                          { series: 'Focus on Prophecy', given: 0, returned: 0, remarks: '', tooltips: { given: 'e.g., 15', returned: 'e.g., 9', remarks: 'e.g., Positive feedback' } },
                          { series: 'Junior Bible Lessons', given: 0, returned: 0, remarks: '', tooltips: { given: 'e.g., 20', returned: 'e.g., 12', remarks: 'e.g., Targeting youth' } },
                      ],
                  },
              ],
          },
          {
              id: 'baptismal',
              title: '4. Baptismal Interests & Decisions',
              fields: [
                  {
                      id: 'baptismalTable',
                      label: '',
                      type: FieldType.TABLE,
                      columns: ['Student Name/Group', 'Lessons Completed', 'Decision/Interest', 'Follow-up Plan'],
                      rows: [
                          { name: '', completed: '', decision: '', plan: '', tooltips: { name: 'e.g., Peter A.', completed: 'e.g., 20/25', decision: 'e.g., Wants baptism', plan: 'e.g., Join baptismal class' } },
                          { name: '', completed: '', decision: '', plan: '', tooltips: { name: 'e.g., Mary K.', completed: 'e.g., 12/25', decision: 'e.g., Attending church', plan: 'e.g., Continued studies' } },
                          { name: '', completed: '', decision: '', plan: '', tooltips: { name: 'e.g., Youth group (5 members)', completed: 'e.g., 10/15', decision: 'e.g., Interested', plan: 'e.g., Weekly PM follow-up' } },
                      ],
                  },
              ],
          },
          {
              id: 'outreach',
              title: '5. Outreach & Support Activities',
              fields: [
                  {
                      id: 'outreachTable',
                      label: '',
                      type: FieldType.TABLE,
                      columns: ['Activity/Initiative', 'Date(s)', 'Location', 'Attendance/Impact', 'Remarks'],
                      rows: [
                          { activity: 'Bible School Promotion', date: '', location: '', impact: '', remarks: '', tooltips: { date: 'e.g., Apr 7', location: 'e.g., Bethel Church', impact: 'e.g., 80+ attendees', remarks: 'e.g., Promoted during PM Sabbath' } },
                          { activity: 'Home Visits/Follow-up', date: '', location: '', impact: '', remarks: '', tooltips: { date: 'e.g., Apr-Jun', location: 'e.g., 10 homes', impact: 'e.g., 25 students', remarks: 'e.g., Encouraging' } },
                          { activity: 'Combined Evangelism', date: '', location: '', impact: '', remarks: '', tooltips: { date: 'e.g., May 15-20', location: 'e.g., City Center', impact: 'e.g., 300+ attended, 15 interests', remarks: 'e.g., Shared Bible guides' } },
                      ],
                      hasPhotoUploads: true,
                  },
              ],
          },
           {
              id: 'financial',
              title: '6. Financial Report',
              fields: [
                  {
                      id: 'incomeTable',
                      label: 'Income',
                      type: FieldType.TABLE,
                      columns: ['Income Source', 'Amount', 'Notes'],
                      rows: [
                          { source: 'Offerings/Donations', amount: 0, notes: '', tooltips: { amount: 'e.g., K450', notes: 'e.g., Collected from members' } },
                          { source: 'Conference Support', amount: 0, notes: '', tooltips: { amount: 'e.g., K300', notes: 'e.g., Quarterly subsidy' } },
                          { source: 'Other (Love Offerings)', amount: 0, notes: '', tooltips: { amount: 'e.g., K100', notes: 'e.g., Individual support' } },
                          { source: 'Total Income', amount: 0, notes: '', tooltips: { amount: 'e.g., K850', notes: '' } },
                      ],
                  },
                  {
                      id: 'expenditureTable',
                      label: 'Expenditure',
                      type: FieldType.TABLE,
                      columns: ['Expenditure Category', 'Amount', 'Notes'],
                      rows: [
                          { category: 'Lesson Materials/Printing', amount: 0, notes: '', tooltips: { amount: 'e.g., K400', notes: 'e.g., Guides & tracts' } },
                          { category: 'Transport/Follow-up Visits', amount: 0, notes: '', tooltips: { amount: 'e.g., K250', notes: 'e.g., Local visits' } },
                          { category: 'Other (Stationery)', amount: 0, notes: '', tooltips: { amount: 'e.g., K100', notes: 'e.g., Record keeping' } },
                          { category: 'Total Expenditure', amount: 0, notes: '', tooltips: { amount: 'e.g., K750', notes: '' } },
                      ],
                  },
                   { id: 'balanceForward', label: 'Balance Carried Forward', type: FieldType.NUMBER, tooltip: 'e.g., K100' },
              ],
          },
          { id: 'challenges', title: '7. Challenges & Needs', fields: [{ id: 'challengesNeeds', label: '', type: FieldType.BULLET, tooltip: 'e.g.,\n• Some inactive students due to distance/transport challenges.\n• Need for more youth-targeted Bible study series.' }] },
          { id: 'plans', title: '8. Plans for Next Quarter', fields: [{ id: 'nextQuarterPlans', label: '', type: FieldType.BULLET, tooltip: 'e.g.,\n• Launch Focus on Daniel & Revelation series.\n• Expand Bible school enrolment through youth meetings.\n• Organize a graduation Sabbath for students completing the course.' }] },
          { id: 'recommendations', title: '9. Recommendations to Church Board', fields: [{ id: 'recommendationsList', label: '', type: FieldType.BULLET, tooltip: 'e.g.,\n• Approve budget for transport allowance (K200).\n• Support Bible School Promotion Day during divine service.' }] },
          {
              id: 'signatures',
              title: 'Signatures',
              fields: [
                  { id: 'preparedBy', label: 'Prepared by', type: FieldType.SIGNATURE, tooltip: 'e.g.,\nName: Sister Maria Kuri\nDate: 23/05/2025' },
              ],
          },
      ],
  },
  'acs-dorcas': {
      key: 'acs-dorcas',
      name: "ACS / Dorcas Society Quarterly Report",
      title: "Adventist Community Services (ACS) / Dorcas Society Quarterly Report",
      sections: [
          {
              id: 'header',
              title: 'Report Header',
              fields: [
                  { id: 'churchName', label: 'Church Name', type: FieldType.TEXT, tooltip: 'e.g., Koki SDA Church' },
                  { id: 'districtConference', label: 'District/Conference', type: FieldType.TEXT, tooltip: 'e.g., Central Papua Conference' },
                  { id: 'quarterYear', label: 'Quarter/Year', type: FieldType.TEXT, tooltip: 'e.g., Q2 - 2025' },
              ],
          },
          {
              id: 'details',
              title: '1. Department Details',
              fields: [{ id: 'detailsList', label: '', type: FieldType.BULLET, defaultValue: ['Leader: ', 'Assistant: ', 'Secretary/Treasurer: ', 'Reports To: '], tooltip: 'e.g.,\n• Leader: Sister Naomi Epa\n• Assistant: Brother Jacob Lohia\n• Secretary/Treasurer: Mary Tano\n• Reports To: Personal Ministries' }],
          },
          {
              id: 'membership',
              title: '2. Membership & Participation',
              fields: [
                  {
                      id: 'membershipTable',
                      label: '',
                      type: FieldType.TABLE,
                      columns: ['Category', 'Number', 'Notes/Comments'],
                      rows: [
                          { category: 'Total Registered Members', number: 0, notes: '', tooltips: { number: 'e.g., 45', notes: 'e.g., Women + men volunteers' } },
                          { category: 'Active Volunteers This Quarter', number: 0, notes: '', tooltips: { number: 'e.g., 38', notes: 'e.g., Mostly engaged in relief work' } },
                          { category: 'New Members Joined', number: 0, notes: '', tooltips: { number: 'e.g., 4', notes: 'e.g., Young women joined' } },
                          { category: 'Members Inactive/Excused', number: 0, notes: '', tooltips: { number: 'e.g., 3', notes: 'e.g., Illness/travel' } },
                      ],
                  },
              ],
          },
          {
              id: 'service',
              title: '3. Service & Outreach Activities',
              fields: [
                  {
                      id: 'serviceTable',
                      label: '',
                      type: FieldType.TABLE,
                      columns: ['Activity/Project', 'Date(s)', 'Location', 'Beneficiaries/Impact', 'Remarks'],
                      rows: [
                          { activity: 'Food Distribution', date: '', location: '', impact: '', remarks: '', tooltips: { date: 'e.g., Apr 12', location: 'e.g., Church yard', impact: 'e.g., 25 families', remarks: 'e.g., Supported by deacons' } },
                          { activity: 'Clothing Drive', date: '', location: '', impact: '', remarks: '', tooltips: { date: 'e.g., May 3', location: 'e.g., Local village', impact: 'e.g., 40 households', remarks: 'e.g., Community very thankful' } },
                          { activity: 'Hospital Visit & Prayer', date: '', location: '', impact: '', remarks: '', tooltips: { date: 'e.g., May 19', location: 'e.g., City Hospital', impact: 'e.g., 35 patients visited', remarks: 'e.g., Shared care packages' } },
                          { activity: 'Flood Relief Support', date: '', location: '', impact: '', remarks: '', tooltips: { date: 'e.g., Jun 8-10', location: 'e.g., Settlement area', impact: 'e.g., 18 families assisted', remarks: 'e.g., Worked with Red Cross' } },
                      ],
                      hasPhotoUploads: true,
                  },
              ],
          },
          {
              id: 'partnerships',
              title: '4. Partnerships & Collaboration',
              fields: [
                  {
                      id: 'partnershipsTable',
                      label: '',
                      type: FieldType.TABLE,
                      columns: ['Organization/Partner', 'Nature of Support', 'Outcomes'],
                      rows: [
                          { partner: 'Local Red Cross', support: '', outcomes: '', tooltips: { support: 'e.g., Donated food items', outcomes: 'e.g., Relief packages distributed' } },
                          { partner: 'Youth Ministry', support: '', outcomes: '', tooltips: { support: 'e.g., Transport support', outcomes: 'e.g., More youth involved' } },
                      ],
                  },
              ],
          },
          {
              id: 'training',
              title: '5. Training & Capacity Building',
              fields: [
                  {
                      id: 'trainingTable',
                      label: '',
                      type: FieldType.TABLE,
                      columns: ['Training/Workshop', 'Date', 'Facilitator', 'Participants', 'Key Outcomes'],
                      rows: [
                          { training: 'Disaster Response Basics', date: '', facilitator: '', participants: 0, outcomes: '', tooltips: { date: 'e.g., Apr 21', facilitator: 'e.g., District ACS Coordinator', participants: 'e.g., 20', outcomes: 'e.g., Improved readiness' } },
                      ],
                      hasPhotoUploads: true,
                  },
              ],
          },
          {
              id: 'financial',
              title: '6. Financial Report',
              fields: [
                  {
                      id: 'incomeTable',
                      label: 'Income',
                      type: FieldType.TABLE,
                      columns: ['Income Source', 'Amount', 'Notes'],
                      rows: [
                          { source: 'Offerings/Donations', amount: 0, notes: '', tooltips: { amount: 'e.g., K1,200', notes: 'e.g., From church members' } },
                          { source: 'Special Projects', amount: 0, notes: '', tooltips: { amount: 'e.g., K500', notes: 'e.g., Clothing sale fundraiser' } },
                          { source: 'Conference/District Support', amount: 0, notes: '', tooltips: { amount: 'e.g., K300', notes: 'e.g., Relief subsidy' } },
                          { source: 'Total Income', amount: 0, notes: '', tooltips: { amount: 'e.g., K2,000', notes: '' } },
                      ],
                  },
                  {
                      id: 'expenditureTable',
                      label: 'Expenditure',
                      type: FieldType.TABLE,
                      columns: ['Expenditure Category', 'Amount', 'Notes'],
                      rows: [
                          { category: 'Food/Clothing Purchases', amount: 0, notes: '', tooltips: { amount: 'e.g., K900', notes: 'e.g., Relief items' } },
                          { category: 'Transport/Logistics', amount: 0, notes: '', tooltips: { amount: 'e.g., K600', notes: 'e.g., Hired vehicles' } },
                          { category: 'Training/Workshops', amount: 0, notes: '', tooltips: { amount: 'e.g., K200', notes: 'e.g., Materials & meals' } },
                          { category: 'Other (Stationery)', amount: 0, notes: '', tooltips: { amount: 'e.g., K100', notes: 'e.g., Records, printing' } },
                          { category: 'Total Expenditure', amount: 0, notes: '', tooltips: { amount: 'e.g., K1,800', notes: '' } },
                      ],
                  },
                   { id: 'balanceForward', label: 'Balance Carried Forward', type: FieldType.NUMBER, tooltip: 'e.g., K200' },
              ],
          },
          { id: 'challenges', title: '7. Challenges & Needs', fields: [{ id: 'challengesNeeds', label: '', type: FieldType.BULLET, tooltip: "e.g.,\n• Insufficient storage space for clothes and food.\n• Need for sewing machines for women's empowerment projects." }] },
          { id: 'plans', title: '8. Plans for Next Quarter', fields: [{ id: 'nextQuarterPlans', label: '', type: FieldType.BULLET, tooltip: 'e.g.,\n• Launch small skills training (sewing/cooking).\n• Organize combined outreach with Pathfinder Club.\n• Expand relief support through district partnerships.' }] },
          { id: 'recommendations', title: '9. Recommendations to Church Board', fields: [{ id: 'recommendationsList', label: '', type: FieldType.BULLET, tooltip: "e.g.,\n• Approve use of one Sabbath School room as storage.\n• Allocate K300 from church budget for women's livelihood project." }] },
          {
              id: 'signatures',
              title: 'Signatures',
              fields: [
                  { id: 'preparedBy', label: 'Prepared by', type: FieldType.SIGNATURE, tooltip: 'e.g.,\nName: Naomi Epa\nDate: 30/06/2025' },
              ],
          },
      ],
  },
  'sop-writings': {
      key: 'sop-writings',
      name: "Spirit of Prophecy (SOP) Writings Dept. Report",
      title: "Spirit of Prophecy (SOP) Writings Department Quarterly Report",
      sections: [
          {
              id: 'header',
              title: 'Report Header',
              fields: [
                  { id: 'churchName', label: 'Church Name', type: FieldType.TEXT, tooltip: 'e.g., Lae Town SDA Church' },
                  { id: 'missionConference', label: 'Mission/Conference', type: FieldType.TEXT, tooltip: 'e.g., Morobe Mission' },
                  { id: 'quarterYear', label: 'Quarter/Year', type: FieldType.TEXT, tooltip: 'e.g., Q2 - 2025' },
              ],
          },
          {
              id: 'details',
              title: '1. Department Details',
              fields: [{ id: 'detailsList', label: '', type: FieldType.BULLET, defaultValue: ['Coordinator: ', 'Assistant: ', 'Secretary: ', 'Reports To: '], tooltip: 'e.g.,\n• Coordinator: Elder Samuel Karo\n• Assistant: Sister Ruth Gire\n• Secretary: None appointed\n• Reports To: Personal Ministries' }],
          },
          {
              id: 'membership',
              title: '2. Membership & Participation',
              fields: [
                  {
                      id: 'membershipTable',
                      label: '',
                      type: FieldType.TABLE,
                      columns: ['Category', 'Number', 'Notes/Comments'],
                      rows: [
                          { category: 'Active SOP Committee Members', number: 0, notes: '', tooltips: { number: 'e.g., 6', notes: 'e.g., Regularly meet once a month' } },
                          { category: 'Volunteers Supporting Activities', number: 0, notes: '', tooltips: { number: 'e.g., 12', notes: 'e.g., Assist in literature distribution' } },
                          { category: 'New Members Involved this Quarter', number: 0, notes: '', tooltips: { number: 'e.g., 3', notes: 'e.g., Youth assisting with online sharing' } },
                      ],
                  },
              ],
          },
          {
              id: 'distribution',
              title: '3. Distribution & Promotion of SOP Literature',
              fields: [
                  {
                      id: 'distributionTable',
                      label: '',
                      type: FieldType.TABLE,
                      columns: ['Type of Material Distributed', 'Quantity Distributed', 'Target Group/Location', 'Remarks'],
                      rows: [
                          { type: 'Books (Steps to Christ)', quantity: 0, target: '', remarks: '', tooltips: { quantity: 'e.g., 120', target: 'e.g., Market & Hospital', remarks: 'e.g., Well received' } },
                          { type: 'Great Controversy', quantity: 0, target: '', remarks: '', tooltips: { quantity: 'e.g., 50', target: 'e.g., Community & contacts', remarks: 'e.g., Many requested Bible studies' } },
                          { type: 'Pamphlets/Tracts', quantity: 0, target: '', remarks: '', tooltips: { quantity: 'e.g., 300', target: 'e.g., Door-to-door outreach', remarks: 'e.g., Shared with prayer cards' } },
                          { type: 'Digital Resources (PDFs, audio)', quantity: 0, target: '', remarks: '', tooltips: { quantity: 'e.g., 25 shared online', target: 'e.g., WhatsApp groups', remarks: 'e.g., Youth-driven' } },
                      ],
                  },
              ],
          },
          {
              id: 'programs',
              title: '4. Programs & Activities',
              fields: [
                  {
                      id: 'programsTable',
                      label: '',
                      type: FieldType.TABLE,
                      columns: ['Program/Activity', 'Date(s)', 'Venue/Location', 'Attendance/Impact', 'Remarks'],
                      rows: [
                          { program: 'SOP Reading Campaign (Desire of Ages)', date: '', venue: '', impact: '', remarks: '', tooltips: { date: 'e.g., Apr-Jun', venue: 'e.g., Church families', impact: 'e.g., 25 families', remarks: 'e.g., Reports submitted weekly' } },
                          { program: 'Seminar: Spirit of Prophecy & End-Time', date: '', venue: '', impact: '', remarks: '', tooltips: { date: 'e.g., May 18', venue: 'e.g., Church', impact: 'e.g., 75 attendees', remarks: 'e.g., Strong interest from young adults' } },
                          { program: 'SOP Promotion Sabbath', date: '', venue: '', impact: '', remarks: '', tooltips: { date: 'e.g., Jun 15', venue: 'e.g., Lae Town Church', impact: 'e.g., 180', remarks: 'e.g., Theme: "Hold Fast the Testimony of Jesus"' } },
                      ],
                      hasPhotoUploads: true,
                  },
              ],
          },
          {
              id: 'collaboration',
              title: '5. Collaboration & Support',
              fields: [
                  {
                      id: 'collaborationTable',
                      label: '',
                      type: FieldType.TABLE,
                      columns: ['Partner (Dept./Group)', 'Activity', 'Outcomes'],
                      rows: [
                          { partner: 'Adventist Youth', activity: '', outcomes: '', tooltips: { activity: 'e.g., Assisted with digital distribution', outcomes: 'e.g., Wider reach on social media' } },
                          { partner: 'Dorcas/ACS', activity: '', outcomes: '', tooltips: { activity: 'e.g., Shared SOP tracts during food distribution', outcomes: 'e.g., Combined witness' } },
                      ],
                  },
              ],
          },
          {
              id: 'financial',
              title: '6. Financial Report',
              fields: [
                  {
                      id: 'incomeTable',
                      label: 'Income',
                      type: FieldType.TABLE,
                      columns: ['Income Source', 'Amount', 'Notes'],
                      rows: [
                          { source: 'Offerings/Donations', amount: 0, notes: '', tooltips: { amount: 'e.g., K600', notes: 'e.g., Collected during SOP Sabbath' } },
                          { source: 'Literature Sales', amount: 0, notes: '', tooltips: { amount: 'e.g., K300', notes: 'e.g., Subsidized EGW books' } },
                          { source: 'Conference Support', amount: 0, notes: '', tooltips: { amount: 'e.g., K200', notes: 'e.g., Literature subsidy' } },
                          { source: 'Total Income', amount: 0, notes: '', tooltips: { amount: 'e.g., K1,100', notes: '' } },
                      ],
                  },
                  {
                      id: 'expenditureTable',
                      label: 'Expenditure',
                      type: FieldType.TABLE,
                      columns: ['Expenditure Category', 'Amount', 'Notes'],
                      rows: [
                          { category: 'Literature Purchase', amount: 0, notes: '', tooltips: { amount: 'e.g., K700', notes: 'e.g., 200 books' } },
                          { category: 'Promotion/Printing', amount: 0, notes: '', tooltips: { amount: 'e.g., K200', notes: 'e.g., Flyers, posters' } },
                          { category: 'Training/Programs', amount: 0, notes: '', tooltips: { amount: 'e.g., K100', notes: 'e.g., Seminar speaker' } },
                          { category: 'Other (Stationery)', amount: 0, notes: '', tooltips: { amount: 'e.g., K50', notes: 'e.g., Recording sheets' } },
                          { category: 'Total Expenditure', amount: 0, notes: '', tooltips: { amount: 'e.g., K1,050', notes: '' } },
                      ],
                  },
                   { id: 'balanceForward', label: 'Balance Carried Forward', type: FieldType.NUMBER, tooltip: 'e.g., K50' },
              ],
          },
          { id: 'challenges', title: '7. Challenges & Needs', fields: [{ id: 'challengesNeeds', label: '', type: FieldType.BULLET, tooltip: 'e.g.,\n• Some families still lack personal EGW books.\n• Need projector for SOP seminars.' }] },
          { id: 'plans', title: '8. Plans for Next Quarter', fields: [{ id: 'nextQuarterPlans', label: '', type: FieldType.BULLET, tooltip: 'e.g.,\n• Launch Ministry of Healing reading challenge.\n• Print and distribute SOP youth devotionals.\n• Conduct combined district-wide SOP rally.' }] },
          { id: 'recommendations', title: '9. Recommendations to Church Board', fields: [{ id: 'recommendationsList', label: '', type: FieldType.BULLET, tooltip: 'e.g.,\n• Approve budget support for projector (K400).\n• Encourage elders to use SOP books in Sabbath sermons.' }] },
          {
              id: 'signatures',
              title: 'Signatures',
              fields: [
                  { id: 'preparedBy', label: 'Prepared by', type: FieldType.SIGNATURE, tooltip: 'e.g.,\nName: Elder Samuel Karo\nDate: 23/09/2025' },
              ],
          },
      ],
  },
  'stewardship': {
      key: 'stewardship',
      name: "Stewardship Department Quarterly Report",
      title: "Stewardship Department Quarterly Report",
      sections: [
          {
              id: 'header',
              title: 'Report Header',
              fields: [
                  { id: 'churchName', label: 'Church Name', type: FieldType.TEXT, tooltip: 'e.g., Madang Town SDA Church' },
                  { id: 'missionConference', label: 'Mission/Conference', type: FieldType.TEXT, tooltip: 'e.g., Madang Manus Mission' },
                  { id: 'quarterYear', label: 'Quarter/Year', type: FieldType.TEXT, tooltip: 'e.g., Q2 - 2025' },
              ],
          },
          {
              id: 'details',
              title: '1. Department Details',
              fields: [{ id: 'detailsList', label: '', type: FieldType.BULLET, defaultValue: ['Stewardship Leader: ', 'Assistant: ', 'Reports To: '], tooltip: 'e.g.,\n• Stewardship Leader: Elder Joseph Manoa\n• Assistant: Sister Lisa Kuri\n• Reports To: Church Board' }],
          },
          {
              id: 'tithesSummary',
              title: '2. Tithes & Offerings Summary',
              fields: [
                  {
                      id: 'tithesTable',
                      label: '',
                      type: FieldType.TABLE,
                      columns: ['Category', 'This Quarter', 'Previous Quarter', 'Change (%)', 'Remarks'],
                      rows: [
                          { category: 'Total Tithes Remitted', this_quarter: 0, prev_quarter: 0, change: '', remarks: '', tooltips: { this_quarter: 'e.g., K52,000', prev_quarter: 'e.g., K48,500', change: 'e.g., +7%', remarks: 'e.g., Growth in consistency' } },
                          { category: 'Local Church Budget Offerings', this_quarter: 0, prev_quarter: 0, change: '', remarks: '', tooltips: { this_quarter: 'e.g., K8,200', prev_quarter: 'e.g., K7,100', change: 'e.g., +15%', remarks: 'e.g., More pledges received' } },
                          { category: 'Sabbath School Offerings', this_quarter: 0, prev_quarter: 0, change: '', remarks: '', tooltips: { this_quarter: 'e.g., K3,500', prev_quarter: 'e.g., K3,200', change: 'e.g., +9%', remarks: 'e.g., Encouraging trend' } },
                          { category: 'Mission Offerings', this_quarter: 0, prev_quarter: 0, change: '', remarks: '', tooltips: { this_quarter: 'e.g., K1,900', prev_quarter: 'e.g., K2,100', change: 'e.g., -10%', remarks: 'e.g., Needs promotion' } },
                          { category: 'Special Projects Offerings', this_quarter: 0, prev_quarter: 0, change: '', remarks: '', tooltips: { this_quarter: 'e.g., K2,700', prev_quarter: 'e.g., K2,000', change: 'e.g., +35%', remarks: 'e.g., Camp meeting support' } },
                      ],
                  },
              ],
          },
          {
              id: 'education',
              title: '3. Stewardship Education & Programs',
              fields: [
                  {
                      id: 'educationTable',
                      label: '',
                      type: FieldType.TABLE,
                      columns: ['Program/Activity', 'Date(s)', 'Venue/Location', 'Attendance', 'Key Outcomes'],
                      rows: [
                          { program: 'Stewardship Sabbath', date: '', venue: '', attendance: 0, outcomes: '', tooltips: { date: 'e.g., Apr 13', venue: 'e.g., Boroko SDA', attendance: 'e.g., 280', outcomes: 'e.g., Strong sermon focus on faithfulness' } },
                          { program: 'Seminar: Biblical Finance', date: '', venue: '', attendance: 0, outcomes: '', tooltips: { date: 'e.g., May 11', venue: 'e.g., Church Hall', attendance: 'e.g., 65', outcomes: 'e.g., Members learned budgeting skills' } },
                          { program: 'Small Group Studies', date: '', venue: '', attendance: 0, outcomes: '', tooltips: { date: 'e.g., Weekly', venue: 'e.g., 6 homes', attendance: 'e.g., 40+', outcomes: 'e.g., Positive testimonies' } },
                          { program: 'Youth Stewardship Sabbath', date: '', venue: '', attendance: 0, outcomes: '', tooltips: { date: 'e.g., Jun 15', venue: 'e.g., Boroko SDA', attendance: 'e.g., 70', outcomes: 'e.g., Youth pledged systematic giving' } },
                      ],
                      hasPhotoUploads: true,
                  },
              ],
          },
          {
              id: 'commitment',
              title: '4. Member Participation & Commitment',
              fields: [
                  {
                      id: 'commitmentTable',
                      label: '',
                      type: FieldType.TABLE,
                      columns: ['Category', 'Number/Percentage', 'Notes'],
                      rows: [
                          { category: 'Members Returning Tithe Regularly', number: '', notes: '', tooltips: { number: 'e.g., 210 (78%)', notes: 'e.g., Some still irregular' } },
                          { category: 'Members Contributing to Local Budget', number: '', notes: '', tooltips: { number: 'e.g., 180 (67%)', notes: 'e.g., Gradual improvement' } },
                          { category: 'Members Involved in Stewardship Programs', number: '', notes: '', tooltips: { number: 'e.g., 95', notes: 'e.g., Active in workshops' } },
                      ],
                  },
              ],
          },
          {
              id: 'financialEd',
              title: '5. Financial Education Initiatives',
              fields: [
                  {
                      id: 'financialEdTable',
                      label: '',
                      type: FieldType.TABLE,
                      columns: ['Training/Workshop', 'Date', 'Facilitator', 'Participants', 'Outcomes'],
                      rows: [
                          { training: 'Budgeting & Debt Management', date: '', facilitator: '', participants: 0, outcomes: '', tooltips: { date: 'e.g., May 25', facilitator: 'e.g., Pastor Kalai', participants: 'e.g., 30', outcomes: 'e.g., Improved family budgeting awareness' } },
                      ],
                      hasPhotoUploads: true,
                  },
              ],
          },
          {
              id: 'financialReport',
              title: '6. Financial Report (Departmental)',
              fields: [
                  {
                      id: 'incomeTable',
                      label: 'Income',
                      type: FieldType.TABLE,
                      columns: ['Income Source', 'Amount', 'Notes'],
                      rows: [
                          { source: 'Offerings/Donations', amount: 0, notes: '', tooltips: { amount: 'e.g., K800', notes: 'e.g., Collected during Stewardship Sabbath' } },
                          { source: 'Conference/District Support', amount: 0, notes: '', tooltips: { amount: 'e.g., K400', notes: 'e.g., For seminar' } },
                          { source: 'Other (Book Sales)', amount: 0, notes: '', tooltips: { amount: 'e.g., K150', notes: 'e.g., Stewardship devotional' } },
                          { source: 'Total Income', amount: 0, notes: '', tooltips: { amount: 'e.g., K1,350', notes: '' } },
                      ],
                  },
                  {
                      id: 'expenditureTable',
                      label: 'Expenditure',
                      type: FieldType.TABLE,
                      columns: ['Expenditure Category', 'Amount', 'Notes'],
                      rows: [
                          { category: 'Stewardship Materials', amount: 0, notes: '', tooltips: { amount: 'e.g., K500', notes: 'e.g., Devotional guides' } },
                          { category: 'Seminars/Workshops', amount: 0, notes: '', tooltips: { amount: 'e.g., K600', notes: 'e.g., Food, materials' } },
                          { category: 'Promotion/Printing', amount: 0, notes: '', tooltips: { amount: 'e.g., K150', notes: 'e.g., Posters, flyers' } },
                          { category: 'Total Expenditure', amount: 0, notes: '', tooltips: { amount: 'e.g., K1,250', notes: '' } },
                      ],
                  },
                   { id: 'balanceForward', label: 'Balance Carried Forward', type: FieldType.NUMBER, tooltip: 'e.g., K100' },
              ],
          },
          { id: 'challenges', title: '7. Challenges & Needs', fields: [{ id: 'challengesNeeds', label: '', type: FieldType.BULLET, tooltip: 'e.g.,\n• Some members not consistent in systematic giving.\n• Need more stewardship education for youth and new believers.' }] },
          { id: 'plans', title: '8. Plans for Next Quarter', fields: [{ id: 'nextQuarterPlans', label: '', type: FieldType.BULLET, tooltip: 'e.g.,\n• Organize Stewardship Week of Revival.\n• Launch family budgeting series.\n• Increase mission offering promotion.' }] },
          { id: 'recommendations', title: '9. Recommendations to Church Board', fields: [{ id: 'recommendationsList', label: '', type: FieldType.BULLET, tooltip: 'e.g.,\n• Approve funds for printing stewardship pledge cards.\n• Encourage Sabbath sermons to integrate stewardship themes once per month.' }] },
          {
              id: 'signatures',
              title: 'Signatures',
              fields: [
                  { id: 'preparedBy', label: 'Prepared by', type: FieldType.SIGNATURE, tooltip: 'e.g.,\nName: Elder Joseph Manoa\nDate: 25/05/2025' },
              ],
          },
      ],
  },
  'womens-ministries': {
      key: 'womens-ministries',
      name: "Women's Ministries Quarterly Report",
      title: "Women's Ministries Quarterly Report",
      sections: [
          {
              id: 'header',
              title: 'Report Header',
              fields: [
                  { id: 'churchName', label: 'Church Name', type: FieldType.TEXT, tooltip: 'e.g., Pomio SDA Church' },
                  { id: 'missionConference', label: 'Mission/Conference', type: FieldType.TEXT, tooltip: 'e.g., New Britain New Ireland Mission' },
                  { id: 'quarterYear', label: 'Quarter/Year', type: FieldType.TEXT, tooltip: 'e.g., Q2 - 2025' },
              ],
          },
          {
              id: 'details',
              title: '1. Department Details',
              fields: [{ id: 'detailsList', label: '', type: FieldType.BULLET, defaultValue: ["Women's Ministries Leader: ", 'Assistant: ', 'Secretary/Treasurer: ', 'Reports To: '], tooltip: "e.g.,\n• Women's Ministries Leader: Sister Janet Moa\n• Assistant: Sister Lydia Tano\n• Secretary/Treasurer: Mary Ipo\n• Reports To: Church Board" }],
          },
          {
              id: 'membership',
              title: '2. Membership & Participation',
              fields: [
                  {
                      id: 'membershipTable',
                      label: '',
                      type: FieldType.TABLE,
                      columns: ['Category', 'Number', 'Notes/Comments'],
                      rows: [
                          { category: 'Total Women in Church', number: 0, notes: '', tooltips: { number: 'e.g., 120', notes: 'e.g., Includes youth and seniors' } },
                          { category: "Registered Women's Ministries Members", number: 0, notes: '', tooltips: { number: 'e.g., 85', notes: 'e.g., Active roster' } },
                          { category: 'Active Participants This Quarter', number: 0, notes: '', tooltips: { number: 'e.g., 72', notes: 'e.g., Engaged in programs' } },
                          { category: 'New Members Involved', number: 0, notes: '', tooltips: { number: 'e.g., 6', notes: 'e.g., Mostly young mothers' } },
                      ],
                  },
              ],
          },
          {
              id: 'programs',
              title: '3. Programs & Activities',
              fields: [
                  {
                      id: 'programsTable',
                      label: '',
                      type: FieldType.TABLE,
                      columns: ['Program/Activity', 'Date(s)', 'Venue/Location', 'Attendance', 'Key Outcomes'],
                      rows: [
                          { program: "Women's Ministries Sabbath", date: '', venue: '', attendance: 0, outcomes: '', tooltips: { date: 'e.g., Apr 20', venue: 'e.g., Ela Beach SDA', attendance: 'e.g., 150', outcomes: 'e.g., Theme: "Women of Prayer"' } },
                          { program: 'Small Group Bible Study', date: '', venue: '', attendance: 0, outcomes: '', tooltips: { date: 'e.g., Weekly', venue: 'e.g., 4 homes', attendance: 'e.g., 45', outcomes: 'e.g., Strengthened faith' } },
                          { program: 'Evangelism Campaign Support', date: '', venue: '', attendance: 0, outcomes: '', tooltips: { date: 'e.g., May 5-12', venue: 'e.g., City Square', attendance: 'e.g., 20 WM members', outcomes: 'e.g., Assisted with music & hospitality' } },
                          { program: "Women's Retreat", date: '', venue: '', attendance: 0, outcomes: '', tooltips: { date: 'e.g., Jun 21-23', venue: 'e.g., Sogeri Camp', attendance: 'e.g., 60', outcomes: 'e.g., Focus on leadership and discipleship' } },
                          { program: 'Family Enrichment Workshop', date: '', venue: '', attendance: 0, outcomes: '', tooltips: { date: 'e.g., Jun 30', venue: 'e.g., Church Hall', attendance: 'e.g., 35 couples', outcomes: 'e.g., Promoted healthy marriages' } },
                      ],
                      hasPhotoUploads: true,
                  },
              ],
          },
          {
              id: 'outreach',
              title: '4. Outreach & Community Service',
              fields: [
                  {
                      id: 'outreachTable',
                      label: '',
                      type: FieldType.TABLE,
                      columns: ['Activity/Project', 'Date(s)', 'Location', 'Beneficiaries/Impact', 'Remarks'],
                      rows: [
                          { activity: 'Food Distribution', date: '', location: '', impact: '', remarks: '', tooltips: { date: 'e.g., Apr 27', location: 'e.g., Village Settlement', impact: 'e.g., 25 families', remarks: 'e.g., Positive feedback' } },
                          { activity: 'Hospital Visit & Care Packages', date: '', location: '', impact: '', remarks: '', tooltips: { date: 'e.g., May 18', location: 'e.g., Port Moresby General', impact: 'e.g., 40 patients', remarks: 'e.g., Encouragement given' } },
                          { activity: 'Clothing Drive', date: '', location: '', impact: '', remarks: '', tooltips: { date: 'e.g., Jun 15', location: 'e.g., Community', impact: 'e.g., 30 households', remarks: 'e.g., Partnership with Dorcas' } },
                      ],
                      hasPhotoUploads: true,
                  },
              ],
          },
          {
              id: 'leadership',
              title: '5. Leadership Development & Training',
              fields: [
                  {
                      id: 'leadershipTable',
                      label: '',
                      type: FieldType.TABLE,
                      columns: ['Training/Workshop', 'Date', 'Facilitator', 'Participants', 'Outcomes'],
                      rows: [
                          { training: 'Leadership & Communication', date: '', facilitator: '', participants: 0, outcomes: '', tooltips: { date: 'e.g., May 25', facilitator: 'e.g., District WM Leader', participants: 'e.g., 22', outcomes: 'e.g., Women trained in leading groups' } },
                      ],
                      hasPhotoUploads: true,
                  },
              ],
          },
          {
              id: 'financial',
              title: '6. Financial Report',
              fields: [
                  {
                      id: 'incomeTable',
                      label: 'Income',
                      type: FieldType.TABLE,
                      columns: ['Income Source', 'Amount', 'Notes'],
                      rows: [
                          { source: 'Offerings/Donations', amount: 0, notes: '', tooltips: { amount: 'e.g., K1,200', notes: 'e.g., Collected during WM Sabbath' } },
                          { source: 'Fundraising Projects', amount: 0, notes: '', tooltips: { amount: 'e.g., K900', notes: 'e.g., Dinner night fundraiser' } },
                          { source: 'Conference Support', amount: 0, notes: '', tooltips: { amount: 'e.g., K400', notes: 'e.g., For retreat' } },
                          { source: 'Total Income', amount: 0, notes: '', tooltips: { amount: 'e.g., K2,500', notes: '' } },
                      ],
                  },
                  {
                      id: 'expenditureTable',
                      label: 'Expenditure',
                      type: FieldType.TABLE,
                      columns: ['Expenditure Category', 'Amount', 'Notes'],
                      rows: [
                          { category: 'Evangelism & Outreach', amount: 0, notes: '', tooltips: { amount: 'e.g., K700', notes: 'e.g., Materials & transport' } },
                          { category: 'Training & Seminars', amount: 0, notes: '', tooltips: { amount: 'e.g., K800', notes: 'e.g., Retreat costs' } },
                          { category: 'Community Service Projects', amount: 0, notes: '', tooltips: { amount: 'e.g., K600', notes: 'e.g., Food & hospital packages' } },
                          { category: 'Other (Stationery, printing)', amount: 0, notes: '', tooltips: { amount: 'e.g., K200', notes: 'e.g., Flyers, records' } },
                          { category: 'Total Expenditure', amount: 0, notes: '', tooltips: { amount: 'e.g., K2,300', notes: '' } },
                      ],
                  },
                   { id: 'balanceForward', label: 'Balance Carried Forward', type: FieldType.NUMBER, tooltip: 'e.g., K200' },
              ],
          },
          { id: 'challenges', title: '7. Challenges & Needs', fields: [{ id: 'challengesNeeds', label: '', type: FieldType.BULLET, tooltip: 'e.g.,\n• Limited transport for outreach activities.\n• Need for more involvement from younger women.' }] },
          { id: 'plans', title: '8. Plans for Next Quarter', fields: [{ id: 'nextQuarterPlans', label: '', type: FieldType.BULLET, tooltip: "e.g.,\n• Organize district-wide Women's Sabbath.\n• Launch mentorship program for young women.\n• Conduct cooking & skills workshop for community outreach." }] },
          { id: 'recommendations', title: '9. Recommendations to Church Board', fields: [{ id: 'recommendationsList', label: '', type: FieldType.BULLET, tooltip: 'e.g.,\n• Approve K300 for transport subsidy.\n• Encourage pastors/elders to include women in Sabbath preaching schedules.' }] },
          {
              id: 'signatures',
              title: 'Signatures',
              fields: [
                  { id: 'preparedBy', label: 'Prepared by', type: FieldType.SIGNATURE, tooltip: 'e.g.,\nName: Sister Janet Moa\nDate: 31/06/2025' },
              ],
          },
      ],
  },
  'youth-ministries': {
      key: 'youth-ministries',
      name: "Adventist Youth Ministries (Young Adults) Report",
      title: "Adventist Youth Ministries (Young Adults) Quarterly Report",
      sections: [
          {
              id: 'header',
              title: 'Report Header',
              fields: [
                  { id: 'churchName', label: 'Church Name', type: FieldType.TEXT, tooltip: 'e.g., Korobosea SDA Church' },
                  { id: 'missionConference', label: 'Mission/Conference', type: FieldType.TEXT, tooltip: 'e.g., Central Papua Conference' },
                  { id: 'quarterYear', label: 'Quarter/Year', type: FieldType.TEXT, tooltip: 'e.g., Q2 - 2025' },
              ],
          },
          {
              id: 'details',
              title: '1. Department Details',
              fields: [{ id: 'detailsList', label: '', type: FieldType.BULLET, defaultValue: ['AYM Leader: ', 'Young Adults Coordinator: ', 'Assistant: ', 'Secretary/Treasurer: ', 'Reports To: '], tooltip: 'e.g.,\n• AYM Leader: Brother David Kila\n• Young Adults Coordinator: Sister Helen Wagi\n• Assistant: Brother Tony Sape\n• Secretary/Treasurer: Maria Tau\n• Reports To: Church Board' }],
          },
          {
              id: 'membership',
              title: '2. Membership & Participation',
              fields: [
                  {
                      id: 'membershipTable',
                      label: '',
                      type: FieldType.TABLE,
                      columns: ['Category', 'Number', 'Notes/Comments'],
                      rows: [
                          { category: 'Total Young Adults in Church', number: 0, notes: '', tooltips: { number: 'e.g., 85', notes: 'e.g., Ages 21-35' } },
                          { category: 'Registered Members', number: 0, notes: '', tooltips: { number: 'e.g., 60', notes: 'e.g., Core group' } },
                          { category: 'Active Participants This Quarter', number: 0, notes: '', tooltips: { number: 'e.g., 48', notes: 'e.g., Regular in programs' } },
                          { category: 'New Members Involved', number: 0, notes: '', tooltips: { number: 'e.g., 5', notes: 'e.g., Recent baptism' } },
                      ],
                  },
              ],
          },
          {
              id: 'spiritual',
              title: '3. Spiritual Nurture & Fellowship',
              fields: [
                  {
                      id: 'spiritualTable',
                      label: '',
                      type: FieldType.TABLE,
                      columns: ['Program/Activity', 'Date(s)', 'Venue/Location', 'Attendance', 'Outcomes'],
                      rows: [
                          { program: 'Young Adult Sabbath', date: '', venue: '', attendance: 0, outcomes: '', tooltips: { date: 'e.g., Apr 20', venue: 'e.g., KSDAC', attendance: 'e.g., 120', outcomes: 'e.g., Theme: "Anchored in Christ"' } },
                          { program: 'Bible Study Fellowship', date: '', venue: '', attendance: 0, outcomes: '', tooltips: { date: 'e.g., Weekly', venue: 'e.g., 4 homes', attendance: 'e.g., 35', outcomes: 'e.g., Good engagement' } },
                          { program: 'Prayer Retreat', date: '', venue: '', attendance: 0, outcomes: '', tooltips: { date: 'e.g., May 24-26', venue: 'e.g., Sogeri Campsite', attendance: 'e.g., 42', outcomes: 'e.g., Spiritual revival testimonies' } },
                          { program: 'Social Night', date: '', venue: '', attendance: 0, outcomes: '', tooltips: { date: 'e.g., Jun 8', venue: 'e.g., Church Hall', attendance: 'e.g., 55', outcomes: 'e.g., Promoted unity' } },
                      ],
                      hasPhotoUploads: true,
                  },
              ],
          },
          {
              id: 'evangelism',
              title: '4. Evangelism & Outreach',
              fields: [
                  {
                      id: 'evangelismTable',
                      label: '',
                      type: FieldType.TABLE,
                      columns: ['Activity/Project', 'Date(s)', 'Location', 'Beneficiaries/Impact', 'Remarks'],
                      rows: [
                          { activity: 'Evangelism Support', date: '', location: '', impact: '', remarks: '', tooltips: { date: 'e.g., May 5-12', location: 'e.g., Town Crusade', impact: 'e.g., 12 YA involved, 8 decisions', remarks: 'e.g., Youth-led singing' } },
                          { activity: 'Hospital Visit', date: '', location: '', impact: '', remarks: '', tooltips: { date: 'e.g., Jun 14', location: 'e.g., Port Moresby General', impact: 'e.g., 30 patients encouraged', remarks: 'e.g., Shared tracts' } },
                          { activity: 'Literature Distribution', date: '', location: '', impact: '', remarks: '', tooltips: { date: 'e.g., Ongoing', location: 'e.g., Boroko Market', impact: 'e.g., 150 tracts shared', remarks: 'e.g., Planned follow-up' } },
                          { activity: 'Digital Evangelism', date: '', location: '', impact: '', remarks: '', tooltips: { date: 'e.g., Apr-Jun', location: 'e.g., Facebook/WhatsApp', impact: 'e.g., 20 Bible study requests', remarks: 'e.g., Managed by YA media team' } },
                      ],
                      hasPhotoUploads: true,
                  },
              ],
          },
          {
              id: 'training',
              title: '5. Training & Leadership Development',
              fields: [
                  {
                      id: 'trainingTable',
                      label: '',
                      type: FieldType.TABLE,
                      columns: ['Training/Workshop', 'Date', 'Facilitator', 'Participants', 'Key Outcomes'],
                      rows: [
                          { training: '"Leading Small Groups"', date: '', facilitator: '', participants: 0, outcomes: '', tooltips: { date: 'e.g., Apr 28', facilitator: 'e.g., District AYM Leader', participants: 'e.g., 18', outcomes: 'e.g., Better group facilitators' } },
                      ],
                      hasPhotoUploads: true,
                  },
              ],
          },
          {
              id: 'financial',
              title: '6. Financial Report',
              fields: [
                  {
                      id: 'incomeTable',
                      label: 'Income',
                      type: FieldType.TABLE,
                      columns: ['Income Source', 'Amount', 'Notes'],
                      rows: [
                          { source: 'Offerings/Donations', amount: 0, notes: '', tooltips: { amount: 'e.g., K1,000', notes: 'e.g., Weekly AY collections' } },
                          { source: 'Fundraising Projects', amount: 0, notes: '', tooltips: { amount: 'e.g., K750', notes: 'e.g., Dinner night' } },
                          { source: 'Conference/District Support', amount: 0, notes: '', tooltips: { amount: 'e.g., K500', notes: 'e.g., Retreat subsidy' } },
                          { source: 'Total Income', amount: 0, notes: '', tooltips: { amount: 'e.g., K2,250', notes: '' } },
                      ],
                  },
                  {
                      id: 'expenditureTable',
                      label: 'Expenditure',
                      type: FieldType.TABLE,
                      columns: ['Expenditure Category', 'Amount', 'Notes'],
                      rows: [
                          { category: 'Evangelism & Outreach', amount: 0, notes: '', tooltips: { amount: 'e.g., K800', notes: 'e.g., Tracts, transport' } },
                          { category: 'Retreats/Fellowship Programs', amount: 0, notes: '', tooltips: { amount: 'e.g., K900', notes: 'e.g., Camp fees' } },
                          { category: 'Training & Leadership Dev.', amount: 0, notes: '', tooltips: { amount: 'e.g., K350', notes: 'e.g., Workshop' } },
                          { category: 'Other (Stationery, printing)', amount: 0, notes: '', tooltips: { amount: 'e.g., K100', notes: 'e.g., Forms, flyers' } },
                          { category: 'Total Expenditure', amount: 0, notes: '', tooltips: { amount: 'e.g., K2,150', notes: '' } },
                      ],
                  },
                   { id: 'balanceForward', label: 'Balance Carried Forward', type: FieldType.NUMBER, tooltip: 'e.g., K100' },
              ],
          },
          { id: 'challenges', title: '7. Challenges & Needs', fields: [{ id: 'challengesNeeds', label: '', type: FieldType.BULLET, tooltip: 'e.g.,\n• Some young adults still disengaged due to work commitments.\n• Need more media equipment for digital evangelism.' }] },
          { id: 'plans', title: '8. Plans for Next Quarter', fields: [{ id: 'nextQuarterPlans', label: '', type: FieldType.BULLET, tooltip: 'e.g.,\n• Launch podcast ministry for young adults.\n• Organize district-wide young adult rally.\n• Expand hospital ministry with care packages.' }] },
          { id: 'recommendations', title: '9. Recommendations to Church Board', fields: [{ id: 'recommendationsList', label: '', type: FieldType.BULLET, tooltip: 'e.g.,\n• Approve purchase of projector & microphone set (K600).\n• Encourage integration of young adults in Sabbath service leadership.' }] },
          {
              id: 'signatures',
              title: 'Signatures',
              fields: [
                  { id: 'preparedBy', label: 'Prepared by', type: FieldType.SIGNATURE, tooltip: 'e.g.,\nName: Brother David Kila\nDate: 31/06/2025' },
              ],
          },
      ],
  },
  'pcm': {
      key: 'pcm',
      name: "Public Campus Ministries (PCM) Quarterly Report",
      title: "Public Campus Ministries (PCM) Quarterly Report",
      sections: [
          {
              id: 'header',
              title: 'Report Header',
              fields: [
                  { id: 'churchName', label: 'Church Name', type: FieldType.TEXT, tooltip: 'e.g., University SDA Church' },
                  { id: 'missionConference', label: 'Mission/Conference', type: FieldType.TEXT, tooltip: 'e.g., Central Papua Conference' },
                  { id: 'quarterYear', label: 'Quarter/Year', type: FieldType.TEXT, tooltip: 'e.g., Q2 - 2025' },
              ],
          },
          {
              id: 'details',
              title: '1. Department Details',
              fields: [{ id: 'detailsList', label: '', type: FieldType.BULLET, defaultValue: ['PCM Leader/Coordinator: ', 'Assistant(s): ', 'Secretary/Treasurer: ', 'Reports To: '], tooltip: 'e.g.,\n• PCM Leader/Coordinator: Brother Michael Wari\n• Assistant(s): Sister Julie Peni\n• Secretary/Treasurer: Samuel Epa\n• Reports To: Church Board / Personal Ministries' }],
          },
          {
              id: 'membership',
              title: '2. Membership & Participation',
              fields: [
                  {
                      id: 'membershipTable',
                      label: '',
                      type: FieldType.TABLE,
                      columns: ['Category', 'Number', 'Notes/Comments'],
                      rows: [
                          { category: 'Adventist Students on Campus', number: 0, notes: '', tooltips: { number: 'e.g., 85', notes: 'e.g., From UPNG & business college' } },
                          { category: 'Active PCM Members', number: 0, notes: '', tooltips: { number: 'e.g., 52', notes: 'e.g., Regular at fellowships' } },
                          { category: 'New Students Reached This Quarter', number: 0, notes: '', tooltips: { number: 'e.g., 12', notes: 'e.g., Mostly first-years' } },
                          { category: 'PCM Volunteers (faculty/staff/support)', number: 0, notes: '', tooltips: { number: 'e.g., 4', notes: 'e.g., Assist in mentoring' } },
                      ],
                  },
              ],
          },
          {
              id: 'spiritual',
              title: '3. Spiritual Nurture & Fellowship',
              fields: [
                  {
                      id: 'spiritualTable',
                      label: '',
                      type: FieldType.TABLE,
                      columns: ['Program/Activity', 'Date(s)', 'Venue/Location', 'Attendance', 'Outcomes'],
                      rows: [
                          { program: 'Campus Fellowship/Worship', date: '', venue: '', attendance: '', outcomes: '', tooltips: { date: 'e.g., Weekly Fri', venue: 'e.g., Lecture Room B', attendance: 'e.g., 45 avg', outcomes: 'e.g., Strong student-led worship' } },
                          { program: 'Bible Study Groups', date: '', venue: '', attendance: '', outcomes: '', tooltips: { date: 'e.g., Apr-Jun', venue: 'e.g., 3 dorm rooms', attendance: 'e.g., 28', outcomes: 'e.g., Students engaged in SOP studies' } },
                          { program: 'Prayer Retreat', date: '', venue: '', attendance: '', outcomes: '', tooltips: { date: 'e.g., Jun 14-15', venue: 'e.g., Sogeri Campsite', attendance: 'e.g., 38', outcomes: 'e.g., Revival experience' } },
                          { program: 'Mentorship Circles', date: '', venue: '', attendance: '', outcomes: '', tooltips: { date: 'e.g., Ongoing', venue: 'e.g., Online Zoom', attendance: 'e.g., 12 pairs', outcomes: 'e.g., Improved spiritual guidance' } },
                      ],
                      hasPhotoUploads: true,
                  },
              ],
          },
          {
              id: 'evangelism',
              title: '4. Evangelism & Outreach',
              fields: [
                  {
                      id: 'evangelismTable',
                      label: '',
                      type: FieldType.TABLE,
                      columns: ['Activity/Project', 'Date(s)', 'Location', 'Beneficiaries/Impact', 'Remarks'],
                      rows: [
                          { activity: 'Literature Distribution', date: '', location: '', impact: '', remarks: '', tooltips: { date: 'e.g., Apr 20', location: 'e.g., UPNG Campus', impact: 'e.g., 200 tracts given', remarks: 'e.g., Positive response' } },
                          { activity: 'Campus Evangelistic Series', date: '', location: '', impact: '', remarks: '', tooltips: { date: 'e.g., May 10-17', location: 'e.g., Lecture Theatre', impact: 'e.g., 60 nightly, 10 decisions', remarks: 'e.g., Led by youth' } },
                          { activity: 'Health Awareness Expo', date: '', location: '', impact: '', remarks: '', tooltips: { date: 'e.g., Jun 8', location: 'e.g., Campus Grounds', impact: 'e.g., 120 students', remarks: 'e.g., Involved Adventist doctors' } },
                          { activity: 'Clean-Up Campaign', date: '', location: '', impact: '', remarks: '', tooltips: { date: 'e.g., May 25', location: 'e.g., University area', impact: 'e.g., 50 volunteers', remarks: 'e.g., Built goodwill' } },
                      ],
                      hasPhotoUploads: true,
                  },
              ],
          },
          {
              id: 'partnerships',
              title: '5. Collaboration & Partnerships',
              fields: [
                  {
                      id: 'partnershipsTable',
                      label: '',
                      type: FieldType.TABLE,
                      columns: ['Partner/Organization', 'Nature of Collaboration', 'Outcomes'],
                      rows: [
                          { partner: 'Adventist Medical Fellowship', collaboration: '', outcomes: '', tooltips: { collaboration: 'e.g., Health expo support', outcomes: 'e.g., 5 doctors volunteered' } },
                          { partner: 'Dorcas/ACS', collaboration: '', outcomes: '', tooltips: { collaboration: 'e.g., Shared food at retreat', outcomes: 'e.g., Reduced costs' } },
                      ],
                  },
              ],
          },
          {
              id: 'training',
              title: '6. Training & Leadership Development',
              fields: [
                  {
                      id: 'trainingTable',
                      label: '',
                      type: FieldType.TABLE,
                      columns: ['Training/Workshop', 'Date', 'Facilitator', 'Participants', 'Key Outcomes'],
                      rows: [
                          { training: 'Campus Leadership Skills', date: '', facilitator: '', participants: 0, outcomes: '', tooltips: { date: 'e.g., Apr 27', facilitator: 'e.g., District PCM Leader', participants: 'e.g., 20', outcomes: 'e.g., Students empowered for mission' } },
                      ],
                      hasPhotoUploads: true,
                  },
              ],
          },
          {
              id: 'financial',
              title: '7. Financial Report',
              fields: [
                  {
                      id: 'incomeTable',
                      label: 'Income',
                      type: FieldType.TABLE,
                      columns: ['Income Source', 'Amount', 'Notes'],
                      rows: [
                          { source: 'Offerings/Donations', amount: 0, notes: '', tooltips: { amount: 'e.g., K1,000', notes: 'e.g., Weekly collections' } },
                          { source: 'Fundraising Projects', amount: 0, notes: '', tooltips: { amount: 'e.g., K600', notes: 'e.g., Car wash, dinner night' } },
                          { source: 'Conference/District Support', amount: 0, notes: '', tooltips: { amount: 'e.g., K500', notes: 'e.g., Subsidy for retreat' } },
                          { source: 'Total Income', amount: 0, notes: '', tooltips: { amount: 'e.g., K2,100', notes: '' } },
                      ],
                  },
                  {
                      id: 'expenditureTable',
                      label: 'Expenditure',
                      type: FieldType.TABLE,
                      columns: ['Expenditure Category', 'Amount', 'Notes'],
                      rows: [
                          { category: 'Evangelism & Outreach', amount: 0, notes: '', tooltips: { amount: 'e.g., K900', notes: 'e.g., Literature, campaign' } },
                          { category: 'Fellowship/Programs', amount: 0, notes: '', tooltips: { amount: 'e.g., K700', notes: 'e.g., Retreat, weekly meals' } },
                          { category: 'Training/Leadership', amount: 0, notes: '', tooltips: { amount: 'e.g., K350', notes: 'e.g., Workshop' } },
                          { category: 'Other (Stationery)', amount: 0, notes: '', tooltips: { amount: 'e.g., K100', notes: 'e.g., Forms, flyers' } },
                          { category: 'Total Expenditure', amount: 0, notes: '', tooltips: { amount: 'e.g., K2,050', notes: '' } },
                      ],
                  },
                   { id: 'balanceForward', label: 'Balance Carried Forward', type: FieldType.NUMBER, tooltip: 'e.g., K50' },
              ],
          },
          { id: 'challenges', title: '8. Challenges & Needs', fields: [{ id: 'challengesNeeds', label: '', type: FieldType.BULLET, tooltip: 'e.g.,\n• Lack of permanent venue for fellowships on campus.\n• Need more mentors for first-year students.' }] },
          { id: 'plans', title: '9. Plans for Next Quarter', fields: [{ id: 'nextQuarterPlans', label: '', type: FieldType.BULLET, tooltip: 'e.g.,\n• Organize PCM Sabbath with church-wide support.\n• Expand digital evangelism through podcasts.\n• Launch mentoring program for 20 new freshmen.' }] },
          { id: 'recommendations', title: '10. Recommendations to Church Board', fields: [{ id: 'recommendationsList', label: '', type: FieldType.BULLET, tooltip: 'e.g.,\n• Allocate funds for purchase of projector (K500).\n• Approve transport subsidy for off-campus activities.' }] },
          {
              id: 'signatures',
              title: 'Signatures',
              fields: [
                  { id: 'preparedBy', label: 'Prepared by', type: FieldType.SIGNATURE, tooltip: 'e.g.,\nName: Brother Michael Wari\nDate: 13/09/2025' },
              ],
          },
      ],
  },
  'ambassador-ministry': {
      key: 'ambassador-ministry',
      name: "Ambassador Ministry Quarterly Report",
      title: "Ambassador Ministry Quarterly Report",
      sections: [
          {
              id: 'header',
              title: 'Report Header',
              fields: [
                  { id: 'churchName', label: 'Church Name', type: FieldType.TEXT, tooltip: 'e.g., Warakum SDA Church' },
                  { id: 'missionConference', label: 'Mission/Conference', type: FieldType.TEXT, tooltip: 'e.g., Western Highlands Mission' },
                  { id: 'quarterYear', label: 'Quarter/Year', type: FieldType.TEXT, tooltip: 'e.g., Q2 - 2025' },
              ],
          },
          {
              id: 'details',
              title: '1. Department Details',
              fields: [{ id: 'detailsList', label: '', type: FieldType.BULLET, defaultValue: ['Ambassador Leader/Coordinator: ', 'Assistant(s): ', 'Secretary/Treasurer: ', 'Reports To: '], tooltip: 'e.g.,\n• Ambassador Leader/Coordinator: Brother Alex Tano\n• Assistant(s): Sister Liona Vagi\n• Secretary/Treasurer: Junior Peter\n• Reports To: AYM Leader / Church Board' }],
          },
          {
              id: 'membership',
              title: '2. Membership & Participation',
              fields: [
                  {
                      id: 'membershipTable',
                      label: '',
                      type: FieldType.TABLE,
                      columns: ['Category', 'Number', 'Notes/Comments'],
                      rows: [
                          { category: 'Total Ambassadors in Church (16–21 yrs)', number: 0, notes: '', tooltips: { number: 'e.g., 40', notes: 'e.g., Includes 12 new high school finishers' } },
                          { category: 'Registered Ambassador Members', number: 0, notes: '', tooltips: { number: 'e.g., 30', notes: 'e.g., Officially enrolled' } },
                          { category: 'Active Participants This Quarter', number: 0, notes: '', tooltips: { number: 'e.g., 25', notes: 'e.g., Regularly attending programs' } },
                          { category: 'New Members Involved', number: 0, notes: '', tooltips: { number: 'e.g., 8', notes: 'e.g., Recent baptism candidates' } },
                      ],
                  },
              ],
          },
          {
              id: 'spiritual',
              title: '3. Spiritual Growth & Fellowship',
              fields: [
                  {
                      id: 'spiritualTable',
                      label: '',
                      type: FieldType.TABLE,
                      columns: ['Program/Activity', 'Date(s)', 'Venue/Location', 'Attendance', 'Key Outcomes'],
                      rows: [
                          { program: 'Ambassador Sabbath', date: '', venue: '', attendance: 0, outcomes: '', tooltips: { date: 'e.g., Apr 27', venue: 'e.g., Koki SDA', attendance: 'e.g., 150', outcomes: 'e.g., Theme: "Stand Firm in Christ"' } },
                          { program: 'Bible Study Class (weekly)', date: '', venue: '', attendance: 0, outcomes: '', tooltips: { date: 'e.g., Apr-Jun', venue: 'e.g., Church youth hall', attendance: 'e.g., 20', outcomes: 'e.g., Completed lessons on Daniel' } },
                          { program: 'Prayer Retreat', date: '', venue: '', attendance: 0, outcomes: '', tooltips: { date: 'e.g., May 18-19', venue: 'e.g., Sogeri Campsite', attendance: 'e.g., 30', outcomes: 'e.g., Spiritual revival & bonding' } },
                          { program: 'Fellowship Night', date: '', venue: '', attendance: 0, outcomes: '', tooltips: { date: 'e.g., Jun 7', venue: 'e.g., Church Hall', attendance: 'e.g., 35', outcomes: 'e.g., Strengthened unity' } },
                      ],
                      hasPhotoUploads: true,
                  },
              ],
          },
          {
              id: 'evangelism',
              title: '4. Evangelism & Outreach',
              fields: [
                  {
                      id: 'evangelismTable',
                      label: '',
                      type: FieldType.TABLE,
                      columns: ['Activity/Project', 'Date(s)', 'Location', 'Beneficiaries/Impact', 'Remarks'],
                      rows: [
                          { activity: 'Street Preaching', date: '', location: '', impact: '', remarks: '', tooltips: { date: 'e.g., Apr 21', location: 'e.g., Koki Market', impact: 'e.g., 200+ reached', remarks: 'e.g., Youth shared testimonies' } },
                          { activity: 'Hospital Visit', date: '', location: '', impact: '', remarks: '', tooltips: { date: 'e.g., May 25', location: 'e.g., PMGH', impact: 'e.g., 45 patients visited', remarks: 'e.g., Prayer & food parcels' } },
                          { activity: 'Literature Distribution', date: '', location: '', impact: '', remarks: '', tooltips: { date: 'e.g., Weekly', location: 'e.g., Community', impact: 'e.g., 300 tracts shared', remarks: 'e.g., Follow-up planned' } },
                          { activity: 'Clean-Up Drive', date: '', location: '', impact: '', remarks: '', tooltips: { date: 'e.g., Jun 15', location: 'e.g., Beachfront area', impact: 'e.g., 40 volunteers', remarks: 'e.g., Community appreciation' } },
                      ],
                      hasPhotoUploads: true,
                  },
              ],
          },
          {
              id: 'leadership',
              title: '5. Leadership & Skill Development',
              fields: [
                  {
                      id: 'leadershipTable',
                      label: '',
                      type: FieldType.TABLE,
                      columns: ['Training/Workshop', 'Date', 'Facilitator', 'Participants', 'Key Outcomes'],
                      rows: [
                          { training: '"Ambassadors in Mission"', date: '', facilitator: '', participants: 0, outcomes: '', tooltips: { date: 'e.g., Apr 30', facilitator: 'e.g., District AYM Leader', participants: 'e.g., 18', outcomes: 'e.g., Learned evangelism skills' } },
                          { training: 'Public Speaking Workshop', date: '', facilitator: '', participants: 0, outcomes: '', tooltips: { date: 'e.g., Jun 2', facilitator: 'e.g., Local Elder', participants: 'e.g., 15', outcomes: 'e.g., Improved confidence' } },
                      ],
                      hasPhotoUploads: true,
                  },
              ],
          },
          {
              id: 'financial',
              title: '6. Financial Report',
              fields: [
                  {
                      id: 'incomeTable',
                      label: 'Income',
                      type: FieldType.TABLE,
                      columns: ['Income Source', 'Amount', 'Notes'],
                      rows: [
                          { source: 'Offerings/Donations', amount: 0, notes: '', tooltips: { amount: 'e.g., K800', notes: 'e.g., Weekly AY contributions' } },
                          { source: 'Fundraising Projects', amount: 0, notes: '', tooltips: { amount: 'e.g., K500', notes: 'e.g., Car wash event' } },
                          { source: 'Conference/District Support', amount: 0, notes: '', tooltips: { amount: 'e.g., K300', notes: 'e.g., Leadership training' } },
                          { source: 'Total Income', amount: 0, notes: '', tooltips: { amount: 'e.g., K1,600', notes: '' } },
                      ],
                  },
                  {
                      id: 'expenditureTable',
                      label: 'Expenditure',
                      type: FieldType.TABLE,
                      columns: ['Expenditure Category', 'Amount', 'Notes'],
                      rows: [
                          { category: 'Evangelism & Outreach', amount: 0, notes: '', tooltips: { amount: 'e.g., K700', notes: 'e.g., Tracts, hospital visit' } },
                          { category: 'Fellowship/Programs', amount: 0, notes: '', tooltips: { amount: 'e.g., K500', notes: 'e.g., Retreat & fellowship' } },
                          { category: 'Training & Leadership Dev.', amount: 0, notes: '', tooltips: { amount: 'e.g., K300', notes: 'e.g., Workshops' } },
                          { category: 'Other (Stationery, printing)', amount: 0, notes: '', tooltips: { amount: 'e.g., K50', notes: 'e.g., Flyers' } },
                          { category: 'Total Expenditure', amount: 0, notes: '', tooltips: { amount: 'e.g., K1,550', notes: '' } },
                      ],
                  },
                   { id: 'balanceForward', label: 'Balance Carried Forward', type: FieldType.NUMBER, tooltip: 'e.g., K50' },
              ],
          },
          { id: 'challenges', title: '7. Challenges & Needs', fields: [{ id: 'challengesNeeds', label: '', type: FieldType.BULLET, tooltip: 'e.g.,\n• Some ambassadors disengaged due to school/work pressures.\n• Lack of transport for outreach activities.' }] },
          { id: 'plans', title: '8. Plans for Next Quarter', fields: [{ id: 'nextQuarterPlans', label: '', type: FieldType.BULLET, tooltip: 'e.g.,\n• Launch Ambassadors for Christ youth evangelism week.\n• Train 10 ambassadors in digital evangelism.\n• Organize district-level Ambassador rally.' }] },
          { id: 'recommendations', title: '9. Recommendations to Church Board', fields: [{ id: 'recommendationsList', label: '', type: FieldType.BULLET, tooltip: 'e.g.,\n• Approve transport subsidy (K400).\n• Provide projector for ambassador-led evangelism programs.' }] },
          {
              id: 'signatures',
              title: 'Signatures',
              fields: [
                  { id: 'preparedBy', label: 'Prepared by', type: FieldType.SIGNATURE, tooltip: 'e.g.,\nName: Brother Alex Tano\nDate: 03/09/2024' },
              ],
          },
      ],
  },
  'adventurer-club': {
      key: 'adventurer-club',
      name: "Adventurer Club Quarterly Report",
      title: "Adventurer Club Quarterly Report",
      sections: [
          {
              id: 'generalInfo',
              title: 'Section 1: General Information',
              fields: [
                  {
                      id: 'infoTable', label: '', type: FieldType.TABLE, columns: ['Field', 'Details'], editableFirstColumn: false,
                      rows: [
                          { field: 'Mission/Conference', details: '', tooltips: { details: 'e.g., Madang Manus Mission' } },
                          { field: 'Church Name', details: '', tooltips: { details: 'e.g., Lorengau SDA Church' } },
                          { field: 'Quarter/Year', details: '', tooltips: { details: 'e.g., Q2 - 2025' } },
                          { field: 'Adventurer Club Name', details: '', tooltips: { details: 'e.g., Bethel Little Lights Adventurer Club' } },
                          { field: 'Club Director', details: '', tooltips: { details: 'e.g., Sister Mary John' } },
                          { field: 'Deputy Directors', details: '', tooltips: { details: 'e.g., Bro. Peter Paul, Sis. Lillian Saka' } },
                          { field: 'Number of Adventurers Enrolled', details: 0, tooltips: { details: 'e.g., 28' } },
                          { field: 'Number of Parents/Staff Involved', details: 0, tooltips: { details: 'e.g., 12' } },
                          { field: 'Prepared By', details: '', tooltips: { details: 'e.g., Mary John' } },
                          { field: 'Date Submitted', details: '', tooltips: { details: 'e.g., 30 June 2025' } },
                      ]
                  }
              ]
          },
          {
              id: 'membership',
              title: 'Section 2: Membership Report',
              fields: [
                  {
                      id: 'membershipTable', label: '', type: FieldType.TABLE, columns: ['Item', 'Number'], editableFirstColumn: false,
                      rows: [
                          { item: 'Total Members Last Quarter', number: 0, tooltips: { number: 'e.g., 25' } },
                          { item: 'New Members Enrolled', number: 0, tooltips: { number: 'e.g., 3' } },
                          { item: 'Members Transferred In', number: 0, tooltips: { number: 'e.g., 0' } },
                          { item: 'Members Transferred Out', number: 0, tooltips: { number: 'e.g., 0' } },
                          { item: 'Inactive/Dropped Members', number: 0, tooltips: { number: 'e.g., 0' } },
                          { item: 'Current Active Membership', number: 0, tooltips: { number: 'e.g., 28' } },
                      ]
                  }
              ]
          },
          {
              id: 'programActivities',
              title: 'Section 3: Club Program & Activities',
              fields: [
                  {
                      id: 'activitiesTable',
                      label: '',
                      type: FieldType.TABLE,
                      columns: ['Activity Type', 'Number Held', 'Attendance', 'Remarks'],
                      rows: [
                          { activity: 'Spiritual Programs (devotionals, Bible lessons)', number: 0, attendance: '', remarks: '', tooltips: { number: 'e.g., 12', attendance: 'e.g., Avg. 25 Adventurers', remarks: 'e.g., Weekly meetings included singing, memory verses, and Bible lessons' } },
                          { activity: 'Family-Based Activities', number: 0, attendance: '', remarks: '', tooltips: { number: 'e.g., 2', attendance: 'e.g., 20 families', remarks: "e.g., Family fun day and parents' training workshop" } },
                          { activity: 'Nature/Outdoor Activities', number: 0, attendance: '', remarks: '', tooltips: { number: 'e.g., 1', attendance: 'e.g., 27 Adventurers', remarks: 'e.g., Half-day nature walk, children learned about plants and insects' } },
                          { activity: 'Health & Skills Development', number: 0, attendance: '', remarks: '', tooltips: { number: 'e.g., 3', attendance: 'e.g., Avg. 23 Adventurers', remarks: 'e.g., Taught hygiene, first aid basics, and healthy eating' } },
                          { activity: 'Service Projects', number: 0, attendance: '', remarks: '', tooltips: { number: 'e.g., 1', attendance: 'e.g., 18 Adventurers + 8 parents', remarks: 'e.g., Visited elderly members, cleaned yards, and sang songs' } },
                          { activity: 'Social/Fellowship Activities', number: 0, attendance: '', remarks: '', tooltips: { number: 'e.g., 1', attendance: 'e.g., 30 participants', remarks: 'e.g., Club picnic with parents' } },
                          { activity: 'Other Activities', number: 0, attendance: '', remarks: '', tooltips: { number: 'e.g., 0', attendance: '', remarks: '' } },
                      ],
                      hasPhotoUploads: true,
                  },
              ],
          },
          {
              id: 'outreach',
              title: 'Section 4: Outreach & Mission',
              fields: [
                  {
                      id: 'outreachTable',
                      label: '',
                      type: FieldType.TABLE,
                      columns: ['Outreach Activity', 'Date', 'Participation', 'Impact/Remarks'],
                      rows: [
                          { activity: 'Community Service Project – Elderly Visitation', date: '', participation: '', impact: '', tooltips: { date: 'e.g., 14 May 2025', participation: 'e.g., 26 participants', impact: "e.g., Strengthened children's compassion and church-community connection" } },
                          { activity: "Church Involvement - Children's Sabbath", date: '', participation: '', impact: '', tooltips: { date: 'e.g., 25 May 2025', participation: 'e.g., All Adventurers', impact: 'e.g., Children led divine service and afternoon program' } },
                          { activity: 'Family/Neighbourhood Outreach', date: '', participation: '', impact: '', tooltips: { date: 'e.g., Ongoing', participation: 'e.g., Parents & children', impact: 'e.g., Families visited neighbours together, shared Bible stories' } },
                      ],
                      hasPhotoUploads: true,
                  },
              ],
          },
          {
              id: 'trainingAchievement',
              title: 'Section 5: Training & Achievement',
              fields: [
                  {
                      id: 'achievementTable',
                      label: '',
                      type: FieldType.TABLE,
                      columns: ['Category', 'Details'],
                      editableFirstColumn: false,
                      rows: [
                          { category: 'Awards Earned (Stars, Chips, Awards)', details: '', tooltips: { details: 'e.g., 10 Adventurers earned Busy Bee Awards, 5 earned Sunbeam Awards' } },
                          { category: 'Parent Workshops Conducted', details: '', tooltips: { details: 'e.g., 1 (topic: "Raising Adventurers in the Faith")' } },
                          { category: 'Staff Training Conducted', details: '', tooltips: { details: 'e.g., 1 staff orientation with 12 staff present' } },
                          { category: 'Investitures Planned/Held', details: '', tooltips: { details: 'e.g., Investiture planned for Q3' } },
                      ],
                      hasPhotoUploads: true,
                  },
              ],
          },
          {
              id: 'financial',
              title: 'Section 6: Financial Acquittals',
              fields: [
                  {
                      id: 'financialTable', label: '', type: FieldType.TABLE, columns: ['Item/Activity', 'Budget Approved', 'Amount Spent', 'Balance', 'Remarks'],
                      rows: [
                          { item: 'Uniforms & Insignia', budget: 0, spent: 0, balance: 0, remarks: '', tooltips: { budget: 'e.g., K500', spent: 'e.g., K480', balance: 'e.g., K20', remarks: 'e.g., 5 new uniforms purchased' } },
                          { item: 'Program Materials & Supplies', budget: 0, spent: 0, balance: 0, remarks: '', tooltips: { budget: 'e.g., K300', spent: 'e.g., K280', balance: 'e.g., K20', remarks: 'e.g., Bible story books and activity sheets' } },
                          { item: 'Family Fellowship Activities', budget: 0, spent: 0, balance: 0, remarks: '', tooltips: { budget: 'e.g., K200', spent: 'e.g., K190', balance: 'e.g., K10', remarks: 'e.g., Family fun day food & logistics' } },
                          { item: 'Outings/Field Trips', budget: 0, spent: 0, balance: 0, remarks: '', tooltips: { budget: 'e.g., K400', spent: 'e.g., K380', balance: 'e.g., K20', remarks: 'e.g., Nature walk & transport' } },
                          { item: 'Other (specify)', budget: 0, spent: 0, balance: 0, remarks: '', tooltips: { budget: '', spent: '', balance: '', remarks: '' } },
                          { item: 'TOTAL', budget: 0, spent: 0, balance: 0, remarks: '', tooltips: { budget: 'e.g., K1,400', spent: 'e.g., K1,330', balance: 'e.g., K70', remarks: 'e.g., All acquitted' } },
                      ]
                  }
              ]
          },
          { id: 'challenges', title: 'Section 7: Challenges & Needs', fields: [{ id: 'challengesNeeds', label: '', type: FieldType.BULLET, tooltip: 'e.g.,\n• Need more parental involvement in regular meetings.\n• Limited funds for outdoor activities.\n• Some children struggle with regular attendance due to distance.' }] },
          { id: 'goals', title: 'Section 8: Goals & Recommendations', fields: [{ id: 'goalsRecs', label: '', type: FieldType.BULLET, tooltip: 'e.g.,\n• Plan for Adventurer Investiture in Q3.\n• Strengthen parental workshops to improve engagement.\n• Request additional budget for community outreach projects.' }] },
          {
              id: 'signatures',
              title: 'Signatures',
              fields: [
                  { id: 'preparedBy', label: 'Prepared by', type: FieldType.SIGNATURE, tooltip: 'e.g.,\nName: Mary John\nDate: 30 June 2025' },
              ],
          },
      ],
  },
  'deacons': {
      key: 'deacons',
      name: "Deacons' Department Quarterly Report",
      title: "Deacons' Department Quarterly Report",
      sections: [
          {
              id: 'generalInfo',
              title: 'Section 1: General Information',
              fields: [
                  {
                      id: 'infoTable', label: '', type: FieldType.TABLE, columns: ['Field', 'Details'], editableFirstColumn: false,
                      rows: [
                          { field: 'Mission/Conference', details: '', tooltips: { details: 'e.g., Morobe Mission' } },
                          { field: 'Church Name', details: '', tooltips: { details: 'e.g., Kabob SDA Church' } },
                          { field: 'Quarter/Year', details: '', tooltips: { details: 'e.g., Q2 - 2025' } },
                          { field: 'Head Deacon', details: '', tooltips: { details: 'e.g., Brother John Kila' } },
                          { field: 'Assistant Head Deacon', details: '', tooltips: { details: 'e.g., Jonah Pingi' } },
                          { field: 'Number of Deacons Serving', details: 0, tooltips: { details: 'e.g., 7' } },
                          { field: 'Prepared By', details: '', tooltips: { details: 'e.g., John Kila' } },
                          { field: 'Date Submitted', details: '', tooltips: { details: 'e.g., 30 June 2025' } },
                      ]
                  }
              ]
          },
          {
              id: 'worship',
              title: 'Section 2: Worship & Ordinances',
              fields: [
                  {
                      id: 'worshipTable', label: '', type: FieldType.TABLE, columns: ['Activity', 'Number/Details'], editableFirstColumn: false,
                      rows: [
                          { activity: 'Communion Services Assisted', details: '', tooltips: { details: 'e.g., 1 – Prepared tables, assisted pastor, washed utensils' } },
                          { activity: 'Baptismal Services Assisted', details: '', tooltips: { details: 'e.g., 2 - Prepared gowns, pool, assisted candidates' } },
                          { activity: 'Funeral Services Assisted', details: '', tooltips: { details: 'e.g., 3 – Helped with logistics and order' } },
                          { activity: 'Sabbath Worship Support', details: '', tooltips: { details: 'e.g., 12 Sabbaths - ushering, offering collection, seating' } },
                          { activity: 'Other Worship-Related Duties', details: '', tooltips: { details: 'e.g., Supported AY rally at district level' } },
                      ]
                  }
              ]
          },
          {
              id: 'maintenance',
              title: 'Section 3: Church Property & Maintenance',
              fields: [
                  {
                      id: 'maintenanceTable', label: '', type: FieldType.TABLE, columns: ['Item', 'Details/Notes'], editableFirstColumn: false,
                      rows: [
                          { item: 'Cleaning & Upkeep of Sanctuary', details: '', tooltips: { details: 'e.g., Weekly roster, all deacons participated' } },
                          { item: 'Grounds & Property Care', details: '', tooltips: { details: 'e.g., Cut grass and cleaned yard twice' } },
                          { item: 'Repairs/Small Maintenance', details: '', tooltips: { details: 'e.g., Fixed leaking roof, replaced 4 bulbs' } },
                          { item: 'Security & Order', details: '', tooltips: { details: 'e.g., 2 deacons rostered each Sabbath' } },
                          { item: 'Other Duties', details: '', tooltips: { details: 'e.g., Helped arrange chairs for big church wedding' } },
                      ],
                       hasPhotoUploads: true,
                  }
              ]
          },
          {
              id: 'visitation',
              title: 'Section 4: Visitation & Welfare Support',
              fields: [
                  {
                      id: 'visitationTable', label: '', type: FieldType.TABLE, columns: ['Activity', 'Number/Details'], editableFirstColumn: false,
                      rows: [
                          { activity: 'Visitation of Sick/Needy', details: '', tooltips: { details: 'e.g., 6 homes visited, prayed with families' } },
                          { activity: 'Support for Widows & Orphans', details: '', tooltips: { details: 'e.g., Gave food parcels to 3 widows' } },
                          { activity: 'Distribution of Aid', details: '', tooltips: { details: 'e.g., Assisted Community Services dept. with clothing distribution' } },
                          { activity: 'Assistance to Members in Need', details: '', tooltips: { details: 'e.g., Helped one family with transport for funeral' } },
                          { activity: 'Other Acts of Service', details: '', tooltips: { details: 'e.g., Assisted deaconesses during hospital visit' } },
                      ],
                      hasPhotoUploads: true,
                  }
              ]
          },
          {
              id: 'financial',
              title: 'Section 5: Financial Acquittals',
              fields: [
                  {
                      id: 'financialTable', label: '', type: FieldType.TABLE, columns: ['Activity/Item', 'Budget Approved', 'Amount Spent', 'Balance', 'Remarks'],
                      rows: [
                          { item: 'Communion Supplies', budget: 0, spent: 0, balance: 0, remarks: '', tooltips: { budget: 'e.g., K200', spent: 'e.g., K180', balance: 'e.g., K20', remarks: 'e.g., Bread, wine, cups' } },
                          { item: 'Baptismal Supplies', budget: 0, spent: 0, balance: 0, remarks: '', tooltips: { budget: 'e.g., K300', spent: 'e.g., K280', balance: 'e.g., K20', remarks: 'e.g., 3 gowns repaired, towels purchased' } },
                          { item: 'Welfare/Visitation Support', budget: 0, spent: 0, balance: 0, remarks: '', tooltips: { budget: 'e.g., K400', spent: 'e.g., K390', balance: 'e.g., K10', remarks: 'e.g., Food parcels, fuel for visitation' } },
                          { item: 'Church Maintenance', budget: 0, spent: 0, balance: 0, remarks: '', tooltips: { budget: 'e.g., K500', spent: 'e.g., K450', balance: 'e.g., K50', remarks: 'e.g., Roof repair & bulbs' } },
                          { item: 'TOTAL', budget: 0, spent: 0, balance: 0, remarks: '', tooltips: { budget: 'e.g., K1,400', spent: 'e.g., K1,300', balance: 'e.g., K100', remarks: 'e.g., All acquitted' } },
                      ]
                  }
              ]
          },
          { id: 'challenges', title: 'Section 6: Challenges & Needs', fields: [{ id: 'challengesNeeds', label: '', type: FieldType.BULLET, tooltip: 'e.g.,\n• Limited transport for funerals and visitations.\n• Need for better storage space for communion/baptismal supplies.\n• More funds needed for ongoing property maintenance.' }] },
          { id: 'goals', title: 'Section 7: Goals & Recommendations', fields: [{ id: 'goalsRecs', label: '', type: FieldType.BULLET, tooltip: 'e.g.,\n• Plan major church clean-up day with members in Q3.\n• Request budget increase for maintenance and welfare.\n• Train younger deacons to improve rotation of duties.' }] },
          {
              id: 'signatures',
              title: 'Signatures',
              fields: [
                  { id: 'preparedBy', label: 'Prepared by', type: FieldType.SIGNATURE, tooltip: 'e.g.,\nName: John Kila\nDate: 30/06/2025' },
              ],
          },
      ],
  },
  'deaconesses': {
      key: 'deaconesses',
      name: "Deaconesses' Department Quarterly Report",
      title: "Deaconesses' Department Quarterly Report",
      sections: [
          {
              id: 'generalInfo',
              title: 'Section 1: General Information',
              fields: [
                  {
                      id: 'infoTable', label: '', type: FieldType.TABLE, columns: ['Field', 'Details'], editableFirstColumn: false,
                      rows: [
                          { field: 'Mission/Conference', details: '', tooltips: { details: 'e.g., Western Highlands Mission' } },
                          { field: 'Church Name', details: '', tooltips: { details: 'e.g., Gateway SDA Church' } },
                          { field: 'Quarter/Year', details: '', tooltips: { details: 'e.g., Q2 - 2025' } },
                          { field: 'Head Deaconess', details: '', tooltips: { details: 'e.g., Jennifer Max' } },
                          { field: 'Assistant Head Deaconess', details: '', tooltips: { details: 'e.g., Lillian Luke' } },
                          { field: 'Number of Deaconesses Serving', details: 0, tooltips: { details: 'e.g., 9' } },
                          { field: 'Prepared By', details: '', tooltips: { details: 'e.g., Jennifer Max' } },
                          { field: 'Date Submitted', details: '', tooltips: { details: 'e.g., 30 June 2025' } },
                      ]
                  }
              ]
          },
          {
              id: 'worship',
              title: 'Section 2: Worship & Ordinances',
              fields: [
                  {
                      id: 'worshipTable', label: '', type: FieldType.TABLE, columns: ['Activity', 'Number/Details'], editableFirstColumn: false,
                      rows: [
                          { activity: 'Communion Services Prepared', details: '', tooltips: { details: 'e.g., 1 - Set up tables, prepared emblems, linens' } },
                          { activity: 'Communion Supplies', details: '', tooltips: { details: 'e.g., K180 spent (bread, grape juice, new tablecloths)' } },
                          { activity: 'Baptismal Services Assisted', details: '', tooltips: { details: 'e.g., 2 - Prepared robes & towels, assisted candidates' } },
                          { activity: 'Funeral Services Assisted', details: '', tooltips: { details: 'e.g., 2 - Supported bereaved families with food and hospitality' } },
                          { activity: 'Other Worship-Related Duties', details: '', tooltips: { details: 'e.g., Assisted with foot-washing arrangement' } },
                      ]
                  }
              ]
          },
          {
              id: 'visitation',
              title: 'Section 3: Visitation & Care',
              fields: [
                  {
                      id: 'visitationTable', label: '', type: FieldType.TABLE, columns: ['Activity', 'Number/Details'], editableFirstColumn: false,
                      rows: [
                          { activity: 'Visitation of Sick/Shut-ins', details: '', tooltips: { details: 'e.g., 5 homes visited, provided prayer & encouragement' } },
                          { activity: 'Support for Bereaved Families', details: '', tooltips: { details: 'e.g., 2 families supported with food parcels & presence' } },
                          { activity: 'Support for Widows/Orphans', details: '', tooltips: { details: 'e.g., 4 widows received weekly check-ins' } },
                          { activity: 'Welfare/Practical Assistance', details: '', tooltips: { details: 'e.g., Provided meals to one family during illness' } },
                          { activity: 'Other Acts of Service', details: '', tooltips: { details: 'e.g., Partnered with Deacons for hospital visit' } },
                      ],
                      hasPhotoUploads: true,
                  }
              ]
          },
          {
              id: 'hospitality',
              title: 'Section 4: Hospitality & Fellowship',
              fields: [
                  {
                      id: 'hospitalityTable', label: '', type: FieldType.TABLE, columns: ['Item', 'Details/Notes'], editableFirstColumn: false,
                      rows: [
                          { item: 'Fellowship Meals Organized', details: '', tooltips: { details: 'e.g., 1 combined fellowship lunch (80 attendees)' } },
                          { item: 'Hospitality for Visitors/Guests', details: '', tooltips: { details: 'e.g., Every Sabbath – 2 deaconesses rostered' } },
                          { item: 'Support for Weddings/Child Dedications', details: '', tooltips: { details: 'e.g., Assisted in 1 wedding and 1 baby dedication' } },
                          { item: 'Other Activities', details: '', tooltips: { details: "e.g., Decorated church for Mother's Day" } },
                      ],
                      hasPhotoUploads: true,
                  }
              ]
          },
          {
              id: 'financial',
              title: 'Section 5: Financial Acquittals',
              fields: [
                  {
                      id: 'financialTable', label: '', type: FieldType.TABLE, columns: ['Activity/Item', 'Budget Approved', 'Amount Spent', 'Balance', 'Remarks'],
                      rows: [
                          { item: 'Communion Supplies', budget: 0, spent: 0, balance: 0, remarks: '', tooltips: { budget: 'e.g., K200', spent: 'e.g., K180', balance: 'e.g., K20', remarks: 'e.g., Bread, juice, linens' } },
                          { item: 'Baptismal Supplies', budget: 0, spent: 0, balance: 0, remarks: '', tooltips: { budget: 'e.g., K250', spent: 'e.g., K240', balance: 'e.g., K10', remarks: 'e.g., Gowns cleaned & repaired' } },
                          { item: 'Welfare/Visitation Support', budget: 0, spent: 0, balance: 0, remarks: '', tooltips: { budget: 'e.g., K400', spent: 'e.g., K390', balance: 'e.g., K10', remarks: 'e.g., Food parcels, hospital visit' } },
                          { item: 'Hospitality/Fellowship', budget: 0, spent: 0, balance: 0, remarks: '', tooltips: { budget: 'e.g., K300', spent: 'e.g., K280', balance: 'e.g., K20', remarks: 'e.g., Fellowship meal, flowers' } },
                          { item: 'Other (specify)', budget: 0, spent: 0, balance: 0, remarks: '', tooltips: { budget: 'e.g., —', spent: 'e.g., —', balance: 'e.g., —', remarks: '' } },
                          { item: 'TOTAL', budget: 0, spent: 0, balance: 0, remarks: '', tooltips: { budget: 'e.g., K1,150', spent: 'e.g., K1,090', balance: 'e.g., K60', remarks: 'e.g., All acquitted' } },
                      ]
                  }
              ]
          },
          { id: 'challenges', title: 'Section 6: Challenges & Needs', fields: [{ id: 'challengesNeeds', label: '', type: FieldType.BULLET, tooltip: 'e.g.,\n• Limited budget for visitation and welfare.\n• Need for storage space for communion and baptismal supplies.\n• More training for younger deaconesses.' }] },
          { id: 'goals', title: 'Section 7: Goals & Recommendations', fields: [{ id: 'goalsRecs', label: '', type: FieldType.BULLET, tooltip: 'e.g.,\n• Organize training session for all deaconesses in Q3.\n• Strengthen coordination with Deacons in welfare ministry.\n• Request additional funds for regular visitation.' }] },
          {
              id: 'signatures',
              title: 'Signatures',
              fields: [
                  { id: 'preparedBy', label: 'Prepared by', type: FieldType.SIGNATURE, tooltip: 'e.g.,\nName: Jennifer Max\nDate: 30/06/2025' },
              ],
          },
      ],
  },
  'pathfinder': {
    key: 'pathfinder',
    name: "Pathfinder Club Quarterly Report",
    title: "Pathfinder Club Quarterly Report",
    sections: [
        {
            id: 'generalInfo',
            title: 'Section 1: General Information',
            fields: [
                {
                    id: 'infoTable', label: '', type: FieldType.TABLE, columns: ['Field', 'Details'], editableFirstColumn: false,
                    rows: [
                        { field: 'Mission/Conference', details: '', tooltips: { details: 'e.g., Northen Milne Mission' } },
                        { field: 'Church Name', details: '', tooltips: { details: 'e.g., Bango SDA Church' } },
                        { field: 'Quarter/Year', details: '', tooltips: { details: 'e.g., Q2 - 2025' } },
                        { field: 'Pathfinder Club Name', details: '', tooltips: { details: 'e.g., Bethel Flame-bearers Pathfinder Club' } },
                        { field: 'Club Director', details: '', tooltips: { details: 'e.g., Brother David Masi' } },
                        { field: 'Deputy Directors', details: '', tooltips: { details: 'e.g., Sis. Ruth Kila, Bro. Joseph Kari' } },
                        { field: 'Number of Pathfinders Enrolled', details: 0, tooltips: { details: 'e.g., 42' } },
                        { field: 'Number of Counsellors/Staff', details: 0, tooltips: { details: 'e.g., 10' } },
                        { field: 'Prepared By', details: '', tooltips: { details: 'e.g., David Masi' } },
                        { field: 'Date Submitted', details: '', tooltips: { details: 'e.g., 30 June 2025' } },
                    ]
                }
            ]
        },
        {
            id: 'membership',
            title: 'Section 2: Membership Report',
            fields: [
                {
                    id: 'membershipTable', label: '', type: FieldType.TABLE, columns: ['Item', 'Number'], editableFirstColumn: false,
                    rows: [
                        { item: 'Total Members Last Quarter', number: 0, tooltips: { number: 'e.g., 40' } },
                        { item: 'New Members Enrolled', number: 0, tooltips: { number: 'e.g., 4' } },
                        { item: 'Members Transferred In', number: 0, tooltips: { number: 'e.g., 0' } },
                        { item: 'Members Transferred Out', number: 0, tooltips: { number: 'e.g., 2' } },
                        { item: 'Inactive/Dropped Members', number: 0, tooltips: { number: 'e.g., 0' } },
                        { item: 'Current Active Membership', number: 0, tooltips: { number: 'e.g., 42' } },
                    ]
                }
            ]
        },
        {
            id: 'meetings',
            title: 'Section 3: Club Meetings & Activities',
            fields: [
                {
                    id: 'meetingsTable', label: '', type: FieldType.TABLE, columns: ['Activity Type', 'Number Held', 'Attendance', 'Remarks'],
                    rows: [
                        { activity: 'Regular Club Meetings', number: 0, attendance: '', remarks: '', tooltips: { number: 'e.g., 10', attendance: 'e.g., Avg. 38 Pathfinders', remarks: 'e.g., Weekly meetings with marching, drilling & devotions' } },
                        { activity: 'Classwork Sessions (honors, AY classes)', number: 0, attendance: '', remarks: '', tooltips: { number: 'e.g., 8', attendance: 'e.g., Avg. 35 Pathfinders', remarks: 'e.g., Working on Friend and Companion classes' } },
                        { activity: 'Campouts/Outdoor Activities', number: 0, attendance: '', remarks: '', tooltips: { number: 'e.g., 1', attendance: 'e.g., 41', remarks: 'e.g., Weekend camp on "Christian Leadership & Survival Skills"' } },
                        { activity: 'Marching & Drilling Sessions', number: 0, attendance: '', remarks: '', tooltips: { number: 'e.g., 6', attendance: 'e.g., Avg. 37', remarks: 'e.g., Prepared for Pathfinder Day parade' } },
                        { activity: 'Pathfinder Day/AYM Involvement', number: 0, attendance: '', remarks: '', tooltips: { number: 'e.g., 1', attendance: 'e.g., All', remarks: 'e.g., Led divine service, afternoon AY, and marched' } },
                        { activity: 'Other Activities', number: 0, attendance: '', remarks: '', tooltips: { number: 'e.g., 0', attendance: 'e.g., —', remarks: 'e.g., —' } },
                    ],
                    hasPhotoUploads: true,
                }
            ]
        },
        {
            id: 'outreach',
            title: 'Section 4: Outreach & Mission',
            fields: [
                {
                    id: 'outreachTable', label: '', type: FieldType.TABLE, columns: ['Outreach Activity', 'Date', 'Participation', 'Impact/Remarks'],
                    rows: [
                        { activity: 'Community Clean-up', date: '', participation: '', impact: '', tooltips: { date: 'e.g., 11 May 2025', participation: 'e.g., 35 Pathfinders', impact: 'e.g., Gained positive attention from community' } },
                        { activity: 'Hospital Visit', date: '', participation: '', impact: '', tooltips: { date: 'e.g., 25 May 2025', participation: 'e.g., 30 Pathfinders', impact: 'e.g., Encouraged patients, shared food packs' } },
                        { activity: 'Church Involvement', date: '', participation: '', impact: '', tooltips: { date: 'e.g., 1 June 2025', participation: 'e.g., All', impact: 'e.g., Strengthened church-Pathfinder relationship' } },
                    ],
                    hasPhotoUploads: true,
                }
            ]
        },
        {
            id: 'training',
            title: 'Section 5: Training & Development',
            fields: [
                 { id: 'staffTraining', label: 'Staff Leadership Training (Number Conducted)', type: FieldType.NUMBER, tooltip: 'e.g., 1 (covering mentoring & discipline)' },
                 { id: 'staffTraining_photos', label: 'Photos for Staff Training', type: FieldType.PHOTOS },
                 { id: 'pathfinderProgress', label: 'Pathfinder Classwork Progress', type: FieldType.TEXTAREA, placeholder: 'e.g., 60% completed Friend/Companion requirements', tooltip: 'e.g., 60% of Pathfinders have completed their Friend and Companion class requirements. We are now working on the Hiking and Camping honors.' },
            ]
        },
        {
            id: 'financial',
            title: 'Section 6: Financial Acquittals',
            fields: [
                {
                    id: 'financialTable', label: '', type: FieldType.TABLE, columns: ['Activity/Item', 'Budget Approved', 'Amount Spent', 'Balance', 'Remarks'],
                    rows: [
                        { item: 'Uniforms & Insignia', budget: 0, spent: 0, balance: 0, remarks: '', tooltips: { budget: 'e.g., K700', spent: 'e.g., K680', balance: 'e.g., K20', remarks: 'e.g., 7 new uniforms' } },
                        { item: 'Program Materials & Supplies', budget: 0, spent: 0, balance: 0, remarks: '', tooltips: { budget: 'e.g., K400', spent: 'e.g., K350', balance: 'e.g., K50', remarks: 'e.g., AY classwork materials' } },
                        { item: 'Campout/Outdoor Activities', budget: 0, spent: 0, balance: 0, remarks: '', tooltips: { budget: 'e.g., K1,000', spent: 'e.g., K980', balance: 'e.g., K20', remarks: 'e.g., Food, transport, campsite fees' } },
                        { item: 'Outreach/Mission Projects', budget: 0, spent: 0, balance: 0, remarks: '', tooltips: { budget: 'e.g., K300', spent: 'e.g., K280', balance: 'e.g., K20', remarks: 'e.g., Hospital visit care packages' } },
                        { item: 'TOTAL', budget: 0, spent: 0, balance: 0, remarks: '', tooltips: { budget: 'e.g., K2,400', spent: 'e.g., K2,290', balance: 'e.g., K110', remarks: 'e.g., All acquitted' } },
                    ]
                }
            ]
        },
        { id: 'challenges', title: 'Section 7: Challenges & Needs', fields: [{ id: 'challengesNeeds', label: '', type: FieldType.BULLET, tooltip: 'e.g.,\n• Need for camping equipment (tents, cooking gear).\n• Lack of consistent parental support.\n• More training needed for counsellors in specialized honors.' }] },
        { id: 'goals', title: 'Section 8: Goals & Recommendations', fields: [{ id: 'goalsRecs', label: '', type: FieldType.BULLET, tooltip: 'e.g.,\n• Conduct Pathfinder Investiture in Q3.\n• Organize a "Parent-Pathfinder Day" to increase engagement.\n• Request church board to support purchase of two new tents.' }] },
        {
            id: 'signatures',
            title: 'Signatures',
            fields: [
                { id: 'preparedBy', label: 'Prepared by', type: FieldType.SIGNATURE, tooltip: 'e.g.,\nName: David Masi\nDate: 30/06/2025' },
            ],
        },
    ],
  },
};
