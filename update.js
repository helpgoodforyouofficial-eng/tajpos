/* ============================================================
   🔔 AUTOMATIC UPDATE POPUP SYSTEM (update.js)
   - Max 3-time View Limit per Update Version
   - Mobile & PC Fully Responsive with Scrollable Body
   - Auto Reset on New Version
   ============================================================ */

(function initUpdateNotification() {
    // -----------------------------------------------------------
    // 🛠️ 1. UPDATE CONFIGURATION (Yahan Apni Updates Likhain)
    // -----------------------------------------------------------
    const CURRENT_UPDATE = {
        version: "1.0.2", // 👈 Jab bhi nai update aye, sirf is version number ko badal deen (e.g., 1.0.3)
        title: "🎉 نئی اہم تبدیلیاں اور اپ ڈیٹس!",
        date: "2026-09-06",
        content: `
            <p><strong>السلام علیکم!</strong> ہم نے ایپلیکیشن میں درج ذیل اہم بہتری کی ہے:</p>
            <ul>
                <li><strong>RTL/Urdu Alignment Fix:</strong> تصویر (JPG) سیو کرتے وقت اور WhatsApp پر شیئر کرتے وقت ٹیکسٹ اب بالکل دائیں (Right) طرف ہی رہے گا۔</li>
                <li><strong>Print Layout Optimization:</strong> پرنٹ نکالتے وقت میٹا کالم (Date, Time, NTN) کے درمیانی فاصلے (Gaps) کو بالکل فکس کر دیا گیا ہے۔</li>
                <li><strong>Meta Column Shift Control:</strong> NTN اور بل نمبر کے لیبلز اور ہندسوں کو اب آپ پکسل بائی پکسل ایڈجسٹ کر سکتے ہیں۔</li>
                <li><strong>Performance Improvement:</strong> ایپلیکیشن کی سپیڈ کو تیز اور کیشے (Cache) کے مسائل کو فکس کیا گیا ہے۔</li>
            </ul>
            <p>اگر آپ کو کوئی مسئلہ درپیش ہو تو براؤزر کو ایک بار Hard Refresh (Ctrl + F5) لازمی کریں۔ شکریہ!</p>
        `
    };

    // -----------------------------------------------------------
    // 📊 2. LOGIC: Check View Counts (Max 3 Times)
    // -----------------------------------------------------------
    const savedVersion = localStorage.getItem('app_last_update_version');
    let viewCount = parseInt(localStorage.getItem('app_update_view_count') || '0', 10);

    // Agar Version Naya hai to Counter Reset karain
    if (savedVersion !== CURRENT_UPDATE.version) {
        localStorage.setItem('app_last_update_version', CURRENT_UPDATE.version);
        viewCount = 0;
        localStorage.setItem('app_update_view_count', '0');
    }

    // Agar 3 Bar Se Ziada Dekha Ja Chuka Hai To Stop Kar Deen
    if (viewCount >= 3) {
        return; 
    }

    // Increment View Count for this session/open
    viewCount++;
    localStorage.setItem('app_update_view_count', viewCount.toString());

    // -----------------------------------------------------------
    // 🎨 3. RENDER POPUP & STYLES
    // -----------------------------------------------------------
    window.addEventListener('DOMContentLoaded', () => {
        renderUpdateModal(CURRENT_UPDATE, viewCount);
    });
})();

function renderUpdateModal(data, currentCount) {
    // Create CSS Injection dynamically for Popup
    const style = document.createElement('style');
    style.innerHTML = `
        .update-overlay {
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0, 0, 0, 0.65);
            backdrop-filter: blur(4px);
            display: flex; align-items: center; justify-content: center;
            z-index: 999999; padding: 15px; box-sizing: border-box;
            animation: fadeIn 0.3s ease-in-out;
        }

        .update-card {
            background: #ffffff;
            width: 100%; max-width: 520px;
            max-height: 85vh; /* Mobile Screen Par Fit Ane Ke Liye */
            border-radius: 16px;
            box-shadow: 0 15px 35px rgba(0,0,0,0.3);
            display: flex; flex-direction: column;
            overflow: hidden; direction: rtl;
            font-family: system-ui, -apple-system, sans-serif;
            position: relative;
        }

        .update-header {
            padding: 16px 20px; background: #2c3e50; color: #ffffff;
            display: flex; align-items: center; justify-content: space-between;
            border-bottom: 2px solid #34495e;
        }

        .update-header h3 { margin: 0; font-size: 18px; font-weight: 600; }

        .close-update-btn {
            background: rgba(255,255,255,0.15); border: none; color: #fff;
            width: 32px; height: 32px; border-radius: 50%;
            font-size: 16px; cursor: pointer; display: flex;
            align-items: center; justify-content: center;
            transition: background 0.2s;
        }
        .close-update-btn:hover { background: #e74c3c; }

        /* SCROLLABLE BODY CONTAINER */
        .update-body {
            padding: 20px; overflow-y: auto; color: #333333;
            font-size: 14px; line-height: 1.6; text-align: right;
            flex-grow: 1; max-height: calc(85vh - 120px);
        }

        .update-body ul { padding-right: 20px; margin: 10px 0; }
        .update-body li { margin-bottom: 8px; }

        .update-footer {
            padding: 12px 20px; background: #f8f9fa;
            border-top: 1px solid #eeeeee;
            display: flex; align-items: center; justify-content: space-between;
        }

        .view-badge {
            font-size: 12px; color: #7f8c8d; font-weight: bold;
            background: #eef2f5; padding: 4px 10px; border-radius: 12px;
        }

        .btn-ok {
            background: #27ae60; color: white; border: none;
            padding: 8px 22px; border-radius: 6px; font-weight: bold;
            cursor: pointer; transition: background 0.2s; font-size: 14px;
        }
        .btn-ok:hover { background: #219150; }

        @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
        }
    `;
    document.head.appendChild(style);

    // Modal HTML Structure
    const modalHtml = `
        <div class="update-overlay" id="updateOverlay">
            <div class="update-card">
                <div class="update-header">
                    <h3>${data.title}</h3>
                    <button class="close-update-btn" id="closeUpdateModal" title="بند کریں">❌</button>
                </div>
                <div class="update-body">
                    ${data.content}
                </div>
                <div class="update-footer">
                    <span class="view-badge">نوٹیفکیشن: ${currentCount} / 3</span>
                    <button class="btn-ok" id="btnOkUpdate">ٹھیک ہے (OK)</button>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);

    // Close Actions
    const closeModal = () => {
        const overlay = document.getElementById('updateOverlay');
        if (overlay) overlay.remove();
    };

    document.getElementById('closeUpdateModal').addEventListener('click', closeModal);
    document.getElementById('btnOkUpdate').addEventListener('click', closeModal);
}
