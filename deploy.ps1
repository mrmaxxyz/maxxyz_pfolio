# Деплой скрипт для maxxyz.ru
Write-Host "Начинаю деплой на maxxyz.ru..." -ForegroundColor Cyan

# 1. Сборка проекта
Write-Host "`nСборка проекта..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "Ошибка сборки!" -ForegroundColor Red
    exit 1
}

# 2. Создание архива без node_modules, .next, .git
Write-Host "`nСоздание архива..." -ForegroundColor Yellow
tar -czf deploy.tar.gz --exclude=node_modules --exclude=.next --exclude=.git --exclude=.env.local --exclude=deploy.tar.gz .

# 3. Загрузка на сервер
Write-Host "`nЗагрузка на сервер..." -ForegroundColor Yellow
scp deploy.tar.gz .env.local maxxyz@82.202.139.181:~

# 4. Распаковка и перезапуск на сервере  
Write-Host "`nОбновление на сервере..." -ForegroundColor Yellow
ssh maxxyz@82.202.139.181 "cd /var/www/maxxyz-portfolio && sudo tar -xzf ~/deploy.tar.gz && sudo chown -R maxxyz:maxxyz . && /home/maxxyz/.nvm/versions/node/v22.14.0/lib/node_modules/pm2/bin/pm2 restart maxxyz-portfolio"

# 5. Очистка
Write-Host "`nОчистка временных файлов..." -ForegroundColor Yellow
Remove-Item deploy.tar.gz

Write-Host "`nДеплой успешно завершен!" -ForegroundColor Green
Write-Host "Сайт доступен по адресу: https://maxxyz.ru" -ForegroundColor Cyan
