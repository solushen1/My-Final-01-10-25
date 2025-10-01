import type { SlidePlan } from '../types';

export const slidePlan: SlidePlan = {
  'sabbath-school': [
    {
      slideId: 'ss-title-01',
      title: '{{title}}',
      layout: 'title',
      content: [
        { type: 'text', path: "$.header.quarter", styleHint: 'subtitle' },
        { type: 'text', path: "$.header.preparedBy", styleHint: 'author' },
      ],
      suggestedImageTreatment: 'fullBleed',
    },
    {
      slideId: 'ss-summary-02',
      title: 'Superintendent\'s Summary',
      layout: 'imageLeftTextRight',
      content: [
        { type: 'image', path: "$.outreach.outreachTable[*].photos[0]", styleHint: 'mainImage' },
        { type: 'list', path: "$.weeklyPrograms.programsTable", styleHint: 'body' },
      ],
      suggestedImageTreatment: 'rounded',
      generativeIconPrompt: "A simple icon representing community outreach and care."
    },
    {
      slideId: 'ss-kpi-03',
      title: 'Key Metrics This Quarter',
      layout: 'summary',
      content: [
        { type: 'number', path: "$.divisions.divisionsTable[?(@.Division=='Total')]['Average Attendance']", styleHint: 'kpi', label: 'Avg. Attendance' },
        { type: 'number', path: "$.divisions.divisionsTable[?(@.Division=='Total')]['Teachers Assigned']", styleHint: 'kpi', label: 'Active Teachers' },
        { type: 'number', path: "$.financial.financialTable[?(@.Item=='Total')].Collected", styleHint: 'kpi', label: 'Total Offerings (GHS)' },
      ],
      generativeIconPrompt: "A minimalist icon representing key performance metrics and data points."
    },
    {
        slideId: 'ss-divisions-04',
        title: 'Divisions Report',
        layout: 'twoColumn',
        content: [
            { type: 'table', path: '$.divisions.divisionsTable' },
        ],
        generativeIconPrompt: "An icon showing diverse groups of people learning together in harmony."
    },
    {
      slideId: 'ss-photogrid-06',
      title: 'A Quarter in Pictures',
      layout: 'photoGrid',
      content: [
        { type: 'image', path: '$..photos[*]' },
      ],
    },
  ],
  'treasury': [
      {
        slideId: 'treasury-title-01',
        title: '{{title}}',
        layout: 'title',
        content: [
            { type: 'text', path: "$.header.quarter", styleHint: 'subtitle' },
            { type: 'text', path: "$.header.preparedBy", styleHint: 'author' },
        ],
      },
      {
        slideId: 'treasury-kpi-02',
        title: 'Executive Summary',
        layout: 'summary',
        content: [
            { type: 'number', path: "$.executiveSummary.summaryTable[?(@.item=='Total receipts this quarter')].amount", label: 'Total Receipts (K)' },
            { type: 'number', path: "$.executiveSummary.summaryTable[?(@.item=='Total disbursements this quarter')].amount", label: 'Total Disbursements (K)' },
            { type: 'number', path: "$.executiveSummary.summaryTable[?(@.item=='Closing cash balance')].amount", label: 'Closing Balance (K)' },
        ],
        generativeIconPrompt: "A clean, modern icon representing financial growth and summary statistics."
      },
      {
          slideId: 'treasury-receipts-chart-03',
          title: 'Receipts by Category',
          layout: 'chartFull',
          content: [
              { type: 'chart', path: "$.financialSummary.receiptsTable[?(@.category!='Total Receipts')]" }
          ],
          suggestedChart: {
              chartType: 'pie',
              dataPath: "$.financialSummary.receiptsTable[?(@.category!='Total Receipts')]"
          },
          generativeIconPrompt: "A simple icon of a pie chart, symbolizing financial distribution."
      },
      {
          slideId: 'treasury-disbursements-chart-04',
          title: 'Disbursements by Category',
          layout: 'chartFull',
          content: [
              { type: 'chart', path: "$.financialSummary.disbursementsTable[?(@.category!='Total Disbursements' && @.category!='Net Surplus / (Deficit)')]" }
          ],
          suggestedChart: {
              chartType: 'bar',
              dataPath: "$.financialSummary.disbursementsTable[?(@.category!='Total Disbursements' && @.category!='Net Surplus / (Deficit)')]"
          },
          generativeIconPrompt: "A minimalist icon of a bar chart, symbolizing spending categories."
      }
  ],
  'default': [
    {
        slideId: 'default-title-01',
        title: '{{title}}',
        layout: 'title',
        content: [
            { type: 'text', path: "$.header.quarter", styleHint: 'subtitle' },
            { type: 'text', path: "$.header.preparedBy", styleHint: 'author' },
        ]
    }
  ]
};