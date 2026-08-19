/* eslint-disable @next/next/no-img-element */
"use client";

import { useMemo, useState } from "react";

type Locale = "en" | "ru";
type WorkKind = "video" | "photo";
type Filter = "selected" | "video" | "photo" | "cars" | "people";

type Copy = {
  title: string;
  role: string;
  place: string;
  intro: string;
  navWork: string;
  navAbout: string;
  navContact: string;
  viewWork: string;
  contact: string;
  selected: string;
  video: string;
  photo: string;
  cars: string;
  people: string;
  aboutTitle: string;
  aboutBody: string;
  services: string[];
  contactTitle: string;
  contactBody: string;
  open: string;
  close: string;
  allWork: string;
};

type WorkItem = {
  id: string;
  title: string;
  titleRu: string;
  kind: WorkKind;
  tags: Filter[];
  year: string;
  note: string;
  noteRu: string;
  driveId: string;
  aspect: "wide" | "portrait" | "square" | "tall";
  featured?: boolean;
};

const copy: Record<Locale, Copy> = {
  en: {
    title: "Yernur Visuals",
    role: "Photographer / Videographer / Editor",
    place: "Kazakhstan",
    intro:
      "Cinematic edits, stills and short-form work for cars, people, podcasts and commercial formats.",
    navWork: "Work",
    navAbout: "About",
    navContact: "Contact",
    viewWork: "View work",
    contact: "Contact",
    selected: "Selected",
    video: "Video",
    photo: "Photo",
    cars: "Cars",
    people: "People",
    aboutTitle: "About",
    aboutBody:
      "Yernur Visuals is a personal photo, video and editing portfolio focused on automotive visuals, portraits, reels, podcast clips and short commercial work.",
    services: ["Shooting", "Editing", "Subtitles", "Sound design"],
    contactTitle: "Contact",
    contactBody: "For shoots, reels, edits and small commercial projects.",
    open: "Open",
    close: "Close",
    allWork: "All work",
  },
  ru: {
    title: "Yernur Visuals",
    role: "Фотограф / Видеограф / Монтажер",
    place: "Казахстан",
    intro:
      "Киношные эдиты, фотографии и короткий формат для авто, людей, подкастов и коммерческих задач.",
    navWork: "Работы",
    navAbout: "О проекте",
    navContact: "Контакт",
    viewWork: "Смотреть работы",
    contact: "Контакт",
    selected: "Избранное",
    video: "Видео",
    photo: "Фото",
    cars: "Авто",
    people: "Люди",
    aboutTitle: "О проекте",
    aboutBody:
      "Yernur Visuals - личное портфолио о съемке и монтаже: авто, портреты, рилсы, подкасты и короткие коммерческие ролики.",
    services: ["Съемка", "Монтаж", "Субтитры", "Звук"],
    contactTitle: "Контакты",
    contactBody: "Для съемок, рилсов, эдитов и небольших коммерческих проектов.",
    open: "Открыть",
    close: "Закрыть",
    allWork: "Все работы",
  },
};

const filters: Filter[] = ["selected", "video", "photo", "cars", "people"];

const works: WorkItem[] = [
  {
    id: "porsche-slay",
    title: "Porsche Edit",
    titleRu: "Porsche Edit",
    kind: "video",
    tags: ["selected", "video", "cars"],
    year: "2025",
    note: "Automotive edit with captions and rhythm cuts.",
    noteRu: "Авто-эдит с субтитрами и ритмичным монтажом.",
    driveId: "1qII4RbkJjze8JjCsS7qVN07IBihuKebQ",
    aspect: "portrait",
    featured: true,
  },
  {
    id: "alikh-podcast",
    title: "Podcast Clip",
    titleRu: "Podcast Clip",
    kind: "video",
    tags: ["selected", "video", "people"],
    year: "2026",
    note: "Interview reel with hook, subtitles, animation and sound.",
    noteRu: "Интервью-ролик с хуком, субтитрами, анимацией и звуком.",
    driveId: "1LOSPEA-JYydg2Baiz4XF6wzbfXaRBVCY",
    aspect: "portrait",
    featured: true,
  },
  {
    id: "cinema-dice",
    title: "Dice Scene",
    titleRu: "Dice Scene",
    kind: "video",
    tags: ["selected", "video"],
    year: "2026",
    note: "Short cinematic reel built around tension and sound.",
    noteRu: "Короткий киношный ролик с напряжением и звуком.",
    driveId: "1_FOnV_O4gmHMIM7_U7zDQXajn5iHLQSS",
    aspect: "portrait",
    featured: true,
  },
  {
    id: "pc-club",
    title: "PC Club Ad",
    titleRu: "PC Club Ad",
    kind: "video",
    tags: ["selected", "video"],
    year: "2025",
    note: "Target ad with talking intro and edit sequence.",
    noteRu: "Ролик для таргета: говорящая подводка и эдит.",
    driveId: "1wVXVg7C7D0Yr-D8ibn03BuE2AyinT2pM",
    aspect: "portrait",
    featured: true,
  },
  {
    id: "gelen-trend",
    title: "Gelen Trend",
    titleRu: "Gelen Trend",
    kind: "video",
    tags: ["selected", "video", "cars"],
    year: "2025",
    note: "Trend-based automotive edit.",
    noteRu: "Трендовый авто-эдит.",
    driveId: "1QUBfoKyAsaYFf5VX-lqh3mtZ2kziJs6X",
    aspect: "portrait",
  },
  {
    id: "u-look-lonely",
    title: "Lonely Car",
    titleRu: "Lonely Car",
    kind: "video",
    tags: ["selected", "video", "cars"],
    year: "2025",
    note: "Playful character edit for a car.",
    noteRu: "Игровой эдит, где машина получает характер.",
    driveId: "1y_iroULf4BRbElr54Ncam8Tz_hfqRb41",
    aspect: "portrait",
  },
  {
    id: "prado",
    title: "Prado Trend",
    titleRu: "Prado Trend",
    kind: "video",
    tags: ["video", "cars"],
    year: "2025",
    note: "Fast automotive trend edit.",
    noteRu: "Быстрый трендовый авто-эдит.",
    driveId: "1sXokGkL-nBga0ffjP_OtCfgPDaa740lk",
    aspect: "portrait",
  },
  {
    id: "audi-r8",
    title: "Audi R8",
    titleRu: "Audi R8",
    kind: "video",
    tags: ["selected", "video", "cars"],
    year: "2025",
    note: "Short car edit with atmospheric opening.",
    noteRu: "Короткий авто-эдит с атмосферным началом.",
    driveId: "1_mzHTuNgQwIjQpPxFFdLfNhSLggGQfs8",
    aspect: "portrait",
  },
  {
    id: "mercedes-damir",
    title: "Mercedes Damir",
    titleRu: "Mercedes Damir",
    kind: "video",
    tags: ["video", "cars"],
    year: "2025",
    note: "Automotive edit with clean motion beats.",
    noteRu: "Авто-эдит с чистыми монтажными акцентами.",
    driveId: "1OSgMfNwpfuwtHPAykwTVi-fixLsYWBvy",
    aspect: "portrait",
  },
  {
    id: "bmw-5s",
    title: "BMW 5S",
    titleRu: "BMW 5S",
    kind: "video",
    tags: ["video", "cars"],
    year: "2025",
    note: "Car reel with movement and caption work.",
    noteRu: "Авто-ролик с движением и субтитрами.",
    driveId: "18fmFaW4FU6H-7xq07B6-56FXDdLVqef_",
    aspect: "portrait",
  },
  {
    id: "ala-dtl",
    title: "ALA DTL Screen",
    titleRu: "ALA DTL Screen",
    kind: "video",
    tags: ["video"],
    year: "2024",
    note: "Practical screen effect for headlight options.",
    noteRu: "Практический экран-эффект с выбором света фар.",
    driveId: "1FgPmPWnG_At4k2nSepCApAK5cvY1DRUB",
    aspect: "portrait",
  },
  {
    id: "rolls-series",
    title: "White Rolls",
    titleRu: "White Rolls",
    kind: "photo",
    tags: ["selected", "photo", "cars"],
    year: "2024",
    note: "Automotive photo series.",
    noteRu: "Серия автомобильных фото.",
    driveId: "1Xnz3NoPOlakMJUZov96ShzdR8zPlGHyM",
    aspect: "wide",
    featured: true,
  },
  {
    id: "rolls-angle",
    title: "Rolls Side",
    titleRu: "Rolls Side",
    kind: "photo",
    tags: ["selected", "photo", "cars"],
    year: "2024",
    note: "Premium car still.",
    noteRu: "Кадр премиальной машины.",
    driveId: "1LqtQQe0rewOoNN1pvnOYcP8kpuq7LtVN",
    aspect: "square",
  },
  {
    id: "black-car-brick",
    title: "Black Car, Brick Wall",
    titleRu: "Черная машина, кирпич",
    kind: "photo",
    tags: ["selected", "photo", "cars"],
    year: "2024",
    note: "Urban automotive frame.",
    noteRu: "Городской авто-кадр.",
    driveId: "16j5d9jiU77IIpl8ZsoUavPjL8nAzFUHB",
    aspect: "wide",
  },
  {
    id: "white-car-sea",
    title: "White Car, Sea",
    titleRu: "Белая машина, море",
    kind: "photo",
    tags: ["selected", "photo", "cars"],
    year: "2024",
    note: "Clean car still with open background.",
    noteRu: "Чистый авто-кадр с открытым фоном.",
    driveId: "1nDuGEYQFoP9PF0SlQedyWD6eW-pYB3xH",
    aspect: "wide",
  },
  {
    id: "headlight-detail",
    title: "Headlight Detail",
    titleRu: "Деталь фары",
    kind: "photo",
    tags: ["selected", "photo", "cars"],
    year: "2024",
    note: "Close-up automotive detail.",
    noteRu: "Крупный план автомобильной детали.",
    driveId: "1aUEa-UjqVmpMBykP_ihKst_PnTdwEE_-",
    aspect: "square",
  },
  {
    id: "orange-detail",
    title: "Orange Detail",
    titleRu: "Оранжевая деталь",
    kind: "photo",
    tags: ["photo", "cars"],
    year: "2024",
    note: "Color and reflection study.",
    noteRu: "Цвет и отражения в деталях.",
    driveId: "1kM-bpd8DpsPp0xhzg1XZivLMPwKv6wd7",
    aspect: "square",
  },
  {
    id: "portrait-sky",
    title: "Portrait, Open Sky",
    titleRu: "Портрет, открытое небо",
    kind: "photo",
    tags: ["selected", "photo", "people"],
    year: "2025",
    note: "Portrait frame with clean negative space.",
    noteRu: "Портрет с чистым свободным пространством.",
    driveId: "1jSoT8wPfRdXIGndgNnH2Bvx9EVBh1GwB",
    aspect: "square",
  },
  {
    id: "city-portrait",
    title: "City Portrait",
    titleRu: "Городской портрет",
    kind: "photo",
    tags: ["selected", "photo", "people"],
    year: "2025",
    note: "Portrait with city light and car context.",
    noteRu: "Портрет с городским светом и авто-контекстом.",
    driveId: "1NxBqShSGRFsQNFjk6QgIsFMZRI06iukc",
    aspect: "wide",
  },
  {
    id: "mountain-people",
    title: "Mountain People",
    titleRu: "Люди в горах",
    kind: "photo",
    tags: ["photo", "people"],
    year: "2025",
    note: "Outdoor portrait series.",
    noteRu: "Портретная серия на природе.",
    driveId: "1AKhgcs8CYD7bEUij1OjjEuhlbmuI9Gl8",
    aspect: "wide",
  },
  {
    id: "campus-portrait",
    title: "Campus Portrait",
    titleRu: "Портрет у кампуса",
    kind: "photo",
    tags: ["photo", "people"],
    year: "2024",
    note: "Editorial-style portrait.",
    noteRu: "Портрет в editorial-настроении.",
    driveId: "1hi9V24Qn9aZ4ImkbyndfogT3ok1MoHHu",
    aspect: "portrait",
  },
];

function thumb(id: string, size = 1600) {
  return `https://lh3.googleusercontent.com/d/${id}=w${size}`;
}

function driveView(id: string) {
  return `https://drive.google.com/file/d/${id}/view`;
}

function drivePreview(id: string) {
  return `https://drive.google.com/file/d/${id}/preview`;
}

export default function Home() {
  const [locale, setLocale] = useState<Locale>("en");
  const [activeFilter, setActiveFilter] = useState<Filter>("selected");
  const [activeWork, setActiveWork] = useState<WorkItem | null>(null);
  const t = copy[locale];

  const visibleWorks = useMemo(() => {
    return works.filter((work) => work.tags.includes(activeFilter));
  }, [activeFilter]);

  const heroItems = works.filter((work) => work.featured).slice(0, 4);

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <header className="site-header">
        <a
          href="#top"
          className="brand-link"
          aria-label="Yernur Visuals home"
          translate="no"
        >
          Yernur Visuals
        </a>
        <nav aria-label="Primary navigation" className="nav-links">
          <a href="#work">{t.navWork}</a>
          <a href="#about">{t.navAbout}</a>
          <a href="#contact">{t.navContact}</a>
          <button
            type="button"
            className="locale-toggle"
            onClick={() => setLocale(locale === "en" ? "ru" : "en")}
            aria-label="Switch language"
          >
            {locale === "en" ? "RU" : "EN"}
          </button>
        </nav>
      </header>

      <section id="top" className="hero-section">
        <div className="hero-copy">
          <p className="hero-kicker">{t.place}</p>
          <h1 translate="no">{t.title}</h1>
          <p className="hero-role">{t.role}</p>
          <p className="hero-intro">{t.intro}</p>
          <div className="hero-actions">
            <a href="#work" className="primary-action">
              {t.viewWork}
            </a>
            <a href="#contact" className="secondary-action">
              {t.contact}
            </a>
          </div>
        </div>

        <div className="hero-media" aria-label="Selected work preview">
          {heroItems.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className={`hero-frame hero-frame-${index + 1}`}
              onClick={() => setActiveWork(item)}
              aria-label={`${t.open} ${locale === "en" ? item.title : item.titleRu}`}
            >
              <img
                src={thumb(item.driveId, 1400)}
                alt=""
                width={1400}
                height={1800}
                fetchPriority={index === 0 ? "high" : undefined}
                loading="eager"
                referrerPolicy="no-referrer"
              />
            </button>
          ))}
        </div>
      </section>

      <section id="work" className="work-section">
        <div className="section-heading">
          <h2>{t.allWork}</h2>
          <p>
            {locale === "en"
              ? "Reels, edits and stills selected for pace, light and clear client-facing presentation."
              : "Рилсы, эдиты и фотографии с фокусом на ритм, свет и подачу."}
          </p>
        </div>

        <div className="filter-row" role="tablist" aria-label="Work filters">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              role="tab"
              aria-selected={activeFilter === filter}
              className={activeFilter === filter ? "filter active" : "filter"}
              onClick={() => setActiveFilter(filter)}
            >
              {t[filter]}
            </button>
          ))}
        </div>

        <div className="work-grid">
          {visibleWorks.map((item, index) => (
            <article
              key={item.id}
              className={`work-card ${item.aspect} card-offset-${index % 4}`}
            >
              <button
                type="button"
                className="media-button"
                onClick={() => setActiveWork(item)}
                aria-label={`${t.open} ${locale === "en" ? item.title : item.titleRu}`}
              >
                <img
                  src={thumb(item.driveId, 1100)}
                  alt={locale === "en" ? item.title : item.titleRu}
                  width={1100}
                  height={1400}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <span className="media-kind">{item.kind}</span>
              </button>
              <div className="work-meta">
                <div>
                  <h3>{locale === "en" ? item.title : item.titleRu}</h3>
                  <p>{locale === "en" ? item.note : item.noteRu}</p>
                </div>
                <span>{item.year}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="about" className="about-section">
        <div>
          <h2>{t.aboutTitle}</h2>
          <p>{t.aboutBody}</p>
        </div>
        <ul className="service-list" aria-label="Services">
          {t.services.map((service) => (
            <li key={service}>{service}</li>
          ))}
        </ul>
      </section>

      <section id="contact" className="contact-section">
        <div>
          <h2>{t.contactTitle}</h2>
          <p>{t.contactBody}</p>
        </div>
        <div className="contact-links">
          <a href="https://www.instagram.com/ernur_shots" target="_blank" rel="noreferrer">
            Instagram
            <span>@ernur_shots</span>
          </a>
          <a href="https://t.me/Kaorukooo0" target="_blank" rel="noreferrer">
            Telegram
            <span>@Kaorukooo0</span>
          </a>
          <a href="mailto:yernurcontact@gmail.com">
            Email
            <span>yernurcontact@gmail.com</span>
          </a>
        </div>
      </section>

      <footer className="site-footer">
        <span translate="no">Yernur Visuals</span>
        <span>{t.role}</span>
      </footer>

      {activeWork ? (
        <div
          className="viewer"
          role="dialog"
          aria-modal="true"
          aria-label={locale === "en" ? activeWork.title : activeWork.titleRu}
        >
          <button
            type="button"
            className="viewer-backdrop"
            onClick={() => setActiveWork(null)}
            tabIndex={-1}
            aria-hidden="true"
          />
          <div className="viewer-panel">
            <div className="viewer-topbar">
              <div>
                <h2>{locale === "en" ? activeWork.title : activeWork.titleRu}</h2>
                <p>{locale === "en" ? activeWork.note : activeWork.noteRu}</p>
              </div>
              <button
                type="button"
                className="viewer-close"
                onClick={() => setActiveWork(null)}
              >
                {t.close}
              </button>
            </div>
            {activeWork.kind === "video" ? (
              <iframe
                title={locale === "en" ? activeWork.title : activeWork.titleRu}
                className={
                  activeWork.aspect === "portrait" ? "portrait-frame" : undefined
                }
                src={drivePreview(activeWork.driveId)}
                allow="autoplay"
                allowFullScreen
              />
            ) : (
              <a
                href={driveView(activeWork.driveId)}
                target="_blank"
                rel="noreferrer"
                className="viewer-image"
              >
                <img
                  src={thumb(activeWork.driveId, 2200)}
                  alt={locale === "en" ? activeWork.title : activeWork.titleRu}
                  width={2200}
                  height={1600}
                  referrerPolicy="no-referrer"
                />
              </a>
            )}
          </div>
        </div>
      ) : null}
    </main>
  );
}
