import { ArrowUpRight } from "lucide-react";
import { AppDialog } from "@/components/apps/AppDialog";
import TaxCalcApp from "@/components/apps/tools/TaxCalcApp";
import LoanApp from "@/components/apps/tools/LoanApp";
import CalendarApp from "@/components/apps/tools/CalendarApp";
import WeatherApp from "@/components/apps/tools/WeatherApp";
import UnicodeApp from "@/components/apps/tools/UnicodeApp";
import FinanceApp from "@/components/apps/tools/FinanceApp";
import ExplorerApp from "@/components/apps/tools/ExplorerApp";
import BmiApp from "@/components/apps/tools/BmiApp";
import AgeApp from "@/components/apps/tools/AgeApp";
import TipApp from "@/components/apps/tools/TipApp";
import UnitApp from "@/components/apps/tools/UnitApp";
import PasswordApp from "@/components/apps/tools/PasswordApp";
import QrApp from "@/components/apps/tools/QrApp";

const tools = [
  { name: "Tax Calculator", desc: "Monthly income → Nepal tax", label: "tools/tax", Comp: TaxCalcApp },
  { name: "Loan / EMI", desc: "Monthly installment calculator", label: "tools/loan", Comp: LoanApp },
  { name: "Tip Splitter", desc: "Bill, tip & per-person split", label: "tools/tip", Comp: TipApp },
  { name: "BMI Calculator", desc: "Body mass index & category", label: "tools/bmi", Comp: BmiApp },
  { name: "Age Calculator", desc: "Years, months, days, hours", label: "tools/age", Comp: AgeApp },
  { name: "Unit Converter", desc: "Length, weight, volume", label: "tools/units", Comp: UnitApp },
  { name: "Password Generator", desc: "Strong random passwords", label: "tools/password", Comp: PasswordApp },
  { name: "QR Code Generator", desc: "Text or URL → QR code", label: "tools/qr", Comp: QrApp },
  { name: "Nepal Calendar", desc: "AD ↔ BS, festivals", label: "tools/calendar", Comp: CalendarApp },
  { name: "Weather (Nepal)", desc: "Live city weather", label: "tools/weather", Comp: WeatherApp },
  { name: "Unicode Converter", desc: "Romanized → Devanagari", label: "tools/unicode", Comp: UnicodeApp },
  { name: "Finance & NEPSE", desc: "Forex + market snapshot", label: "tools/finance", Comp: FinanceApp },
  { name: "Nepal Explorer", desc: "Facts and iconic places", label: "tools/explore", Comp: ExplorerApp },
];

export const Tools = () => (
  <section id="tools" className="py-32 px-6 border-t border-border">
    <div className="max-w-7xl mx-auto">
      <p className="section-label mb-4">tools.everyday()</p>
      <h2 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 max-w-3xl">
        Useful tools<span className="text-primary">.</span>
      </h2>
      <p className="text-muted-foreground max-w-2xl mb-16">
        Practical utilities — open instantly in a popup. No new tab, no waiting.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
        {tools.map((t, i) => {
          const Comp = t.Comp;
          return (
            <AppDialog
              key={t.name}
              label={t.label}
              title={t.name}
              trigger={
                <button className="bg-background p-8 group hover-lift relative block text-left w-full">
                  <div className="font-mono text-xs text-muted-foreground mb-6">
                    {String(i + 1).padStart(2, "0")} / {String(tools.length).padStart(2, "0")}
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{t.name}</h3>
                  <p className="text-sm text-muted-foreground mb-8">{t.desc}</p>
                  <div className="font-mono text-xs uppercase tracking-wider text-primary inline-flex items-center gap-2">
                    Open{" "}
                    <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </button>
              }
            >
              <Comp />
            </AppDialog>
          );
        })}
      </div>
    </div>
  </section>
);
