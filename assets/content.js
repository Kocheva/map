import { p } from "./runtime.js";
import { SITE_LINKS } from "./site-config.js";
const el = (tag, props, ...children) => p.jsxs(tag, { ...props, children });
const para = (text) => el("p", {}, text);
const external = (url, label) =>
  el(
    "a",
    { href: url, target: "_blank", rel: "noopener noreferrer" },
    label + " ↗",
  );
const section = (title, ...children) =>
  el(
    "section",
    { className: "method-section" },
    el("h2", {}, title),
    ...children,
  );
export function ProjectNav({ method }) {
  return el(
    "nav",
    { className: "project-nav", "aria-label": "Разделы проекта" },
    el(
      "a",
      { className: "project-home", href: "#/" },
      "Делай-саммиты",
      el("span", {}, "Карта лидеров и сообществ"),
    ),
    el(
      "div",
      { className: "project-links" },
      el(
        "a",
        { href: "#/", "aria-current": !method ? "page" : undefined },
        "Карта",
      ),
      el(
        "a",
        { href: "#/methodology", "aria-current": method ? "page" : undefined },
        "Методология и источники",
      ),
      external(SITE_LINKS.library, "Библиотека организатора"),
    ),
  );
}
export function ProjectFooter({ data }) {
  const date = new Date(data.config[0].updated_at).toLocaleDateString("ru-RU");
  return el(
    "footer",
    { className: "project-footer" },
    el(
      "div",
      { className: "footer-main" },
      el(
        "div",
        {},
        el("h2", {}, "Ресурсы проекта"),
        el(
          "div",
          { className: "footer-links" },
          external(SITE_LINKS.library, "Библиотека организатора мероприятий"),
          el("a", { href: "#/methodology" }, "Методология и источники"),
        ),
      ),
      el(
        "p",
        { className: "support-credit" },
        "Создано в рамках проекта «Делай-саммиты. Ресурсный альянс НКО: практика совместных действий» при поддержке ",
        el(
          "a",
          {
            href: SITE_LINKS.timchenko,
            target: "_blank",
            rel: "noopener noreferrer",
          },
          "Фонда Тимченко",
        ),
        " в рамках конкурса «Время действовать».",
      ),
    ),
    el(
      "div",
      { className: "footer-bottom" },
      para(
        `Данные собраны из открытых источников и реестра победителей конкурсов Фонда Тимченко. Обновлено: ${date}.`,
      ),
      para(
        `${data.people.length} персон · ${data.activities.length} подтверждений публичной деятельности · ${data.practices.length} практик · ${data.fund_projects.length} проектов фонда`,
      ),
    ),
  );
}
const labels = {
  "xn--74-9kcqjffxnf3b.xn--p1ai": "мойбизнес74.рф",
  "xn--72-dlcejng0bfedcx6a1jj.xn--p1ai": "новыегоризонты72.рф",
  "xn--80aeeqaabljrdbg6a3ahhcl4ay9hsa.xn--p1ai": "фондкультурныхинициатив.рф",
  "xn--d1acaktbiuoefcc5odd.xn--p1ai": "удмуртияменяется.рф",
  "xn-----7kccs2bpdcg9allb.xn--p1ai": "футбол-на-дону.рф",
  "xn----7sba5bbhjefbow0a.xn--p1ai": "платформа-нко.рф",
  "xn--80apaohbc3aw9e.xn--p1ai": "моифинансы.рф",
  "xn--80akoflrd1b9c.xn--p1ai": "соцаксель.рф",
  "xn--74-6kcaaembt1fdnsfdygm4m.xn--p1ai": "грантыгубернатора74.рф",
  "xn--80aaagoag5ahgpmfyeerze3o.xn--p1ai": "стальноекружевоурала.рф",
  "xn--80afcdbalict6afooklqi5o.xn--p1ai": "Фонд президентских грантов",
  "xn--80aaadglf1chnmbxga3u.xn--p1ai": "ассамблеянародов.рф",
  "xn--80aaafckfcjqwk4eul.xn--p1ai": "великаядержава.рф",
  "xn--80ahddxdcqb6a6ioc.xn--p1ai": "молодёжьсела.рф",
  "xn--59-6kcaaembt1fdnsfdygm4m.xn--p1ai": "грантыгубернатора59.рф",
  "app-dev.xn--80apaohbc3aw9e.xn--p1ai": "app-dev.моифинансы.рф",
  "xn--80aaacibp5ddlofdugk.xn--p1ai": "грантгубернатора.рф",
  "xn----8sbzkbmchku.xn--p1ai": "мой-портал.рф",
  "xn----7sbbh1ascyve.online": "сила-слова.online",
  "xn--80aaccalg6bhe2adtlhgr4pzb.xn--80af5akm8c.xn--p1ai":
    "свердловскаяобласть.гранты.рф",
  "xn----7sb3aempnecc1h.xn--p1ai": "культура-нт.рф",
  "www.xn--24-vlcdobmt.xn--p1ai": "www.моймир24.рф",
  "xn--e1aner7ci.xn--80af5akm8c.xn--p1ai": "тюмень.гранты.рф",
  "xn--90acef1bfcadyemq1f.xn--p1ai": "фондсообщество.рф",
  "xn----8sbnatxcctbeddbtj9c2e.xn--p1ai": "ресурсныйцентр-анр.рф",
  "xn--80aahfjohgugopjj9an.xn--p1ai": "гражданскийфорум.рф",
  "xn--80atbcldccx9d.xn--p1ai": "школасонко.рф",
  "xn--59-mlcusagigq2b.xn--p1ai": "соцпроект59.рф",
  "xn--b1axaggg.xn--80af5akm8c.xn--p1ai": "ростов.гранты.рф",
  "xn----7sbakll5a6ax.xn--p1ai": "газета-лп.рф",
  "xn--80ablxckh1aj4h.xn--80af5akm8c.xn--p1ai": "ленобласть.гранты.рф",
  "asi.org.ru": "Агентство социальной информации (АСИ)",
  "grany-center.org": "Центр ГРАНИ",
  "elkanko.ru": "Ресурсная площадка «Элканко»",
  "alsp-ugra.ru": "Альянс социально ориентированных НКО Югры",
  "dobro.ru": "Добро.рф",
  "gtn-pravda.ru": "Гатчинская правда",
  "lpravda.ru": "Ленинградская правда",
  "rescentr47.ru": "Ресурсный добровольческий центр Ленинградской области",
  "fondtimchenko.ru": "Фонд Тимченко",
  "15years.fondtimchenko.ru": "Фонд Тимченко: проекты и истории",
  "givingjournal.ru": "Журнал «Филантроп»",
  "chel.kp.ru": "Комсомольская правда — Челябинск",
  "radiokp.ru": "Радио «Комсомольская правда»",
  "31tv.ru": "31 канал",
  "bfm74.ru": "Business FM Челябинск",
  "vyborg.tv": "Выборг ТВ",
  "chel.aif.ru": "Аргументы и факты — Челябинск",
  "perm.aif.ru": "Аргументы и факты — Пермь",
  "zwezda.su": "Газета «Звезда»",
  "op-don.ru": "Общественная палата Ростовской области",
  "lysva-library.ru": "Лысьвенская библиотечная система",
  "solnmir.ru": "Солнечный мир",
  "президентскиегранты.рф": "Фонд президентских грантов",
  "грантыгубернатора.рф": "Фонд грантов губернатора",
  "гранты.рф": "Гранты.рф",
  "habr.com": "Хабр",
  "minnac.ru": "Министерство национальной политики Удмуртии",
};
function platforms(records) {
  const sites = new Map();
  for (const row of records) {
    const raw = row.source_url || row.profile_source_url;
    if (!raw) continue;
    try {
      const url = new URL(raw);
      if (!/^https?:$/.test(url.protocol)) continue;
      const host = url.hostname.replace(/^www\./, "");
      const root = ["vk.com", "t.me", "ok.ru"].includes(host)
        ? "/" + url.pathname.split("/").filter(Boolean)[0]
        : "/";
      const key = host + root;
      // URL display converts internationalized hosts for readable platform names.
      const name = labels[host] || host;
      if (!sites.has(key))
        sites.set(key, {
          url: url.protocol + "//" + url.host + root,
          label: name + (root !== "/" ? root : ""),
          count: 0,
        });
      sites.get(key).count++;
    } catch {}
  }
  return [...sites.values()].sort(
    (a, b) => b.count - a.count || a.label.localeCompare(b.label, "ru"),
  );
}
function SourceGroup({ title, records, description }) {
  const sites = platforms(records);
  return el(
    "article",
    { className: "source-group" },
    el(
      "div",
      { className: "source-heading" },
      el("h3", {}, title),
      el("span", {}, `${records.length} записей`),
    ),
    para(description),
    el(
      "ul",
      { className: "platform-links" },
      ...sites
        .slice(0, 8)
        .map((s) => el("li", { key: s.url }, external(s.url, s.label))),
    ),
    sites.length > 8
      ? el(
          "details",
          {},
          el("summary", {}, `Другие площадки · ${sites.length - 8}`),
          el(
            "ul",
            { className: "platform-links" },
            ...sites
              .slice(8)
              .map((s) => el("li", { key: s.url }, external(s.url, s.label))),
          ),
        )
      : null,
  );
}
export function Methodology({ data }) {
  const leaders = new Set(data.person_fund_projects.map((row) => row.person_id))
    .size;
  const activityGroup = (kinds) =>
    data.activities.filter((row) => kinds.includes(row.activity_kind_label));
  const groups = [
    [
      "Публикации, интервью и экспертные комментарии",
      activityGroup(["Публикация / комментарий"]),
      "Материалы СМИ, авторские публикации и публичные комментарии, включённые в карточки персон.",
    ],
    [
      "Обучение и наставничество",
      activityGroup(["Обучение", "Наставничество"]),
      "Программы, анонсы и отчёты образовательных площадок и организаторов.",
    ],
    [
      "Выступления, события и работа с сообществами",
      activityGroup([
        "Выступление",
        "Организация события",
        "Презентация практики",
        "Модерация",
        "Фасилитация",
      ]),
      "Материалы организаторов и площадок о выступлениях, модерации, событиях и представлении практик.",
    ],
    [
      "Экспертная и общественная деятельность",
      activityGroup([
        "Экспертная сессия",
        "Признание / награда",
        "Совет / рабочая группа",
      ]),
      "Публичные сведения об экспертных сессиях, общественном участии и профессиональном признании.",
    ],
    [
      "Практики и проекты",
      data.practices,
      "Карточки проектов в грантовых реестрах, описания практик на сайтах организаций и профильных площадках.",
    ],
    [
      "Дополнительные материалы о руководителях проектов фонда",
      data.fund_publications || [],
      "Публикации фонда, организаций и местных площадок, использованные при дополнении профилей руководителей.",
    ],
  ];
  return el(
    "main",
    { className: "method-page", id: "main-content", tabIndex: -1 },
    el(
      "header",
      { className: "method-intro" },
      el("a", { href: "#/", className: "back-link" }, "← Вернуться к карте"),
      el("span", { className: "eyebrow" }, "О карте"),
      el("h1", { tabIndex: -1, id: "method-title" }, "Методология и источники"),
      para("Как устроена карта проектных лидеров и сообществ восьми регионов."),
    ),
    section(
      "Кто представлен на карте",
      para(
        "Карта помогает организаторам находить тренеров, наставников, модераторов, спикеров, экспертов, организаторов и носителей практик работы с сообществами. Она объединяет людей из Пермского края, Челябинской, Свердловской, Ростовской, Тюменской и Ленинградской областей, Ханты-Мансийского автономного округа — Югры и Удмуртской Республики.",
      ),
      para(
        `В текущей версии — ${data.people.length} персон. Отдельная группа — ${leaders} руководителя проектов — победителей конкурсов Фонда Тимченко: в реестре представлены ${data.fund_projects.length} проектов и ${data.fund_contests.length} названия конкурсов, включая разные годы и этапы.`,
      ),
      para(
        "Основной период сведений о публичной деятельности — 2021–2026 годы. Сроки реализации отдельных проектов фонда могут выходить за этот период.",
      ),
    ),
    section(
      "Как формировалась карта",
      el(
        "ol",
        { className: "method-list" },
        el(
          "li",
          {},
          el("strong", {}, "Поиск людей и подтверждений. "),
          "Отправной точкой служили проекты, организации, профессиональные площадки и события. Затем уточнялись персональные роли и опыт работы с сообществами по открытым материалам.",
        ),
        el(
          "li",
          {},
          el("strong", {}, "Сопоставление сведений. "),
          "Записи о человеке объединялись по имени, региону, организации и контексту деятельности. Несколько проектов одного руководителя показаны в одной карточке.",
        ),
        el(
          "li",
          {},
          el("strong", {}, "Включение победителей фонда. "),
          "Предоставленный реестр победителей конкурсов Фонда Тимченко является самостоятельным основанием для включения руководителя проекта. Сведения о его иных ролях добавляются только при наличии отдельных оснований.",
        ),
        el(
          "li",
          {},
          el("strong", {}, "Сохранение контекста. "),
          "В карточках разделены публичная деятельность, практики и руководство проектами фонда. Организация проекта относится к конкретной заявке и не обязательно является текущим местом работы человека.",
        ),
      ),
      para(
        "Полнота сведений зависит от доступности открытых публикаций. Количество людей по регионам, темам и ролям не выравнивалось искусственно.",
      ),
    ),
    section(
      "Как читать роли, темы и практики",
      para(
        "У одного человека может быть несколько ролей и тем. Роль «Руководитель проекта» указывает на руководство проектом из реестра победителей фонда; она сама по себе не означает наличие тренерского, наставнического или экспертного опыта.",
      ),
      para(
        "Практика — описанный способ решения общественной задачи с понятным механизмом и персональным носителем. Повторная реализация усиливает доказательную базу, но содержательный пилотный проект также может быть представлен как практика.",
      ),
      para(
        "В каждой карточке проекта фонда показаны организация, название, годы реализации, конкурс, грантовое направление и год конкурса. Год конкурса и сроки проекта могут различаться. Если сведений в реестре нет, это прямо указано.",
      ),
    ),
    section(
      "Как работают фильтры и счётчики",
      para(
        "Несколько значений внутри одного фильтра означают «любое из выбранных». Разные фильтры работают совместно: например, регион + роль + конкурс. Результат и счётчики относятся к людям: руководитель нескольких проектов учитывается один раз.",
      ),
      para(
        "Фильтр конкурсов сохраняет исходные названия, годы и этапы поддержки. В открытой карточке видны все проекты человека, включая проекты других конкурсов.",
      ),
      para(
        "Число подтверждений обозначает количество записей о публичной деятельности, а не число уникальных публикаций. Одна публикация может подтверждать несколько фактов. Практики и проекты фонда считаются отдельно; складывать эти показатели как число уникальных событий некорректно.",
      ),
    ),
    section(
      "Границы данных",
      para(
        "Карта не является рейтингом, исчерпывающим реестром или гарантией готовности человека участвовать в мероприятии. Отсутствие сведений не означает отсутствия опыта. Перед приглашением стоит уточнить актуальные должность, место работы и доступность.",
      ),
      para(
        "Данные отражают сведения на дату источника. Руководство проектом не подтверждает автоматически его завершение или заявленные результаты. Контакты и биографические сведения, не включённые в опубликованный набор, на карту не добавляются.",
      ),
    ),
    section(
      "Источники",
      para(
        "Сведения собраны из открытых источников и предоставленного реестра победителей конкурсов Фонда Тимченко. Ниже приведены группы материалов и основные площадки из текущего набора. Ссылки ведут на площадки; конкретные публикации доступны в карточках, если их адреса включены в данные.",
      ),
      el(
        "article",
        { className: "source-group" },
        el("h3", {}, "Реестр победителей конкурсов Фонда Тимченко"),
        para(
          `${data.fund_projects.length} записей о проектах: конкурс, организация, руководитель, сроки и направление при его наличии. Источник — предоставленная таблица победителей; ссылка ниже ведёт на официальный сайт фонда.`,
        ),
        external(SITE_LINKS.timchenko, "Фонд Тимченко"),
      ),
      ...groups.map(([title, records, description]) =>
        p.jsx(SourceGroup, { title, records, description }, title),
      ),
    ),
    el(
      "a",
      { className: "back-link bottom-back", href: "#/" },
      "← Вернуться к карте",
    ),
  );
}
export function FundResearch({ person, data }) {
  const rows = (data.fund_publications || []).filter(
    (row) => row.person_id === person.person_id,
  );
  if (!rows.length) return null;
  return el(
    "section",
    { className: "info" },
    el("h3", {}, "Материалы о деятельности"),
    ...rows.map((row) =>
      el(
        "article",
        { className: "evidence", key: row.source_id },
        el("h4", {}, row.title),
        para(row.verified_information),
        row.limitations ? el("small", {}, row.limitations) : null,
        /^https?:\/\//.test(row.source_url || "")
          ? external(row.source_url, "Открыть источник")
          : null,
      ),
    ),
  );
}
