/**
 * MoTYF+ - Main Application Script (FULL)
 * Scene Management + Auth + Career Flow + IMK + Dashboard + Profile + Edit + Code Scene
 */

document.addEventListener('DOMContentLoaded', () => {

    // ============================================================
    // 1. SCENE MANAGEMENT
    // ============================================================
    const scenes = document.querySelectorAll('.scene');

    window.showScene = function(sceneId) {
        scenes.forEach(scene => scene.classList.remove('active'));
        const target = document.getElementById(sceneId);
        if (target) target.classList.add('active');
        resetErrors();
    };

    // ============================================================
    // 2. HELPER FUNCTIONS
    // ============================================================
    function showError(id, message) {
        const el = document.getElementById(id);
        if (el) el.textContent = message;
    }

    function resetErrors() {
        document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');
    }

    function getCurrentUser() {
        return JSON.parse(localStorage.getItem('motyf_current_user'));
    }

    function setCurrentUser(user) {
        localStorage.setItem('motyf_current_user', JSON.stringify(user));
    }

    window.togglePassword = function(inputId, btnElement) {
        const input = document.getElementById(inputId);
        if (!input) return;
        if (input.type === 'password') {
            input.type = 'text';
            btnElement.textContent = '🙈';
        } else {
            input.type = 'password';
            btnElement.textContent = '👁';
        }
    // ============================================================
    // GLOBAL BRAND LOGO — Click Handler
    // ============================================================
    const globalBrandLogo = document.getElementById('globalBrandLogo');
    if (globalBrandLogo) {
        globalBrandLogo.addEventListener('click', () => {
            console.log("🏠 Kembali ke Landing Page");
            showScene('landingScene');
        });
    }
    };


    // ============================================================
    // 3. USER PROFILE UI (TOP NAV)
    // ============================================================
    function updateUserProfileUI() {
        const user = getCurrentUser();
        const loginBtn = document.getElementById('loginBtn');
        const globalProfile = document.getElementById('globalUserProfile');
        const nameEl = document.getElementById('globalUserName');
        const classEl = document.getElementById('globalUserClass');
        const avatarEl = document.getElementById('globalUserAvatar');

        if (user && user.username) {
            // User dah login → tunjuk profile, sembunyi login button
            if (loginBtn) loginBtn.style.display = 'none';
            if (globalProfile) globalProfile.style.display = 'block';

            if (nameEl) nameEl.textContent = user.username;
            if (classEl) classEl.textContent = user.kelas || '';
            if (avatarEl) avatarEl.textContent = user.username.charAt(0).toUpperCase();
        } else {
            // Belum login → tunjuk login button
            if (loginBtn) loginBtn.style.display = 'block';
            if (globalProfile) globalProfile.style.display = 'none';
        }
    }

    const userProfileBtn = document.getElementById('userProfileBtn');
    const userProfile = document.getElementById('userProfile');

    if (userProfileBtn) {
        userProfileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            userProfile.classList.toggle('open');
        });
    }

    document.addEventListener('click', (e) => {
        if (userProfile && !userProfile.contains(e.target)) {
            userProfile.classList.remove('open');
        }
    });

    // View Dashboard button
    const viewDashboardBtn = document.getElementById('viewDashboardBtn');
    if (viewDashboardBtn) {
        viewDashboardBtn.addEventListener('click', () => {
            userProfile.classList.remove('open');
            loadDashboard();
            showScene('dashboardScene');
        });
    }

    // View Profile button
    const viewProfileBtn = document.getElementById('viewProfileBtn');
    if (viewProfileBtn) {
        viewProfileBtn.addEventListener('click', () => {
            userProfile.classList.remove('open');
            loadProfile();
            showScene('profileScene');
        });
    }

    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            userProfile.classList.remove('open');
            if (confirm("Adakah anda pasti mahu log keluar?")) {
                localStorage.removeItem('motyf_current_user');
                updateUserProfileUI();
                showScene('landingScene');
            }
        });
    }

    updateUserProfileUI();

    // ============================================================
    // 4. LANDING PAGE BUTTONS
    // ============================================================
    const loginBtn = document.getElementById('loginBtn');
    const journeyBtn = document.getElementById('journeyBtn');

    if (loginBtn) {
        loginBtn.addEventListener('click', () => showScene('loginScene'));
    }

    if (journeyBtn) {
        journeyBtn.addEventListener('click', () => {
            const user = getCurrentUser();
            if (!user) {
                showScene('loginScene');
            } else if (user.exploredCluster) {
                proceedToGameScene();
            } else if (user.careerDirection) {
                proceedToGameScene();
            } else {
                proceedToCareerQuestion();
            }
        });
    }

    ['navHome', 'navExplore', 'navJourney', 'navAbout'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('click', (e) => e.preventDefault());
    });

    // ============================================================
    // 5. LOGIN / SIGNUP
    // ============================================================
    const goToSignup = document.getElementById('goToSignup');
    if (goToSignup) {
        goToSignup.addEventListener('click', (e) => {
            e.preventDefault();
            showScene('signupScene');
        });
    }

    // SIGN UP
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            resetErrors();

            const username = document.getElementById('signupUsername').value.trim();
            const kelas = document.getElementById('signupKelas').value.trim();
            const password = document.getElementById('signupPassword').value;
            const confirmPassword = document.getElementById('signupConfirmPassword').value;

            let isValid = true;
            if (!username) { showError('signupUsernameError', 'Username diperlukan.'); isValid = false; }
            if (!kelas) { showError('signupKelasError', 'Kelas diperlukan.'); isValid = false; }
            if (!password) { showError('signupPasswordError', 'Password diperlukan.'); isValid = false; }
            if (!confirmPassword) { showError('signupConfirmError', 'Sila confirm password.'); isValid = false; }
            if (password && confirmPassword && password !== confirmPassword) {
                showError('signupConfirmError', 'Password tidak sepadan.');
                isValid = false;
            }
            if (!isValid) return;

            try {
                const res = await fetch('https://motyf-backend.onrender.com/api/signup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, kelas, password })
                });
                const data = await res.json();
                if (!res.ok) { showError('signupGlobalError', data.message); return; }

                signupForm.reset();
                
                // Set flag — trigger guide tutorial selepas login
                localStorage.setItem('motyf_show_guide', 'true');
                
                showScene('loginScene');
                document.getElementById('loginUsername').value = username;
                document.getElementById('loginPassword').focus();
            } catch (err) {
                console.error(err);
                showError('signupGlobalError', 'Ralat sambungan. Pastikan backend berjalan.');
            }
        });
    }

    // LOGIN
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            resetErrors();

            const username = document.getElementById('loginUsername').value.trim();
            const password = document.getElementById('loginPassword').value;

            let isValid = true;
            if (!username) { showError('loginUsernameError', 'Username diperlukan.'); isValid = false; }
            if (!password) { showError('loginPasswordError', 'Password diperlukan.'); isValid = false; }
            if (!isValid) return;

            try {
                const res = await fetch('https://motyf-backend.onrender.com/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password })
                });
                const data = await res.json();
                if (!res.ok) { showError('loginGlobalError', data.message); return; }

                setCurrentUser(data.user);
                updateUserProfileUI();
                loginForm.reset();

                // Semak kalau user baru signup — tunjuk guide tutorial dulu
                if (localStorage.getItem('motyf_show_guide') === 'true') {
                    localStorage.removeItem('motyf_show_guide');
                    localStorage.setItem('motyf_after_guide', 'career-question');
                    
                    // Pergi ke landing scene (sebab tutorial target element landing)
                    showScene('landingScene');
                    
                    // Start guide selepas 500ms (bagi masa scene render)
                    setTimeout(() => {
                        startGuideTutorial();
                    }, 500);
                    return;
                }

                // User lama — terus ikut flow biasa
                const user = data.user;
                if (user.exploredCluster) {
                    proceedToGameScene();
                } else if (user.careerDirection) {
                    proceedToGameScene();
                } else {
                    proceedToCareerQuestion();
                }
            } catch (err) {
                console.error(err);
                showError('loginGlobalError', 'Ralat sambungan. Pastikan backend berjalan.');
            }
        });
    }

    // ============================================================
    // 6. CAREER QUESTION
    // ============================================================
    function proceedToCareerQuestion() {
        const user = getCurrentUser();
        const greetingEl = document.getElementById('userGreeting');
        if (greetingEl && user) greetingEl.textContent = `Hai, ${user.username}! 👋`;
        showScene('careerQuestionScene');
    }

    const careerYesBtn = document.getElementById('careerYesBtn');
    const careerNoBtn = document.getElementById('careerNoBtn');

    async function saveCareerDirection(direction) {
        const user = getCurrentUser();
        if (!user) { showScene('loginScene'); return; }

        try {
            const res = await fetch('https://motyf-backend.onrender.com/api/career-direction', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: user.username, direction })
            });
            const data = await res.json();
            if (!res.ok) { alert("Ralat: " + data.message); return; }

            user.careerDirection = direction;
            setCurrentUser(user);

            if (direction === 'YA') {
                proceedToGameScene();
            } else {
                proceedToReasonQuestion();
            }
        } catch (err) {
            console.error(err);
            alert("Ralat sambungan. Pastikan backend berjalan.");
        }
    }

    if (careerYesBtn) careerYesBtn.addEventListener('click', () => saveCareerDirection('YA'));
    if (careerNoBtn) careerNoBtn.addEventListener('click', () => saveCareerDirection('TIDAK'));

    // ============================================================
    // 7. REASON QUESTION
    // ============================================================
    function proceedToReasonQuestion() {
        document.querySelectorAll('.reason-option').forEach(btn => {
            btn.classList.remove('selected');
            const check = btn.querySelector('.reason-check');
            if (check) check.textContent = '○';
        });
        const err = document.getElementById('reasonError');
        if (err) err.textContent = '';
        showScene('reasonQuestionScene');
    }

    const reasonOptions = document.querySelectorAll('.reason-option');
    reasonOptions.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.classList.toggle('selected');
            const check = btn.querySelector('.reason-check');
            if (check) check.textContent = btn.classList.contains('selected') ? '●' : '○';
        });
    });

    const reasonContinueBtn = document.getElementById('reasonContinueBtn');
    if (reasonContinueBtn) {
        reasonContinueBtn.addEventListener('click', async () => {
            const errEl = document.getElementById('reasonError');
            errEl.textContent = '';

            const selectedReasons = [];
            document.querySelectorAll('.reason-option.selected').forEach(btn => {
                selectedReasons.push(btn.dataset.value);
            });

            if (selectedReasons.length === 0) {
                errEl.textContent = 'Sila pilih sekurang-kurangnya satu sebab.';
                return;
            }

            const user = getCurrentUser();
            if (!user) { errEl.textContent = 'Sila log in semula.'; return; }

            try {
                const res = await fetch('https://motyf-backend.onrender.com/api/reason', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: user.username, reasons: selectedReasons })
                });
                const data = await res.json();
                if (!res.ok) { errEl.textContent = data.message; return; }

                user.careerReasons = selectedReasons;
                setCurrentUser(user);
                proceedToGameScene();
            } catch (err) {
                console.error(err);
                errEl.textContent = 'Ralat sambungan. Pastikan backend berjalan.';
            }
        });
    }

    // ============================================================
    // 8. CAREER EXPLORATION
    // ============================================================
    function proceedToCareerExploration() {
        document.querySelectorAll('.career-cluster').forEach(btn => btn.classList.remove('selected'));
        const errEl = document.getElementById('explorationError');
        const continueBtn = document.getElementById('explorationContinueBtn');
        if (errEl) errEl.textContent = '';
        if (continueBtn) continueBtn.disabled = true;

        const user = getCurrentUser();
        const msgEl = document.getElementById('explorationMessage');
        const titleEl = document.querySelector('#careerExplorationScene .auth-title');

        if (user && user.careerDirection === 'YA') {
            if (titleEl) titleEl.textContent = "Kluster Kerjaya Anda";
            if (msgEl) msgEl.textContent = "Bagus, anda dah ada hala tuju! Pilih kluster yang paling dekat dengan impian anda.";
        } else {
            if (titleEl) titleEl.textContent = "Peta Perjalanan Anda";
            if (msgEl) {
                if (user && user.careerReasons) {
                    if (user.careerReasons.includes("Tidak tahu minat saya")) {
                        msgEl.textContent = "Tak apa, jom kita terokai bersama! Pilih kluster yang menarik minat anda.";
                    } else if (user.careerReasons.includes("Terlalu banyak pilihan")) {
                        msgEl.textContent = "Kami dah ringkaskan kepada 6 kluster utama. Pilih satu untuk mula terokai.";
                    } else if (user.careerReasons.includes("Takut buat pilihan salah")) {
                        msgEl.textContent = "Tak perlu takut, ini cuma penerokaan! Pilih satu yang rasa menarik.";
                    } else {
                        msgEl.textContent = "Pilih kluster kerjaya yang paling menarik minat anda.";
                    }
                } else {
                    msgEl.textContent = "Pilih kluster kerjaya yang paling menarik minat anda.";
                }
            }
        }
        showScene('careerExplorationScene');
    }

    const careerClusters = document.querySelectorAll('.career-cluster');
    const explorationContinueBtn = document.getElementById('explorationContinueBtn');

    careerClusters.forEach(cluster => {
        cluster.addEventListener('click', () => {
            careerClusters.forEach(c => c.classList.remove('selected'));
            cluster.classList.add('selected');
            if (explorationContinueBtn) explorationContinueBtn.disabled = false;
            const errEl = document.getElementById('explorationError');
            if (errEl) errEl.textContent = '';
        });
    });

    if (explorationContinueBtn) {
        explorationContinueBtn.addEventListener('click', async () => {
            const selected = document.querySelector('.career-cluster.selected');
            const errEl = document.getElementById('explorationError');

            if (!selected) { errEl.textContent = 'Sila pilih satu kluster kerjaya.'; return; }

            const user = getCurrentUser();
            if (!user) { errEl.textContent = 'Sila log in semula.'; return; }

            const cluster = selected.dataset.value;

            try {
                const res = await fetch('https://motyf-backend.onrender.com/api/explore-cluster', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: user.username, cluster })
                });
                const data = await res.json();
                if (!res.ok) { errEl.textContent = data.message; return; }

                user.exploredCluster = cluster;
                setCurrentUser(user);
                showScene('landingScene');
            } catch (err) {
                console.error(err);
                errEl.textContent = 'Ralat sambungan.';
            }
        });
    }

    // ============================================================
    // 9. GAME SCENE
    // ============================================================
    function proceedToGameScene() {
        const journeyEl = document.getElementById('journeyBegin');
        const gameEl = document.getElementById('gdevelopGame');
        
        if (journeyEl) journeyEl.style.display = 'flex';
        if (gameEl) gameEl.style.display = 'none';

        const user = getCurrentUser();
        if (user && user.imkCode) {
            console.log("User dah ada kod IMK, terus ke Code Scene");
            proceedToCodeScene(user.imkCode);
            return;
        }
        const textEl = document.getElementById('journeyText');
        if (textEl && user) {
            textEl.textContent = `Perjalanan anda untuk meneroka kerjaya impian bermula sekarang. Teruskan melangkah, jangan pernah berhenti!`;
        }

        // Set iframe src dengan username sebagai parameter
        const iframe = document.getElementById('gameIframe');
        if (iframe && user) {
            iframe.src = `assets/game/index.html?username=${encodeURIComponent(user.username)}`;
        }

        showScene('gameScene');

        // Selepas 3 saat, tunjuk game
        setTimeout(() => {
            if (journeyEl) journeyEl.style.display = 'none';
            if (gameEl) gameEl.style.display = 'flex';
        }, 3000);
    }

    // Terima mesej dari GDevelop
    window.addEventListener('message', (event) => {
        const data = event.data;
        if (data && data.type === 'IMK_COMPLETED' && data.imkCode) {
            console.log("📩 Kod diterima dari game:", data.imkCode);
            
            const imkCode = data.imkCode.toUpperCase();
            const detail = data.detail || null;              // <-- BARU
            const user = getCurrentUser();
            if (!user) return;

            user.imkCode = imkCode;
            if (detail) user.imkDetail = detail;             // <-- BARU
            setCurrentUser(user);

            // Simpan ke MongoDB
            fetch('https://motyf-backend.onrender.com/api/imk-code', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    username: user.username, 
                    imkCode: imkCode,
                    detail: detail                               // <-- BARU
                })
            }).then(res => res.json())
              .then(data => console.log("✅ Saved to DB:", data))
              .catch(err => console.error("DB error:", err));

            setTimeout(() => {
                proceedToCodeScene(imkCode);
            }, 2000);
        }
    });

    // ============================================================
    // 10. USER DASHBOARD
    // ============================================================
    window.loadDashboard = function() {
        const user = getCurrentUser();
        if (!user) { showScene('landingScene'); return; }

        const avatarEl = document.getElementById('dashboardAvatar');
        const nameEl = document.getElementById('dashboardName');
        const classEl = document.getElementById('dashboardClass');
        
        if (avatarEl) avatarEl.textContent = user.username.charAt(0).toUpperCase();
        if (nameEl) nameEl.textContent = user.username;
        if (classEl) classEl.textContent = user.kelas || '-';

        const imkEl = document.getElementById('imkCodeDisplay');
        const imkMeaningEl = document.getElementById('imkMeaning');
        
        if (user.imkCode) {
            if (imkEl) imkEl.textContent = user.imkCode;
            if (imkMeaningEl) imkMeaningEl.textContent = getRiasecMeaning(user.imkCode);
        } else {
            if (imkEl) imkEl.textContent = '---';
            if (imkMeaningEl) imkMeaningEl.textContent = 'Selesaikan IMK untuk lihat kod anda';
        }

        const dirEl = document.getElementById('dashDirection');
        const foundEl = document.getElementById('dashFound');
        const imkStatusEl = document.getElementById('dashImk');    // ← Rename

        if (dirEl) dirEl.textContent = user.careerDirection || '-';
        if (foundEl) foundEl.textContent = user.foundCareerFromExplore || '-';
        if (imkStatusEl) imkStatusEl.textContent = user.imkCode ? 'Ya' : 'Belum';

        const reasonsSection = document.getElementById('reasonsSection');
        const reasonsList = document.getElementById('dashReasons');
        
        if (user.careerReasons && user.careerReasons.length > 0) {
            if (reasonsSection) reasonsSection.style.display = 'block';
            if (reasonsList) {
                reasonsList.innerHTML = '';
                user.careerReasons.forEach(reason => {
                    const tag = document.createElement('span');
                    tag.className = 'reason-tag';
                    tag.textContent = reason;
                    reasonsList.appendChild(tag);
                });
            }
        } else {
            if (reasonsSection) reasonsSection.style.display = 'none';
        }

        loadProgress(user);
    }

    function loadProgress(user) {
        const progressList = document.getElementById('progressList');
        if (!progressList) return;
        progressList.innerHTML = '';
        const steps = [
            { label: 'Daftar Akaun', done: true },
            { label: 'Jawab Hala Tuju Kerjaya', done: !!user.careerDirection },
            { label: 'Selesaikan IMK', done: !!user.imkCode },
            { label: 'Jawab Soalan Akhir', done: !!user.foundCareerFromExplore }
        ];

        steps.forEach(step => {
            const item = document.createElement('div');
            item.className = 'progress-item ' + (step.done ? 'done' : 'pending');
            item.innerHTML = `
                <div class="progress-check">${step.done ? '✓' : '○'}</div>
                <div class="progress-text">${step.label}</div>
                <div class="progress-status">${step.done ? 'Selesai' : 'Belum'}</div>
            `;
            progressList.appendChild(item);
        });
    }

    function getRiasecMeaning(code) {
        const meanings = {
            'R': 'Realistic', 'I': 'Investigative', 'A': 'Artistic',
            'S': 'Social', 'E': 'Enterprising', 'C': 'Conventional',
            'K': 'Kemahiran', 'M': 'Manajemen', 'P': 'Penyayang', 'B': 'Bekerjasama'
        };
        return code.split('').map(l => meanings[l] || l).join(' · ');
    }

    // ============================================================
    // 11. USER PROFILE
    // ============================================================
    function loadProfile() {
        const user = getCurrentUser();
        if (!user) { showScene('landingScene'); return; }

        const avatarEl = document.getElementById('profileAvatar');
        const nameEl = document.getElementById('profileName');
        const classEl = document.getElementById('profileClass');
        
        if (avatarEl) avatarEl.textContent = user.username.charAt(0).toUpperCase();
        if (nameEl) nameEl.textContent = user.username;
        if (classEl) classEl.textContent = user.kelas || '-';

        const createdAtEl = document.getElementById('profileCreatedAt');
        const kelasEl = document.getElementById('profileKelas');
        const directionEl = document.getElementById('profileDirection');
        const foundEl = document.getElementById('profileFound');
        
        if (createdAtEl) createdAtEl.textContent = formatDate(user.createdAt);
        if (kelasEl) kelasEl.textContent = user.kelas || '-';
        if (directionEl) directionEl.textContent = user.careerDirection || 'Belum';
        if (foundEl) foundEl.textContent = user.foundCareerFromExplore || 'Belum';

        const imkEl = document.getElementById('profileImkCode');
        const imkMeaningEl = document.getElementById('profileImkMeaning');
        
        if (user.imkCode) {
            if (imkEl) imkEl.textContent = user.imkCode;
            if (imkMeaningEl) imkMeaningEl.textContent = getRiasecMeaning(user.imkCode);
        } else {
            if (imkEl) imkEl.textContent = '---';
            if (imkMeaningEl) imkMeaningEl.textContent = 'Belum selesai IMK';
        }

        const dreamSection = document.getElementById('profileDreamSection');
        const dreamCareerEl = document.getElementById('profileDreamCareer');
        const dreamReasonEl = document.getElementById('profileDreamReason');
        
    }

    function formatDate(dateString) {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleDateString('ms-MY', { day: 'numeric', month: 'long', year: 'numeric' });
    }

    // Logout button dalam profile
    const profileLogoutBtn = document.getElementById('profileLogoutBtn');
    if (profileLogoutBtn) {
        profileLogoutBtn.addEventListener('click', () => {
            if (confirm("Adakah anda pasti mahu log keluar?")) {
                localStorage.removeItem('motyf_current_user');
                updateUserProfileUI();
                showScene('landingScene');
            }
        });
    }

    // Edit Profile button
    const editProfileBtn = document.getElementById('editProfileBtn');
    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', () => {
            loadEditProfile();
            showScene('editProfileScene');
        });
    }

    // ============================================================
    // 12. EDIT PROFILE
    // ============================================================
    function loadEditProfile() {
        const user = getCurrentUser();
        if (!user) { showScene('loginScene'); return; }

        const usernameEl = document.getElementById('editUsername');
        const kelasEl = document.getElementById('editKelas');
        const currentPwdEl = document.getElementById('editCurrentPassword');
        const newPwdEl = document.getElementById('editNewPassword');
        const confirmPwdEl = document.getElementById('editConfirmPassword');

        if (usernameEl) usernameEl.value = user.username || '';
        if (kelasEl) kelasEl.value = user.kelas || '';
        if (currentPwdEl) currentPwdEl.value = '';
        if (newPwdEl) newPwdEl.value = '';
        if (confirmPwdEl) confirmPwdEl.value = '';

        document.querySelectorAll('#editProfileScene .error-msg').forEach(el => el.textContent = '');
        const successEl = document.getElementById('editSuccessMsg');
        if (successEl) successEl.textContent = '';
    }

    const editProfileForm = document.getElementById('editProfileForm');
    if (editProfileForm) {
        editProfileForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            document.querySelectorAll('#editProfileScene .error-msg').forEach(el => el.textContent = '');
            const successEl = document.getElementById('editSuccessMsg');
            if (successEl) successEl.textContent = '';

            const user = getCurrentUser();
            if (!user) { showError('editGlobalError', 'Sila log in semula.'); return; }

            const kelas = document.getElementById('editKelas').value.trim();
            const currentPassword = document.getElementById('editCurrentPassword').value;
            const newPassword = document.getElementById('editNewPassword').value;
            const confirmPassword = document.getElementById('editConfirmPassword').value;

            let isValid = true;

            if (!kelas) { showError('editKelasError', 'Kelas diperlukan.'); isValid = false; }

            const wantChangePassword = currentPassword || newPassword || confirmPassword;
            
            if (wantChangePassword) {
                if (!currentPassword) { showError('editCurrentPasswordError', 'Sila masukkan password semasa.'); isValid = false; }
                if (!newPassword) { showError('editNewPasswordError', 'Sila masukkan password baru.'); isValid = false; }
                else if (newPassword.length < 6) { showError('editNewPasswordError', 'Password mesti sekurang-kurangnya 6 aksara.'); isValid = false; }
                if (!confirmPassword) { showError('editConfirmPasswordError', 'Sila sahkan password baru.'); isValid = false; }
                else if (newPassword && confirmPassword && newPassword !== confirmPassword) {
                    showError('editConfirmPasswordError', 'Password tidak sepadan.');
                    isValid = false;
                }
            }

            if (!isValid) return;

            try {
                const res = await fetch('https://motyf-backend.onrender.com/api/update-profile', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        username: user.username,
                        kelas: kelas,
                        currentPassword: wantChangePassword ? currentPassword : null,
                        newPassword: wantChangePassword ? newPassword : null
                    })
                });
                const data = await res.json();
                
                if (!res.ok) { showError('editGlobalError', data.message); return; }

                setCurrentUser(data.user);
                updateUserProfileUI();

                if (successEl) successEl.textContent = '✅ ' + data.message;
                document.getElementById('editCurrentPassword').value = '';
                document.getElementById('editNewPassword').value = '';
                document.getElementById('editConfirmPassword').value = '';

                setTimeout(() => {
                    loadProfile();
                    showScene('profileScene');
                }, 2000);

            } catch (err) {
                console.error(err);
                showError('editGlobalError', 'Ralat sambungan.');
            }
        });
    }

    // ============================================================
    // 13. CODE SCENE (KOD HOLLAND + KERJAYA)
    // ============================================================
    let currentHollandCode = '';
    let currentCategory = 'all';
    let allMatchingCareers = [];
    // ============================================================
    // CODE SCENE — Proceed
    // ============================================================
    function proceedToCodeScene(imkCode) {
        console.log("Navigating to Code Scene. Kod IMK:", imkCode);
        
        const user = getCurrentUser();
        if (!user) { showScene('loginScene'); return; }

        currentHollandCode = imkCode;
        currentCategory = 'all';

        renderHollandHeader(imkCode);
        allMatchingCareers = getCareersByHollandCode(imkCode);
        setActiveCategory('all');
        renderCareerGrid(allMatchingCareers);

        showScene('codeScene');
    }

    // ============================================================
    // CATEGORY FILTER — setActiveCategory
    // ============================================================
    function setActiveCategory(clusterValue) {
        currentCategory = clusterValue;
        
        // Update active state pada semua butang kategori
        const allCategoryBtns = document.querySelectorAll('.category-btn');
        allCategoryBtns.forEach(btn => {
            if (btn.dataset.cluster === clusterValue) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Filter kerjaya
        let filtered;
        if (clusterValue === 'all') {
            filtered = allMatchingCareers;
        } else {
            filtered = allMatchingCareers.filter(c => c.cluster === clusterValue);
        }

        // Update kiraan
        const countEl = document.getElementById('careerCount');
        const codeEl = document.getElementById('filterNoteCode');
        if (countEl) countEl.textContent = filtered.length;
        if (codeEl) codeEl.textContent = currentHollandCode;

        // Render grid
        renderCareerGrid(filtered);
    }

    // ============================================================
    // CATEGORY BUTTON HANDLERS
    // ============================================================
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            setActiveCategory(btn.dataset.cluster);
        });
    });

    // ============================================================
    // CODE SCENE — Render Header Kod Holland
    // ============================================================
    function renderHollandHeader(code) {
        const displayEl = document.getElementById('hollandDisplay');
        const meaningsEl = document.getElementById('hollandMeanings');
        
        if (displayEl) displayEl.textContent = code;
        if (!meaningsEl) return;

        meaningsEl.innerHTML = '';
        code.split('').forEach(letter => {
            const data = RIASEC_INFO[letter] || { name: letter };
            const div = document.createElement('div');
            div.className = 'holland-meaning';
            div.innerHTML = `
                <div class="holland-meaning-letter">${letter}</div>
                <div class="holland-meaning-name">${data.name}</div>
            `;
            meaningsEl.appendChild(div);
        });
    }

    const RIASEC_INFO = {
        'R': { name: 'Realistik' },
        'I': { name: 'Investigatif' },
        'A': { name: 'Artistik' },
        'S': { name: 'Sosial' },
        'E': { name: 'Enterprising' },
        'K': { name: 'Konvensional' }
    };

    const CAREER_DB = [
        // ============ TEKNOLOGI & DIGITAL ============
        {
            name: 'Programmer', icon: '💻', codes: 'IK', cluster: 'Teknologi & Digital',
            description: 'Menulis kod untuk membina aplikasi, laman web, atau sistem perisian.',
            salary: 'RM3,000 – RM5,500',
            education: 'Ijazah Sains Komputer',
            path: 'SPM → Matrikulasi/STPM/Asasi Sains → Ijazah Sains Komputer → Junior Programmer → Software Engineer',
            subjects: ['Matematik Tambahan', 'Matematik', 'Fizik', 'Sains Komputer'],
            skills: ['Python', 'Java', 'C++', 'Algoritma', 'Git', 'Penyelesaian Masalah'],
            uniMY: ['UM', 'UTM', 'USM', 'APU'],
            uniIntl: ['MIT', 'Stanford', 'NUS']
        },
        {
            name: 'Data Analyst', icon: '📊', codes: 'IK', cluster: 'Teknologi & Digital',
            description: 'Menganalisis data untuk membantu organisasi membuat keputusan.',
            salary: 'RM3,200 – RM6,000',
            education: 'Ijazah Data Science / Statistik',
            path: 'SPM → Matrikulasi Matematik/Sains → Ijazah Data Science/Statistik → Data Analyst → Data Scientist',
            subjects: ['Matematik Tambahan', 'Matematik', 'Fizik', 'Sains Komputer'],
            skills: ['Excel', 'SQL', 'Python', 'Statistik', 'Power BI/Tableau'],
            uniMY: ['UM', 'UPM', 'UKM', "Taylor's"],
            uniIntl: ['MIT', 'University of Toronto', 'NUS']
        },
        {
            name: 'AI Engineer', icon: '🤖', codes: 'IR', cluster: 'Teknologi & Digital',
            description: 'Membina sistem kecerdasan buatan seperti chatbot, image recognition.',
            salary: 'RM4,000 – RM8,000',
            education: 'Ijazah AI / Sains Komputer',
            path: 'SPM → Matrikulasi Sains → Ijazah AI/Sains Komputer → Projek AI → AI Engineer',
            subjects: ['Matematik Tambahan', 'Matematik', 'Fizik', 'Sains Komputer'],
            skills: ['Machine Learning', 'Python', 'TensorFlow', 'Matematik', 'Cloud'],
            uniMY: ['UTM', 'UM', 'MMU', 'USM'],
            uniIntl: ['MIT', 'Stanford', 'Carnegie Mellon', 'NUS']
        },
        {
            name: 'Cybersecurity', icon: '🔒', codes: 'IK', cluster: 'Teknologi & Digital',
            description: 'Melindungi sistem komputer daripada serangan siber.',
            salary: 'RM3,500 – RM7,000',
            education: 'Ijazah Keselamatan Siber',
            path: 'SPM → Matrikulasi/Asasi → Ijazah Keselamatan Siber → SOC Analyst → Security Engineer',
            subjects: ['Matematik Tambahan', 'Matematik', 'Fizik', 'Sains Komputer'],
            skills: ['Rangkaian', 'Linux', 'Penetration Testing', 'SIEM', 'Analisis Risiko'],
            uniMY: ['UTM', 'UMPSA', 'MMU', 'UniKL'],
            uniIntl: ['Georgia Tech', 'ETH Zurich', 'University of Maryland']
        },
        {
            name: 'UI/UX Designer', icon: '🎨', codes: 'AI', cluster: 'Teknologi & Digital',
            description: 'Mereka bentuk antara muka yang cantik dan mudah digunakan.',
            salary: 'RM2,800 – RM5,500',
            education: 'Ijazah UI/UX / Multimedia',
            path: 'SPM → Asasi/Diploma Reka Bentuk atau Multimedia → Ijazah UI/UX → Junior Designer → Product Designer',
            subjects: ['Pendidikan Seni Visual', 'Reka Bentuk dan Teknologi', 'ICT'],
            skills: ['Figma', 'Wireframe', 'Prototaip', 'Penyelidikan Pengguna', 'Komunikasi Visual'],
            uniMY: ['UiTM', 'Limkokwing', "Taylor's", 'APU'],
            uniIntl: ['Royal College of Art', 'Parsons', 'University of the Arts London']
        },
        {
            name: 'Game Developer', icon: '🎮', codes: 'AI', cluster: 'Teknologi & Digital',
            description: 'Membina video game untuk pelbagai platform.',
            salary: 'RM2,800 – RM6,000',
            education: 'Ijazah Game Development / CS',
            path: 'SPM → Diploma/Ijazah Game Development atau CS → Game Programmer/Artist → Lead Developer',
            subjects: ['Matematik Tambahan', 'Fizik', 'Sains Komputer'],
            skills: ['Unity', 'Unreal Engine', 'C#', '3D', 'Reka Bentuk Permainan'],
            uniMY: ['MMU', 'APU', 'UTeM', 'UniKL'],
            uniIntl: ['University of Southern California', 'DigiPen', 'University of Utah']
        },
        {
            name: 'Web Developer', icon: '🌐', codes: 'IK', cluster: 'Teknologi & Digital',
            description: 'Membina laman web dan aplikasi berasaskan web.',
            salary: 'RM2,800 – RM5,500',
            education: 'Ijazah Web/Software Development',
            path: 'SPM → Diploma/Asasi IT → Ijazah Web/Software Development → Front-end/Back-end Developer',
            subjects: ['Matematik', 'Sains Komputer', 'ICT'],
            skills: ['HTML', 'CSS', 'JavaScript', 'React', 'API', 'Pangkalan Data'],
            uniMY: ['UTM', 'UM', 'MMU', 'Sunway'],
            uniIntl: ['University of Waterloo', 'NUS', 'University of Melbourne']
        },
        {
            name: 'Mobile App Developer', icon: '📱', codes: 'IK', cluster: 'Teknologi & Digital',
            description: 'Membina aplikasi untuk telefon pintar Android atau iOS.',
            salary: 'RM3,000 – RM6,000',
            education: 'Ijazah CS / Software Engineering',
            path: 'SPM → Matrikulasi/Asasi/Diploma IT → Ijazah CS/Software Engineering → Android/iOS Developer',
            subjects: ['Matematik', 'Sains Komputer', 'ICT'],
            skills: ['Kotlin', 'Swift', 'Flutter', 'UI Mudah Alih', 'API', 'Debugging'],
            uniMY: ['UM', 'UTM', 'MMU', 'APU'],
            uniIntl: ['Carnegie Mellon', 'University of Washington', 'NUS']
        },

        // ============ KESIHATAN & PERUBATAN ============
        {
            name: 'Doktor', icon: '👨‍⚕️', codes: 'IK', cluster: 'Kesihatan & Perubatan',
            description: 'Mendiagnosis dan merawat penyakit pesakit.',
            salary: 'RM4,000 – RM7,000',
            education: 'Ijazah Perubatan (5 tahun)',
            path: 'SPM → Matrikulasi/STPM/Asasi Sains → Ijazah Perubatan 5 tahun → Housemanship → Medical Officer → Pakar',
            subjects: ['Biologi', 'Kimia', 'Fizik', 'Matematik'],
            skills: ['Biologi', 'Diagnosis', 'Komunikasi Pesakit', 'Ketahanan Emosi'],
            uniMY: ['UM', 'UKM', 'USM', 'IIUM'],
            uniIntl: ['University of Oxford', 'University of Melbourne', 'NUS']
        },
        {
            name: 'Jururawat', icon: '👩‍⚕️', codes: 'SR', cluster: 'Kesihatan & Perubatan',
            description: 'Menjaga dan merawat pesakit di hospital atau klinik.',
            salary: 'RM2,500 – RM4,500',
            education: 'Diploma Kejururawatan',
            path: 'SPM → Diploma Kejururawatan → Pendaftaran profesional → Jururawat → Pengkhususan',
            subjects: ['Biologi', 'Kimia', 'Matematik'],
            skills: ['Penjagaan Pesakit', 'Prosedur Klinikal', 'Empati', 'Kerja Berpasukan'],
            uniMY: ['UKM', 'UiTM', 'IMU', 'KPJ Healthcare University'],
            uniIntl: ['University of Pennsylvania', "King's College London", 'University of Sydney']
        },
        {
            name: 'Farmasi', icon: '💊', codes: 'IK', cluster: 'Kesihatan & Perubatan',
            description: 'Menguruskan ubat-ubatan dan memberi nasihat farmasi.',
            salary: 'RM3,000 – RM5,500',
            education: 'Ijazah Farmasi (4 tahun)',
            path: 'SPM → Matrikulasi/Asasi Sains → Ijazah Farmasi 4 tahun → Latihan provisional → Ahli Farmasi',
            subjects: ['Biologi', 'Kimia', 'Fizik', 'Matematik'],
            skills: ['Kimia', 'Farmakologi', 'Ketepatan', 'Kaunseling Ubat'],
            uniMY: ['USM', 'UKM', 'UM', 'IMU'],
            uniIntl: ['Monash University', 'University College London', 'University of Sydney']
        },
        {
            name: 'Fisioterapi', icon: '💪', codes: 'SR', cluster: 'Kesihatan & Perubatan',
            description: 'Membantu pesakit pulih dari kecederaan melalui terapi fizikal.',
            salary: 'RM2,500 – RM4,500',
            education: 'Diploma/Ijazah Fisioterapi',
            path: 'SPM → Diploma/Ijazah Fisioterapi → Latihan klinikal → Fisioterapis',
            subjects: ['Biologi', 'Fizik', 'Matematik'],
            skills: ['Anatomi', 'Rehabilitasi', 'Senaman Terapeutik', 'Motivasi Pesakit'],
            uniMY: ['UKM', 'UiTM', 'UniSZA', 'MAHSA'],
            uniIntl: ['University of Queensland', 'University of Nottingham', 'University of Toronto']
        },
        {
            name: 'Pakar Pemakanan', icon: '🥗', codes: 'SI', cluster: 'Kesihatan & Perubatan',
            description: 'Merancang diet sihat untuk pesakit atau klien.',
            salary: 'RM2,800 – RM5,000',
            education: 'Ijazah Dietetik / Sains Pemakanan',
            path: 'SPM → Matrikulasi/STPM Sains → Ijazah Dietetik/Sains Pemakanan → Dietitian/Nutritionist',
            subjects: ['Biologi', 'Kimia', 'Matematik'],
            skills: ['Sains Pemakanan', 'Analisis Diet', 'Kaunseling', 'Penyediaan Pelan Makanan'],
            uniMY: ['UKM', 'UPM', 'IIUM', 'IMU'],
            uniIntl: ['University of Sydney', "King's College London", 'University of Toronto']
        },
        {
            name: 'Psikologi', icon: '🧠', codes: 'IS', cluster: 'Kesihatan & Perubatan',
            description: 'Membantu pesakit dengan masalah emosi dan mental.',
            salary: 'RM2,800 – RM5,500',
            education: 'Ijazah Psikologi + Sarjana',
            path: 'SPM → Matrikulasi/STPM → Ijazah Psikologi → Sarjana Psikologi Klinikal/Kaunseling → Amalan profesional',
            subjects: ['Biologi', 'Matematik', 'Bahasa'],
            skills: ['Mendengar Aktif', 'Penilaian Psikologi', 'Penyelidikan', 'Empati'],
            uniMY: ['UM', 'UKM', 'HELP', 'Sunway'],
            uniIntl: ['University of Melbourne', 'University College London', 'University of Michigan']
        },
        {
            name: 'Doktor Gigi', icon: '🦷', codes: 'IR', cluster: 'Kesihatan & Perubatan',
            description: 'Merawat kesihatan gigi dan mulut pesakit.',
            salary: 'RM4,000 – RM7,000',
            education: 'Ijazah Pergigian (5 tahun)',
            path: 'SPM → Matrikulasi/STPM/Asasi Sains → Ijazah Pergigian 5 tahun → Latihan klinikal → Pegawai Pergigian',
            subjects: ['Biologi', 'Kimia', 'Fizik', 'Matematik'],
            skills: ['Anatomi', 'Kemahiran Tangan', 'Diagnosis', 'Komunikasi Pesakit'],
            uniMY: ['UM', 'UKM', 'USIM', 'IMU'],
            uniIntl: ["King's College London", 'University of Hong Kong', 'University of Melbourne']
        },

        // ============ SENI & KREATIF ============
        {
            name: 'Pereka Grafik', icon: '🎨', codes: 'AE', cluster: 'Seni & Kreatif',
            description: 'Mereka poster, logo, dan bahan visual untuk pelbagai kegunaan.',
            salary: 'RM2,300 – RM4,500',
            education: 'Ijazah Reka Grafik',
            path: 'SPM → Diploma/Asasi Seni → Ijazah Reka Grafik → Graphic Designer → Art Director',
            subjects: ['Pendidikan Seni Visual', 'Reka Bentuk dan Teknologi', 'ICT'],
            skills: ['Adobe Illustrator', 'Photoshop', 'Tipografi', 'Branding'],
            uniMY: ['UiTM', 'Limkokwing', 'The One Academy'],
            uniIntl: ['Parsons', 'Rhode Island School of Design', 'Central Saint Martins']
        },
        {
            name: 'Animator', icon: '🎬', codes: 'AI', cluster: 'Seni & Kreatif',
            description: 'Menghasilkan animasi untuk filem, game, atau iklan.',
            salary: 'RM2,500 – RM5,500',
            education: 'Ijazah Animasi',
            path: 'SPM → Diploma/Ijazah Animasi → Portfolio → Animator → Animation Director',
            subjects: ['Pendidikan Seni Visual', 'Reka Bentuk dan Teknologi', 'ICT'],
            skills: ['2D/3D Animation', 'Maya', 'Blender', 'Storyboard'],
            uniMY: ['MMU', 'UiTM', 'The One Academy'],
            uniIntl: ['CalArts', 'Gobelins', 'Sheridan College']
        },
        {
            name: 'Pemuzik', icon: '🎵', codes: 'AE', cluster: 'Seni & Kreatif',
            description: 'Menghasilkan muzik, persembahan, atau mengajar muzik.',
            salary: 'RM2,000 – RM6,000+',
            education: 'Diploma/Ijazah Muzik',
            path: 'SPM → Diploma/Ijazah Muzik → Persembahan/produksi → Pemuzik profesional',
            subjects: ['Pendidikan Muzik', 'Pendidikan Seni Visual', 'Bahasa'],
            skills: ['Instrumen', 'Teori Muzik', 'Persembahan', 'Rakaman'],
            uniMY: ['ASWARA', 'UiTM', 'UCSI'],
            uniIntl: ['Berklee College of Music', 'Juilliard', 'Royal Academy of Music']
        },
        {
            name: 'Penulis', icon: '✍️', codes: 'AE', cluster: 'Seni & Kreatif',
            description: 'Menulis novel, artikel, skrip, atau kandungan digital.',
            salary: 'RM2,000 – RM5,000+',
            education: 'Ijazah Bahasa / Kesusasteraan / Komunikasi',
            path: 'SPM → STPM/Asasi → Ijazah Bahasa, Kesusasteraan atau Komunikasi → Penulis/Editor',
            subjects: ['Bahasa Melayu', 'Bahasa Inggeris', 'Kesusasteraan'],
            skills: ['Penulisan', 'Penyelidikan', 'Tatabahasa', 'Penceritaan'],
            uniMY: ['UM', 'UKM', 'UiTM', 'UPSI'],
            uniIntl: ['University of East Anglia', "Iowa Writers' Workshop", 'University of Oxford']
        },
        {
            name: 'Penerbit Filem', icon: '🎥', codes: 'AE', cluster: 'Seni & Kreatif',
            description: 'Menguruskan produksi filem dari idea sampai tayang.',
            salary: 'RM2,500 – RM7,000+',
            education: 'Ijazah Filem / Komunikasi',
            path: 'SPM → Diploma/Ijazah Filem/Komunikasi → Pembantu produksi → Penerbit',
            subjects: ['Pendidikan Seni Visual', 'Bahasa', 'Sejarah'],
            skills: ['Pengurusan Bajet', 'Skrip', 'Kepimpinan', 'Produksi'],
            uniMY: ['ASWARA', 'UiTM', 'MMU'],
            uniIntl: ['New York University', 'University of Southern California', 'UCLA']
        },
        {
            name: 'Jurugambar', icon: '📷', codes: 'AR', cluster: 'Seni & Kreatif',
            description: 'Mengambil gambar profesional untuk pelbagai majlis atau komersial.',
            salary: 'RM2,000 – RM5,500+',
            education: 'Diploma/Asasi Fotografi',
            path: 'SPM → Diploma/Asasi Fotografi → Portfolio → Jurugambar komersial/editorial',
            subjects: ['Pendidikan Seni Visual', 'Fizik', 'Bahasa'],
            skills: ['Kamera', 'Pencahayaan', 'Komposisi', 'Lightroom/Photoshop'],
            uniMY: ['UiTM', 'Limkokwing', 'The One Academy'],
            uniIntl: ['New York University', 'Parsons', 'Royal College of Art']
        },
        {
            name: 'Pereka Fesyen', icon: '👗', codes: 'AE', cluster: 'Seni & Kreatif',
            description: 'Mereka pakaian dan trend fesyen.',
            salary: 'RM2,300 – RM6,000+',
            education: 'Ijazah Fesyen',
            path: 'SPM → Diploma/Asasi Fesyen → Ijazah Fesyen → Pembantu pereka → Pereka fesyen',
            subjects: ['Pendidikan Seni Visual', 'Reka Bentuk dan Teknologi', 'Bahasa'],
            skills: ['Lakaran', 'Jahitan', 'Tekstil', 'Trend', 'Pemasaran'],
            uniMY: ['UiTM', 'MSU', 'Raffles College'],
            uniIntl: ['Central Saint Martins', 'Parsons', 'Polimoda']
        },
        {
            name: 'Arkitek', icon: '🏛️', codes: 'AI', cluster: 'Seni & Kreatif',
            description: 'Mereka bentuk bangunan dan ruang dengan fungsi + estetika.',
            salary: 'RM3,000 – RM6,000',
            education: 'Ijazah Seni Bina + Sarjana Profesional',
            path: 'SPM → Matrikulasi/STPM/Asasi → Ijazah Seni Bina → Sarjana Profesional → Latihan dan pendaftaran',
            subjects: ['Matematik Tambahan', 'Fizik', 'Pendidikan Seni Visual'],
            skills: ['Reka Bentuk', 'AutoCAD', 'Revit', 'Struktur Asas', 'Pembentangan'],
            uniMY: ['UTM', 'UM', 'USM', 'UiTM'],
            uniIntl: ['University College London', 'MIT', 'Delft University of Technology']
        },

        // ============ SAINS & KEJURUTERAAN ============
        {
            name: 'Jurutera Awam', icon: '🏗️', codes: 'RI', cluster: 'Sains & Kejuruteraan',
            description: 'Mereka dan membina infrastruktur seperti jambatan, jalan.',
            salary: 'RM3,200 – RM5,000',
            education: 'Ijazah Kejuruteraan Awam',
            path: 'SPM → Matrikulasi/Asasi Kejuruteraan → Ijazah Kejuruteraan Awam → Graduate Engineer → Jurutera profesional',
            subjects: ['Matematik Tambahan', 'Fizik', 'Kimia'],
            skills: ['Matematik', 'AutoCAD', 'Struktur', 'Pengurusan Projek'],
            uniMY: ['UTM', 'UM', 'USM', 'UPM'],
            uniIntl: ['MIT', 'Imperial College London', 'University of California Berkeley']
        },
        {
            name: 'Jurutera Elektrik', icon: '⚡', codes: 'RI', cluster: 'Sains & Kejuruteraan',
            description: 'Mereka dan menyelenggara sistem elektrik.',
            salary: 'RM3,200 – RM5,500',
            education: 'Ijazah Elektrik/Elektronik',
            path: 'SPM → Matrikulasi/Asasi Fizik → Ijazah Elektrik/Elektronik → Graduate Engineer → Jurutera',
            subjects: ['Matematik Tambahan', 'Fizik', 'Kimia'],
            skills: ['Litar', 'Elektronik', 'Pengaturcaraan', 'Sistem Kawalan'],
            uniMY: ['UTM', 'UM', 'USM', 'UTeM'],
            uniIntl: ['MIT', 'Stanford', 'NUS', 'Imperial College London']
        },
        {
            name: 'Ahli Kimia', icon: '🧪', codes: 'IR', cluster: 'Sains & Kejuruteraan',
            description: 'Menyelidik bahan kimia dan kegunaannya.',
            salary: 'RM2,800 – RM5,000',
            education: 'Ijazah Kimia',
            path: 'SPM → Matrikulasi Sains → Ijazah Kimia → Makmal/QC/R&D → Ahli Kimia',
            subjects: ['Kimia', 'Matematik', 'Fizik', 'Biologi'],
            skills: ['Analisis Makmal', 'Keselamatan', 'Statistik', 'Dokumentasi'],
            uniMY: ['UM', 'UKM', 'USM', 'UPM'],
            uniIntl: ['MIT', 'University of Cambridge', 'NUS']
        },
        {
            name: 'Ahli Fizik', icon: '⚛️', codes: 'IR', cluster: 'Sains & Kejuruteraan',
            description: 'Mengkaji undang-undang fizik alam semesta.',
            salary: 'RM2,800 – RM5,500',
            education: 'Ijazah Fizik',
            path: 'SPM → Matrikulasi/STPM Sains → Ijazah Fizik → R&D/Pendidikan/Industri → Penyelidik',
            subjects: ['Fizik', 'Matematik Tambahan', 'Kimia'],
            skills: ['Matematik', 'Pemodelan', 'Eksperimen', 'Pengaturcaraan'],
            uniMY: ['UM', 'USM', 'UKM', 'UTM'],
            uniIntl: ['MIT', 'University of Cambridge', 'Caltech']
        },
        {
            name: 'Ahli Biologi', icon: '🧬', codes: 'IR', cluster: 'Sains & Kejuruteraan',
            description: 'Mengkaji hidupan dan ekosistem.',
            salary: 'RM2,700 – RM5,000',
            education: 'Ijazah Biologi / Bioteknologi',
            path: 'SPM → Matrikulasi Biologi → Ijazah Biologi/Bioteknologi → Makmal/konservasi/R&D',
            subjects: ['Biologi', 'Kimia', 'Matematik'],
            skills: ['Kerja Makmal', 'Ekologi', 'Analisis Data', 'Penulisan Saintifik'],
            uniMY: ['UM', 'UKM', 'UPM', 'USM'],
            uniIntl: ['University of Cambridge', 'Harvard', 'University of Melbourne']
        },
        {
            name: 'Ahli Matematik', icon: '📐', codes: 'IK', cluster: 'Sains & Kejuruteraan',
            description: 'Menyelesaikan masalah menggunakan matematik.',
            salary: 'RM3,000 – RM6,000',
            education: 'Ijazah Matematik / Statistik',
            path: 'SPM → Matrikulasi/STPM Matematik → Ijazah Matematik/Statistik → Analitik, aktuari, penyelidikan',
            subjects: ['Matematik Tambahan', 'Matematik', 'Fizik'],
            skills: ['Matematik', 'Statistik', 'Python/R', 'Pemikiran Logik'],
            uniMY: ['UM', 'UKM', 'UPM', 'USM'],
            uniIntl: ['MIT', 'University of Cambridge', 'ETH Zurich']
        },
        {
            name: 'Jurutera Mekanikal', icon: '⚙️', codes: 'RI', cluster: 'Sains & Kejuruteraan',
            description: 'Mereka dan menyelenggara mesin dan sistem mekanikal.',
            salary: 'RM3,200 – RM5,500',
            education: 'Ijazah Mekanikal',
            path: 'SPM → Matrikulasi/Asasi Kejuruteraan → Ijazah Mekanikal → Graduate Engineer → Jurutera',
            subjects: ['Matematik Tambahan', 'Fizik', 'Kimia'],
            skills: ['CAD', 'Termodinamik', 'Mekanik', 'Pembuatan'],
            uniMY: ['UTM', 'UM', 'UPM', 'USM'],
            uniIntl: ['MIT', 'Stanford', 'Imperial College London']
        },
        {
            name: 'Ahli Astronomi', icon: '🔭', codes: 'IR', cluster: 'Sains & Kejuruteraan',
            description: 'Mengkaji bintang, planet, dan alam semesta.',
            salary: 'RM3,000 – RM7,000',
            education: 'Ijazah Fizik / Astronomi',
            path: 'SPM → Matrikulasi/STPM Fizik → Ijazah Fizik/Astronomi → Sarjana/PhD → Penyelidik/Observatori',
            subjects: ['Fizik', 'Matematik Tambahan', 'Kimia'],
            skills: ['Fizik', 'Matematik', 'Python', 'Analisis Imej/Data'],
            uniMY: ['UM', 'USM', 'UTM'],
            uniIntl: ['Caltech', 'MIT', 'University of Cambridge']
        },

        // ============ PERNIAGAAN & KEUSAHAWANAN ============
        {
            name: 'Usahawan', icon: '💼', codes: 'EK', cluster: 'Perniagaan & Keusahawanan',
            description: 'Membina dan mengurus perniagaan sendiri.',
            salary: 'RM0 – RM10,000+ (tidak tetap)',
            education: 'Ijazah Perniagaan / Pengalaman',
            path: 'SPM → Diploma/Ijazah Perniagaan atau terus berniaga → Validasi idea → Perniagaan berkembang',
            subjects: ['Matematik', 'Prinsip Perakaunan', 'Ekonomi', 'Perniagaan'],
            skills: ['Jualan', 'Kewangan', 'Kepimpinan', 'Inovasi'],
            uniMY: ['UUM', 'UM', 'UiTM', 'Sunway'],
            uniIntl: ['Harvard', 'Stanford', 'INSEAD']
        },
        {
            name: 'Pengurus Pemasaran', icon: '📈', codes: 'ES', cluster: 'Perniagaan & Keusahawanan',
            description: 'Merancang strategi pemasaran produk atau servis.',
            salary: 'RM3,000 – RM6,000',
            education: 'Ijazah Pemasaran',
            path: 'SPM → Matrikulasi/STPM/Asasi → Ijazah Pemasaran → Eksekutif → Pengurus',
            subjects: ['Matematik', 'Ekonomi', 'Perniagaan'],
            skills: ['Digital Marketing', 'Analitik', 'Branding', 'Komunikasi'],
            uniMY: ['UM', 'UUM', 'UiTM', "Taylor's"],
            uniIntl: ['University of Pennsylvania', 'NUS', 'University of Melbourne']
        },
        {
            name: 'Akauntan', icon: '📊', codes: 'KE', cluster: 'Perniagaan & Keusahawanan',
            description: 'Menguruskan kewangan dan audit syarikat.',
            salary: 'RM3,000 – RM5,500',
            education: 'Ijazah Perakaunan + ACCA/MIA',
            path: 'SPM → Matrikulasi Perakaunan → Ijazah Perakaunan → ACCA/MIA → Akauntan',
            subjects: ['Matematik', 'Prinsip Perakaunan', 'Ekonomi'],
            skills: ['Perakaunan', 'Audit', 'Cukai', 'Excel', 'Etika'],
            uniMY: ['UM', 'UUM', 'UiTM', 'Sunway'],
            uniIntl: ['University of Manchester', 'University of Melbourne', 'UNSW']
        },
        {
            name: 'Jurujual', icon: '💰', codes: 'ES', cluster: 'Perniagaan & Keusahawanan',
            description: 'Menjual produk atau servis kepada pelanggan.',
            salary: 'RM2,000 – RM6,000+ (termasuk komisen)',
            education: 'Sijil/Diploma Perniagaan',
            path: 'SPM → Sijil/Diploma Perniagaan → Sales Executive → Sales Manager',
            subjects: ['Matematik', 'Ekonomi', 'Bahasa'],
            skills: ['Rundingan', 'Komunikasi', 'Prospek Pelanggan', 'CRM'],
            uniMY: ['UiTM', 'UUM', 'Politeknik', 'HELP'],
            uniIntl: ['University of Pennsylvania', 'NUS', 'University of Sydney']
        },
        {
            name: 'Perancang Kewangan', icon: '💵', codes: 'EK', cluster: 'Perniagaan & Keusahawanan',
            description: 'Membantu klien merancang kewangan dan pelaburan.',
            salary: 'RM3,000 – RM7,000+',
            education: 'Ijazah Kewangan',
            path: 'SPM → Diploma/Ijazah Kewangan → Lesen/sijil berkaitan → Financial Planner',
            subjects: ['Matematik', 'Prinsip Perakaunan', 'Ekonomi'],
            skills: ['Pelaburan', 'Perancangan Cukai', 'Risiko', 'Komunikasi'],
            uniMY: ['UM', 'UUM', 'UiTM', 'INCEIF'],
            uniIntl: ['London School of Economics', 'University of Melbourne', 'NUS']
        },
        {
            name: 'Pegawai Bank', icon: '🏦', codes: 'KE', cluster: 'Perniagaan & Keusahawanan',
            description: 'Menguruskan urusan perbankan seperti pinjaman, akaun.',
            salary: 'RM2,800 – RM5,000',
            education: 'Ijazah Kewangan / Perbankan',
            path: 'SPM → Matrikulasi Perakaunan/Ekonomi → Ijazah Kewangan/Perbankan → Pegawai Bank → Pengurus',
            subjects: ['Matematik', 'Prinsip Perakaunan', 'Ekonomi'],
            skills: ['Analisis Kredit', 'Kewangan', 'Khidmat Pelanggan', 'Pematuhan'],
            uniMY: ['UUM', 'UM', 'UiTM', 'IIUM'],
            uniIntl: ['University of Hong Kong', 'NUS', 'University of Manchester']
        },
        {
            name: 'Pengurus HR', icon: '👔', codes: 'ES', cluster: 'Perniagaan & Keusahawanan',
            description: 'Menguruskan pekerja dan budaya syarikat.',
            salary: 'RM3,000 – RM6,000',
            education: 'Ijazah Sumber Manusia / Psikologi',
            path: 'SPM → Matrikulasi/STPM → Ijazah Sumber Manusia/Psikologi → HR Executive → HR Manager',
            subjects: ['Ekonomi', 'Bahasa', 'Matematik'],
            skills: ['Pengambilan Pekerja', 'Undang-undang Buruh', 'Komunikasi', 'Mediasi'],
            uniMY: ['UUM', 'UM', 'UiTM', 'UKM'],
            uniIntl: ['Cornell', 'University of Michigan', 'LSE']
        },
        {
            name: 'Konsultan Bisnes', icon: '📋', codes: 'EK', cluster: 'Perniagaan & Keusahawanan',
            description: 'Memberi nasihat strategik kepada syarikat.',
            salary: 'RM3,500 – RM8,000+',
            education: 'Ijazah Perniagaan / Ekonomi',
            path: 'SPM → Matrikulasi/STPM → Ijazah Perniagaan/Ekonomi → Analyst → Consultant → Manager',
            subjects: ['Matematik', 'Ekonomi', 'Perniagaan'],
            skills: ['Analisis', 'Penyelesaian Masalah', 'Pembentangan', 'Strategi'],
            uniMY: ['UM', 'UUM', 'UKM', "Taylor's"],
            uniIntl: ['INSEAD', 'Harvard', 'University of Oxford']
        },

        // ============ PENDIDIKAN & SOSIAL ============
        {
            name: 'Guru', icon: '👨‍🏫', codes: 'SE', cluster: 'Pendidikan & Sosial',
            description: 'Mengajar pelajar di sekolah rendah atau menengah.',
            salary: 'RM2,500 – RM5,000',
            education: 'Ijazah Pendidikan',
            path: 'SPM → IPG atau Matrikulasi/STPM → Ijazah Pendidikan → Praktikum → Guru',
            subjects: ['Bahasa Melayu', 'Bahasa Inggeris', 'Sejarah', 'Pendidikan Islam/Moral'],
            skills: ['Pedagogi', 'Pengurusan Kelas', 'Komunikasi', 'Teknologi Pendidikan'],
            uniMY: ['IPG', 'UPSI', 'UM', 'UKM'],
            uniIntl: ['University of Melbourne', 'UCL Institute of Education', 'University of Helsinki']
        },
        {
            name: 'Kaunselor', icon: '💬', codes: 'SA', cluster: 'Pendidikan & Sosial',
            description: 'Membantu klien selesaikan masalah peribadi atau kerjaya.',
            salary: 'RM2,500 – RM5,000',
            education: 'Ijazah Kaunseling',
            path: 'SPM → Matrikulasi/STPM → Ijazah Kaunseling → Sarjana/pendaftaran → Kaunselor',
            subjects: ['Bahasa Melayu', 'Bahasa Inggeris', 'Pendidikan Islam/Moral'],
            skills: ['Mendengar Aktif', 'Kaunseling', 'Etika', 'Empati'],
            uniMY: ['UPSI', 'UM', 'UKM', 'UPM'],
            uniIntl: ['University of British Columbia', 'University of Melbourne', 'University of Toronto']
        },
        {
            name: 'Pekerja Sosial', icon: '🤝', codes: 'SA', cluster: 'Pendidikan & Sosial',
            description: 'Membantu golongan kurang bernasib baik dalam masyarakat.',
            salary: 'RM2,300 – RM4,500',
            education: 'Ijazah Kerja Sosial / Sains Sosial',
            path: 'SPM → STPM/Matrikulasi → Ijazah Kerja Sosial/Sains Sosial → Latihan lapangan → Pekerja Sosial',
            subjects: ['Bahasa Melayu', 'Bahasa Inggeris', 'Sejarah'],
            skills: ['Intervensi Komuniti', 'Dokumentasi', 'Empati', 'Pengurusan Kes'],
            uniMY: ['UM', 'UKM', 'UUM', 'USIM'],
            uniIntl: ['University of Michigan', 'University of Toronto', 'University of Edinburgh']
        },
        {
            name: 'Pustakawan', icon: '📚', codes: 'KS', cluster: 'Pendidikan & Sosial',
            description: 'Menguruskan koleksi buku dan maklumat di perpustakaan.',
            salary: 'RM2,500 – RM4,800',
            education: 'Ijazah Pengurusan Maklumat',
            path: 'SPM → Diploma/Ijazah Pengurusan Maklumat → Latihan perpustakaan → Pustakawan',
            subjects: ['Bahasa Melayu', 'Bahasa Inggeris', 'Sejarah'],
            skills: ['Pengurusan Maklumat', 'Katalog', 'Digital Library', 'Penyelidikan'],
            uniMY: ['UiTM', 'UM', 'UUM', 'UKM'],
            uniIntl: ['University of Michigan', 'University College London', 'University of British Columbia']
        },
        {
            name: 'Pensyarah', icon: '🎓', codes: 'SA', cluster: 'Pendidikan & Sosial',
            description: 'Mengajar dan menyelidik di peringkat universiti.',
            salary: 'RM3,500 – RM8,000+',
            education: 'Master / PhD',
            path: 'SPM → Matrikulasi/STPM → Ijazah → Sarjana → PhD → Pensyarah',
            subjects: ['Subjek major', 'Bahasa Melayu', 'Bahasa Inggeris'],
            skills: ['Pengajaran', 'Penyelidikan', 'Penerbitan Akademik', 'Pembentangan'],
            uniMY: ['UM', 'UKM', 'USM', 'UPM'],
            uniIntl: ['University of Oxford', 'University of Cambridge', 'Harvard']
        },
        {
            name: 'Guru Tadika', icon: '🧸', codes: 'SA', cluster: 'Pendidikan & Sosial',
            description: 'Mengajar dan menjaga kanak-kanak prasekolah.',
            salary: 'RM2,000 – RM3,500',
            education: 'Sijil/Diploma Pendidikan Awal Kanak-kanak',
            path: 'SPM → Sijil/Diploma Pendidikan Awal Kanak-kanak → Praktikum → Guru Tadika',
            subjects: ['Bahasa Melayu', 'Bahasa Inggeris', 'Pendidikan Seni Visual'],
            skills: ['Perkembangan Kanak-kanak', 'Kreativiti', 'Kesabaran', 'Keselamatan'],
            uniMY: ['UPSI', 'UiTM', 'SEGi', 'Open University Malaysia'],
            uniIntl: ['University of Helsinki', 'University of Melbourne', 'University of British Columbia']
        },
        {
            name: 'Pegawai Khidmat Masyarakat', icon: '🏘️', codes: 'SE', cluster: 'Pendidikan & Sosial',
            description: 'Menguruskan program komuniti dan bantuan sosial.',
            salary: 'RM2,500 – RM5,000',
            education: 'Ijazah Sains Sosial / Pembangunan',
            path: 'SPM → Matrikulasi/STPM → Ijazah Sains Sosial/Pembangunan → Latihan komuniti → Pegawai',
            subjects: ['Bahasa Melayu', 'Bahasa Inggeris', 'Sejarah'],
            skills: ['Pengurusan Program', 'Kerja Komuniti', 'Komunikasi', 'Penilaian Impak'],
            uniMY: ['UKM', 'UM', 'UPM', 'UiTM'],
            uniIntl: ['University of Edinburgh', 'University of Toronto', 'University of Melbourne']
        },
        {
            name: 'Penterjemah', icon: '🌐', codes: 'AK', cluster: 'Pendidikan & Sosial',
            description: 'Menterjemah dokumen dari satu bahasa ke bahasa lain.',
            salary: 'RM2,500 – RM6,000+',
            education: 'Ijazah Bahasa / Linguistik',
            path: 'SPM → STPM/Asasi Bahasa → Ijazah Bahasa/Linguistik → Portfolio → Penterjemah/editor',
            subjects: ['Bahasa Melayu', 'Bahasa Inggeris', 'Kesusasteraan'],
            skills: ['Bahasa Melayu & Asing', 'CAT Tools', 'Penyuntingan', 'Ketepatan'],
            uniMY: ['UM', 'UKM', 'UPSI', 'IIUM'],
            uniIntl: ['University of Geneva', 'University of Leeds', 'University of Manchester']
        }
    ];


    // ============================================================
    // CODE SCENE — Filter by Holland Code
    // ============================================================
    function getCareersByHollandCode(code) {
        const userLetters = code.split('');
        const matches = [];

        CAREER_DB.forEach(career => {
            const matchCount = career.codes.split('').filter(l => userLetters.includes(l)).length;
            if (matchCount > 0) matches.push({ ...career, matchScore: matchCount });
        });

        matches.sort((a, b) => b.matchScore - a.matchScore);
        return matches;
    }

    const filterHollandBtn = document.getElementById('filterHollandBtn');
    const filterClusterBtn = document.getElementById('filterClusterBtn');

    function setFilter(type) {
        if (type === 'holland') {
            if (filterHollandBtn) filterHollandBtn.classList.add('active');
            if (filterClusterBtn) filterClusterBtn.classList.remove('active');
            
            const noteCode = document.getElementById('filterNoteCode');
            if (noteCode) noteCode.textContent = currentHollandCode;

            renderCareerGrid(allMatchingCareers);
        } else {
            if (filterClusterBtn) filterClusterBtn.classList.add('active');
            if (filterHollandBtn) filterHollandBtn.classList.remove('active');

            const noteCode = document.getElementById('filterNoteCode');
            if (noteCode) noteCode.textContent = currentCluster || 'Belum dipilih';

            const clusterCareers = allMatchingCareers.filter(c => c.cluster === currentCluster);
            renderCareerGrid(clusterCareers);
        }
    }

    if (filterHollandBtn) filterHollandBtn.addEventListener('click', () => setFilter('holland'));
    if (filterClusterBtn) filterClusterBtn.addEventListener('click', () => setFilter('cluster'));

    // ============================================================
    // CODE SCENE — Render Grid Kerjaya
    // ============================================================
    function renderCareerGrid(careers) {
        const container = document.getElementById('careerGridCode');
        if (!container) return;

        container.innerHTML = '';

        if (!careers || careers.length === 0) {
            container.innerHTML = `
                <div class="career-empty">
                    Tiada kerjaya sepadan dalam kategori ini.<br>
                    Cuba kategori lain!
                </div>
            `;
            return;
        }

        careers.forEach((career, i) => {
            const card = document.createElement('div');
            card.className = 'career-card-code';
            card.style.animationDelay = `${i * 0.05}s`;
            card.innerHTML = `
                <div class="career-card-icon">${career.icon}</div>
                <div class="career-card-name">${career.name}</div>
                <div class="career-card-code-badge">${career.codes}</div>
                <div class="career-card-cluster">${career.cluster.split(' & ')[0]}</div>
            `;
            card.addEventListener('click', () => window.openCareerModal(career));
            container.appendChild(card);
        });
    }
    // ============================================================
    // 11. TERUSKAN BUTTON (Fallback handler)
    // ============================================================
    const continueToCodeBtn = document.getElementById('continueToCodeBtn');
    if (continueToCodeBtn) {
        continueToCodeBtn.addEventListener('click', () => {
            const user = getCurrentUser();
            if (!user) {
                showScene('loginScene');
                return;
            }

            // Kalau dah ada kod IMK dari GDevelop, terus ke Code Scene
            if (user.imkCode) {
                console.log("Using saved IMK code:", user.imkCode);
                proceedToCodeScene(user.imkCode);
                return;
            }

            // Kalau belum ada → prompt user untuk taip kod manual
            const imkCode = prompt(
                "Masukkan kod IMK / Kod Holland anda (3 huruf):\nContoh: KRS",
                ""
            );

            if (!imkCode) return;

            const cleanCode = imkCode.toUpperCase().trim();

            if (cleanCode.length !== 3 || !/^[A-Z]{3}$/.test(cleanCode)) {
                alert("Kod mesti 3 huruf (contoh: KRS). Sila cuba lagi.");
                return;
            }

            user.imkCode = cleanCode;
            setCurrentUser(user);

            fetch('https://motyf-backend.onrender.com/api/imk-code', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    username: user.username, 
                    imkCode: cleanCode 
                })
            }).then(res => res.json())
              .then(data => console.log("✅ IMK code saved:", data))
              .catch(err => console.error("Error:", err));

            proceedToCodeScene(cleanCode);
        });
    }
    // ============================================================
    // GLOBAL USER PROFILE HANDLERS
    // ============================================================
    const globalProfile = document.getElementById('globalUserProfile');
    const globalUserProfileBtn = document.getElementById('globalUserProfileBtn');

    if (globalUserProfileBtn) {
        globalUserProfileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            globalProfile.classList.toggle('open');
        });
    }

    // Tutup dropdown bila klik luar
    document.addEventListener('click', (e) => {
        if (globalProfile && !globalProfile.contains(e.target)) {
            globalProfile.classList.remove('open');
        }
    });

    // Dashboard button
    const globalDashboardBtn = document.getElementById('globalDashboardBtn');
    if (globalDashboardBtn) {
        globalDashboardBtn.addEventListener('click', () => {
            globalProfile.classList.remove('open');
            loadDashboard();
            showScene('dashboardScene');
        });
    }

    // Profile button
    const globalProfileBtn = document.getElementById('globalProfileBtn');
    if (globalProfileBtn) {
        globalProfileBtn.addEventListener('click', () => {
            globalProfile.classList.remove('open');
            loadProfile();
            showScene('profileScene');
        });
    }

    // Logout button
    const globalLogoutBtn = document.getElementById('globalLogoutBtn');
    if (globalLogoutBtn) {
        globalLogoutBtn.addEventListener('click', () => {
            globalProfile.classList.remove('open');
            if (confirm("Adakah anda pasti mahu log keluar?")) {
                localStorage.removeItem('motyf_current_user');
                updateUserProfileUI();
                showScene('landingScene');
                console.log("✅ User berjaya log keluar.");
            }
        });
    }

    // Panggil bila page load
    updateUserProfileUI();
    // ============================================================
    // ADMIN DASHBOARD
    // ============================================================
    
    // Detech URL hash #admin → tunjuk Admin Login
    function checkAdminRoute() {
        if (window.location.hash === '#admin') {
            showScene('adminLoginScene');
        }
    }

    window.addEventListener('hashchange', checkAdminRoute);
    checkAdminRoute();

    // Admin Login Form
    const adminLoginForm = document.getElementById('adminLoginForm');
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const errEl = document.getElementById('adminLoginError');
            errEl.textContent = '';

            const username = document.getElementById('adminUsername').value.trim();
            const password = document.getElementById('adminPassword').value;

            if (!username || !password) {
                errEl.textContent = 'Sila isi semua field.';
                return;
            }

            try {
                const res = await fetch('https://motyf-backend.onrender.com/api/admin/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password })
                });
                const data = await res.json();
                if (!res.ok) { errEl.textContent = data.message; return; }

                // Berjaya login
                adminLoginForm.reset();
                sessionStorage.setItem('motyf_admin', 'true');
                loadAdminDashboard();

            } catch (err) {
                console.error(err);
                errEl.textContent = 'Ralat sambungan.';
            }
        });
    }

    // Admin Back / Logout
    const adminBackBtn = document.getElementById('adminBackBtn');
    if (adminBackBtn) {
        adminBackBtn.addEventListener('click', () => {
            sessionStorage.removeItem('motyf_admin');
            window.location.hash = '';
            showScene('landingScene');
        });
    }

    // Load Admin Dashboard
    async function loadAdminDashboard() {
        showScene('adminDashboardScene');
        
        try {
            // Fetch stats
            const statsRes = await fetch('https://motyf-backend.onrender.com/api/admin/stats');
            const stats = await statsRes.json();
            renderAdminSummary(stats);
            renderAdminCharts(stats);

            // Fetch students
            const studentsRes = await fetch('https://motyf-backend.onrender.com/api/admin/students');
            const students = await studentsRes.json();
            renderStudentTable(students);

        } catch (err) {
            console.error("Error loading admin dashboard:", err);
        }
    }

    function renderAdminSummary(stats) {
        const container = document.getElementById('adminSummary');
        if (!container) return;
        
        const pct = (n) => stats.total > 0 ? Math.round((n / stats.total) * 100) : 0;

        container.innerHTML = `
            <div class="summary-card">
                <div class="summary-icon">👥</div>
                <div class="summary-value">${stats.total}</div>
                <div class="summary-label">Total Pelajar</div>
            </div>
            <div class="summary-card">
                <div class="summary-icon">✅</div>
                <div class="summary-value">${stats.yaCount}</div>
                <div class="summary-label">Dah Ada Hala Tuju</div>
                <div class="summary-percent">${pct(stats.yaCount)}%</div>
            </div>
            <div class="summary-card">
                <div class="summary-icon">❓</div>
                <div class="summary-value">${stats.tidakCount}</div>
                <div class="summary-label">Belum Ada Hala Tuju</div>
                <div class="summary-percent">${pct(stats.tidakCount)}%</div>
            </div>
            <div class="summary-card">
                <div class="summary-icon">🎯</div>
                <div class="summary-value">${stats.imkCompleted}</div>
                <div class="summary-label">Selesai IMK</div>
                <div class="summary-percent">${pct(stats.imkCompleted)}%</div>
            </div>
        `;
    }

    function renderAdminCharts(stats) {
        renderChart('clusterChart', stats.clusterCount);
        renderChart('hollandChart', stats.hollandCount);
        renderChart('reasonChart', stats.reasonCount);
    }

    function renderChart(elementId, dataObj) {
        const container = document.getElementById(elementId);
        if (!container) return;

        const entries = Object.entries(dataObj || {});
        
        if (entries.length === 0) {
            container.innerHTML = '<p class="chart-empty">Tiada data lagi</p>';
            return;
        }

        // Sort by count desc
        entries.sort((a, b) => b[1] - a[1]);
        const maxVal = entries[0][1];

        container.innerHTML = '';
        entries.forEach(([label, count]) => {
            const percent = (count / maxVal) * 100;
            const item = document.createElement('div');
            item.className = 'chart-item';
            item.innerHTML = `
                <div class="chart-item-header">
                    <span>${label}</span>
                    <span><strong>${count}</strong></span>
                </div>
                <div class="chart-item-bar-wrapper">
                    <div class="chart-item-bar" style="width: 0%;"></div>
                </div>
            `;
            container.appendChild(item);
            
            // Animate bar
            setTimeout(() => {
                item.querySelector('.chart-item-bar').style.width = `${percent}%`;
            }, 100);
        });
    }

    function renderStudentTable(students) {
        const tbody = document.getElementById('studentTableBody');
        if (!tbody) return;

        if (students.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding:2rem; opacity:0.5;">Tiada pelajar lagi</td></tr>';
            return;
        }

        tbody.innerHTML = '';
        students.forEach(s => {
            const direction = s.careerDirection === 'YA' 
                ? '<span class="badge badge-ya">YA</span>'
                : s.careerDirection === 'TIDAK'
                ? '<span class="badge badge-tidak">TIDAK</span>'
                : '-';
            
            const imkBadge = s.imkCode 
                ? `<span class="badge badge-code">${s.imkCode}</span>`
                : '-';
            
            const date = s.createdAt 
                ? new Date(s.createdAt).toLocaleDateString('ms-MY', { day: 'numeric', month: 'short', year: '2-digit' })
                : '-';

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong>${s.username}</strong></td>
                <td>${s.kelas || '-'}</td>
                <td>${direction}</td>
                <td>${s.exploredCluster || '-'}</td>
                <td>${imkBadge}</td>
                <td>${date}</td>
            `;
            tbody.appendChild(tr);
        });
    }

    // Export CSV
    const exportBtn = document.getElementById('exportBtn');
    if (exportBtn) {
        exportBtn.addEventListener('click', async () => {
            try {
                const res = await fetch('https://motyf-backend.onrender.com/api/admin/students');
                const students = await res.json();

                // Build CSV
                const headers = ['Username', 'Kelas', 'Hala Tuju', 'Kluster', 'Kod IMK', 'Kerjaya Impian', 'Tarikh'];
                const rows = students.map(s => [
                    s.username,
                    s.kelas,
                    s.careerDirection || '',
                    s.exploredCluster || '',
                    s.imkCode || '',
                    s.dreamCareer || '',
                    s.createdAt ? new Date(s.createdAt).toLocaleDateString('ms-MY') : ''
                ]);

                const csvContent = [headers, ...rows]
                    .map(row => row.map(cell => `"${cell}"`).join(','))
                    .join('\n');

                // Download
                const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `motyf-students-${new Date().toISOString().slice(0,10)}.csv`;
                a.click();
                URL.revokeObjectURL(url);

            } catch (err) {
                console.error("Export error:", err);
                alert("Gagal export CSV.");
            }
        });
    }
    // ============================================================
    // CAREER DETAIL MODAL HANDLERS
    // ============================================================
    const careerModal = document.getElementById('careerModal');
    const careerModalClose = document.getElementById('careerModalClose');
    const careerModalOkBtn = document.getElementById('careerModalOkBtn');

    // ============================================================
    // CAREER MODAL FUNCTIONS (Global)
    // ============================================================
    
    // Fungsi buka modal
    window.openCareerModal = function(career) {
        const modal = document.getElementById('careerModal');
        if (!modal) {
            console.error("Modal element not found!");
            return;
        }

        const iconEl = document.getElementById('modalCareerIcon');
        const nameEl = document.getElementById('modalCareerName');
        const codeEl = document.getElementById('modalCareerCode');
        const clusterEl = document.getElementById('modalCareerCluster');
        const descEl = document.getElementById('modalCareerDesc');
        const salaryEl = document.getElementById('modalCareerSalary');
        const eduEl = document.getElementById('modalCareerEducation');
        const pathEl = document.getElementById('modalCareerPath');
        const subjectsEl = document.getElementById('modalCareerSubjects');
        const skillsEl = document.getElementById('modalCareerSkills');
        const uniMYEl = document.getElementById('modalCareerUniMY');
        const uniIntlEl = document.getElementById('modalCareerUniIntl');

        if (iconEl) iconEl.textContent = career.icon || '💼';
        if (nameEl) nameEl.textContent = career.name || 'Kerjaya';
        if (codeEl) codeEl.textContent = career.codes || '';
        if (clusterEl) clusterEl.textContent = career.cluster ? career.cluster.split(' & ')[0] : '';
        if (descEl) descEl.textContent = career.description || 'Tiada deskripsi.';
        if (salaryEl) salaryEl.textContent = career.salary || '-';
        if (eduEl) eduEl.textContent = career.education || '-';
        if (pathEl) pathEl.textContent = career.path || '-';

        const renderTags = (container, items) => {
            if (!container) return;
            container.innerHTML = '';
            (items || []).forEach(item => {
                const tag = document.createElement('span');
                tag.className = 'career-tag';
                tag.textContent = item;
                container.appendChild(tag);
            });
        };

        renderTags(subjectsEl, career.subjects);
        renderTags(skillsEl, career.skills);
        renderTags(uniMYEl, career.uniMY);
        renderTags(uniIntlEl, career.uniIntl);

        modal.classList.add('open');
    };

    // Fungsi tutup modal
    window.closeCareerModal = function() {
        const modal = document.getElementById('careerModal');
        if (modal) modal.classList.remove('open');
    };

    // ============================================================
    // BIND BUTTON EVENTS (Fallback)
    // ============================================================
    setTimeout(() => {
        const closeBtn = document.getElementById('careerModalClose');
        const okBtn = document.getElementById('careerModalOkBtn');
        const modalEl = document.getElementById('careerModal');

        if (closeBtn) {
            closeBtn.addEventListener('click', window.closeCareerModal);
            console.log("✅ Close button bound");
        } else {
            console.warn("⚠️ Close button not found");
        }

        if (okBtn) {
            okBtn.addEventListener('click', window.closeCareerModal);
            console.log("✅ OK button bound");
        } else {
            console.warn("⚠️ OK button not found");
        }

        if (modalEl) {
            // Tutup bila klik luar
            modalEl.addEventListener('click', (e) => {
                if (e.target === modalEl) window.closeCareerModal();
            });
        }

        // Tutup bila tekan ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') window.closeCareerModal();
        });
    }, 200);
    // ============================================================
    // NAV MENU HANDLERS
    // ============================================================
    
    // Helper: semak login sebelum jalankan fungsi
    function requireLogin(callback) {
        const user = getCurrentUser();
        if (!user) {
            console.log("⚠️ User belum login — pergi ke Login Scene");
            showScene('loginScene');
            return;
        }
        callback();
    }

    // Explore — PERLU LOGIN
    const navExplore = document.getElementById('navExplore');
    if (navExplore) {
        navExplore.addEventListener('click', (e) => {
            e.preventDefault();
            requireLogin(() => {
                renderExploreClusters();
                showScene('exploreScene');
            });
        });
    }

    // Tentang MoTYF — TAK PERLU LOGIN
    const navAbout = document.getElementById('navAbout');
    if (navAbout) {
        navAbout.addEventListener('click', (e) => {
            e.preventDefault();
            showScene('aboutScene');
        });
    }

    // Cara Guna — PERLU LOGIN
    const navGuide = document.getElementById('navGuide');
    if (navGuide) {
        navGuide.addEventListener('click', (e) => {
            e.preventDefault();
            requireLogin(() => {
                startGuideTutorial();
            });
        });
    }
    // ============================================================
    // EXPLORE SCENE
    // ============================================================
    const CLUSTERS_INFO = [
        { name: 'Teknologi & Digital', icon: '💻' },
        { name: 'Kesihatan & Perubatan', icon: '🩺' },
        { name: 'Seni & Kreatif', icon: '🎨' },
        { name: 'Sains & Kejuruteraan', icon: '🔬' },
        { name: 'Perniagaan & Keusahawanan', icon: '💼' },
        { name: 'Pendidikan & Sosial', icon: '📚' }
    ];

    function renderExploreClusters() {
        const container = document.getElementById('clustersGrid');
        if (!container) return;

        container.innerHTML = '';

        CLUSTERS_INFO.forEach(cluster => {
            // Kira kerjaya dalam kluster
            const count = typeof CAREER_DB !== 'undefined'
                ? CAREER_DB.filter(c => c.cluster === cluster.name).length
                : 0;

            const card = document.createElement('div');
            card.className = 'cluster-card';
            card.innerHTML = `
                <div class="cluster-card-icon">${cluster.icon}</div>
                <div class="cluster-card-name">${cluster.name}</div>
                <div class="cluster-card-count">${count} kerjaya</div>
            `;
            card.addEventListener('click', () => showClusterDetail(cluster.name, cluster.icon));
            container.appendChild(card);
        });

        // Pastikan view kluster aktif, view detail tak aktif
        document.getElementById('clusterView').style.display = 'block';
        document.getElementById('careerInClusterView').style.display = 'none';
    }

    function showClusterDetail(clusterName, clusterIcon) {
        const careers = typeof CAREER_DB !== 'undefined'
            ? CAREER_DB.filter(c => c.cluster === clusterName)
            : [];

        // Update header
        document.getElementById('clusterDetailIcon').textContent = clusterIcon;
        document.getElementById('clusterDetailTitle').textContent = clusterName;
        document.getElementById('clusterDetailCount').textContent = 
            `${careers.length} kerjaya dalam kluster ini`;

        // Render careers
        const grid = document.getElementById('clusterCareerGrid');
        grid.innerHTML = '';

        if (careers.length === 0) {
            grid.innerHTML = `<div class="career-empty">Tiada kerjaya dalam kluster ini.</div>`;
        } else {
            careers.forEach((career, i) => {
                const card = document.createElement('div');
                card.className = 'career-card-code';
                card.style.animationDelay = `${i * 0.05}s`;
                card.innerHTML = `
                    <div class="career-card-icon">${career.icon}</div>
                    <div class="career-card-name">${career.name}</div>
                    <div class="career-card-code-badge">${career.codes}</div>
                    <div class="career-card-cluster">${career.cluster.split(' & ')[0]}</div>
                `;
                card.addEventListener('click', () => window.openCareerModal(career));
                grid.appendChild(card);
            });
        }

        // Tukar view
        document.getElementById('clusterView').style.display = 'none';
        document.getElementById('careerInClusterView').style.display = 'block';

        // Scroll ke atas
        const exploreContainer = document.querySelector('.explore-container-scene');
        if (exploreContainer) exploreContainer.scrollTop = 0;
    }

    // Back to Clusters
    const backToClustersBtn = document.getElementById('backToClustersBtn');
    if (backToClustersBtn) {
        backToClustersBtn.addEventListener('click', () => {
            document.getElementById('clusterView').style.display = 'block';
            document.getElementById('careerInClusterView').style.display = 'none';
        });
    }

    // Back to Home (dari Explore Scene)
    // ============================================================
    // BACK BUTTONS HANDLERS
    // ============================================================
    
    // Explore Scene Back — terus balik landing (tanpa soalan)
    const exploreBackBtn = document.getElementById('exploreBackBtn');
    if (exploreBackBtn) {
        exploreBackBtn.addEventListener('click', () => {
            showScene('landingScene');
        });
    }

    // Code Scene Back — tunjuk soalan dulu
    const codeSceneBackBtn = document.getElementById('codeSceneBackBtn');
    if (codeSceneBackBtn) {
        codeSceneBackBtn.addEventListener('click', () => {
            console.log("Code Scene back — tunjuk soalan");
            showScene('exploreQuestionScene');
        });
    }
    // ============================================================
    // GUIDE TUTORIAL
    // ============================================================
    const GUIDE_STEPS = [
        {
            target: null, // Center — welcome
            title: '👋 Selamat Datang!',
            text: 'Jom kami tunjukkan cara guna MoTYF+ dalam masa 1 minit sahaja. Ikut anak panah untuk kenali setiap bahagian.',
            position: 'center'
        },
        {
            target: '.brand-logo',
            title: '🏠 Logo MoTYF+',
            text: 'Anda boleh klik logo ini bila-bila masa untuk kembali ke halaman utama.',
            position: 'bottom'
        },
        {
            target: '.nav-links',
            title: '🧭 Menu Navigasi',
            text: 'Guna menu ini untuk terokai kerjaya, tahu tentang MoTYF+, atau tengok panduan ini semula.',
            position: 'bottom'
        },
        {
            target: '#loginBtn',
            title: '🔐 Log In / Sign Up',
            text: 'Klik di sini untuk daftar akaun baru atau log masuk. Akaun diperlukan untuk simpan perjalanan anda.',
            position: 'bottom',
            hideIfLoggedIn: true
        },
        {
            target: '#journeyBtn',
            title: '🚀 Mula Perjalanan',
            text: 'Klik butang ini untuk mulakan perjalanan kerjaya anda. Ini langkah pertama untuk temui kerjaya impian!',
            position: 'top'
        },
        {
            target: '.bottom-tagline',
            title: '💫 Beyond The Limits',
            text: 'Dah selesai! Klik "START YOUR JOURNEY" untuk mula, atau tekan menu lain untuk terokai lagi.',
            position: 'top'
        }
    ];

    let currentGuideStep = 0;
    let guideActive = false;

    window.startGuideTutorial = function() {
        guideActive = true;
        currentGuideStep = 0;
        
        // Show overlay
        const overlay = document.getElementById('guideOverlay');
        if (overlay) overlay.style.display = 'block';
        
        // Update total steps
        const totalEl = document.getElementById('guideTotalSteps');
        if (totalEl) totalEl.textContent = GUIDE_STEPS.length;
        
        // Show first step
        setTimeout(() => showGuideStep(), 100);
    };

    function showGuideStep() {
        if (!guideActive) return;
        
        const step = GUIDE_STEPS[currentGuideStep];
        if (!step) { endGuideTutorial(); return; }

        // Skip step if hideIfLoggedIn & user dah login
        if (step.hideIfLoggedIn) {
            const user = getCurrentUser();
            if (user) {
                currentGuideStep++;
                showGuideStep();
                return;
            }
        }

        // Update caption content
        document.getElementById('guideStepNum').textContent = currentGuideStep + 1;
        document.getElementById('guideTitle').textContent = step.title;
        document.getElementById('guideText').textContent = step.text;

        // Update next button text
        const nextBtn = document.getElementById('guideNextBtn');
        if (nextBtn) {
            if (currentGuideStep === GUIDE_STEPS.length - 1) {
                nextBtn.textContent = 'Selesai ✓';
            } else {
                nextBtn.textContent = 'Seterusnya →';
            }
        }

        const spotlight = document.getElementById('guideSpotlight');
        const arrow = document.getElementById('guideArrow');
        const caption = document.getElementById('guideCaption');

        // =========================================
        // STEP: CENTER (Welcome)
        // =========================================
        if (step.position === 'center' || !step.target) {
            spotlight.className = 'guide-spotlight center';
            spotlight.style.width = '0';
            spotlight.style.height = '0';
            spotlight.style.top = '50%';
            spotlight.style.left = '50%';
            spotlight.style.transform = 'translate(-50%, -50%)';
            
            arrow.style.display = 'none';
            
            caption.style.top = '50%';
            caption.style.left = '50%';
            caption.style.transform = 'translate(-50%, -50%)';
            return;
        }

        // =========================================
        // STEP: TARGET ELEMENT
        // =========================================
        const target = document.querySelector(step.target);
        if (!target) {
            // Skip if target tak ada
            currentGuideStep++;
            showGuideStep();
            return;
        }

        // Scroll target ke view (kalau perlu)
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Get position
        const rect = target.getBoundingClientRect();
        const padding = 10;

        // Position spotlight
        spotlight.className = 'guide-spotlight';
        spotlight.style.top = `${rect.top - padding}px`;
        spotlight.style.left = `${rect.left - padding}px`;
        spotlight.style.width = `${rect.width + padding * 2}px`;
        spotlight.style.height = `${rect.height + padding * 2}px`;
        spotlight.style.transform = 'none';

        // Position arrow & caption
        const spotlightCenterX = rect.left + rect.width / 2;

        if (step.position === 'bottom') {
            // Arrow pointing UP (below target)
            arrow.style.display = 'block';
            arrow.className = 'guide-arrow arrow-top';
            arrow.style.top = `${rect.bottom + padding + 5}px`;
            arrow.style.left = `${spotlightCenterX}px`;
            
            // Caption below arrow
            caption.style.top = `${rect.bottom + padding + 40}px`;
            caption.style.left = `${spotlightCenterX}px`;
            caption.style.transform = 'translateX(-50%)';
        } else {
            // Arrow pointing DOWN (above target)
            arrow.style.display = 'block';
            arrow.className = 'guide-arrow arrow-bottom';
            arrow.style.top = `${rect.top - padding - 25}px`;
            arrow.style.left = `${spotlightCenterX}px`;
            
            // Caption above arrow
            caption.style.top = 'auto';
            caption.style.bottom = `${window.innerHeight - rect.top + padding + 40}px`;
            caption.style.left = `${spotlightCenterX}px`;
            caption.style.transform = 'translateX(-50%)';
        }

        // Ensure caption dalam viewport
        const captionRect = caption.getBoundingClientRect();
        if (captionRect.right > window.innerWidth - 20) {
            caption.style.left = `${window.innerWidth - captionRect.width / 2 - 20}px`;
        }
        if (captionRect.left < 20) {
            caption.style.left = `${captionRect.width / 2 + 20}px`;
        }
    }

    function endGuideTutorial() {
        guideActive = false;
        const overlay = document.getElementById('guideOverlay');
        if (overlay) overlay.style.display = 'none';

        // Semak kalau perlu proceed ke Career Question selepas guide
        const afterGuide = localStorage.getItem('motyf_after_guide');
        if (afterGuide === 'career-question') {
            localStorage.removeItem('motyf_after_guide');
            
            // Tunggu 300ms, kemudian pergi ke Career Question
            setTimeout(() => {
                proceedToCareerQuestion();
            }, 300);
        }
    }
    // Next button
    const guideNextBtn = document.getElementById('guideNextBtn');
    if (guideNextBtn) {
        guideNextBtn.addEventListener('click', () => {
            currentGuideStep++;
            if (currentGuideStep >= GUIDE_STEPS.length) {
                endGuideTutorial();
            } else {
                showGuideStep();
            }
        });
    }

    // Skip button
    const guideSkipBtn = document.getElementById('guideSkipBtn');
    if (guideSkipBtn) {
        guideSkipBtn.addEventListener('click', endGuideTutorial);
    }

    // ESC to exit
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && guideActive) {
            endGuideTutorial();
        }
    });

    // Re-position guide bila resize / scroll
    window.addEventListener('resize', () => {
        if (guideActive) showGuideStep();
    });
    window.addEventListener('scroll', () => {
        if (guideActive) showGuideStep();
    });
    // ============================================================
    // AI CAREER CHAT (Groq)
    // ============================================================

    let currentCareerForAI = null;
    let chatHistory = [];

    const askAiBtn = document.getElementById('askAiBtn');
    const aiChatOverlay = document.getElementById('aiChatOverlay');
    const aiChatClose = document.getElementById('aiChatClose');
    const aiChatMessages = document.getElementById('aiChatMessages');
    const aiChatInput = document.getElementById('aiChatInput');
    const aiChatSend = document.getElementById('aiChatSend');
    const aiChatContext = document.getElementById('aiChatContext');
    const aiChatSuggestions = document.getElementById('aiChatSuggestions');

    // Simpan career bila buka modal (wrap original function)
    if (window.openCareerModal) {
        const originalOpenModal = window.openCareerModal;
        window.openCareerModal = function(career) {
            currentCareerForAI = career;
            originalOpenModal(career);
        };
    }

    // Buka chat AI
    if (askAiBtn) {
        askAiBtn.addEventListener('click', () => {
            if (!currentCareerForAI) {
                console.warn("No career selected for AI chat");
                return;
            }

            // Reset chat
            chatHistory = [];
            aiChatMessages.innerHTML = '';
            
            // Update context
            if (aiChatContext) {
                aiChatContext.textContent = `Tanya tentang ${currentCareerForAI.name}`;
            }

            // Mesej pembuka dari AI
            addChatMessage('ai', `Hai! 👋 Saya boleh jawab soalan anda tentang kerjaya **${currentCareerForAI.name}**. Apa yang anda nak tahu?`);

            // Suggestion chips
            renderSuggestions();

            // Buka overlay
            aiChatOverlay.classList.add('open');
            
            setTimeout(() => aiChatInput.focus(), 300);
        });
    }

    function renderSuggestions() {
        if (!aiChatSuggestions) return;
        
        const suggestions = [
            '💰 Berapa gaji saya nanti?',
            '📚 Subjek apa kena fokus?',
            '🎓 Universiti mana sesuai?',
            '💪 Skill apa perlu belajar?'
        ];

        aiChatSuggestions.innerHTML = '';
        suggestions.forEach(text => {
            const chip = document.createElement('button');
            chip.className = 'suggestion-chip';
            chip.textContent = text;
            chip.addEventListener('click', () => {
                aiChatInput.value = text;
                sendChatMessage();
            });
            aiChatSuggestions.appendChild(chip);
        });
    }

    function addChatMessage(role, text) {
        const messageEl = document.createElement('div');
        messageEl.className = `chat-message ${role}`;

        if (role === 'ai') {
            messageEl.innerHTML = `
                <div class="chat-avatar-small">🤖</div>
                <div class="chat-bubble">${formatChatText(text)}</div>
            `;
        } else {
            messageEl.innerHTML = `<div class="chat-bubble">${formatChatText(text)}</div>`;
        }

        aiChatMessages.appendChild(messageEl);
        aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
    }

    function formatChatText(text) {
        return text
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.+?)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br>');
    }

    function showTypingIndicator() {
        const el = document.createElement('div');
        el.className = 'chat-message ai';
        el.id = 'typingIndicator';
        el.innerHTML = `
            <div class="chat-avatar-small">🤖</div>
            <div class="typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `;
        aiChatMessages.appendChild(el);
        aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
    }

    function removeTypingIndicator() {
        const el = document.getElementById('typingIndicator');
        if (el) el.remove();
    }

    async function sendChatMessage() {
        const text = aiChatInput.value.trim();
        if (!text || !currentCareerForAI) return;

        addChatMessage('user', text);
        chatHistory.push({ role: 'user', text });
        aiChatInput.value = '';
        aiChatInput.disabled = true;
        aiChatSend.disabled = true;

        showTypingIndicator();

        try {
            const res = await fetch('https://motyf-backend.onrender.com/api/ai/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    careerName: currentCareerForAI.name,
                    careerDetails: currentCareerForAI,
                    messages: chatHistory
                })
            });

            const data = await res.json();
            removeTypingIndicator();

            if (!res.ok) {
                addChatMessage('ai', `❌ Maaf, ada masalah: ${data.message || 'Cuba lagi nanti.'}`);
            } else {
                addChatMessage('ai', data.reply);
                chatHistory.push({ role: 'model', text: data.reply });
            }

        } catch (err) {
            console.error("Chat error:", err);
            removeTypingIndicator();
            addChatMessage('ai', `❌ Ralat sambungan. Pastikan backend berjalan.`);
        } finally {
            aiChatInput.disabled = false;
            aiChatSend.disabled = false;
            aiChatInput.focus();
        }
    }

    // Event listeners
    if (aiChatSend) aiChatSend.addEventListener('click', sendChatMessage);
    
    if (aiChatInput) {
        aiChatInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                sendChatMessage();
            }
        });
    }

    if (aiChatClose) {
        aiChatClose.addEventListener('click', () => {
            aiChatOverlay.classList.remove('open');
        });
    }

    if (aiChatOverlay) {
        aiChatOverlay.addEventListener('click', (e) => {
            if (e.target === aiChatOverlay) {
                aiChatOverlay.classList.remove('open');
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && aiChatOverlay && aiChatOverlay.classList.contains('open')) {
            aiChatOverlay.classList.remove('open');
        }
    });
    // ============================================================
    // SOALAN SELEPAS EXPLORE
    // ============================================================
    const exploreYesBtn = document.getElementById('exploreYesBtn');
    const exploreNoBtn = document.getElementById('exploreNoBtn');

    async function saveExploreAnswer(answer) {
        const user = getCurrentUser();
        if (!user) {
            showScene('loginScene');
            return;
        }

        const errEl = document.getElementById('exploreQuestionError');
        if (errEl) errEl.textContent = '';

        // Disable buttons sementara hantar
        if (exploreYesBtn) exploreYesBtn.disabled = true;
        if (exploreNoBtn) exploreNoBtn.disabled = true;

        try {
            const res = await fetch('https://motyf-backend.onrender.com/api/explore-question', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    username: user.username, 
                    answer: answer 
                })
            });
            const data = await res.json();

            if (!res.ok) {
                if (errEl) errEl.textContent = data.message;
                return;
            }

            // Update localStorage
            user.foundCareerFromExplore = answer;
            setCurrentUser(user);

            console.log(`✅ Jawapan "${answer}" disimpan ke MongoDB`);

            // Balik ke landing page
            showScene('landingScene');

        } catch (err) {
            console.error(err);
            if (errEl) errEl.textContent = 'Ralat sambungan. Pastikan backend berjalan.';
        } finally {
            if (exploreYesBtn) exploreYesBtn.disabled = false;
            if (exploreNoBtn) exploreNoBtn.disabled = false;
        }
    }

    if (exploreYesBtn) {
        exploreYesBtn.addEventListener('click', () => {
            console.log("User pilih: YA");
            saveExploreAnswer('YA');
        });
    }

    if (exploreNoBtn) {
        exploreNoBtn.addEventListener('click', () => {
            console.log("User pilih: TIDAK");
            saveExploreAnswer('TIDAK');
        });
    }
    // ============================================================
    // BOOKMARK / FAVOURITES SYSTEM
    // ============================================================
    let currentCareerForBookmark = null;

    // Wrap openCareerModal untuk track career
    const _origOpenModal = window.openCareerModal;
    window.openCareerModal = function(career) {
        currentCareerForBookmark = career;
        if (_origOpenModal) _origOpenModal(career);
        
        // Update bookmark state
        updateBookmarkButton(career.name);
    };

    // Semak sama ada career dah disimpan
    function isFavourite(careerName) {
        const user = getCurrentUser();
        if (!user || !user.favourites) return false;
        return user.favourites.includes(careerName);
    }

    function updateBookmarkButton(careerName) {
        const btn = document.getElementById('careerModalBookmark');
        if (!btn) return;

        if (isFavourite(careerName)) {
            btn.textContent = '❤️';
            btn.classList.add('saved');
            btn.title = 'Buang dari simpanan';
        } else {
            btn.textContent = '🤍';
            btn.classList.remove('saved');
            btn.title = 'Simpan kerjaya';
        }
    }

    // Toggle favourite
    const careerModalBookmark = document.getElementById('careerModalBookmark');
    if (careerModalBookmark) {
        careerModalBookmark.addEventListener('click', async () => {
            const user = getCurrentUser();
            if (!user) { showScene('loginScene'); return; }
            if (!currentCareerForBookmark) return;

            try {
                const res = await fetch('https://motyf-backend.onrender.com/api/favourites/toggle', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        username: user.username, 
                        careerName: currentCareerForBookmark.name 
                    })
                });
                const data = await res.json();
                if (!res.ok) { alert(data.message); return; }

                // Update localStorage
                user.favourites = data.favourites;
                setCurrentUser(user);

                // Update button UI
                updateBookmarkButton(currentCareerForBookmark.name);

                console.log(`✅ ${data.message}`, data.favourites);

            } catch (err) {
                console.error(err);
                alert("Ralat sambungan. Pastikan backend berjalan.");
            }
        });
    }

    // ============================================================
    // LOAD FAVOURITES DALAM DASHBOARD
    // ============================================================
    function loadFavourites() {
        const container = document.getElementById('favouritesGrid');
        if (!container) return;

        const user = getCurrentUser();
        const favs = (user && user.favourites) ? user.favourites : [];

        if (favs.length === 0) {
            container.innerHTML = `
                <div class="favourites-empty">
                    Belum ada kerjaya disimpan.<br>
                    Klik ❤️ dalam modal kerjaya untuk simpan!
                </div>
            `;
            return;
        }

        container.innerHTML = '';
        favs.forEach((careerName, i) => {
            // Cari career dalam CAREER_DB
            const career = (typeof CAREER_DB !== 'undefined') 
                ? CAREER_DB.find(c => c.name === careerName) 
                : null;

            if (!career) return;

            const card = document.createElement('div');
            card.className = 'favourite-card';
            card.style.animationDelay = `${i * 0.05}s`;
            card.innerHTML = `
                <div class="favourite-card-icon">${career.icon}</div>
                <div class="favourite-card-name">${career.name}</div>
                <div class="favourite-card-code">${career.codes}</div>
            `;
            card.addEventListener('click', () => window.openCareerModal(career));
            container.appendChild(card);
        });
    }

    // ============================================================
    // UPDATE DASHBOARD — Tambah Panggilan loadFavourites
    // ============================================================
    // Cari fungsi loadDashboard yang lama, tambah loadFavourites() di hujung
    const _origLoadDashboard = window.loadDashboard;
    // Note: loadDashboard mungkin bukan window — kalau error, cari fungsi asal dan tambah manual
    
    // Cara paling selamat: panggil loadFavourites selepas viewDashboardBtn diklik
    const viewDashboardBtnEl = document.getElementById('viewDashboardBtn');
    if (viewDashboardBtnEl) {
        viewDashboardBtnEl.addEventListener('click', () => {
            setTimeout(loadFavourites, 100);
        });
    }

    // Panggil juga bila loadDashboard dipanggil dari mana-mana
    // Wrap fungsi kalau ia window scope
    if (window.loadDashboard) {
        const orig = window.loadDashboard;
        window.loadDashboard = function() {
            orig();
            setTimeout(loadFavourites, 100);
        };
    }
});