/* ═══════════════════════════════════════════════════════════════
   GLOBAL PRINT UTILITY FOR ARABIC IEP PLATFORM
   ═══════════════════════════════════════════════════════════════
   
   USAGE: Include this script in all platform HTML files
   
   <script src="print-utility-global.js"></script>
   
   OR embed directly in <script> tag
   ═══════════════════════════════════════════════════════════════ */

(function(window) {
  'use strict';
  
  /* ═══════════════════════════════════════════════════════════════
     Global Print Utility Object
     ═══════════════════════════════════════════════════════════════ */
  
  window.IEPPrintUtil = {
    
    /* ─────────────────────────────────────────────────────────────
       1. Browser Native Print (Arabic-Safe)
       ───────────────────────────────────────────────────────────── */
    
    /**
     * Print using browser's native print dialog
     * This preserves Arabic text perfectly (no image conversion)
     */
    print: function() {
      // Add print class to body for conditional styling
      document.body.classList.add('printing');
      
      // Trigger print
      window.print();
      
      // Clean up after print dialog closes
      setTimeout(function() {
        document.body.classList.remove('printing');
      }, 1000);
    },
    
    /* ─────────────────────────────────────────────────────────────
       2. Print with Custom Title
       ───────────────────────────────────────────────────────────── */
    
    /**
     * Print with custom document title
     * @param {string} title - Document title for print
     */
    printWithTitle: function(title) {
      const originalTitle = document.title;
      document.title = title;
      
      this.print();
      
      // Restore original title
      setTimeout(function() {
        document.title = originalTitle;
      }, 1000);
    },
    
    /* ─────────────────────────────────────────────────────────────
       3. Print Specific Element
       ───────────────────────────────────────────────────────────── */
    
    /**
     * Print only a specific element
     * @param {string|HTMLElement} element - Element selector or element
     */
    printElement: function(element) {
      const el = typeof element === 'string' 
        ? document.querySelector(element) 
        : element;
      
      if (!el) {
        console.error('Element not found for printing');
        return;
      }
      
      // Create print window
      const printWindow = window.open('', '', 'height=600,width=800');
      
      if (!printWindow) {
        alert('الرجاء السماح بفتح النوافذ المنبثقة للطباعة');
        return;
      }
      
      // Get all stylesheets
      const styles = Array.from(document.styleSheets)
        .map(sheet => {
          try {
            return Array.from(sheet.cssRules)
              .map(rule => rule.cssText)
              .join('\n');
          } catch(e) {
            // Handle CORS issues with external stylesheets
            return '';
          }
        })
        .join('\n');
      
      // Build print document
      printWindow.document.write(`
        <!DOCTYPE html>
        <html lang="ar" dir="rtl">
        <head>
          <meta charset="UTF-8">
          <title>${document.title}</title>
          <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700;900&display=swap" rel="stylesheet">
          <style>
            * {
              font-family: 'Cairo', 'Amiri', 'Noto Naskh Arabic', Arial, sans-serif !important;
              direction: rtl !important;
              text-align: right !important;
            }
            body {
              margin: 0;
              padding: 20px;
              background: #fff;
            }
            ${styles}
          </style>
        </head>
        <body>
          ${el.outerHTML}
        </body>
        </html>
      `);
      
      printWindow.document.close();
      
      // Wait for content to load then print
      printWindow.onload = function() {
        setTimeout(function() {
          printWindow.print();
          printWindow.close();
        }, 500);
      };
    },
    
    /* ─────────────────────────────────────────────────────────────
       4. Export to PDF (Browser Print Dialog)
       ───────────────────────────────────────────────────────────── */
    
    /**
     * Export to PDF using browser print dialog
     * User selects "Save as PDF" as destination
     * @param {string} filename - Suggested filename (without .pdf)
     */
    exportPDF: function(filename) {
      // Set custom title for PDF
      const originalTitle = document.title;
      
      if (filename) {
        document.title = filename;
      }
      
      // Show instructions
      this.showPDFInstructions();
      
      // Trigger print dialog
      this.print();
      
      // Restore title
      setTimeout(function() {
        document.title = originalTitle;
      }, 1000);
    },
    
    /* ─────────────────────────────────────────────────────────────
       5. Show PDF Export Instructions
       ───────────────────────────────────────────────────────────── */
    
    showPDFInstructions: function() {
      const modal = document.createElement('div');
      modal.id = 'pdf-instructions-modal';
      modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
      `;
      
      modal.innerHTML = `
        <div style="
          background: #fff;
          padding: 30px;
          border-radius: 12px;
          max-width: 500px;
          direction: rtl;
          text-align: right;
          box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        ">
          <h2 style="margin: 0 0 20px 0; color: #0D2137; font-family: Cairo, sans-serif;">
            📄 تصدير إلى PDF
          </h2>
          <p style="line-height: 1.8; color: #333; margin-bottom: 15px; font-family: Cairo, sans-serif;">
            في نافذة الطباعة التي ستظهر:
          </p>
          <ol style="line-height: 2; color: #555; margin-right: 20px; font-family: Cairo, sans-serif;">
            <li><strong>الوجهة:</strong> اختر "حفظ بصيغة PDF" أو "Save as PDF"</li>
            <li><strong>التخطيط:</strong> اختر "عمودي" أو "Portrait"</li>
            <li><strong>الورق:</strong> A4</li>
            <li>اضغط "حفظ" أو "Save"</li>
          </ol>
          <button onclick="document.getElementById('pdf-instructions-modal').remove()" style="
            background: linear-gradient(135deg, #1565C0, #2196F3);
            color: #fff;
            border: none;
            padding: 12px 30px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            width: 100%;
            margin-top: 20px;
            font-family: Cairo, sans-serif;
          ">
            فهمت، متابعة
          </button>
        </div>
      `;
      
      document.body.appendChild(modal);
      
      // Auto-remove after 8 seconds
      setTimeout(function() {
        if (document.getElementById('pdf-instructions-modal')) {
          modal.remove();
        }
      }, 8000);
    },
    
    /* ─────────────────────────────────────────────────────────────
       6. Validate Print Readiness
       ───────────────────────────────────────────────────────────── */
    
    /**
     * Check if document is ready for printing
     * @param {Array} requiredFields - Required field IDs
     * @returns {Object} {ready: boolean, missing: Array}
     */
    validatePrintReady: function(requiredFields) {
      const missing = [];
      
      requiredFields.forEach(function(fieldId) {
        const field = document.getElementById(fieldId);
        if (field && !field.value.trim()) {
          missing.push(fieldId);
        }
      });
      
      return {
        ready: missing.length === 0,
        missing: missing
      };
    },
    
    /* ─────────────────────────────────────────────────────────────
       7. Show Loading Indicator
       ───────────────────────────────────────────────────────────── */
    
    showLoading: function(message) {
      const loader = document.createElement('div');
      loader.id = 'print-loading';
      loader.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #0D2137;
        color: #fff;
        padding: 20px 40px;
        border-radius: 10px;
        z-index: 9999;
        box-shadow: 0 4px 20px rgba(0,0,0,0.5);
        font-family: Cairo, sans-serif;
        direction: rtl;
        text-align: center;
      `;
      loader.textContent = message || 'جاري التحضير للطباعة...';
      document.body.appendChild(loader);
    },
    
    hideLoading: function() {
      const loader = document.getElementById('print-loading');
      if (loader) {
        loader.remove();
      }
    },
    
    /* ─────────────────────────────────────────────────────────────
       8. Show Success Message
       ───────────────────────────────────────────────────────────── */
    
    showSuccess: function(message) {
      const toast = document.createElement('div');
      toast.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #2E7D32;
        color: #fff;
        padding: 15px 30px;
        border-radius: 8px;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        font-family: Cairo, sans-serif;
        direction: rtl;
      `;
      toast.textContent = message || '✅ تم بنجاح!';
      document.body.appendChild(toast);
      
      setTimeout(function() {
        toast.remove();
      }, 3000);
    },
    
    /* ─────────────────────────────────────────────────────────────
       9. Show Error Message
       ───────────────────────────────────────────────────────────── */
    
    showError: function(message) {
      const toast = document.createElement('div');
      toast.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #C62828;
        color: #fff;
        padding: 15px 30px;
        border-radius: 8px;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        font-family: Cairo, sans-serif;
        direction: rtl;
      `;
      toast.textContent = message || '❌ حدث خطأ';
      document.body.appendChild(toast);
      
      setTimeout(function() {
        toast.remove();
      }, 5000);
    },
    
    /* ─────────────────────────────────────────────────────────────
       10. Generate Print-Ready Filename
       ───────────────────────────────────────────────────────────── */
    
    generateFilename: function(prefix, studentName) {
      const date = new Date().toISOString().split('T')[0];
      const name = studentName || 'document';
      return `${prefix}_${name}_${date}`;
    }
  };
  
  /* ═══════════════════════════════════════════════════════════════
     Global Print Function (Backward Compatible)
     ═══════════════════════════════════════════════════════════════ */
  
  window.printPDF = function() {
    IEPPrintUtil.print();
  };
  
  window.exportPDF = function(filename) {
    IEPPrintUtil.exportPDF(filename);
  };
  
  /* ═══════════════════════════════════════════════════════════════
     Console Log
     ═══════════════════════════════════════════════════════════════ */
  
  console.log('✅ IEP Print Utility loaded - Arabic print-ready');
  
})(window);
