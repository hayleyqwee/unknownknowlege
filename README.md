# Cyber Academy LMS (Next.js + Prisma)

Базовая архитектура LMS-платформы для курсов по кибербезопасности.

## Что реализовано

- **Главная страница** с каталогом курсов.
- **Личный кабинет** с просмотром прогресса.
- **Авторизация JWT** (`/api/auth/register`, `/api/auth/login`).
- **Интерфейс урока**: видеоплеер + Markdown-материал + боковая навигация.
- **Интерактивные тесты** с проверкой на бэкенде (`/api/quiz/submit`) и мгновенным фидбеком.
- **Cyberpunk/Terminal UI**: темная тема, акцент #00FF00/#00AEEF, моноширинный шрифт.

## Быстрый старт

1. Установить зависимости:
   ```bash
   npm install
   ```
2. Создать `.env` из примера:
   ```bash
   cp .env.example .env
   ```
3. Сгенерировать Prisma Client:
   ```bash
   npm run prisma:generate
   ```
4. Выполнить миграции:
   ```bash
   npm run prisma:migrate
   ```
5. Запустить dev-сервер:
   ```bash
   npm run dev
   ```

## Безопасность

- Валидация входных данных через **Zod**.
- Пароли хешируются через **bcrypt**.
- JWT подписывается алгоритмом **HS256**.
- Prisma использует параметризованные запросы для защиты от SQL-инъекций.
- Markdown рендерится без `dangerouslySetInnerHTML`, кастомный рендерер кода снижает XSS-риски.


## Deploy на Vercel

Если получаете `404: NOT_FOUND`, проверьте:

1. **Root Directory** проекта в Vercel указывает на корень репозитория, где лежат `package.json`, `app/page.tsx` и `vercel.json`.
2. В проекте используется **Next.js App Router**, главный entry-файл уже расположен правильно: `app/page.tsx`.
3. В корне есть `vercel.json` с rewrite для клиентских роутов (не затрагивает `api`, `_next` и файлы-ассеты).

Рекомендуемые настройки в Vercel:

- **Framework Preset:** `Next.js`
- **Build Command:** `npm run build`
- **Output Directory:** оставить пустым (Vercel сам использует `.next`)
- **Install Command:** `npm install`


## Prisma Push и Seed для Vercel Postgres

Если при деплое появляется ошибка `The table public.Progress does not exist`, выполните локально:

```bash
npx prisma db push
```

Эта команда применит текущую `prisma/schema.prisma` к подключенной облачной БД.

Для автоматизации деплоя в `package.json` используется:

- `build`: `prisma generate && prisma db push && next build`

Нужно ли запускать `npx prisma db seed`?

- **Для создания таблиц — нет** (это делает `prisma db push`).
- **Для заполнения тестовыми курсами — да**, если нужны стартовые данные.

Запуск:

```bash
npm run seed
```
