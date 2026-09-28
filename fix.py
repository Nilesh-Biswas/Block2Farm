import os

# 1. App.jsx fixes
with open('src/App.jsx', 'r', encoding='utf-8') as f:
    app = f.read()

# Fix PGML Inference Trace (inject after RadarMapDisplay)
trace_overlay = '''
              {/* PGML Inference Trace Overlay */}
              <div className="absolute top-3 left-3 z-[1000] p-3 rounded-lg text-[10px] font-mono leading-relaxed border border-subtle/30 bg-bg-deep/80 backdrop-blur-md text-foreground/80 hidden sm:block shadow-card">
                <div className="text-accent flex items-center gap-1.5 mb-1.5 border-b border-subtle/30 pb-1.5 font-bold tracking-widest">
                  <Cpu size={12} /> 
                  PGML INFERENCE TRACE
                </div>
                <div className="space-y-0.5">
                  <div className="flex justify-between w-48"><span>"base_grid":</span><span className="text-foreground">32.0</span></div>
                  <div className="flex justify-between w-48"><span>"dem_elev_offset":</span><span className="text-warning">+1.00</span></div>
                  <div className="flex justify-between w-48"><span>"ml_residual_delta":</span><span className="text-cyan font-bold">+0.50</span></div>
                  <div className="border-t border-subtle/20 my-1 pt-1 flex justify-between w-48 font-bold">
                     <span>"final_downscaled":</span><span className="text-success">33.5</span>
                  </div>
                </div>
              </div>
'''
app = app.replace('isProcessing={isProcessing}\n                />', 'isProcessing={isProcessing}\n                />\n' + trace_overlay)

# Fix Subtitle and Placeholder
app = app.replace('1-5 sq km Panchayat Downscaling', '1-2 km Panchayat Downscaling')
app = app.replace('Search Panchayat or Block (e.g. Kondagaon)...', 'Search Panchayat or Block (e.g. Supaul)...')

# Also fix the HUD Node Label ? to MapPin
app = app.replace('? {currentData.name}', '<MapPin size={10} className="inline mr-1"/> {currentData.name}')

# Also fix the BASE temp
app = app.replace('BASE\'} {currentData.baseBlockTemp}C', 'BASE\'} {currentData.baseBlockTemp}°C')

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(app)


# 2. AdvisoryPanel.jsx fixes
with open('src/components/dashboard/AdvisoryPanel.jsx', 'r', encoding='utf-8') as f:
    adv = f.read()

adv = adv.replace('1 spatial rules matched', '1 spatial rule matched')

badge_injection = '''
          <h3 className="font-semibold text-foreground text-sm leading-tight">{displayTitle}</h3>
          <SoftBadge variant={config.badgeVariant}>{displayBadge}</SoftBadge>
          <span className="px-2 py-0.5 rounded bg-bg-deep border border-subtle/20 text-[9px] font-bold text-accent uppercase tracking-wider">
            Target: Wheat (Harvest Stage)
          </span>
'''
adv = adv.replace('<h3 className="font-semibold text-foreground text-sm leading-tight">{displayTitle}</h3>\n          <SoftBadge variant={config.badgeVariant}>{displayBadge}</SoftBadge>', badge_injection)

pill_injection = '''
        {/* SMS Broadcast Action for Warnings/Critical */}
        {(alert.type === 'critical' || alert.type === 'warning') && (
          <div className="mt-3 pt-3 border-t border-subtle/10 flex items-center justify-between">
            <span className="px-2.5 py-1 bg-accent/10 text-accent rounded text-[9px] font-bold uppercase tracking-widest border border-accent/20">
              [Bhashini SMS / Audio - Hindi Ready]
            </span>
            <button 
              onClick={handleSMS}
              disabled={sent}
              className={p-1.5 rounded-md transition-all duration-200 border }
            >
              {sent ? <CheckCircle2 size={14} /> : <Send size={14} />}
            </button>
          </div>
        )}
'''

# We need to replace the old button block
import re
adv = re.sub(r'\{\/\* SMS Broadcast Action.*?\n\s+\)\}', pill_injection, adv, flags=re.DOTALL)

with open('src/components/dashboard/AdvisoryPanel.jsx', 'w', encoding='utf-8') as f:
    f.write(adv)


# 3. ComparisonChart.jsx fixes
with open('src/components/dashboard/ComparisonChart.jsx', 'r', encoding='utf-8') as f:
    chart = f.read()

chart = chart.replace('<YAxis \n                stroke="var(--color-muted)" \n                fontSize={10} \n                tickLine={false}\n                axisLine={false}\n                opacity={0.5}', '<YAxis \n                stroke="var(--color-foreground)" \n                fontSize={14} \n                fontWeight={600}\n                tickLine={false}\n                axisLine={false}\n                opacity={0.9}')

chart = chart.replace('wrapperStyle={{ fontSize: \'11px\', color: \'var(--color-muted)\', paddingTop: \'10px\' }}', 'wrapperStyle={{ fontSize: \'14px\', color: \'var(--color-foreground)\', fontWeight: \'bold\', paddingTop: \'10px\' }}')

with open('src/components/dashboard/ComparisonChart.jsx', 'w', encoding='utf-8') as f:
    f.write(chart)

# 4. mockData.jsx fix
with open('src/data/mockData.jsx', 'r', encoding='utf-8') as f:
    mock = f.read()

mock = mock.replace('mm rain expected.', '35mm rain expected.')

with open('src/data/mockData.jsx', 'w', encoding='utf-8') as f:
    f.write(mock)

print("Done")
