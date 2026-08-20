# Релизный процесс @dementevdev/max-ui

Релизы собираются автоматически: [release-it](https://github.com/release-it/release-it) + [@release-it/conventional-changelog](https://github.com/release-it/conventional-changelog). Конфигурация — [.release-it.json](./.release-it.json).

## Предварительные требования

1. **npm-аккаунт** с правами на публикацию `@dementevdev/max-ui`:
   ```sh
   npm whoami   # если не авторизованы — npm login
   ```
2. **GitHub-токен** с правами `repo` (для GitHub Release): https://github.com/settings/tokens
   ```sh
   export GITHUB_TOKEN=ghp_ваш_токен   # добавьте в ~/.zshrc
   ```
3. Ветка `main`, чистый `git status`, локальный main синхронизирован с origin.

## Команды

```sh
npm run release:dry   # dry-run: покажет версию и превью changelog, ничего не меняя
npm run release       # интерактивный релиз с подтверждениями
npx release-it --ci   # неинтерактивный (CI)
npx release-it patch|minor|major   # явный бамп
```

## Что делает `npm run release`

1. `npm run lint` — релиз не начнётся при ошибках
2. Определяет версию по коммитам с прошлого тега: `feat:` → minor, `fix:` → patch, `BREAKING CHANGE:`/`feat!:` → major
3. Генерирует секцию в `CHANGELOG.md`
4. Бампит `version` в package.json/package-lock.json
5. `npm run build` → `dist/`
6. Коммит `chore(release): X.Y.Z` + тег `vX.Y.Z`
7. `npm publish` + GitHub Release
8. Push коммита и тега в origin

## Требования к коммитам

Строго [Conventional Commits](https://conventionalcommits.org): `<type>(<scope>): <subject>`, scope — имя компонента.

| Тип | Раздел в CHANGELOG | Версия |
|---|---|---|
| `feat` / `feature` | ✨ Новые возможности | minor |
| `fix` | 🐛 Исправления | patch |
| `perf` | ⚡️ Производительность | patch |
| `refactor` | ♻️ Рефакторинг | patch |
| `docs` / `style` / `chore` / `build` / `ci` | соответствующие разделы | — |

Примеры: `feat(Input): добавлен проп hint`, `fix(Spinner): платформенный рендеринг на Android`.

## Гибридный changelog

Автогенерация даёт каркас по коммитам. Наша практика — дополнять его вручную: после `release:dry` можно отредактировать формулировки будущей секции прямо при релизе (release-it показывает превью), а развёрнутые описания фич (как для 0.1.16–0.1.20) дописываются в сгенерированную секцию отдельным `docs:`-коммитом после релиза. Ручную секцию `## Unreleased` перед релизом нужно влить в описания коммитов или удалить — генератор о ней не знает.

## Откат релиза

```sh
git tag -d vX.Y.Z && git push origin :refs/tags/vX.Y.Z
git reset --hard HEAD~1 && git push --force-with-lease origin main
npm deprecate @dementevdev/max-ui@X.Y.Z "отозвано — используйте X.Y.W"
```
> Удалить версию из npm после 72 часов нельзя — только deprecate.

## Чек-лист перед релизом

- [ ] `npm whoami` — авторизован
- [ ] `GITHUB_TOKEN` установлен
- [ ] Ветка `main`, чистый статус, `git pull` сделан
- [ ] Секция `## Unreleased` из CHANGELOG перенесена/удалена
- [ ] `npm run release:dry` показывает корректную версию и changelog
