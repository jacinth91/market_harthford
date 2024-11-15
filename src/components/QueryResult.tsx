import React from 'react';
import { TrendingDown, TrendingUp, Minus, LineChart, AlertTriangle, DollarSign, CloudLightning, BarChart3 } from 'lucide-react';

interface FinancialMetric {
  category: string;
  value: string;
  trend?: 'up' | 'down' | 'neutral';
  details?: string;
}

interface Suggestion {
  icon: React.ElementType;
  title: string;
  description: string;
  type: 'positive' | 'negative' | 'neutral' | 'warning';
}

interface QueryResultProps {
  metrics: FinancialMetric[];
}

const QueryResult: React.FC<QueryResultProps> = ({ metrics }) => {
  const getTrendIcon = (trend?: 'up' | 'down' | 'neutral') => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-gray-400" />;
    }
  };

  const suggestions: Suggestion[] = [
    {
      icon: TrendingUp,
      title: 'Strong Noninterest Income Growth',
      description: 'Noninterest income up 12% YoY indicates successful fee-based revenue diversification',
      type: 'positive'
    },
    {
      icon: TrendingDown,
      title: 'Net Interest Income Pressure',
      description: 'Consider strategies to mitigate 11% YoY decline in net interest income',
      type: 'negative'
    },
    {
      icon: AlertTriangle,
      title: 'Credit Quality Watch',
      description: 'Monitor CRE exposure given increased net charge-offs',
      type: 'warning'
    },
    {
      icon: LineChart,
      title: 'Capital Position',
      description: 'Strong CET1 ratio at 11.3% provides flexibility for growth initiatives',
      type: 'neutral'
    },
    // Insurance-specific suggestions
    {
      icon: DollarSign,
      title: 'Premium Growth Analysis',
      description: 'Written premium growth at 8.5% shows strong market penetration',
      type: 'positive'
    },
    {
      icon: CloudLightning,
      title: 'Catastrophe Impact',
      description: 'Catastrophe losses of $850M require risk mitigation review',
      type: 'warning'
    },
    {
      icon: BarChart3,
      title: 'Reserve Development',
      description: 'Favorable reserve development of $220M indicates strong underwriting',
      type: 'positive'
    }
  ];

  // Group metrics by category
  const groupedMetrics = metrics.reduce((acc, metric) => {
    if (!acc[metric.category]) {
      acc[metric.category] = [];
    }
    acc[metric.category].push(metric);
    return acc;
  }, {} as Record<string, FinancialMetric[]>);

  const getSuggestionColor = (type: Suggestion['type']) => {
    switch (type) {
      case 'positive':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'negative':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'warning':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      default:
        return 'bg-blue-50 text-blue-700 border-blue-200';
    }
  };

  const getIconColor = (type: Suggestion['type']) => {
    switch (type) {
      case 'positive':
        return 'text-green-500';
      case 'negative':
        return 'text-red-500';
      case 'warning':
        return 'text-yellow-500';
      default:
        return 'text-blue-500';
    }
  };

  return (
    <div className="flex gap-4 mt-2">
      {/* <div className="flex-1 bg-white rounded-lg shadow-sm overflow-hidden">
        {Object.entries(groupedMetrics).map(([category, items], index) => (
          <div key={index} className={`${index > 0 ? 'border-t border-gray-100' : ''}`}>
            <div className="px-4 py-3 bg-gray-50">
              <h3 className="text-sm font-medium text-gray-900">{category}</h3>
            </div>
            <div className="px-4 py-3 space-y-2">
              {items.map((metric, idx) => (
                <div key={idx} className="flex items-start space-x-2">
                  <div className="mt-1">{getTrendIcon(metric.trend)}</div>
                  <div className="flex-1">
                    <span className="text-sm text-gray-900">{metric.value}</span>
                    {metric.details && (
                      <span className="text-sm text-gray-500 ml-1">({metric.details})</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div> */}
         <div className="p-6 bg-gray-50 text-gray-900">
      <h1 className="text-3xl font-bold mb-4">Wells Fargo 3Q24 Financial Results</h1>
      
      <h2 className="text-xl font-semibold mb-2">Financial Performance</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Net Income: $5.1 billion, or $1.42 per share.</li>
        <li>Total Revenue: $20.4 billion, a 2% decline year-over-year.</li>
        <li>Net Interest Income: Fell by 11%.</li>
        <li>Noninterest Income: Increased by 12%.</li>
      </ul>

      <h2 className="text-xl font-semibold mb-2">Credit Quality</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Credit Loss Provisions: $1.1 billion set aside for credit losses.</li>
        <li>Net Loan Charge-Offs: Rose to 0.49% of average loans.</li>
        <li>Allowance for Credit Losses: $14.7 billion.</li>
      </ul>

      <h2 className="text-xl font-semibold mb-2">Loans and Deposits</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Average Loans: $910.3 billion, a 3% decline year-over-year.</li>
        <li>Average Deposits: Stable at $1.3 trillion.</li>
      </ul>

      <h2 className="text-xl font-semibold mb-2">Capital and Liquidity</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Common Equity Tier 1 (CET1) Ratio: 11.3%.</li>
        <li>Liquidity Coverage Ratio (LCR): 127%, indicating strong capital and liquidity positions.</li>
      </ul>

      <h2 className="text-xl font-semibold mb-2">Segment Performance</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Consumer Banking and Lending: Revenue down 5% year-over-year, with lower deposit balances offset by higher deposit-related fees.</li>
        <li>Commercial Banking: Revenue increased 7% from the previous quarter but fell 2% year-over-year.</li>
        <li>Corporate and Investment Banking: Revenue up 2% from the prior quarter, driven by higher trading activity.</li>
        <li>Wealth and Investment Management: Revenue rose 5% year-over-year due to higher asset-based fees and improved market valuations.</li>
      </ul>

      <h2 className="text-xl font-semibold mb-2">Outlook</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Net Interest Income: Expected to decline by 9% from 2023 levels.</li>
        <li>Total Noninterest Expense: Projected to remain at $54 billion.</li>
      </ul>

      <h2 className="text-xl font-semibold mb-2">Key Insights</h2>
      <ul className="list-disc pl-6">
        <li>This report highlights strong credit and liquidity positions.</li>
        <li>Challenges include declining interest income and variability across business segments.</li>
      </ul>
    </div>

      {/* <div className="w-72 space-y-3">
        <h4 className="text-sm font-medium text-gray-900 mb-2">Related Insights</h4>
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg border ${getSuggestionColor(suggestion.type)} cursor-pointer hover:opacity-90 transition-opacity`}
          >
            <div className="flex items-start space-x-3">
              <suggestion.icon className={`h-5 w-5 mt-0.5 ${getIconColor(suggestion.type)}`} />
              <div>
                <h4 className="text-sm font-medium mb-1">{suggestion.title}</h4>
                <p className="text-xs opacity-90">{suggestion.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default QueryResult;