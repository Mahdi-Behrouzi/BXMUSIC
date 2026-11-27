# BXMUSIC Now Playing Fixes

## مشکلاتی که درست می‌شن:
1. دکمه برگشت واضح‌تر + فقط شیت رو می‌بنده (نمی‌ره کتابخانه)
2. زمان‌ها دیگه جابه‌جا نیستن (چپ = زمان فعلی، راست = کل)
3. نوار پیشرفت نرم‌تر و پایدارتر

## فایل‌ها:
- `player-bar.js` → جایگزین کن با نسخه فعلی
- `np-fixes.css` → جدید

## نصب:

### ۱. CSS
در `index.html` این خط رو اضافه کن:
```html
<link rel="stylesheet" href="css/np-fixes.css">
```
(فایل `np-fixes.css` رو بگذار داخل پوشه `css/`)

### ۲. JS
فایل `js/components/player-bar.js` رو با نسخه جدید جایگزین کن.

### ۳. (اختیاری ولی توصیه می‌شه) آیکون برگشت
در `index.html` داخل `#npSheet .np-top`، SVG فعلی chevron رو با این عوض کن:

**قدیمی:**
```html
<svg class="chev" ... onclick="closeNowPlaying()"><path d="M6 9l6 6 6-6"/></svg>
```

**جدید (فلش برگشت واضح):**
```html
<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" onclick="closeNowPlaying()"><path d="M15 18l-6-6 6-6"/></svg>
```

بعد از این کارها hard-refresh کن (Ctrl+Shift+R) و تست کن.
