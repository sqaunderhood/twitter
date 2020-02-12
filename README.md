# sqaunderhood.ru

Коллективный твиттер-аккаунт о тестировании ПО и качественной разработке с
новым автором каждую неделю.

## Старт проекта

    git clone git@github.com:ligurio/sqaunderhood.git
    cd sqaunderhood
    npm install
    npm start

## Проект

* `authors.js` — список авторов
* `test.js` — тесты
* `gulpfile.babel.js` — сборка сайта
* `webpack.config.babel.js` — конфиг для js-bundling
* `package.json`, `.editorconfig`, `.eslintrc`, `.gitignore` — переносимое окружение
* `.travis.yml` — конфиг для тревиса
* `.deploy.sh` — деплой с тревиса
* `README.md`

### Дамп

* `update.js` — апдейт дампа
* `dump/index.js` — получение дампа
* `dump/*.json` — дамп информации об авторах ('tweets', 'info', 'media')
* `dump/images/` — дамп изображений авторов
* `helpers/` — хелперы

### Сайт

* `css/` — CSS для сайта
* `layouts/` — Шаблоны для сайта
* `static/` — статические файлы для сайта
* `pages/` — маркдаун страницы на сайте
* `migration/` — миграции для старых проектов

## Как помочь

1. `authors.js` - дополнить новыми авторами. username, дата первого твита, id первого твита.
2. Подать пулл-реквест :)
3. После принятия запустится travis билд, обновит авторов.

### Как обновить локально

1. `npm run update` - соберет новый дамп для последнего юзеров, твитов...
Обновит всех авторов, у которых `update:true` в `authors.js`.
2. `npm start` - запустит локально копию сайта + создаст статику в `dist/` для деплоя.
3. `npm test` - запустит тесты.
4. `npm run build` - создаст статику в `dist/` для деплоя.
