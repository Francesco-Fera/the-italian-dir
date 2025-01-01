import Link from "next/link";

const sections = [
  {
    title: "Startup per Regione",
    links: [
      { name: "Lombardia", href: "/regioni/lombardia" },
      { name: "Lazio", href: "/regioni/lazio" },
      { name: "Campania", href: "/regioni/campania" },
      { name: "Emilia-Romagna", href: "/regioni/emilia-romagna" },
      { name: "Piemonte", href: "/regioni/piemonte" },
      { name: "Veneto", href: "/regioni/veneto" },
      { name: "Toscana", href: "/regioni/toscana" },
      { name: "Abruzzo", href: "/regioni/abruzzo" },
      { name: "Basilicata", href: "/regioni/basilicata" },
      { name: "Calabria", href: "/regioni/calabria" },
      { name: "Sicilia", href: "/regioni/sicilia" },
      { name: "Sardegna", href: "/regioni/sardegna" },
      { name: "Puglia", href: "/regioni/puglia" },
      { name: "Umbria", href: "/regioni/umbria" },
      { name: "Tutte le regioni", href: "/regioni" },
    ],
  },
  {
    title: "Startup per Categoria",
    links: [
      { name: "Travel", href: "/categoria/travel" },
      { name: "Health & Fitness", href: "/categoria/health-fitness" },
      { name: "Events", href: "/categoria/events" },
      { name: "Food & Beverage", href: "/categoria/food-beverage" },
      { name: "AgriTech", href: "/categoria/agritech" },
      { name: "Automotive", href: "/categoria/automotive" },
      { name: "EdTech", href: "/categoria/edtech" },
      { name: "Finance", href: "/categoria/finance" },
      { name: "Gaming", href: "/categoria/gaming" },
      { name: "Tech", href: "/categoria/tech" },
      { name: "Lifestyle", href: "/categoria/lifestyle" },
      { name: "Education", href: "/categoria/" },
      { name: "Marketplace", href: "/categoria/" },
      { name: "AI & Machine Learning", href: "/categoria/" },
      { name: "Biotech", href: "/categoria/" },
      { name: "Tutte le categorie", href: "/categoria" },
    ],
  },
  {
    title: "Links",
    links: [
      { name: "Il Progetto", href: "#" },
      { name: "Open Source", href: "#" },
      { name: "Sostieni il Progetto", href: "#" },
      { name: "Climate", href: "#" },
      { name: "Aggiungi una Startup", href: "#" },
    ],
  },
  {
    title: "Altro",
    links: [
      { name: "MCF Digital", href: "https://mcf-digital.com" },
      { name: "Helpy Travel", href: "https://helpytravel.com" },
      {
        name: "Idea, Prototipo, Prodotto",
        href: "https://ideaprototipoprodotto.com",
      },
    ],
  },
];

const Footer = () => {
  return (
    <section className='py-32 '>
      <div className='container'>
        <footer>
          <div className='grid grid-cols-2 gap-8 lg:grid-cols-6 px-8 sm:px-16'>
            <div className='col-span-2 lg:grid-span-1 mb-8 lg:mb-0'>
              <Link href='/'>
                <h1 className='text-2xl font-semibold font-[family-name:var(--font-geist-mono)]'>
                  Italian<span className='text-primary'>_dir</span>
                </h1>
              </Link>
              <p className='text-sm'>Directory delle startup italiane.</p>
            </div>
            {sections.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className='mb-4 font-bold'>{section.title}</h3>
                <ul className='text-muted-foreground text-sm'>
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className='font-medium hover:text-primary'
                    >
                      <Link href={link.href}>{link.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className='mt-24 px-8 sm:px-16 flex flex-col justify-between gap-4 border-t pt-8 text-sm font-medium text-muted-foreground md:flex-row md:items-center'>
            <p>
              &copy; {new Date().getFullYear()} Italian_dir è un progetto di{" "}
              <Link
                href='https://francescofera.com'
                className='underline hover:text-primary'
              >
                Francesco Fera
              </Link>
              .
            </p>
            <ul className='flex gap-4'>
              <li className='underline hover:text-primary'>
                <Link href='#'> Terms and Conditions</Link>
              </li>
              <li className='underline hover:text-primary'>
                <Link href='#'> Privacy Policy</Link>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default Footer;
