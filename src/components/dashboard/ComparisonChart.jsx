import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { SoftCard, SectionHeader } from '../ui/Neumorphic';
import { LineChart as ChartIcon } from 'lucide-react';

export const ComparisonChart = ({ baseTemp, localTemp, isProcessing, language }) => {
  // Generate deterministic mock data based on the anomaly
  const data = React.useMemo(() => {
    const days = language === 'hi' 
      ? ['दिन 1', 'दिन 2', 'दिन 3', 'दिन 4', 'दिन 5', 'दिन 6', 'दिन 7']
      : ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'];
    const variance = localTemp - baseTemp;
    
    return days.map((day, i) => {
      // Simulate natural daily temperature curve
      const dailyFluctuation = Math.sin(i) * 3; 
      
      return {
        name: day,
        blockTemp: parseFloat((baseTemp + dailyFluctuation).toFixed(1)),
        pgmlTemp: parseFloat((baseTemp + dailyFluctuation + (variance * (1 + (i*0.05)))).toFixed(1)),
      };
    });
  }, [baseTemp, localTemp, language]);

  return (
    <SoftCard className="w-full h-full p-5 flex flex-col min-h-[280px]">
      <div className="mb-4">
        <SectionHeader
          icon={ChartIcon}
          title={language === 'hi' ? "डाउनस्केलिंग प्रमाण (Proof-of-Concept)" : "Downscaling Proof-of-Concept"}
          subtitle={language === 'hi' ? "12 किमी ब्लॉक बनाम 1-5 किमी पंचायत" : "12km IMD Block vs 1km PGML Panchayat"}
        />
      </div>
      
      <div className={`flex-1 transition-all duration-500 ${isProcessing ? 'opacity-30 blur-sm' : 'opacity-100'}`}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorPgml" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-accent)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="var(--color-accent)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-subtle)" opacity={0.15} vertical={false} />
            <XAxis 
              dataKey="name" 
              stroke="var(--color-muted)" 
              fontSize={10} 
              tickLine={false}
              axisLine={false}
              opacity={0.5}
            />
            <YAxis 
              stroke="var(--color-muted)" 
              fontSize={10} 
              tickLine={false}
              axisLine={false}
              opacity={0.5}
              domain={['dataMin - 2', 'dataMax + 2']}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'var(--color-bg-elevated)', 
                borderColor: 'var(--color-subtle)',
                borderRadius: '8px',
                fontSize: '12px',
                color: 'var(--color-foreground)'
              }}
              itemStyle={{ fontWeight: 600 }}
            />
            <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', color: 'var(--color-muted)', paddingTop: '10px' }} />
            
            {/* Generic Block Data Line */}
            <Area 
              type="monotone" 
              dataKey="blockTemp" 
              name={language === 'hi' ? "12 किमी ब्लॉक पूर्वानुमान" : "12km Block Forecast"}
              stroke="var(--color-muted)" 
              strokeDasharray="4 4"
              fill="transparent" 
              strokeWidth={2}
            />
            
            {/* High-Res PGML Line */}
            <Area 
              type="monotone" 
              dataKey="pgmlTemp" 
              name={language === 'hi' ? "1 किमी पंचायत पूर्वानुमान" : "1km PGML Downscaled"}
              stroke="var(--color-accent)" 
              fillOpacity={1} 
              fill="url(#colorPgml)" 
              strokeWidth={3}
              activeDot={{ r: 6, fill: 'var(--color-accent)', stroke: 'var(--color-bg-base)', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </SoftCard>
  );
};
