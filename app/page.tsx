/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import ScrollControls from "./scroll-controls";

type Locale = "en" | "ru";
type WorkKind = "video" | "photo";
type Filter = "selected" | "video" | "photo" | "cars" | "people";

type Service = {
  title: string;
  body: string;
};

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
  services: Service[];
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
  driveId?: string;
  aspect: "wide" | "portrait" | "square" | "tall";
  featured?: boolean;
};

const copy: Record<Locale, Copy> = {
  en: {
    title: "Yernur Visuals",
    role: "Photographer / Videographer / Editor",
    place: "Almaty, Kazakhstan",
    intro:
      "I photograph cars and people, and shoot and edit reels, ads and podcast clips.",
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
      "I'm Yernur, a photographer, videographer and editor based in Almaty, Kazakhstan. I help with the idea and shot plan, then handle filming, editing, captions, graphics and sound for social media.",
    services: [
      {
        title: "Idea and hook",
        body: "Short concept, opening line and shot direction before we shoot.",
      },
      {
        title: "Shoot",
        body: "Cars, portraits, reels, podcast clips and small commercial videos.",
      },
      {
        title: "Edit",
        body: "Rhythm cuts, captions, sound, light graphics and clean export.",
      },
      {
        title: "Formats",
        body: "Reels, TikTok, social ads, podcast shorts, car edits and photo sets.",
      },
    ],
    contactTitle: "Contact",
    contactBody: "For shoots, reels, edits and small commercial projects.",
    open: "Open",
    close: "Close",
    allWork: "All work",
  },
  ru: {
    title: "Yernur Visuals",
    role: "Фотограф / Видеограф / Монтажер",
    place: "Алматы, Казахстан",
    intro:
      "Снимаю автомобили и людей. Монтирую рилсы, рекламные ролики и фрагменты подкастов.",
    navWork: "Работы",
    navAbout: "Обо мне",
    navContact: "Контакт",
    viewWork: "Смотреть работы",
    contact: "Контакт",
    selected: "Избранное",
    video: "Видео",
    photo: "Фото",
    cars: "Авто",
    people: "Люди",
    aboutTitle: "Обо мне",
    aboutBody:
      "Я Ернур, фотограф, видеограф и монтажёр из Алматы. Помогаю с идеей и планом съёмки, снимаю и монтирую. Добавляю субтитры, графику и звук, готовлю видео для соцсетей.",
    services: [
      {
        title: "Идея и хук",
        body: "Короткая задумка, первая фраза и направление кадров до съемки.",
      },
      {
        title: "Съемка",
        body: "Авто, портреты, рилсы, подкаст-клипы и небольшие коммерческие видео.",
      },
      {
        title: "Монтаж",
        body: "Ритм, субтитры, звук, простая графика и чистый экспорт.",
      },
      {
        title: "Форматы",
        body: "Reels, TikTok, таргет, podcast shorts, авто-эдиты и фотосеты.",
      },
    ],
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
    id: "first-me",
    title: "First Me",
    titleRu: "First Me",
    kind: "video",
    tags: ["selected", "video", "people"],
    year: "2026",
    note: "",
    noteRu: "",
    aspect: "portrait",
    featured: true,
  },
  {
    id: "alikh-man-trendy",
    title: "Alikh Man Trendy",
    titleRu: "Alikh Man Trendy",
    kind: "video",
    tags: ["selected", "video", "people"],
    year: "2026",
    note: "",
    noteRu: "",
    aspect: "wide",
    featured: true,
  },
  {
    id: "civic",
    title: "Civic",
    titleRu: "Civic",
    kind: "video",
    tags: ["video", "cars"],
    year: "2026",
    note: "",
    noteRu: "",
    aspect: "portrait",
  },
  {
    id: "porsche-slay",
    title: "Porsche Edit",
    titleRu: "Porsche Edit",
    kind: "video",
    tags: ["selected", "video", "cars"],
    year: "2025",
    note: "Car edit with captions, beat cuts and a clean vertical frame.",
    noteRu: "Авто-эдит с субтитрами, бит-катами и чистым вертикальным кадром.",
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
    note: "Podcast clip with a hook, subtitles, small motion details and sound.",
    noteRu: "Подкаст-клип с хуком, субтитрами, маленькими motion-деталями и звуком.",
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
    note: "Short scene edit built on timing, tension and sound.",
    noteRu: "Короткая сцена на тайминге, напряжении и звуке.",
    driveId: "1_FOnV_O4gmHMIM7_U7zDQXajn5iHLQSS",
    aspect: "portrait",
    featured: true,
  },
  {
    id: "pc-club",
    title: "PC Club Ad",
    titleRu: "PC Club Ad",
    kind: "video",
    tags: ["video"],
    year: "2025",
    note: "Ad-style reel: talking intro, location shots and edit sequence.",
    noteRu: "Рилс под рекламу: говорящая подводка, кадры места и эдит.",
    driveId: "1wVXVg7C7D0Yr-D8ibn03BuE2AyinT2pM",
    aspect: "portrait",
  },
  {
    id: "gelen-trend",
    title: "Gelen Trend",
    titleRu: "Gelen Trend",
    kind: "video",
    tags: ["selected", "video", "cars"],
    year: "2025",
    note: "Trend car edit with quick cuts and simple caption work.",
    noteRu: "Трендовый авто-эдит с быстрым монтажом и субтитрами.",
    driveId: "1QUBfoKyAsaYFf5VX-lqh3mtZ2kziJs6X",
    aspect: "portrait",
  },
  {
    id: "u-look-lonely",
    title: "Lonely Car",
    titleRu: "Lonely Car",
    kind: "video",
    tags: ["video", "cars"],
    year: "2025",
    note: "Car edit with a playful character idea.",
    noteRu: "Авто-эдит с простой character-идеей.",
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
    note: "Fast trend edit for a car reel.",
    noteRu: "Быстрый трендовый эдит для авто-ролика.",
    driveId: "1sXokGkL-nBga0ffjP_OtCfgPDaa740lk",
    aspect: "wide",
  },
  {
    id: "audi-r8",
    title: "Audi R8",
    titleRu: "Audi R8",
    kind: "video",
    tags: ["video", "cars"],
    year: "2025",
    note: "Short car edit with a quiet opening and mood.",
    noteRu: "Короткий авто-эдит со спокойным началом и настроением.",
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
    note: "Car reel with movement and beat accents.",
    noteRu: "Авто-ролик с движением и акцентами в бит.",
    driveId: "1OSgMfNwpfuwtHPAykwTVi-fixLsYWBvy",
    aspect: "wide",
  },
  {
    id: "bmw-5s",
    title: "BMW 5S",
    titleRu: "BMW 5S",
    kind: "video",
    tags: ["video", "cars"],
    year: "2025",
    note: "Car reel built around motion, captions and rhythm.",
    noteRu: "Авто-ролик на движении, субтитрах и ритме.",
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
    note: "Practical screen effect for lighting options.",
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
    note: "Car photo set with clean color and tight framing.",
    noteRu: "Авто-фотосет с чистым цветом и плотной подачей.",
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
    note: "Side detail from the same car set.",
    noteRu: "Боковая деталь из той же серии.",
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
    note: "Urban car frame with brick, reflections and low contrast.",
    noteRu: "Городской кадр: машина, кирпич, отражения и низкий контраст.",
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
    note: "Clean car frame with an open background.",
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
    note: "Close detail shot of the headlight.",
    noteRu: "Крупная деталь фары.",
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
    note: "Detail frame focused on color and reflections.",
    noteRu: "Деталь с фокусом на цвет и отражения.",
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
    note: "Portrait frame with open space and strong color.",
    noteRu: "Портрет с открытым пространством и сильным цветом.",
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
    note: "Outdoor portrait frame from a mountain set.",
    noteRu: "Портретный кадр из горной серии.",
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
    note: "Portrait with a simple editorial mood.",
    noteRu: "Портрет в editorial-настроении.",
    driveId: "1hi9V24Qn9aZ4ImkbyndfogT3ok1MoHHu",
    aspect: "portrait",
  },
];

function thumb(id: string | undefined, size = 1600) {
  return `https://lh3.googleusercontent.com/d/${id}=w${size}`;
}

function driveView(id: string | undefined) {
  return `https://drive.google.com/file/d/${id}/view`;
}

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function videoSource(item: WorkItem) {
  return `${basePath}/videos/${item.id}.mp4`;
}

function poster(item: WorkItem, size: number) {
  return item.kind === "video"
    ? `${basePath}/videos/${item.id}.jpg`
    : thumb(item.driveId, size);
}

function VideoPlayer({ item, locale }: { item: WorkItem; locale: Locale }) {
  const [failed, setFailed] = useState(false);
  return (
    <>
      <video
        className="portfolio-video"
        src={videoSource(item)}
        poster={poster(item, 1100)}
        controls
        playsInline
        autoPlay
        preload="metadata"
        aria-label={locale === "ru" ? "Видеоплеер" : "Video player"}
        onError={() => setFailed(true)}
      />
      {failed && (
        <p className="player-error" role="alert">
          {locale === "ru" ? "Не удалось загрузить видео. " : "The video could not be loaded. "}
          <a href={videoSource(item)} download>
            {locale === "ru" ? "Скачать MP4" : "Download MP4"}
          </a>
        </p>
      )}
    </>
  );
}

export default function Home() {
  const [locale, setLocale] = useState<Locale>("ru");
  const [activeFilter, setActiveFilter] = useState<Filter>("selected");
  const [activeWork, setActiveWork] = useState<WorkItem | null>(null);
  const t = copy[locale];
  const viewerRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    document.documentElement.lang = locale;
    const skipLink = document.querySelector(".skip-link");
    if (skipLink) skipLink.textContent = locale === "ru" ? "Перейти к работам" : "Skip to work";
  }, [locale]);

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!activeWork || !viewer) return;
    viewer.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      viewer.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [activeWork]);

  const openLabel = (item: WorkItem) => item.kind === "video"
    ? (locale === "ru" ? "Смотреть видео" : "Play video")
    : `${t.open} ${locale === "en" ? item.title : item.titleRu}`;

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
          aria-label={locale === "ru" ? "Yernur Visuals — главная" : "Yernur Visuals home"}
          translate="no"
        >
          Yernur Visuals
        </a>
        <nav aria-label={locale === "ru" ? "Основная навигация" : "Primary navigation"} className="nav-links">
          <a href="#work">{t.navWork}</a>
          <a href="#about">{t.navAbout}</a>
          <a href="#contact">{t.navContact}</a>
          <button
            type="button"
            className="locale-toggle"
            onClick={() => setLocale(locale === "en" ? "ru" : "en")}
            aria-label={locale === "ru" ? "Switch to English" : "Переключить на русский"}
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

        <div className="hero-media" aria-label={locale === "ru" ? "Избранные работы" : "Selected work preview"}>
          {heroItems.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className={`hero-frame hero-frame-${index + 1}`}
              onClick={() => setActiveWork(item)}
              aria-label={openLabel(item)}
            >
              <img
                src={poster(item, 1400)}
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
              ? "Reels, edits and stills with pace, light and a clean presentation."
              : "Рилсы, эдиты и фотографии: ритм, свет и чистая подача."}
          </p>
        </div>

        <div className="filter-row" role="tablist" aria-label={locale === "ru" ? "Фильтры работ" : "Work filters"}>
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
                aria-label={openLabel(item)}
              >
                <img
                  src={poster(item, 1100)}
                  alt={item.kind === "video" ? "" : locale === "en" ? item.title : item.titleRu}
                  width={1100}
                  height={1400}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                {item.kind === "video" ? (
                  <span className="play-button" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                  </span>
                ) : null}
              </button>
            </article>
          ))}
        </div>
      </section>

      <section id="about" className="about-section">
        <div className="about-copy">
          <h2>{t.aboutTitle}</h2>
          <p>{t.aboutBody}</p>
        </div>
        <ul
          className="service-list"
          aria-label={locale === "en" ? "Services" : "Что я делаю"}
        >
          {t.services.map((service) => (
            <li key={service.title}>
              <h3>{service.title}</h3>
              <p>{service.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="contact" className="contact-section">
        <div>
          <h2>{t.contactTitle}</h2>
          <p>{t.contactBody}</p>
        </div>
        <div className="contact-links">
          <a href="https://wa.me/77474547235" target="_blank" rel="noreferrer">
            WhatsApp
            <span>+7 747 454 72 35</span>
          </a>
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

      <ScrollControls locale={locale} />

      {activeWork ? (
        <dialog
          ref={viewerRef}
          className="viewer"
          aria-label={openLabel(activeWork)}
          onCancel={() => setActiveWork(null)}
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
              <button
                type="button"
                className="viewer-close"
                autoFocus
                onClick={() => setActiveWork(null)}
              >
                {t.close}
              </button>
            </div>
            <div className={activeWork.kind === "video" ? "viewer-stage video-stage" : "viewer-stage"}>
              {activeWork.kind === "video" ? (
                <VideoPlayer key={activeWork.id} item={activeWork} locale={locale} />
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
        </dialog>
      ) : null}
    </main>
  );
}
