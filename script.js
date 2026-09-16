/**
 * Kopi Kalcer Hotspot Portal Logic
 * Supports: Voucher/Member tab toggling, Carousel Slider, Marquee Ticker, 
 * Password Show/Hide, and local offline browser demo simulation.
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- Elements ---
    const tabVoucher = document.getElementById('tab-voucher');
    const tabMember = document.getElementById('tab-member');
    
    const inputLabel = document.getElementById('input-label-username');
    const usernameInput = document.getElementById('username');
    const passwordContainer = document.getElementById('password-container');
    const passwordInput = document.getElementById('password');
    const loginForm = document.getElementById('login-form');
    
    const togglePasswordBtn = document.getElementById('toggle-password');
    const errorBox = document.getElementById('error-box');

    let currentTab = 'voucher'; // 'voucher' or 'member'

    // --- CAROUSEL SLIDER LOGIC ---
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-slide');
    const nextBtn = document.querySelector('.carousel-btn-next');
    const prevBtn = document.querySelector('.carousel-btn-prev');
    const slideIntervalTime = 5000; // 5 seconds auto play
    let slideInterval;

    function showSlide(index) {
        if (!slides || slides.length === 0) return;
        
        // Remove active class from all slides
        slides.forEach(slide => slide.classList.remove('active'));
        
        // Calculate bounds
        currentSlide = (index + slides.length) % slides.length;
        
        // Set active slide
        slides[currentSlide].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    function startSlideShow() {
        slideInterval = setInterval(nextSlide, slideIntervalTime);
    }

    function resetSlideShow() {
        clearInterval(slideInterval);
        startSlideShow();
    }

    // Attach Carousel Events
    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetSlideShow();
        });
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetSlideShow();
        });
    }

    // Initialize Slider
    if (slides && slides.length > 0) {
        showSlide(0);
        startSlideShow();
    }

    // --- MODE TOGGLE LOGIC VIA BOTTOM MEMBER LINK ---
    const toggleMemberLogin = document.getElementById('toggle-member-login');
    if (toggleMemberLogin) {
        toggleMemberLogin.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentTab === 'voucher') {
                switchToMember();
            } else {
                switchToVoucher();
            }
        });
    }

    function switchToMember() {
        currentTab = 'member';
        
        // Adjust form details
        if (inputLabel) inputLabel.innerText = "Username Member";
        if (usernameInput) {
            usernameInput.placeholder = "Masukkan username member";
            usernameInput.setAttribute('autocapitalize', 'none');
            usernameInput.classList.remove('uppercase-input');
        }
        if (passwordContainer) passwordContainer.style.display = 'block';
        if (passwordInput) {
            passwordInput.required = true;
        }
        
        // Change shortcut text & icon to Voucher
        if (toggleMemberLogin) {
            toggleMemberLogin.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-3-12v.75m0 3v.75m0 3v.75m0 3V18M3 6.75A2.25 2.25 0 0 1 5.25 4.5h13.5A2.25 2.25 0 0 1 21 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 17.25V6.75Z" />
                </svg>
                Voucher
            `;
        }
        clearError();
        if (usernameInput) usernameInput.focus();
    }

    function switchToVoucher() {
        currentTab = 'voucher';
        
        // Adjust form details
        if (inputLabel) inputLabel.innerText = "Kode Voucher";
        if (usernameInput) {
            usernameInput.placeholder = "Masukkan kode voucher";
            usernameInput.setAttribute('autocapitalize', 'characters');
            usernameInput.classList.add('uppercase-input');
        }
        if (passwordContainer) passwordContainer.style.display = 'none';
        if (passwordInput) {
            passwordInput.required = false;
            passwordInput.value = '';
        }
        
        // Change shortcut text & icon to Member
        if (toggleMemberLogin) {
            toggleMemberLogin.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
                Member
            `;
        }
        clearError();
        if (usernameInput) usernameInput.focus();
    }

    // --- PASSWORD EYE TOGGLE LOGIC ---
    if (togglePasswordBtn && passwordInput) {
        togglePasswordBtn.addEventListener('click', () => {
            const isPassword = passwordInput.type === 'password';
            passwordInput.type = isPassword ? 'text' : 'password';
            
            // Swap SVG Eye Icons
            if (isPassword) {
                togglePasswordBtn.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.2" stroke="currentColor" style="width:16px;height:16px;">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                `;
            } else {
                togglePasswordBtn.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.2" stroke="currentColor" style="width:16px;height:16px;">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <circle cx="12" cy="12" r="3" />
                    </svg>
                `;
            }
        });
    }

    // --- AUTO-LOGIN VIA URL QUERY PARAMETERS (QR SCAN REDIRECT) ---
    const urlParams = new URLSearchParams(window.location.search);
    const queryUser = urlParams.get('username') || urlParams.get('user');
    const queryPass = urlParams.get('password') || urlParams.get('pass');

    if (queryUser) {
        // Clear any existing values
        if (usernameInput) usernameInput.value = '';
        if (passwordInput) passwordInput.value = '';

        const autoLoginOverlay = document.createElement('div');
        autoLoginOverlay.className = 'scanner-modal';
        autoLoginOverlay.style.zIndex = '2000';
        autoLoginOverlay.innerHTML = `
            <div class="scanner-modal-content" style="text-align: center; max-width: 280px; padding: 24px 20px;">
                <h3 style="color: var(--primary); margin-bottom: 12px; font-size: 14px;">Mendeteksi QR Voucher ☕</h3>
                <div class="loading-dots" style="margin: 16px 0 8px;">
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                </div>
                <p style="font-size: 10px; color: var(--text-muted); font-weight: 600;">Menyeduh koneksi internet...</p>
            </div>
        `;
        document.body.appendChild(autoLoginOverlay);

        setTimeout(() => {
            if (queryPass) {
                switchToMember();
                if (usernameInput) usernameInput.value = queryUser;
                if (passwordInput) passwordInput.value = queryPass;
            } else {
                switchToVoucher();
                if (usernameInput) usernameInput.value = queryUser;
            }

            // Trigger submit
            setTimeout(() => {
                // Remove overlay
                if (autoLoginOverlay) autoLoginOverlay.remove();
                
                if (loginForm) {
                    if (isDemoEnv()) {
                        simulateLogin(queryPass ? 'Member' : 'Voucher', queryUser);
                    } else {
                        loginForm.submit();
                    }
                }
            }, 1000);
        }, 1200);
    }

    // --- FORM VALIDATION & OFFLINE SIMULATION ---
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            const uVal = usernameInput ? usernameInput.value.trim() : '';
            const pVal = passwordInput ? passwordInput.value.trim() : '';

            if (currentTab === 'voucher') {
                if (!uVal) {
                    e.preventDefault();
                    showError('Silakan masukkan kode voucher Anda!');
                    return;
                }
                // MikroTik Voucher rule: password must equal username voucher
                if (passwordInput) passwordInput.value = uVal.toUpperCase();
                
                if (isDemoEnv()) {
                    e.preventDefault();
                    simulateLogin('Voucher', uVal.toUpperCase());
                }
            } else {
                if (!uVal || !pVal) {
                    e.preventDefault();
                    showError('Lengkapi username dan password member Anda!');
                    return;
                }
                
                if (isDemoEnv()) {
                    e.preventDefault();
                    simulateLogin('Member', uVal);
                }
            }
        });
    }

    // Helper Functions
    function showError(msg) {
        if (errorBox) {
            errorBox.innerHTML = `<span>⚠️</span> <div>${msg}</div>`;
            errorBox.style.display = 'flex';
        } else {
            alert(msg);
        }
    }

    function clearError() {
        if (errorBox) {
            errorBox.style.display = 'none';
        }
    }

    function isDemoEnv() {
        return window.location.hostname === 'localhost' || 
               window.location.hostname === '127.0.0.1' || 
               window.location.protocol === 'file:';
    }

    function simulateLogin(type, name) {
        localStorage.setItem('maduranet_active', 'true');
        localStorage.setItem('maduranet_username', name);
        localStorage.setItem('maduranet_type', type);
        localStorage.setItem('maduranet_ip', '192.168.100.23');
        localStorage.setItem('maduranet_mac', '00:1A:2B:3C:4D:5E');
        localStorage.setItem('maduranet_login_time', new Date().toLocaleTimeString());
        
        // Redirect to redirect.html for a loading spinner state
        window.location.href = 'redirect.html';
    }

    // --- QR GUIDE & REDIRECT CONTROLLER ---
    // Konfigurasi URL Scanner Eksternal (Walled Garden Whitelisted)
    // Kosongkan "" jika ingin menggunakan modal panduan visual biasa bawaan portal.
    const EXTERNAL_QR_SCANNER_URL = "";

    const scannerModal = document.getElementById('scanner-modal');
    const shortcutScanBtn = document.getElementById('shortcut-scan-btn');
    const navScanBtn = document.getElementById('nav-scan-btn');
    const closeScanner = document.getElementById('close-scanner');
    const closeGuideBtn = document.getElementById('close-guide-btn');

    function handleScanAction(e) {
        if (e) e.preventDefault();
        
        if (EXTERNAL_QR_SCANNER_URL && EXTERNAL_QR_SCANNER_URL.trim() !== "") {
            // Dapatkan URL dasar login saat ini untuk redirect balik oleh scanner eksternal
            const currentBase = window.location.href.split('?')[0];
            const baseRedirectParam = `redirect=${encodeURIComponent(currentBase)}`;
            
            // Cek apakah perangkat menggunakan OS Android
            const isAndroid = /Android/i.test(navigator.userAgent);
            if (isAndroid) {
                // Ekstrak protokol (http/https) dan path untuk intent://
                let cleanUrl = EXTERNAL_QR_SCANNER_URL;
                let scheme = 'https';
                if (cleanUrl.startsWith('https://')) {
                    cleanUrl = cleanUrl.slice(8);
                    scheme = 'https';
                } else if (cleanUrl.startsWith('http://')) {
                    cleanUrl = cleanUrl.slice(7);
                    scheme = 'http';
                }
                
                const innerSeparator = cleanUrl.includes('?') ? '&' : '?';
                const fallbackTargetUrl = `${EXTERNAL_QR_SCANNER_URL}${innerSeparator}${baseRedirectParam}`;
                const intentUrl = `intent://${cleanUrl}${innerSeparator}${baseRedirectParam}#Intent;scheme=${scheme};package=com.android.chrome;S.browser_fallback_url=${encodeURIComponent(fallbackTargetUrl)};end`;
                
                window.location.href = intentUrl;
            } else {
                // Untuk iOS / PC, lakukan pengalihan HTTPS standar
                const separator = EXTERNAL_QR_SCANNER_URL.includes('?') ? '&' : '?';
                const redirectUrl = `${EXTERNAL_QR_SCANNER_URL}${separator}${baseRedirectParam}`;
                window.location.href = redirectUrl;
            }
        } else {
            openScannerModal();
        }
    }

    function openScannerModal() {
        if (scannerModal) {
            scannerModal.style.display = 'flex';
        }
    }

    function closeScannerModal() {
        if (scannerModal) {
            scannerModal.style.display = 'none';
        }
    }

    if (shortcutScanBtn) shortcutScanBtn.addEventListener('click', handleScanAction);
    if (navScanBtn) navScanBtn.addEventListener('click', handleScanAction);
    if (closeScanner) closeScanner.addEventListener('click', closeScannerModal);
    if (closeGuideBtn) closeGuideBtn.addEventListener('click', closeScannerModal);

    if (scannerModal) {
        scannerModal.addEventListener('click', (e) => {
            if (e.target === scannerModal) {
                closeScannerModal();
            }
        });
    }
});

// --- OFFLINE SIMULATOR FOR STATUS PAGE ---
function initStatusPage() {
    const active = localStorage.getItem('maduranet_active');
    
    // Check if not active and running locally, send back to login.html
    const isLocal = window.location.hostname === 'localhost' || 
                    window.location.hostname === '127.0.0.1' || 
                    window.location.protocol === 'file:';
                    
    if (active !== 'true' && isLocal) {
        window.location.href = 'login.html';
        return;
    }

    // Fetch details
    const username = localStorage.getItem('maduranet_username') || 'Trial';
    const type = localStorage.getItem('maduranet_type') || 'Voucher';
    const ip = localStorage.getItem('maduranet_ip') || '192.168.100.23';
    const mac = localStorage.getItem('maduranet_mac') || '00:1A:2B:3C:4D:5E';

    // Set UI elements
    const userEl = document.getElementById('stat-username');
    const ipEl = document.getElementById('stat-ip');
    const macEl = document.getElementById('stat-mac');
    const uptimeEl = document.getElementById('stat-uptime');
    const typeEl = document.getElementById('stat-type');
    
    if (userEl) userEl.textContent = username;
    if (ipEl) ipEl.textContent = ip;
    if (macEl) macEl.textContent = mac;
    if (typeEl) typeEl.textContent = type;

    // Uptime Simulation
    let count = 0;
    setInterval(() => {
        count++;
        let hrs = Math.floor(count / 3600);
        let mins = Math.floor((count % 3600) / 60);
        let secs = count % 60;
        
        let hrsStr = hrs > 0 ? hrs + 'j ' : '';
        let minsStr = mins > 0 ? mins + 'm ' : '';
        let secsStr = secs + 's';
        
        if (uptimeEl) uptimeEl.textContent = hrsStr + minsStr + secsStr;
    }, 1000);

    // Logout Link Simulation
    const logoutForm = document.getElementById('logout-form');
    if (logoutForm && isLocal) {
        logoutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            localStorage.clear();
            window.location.href = 'logout.html';
        });
    }
}
