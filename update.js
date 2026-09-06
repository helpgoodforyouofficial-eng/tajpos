/* ============================================================
   🔔 BILINGUAL AUTOMATIC UPDATE POPUP SYSTEM (update.js)
   - Dual Language Support (English / Urdu Toggle)
   - Default Language: English
   - Max 3-time View Limit per Update Version
   - Fully Responsive with Scrollable Body
   ============================================================ */

(function initUpdateNotification() {
    // -----------------------------------------------------------
    // 🛠️ 1. UPDATE CONFIGURATION (English & Urdu Content)
    // -----------------------------------------------------------
    const CURRENT_UPDATE = {
        version: "v80", // 👈 Nayi update par is version ko change karein
        
        // 🇬🇧 ENGLISH CONTENT (Default)
        en: {
            title: "🎉 New Updates & Improvements!",
            okBtn: "Got it (OK)",
            badgePrefix: "Notification:",
            content: `
                <p><strong>Hello!</strong> We have made several key updates to improve your experience:</p>
                    <ul>
    <li><strong>Dual Language Bills:</strong> Previously, bills could only be created in English. Now, you can easily generate bills in both English and Urdu!</li>
    <li><strong>Layout Direction Switcher:</strong> To convert a bill from English to Urdu (or vice versa), simply use the "Layout Direction" toggle option at the top of the page.</li>
    <li><strong>Customizable Owner Details:</strong> Added Owner Name functionality! You can now edit the Owner Name as well as customize the "Owner" label text according to your business needs.</li>
    <li><strong>RTL & Print Fixes:</strong> Perfected text alignment for image downloads (JPG) and PDF printing in Urdu mode.</li>


                    <li><strong>RTL/Urdu Alignment Fix:</strong> Text alignment during image download (JPG) and WhatsApp sharing now stays strictly on the right side.</li>
                    <li><strong>Print Layout Optimization:</strong> Resolved gaps in the metadata column (Date, Time, NTN) during print mode.</li>
                    <li><strong>Shift Control for Metadata:</strong> Precision pixel-by-pixel controls added for NTN and Bill No labels.</li>
                    <li><strong>Performance Boost:</strong> Faster rendering speed and improved cache management.</li>
                </ul>
                <p>If you encounter any issues, please perform a Hard Refresh (Ctrl + F5). Thank you!</p>
            `
        },

        // 🇵🇰 URDU CONTENT
        ur: {
            title: "🎉 نئی اہم تبدیلیاں اور اپ ڈیٹس!",
            okBtn: "ٹھیک ہے (OK)",
            badgePrefix: "نوٹیفکیشن:",
            content: `
                <p><strong>السلام علیکم!</strong> ہم نے ایپلیکیشن میں درج ذیل اہم بہتری کی ہے:</p>
                <ul>
    <li><strong>انگلش اور اردو بلز:</strong> پہلے بل صرف انگلش میں بنتے تھے، اب آپ انگلش اور اردو دونوں زبانوں میں آسانی سے بل بنا سکتے ہیں۔</li>
    <li><strong>زبان تبدیل کرنے کا طریقہ:</strong> انگلش سے اردو یا اردو سے انگلش بل تبدیل کرنے کے لیے صفحے کے سب سے اوپر موجود "Layout Direction" کے آپشن کا استعمال کریں۔</li>
    <li><strong>آنر نیم کی سہولت (Owner Name):</strong> اب آپ اپنے کاروبار کے لحاظ سے آنر کا نام اور لفظ "Owner" (لیبل) کو اپنی مرضی سے ایڈٹ اور تبدیل کر سکتے ہیں۔</li>
    <li><strong>پرنٹ اور امیج الائنمنٹ فکس:</strong> تصویر (JPG) ڈاؤن لوڈ کرنے اور پرنٹ نکالنے کے دوران اردو الائنمنٹ کو بالکل پرفیکٹ کر دیا گیا ہے۔</li>

                
                    <li><strong>RTL/Urdu Alignment Fix:</strong> تصویر (JPG) سیو کرتے وقت اور WhatsApp پر شیئر کرتے وقت ٹیکسٹ اب بالکل دائیں (Right) طرف ہی رہے گا۔</li>
                    <li><strong>Print Layout Optimization:</strong> پرنٹ نکالتے وقت میٹا کالم (Date, Time, NTN) کے درمیانی فاصلے (Gaps) کو بالکل فکس کر دیا گیا ہے۔</li>
                    <li><strong>Meta Column Shift Control:</strong> NTN اور بل نمبر کے لیبلز اور ہندسوں کو اب آپ پکسل بائی پکسل ایڈجسٹ کر سکتے ہیں۔</li>
                    <li><strong>Performance Improvement:</strong> ایپلیکیشن کی سپیڈ کو تیز اور کیشے (Cache) کے مسائل کو فکس کیا گیا ہے۔</li>
                </ul>
                <p>اگر آپ کو کوئی مسئلہ درپیش ہو تو براؤزر کو ایک بار Hard Refresh (Ctrl + F5) لازمی کریں۔ شکریہ!</p>
            `
        }
    };

    // -----------------------------------------------------------
    // 📊 2. LOGIC: Check View Counts (Max 3 Times)
    // -----------------------------------------------------------
    const savedVersion = localStorage.getItem('app_last_update_version');
    let viewCount = parseInt(localStorage.getItem('app_update_view_count') || '0', 10);

    // Reset counter if version is new
    if (savedVersion !== CURRENT_UPDATE.version) {
        localStorage.setItem('app_last_update_version', CURRENT_UPDATE.version);
        viewCount = 0;
        localStorage.setItem('app_update_view_count', '0');
    }

    // Stop if already viewed 3 times
    if (viewCount >= 5) {
        return; 
    }

    // Increment count
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
    let currentLang = 'en'; // 👈 Default Language set to English

    // Dynamic Style Injection
    const style = document.createElement('style');
    style.id = 'update-modal-styles';
    style.innerHTML = `
        .update-overlay {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0, 0, 0, 0.65); backdrop-filter: blur(4px);
            display: flex; align-items: center; justify-content: center;
            z-index: 999999; padding: 15px; box-sizing: border-box;
            animation: fadeIn 0.3s ease-in-out;
        }

        .update-card {
            background: #ffffff; width: 100%; max-width: 520px; max-height: 85vh;
            border-radius: 16px; box-shadow: 0 15px 35px rgba(0,0,0,0.3);
            display: flex; flex-direction: column; overflow: hidden;
            font-family: system-ui, -apple-system, sans-serif; position: relative;
            transition: all 0.2s ease;
        }

        /* Language Toggle Bar */
        .update-lang-bar {
            background: #1a252f; padding: 8px 15px;
            display: flex; justify-content: center; align-items: center; gap: 10px;
            border-bottom: 1px solid #34495e;
        }

        .lang-btn {
            background: transparent; border: 1px solid #5d6d7e; color: #abb2b9;
            padding: 4px 16px; border-radius: 20px; font-size: 13px; font-weight: bold;
            cursor: pointer; transition: all 0.2s ease;
        }

        .lang-btn.active {
            background: #3498db; color: #ffffff; border-color: #3498db;
            box-shadow: 0 2px 6px rgba(52, 152, 219, 0.4);
        }

        .update-header {
            padding: 14px 20px; background: #2c3e50; color: #ffffff;
            display: flex; align-items: center; justify-content: space-between;
        }

        .update-header h3 { margin: 0; font-size: 17px; font-weight: 600; }

        .close-update-btn {
            background: rgba(255,255,255,0.15); border: none; color: #fff;
            width: 30px; height: 30px; border-radius: 50%; font-size: 14px;
            cursor: pointer; display: flex; align-items: center; justify-content: center;
            transition: background 0.2s;
        }
        .close-update-btn:hover { background: #e74c3c; }

        .update-body {
            padding: 20px; overflow-y: auto; color: #333333; font-size: 14px;
            line-height: 1.6; flex-grow: 1; max-height: calc(85vh - 150px);
        }

        .update-body ul { padding-left: 20px; margin: 10px 0; }
        .update-card[dir="rtl"] .update-body ul { padding-left: 0; padding-right: 20px; }
        .update-body li { margin-bottom: 8px; }

        .update-footer {
            padding: 12px 20px; background: #f8f9fa; border-top: 1px solid #eeeeee;
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

    // HTML Structure
    const modalHtml = `
        <div class="update-overlay" id="updateOverlay">
            <div class="update-card" id="updateCard" dir="ltr">
                <div class="update-lang-bar">
                    <button class="lang-btn active" id="btnLangEn">English</button>
                    <button class="lang-btn" id="btnLangUr">اردو</button>
                </div>
                <div class="update-header">
                    <h3 id="updateTitle">${data.en.title}</h3>
                    <button class="close-update-btn" id="closeUpdateModal" title="Close">❌</button>
                </div>
                <div class="update-body" id="updateContent">
                    ${data.en.content}
                </div>
                <div class="update-footer">
                    <span class="view-badge" id="updateBadge">${data.en.badgePrefix} ${currentCount} / 3</span>
                    <button class="btn-ok" id="btnOkUpdate">${data.en.okBtn}</button>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);

    // Elements
    const card = document.getElementById('updateCard');
    const title = document.getElementById('updateTitle');
    const content = document.getElementById('updateContent');
    const badge = document.getElementById('updateBadge');
    const okBtn = document.getElementById('btnOkUpdate');
    const btnEn = document.getElementById('btnLangEn');
    const btnUr = document.getElementById('btnLangUr');

    // Switch Language Function
    const switchLanguage = (lang) => {
        currentLang = lang;
        const langData = data[lang];

        if (lang === 'ur') {
            card.setAttribute('dir', 'rtl');
            btnUr.classList.add('active');
            btnEn.classList.remove('active');
        } else {
            card.setAttribute('dir', 'ltr');
            btnEn.classList.add('active');
            btnUr.classList.remove('active');
        }

        title.innerHTML = langData.title;
        content.innerHTML = langData.content;
        badge.innerHTML = `${langData.badgePrefix} ${currentCount} / 5`;
        okBtn.innerHTML = langData.okBtn;
    };

    // Event Listeners for Buttons
    btnEn.addEventListener('click', () => switchLanguage('en'));
    btnUr.addEventListener('click', () => switchLanguage('ur'));

    // Close Actions
    const closeModal = () => {
        const overlay = document.getElementById('updateOverlay');
        if (overlay) overlay.remove();
    };

    document.getElementById('closeUpdateModal').addEventListener('click', closeModal);
    okBtn.addEventListener('click', closeModal);
}
