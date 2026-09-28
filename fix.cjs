const fs = require('fs');

let adv = fs.readFileSync('src/components/dashboard/AdvisoryPanel.jsx', 'utf8');

adv = adv.replace('1 spatial rules matched', '1 spatial rule matched');

const badge_injection = `
          <h3 className="font-semibold text-foreground text-sm leading-tight">{displayTitle}</h3>
          <SoftBadge variant={config.badgeVariant}>{displayBadge}</SoftBadge>
          <span className="px-2 py-0.5 rounded bg-bg-deep border border-subtle/20 text-[9px] font-bold text-accent uppercase tracking-wider">
            Target: Wheat (Harvest Stage)
          </span>
`;
adv = adv.replace(/<h3 className="font-semibold text-foreground text-sm leading-tight">\{displayTitle\}<\/h3>\s*<SoftBadge variant=\{config\.badgeVariant\}>\{displayBadge\}<\/SoftBadge>/, badge_injection);

const new_block = `
        {/* SMS Broadcast Action for Warnings/Critical */}
        {(alert.type === 'critical' || alert.type === 'warning') && (
          <div className="mt-3 pt-3 border-t border-subtle/10 flex items-center">
            <span className="px-2.5 py-1.5 bg-success/10 text-success rounded-md text-[10px] font-mono font-semibold tracking-wide border border-success/20 flex items-center gap-2 cursor-default select-none">
              <CheckCircle2 size={12} />
              [ ✓ Auto-SMS Dispatched via Bhashini (Hindi) ]
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
`;

adv = adv.replace(/\{\/\* SMS Broadcast Action[\s\S]*?\}\s*<\/div>\s*<\/div>\s*\);\s*\};/, new_block);

fs.writeFileSync('src/components/dashboard/AdvisoryPanel.jsx', adv, 'utf8');
console.log("Done");
