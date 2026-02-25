# 📋 منصة الخطط التربوية الفردية - دليل تطبيق الطباعة العربية الشاملة
# IEP Platform - Global Arabic Print Implementation Guide

## 🎯 نظرة عامة | Overview

هذا الدليل يشرح كيفية تطبيق نظام الطباعة العربي الشامل على كامل المنصة.
This guide explains how to implement the global Arabic print system across the entire platform.

---

## 📦 الملفات المطلوبة | Required Files

### 1. `print-arabic-global.css`
ملف CSS شامل لجميع أنماط الطباعة العربية
Global CSS file for all Arabic print styles

### 2. `print-utility-global.js`
مكتبة JavaScript للطباعة والتصدير
JavaScript library for print and export functions

---

## 🚀 التطبيق على جميع ملفات HTML | Implementation in All HTML Files

### الخطوة 1: إضافة CSS في قسم `<head>`

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>عنوان الصفحة</title>
  
  <!-- خط Cairo العربي | Cairo Arabic Font -->
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700;900&display=swap" rel="stylesheet">
  
  <!-- أنماط الطباعة الشاملة | Global Print Styles -->
  <link rel="stylesheet" href="print-arabic-global.css">
  
  <!-- أنماط الصفحة الأخرى | Other page styles -->
  <style>
    /* أنماطك هنا */
  </style>
</head>
```

### الخطوة 2: إضافة JavaScript قبل نهاية `</body>`

```html
<body>
  <!-- محتوى الصفحة | Page content -->
  
  <!-- مكتبة الطباعة الشاملة | Global Print Utility -->
  <script src="print-utility-global.js"></script>
  
  <!-- السكريبتات الأخرى | Other scripts -->
  <script>
    // كود الصفحة
  </script>
</body>
```

---

## 🔧 استخدام وظائف الطباعة | Using Print Functions

### 1. طباعة بسيطة | Simple Print

```javascript
// استخدام الدالة المباشرة
function printDocument() {
  IEPPrintUtil.print();
}

// أو استخدام الدالة المختصرة
function printDocument() {
  printPDF();
}
```

### 2. تصدير إلى PDF | Export to PDF

```javascript
function exportDocument() {
  const studentName = document.getElementById('student-name').value;
  const filename = IEPPrintUtil.generateFilename('IEP', studentName);
  
  IEPPrintUtil.exportPDF(filename);
}
```

### 3. طباعة عنصر محدد | Print Specific Element

```javascript
function printSection() {
  IEPPrintUtil.printElement('#section-to-print');
}
```

### 4. التحقق من جاهزية الطباعة | Validate Before Print

```javascript
function printWithValidation() {
  const validation = IEPPrintUtil.validatePrintReady([
    'student-name',
    'assessment-date',
    'assessor-main'
  ]);
  
  if (!validation.ready) {
    alert('الرجاء ملء جميع الحقول المطلوبة قبل الطباعة');
    return;
  }
  
  IEPPrintUtil.print();
}
```

---

## 📄 تطبيق على الصفحات الموجودة | Apply to Existing Pages

### `index.html` - الصفحة الرئيسية | Main Page

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="print-arabic-global.css">
  <!-- أنماط أخرى -->
</head>
<body>
  <!-- المحتوى -->
  
  <script src="print-utility-global.js"></script>
  <!-- سكريبتات أخرى -->
</body>
</html>
```

### `app.html` - الخطة التربوية | IEP Plan

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="print-arabic-global.css">
</head>
<body>
  <!-- محتوى الخطة التربوية -->
  
  <!-- زر الطباعة -->
  <button onclick="printIEP()">طباعة / تصدير PDF</button>
  
  <script src="print-utility-global.js"></script>
  <script>
    function printIEP() {
      const studentName = document.getElementById('s-name').value;
      const filename = IEPPrintUtil.generateFilename('IEP', studentName);
      IEPPrintUtil.exportPDF(filename);
    }
  </script>
</body>
</html>
```

### `assessment.html` - التقييم الشامل | Comprehensive Assessment

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="print-arabic-global.css">
</head>
<body>
  <!-- محتوى التقييم -->
  
  <!-- أزرار الإجراءات -->
  <div class="actions no-print">
    <button onclick="saveAssessment()">💾 حفظ</button>
    <button onclick="printAssessment()">🖨️ طباعة / PDF</button>
  </div>
  
  <script src="print-utility-global.js"></script>
  <script>
    function printAssessment() {
      const validation = IEPPrintUtil.validatePrintReady(['student-name']);
      
      if (!validation.ready) {
        alert('⚠️ الرجاء إدخال اسم الطالب قبل الطباعة');
        return;
      }
      
      const studentName = document.getElementById('student-name').value;
      const filename = IEPPrintUtil.generateFilename('CECSA', studentName);
      IEPPrintUtil.exportPDF(filename);
    }
  </script>
</body>
</html>
```

---

## 🎨 تخصيص الأنماط | Style Customization

### إضافة فئات CSS للعناصر | Add CSS Classes to Elements

```html
<!-- الأقسام الرئيسية -->
<div class="section">
  <div class="section-header">
    <h2>عنوان القسم</h2>
  </div>
  <!-- المحتوى -->
</div>

<!-- معلومات الطالب -->
<div class="student-info">
  <div class="info-field">
    <label>الاسم</label>
    <input type="text" id="student-name">
  </div>
</div>

<!-- بنود التقييم -->
<div class="assessment-item">
  <div class="item-text">نص البند</div>
  <div class="options">
    <label class="option"><input type="radio" name="item1" value="yes">نعم</label>
    <label class="option"><input type="radio" name="item1" value="no">لا</label>
  </div>
</div>

<!-- الجداول -->
<table class="evaluation-table">
  <thead>
    <tr>
      <th>المعيار</th>
      <th>التقييم</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>المعيار 1</td>
      <td>ممتاز</td>
    </tr>
  </tbody>
</table>
```

---

## 📊 فواصل الصفحات | Page Breaks

### إجبار بداية قسم في صفحة جديدة | Force Section to Start on New Page

```html
<!-- سيبدأ هذا القسم دائماً في صفحة جديدة عند الطباعة -->
<div class="section">
  <h2>القسم الثاني</h2>
  <!-- المحتوى -->
</div>
```

### منع تقسيم عنصر | Prevent Element from Breaking

```html
<div class="keep-together">
  <!-- هذا المحتوى لن ينقسم بين صفحتين -->
  <h3>العنوان</h3>
  <p>المحتوى</p>
</div>
```

---

## ✅ قائمة تدقيق التطبيق | Implementation Checklist

- [ ] إضافة `print-arabic-global.css` إلى جميع ملفات HTML
- [ ] إضافة `print-utility-global.js` إلى جميع ملفات HTML
- [ ] استبدال خط Tajawal بخط Cairo
- [ ] إضافة فئات CSS المناسبة للعناصر
- [ ] تحديث أزرار الطباعة لاستخدام `IEPPrintUtil`
- [ ] اختبار الطباعة على جميع الصفحات
- [ ] التحقق من فواصل الصفحات
- [ ] التأكد من اتصال الأحرف العربية
- [ ] اختبار على متصفحات مختلفة (Chrome, Firefox, Safari, Edge)

---

## 🧪 الاختبار | Testing

### اختبار الطباعة | Print Testing

1. افتح الصفحة في المتصفح
2. اضغط زر "طباعة / تصدير PDF"
3. في نافذة الطباعة:
   - الوجهة: "حفظ بصيغة PDF"
   - التخطيط: "عمودي"
   - الورق: A4
4. تحقق من:
   - اتصال الأحرف العربية ✓
   - اتجاه RTL صحيح ✓
   - كل قسم في صفحة جديدة ✓
   - الجداول كاملة ✓
   - لا توجد عناصر مقطوعة ✓

---

## 🐛 حل المشاكل | Troubleshooting

### المشكلة: الأحرف العربية منفصلة
**الحل:** تأكد من تحميل خط Cairo بشكل صحيح

```html
<link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700;900&display=swap" rel="stylesheet">
```

### المشكلة: الأقسام لا تبدأ في صفحات جديدة
**الحل:** تأكد من إضافة class="section" للعناصر

```html
<div class="section">
  <!-- المحتوى -->
</div>
```

### المشكلة: الجداول مقطوعة
**الحل:** تأكد من إضافة class="evaluation-table"

```html
<table class="evaluation-table">
  <!-- الجدول -->
</table>
```

---

## 📞 الدعم | Support

لأي استفسارات أو مشاكل:
1. راجع هذا الدليل أولاً
2. تحقق من console المتصفح للأخطاء
3. تأكد من تحميل جميع الملفات المطلوبة

---

## 📝 ملاحظات مهمة | Important Notes

1. **لا تستخدم html2canvas أو jsPDF** - تسبب مشاكل مع العربية
2. **استخدم window.print() دائماً** - يحافظ على النص العربي
3. **خط Cairo إلزامي** - لديه أفضل دعم للعربية
4. **فئات CSS ضرورية** - للتحكم في فواصل الصفحات

---

## 🎓 أمثلة كاملة | Complete Examples

تجد في مجلد `/examples`:
- `example-iep.html` - مثال الخطة التربوية
- `example-assessment.html` - مثال التقييم
- `example-report.html` - مثال التقرير

---

**✅ انتهى الدليل | End of Guide**

آخر تحديث: 2024
Last Updated: 2024
