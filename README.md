# NORI — Sushi Delivery (демо)

Демонстраційний сайт доставки японської кухні — портфоліо-проєкт.
A demo Japanese food delivery website built as a portfolio project.

> **Це демо.** Замовлення, оплата й промокоди не справжні, персональні дані нікуди не надсилаються — усе зберігається лише у браузері (localStorage).
> **This is a demo.** Orders, payments and promo codes are not real; no personal data leaves the browser.

<!-- Live demo: https://<your-project>.vercel.app -->

## Можливості / Features

- Каталог: 56 страв у категоріях, фільтри, сторінка кожної страви з інгредієнтами
- Кошик із підрахунком суми, мінімальним замовленням і промокодами
- Обране (зберігається в localStorage)
- Дві мови: українська (основна) та англійська
- Демо-checkout із валідацією форми (React Hook Form + Zod) — без реальної оплати
- Сторінки: акції, про нас, доставка, контакти, автори фото
- Адаптивний дизайн, оптимізовані зображення (`next/image`, WebP), sitemap і robots.txt
- Усі сторінки статично згенеровані (SSG)

## Технології / Tech stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Zustand · React Hook Form + Zod · lucide-react

## Запуск / Getting started

Потрібен Node.js 20.9+ (рекомендовано 22).

```bash
npm install
npm run dev            # розробка: http://localhost:3000
npm run build && npm start   # production
npm run lint           # ESLint
npm run typecheck      # TypeScript
```

Порт зайнятий? `npm run dev -- -p 3001`.

## Деплой / Deployment

Проєкт розгортається на Vercel без додаткових налаштувань (Framework preset: Next.js). Змінні оточення не потрібні: адреса сайту для sitemap/OG береться з системної змінної Vercel `VERCEL_PROJECT_PRODUCTION_URL`. За бажанням її можна перевизначити через `NEXT_PUBLIC_SITE_URL`.

## Демо-промокоди

| Код | Знижка | Мінімум |
| --- | --- | --- |
| NORI10 | −10% | 500 ₴ |
| WELCOME15 | −15%, макс. 300 ₴ | 800 ₴ |
| ROLL100 | −100 ₴ | 700 ₴ |

## Структура

- `src/app` — сторінки (головна, меню, сторінка страви, акції, про нас, доставка, контакти, обране, checkout, автори фото)
- `src/components` — `layout`, `home`, `catalog`, `product`, `cart`, `checkout`, `ui` та ін.
- `src/data` — категорії, 56 страв, інгредієнти, промокоди, автори фото
- `src/store` — кошик, обране, мова (localStorage)
- `src/i18n` — українська (основна) та англійська
- `src/app/globals.css` — дизайн-токени (кольори, радіуси, тіні, анімації)
- `public/images` — фото (Unsplash, Unsplash License); список авторів — сторінка `/credits`

## Заміна фото

Покладіть файл у `public/images/products/<назва>.webp` (рекомендовано 1200×900) і вкажіть назву в полі `image` у `src/data/products.ts`. Якщо файл відсутній, показується акуратний плейсхолдер NORI.

## Ліцензія фото / Photo credits

Фотографії — з [Unsplash](https://unsplash.com) за Unsplash License. Автори перелічені на сторінці `/credits`. Назва NORI та контакти на сайті вигадані.
