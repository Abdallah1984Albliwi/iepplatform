/* ═══════════════════════════════════════════════════════════════
   GLOBAL PRINT UTILITY - NO POPUP VERSION
   Direct print without instruction modal
   ═══════════════════════════════════════════════════════════════ */

(function(window) {
  'use strict';
  
  window.IEPPrintUtil = {
    
    /* ─────────────────────────────────────────────────────────────
       Browser Print (Direct - No Popup)
       ───────────────────────────────────────────────────────────── */
    
    print: function() {
      document.body.classList.add('printing');
      window.print();
      setTimeout(function() {
        document.body.classList.remove('printing');
      }, 1000);
    },
    
    /* ─────────────────────────────────────────────────────────────
       Print with Custom Title
       ───────────────────────────────────────────────────────────── */
    
    printWithTitle: function(title) {
      const originalTitle = document.title;
      document.title = title;
      
      this.print();
      
      setTimeout(function() {
        document.title = originalTitle;
      }, 1000);
    },
    
    /* ─────────────────────────────────────────────────────────────
       Export PDF - NO POPUP, DIRECT PRINT
       ───────────────────────────────────────────────────────────── */
    
    exportPDF: function(filename) {
      const originalTitle = document.title;
      
      if (filename) {
        document.title = filename;
      }
      
      // Direct print - NO popup instructions
      window.print();
      
      setTimeout(function() {
        document.title = originalTitle;
      }, 1000);
    },
    
    /* ─────────────────────────────────────────────────────────────
       Validate Print Readiness
       ───────────────────────────────────────────────────────────── */
    
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
       UI Feedback Functions
       ───────────────────────────────────────────────────────────── */
    
    showLoading: function(message) {
      const loader = document.createElement('div');
      loader.id = 'print-loading';
      loader.className = 'no-print';
      loader.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #0D2137;
        color: #fff;
        padding: 20px 40px;
        border-radius: 10px;
        z-index: 99999;
        box-shadow: 0 4px 20px rgba(0,0,0,0.5);
        font-family: Cairo, sans-serif;
        direction: rtl;
        text-align: center;
      `;
      loader.textContent = message || 'جاري التحضير...';
      document.body.appendChild(loader);
    },
    
    hideLoading: function() {
      const loader = document.getElementById('print-loading');
      if (loader) {
        loader.remove();
      }
    },
    
    showSuccess: function(message) {
      const toast = document.createElement('div');
      toast.className = 'no-print';
      toast.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #2E7D32;
        color: #fff;
        padding: 15px 30px;
        border-radius: 8px;
        z-index: 99999;
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
    
    showError: function(message) {
      const toast = document.createElement('div');
      toast.className = 'no-print';
      toast.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #C62828;
        color: #fff;
        padding: 15px 30px;
        border-radius: 8px;
        z-index: 99999;
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
    
    generateFilename: function(prefix, studentName) {
      const date = new Date().toISOString().split('T')[0];
      const name = studentName || 'document';
      return `${prefix}_${name}_${date}`;
    }
  };
  
  /* ═══════════════════════════════════════════════════════════════
     Backward Compatible Functions
     ═══════════════════════════════════════════════════════════════ */
  
  window.printPDF = function() {
    IEPPrintUtil.print();
  };
  
  window.exportPDF = function(filename) {
    IEPPrintUtil.exportPDF(filename);
  };
  
  console.log('✅ IEP Print Utility loaded - No popup mode');
  
})(window);
