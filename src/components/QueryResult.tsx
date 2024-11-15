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
      <div className="flex-1 bg-white rounded-lg shadow-sm overflow-hidden">
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
      </div>

      <div className="w-72 space-y-3">
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
      </div>
    </div>
  );
};

export default QueryResult;