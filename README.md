# Adonis fullstack application

در این راه آموزش راه اندازی اولیه نوشته شده است. 
رای تضیحات کامل به داکیومنتینش های پروژه مراجعه نمایید و همچنین جزئیات پیاده سازی فانکشن ها و کلاس ها در کامنت ها قرار گرقته است.

برای مشاهده داکیمنت های swagger و توضیحات ای پی ها به ادرس site.com/docs مراجعه نمایید. در صورت فعال نبودن متغیر SWAGGER_ACTIVATE را در فایل .env به true تغییر دهید.
فایل های yaml برای تنظیمات سواگر در پوشه docs قرار گرفته است.


این پروژه شامل قسمت های اصلی و boilerplate بک اند و فرانت اند برای ادونیس و ویو میشود.
بک اند این پروژه شامل موارد زیر است:

1. Bodyparser
2. Session
3. Authentication
4. Web security middleware
5. CORS
6. Edge template engine
7. Lucid ORM
8. Migrations and seeds
9. Swagger


## نصب اولیه 


ابتدا برنامه کامند لاین ادونیس را نصب کنید.

```bash 
npm i -g @adonisjs/cli
```

سپس از گیت پروژه کلون گرفته و وارد پوشه پروژه شوید.
```bash
git clone http://gitlab.com/...
cd fs_project_name
```

و در صورتی که قصد توسعه برنامه را دارید وارد برنچ develop شوید

```bash
git checkout develop
```

و در صورتی که قصد اجرا در پروداکشن را دارید تغییری در گیت ایجاد نکنید.


سپس دستورات زیر را به ترتیب اجرا نمایید.

```bash
npm install
cp .env.example .env
adonis key:generate
```

سپس فایل .env را ادیت کرده و تنظیمات مربوط به سیستم خود را در آن وارد نمایید.
به طور مثال نوع دیتابیس و یوزر و پسورد و ...




## جهت توسعه بک اند

در صورتی که نیاز به قسمت فرانت اند سیستم ندارید میتوانید با قرار دادن متغیر FRONTEND_DEACTIVATE بر true بدون مشکل تنها بک اند را اجرا نمایید.
پس از تغییر این متغیر مراحل زیر را ادامه دهید.

### Migrations

برای اجرای مایگریشن و ایجاد جداول در دیتایبس دستور زیر را اجرا نمایید.

```bash
adonis migration:run
```

### Seed

حال دستور زیر را برای سید شدن دیتاها در دیتابیس اجرا نمایید.

```bash
adonis seed
```

همچنین برای اپدیت شدن دسترسی ها در محیط پروداکشن:

```bash
adonis seed --files='0PermissionSeeder.js'
```

این دستور دسترسی ها را در دیتابیس اپدیت کرده و آنها را به role پیش فرض ادمین میدهد.
در صورت عدم وجود این رول ابتدا آن را ایجاد میکند.



## فرانت اند


در صورتی که تنها نیاز به اجرای فرانت اند دارید مراحل زیر را در فایل .env انجام دهید:
ابتدا برای sqlite را نصب کنید (میتوانید از mysql نیز استفاده کنید اما انتخاب راحت تر sqlite است)
قسمت DB_CONNECTION را روی sqlite قرار دهید.
متغیر QUEUE_USING را به false تغییر دهدید.


برای اجرای مایگریشن و ایجاد جداول در دیتایبس دستور زیر را اجرا نمایید.

```bash
adonis migration:run
```

### Seed

حال دستور زیر را برای سید شدن دیتاها در دیتابیس اجرا نمایید.

```bash
adonis seed
```

سپس میتواند از طرق متغیر APP_URL ادرس api سرور را وارد نمایید.

برای توسعه فرانت دستور زیر را اجرا نمایید.
این دستور فایل های جاواسکریپت را توسط وبپک کامپایل کرده و در حالت watch قرار میگیرد.


```js
npm run assets-watch
```


برای کامپایل کردن فرانت اند در محیط پروداکشن دستور زیر را وارد نمایید.

```bash
npm run assets-production
```

## اجرای سرور 

در صورتی نیاز به مشاهده swagger api در فایل env متغیر SWAGGER_ACTIVE را به true تغییر دهید.
در صورت اجرا در پروداکشن این متغیر را false کنید.


Development: 
```bash
adonis serve 
```

Production:
```bash
pm2 start server.js --name=app_name
```


### تنظیمات env 

**HOST**: server ip for accessing site
**PORT**: Port this app is going to run on

values: production , development , testing
**NODE_ENV**

app url used in front end for accessing api,
**APP_URL**

port that bull preview and status can be viewed
**BULL_PORT**

**App_NAME**
**CACHE_VIEWS**

____ setting for apm server
**APM_NAME**
**APM_URL**
**APM_TOKEN**
_____

 activate sawgger page for api docuemntation
**SWAGGER_ACTIVE**

if set to false app start normaly, if true frontend loading is ignored only api runs
**FRONTEND_DEACTIVATE**

if this is programming is using QUEUE set to true
**QUEUE_USING**

app key used for encryption - should be strong and safe , can also be generate with 'adonis key:generate' commad
**APP_KEY**

 ____ database setting

 mysql , sqlite , postgres
**DB_CONNECTION**
**DB_HOST**
**DB_PORT**
**DB_USER**
**DB_PASSWORD**
**DB_DATABASE=**
 ____



**SESSION_DRIVER**

 default hash driver for storing password
**HASH_DRIVER** 

**REDIS_CONNECTION**
**REDIS_HOST**
**REDIS_PORT**
**REDIS_PASSWORD**

**CACHE_STORE**
