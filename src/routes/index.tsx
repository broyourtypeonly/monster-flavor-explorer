import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight, Bookmark, Check, Heart, Search, ShieldCheck, Sparkles, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import ambientImage from "@/assets/flavor-lab-ambient.jpg";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Region = "India" | "Asia" | "International";
type Category = "Original" | "Ultra" | "Juice";
type Filter = "All" | Region | Category | "Favorites";

type Flavor = {
  id: string;
  name: string;
  shortName: string;
  flavor: string;
  region: Region;
  market: string;
  category: Category;
  source: string;
  sourceLabel: string;
  verified: string;
  can: string;
  ink: string;
  glow: string;
  art: string;
};

const flavors: Flavor[] = [
  {
    id: "original-green",
    name: "Monster Energy Original Green",
    shortName: "Original Green",
    flavor: "Sweet & salty exotic citrus",
    region: "India",
    market: "India",
    category: "Original",
    source: "https://www.monsterenergy.com/en-in/energy-drinks/monster-energy/original-green/",
    sourceLabel: "Monster Energy India",
    verified: "Listed on the official India product page as a smooth blend of sweet and salty exotic citrus flavors.",
    can: "bg-can-black",
    ink: "text-lab-green",
    glow: "glow-green",
    art: "M",
  },
  {
    id: "zero-ultra-india",
    name: "Monster Zero Ultra",
    shortName: "Zero Ultra",
    flavor: "Light, crisp & less sweet",
    region: "India",
    market: "India",
    category: "Ultra",
    source: "https://www.monsterenergy.com/en-in/energy-drinks/monster-ultra/zero-ultra/",
    sourceLabel: "Monster Energy India",
    verified: "Officially listed in India as The White Monster: lighter-tasting, zero calories, with the Monster energy blend.",
    can: "bg-can-silver",
    ink: "text-can-dark",
    glow: "glow-ice",
    art: "U",
  },
  {
    id: "pipeline-punch-india",
    name: "Juice Monster Pipeline Punch",
    shortName: "Pipeline Punch",
    flavor: "Passion fruit, orange & guava",
    region: "India",
    market: "India",
    category: "Juice",
    source: "https://www.monsterenergy.com/en-in/energy-drinks/",
    sourceLabel: "Monster Energy India",
    verified: "Pipeline Punch appears in the official India Juice Monster lineup. Availability may vary locally.",
    can: "bg-can-pink",
    ink: "text-can-dark",
    glow: "glow-pink",
    art: "P",
  },
  {
    id: "ultra-vice-guava-japan",
    name: "Monster Ultra Vice Guava",
    shortName: "Ultra Vice Guava",
    flavor: "Ripe guava",
    region: "Asia",
    market: "Japan",
    category: "Ultra",
    source: "https://www.monsterenergy.com/ja-jp/energy-drinks/monster-ultra/%E3%83%A2%E3%83%B3%E3%82%B9%E3%82%BF%E3%83%BC-%E3%82%A6%E3%83%AB%E3%83%88%E3%83%A9%E3%83%90%E3%82%A4%E3%82%B9%E3%82%B0%E3%82%A1%E3%83%90/",
    sourceLabel: "Monster Energy Japan",
    verified: "Official Japan listing identifies a zero-calorie, zero-sugar guava flavor, announced for the Japanese market in 2026.",
    can: "bg-can-guava",
    ink: "text-can-dark",
    glow: "glow-guava",
    art: "V",
  },
  {
    id: "ultra-paradise",
    name: "Monster Ultra Paradise",
    shortName: "Ultra Paradise",
    flavor: "Kiwi, apple, cucumber & lime",
    region: "International",
    market: "United States",
    category: "Ultra",
    source: "https://www.monsterenergy.com/en-us/energy-drinks/zero-sugar/ultra-paradise/",
    sourceLabel: "Monster Energy US",
    verified: "Official US listing describes juicy kiwi-apple flavor with cucumber and lime, with zero sugar.",
    can: "bg-can-paradise",
    ink: "text-can-dark",
    glow: "glow-green",
    art: "P",
  },
  {
    id: "ultra-peachy-keen",
    name: "Monster Ultra Peachy Keen",
    shortName: "Ultra Peachy Keen",
    flavor: "Juicy peach",
    region: "International",
    market: "United States",
    category: "Ultra",
    source: "https://www.monsterenergy.com/en-us/energy-drinks/zero-sugar/ultra-peachy-keen/",
    sourceLabel: "Monster Energy US",
    verified: "Official US listing describes a sweet, smooth, refreshing peach flavor with zero sugar.",
    can: "bg-can-peach",
    ink: "text-can-dark",
    glow: "glow-peach",
    art: "K",
  },
  {
    id: "ultra-violet",
    name: "Monster Ultra Violet",
    shortName: "Ultra Violet",
    flavor: "Light citrus & grape",
    region: "International",
    market: "Australia",
    category: "Ultra",
    source: "https://www.monsterenergy.com/en-au/energy-drinks/monster-ultra/zero-sugar-ultra-violet/",
    sourceLabel: "Monster Energy Australia",
    verified: "Official Australia listing calls it The Purple Monster; the official US page describes citrus and grape notes.",
    can: "bg-can-violet",
    ink: "text-foreground",
    glow: "glow-violet",
    art: "V",
  },
  {
    id: "fantasy-ruby-red",
    name: "Monster Ultra Fantasy Ruby Red",
    shortName: "Fantasy Ruby Red",
    flavor: "Grapefruit & citrus",
    region: "International",
    market: "United States",
    category: "Ultra",
    source: "https://www.monsterenergy.com/en-us/energy-drinks/zero-sugar/ultra-fantasy-ruby-red/",
    sourceLabel: "Monster Energy US",
    verified: "Official US listing describes grapefruit flavor with a citrus punch, zero sugar and low calories.",
    can: "bg-can-ruby",
    ink: "text-foreground",
    glow: "glow-ruby",
    art: "R",
  },
  {
    id: "mango-loco",
    name: "Juice Monster Mango Loco",
    shortName: "Mango Loco",
    flavor: "Mango & exotic fruit juice",
    region: "International",
    market: "United States",
    category: "Juice",
    source: "https://www.monsterenergy.com/en-us/energy-drinks/juice-monster/mango-loco/",
    sourceLabel: "Monster Energy US",
    verified: "Official US listing describes juicy mango blended with real fruit juice and the Monster energy blend.",
    can: "bg-can-mango",
    ink: "text-can-dark",
    glow: "glow-mango",
    art: "L",
  },
  {
    id: "bad-apple",
    name: "Juice Monster Bad Apple",
    shortName: "Bad Apple",
    flavor: "Crisp Fuji apple",
    region: "International",
    market: "United States",
    category: "Juice",
    source: "https://www.monsterenergy.com/en-us/energy-drinks/juice-monster/bad-apple/",
    sourceLabel: "Monster Energy US",
    verified: "Official US listing describes a crisp Fuji apple flavor made with real apple juice.",
    can: "bg-can-apple",
    ink: "text-can-dark",
    glow: "glow-apple",
    art: "B",
  },
  {
    id: "ripper",
    name: "Juiced Monster Ripper",
    shortName: "Ripper",
    flavor: "Tropical juice blend",
    region: "International",
    market: "United Kingdom",
    category: "Juice",
    source: "https://www.monsterenergy.com/en-gb/energy-drinks/juiced-monster/ripper/",
    sourceLabel: "Monster Energy UK",
    verified: "Official UK listing describes a tropical juice flavor combination. No India availability is implied.",
    can: "bg-can-ripper",
    ink: "text-can-dark",
    glow: "glow-ripper",
    art: "R",
  },
];

const filters: Filter[] = ["All", "India", "Asia", "International", "Ultra", "Juice", "Original"];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MONSTER FLAVOR LAB — Independent Flavor Catalog" },
      { name: "description", content: "Explore a sourced visual catalog of Monster Energy flavors from India, Asia, and international markets." },
      { property: "og:title", content: "MONSTER FLAVOR LAB" },
      { property: "og:description", content: "Explore the flavors. Discover the regions. An independent visual catalog." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FlavorLab,
});

function FlavorLab() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Flavor | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("monster-flavor-lab-favorites");
      if (stored) setFavorites(JSON.parse(stored) as string[]);
    } catch {
      setFavorites([]);
    }
  }, []);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return flavors.filter((item) => {
      const matchesFilter = activeFilter === "All" || item.region === activeFilter || item.category === activeFilter;
      const matchesSearch = !needle || [item.name, item.flavor, item.market, item.category].join(" ").toLowerCase().includes(needle);
      const matchesFavorites = !showFavorites || favorites.includes(item.id);
      return matchesFilter && matchesSearch && matchesFavorites;
    });
  }, [activeFilter, query, showFavorites, favorites]);

  const toggleFavorite = (id: string) => {
    setFavorites((current) => {
      const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
      window.localStorage.setItem("monster-flavor-lab-favorites", JSON.stringify(next));
      return next;
    });
  };

  const selectRegion = (filter: Filter) => {
    setActiveFilter(filter);
    setShowFavorites(false);
    document.querySelector("#explore")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className={cn("min-h-screen overflow-hidden bg-background text-foreground", selected?.glow)}>
      <header className="fixed inset-x-0 top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto grid h-16 max-w-[1500px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 sm:px-6 lg:px-10">
          <a href="#top" className="flex min-w-0 items-center gap-3" aria-label="Monster Flavor Lab home">
            <span className="brand-mark shrink-0">M</span>
            <span className="truncate font-display text-lg uppercase">Flavor Lab</span>
          </a>
          <nav aria-label="Primary navigation" className="hidden items-center gap-7 lg:flex">
            {(["Explore", "India", "Asia", "Imported", "Flavors", "About"] as const).map((item) => (
              <a key={item} href={item === "About" ? "#about" : "#explore"} onClick={() => item === "India" ? selectRegion("India") : item === "Asia" ? selectRegion("Asia") : item === "Imported" ? selectRegion("International") : undefined} className="nav-link">{item}</a>
            ))}
          </nav>
          <Button variant="outline" size="sm" className="lab-outline" onClick={() => { setShowFavorites((value) => !value); document.querySelector("#explore")?.scrollIntoView({ behavior: "smooth" }); }} aria-pressed={showFavorites}>
            <Bookmark /> <span className="hidden sm:inline">My Flavor List</span><span className="tabular-nums">{favorites.length}</span>
          </Button>
        </div>
      </header>

      <section id="top" className="hero-lab relative flex min-h-[92svh] items-end overflow-hidden px-4 pb-14 pt-28 sm:px-6 lg:px-10">
        <img src={ambientImage} alt="Citrus fruit and liquid suspended against a black background" width={1920} height={1080} className="absolute inset-0 h-full w-full object-cover" />
        <div className="hero-shade absolute inset-0" />
        <div className="hero-grid absolute inset-0" aria-hidden="true" />
        <div className="relative z-10 mx-auto grid w-full max-w-[1500px] items-end gap-10 lg:grid-cols-[minmax(0,1fr)_auto]">
          <div className="max-w-5xl">
            <div className="mb-7 flex items-center gap-3 text-xs uppercase text-muted-foreground"><span className="h-px w-9 bg-primary" /> Independent archive · Edition 01</div>
            <h1 className="font-display text-[clamp(4.3rem,12vw,11.5rem)] uppercase leading-[0.72] text-balance">Monster<br/><span className="text-primary">Flavor Lab</span></h1>
            <p className="mt-8 max-w-xl text-lg text-muted-foreground sm:text-2xl">Explore the flavors. Discover the regions.</p>
          </div>
          <a href="#explore" className="group flex items-center gap-3 text-xs uppercase text-muted-foreground"><span className="grid size-11 place-items-center rounded-full border border-border transition group-hover:border-primary group-hover:text-primary"><ArrowDown /></span> Enter the archive</a>
        </div>
      </section>

      <section id="explore" className="relative mx-auto max-w-[1500px] px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
        <div className="mb-12 grid gap-8 border-b border-border pb-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div>
            <p className="section-index">01 / THE CATALOG</p>
            <h2 className="mt-3 font-display text-5xl uppercase sm:text-7xl">Verified flavors</h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground">Region means the official Monster website where this product was verified. International listings do not indicate availability in India.</p>
          </div>
          <div className="relative w-full lg:w-80">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search name, flavor, market…" aria-label="Search flavors" className="lab-input h-12 pl-10 pr-10" />
            {query && <Button variant="ghost" size="icon" aria-label="Clear search" className="absolute right-1.5 top-1.5" onClick={() => setQuery("")}><X /></Button>}
          </div>
        </div>

        <div className="mb-10 flex gap-2 overflow-x-auto pb-3" aria-label="Flavor filters">
          {filters.map((filter) => <Button key={filter} variant="outline" size="sm" aria-pressed={!showFavorites && activeFilter === filter} onClick={() => { setActiveFilter(filter); setShowFavorites(false); }} className="filter-button shrink-0">{filter}</Button>)}
          <Button variant="outline" size="sm" aria-pressed={showFavorites} onClick={() => setShowFavorites((value) => !value)} className="filter-button shrink-0"><Heart /> My list</Button>
        </div>

        <div className="mb-7 flex items-center justify-between text-xs uppercase text-muted-foreground"><span>{visible.length.toString().padStart(2, "0")} records</span><span>Official sources linked</span></div>
        {visible.length ? (
          <div className="grid gap-px bg-border sm:grid-cols-2 xl:grid-cols-3">
            {visible.map((flavor, index) => (
              <article key={flavor.id} className={cn("product-card group relative bg-card p-5 transition duration-500", selected?.id === flavor.id && "is-selected")} style={{ animationDelay: `${Math.min(index * 45, 300)}ms` }}>
                <div className="flex items-start justify-between">
                  <div className="flex gap-2"><span className="meta-pill">{flavor.region}</span><span className="meta-pill">{flavor.category}</span></div>
                  <Button variant="ghost" size="icon" aria-label={`${favorites.includes(flavor.id) ? "Remove" : "Add"} ${flavor.shortName} ${favorites.includes(flavor.id) ? "from" : "to"} My Flavor List`} aria-pressed={favorites.includes(flavor.id)} onClick={() => toggleFavorite(flavor.id)} className="favorite-button">
                    <Heart className={cn(favorites.includes(flavor.id) && "fill-current text-primary")} />
                  </Button>
                </div>
                <button className="can-stage block w-full cursor-pointer" onClick={() => setSelected(flavor)} aria-label={`View ${flavor.name}`}>
                  <span className={cn("can-object", flavor.can, flavor.ink)} aria-hidden="true"><span className="can-rim"/><span className="can-brand">MONSTER</span><strong>{flavor.art}</strong><span className="can-line">{flavor.category}</span></span>
                </button>
                <div className="border-t border-border pt-5">
                  <div className="mb-2 flex items-center gap-2 text-[0.65rem] uppercase text-verified"><ShieldCheck className="size-3.5" /> Verified · {flavor.market}</div>
                  <h3 className="font-display text-3xl uppercase leading-none">{flavor.shortName}</h3>
                  <p className="mt-2 min-h-10 text-sm text-muted-foreground">{flavor.flavor}</p>
                  <Button variant="ghost" className="mt-4 h-auto p-0 uppercase text-primary hover:bg-transparent hover:text-primary/80" onClick={() => setSelected(flavor)}>View flavor <ArrowUpRight /></Button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="grid min-h-72 place-items-center border border-border bg-card text-center"><div><Search className="mx-auto mb-4 text-muted-foreground"/><h3 className="font-display text-3xl uppercase">No flavors found</h3><p className="mt-2 text-sm text-muted-foreground">Try another search or filter.</p></div></div>
        )}
      </section>

      <section id="about" className="border-y border-border bg-secondary/30 px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
        <div className="mx-auto grid max-w-[1500px] gap-12 lg:grid-cols-[0.65fr_1.35fr]">
          <div><p className="section-index">02 / ABOUT</p><Sparkles className="mt-8 size-9 text-primary" /></div>
          <div><h2 className="max-w-4xl font-display text-4xl uppercase leading-[0.95] sm:text-6xl">An independent visual catalog exploring Monster Energy products and regional flavor variations.</h2><div className="mt-10 grid gap-6 border-t border-border pt-8 text-sm leading-6 text-muted-foreground sm:grid-cols-2"><p>Product availability varies by country. A regional official listing verifies the product information shown here; it does not establish retail or import availability elsewhere.</p><p>Not affiliated with or endorsed by Monster Energy. Monster Energy names, logos, product names and imagery are trademarks or property of their respective owners.</p></div></div>
        </div>
      </section>

      <footer className="px-4 py-12 sm:px-6 lg:px-10">
        <div className="mx-auto grid max-w-[1500px] gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div><div className="font-display text-3xl uppercase">Monster Flavor Lab</div><p className="mt-2 text-xs uppercase text-muted-foreground">Independent catalog · No sales · No affiliation</p></div>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-xs uppercase text-muted-foreground">
            <a className="source-link" href="https://www.monsterenergy.com/en-in/energy-drinks/" target="_blank" rel="noreferrer">India <ArrowUpRight /></a>
            <a className="source-link" href="https://www.monsterenergy.com/ja-jp/energy-drinks/" target="_blank" rel="noreferrer">Japan <ArrowUpRight /></a>
            <a className="source-link" href="https://www.monsterenergy.com/en-us/energy-drinks/" target="_blank" rel="noreferrer">United States <ArrowUpRight /></a>
            <a className="source-link" href="https://www.monsterenergy.com/en-gb/energy-drinks/" target="_blank" rel="noreferrer">United Kingdom <ArrowUpRight /></a>
            <a className="source-link" href="https://www.monsterenergy.com/en-au/energy-drinks/" target="_blank" rel="noreferrer">Australia <ArrowUpRight /></a>
          </div>
        </div>
      </footer>

      <Dialog open={Boolean(selected)} onOpenChange={(open) => !open && setSelected(null)}>
        {selected && <DialogContent className={cn("flavor-dialog max-h-[92vh] max-w-4xl overflow-y-auto", selected.glow)}>
          <DialogHeader className="sr-only"><DialogTitle>{selected.name}</DialogTitle><DialogDescription>Verified flavor details and official source.</DialogDescription></DialogHeader>
          <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-center">
            <div className="modal-stage">
              <span className={cn("can-object can-object-large", selected.can, selected.ink)} aria-hidden="true"><span className="can-rim"/><span className="can-brand">MONSTER</span><strong>{selected.art}</strong><span className="can-line">{selected.category}</span></span>
              <span className="liquid-ring" aria-hidden="true" />
            </div>
            <div>
              <p className="section-index">Flavor record / {selected.market}</p>
              <h2 className="mt-4 font-display text-5xl uppercase leading-[0.88] sm:text-7xl">{selected.shortName}</h2>
              <dl className="mt-8 divide-y divide-border border-y border-border text-sm">
                {[ ["Name", selected.name], ["Region", `${selected.region} · ${selected.market}`], ["Flavor", selected.flavor], ["Category", selected.category] ].map(([term, value]) => <div key={term} className="grid grid-cols-[6rem_1fr] gap-4 py-3"><dt className="text-[0.65rem] uppercase text-muted-foreground">{term}</dt><dd>{value}</dd></div>)}
              </dl>
              <div className="mt-6 rounded-md border border-verified/30 bg-verified/5 p-4"><div className="mb-2 flex items-center gap-2 text-xs uppercase text-verified"><Check className="size-4" /> Verified info</div><p className="text-sm leading-6 text-muted-foreground">{selected.verified}</p></div>
              <p className="mt-4 text-xs leading-5 text-muted-foreground">Verification reflects the linked official regional page only. It does not imply availability in India or any other market.</p>
              <Button asChild className="mt-7 w-full sm:w-auto"><a href={selected.source} target="_blank" rel="noreferrer">Official source · {selected.sourceLabel}<ArrowUpRight /></a></Button>
            </div>
          </div>
        </DialogContent>}
      </Dialog>
    </main>
  );
}
