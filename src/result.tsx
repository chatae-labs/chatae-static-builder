import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, TrendingUp, Globe, DollarSign, Heart } from 'lucide-react';

const AffirmPartnerships = () => {
  const partnerships = [
    {
      date: "December 2024",
      partner: "Sixth Street",
      type: "Capital Investment",
      icon: DollarSign,
      investment: "$4B",
      details: "Three-year forward flow agreement using AssetCo structure to purchase Affirm loans",
      objective: "Enable up to $20B in loans over three years, diversify funding sources, and strengthen consumer financing capabilities",
      color: "bg-blue-500"
    },
    {
      date: "January 2025",
      partner: "Liberty Mutual Investments",
      type: "Capital Expansion",
      icon: Building2,
      investment: "$750M+",
      details: "Expansion of existing partnership with commitment to purchase installment loans on forward flow basis through June 2027",
      objective: "Increase consumer access to flexible payments and diversify funding model with up to $5B investment over time",
      color: "bg-indigo-500"
    },
    {
      date: "February 2025",
      partner: "Shopify",
      type: "International Expansion",
      icon: Globe,
      investment: "Exclusive",
      details: "Extension of exclusive pay-over-time provider status beyond U.S. market",
      objective: "Expand global presence and reinforce leadership in BNPL space internationally",
      color: "bg-purple-500"
    },
    {
      date: "May 2024",
      partner: "Google Pay & Zip",
      type: "Platform Integration",
      icon: TrendingUp,
      investment: "Strategic",
      details: "Display BNPL options at checkout for Google Pay users across merchant sites and Android apps in the U.S.",
      objective: "Increase visibility and adoption of BNPL solutions leveraging Google Pay's broad reach",
      color: "bg-green-500"
    },
    {
      date: "April 2024",
      partner: "Healthcare Vertical",
      type: "Market Expansion",
      icon: Heart,
      investment: "New Vertical",
      details: "Launch of BNPL loans for elective medical procedures with nearly half at 0% APR",
      objective: "Diversify merchant base and expand into healthcare by providing affordable medical financing",
      color: "bg-rose-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Affirm Holdings
          </h1>
          <p className="text-slate-600 text-lg">Strategic Partnerships • Past 12 Months</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-none shadow-lg bg-white">
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <p className="text-slate-500 text-sm font-medium">Total Capital Commitments</p>
                <p className="text-4xl font-bold text-blue-600">$4.75B+</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-lg bg-white">
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <p className="text-slate-500 text-sm font-medium">New Partnerships</p>
                <p className="text-4xl font-bold text-purple-600">5</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-lg bg-white">
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <p className="text-slate-500 text-sm font-medium">Loan Capacity</p>
                <p className="text-4xl font-bold text-indigo-600">$20B</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Partnerships Timeline */}
        <div className="space-y-6">
          {partnerships.map((partnership, index) => {
            const Icon = partnership.icon;
            return (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white overflow-hidden">
                <div className={`h-1.5 ${partnership.color}`} />
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`${partnership.color} p-3 rounded-xl`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <CardTitle className="text-2xl">{partnership.partner}</CardTitle>
                          <Badge variant="secondary" className="text-xs">
                            {partnership.date}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 mb-4">
                          <Badge className={`${partnership.color} text-white border-none`}>
                            {partnership.type}
                          </Badge>
                          <Badge variant="outline" className="font-semibold">
                            {partnership.investment}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-700 mb-2">Partnership Details</p>
                    <p className="text-slate-600 leading-relaxed">{partnership.details}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-700 mb-2">Strategic Objectives</p>
                    <p className="text-slate-600 leading-relaxed">{partnership.objective}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Footer */}
        <Card className="border-none shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <p className="font-semibold text-lg">Strategic Focus Areas</p>
              <div className="flex flex-wrap justify-center gap-3 mt-4">
                <Badge variant="secondary" className="bg-white/20 text-white border-none hover:bg-white/30">
                  Capital Diversification
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white border-none hover:bg-white/30">
                  International Expansion
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white border-none hover:bg-white/30">
                  Platform Integration
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white border-none hover:bg-white/30">
                  Vertical Diversification
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AffirmPartnerships;
