'use client';
import { useState } from 'react';
import { Search, Gamepad2, Users, Ghost, Info } from 'lucide-react';

const CATEGORIES = [
  {
    title: "Minigames & Punkte",
    icon: <Gamepad2 className="text-purple-400 w-6 h-6" />,
    commands: [
      { trigger: "!geckonis", desc: "Zeigt deine aktuellen Geckonis 💎 an." },
      { trigger: "!geckonis top", desc: "Zeigt die Top 5 der reichsten Zuschauer." },
      { trigger: "!gamble <menge|all>", desc: "50/50 Chance! Verdopple deinen Einsatz oder verliere alles." },
      { trigger: "!slots <menge>", desc: "Spiele an der Slotmaschine. 3 gleiche Emojis bringen den Jackpot!" },
      { trigger: "!rob @user", desc: "Versuche, einem anderen User Punkte zu klauen (40% Chance)." },
      { trigger: "!fight @user <menge>", desc: "Fordere jemanden zum Duell um Punkte heraus." },
      { trigger: "!claim", desc: "Sammle einen aktiven Drop im Chat ein! Sei der Erste!" },
    ]
  },
  {
    title: "Phasmophobia",
    icon: <Ghost className="text-purple-400 w-6 h-6" />,
    commands: [
      { trigger: "!phasmomap <map>", desc: "Erkaufe dir eine Map für die nächste Runde!", cost: "50 💎" },
      { trigger: "!challenge <chal>", desc: "Zwinge den Streamer zu einer Challenge (z.B. Keine Items).", cost: "1000 💎" },
      { trigger: "!guess <geist>", desc: "Gib deinen Tipp ab, welcher Geist es ist." },
      { trigger: "!randommap", desc: "Zieht zufällig die nächste Map." },
      { trigger: "!randomghost", desc: "Zieht einen zufälligen Geist." },
      { trigger: "!deaths", desc: "Zeigt an, wie oft MoltenGeckoVT schon gestorben ist." },
    ]
  },
  {
    title: "Community & Lurk",
    icon: <Users className="text-purple-400 w-6 h-6" />,
    commands: [
      { trigger: "!lurk / !back", desc: "Verabschiede dich in den Lurk und melde dich wieder zurück." },
      { trigger: "!lurker", desc: "Zeigt an, wer gerade alles fleißig lurkt." },
      { trigger: "!hug @user", desc: "Umarme einen anderen Zuschauer." },
      { trigger: "!love @user", desc: "Berechnet die Liebe zwischen dir und einem User." },
      { trigger: "!bonk @user", desc: "Verteile einen Bonk!" },
      { trigger: "!snack @user", desc: "Wirf jemandem einen Snack zu." },
      { trigger: "!iq", desc: "Wie hoch ist dein Chat-IQ heute?" },
      { trigger: "!quote", desc: "Ruft ein zufälliges Zitat aus vergangenen Streams ab." },
    ]
  },
  {
    title: "Info & Stream",
    icon: <Info className="text-purple-400 w-6 h-6" />,
    commands: [
      { trigger: "!watchtime", desc: "Zeigt an, wie lange du dem Stream schon zugeschaut hast." },
      { trigger: "!nachrichten", desc: "Zeigt an, wie viele Nachrichten du schon geschrieben hast." },
      { trigger: "!held <name>", desc: "Verkünde deinen Wunschhelden lautstark im Chat.", cost: "25 💎" },
      { trigger: "!uptime", desc: "Wie lange läuft der Stream schon?" },
      { trigger: "!game", desc: "Zeigt das aktuelle Spiel und den Streamtitel." },
      { trigger: "!followage", desc: "Zeigt an, wie lange du dem Kanal schon folgst." },
      { trigger: "!accountage", desc: "Zeigt das Alter deines Twitch-Accounts." },
      { trigger: "!discord / !socials", desc: "Links zu Discord und Social Media." },
    ]
  }
];

export default function CommandsPage() {
  const [search, setSearch] = useState('');

  return (
    <div className="min-h-screen bg-[#050508] pt-12 pb-24 relative overflow-hidden text-slate-200 font-sans">
      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <header className="text-center mb-16">
          <div className="inline-block mb-4 p-4 rounded-full bg-white/5 border border-white/10 shadow-xl shadow-purple-900/20">
            <span className="text-5xl block animate-pulse">🦎</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
            Kanal-Befehle
          </h1>
          <p className="text-white/50 text-lg max-w-lg mx-auto">
            Hier findest du alle interaktiven Commands und Minigames für den Twitch Chat!
          </p>
        </header>

        <div className="max-w-md mx-auto mb-16 relative group">
          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-white/30 group-focus-within:text-purple-400 transition-colors" />
          </div>
          <input 
            type="text" 
            placeholder="Befehl suchen (z.B. !hug)..." 
            className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-14 pr-6 text-white outline-none focus:border-purple-500/50 focus:bg-black/40 transition-all focus:ring-4 focus:ring-purple-500/10 shadow-lg shadow-black/20"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {CATEGORIES.map((cat, i) => {
            const filtered = cat.commands.filter(c => 
              c.trigger.toLowerCase().includes(search.toLowerCase()) || 
              c.desc.toLowerCase().includes(search.toLowerCase())
            );

            if (filtered.length === 0) return null;

            return (
              <div key={i} className="bg-white/5 border border-white/10 rounded-[2rem] p-6 sm:p-8 backdrop-blur-xl hover:border-purple-500/30 transition-all hover:shadow-2xl hover:shadow-purple-900/10 duration-300">
                <h2 className="text-xl font-black text-white uppercase tracking-wider mb-6 flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 shadow-inner">
                    {cat.icon}
                  </div>
                  {cat.title}
                </h2>
                <div className="flex flex-col gap-4">
                  {filtered.map((cmd, j) => (
                    <div key={j} className="group/item flex flex-col gap-1.5 p-3 -mx-3 rounded-2xl hover:bg-white/5 transition-colors">
                      <div className="flex items-center justify-between gap-2">
                        <code className="bg-purple-500/10 border border-purple-500/20 text-purple-300 px-2.5 py-1 rounded-lg font-mono text-sm font-semibold tracking-wide shadow-sm">
                          {cmd.trigger}
                        </code>
                        {cmd.cost && (
                          <span className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-200 text-xs px-2 py-1 rounded-lg font-bold flex items-center gap-1 shadow-sm">
                            {cmd.cost}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-white/50 leading-relaxed px-1 group-hover/item:text-white/70 transition-colors">{cmd.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <footer className="mt-20 text-center text-white/30 text-sm font-medium tracking-wide">
          Bot Made by <span className="text-purple-400/70">Vani</span> for <span className="text-yellow-400/70">LordGecko</span>
        </footer>
      </div>
    </div>
  );
}
