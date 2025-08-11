## المرحلة الأولى: بناء المشروع
FROM node:20 AS build


WORKDIR /app

# نسخ ملفات الباكج وتعريفاتها
COPY package*.json ./

# تثبيت الباكجات
RUN npm install

# نسخ باقي ملفات المشروع
COPY . .

# بناء ملفات الإنتاج (static files)
RUN npm run build

# المرحلة الثانية: خدمة الملفات باستخدام Nginx
FROM nginx:stable-alpine

# نسخ ملفات البناء من المرحلة الأولى لمجلد Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# فتح البورت 80
EXPOSE 80

# تشغيل Nginx في الوضع الأمامي
CMD ["nginx", "-g", "daemon off;"]
