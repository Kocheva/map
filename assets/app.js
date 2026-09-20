import { d, f, p } from "./runtime.js";
import {
  ProjectNav,
  ProjectFooter,
  Methodology,
  FundResearch,
} from "./content.js";
const m = {
    regions: [],
    roles: [],
    topics: [],
    municipalities: [],
    profiles: [],
    levels: [],
    contests: [],
    interregional: !1,
  },
  h = {
    public_role: `Публичная роль`,
    author_or_commentator: `Автор / комментатор`,
    practice_carrier: `Носитель практики`,
    international: `Международный`,
    author_commentator: `Автор / комментатор`,
    practice_holder: `Носитель практики`,
    municipal: `Муниципальный`,
    regional: `Региональный`,
    interregional: `Межрегиональный`,
    federal: `Федеральный`,
    training: `Обучение`,
    moderation: `Модерация`,
    mentoring: `Наставничество`,
    public_speaking: `Публичное выступление`,
    event_organization: `Организация события`,
    expertise: `Экспертиза`,
  },
  g = [
    `M22 7 50 4 75 18 72 42 91 57 79 88 48 96 20 82 6 55 14 31Z`,
    `M18 10 55 4 82 20 73 43 91 65 68 92 31 88 8 62 16 40Z`,
    `M9 29 29 10 54 15 68 5 89 21 78 42 94 58 65 83 35 76 20 91 5 67 18 49Z`,
    `M24 5 58 9 78 26 69 47 86 62 71 94 39 89 17 68 8 38Z`,
    `M10 28 31 9 59 13 86 34 77 60 91 74 60 92 31 86 8 61Z`,
    `M5 39 23 18 46 25 65 12 91 29 84 52 64 64 48 87 21 77 12 59Z`,
    `M29 5 61 9 81 31 72 55 87 73 62 95 31 87 12 62 18 35Z`,
    `M17 8 49 4 77 18 68 39 88 59 72 91 40 95 13 72 7 42Z`,
  ],
  _ = (e) =>
    String(e ?? ``)
      .split(`;`)
      .map((e) => e.trim())
      .filter(Boolean),
  v = (e) =>
    String(e ?? ``)
      .toLowerCase()
      .replaceAll(`ё`, `е`)
      .replace(/\s+/g, ` `)
      .trim(),
  y = (e) => {
    try {
      let t = new URL(String(e));
      return /^https?:$/.test(t.protocol) ? t.href : ``;
    } catch {
      return ``;
    }
  },
  b = (e) => (e % 10 == 1 && e % 100, `человек`);
function x({ on: e, disabled: t, color: n, children: r, click: i }) {
  return (0, p.jsx)(`button`, {
    className: `pill`,
    "aria-pressed": e,
    disabled: t,
    onClick: i,
    style: e && n ? { "--tone": n } : void 0,
    children: r,
  });
}
function ee() {
  const [route, setRoute] = f.useState(location.hash);
  const method = route.startsWith("#/methodology");
  f.useEffect(() => {
    const update = () => {
      setRoute(location.hash);
      window.scrollTo(0, 0);
    };
    addEventListener("hashchange", update);
    return () => removeEventListener("hashchange", update);
  }, []);
  f.useEffect(() => {
    document.title = method
      ? "Методология и источники — Карта лидеров"
      : "Карта проектных лидеров и сообществ";
    if (method)
      setTimeout(() => document.getElementById("method-title")?.focus(), 0);
  }, [method]);
  let [e, t] = (0, f.useState)(null),
    [n, r] = (0, f.useState)(``),
    [i, a] = (0, f.useState)(``),
    [o, s] = (0, f.useState)(m),
    [c, l] = (0, f.useState)(18),
    [u, d] = (0, f.useState)(null),
    [ee, w] = (0, f.useState)(5),
    ie = (0, f.useRef)(null);
  ((0, f.useEffect)(() => {
    fetch(`./data/leaders.json`)
      .then((e) => {
        if (!e.ok) throw Error(`Не удалось загрузить набор данных`);
        return e.json();
      })
      .then((e) => {
        for (let t of [
          `config`,
          `regions`,
          `roles`,
          `topics`,
          `people`,
          `activities`,
          `practices`,
        ])
          if (!Array.isArray(e[t])) throw Error(`Отсутствует лист ${t}`);
        e = prepareFundData(e);
        ((e.people = e.people.map((e) => ({
          ...e,
          role_ids: _(e.role_ids),
          topic_ids: _(e.topic_ids),
          profile_type_ids: _(e.profile_type_ids),
          experience_level_ids: _(e.experience_level_ids),
          experience_format_ids: _(e.experience_format_ids),
          has_interregional_experience: e.has_interregional_experience === !0,
        }))),
          t(e));
      })
      .catch((e) => r(e.message));
  }, []),
    (0, f.useEffect)(() => {
      let e = new URLSearchParams(location.search);
      (a(e.get(`q`) || ``),
        s({
          ...m,
          regions: _(e.get(`regions`)),
          roles: _(e.get(`roles`)),
          topics: _(e.get(`topics`)),
          municipalities: _(e.get(`municipalities`)),
          profiles: _(e.get(`profiles`)),
          levels: _(e.get(`levels`)),
          contests: _(e.get(`contests`)),
          interregional: e.get(`interregional`) === `1`,
        }));
    }, []),
    (0, f.useEffect)(() => {
      if (!e) return;
      let t = new URLSearchParams();
      (i && t.set(`q`, i),
        Object.entries(o).forEach(([e, n]) => {
          Array.isArray(n) && n.length
            ? t.set(e, n.join(`;`))
            : n === !0 && t.set(e, `1`);
        }),
        history.replaceState(
          null,
          ``,
          location.pathname + (t.size ? `?${t}` : ``) + location.hash,
        ));
    }, [i, o, e]),
    (0, f.useEffect)(() => {
      if (!u) return;
      let e = (e) => {
        e.key === `Escape` && d(null);
      };
      return (
        document.body.classList.add(`locked`),
        addEventListener(`keydown`, e),
        setTimeout(() => ie.current?.focus(), 0),
        () => {
          (document.body.classList.remove(`locked`),
            removeEventListener(`keydown`, e));
        }
      );
    }, [u]));
  let T = (0, f.useMemo)(
      () =>
        e
          ? {
              region: new Map(e.regions.map((e) => [e.region_id, e])),
              role: new Map(e.roles.map((e) => [e.role_id, e])),
              topic: new Map(e.topics.map((e) => [e.topic_id, e])),
              acts: new Map(
                e.people.map((t) => [
                  t.person_id,
                  e.activities.filter((e) => e.person_id === t.person_id),
                ]),
              ),
              practs: new Map(
                e.people.map((t) => [
                  t.person_id,
                  e.practices.filter((e) => e.person_id === t.person_id),
                ]),
              ),
            }
          : null,
      [e],
    ),
    ae = (0, f.useMemo)(() => {
      let t = new Map();
      return (
        !e ||
          !T ||
          e.people.forEach((e) =>
            t.set(
              e.person_id,
              v(
                [
                  e.person_name,
                  e.organization_name,
                  e.organization_short_name,
                  e.position_title,
                  e.municipality_name,
                  T.region.get(e.region_id)?.region_name,
                  ...e.role_ids.map((e) => T.role.get(e)?.role_name),
                  ...e.topic_ids.map((e) => T.topic.get(e)?.topic_name),
                  e.profile_summary,
                  ...e.fund_projects.flatMap((p) => [
                    p.project_name,
                    p.organization_name,
                    p.contest_name,
                    p.grant_direction,
                  ]),
                  e.practice_experience,
                  e.public_experience,
                  ...(T.acts.get(e.person_id) || []).flatMap((e) => [
                    e.activity_title,
                    e.activity_description,
                    e.platform_name,
                  ]),
                  ...(T.practs.get(e.person_id) || []).flatMap((e) => [
                    e.practice_name,
                    e.format_or_technology,
                  ]),
                ].join(` `),
              ),
            ),
          ),
        t
      );
    }, [e, T]),
    oe = (e, t = ``) =>
      v(i)
        .split(` `)
        .filter(Boolean)
        .some((t) => !ae.get(e.person_id)?.includes(t)) ||
      [
        [`regions`, [e.region_id], o.regions],
        [`roles`, e.role_ids, o.roles],
        [`topics`, e.topic_ids, o.topics],
        [
          `municipalities`,
          [e.municipality_name].filter(Boolean),
          o.municipalities,
        ],
        [`profiles`, e.profile_type_ids, o.profiles],
        [`levels`, e.experience_level_ids, o.levels],
        [`contests`, e.fund_contest_ids, o.contests],
      ].some(
        ([e, n, r]) => e !== t && r.length && !r.some((e) => n.includes(e)),
      )
        ? !1
        : t === `interregional` ||
          !o.interregional ||
          e.has_interregional_experience,
    se = (0, f.useMemo)(
      () =>
        e
          ? e.people
              .filter((e) => oe(e))
              .sort(
                (e, t) =>
                  (t.last_activity_year || 0) - (e.last_activity_year || 0) ||
                  (t.strong_activity_count || 0) -
                    (e.strong_activity_count || 0) ||
                  e.person_name.localeCompare(t.person_name, `ru`),
              )
          : [],
      [e, o, i, ae],
    );
  if (n)
    return (0, p.jsx)(`main`, {
      className: `status`,
      children: (0, p.jsxs)(`div`, {
        children: [
          (0, p.jsx)(`b`, { children: `Не удалось открыть карту` }),
          (0, p.jsx)(`p`, { children: n }),
        ],
      }),
    });
  if (!e || !T)
    return (0, p.jsxs)(`main`, {
      className: `status`,
      children: [
        (0, p.jsx)(`i`, {}),
        (0, p.jsx)(`p`, { children: `Загружаем проверенные профили…` }),
      ],
    });
  let ce = (t, n) =>
      e.people.filter((e) => {
        let r =
          t === `regions`
            ? [e.region_id]
            : t === `municipalities`
              ? [e.municipality_name]
              : t === `roles`
                ? e.role_ids
                : t === `topics`
                  ? e.topic_ids
                  : t === `profiles`
                    ? e.profile_type_ids
                    : t === `levels`
                      ? e.experience_level_ids
                      : t === `contests`
                        ? e.fund_contest_ids
                        : [];
        return oe(e, String(t)) && r.includes(n);
      }).length,
    le = (e, t) =>
      s((n) => ({
        ...n,
        [e]: n[e].includes(t) ? n[e].filter((e) => e !== t) : [...n[e], t],
      })),
    E = (t) =>
      [
        ...new Set(
          e.people
            .flatMap((e) => (Array.isArray(e[t]) ? e[t] : [e[t]]))
            .filter(Boolean),
        ),
      ].sort((e, t) => String(e).localeCompare(String(t), `ru`)),
    D = e.config[0],
    ue =
      Object.values(o).reduce(
        (e, t) => e + (Array.isArray(t) ? t.length : +!!t),
        0,
      ) + +!!i,
    de = u
      ? (T.acts.get(u.person_id) || [])
          .slice()
          .sort(
            (e, t) =>
              (t.year || 0) - (e.year || 0) ||
              (e.display_order || 0) - (t.display_order || 0),
          )
      : [],
    fe = (u && T.practs.get(u.person_id)) || [],
    pe = [
      {
        key: `municipalities`,
        title: `Муниципалитет`,
        values: E(`municipality_name`),
      },
      { key: `profiles`, title: `Тип профиля`, values: E(`profile_type_ids`) },
      {
        key: `levels`,
        title: `Уровень опыта`,
        values: E(`experience_level_ids`),
      },
    ];
  return (0, p.jsxs)(p.Fragment, {
    children: [
      p.jsx(ProjectNav, { method }),
      !method &&
        (0, p.jsxs)(`header`, {
          className: `hero`,
          children: [
            (0, p.jsxs)(`div`, {
              children: [
                (0, p.jsxs)(`div`, {
                  className: `brand`,
                  children: [
                    (0, p.jsx)(`b`, { children: `Делай-саммит` }),
                    (0, p.jsx)(`span`, { children: `Карта для организаторов` }),
                  ],
                }),
                (0, p.jsx)(`h1`, { children: D.dataset_title }),
                (0, p.jsx)(`p`, {
                  children: `Люди, опыт и практики для работы с сообществами. Найдите ведущего, эксперта или руководителя проекта в восьми регионах.`,
                }),
                (0, p.jsxs)(`div`, {
                  className: `meta`,
                  children: [
                    (0, p.jsxs)(`span`, {
                      children: [`Данные за `, D.data_period],
                    }),
                    (0, p.jsxs)(`span`, {
                      children: [
                        `Обновлено `,
                        new Date(D.updated_at).toLocaleDateString(`ru-RU`),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            (0, p.jsx)(`img`, {
              src: `./assets/project-logo.svg`,
              alt: `Делай-саммит — ресурсный альянс НКО: практика совместных действий`,
            }),
          ],
        }),
      method
        ? p.jsx(Methodology, { data: e })
        : (0, p.jsxs)(`main`, {
            id: `main-content`,
            tabIndex: -1,
            className: `shell`,
            children: [
              (0, p.jsxs)(`section`, {
                className: `search`,
                children: [
                  (0, p.jsx)(`label`, {
                    htmlFor: `search`,
                    children: `Найти человека`,
                  }),
                  (0, p.jsxs)(`div`, {
                    children: [
                      (0, p.jsx)(`span`, { children: `⌕` }),
                      (0, p.jsx)(`input`, {
                        id: `search`,
                        type: `search`,
                        value: i,
                        onChange: (e) => {
                          (a(e.target.value), l(18));
                        },
                        placeholder: `ФИО, организация, роль, тема, проект или конкурс`,
                      }),
                      (0, p.jsxs)(`small`, {
                        "aria-live": `polite`,
                        children: [se.length, ` `, b(se.length), ` найдено`],
                      }),
                    ],
                  }),
                ],
              }),
              (0, p.jsxs)(`section`, {
                className: `filters`,
                children: [
                  (0, p.jsx)(S, {
                    title: `Регион`,
                    children: e.regions
                      .filter((e) => e.is_active)
                      .map((e) =>
                        (0, p.jsxs)(
                          x,
                          {
                            on: o.regions.includes(e.region_id),
                            disabled:
                              !ce(`regions`, e.region_id) &&
                              !o.regions.includes(e.region_id),
                            click: () => le(`regions`, e.region_id),
                            children: [
                              e.region_short_name,
                              (0, p.jsx)(`b`, {
                                children: ce(`regions`, e.region_id),
                              }),
                            ],
                          },
                          e.region_id,
                        ),
                      ),
                  }),
                  (0, p.jsxs)(`div`, {
                    className: `filter-cols`,
                    children: [
                      (0, p.jsx)(S, {
                        title: `Роль`,
                        children: e.roles.map((e) =>
                          (0, p.jsxs)(
                            x,
                            {
                              color: e.color,
                              on: o.roles.includes(e.role_id),
                              disabled:
                                !ce(`roles`, e.role_id) &&
                                !o.roles.includes(e.role_id),
                              click: () => le(`roles`, e.role_id),
                              children: [
                                e.role_short_name,
                                (0, p.jsx)(`b`, {
                                  children: ce(`roles`, e.role_id),
                                }),
                              ],
                            },
                            e.role_id,
                          ),
                        ),
                      }),
                      (0, p.jsx)(S, {
                        title: `Тема`,
                        children: e.topics.map((e) =>
                          (0, p.jsxs)(
                            x,
                            {
                              color: e.color,
                              on: o.topics.includes(e.topic_id),
                              disabled:
                                !ce(`topics`, e.topic_id) &&
                                !o.topics.includes(e.topic_id),
                              click: () => le(`topics`, e.topic_id),
                              children: [
                                e.topic_short_name,
                                (0, p.jsx)(`b`, {
                                  children: ce(`topics`, e.topic_id),
                                }),
                              ],
                            },
                            e.topic_id,
                          ),
                        ),
                      }),
                    ],
                  }),
                  (0, p.jsxs)(`details`, {
                    children: [
                      (0, p.jsx)(`summary`, {
                        children: `Дополнительные фильтры`,
                      }),
                      (0, p.jsxs)(`div`, {
                        className: `extras`,
                        children: [
                          pe.map((e) =>
                            (0, p.jsxs)(
                              `div`,
                              {
                                className: `checkgroup`,
                                children: [
                                  (0, p.jsx)(`b`, { children: e.title }),
                                  e.values.map((t) =>
                                    (0, p.jsxs)(
                                      `label`,
                                      {
                                        children: [
                                          (0, p.jsx)(`input`, {
                                            type: `checkbox`,
                                            checked: o[e.key].includes(t),
                                            onChange: () => le(e.key, t),
                                          }),
                                          (0, p.jsx)(`span`, {
                                            children: h[t] || t,
                                          }),
                                        ],
                                      },
                                      t,
                                    ),
                                  ),
                                ],
                              },
                              e.key,
                            ),
                          ),
                          (0, p.jsx)(ContestFilter, {
                            contests: e.fund_contests,
                            selected: o.contests,
                            toggle: (id) => le(`contests`, id),
                            count: (id) => ce(`contests`, id),
                          }),
                          (0, p.jsxs)(`label`, {
                            className: `inter`,
                            children: [
                              (0, p.jsx)(`input`, {
                                type: `checkbox`,
                                checked: o.interregional,
                                onChange: (e) =>
                                  s((t) => ({
                                    ...t,
                                    interregional: e.target.checked,
                                  })),
                              }),
                              `Только с межрегиональным опытом`,
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, p.jsxs)(`div`, {
                    className: `active`,
                    children: [
                      ue
                        ? (0, p.jsxs)(`span`, {
                            children: [`Выбрано параметров: `, ue],
                          })
                        : (0, p.jsx)(`span`, {
                            children: `Можно комбинировать несколько параметров`,
                          }),
                      (0, p.jsx)(`button`, {
                        disabled: !ue,
                        onClick: () => {
                          (s(m), a(``));
                        },
                        children: `Сбросить`,
                      }),
                    ],
                  }),
                ],
              }),
              (0, p.jsxs)(`section`, {
                className: `work`,
                children: [
                  (0, p.jsxs)(`div`, {
                    className: `left`,
                    children: [
                      (0, p.jsx)(C, {
                        over: `География`,
                        title: `Восемь регионов проекта`,
                        text: `Выберите регион на схематичной картограмме`,
                      }),
                      (0, p.jsx)(`div`, {
                        className: `map`,
                        children: e.regions
                          .sort((e, t) => e.display_order - t.display_order)
                          .map((e, t) =>
                            (0, p.jsxs)(
                              `button`,
                              {
                                className: o.regions.includes(e.region_id)
                                  ? `region chosen`
                                  : `region`,
                                disabled: e.data_status !== `active`,
                                "aria-pressed": o.regions.includes(e.region_id),
                                onClick: () => le(`regions`, e.region_id),
                                children: [
                                  (0, p.jsx)(`svg`, {
                                    viewBox: `0 0 100 100`,
                                    children: (0, p.jsx)(`path`, { d: g[t] }),
                                  }),
                                  (0, p.jsx)(`span`, {
                                    children: e.region_short_name,
                                  }),
                                  e.data_status === `active`
                                    ? (0, p.jsx)(`b`, {
                                        children: ce(`regions`, e.region_id),
                                      })
                                    : (0, p.jsx)(`i`, { children: `Скоро` }),
                                ],
                              },
                              e.region_id,
                            ),
                          ),
                      }),
                      (0, p.jsx)(C, {
                        over: `Направления`,
                        title: `Темы и компетенции`,
                      }),
                      e.topics.map((e) =>
                        (0, p.jsxs)(
                          `button`,
                          {
                            className: o.topics.includes(e.topic_id)
                              ? `topic chosen`
                              : `topic`,
                            onClick: () => le(`topics`, e.topic_id),
                            style: { "--topic": e.color },
                            children: [
                              (0, p.jsx)(`i`, {}),
                              (0, p.jsxs)(`span`, {
                                children: [
                                  (0, p.jsx)(`b`, {
                                    children: e.topic_short_name,
                                  }),
                                  (0, p.jsxs)(`small`, {
                                    children: [
                                      ce(`topics`, e.topic_id),
                                      ` человек`,
                                    ],
                                  }),
                                ],
                              }),
                              (0, p.jsx)(`em`, {
                                children: o.topics.includes(e.topic_id)
                                  ? `Снять`
                                  : `Показать`,
                              }),
                            ],
                          },
                          e.topic_id,
                        ),
                      ),
                    ],
                  }),
                  (0, p.jsxs)(`div`, {
                    className: `right`,
                    children: [
                      (0, p.jsxs)(`div`, {
                        className: `result-head`,
                        children: [
                          (0, p.jsx)(C, {
                            over: `Подборка`,
                            title: `${se.length} проверенных профилей`,
                          }),
                          (0, p.jsx)(`a`, {
                            href: `./data/leaders_map_updated.xlsx`,
                            download: !0,
                            children: `Скачать данные`,
                          }),
                        ],
                      }),
                      se.length
                        ? (0, p.jsx)(`div`, {
                            className: `cards`,
                            children: se.slice(0, c).map((e) =>
                              (0, p.jsxs)(
                                `article`,
                                {
                                  className: `person`,
                                  children: [
                                    (0, p.jsx)(`small`, {
                                      children: [
                                        T.region.get(e.region_id)
                                          ?.region_short_name,
                                        e.municipality_name,
                                      ]
                                        .filter(Boolean)
                                        .join(` · `),
                                    }),
                                    (0, p.jsx)(`h3`, {
                                      children: e.person_name,
                                    }),
                                    (0, p.jsx)(`p`, {
                                      className: `org`,
                                      children: [
                                        e.organization_short_name ||
                                          e.organization_name,
                                        e.position_title,
                                      ]
                                        .filter(Boolean)
                                        .join(` · `),
                                    }),
                                    (0, p.jsxs)(`div`, {
                                      className: `badges`,
                                      children: [
                                        e.role_ids.map((e) =>
                                          (0, p.jsx)(
                                            `span`,
                                            {
                                              className: `role`,
                                              children:
                                                T.role.get(e)?.role_short_name,
                                            },
                                            e,
                                          ),
                                        ),
                                        e.topic_ids.slice(0, 3).map((e) =>
                                          (0, p.jsx)(
                                            `span`,
                                            {
                                              children:
                                                T.topic.get(e)
                                                  ?.topic_short_name,
                                            },
                                            e,
                                          ),
                                        ),
                                      ],
                                    }),
                                    (0, p.jsx)(`p`, {
                                      className: `summary`,
                                      children: e.profile_summary,
                                    }),
                                    (0, p.jsxs)(`div`, {
                                      className: `facts`,
                                      children: [
                                        (0, p.jsxs)(`span`, {
                                          children: [
                                            (0, p.jsx)(`b`, {
                                              children:
                                                e.last_activity_year || `—`,
                                            }),
                                            ` последний факт`,
                                          ],
                                        }),
                                        (0, p.jsxs)(`span`, {
                                          children: [
                                            (0, p.jsx)(`b`, {
                                              children: e.activity_count,
                                            }),
                                            ` подтверждений`,
                                          ],
                                        }),
                                        e.fund_projects.length > 0 &&
                                          (0, p.jsxs)(`span`, {
                                            children: [
                                              (0, p.jsx)(`b`, {
                                                children:
                                                  e.fund_projects.length,
                                              }),
                                              ` проектов фонда`,
                                            ],
                                          }),
                                        e.practice_count > 0 &&
                                          (0, p.jsxs)(`span`, {
                                            children: [
                                              (0, p.jsx)(`b`, {
                                                children: e.practice_count,
                                              }),
                                              ` практик`,
                                            ],
                                          }),
                                      ],
                                    }),
                                    (0, p.jsxs)(`button`, {
                                      className: `detail`,
                                      onClick: () => {
                                        (d(e), w(5));
                                      },
                                      children: [
                                        `Подробнее `,
                                        (0, p.jsx)(`span`, { children: `→` }),
                                      ],
                                    }),
                                  ],
                                },
                                e.person_id,
                              ),
                            ),
                          })
                        : (0, p.jsxs)(`div`, {
                            className: `empty`,
                            children: [
                              (0, p.jsx)(`b`, {
                                children: `Ничего не найдено`,
                              }),
                              (0, p.jsx)(`p`, {
                                children: `Сочетание параметров слишком узкое. Снимите один из фильтров или измените запрос.`,
                              }),
                              (0, p.jsx)(`button`, {
                                onClick: () => {
                                  (s(m), a(``));
                                },
                                children: `Показать всех`,
                              }),
                            ],
                          }),
                      c < se.length &&
                        (0, p.jsxs)(`button`, {
                          className: `more`,
                          onClick: () => l((e) => e + 18),
                          children: [
                            `Показать ещё `,
                            (0, p.jsx)(`span`, {
                              children: Math.min(18, se.length - c),
                            }),
                          ],
                        }),
                    ],
                  }),
                ],
              }),
            ],
          }),
      u &&
        (0, p.jsx)(`div`, {
          className: `overlay`,
          onMouseDown: (e) => {
            e.target === e.currentTarget && d(null);
          },
          children: (0, p.jsxs)(`aside`, {
            className: `drawer`,
            role: `dialog`,
            "aria-modal": `true`,
            "aria-labelledby": `profile-title`,
            children: [
              (0, p.jsx)(`button`, {
                ref: ie,
                className: `close`,
                onClick: () => d(null),
                "aria-label": `Закрыть профиль`,
                children: `×`,
              }),
              (0, p.jsxs)(`div`, {
                className: `drawer-head`,
                children: [
                  (0, p.jsx)(`small`, {
                    children: [
                      T.region.get(u.region_id)?.region_name,
                      u.municipality_name,
                    ]
                      .filter(Boolean)
                      .join(` · `),
                  }),
                  (0, p.jsx)(`h2`, {
                    id: `profile-title`,
                    children: u.person_name,
                  }),
                  (0, p.jsx)(`p`, {
                    children: [u.organization_name, u.position_title]
                      .filter(Boolean)
                      .join(` · `),
                  }),
                  (0, p.jsxs)(`div`, {
                    className: `badges`,
                    children: [
                      u.role_ids.map((e) =>
                        (0, p.jsx)(
                          `span`,
                          {
                            className: `role`,
                            children: T.role.get(e)?.role_short_name,
                          },
                          e,
                        ),
                      ),
                      u.topic_ids.map((e) =>
                        (0, p.jsx)(
                          `span`,
                          { children: T.topic.get(e)?.topic_short_name },
                          e,
                        ),
                      ),
                    ],
                  }),
                ],
              }),
              (0, p.jsxs)(`div`, {
                className: `drawer-body`,
                children: [
                  (0, p.jsx)(FundProjects, { projects: u.fund_projects }),
                  p.jsx(FundResearch, { person: u, data: e }),
                  (0, p.jsx)(te, {
                    title: `Чем полезен для саммита`,
                    text: u.profile_summary,
                  }),
                  (0, p.jsx)(te, {
                    title: `Опыт работы с сообществами и практиками`,
                    text: u.practice_experience,
                  }),
                  (0, p.jsx)(te, {
                    title: `Публичный и образовательный опыт`,
                    text: u.public_experience,
                  }),
                  u.has_interregional_experience &&
                    (0, p.jsx)(te, {
                      title: `Межрегиональный опыт`,
                      text: u.interregional_experience,
                    }),
                  ` `,
                  !!fe.length &&
                    (0, p.jsx)(ne, {
                      title: `Практики · ${fe.length}`,
                      children: fe.map((e) =>
                        (0, p.jsx)(
                          re,
                          {
                            title: e.practice_name,
                            meta: [
                              e.territory,
                              e.person_role_in_practice,
                              T.topic.get(e.primary_topic_id)?.topic_short_name,
                            ]
                              .filter(Boolean)
                              .join(` · `),
                            text: e.format_or_technology,
                            url: e.source_url,
                          },
                          e.practice_id,
                        ),
                      ),
                    }),
                  !!de.length &&
                    (0, p.jsxs)(ne, {
                      title: `Подтверждённый опыт · ${de.length}`,
                      children: [
                        de.slice(0, ee).map((e) =>
                          (0, p.jsx)(
                            re,
                            {
                              title: e.activity_title,
                              meta: [
                                e.activity_kind_label,
                                e.event_date || e.year,
                                e.platform_name,
                                e.event_city,
                              ]
                                .filter(Boolean)
                                .join(` · `),
                              text: e.activity_description,
                              url: e.source_url,
                            },
                            e.activity_id,
                          ),
                        ),
                        ee < de.length &&
                          (0, p.jsx)(`button`, {
                            className: `more`,
                            onClick: () => w((e) => e + 5),
                            children: `Показать ещё`,
                          }),
                      ],
                    }),
                  y(u.profile_source_url) &&
                    (0, p.jsx)(`a`, {
                      className: `profile-link`,
                      href: y(u.profile_source_url),
                      target: `_blank`,
                      rel: `noopener noreferrer`,
                      children: `Основной источник профиля ↗`,
                    }),
                ],
              }),
            ],
          }),
        }),
      p.jsx(ProjectFooter, { data: e }),
    ],
  });
}
function S({ title: e, children: t }) {
  return (0, p.jsxs)(`div`, {
    className: `filter`,
    children: [
      (0, p.jsx)(`h2`, { children: e }),
      (0, p.jsx)(`div`, { children: t }),
    ],
  });
}
function C({ over: e, title: t, text: n }) {
  return (0, p.jsxs)(`div`, {
    className: `head`,
    children: [
      (0, p.jsxs)(`div`, {
        children: [
          (0, p.jsx)(`span`, { children: e }),
          (0, p.jsx)(`h2`, { children: t }),
        ],
      }),
      n && (0, p.jsx)(`p`, { children: n }),
    ],
  });
}
function te({ title: e, text: t }) {
  return t
    ? (0, p.jsxs)(`section`, {
        className: `info`,
        children: [
          (0, p.jsx)(`h3`, { children: e }),
          (0, p.jsx)(`p`, { children: t }),
        ],
      })
    : null;
}
function ne({ title: e, children: t }) {
  return (0, p.jsxs)(`section`, {
    className: `info`,
    children: [(0, p.jsx)(`h3`, { children: e }), t],
  });
}
function re({ title: e, meta: t, text: n, url: r }) {
  return (0, p.jsxs)(`article`, {
    className: `evidence`,
    children: [
      (0, p.jsx)(`small`, { children: t }),
      (0, p.jsx)(`h4`, { children: e }),
      n && (0, p.jsx)(`p`, { children: n }),
      y(r) &&
        (0, p.jsx)(`a`, {
          href: y(r),
          target: `_blank`,
          rel: `noopener noreferrer`,
          children: `Открыть источник ↗`,
        }),
    ],
  });
}
(0, d.createRoot)(document.getElementById(`root`)).render(
  (0, p.jsx)(f.StrictMode, { children: (0, p.jsx)(ee, {}) }),
);
// Fund data is joined once at load time; the source JSON remains unchanged.
function prepareFundData(data) {
  for (const key of [
    "fund_projects",
    "fund_contests",
    "person_fund_projects",
  ]) {
    if (!Array.isArray(data[key])) throw Error(`Отсутствует раздел ${key}`);
  }
  const projects = new Map(
    data.fund_projects.map((project) => [project.project_id, project]),
  );
  const contests = new Map(
    data.fund_contests.map((contest) => [contest.contest_id, contest]),
  );
  const byPerson = new Map();
  for (const link of data.person_fund_projects) {
    const project = projects.get(link.project_id);
    if (!project) throw Error(`Не найден проект ${link.project_id}`);
    if (!byPerson.has(link.person_id)) byPerson.set(link.person_id, new Map());
    byPerson.get(link.person_id).set(project.project_id, {
      ...project,
      contest_name:
        project.contest_name || contests.get(project.contest_id)?.contest_name,
      competition_year:
        project.competition_year ||
        contests.get(project.contest_id)?.competition_year,
    });
  }
  data.people = data.people.map((person) => {
    const linked = [...(byPerson.get(person.person_id)?.values() || [])];
    const roles = new Set(_(person.role_ids));
    if (linked.length) roles.add("ROLE_PROJECT_LEADER");
    return {
      ...person,
      role_ids: [...roles].join(";"),
      fund_projects: linked,
      fund_contest_ids: [
        ...new Set(linked.map((project) => project.contest_id)),
      ],
    };
  });
  return data;
}

function ContestFilter({ contests, selected, toggle, count }) {
  const [query, setQuery] = f.useState("");
  const sorted = [...contests].sort((a, b) =>
    a.contest_name.localeCompare(b.contest_name, "ru"),
  );
  const visible = sorted.filter((item) =>
    v(item.contest_name).includes(v(query)),
  );
  return p.jsxs("section", {
    className: "contest-filter",
    children: [
      p.jsx("h3", { children: "Победители конкурсов фонда Тимченко" }),
      p.jsx("input", {
        type: "search",
        className: "contest-search",
        "aria-label": "Поиск конкурса",
        placeholder: "Найти конкурс по названию или году",
        value: query,
        onChange: (event) => setQuery(event.target.value),
      }),
      p.jsx("p", {
        className: "contest-hint",
        children:
          "Можно выбрать несколько конкурсов. Показаны руководители хотя бы одного из выбранных конкурсов.",
      }),
      p.jsx("div", {
        className: "contest-options",
        children: visible.map((item) => {
          const total = count(item.contest_id),
            checked = selected.includes(item.contest_id);
          return p.jsxs(
            "label",
            {
              children: [
                p.jsx("input", {
                  type: "checkbox",
                  checked,
                  disabled: !total && !checked,
                  onChange: () => toggle(item.contest_id),
                }),
                p.jsx("span", { children: item.contest_name }),
                p.jsx("small", { children: total }),
              ],
            },
            item.contest_id,
          );
        }),
      }),
      !visible.length &&
        p.jsx("p", {
          children: "Конкурсы не найдены. Измените поисковый запрос.",
        }),
      !!selected.length &&
        p.jsx("p", {
          className: "contest-hint",
          children: `Выбрано конкурсов: ${selected.length}`,
        }),
    ],
  });
}

function FundProjects({ projects }) {
  if (!projects?.length) return null;
  const year = (value) =>
    value
      ? String(value).match(/\b(?:19|20)\d{2}\b/)?.[0] || "не указан"
      : "не указан";
  const field = (title, value) =>
    p.jsxs(
      "div",
      {
        children: [
          p.jsx("dt", { children: title }),
          p.jsx("dd", {
            className: value ? "" : "missing",
            children: value || "Не указано в реестре",
          }),
        ],
      },
      title,
    );
  return p.jsxs("section", {
    className: "info fund-projects",
    children: [
      p.jsx("h3", {
        children: `Руководство проектами при поддержке Фонда Тимченко · ${projects.length}`,
      }),
      [...projects]
        .sort(
          (a, b) =>
            (b.competition_year || 0) - (a.competition_year || 0) ||
            a.project_name.localeCompare(b.project_name, "ru"),
        )
        .map((project) =>
          p.jsxs(
            "article",
            {
              className: "fund-project",
              children: [
                p.jsx("h4", { children: project.project_name }),
                p.jsxs("dl", {
                  children: [
                    field("Организация", project.organization_name),
                    field(
                      "Годы реализации",
                      `Начало: ${year(project.start_date)} · окончание: ${year(project.end_date)}`,
                    ),
                    field("Конкурс", project.contest_name),
                    field("Грантовое направление", project.grant_direction),
                    field("Год проведения конкурса", project.competition_year),
                  ],
                }),
                p.jsx("small", {
                  children: `Источник: реестр победителей Фонда Тимченко · заявка ${project.application_number}`,
                }),
              ],
            },
            project.project_id,
          ),
        ),
    ],
  });
}

document.querySelector(".skip-link")?.addEventListener("click", (event) => {
  event.preventDefault();
  document.getElementById("main-content")?.focus();
  document.getElementById("main-content")?.scrollIntoView();
});
