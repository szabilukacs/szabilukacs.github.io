/**
 * Evolution Rezidence – Nyelvi váltó (HU / RO)
 * Magyar az alapértelmezett. localStorage-ba menti a választást.
 */
(function () {
    'use strict';

    var translations = {
        /* ====== HERO ====== */
        hero_sub:           { hu: 'Fedezze fel',                              ro: 'Descoperiți' },
        hero_title:         { hu: 'MODERN OTTHONOK<br>GYERGYÓSZENTMIKLÓSON',  ro: 'LOCUINȚE MODERNE<br>ÎN GHEORGHENI' },
        hero_btn:           { hu: 'Tudjon meg többet',                        ro: 'Aflați mai multe' },
        hero_scroll:        { hu: 'Felfedezés',                               ro: 'Explorați' },

        /* ====== BEMUTATKOZÁS ====== */
        intro_sub:          { hu: 'Minőségi Lakások',                         ro: 'Apartamente de Calitate' },
        intro_title:        { hu: 'Bemutatkozik az Evolution Rezidence',      ro: 'Vă prezentăm Evolution Rezidence' },
        intro_desc:         { hu: 'Gyergyószentmiklóson, a város nyugodt, mégis jól megközelíthető részén valósul meg lakóparkunk, amely a modern élet igényeire szabott, minőségi otthonokat kínál. A korszerű műszaki megoldások, az átgondolt tervezés és a természet közelsége harmonikusan egészítik ki egymást.',
                              ro: 'Complexul nostru rezidențial se dezvoltă într-o zonă liniștită, dar ușor accesibilă din Gheorgheni, oferind locuințe de calitate adaptate nevoilor vieții moderne. Soluțiile tehnice moderne, proiectarea atentă și apropierea de natură se completează armonios.' },
        intro_more_1:       { hu: 'Több',                                     ro: 'Mai multe' },
        intro_more_2:       { hu: 'KÉP',                                      ro: 'IMAGINI' },
        intro_btn:          { hu: 'Bővebben',                                 ro: 'Mai multe' },

        /* ====== SZÁMLÁLÓK ====== */
        stat_apt:           { hu: 'Prémium Lakás',                            ro: 'Apartament Premium' },
        stat_bed:           { hu: 'Hálószoba',                                ro: 'Dormitor' },
        stat_sqm:           { hu: 'Négyzetméter',                             ro: 'Metri pătrați' },
        stat_exp:           { hu: 'Év tapasztalat',                           ro: 'Ani de experiență' },

        /* ====== FOTÓTÚRA ====== */
        photo_title:        { hu: 'Fotótúra',                                 ro: 'Tur foto' },
        photo_prev_1:       { hu: 'Előző',                                    ro: 'Anterioară' },
        photo_prev_2:       { hu: 'KÉP',                                      ro: 'FOTO' },
        photo_next_1:       { hu: 'Következő',                                ro: 'Următoare' },
        photo_next_2:       { hu: 'KÉP',                                      ro: 'FOTO' },

        /* ====== LAKÁSTÍPUSOK ====== */
        plans_title:        { hu: 'Lakástípusok',                             ro: 'Tipuri de apartamente' },
        plan_1_name:        { hu: '1 SZOBÁS LAKÁS',                           ro: 'APARTAMENT CU 1 CAMERĂ' },
        plan_2_name:        { hu: '1 SZOBÁS SAROKLAKÁS',                      ro: 'APARTAMENT COLȚ CU 1 CAMERĂ' },
        plan_3_name:        { hu: '2 SZOBÁS LAKÁS',                           ro: 'APARTAMENT CU 2 CAMERE' },
        plan_4_name:        { hu: '2 SZOBÁS EGYENES SAROK',                   ro: 'APARTAMENT COLȚ DREPT CU 2 CAMERE' },
        plan_5_name:        { hu: '2 SZOBÁS KIBŐVÍTETT SAROK',                ro: 'APARTAMENT COLȚ EXTINS CU 2 CAMERE' },
        plan_6_name:        { hu: '2 SZOBÁS FERDE SAROK',                     ro: 'APARTAMENT COLȚ OBLIC CU 2 CAMERE' },
        plan_7_name:        { hu: '2 SZOBÁS VISSZAHÚZOTT',                    ro: 'APARTAMENT RETRAS CU 2 CAMERE' },
        plan_8_name:        { hu: '2 SZOBÁS VISSZAHÚZOTT SAROK',              ro: 'APARTAMENT COLȚ RETRAS CU 2 CAMERE' },
        plan_9_name:        { hu: '3 SZOBÁS VISSZAHÚZOTT VÉG',               ro: 'APARTAMENT CAPĂT RETRAS CU 3 CAMERE' },
        plan_10_name:       { hu: '3 SZOBÁS VISSZAHÚZOTT SAROK',              ro: 'APARTAMENT COLȚ RETRAS CU 3 CAMERE' },
        lbl_floor:          { hu: 'Emelet',                                   ro: 'Etaj' },
        lbl_room:           { hu: 'Szoba',                                    ro: 'Cameră' },
        lbl_window:         { hu: 'Ablak',                                    ro: 'Ferestre' },
        lbl_area:           { hu: 'Alapterület (m²)',                         ro: 'Suprafață (m²)' },
        lbl_parking:        { hu: 'Parkolás',                                 ro: 'Parcare' },
        lbl_price:          { hu: 'Ár',                                       ro: 'Preț' },
        btn_contact:        { hu: 'Kapcsolat',                                ro: 'Contact' },

        /* ====== FELSZERELTSÉG ====== */
        equip_sub:          { hu: 'Lakás felszereltség',                      ro: 'Dotări apartament' },
        equip_title:        { hu: 'KORSZERŰ MEGOLDÁSOK,<br>ÁTGONDOLT TERVEZÉS', ro: 'SOLUȚII MODERNE,<br>PROIECTARE ATENTĂ' },
        srv_garage:         { hu: 'Mélygarázs',                               ro: 'Garaj subteran' },
        srv_garage_d:       { hu: '92 férőhelyes zárt mélygarázs',            ro: 'Garaj subteran închis cu 92 de locuri' },
        srv_lift:           { hu: 'Lift',                                      ro: 'Lift' },
        srv_lift_d:         { hu: 'Akadálymentes megközelítés',               ro: 'Acces fără bariere' },
        srv_heat:           { hu: 'Padlófűtés',                               ro: 'Încălzire în pardoseală' },
        srv_heat_d:         { hu: 'Energiahatékony fűtési rendszer',          ro: 'Sistem de încălzire eficient energetic' },
        srv_window:         { hu: 'Háromrétegű nyílászárók',                  ro: 'Tâmplărie cu triplu strat' },
        srv_window_d:       { hu: 'Kiváló hő- és hangszigetelés',            ro: 'Izolație termică și fonică excelentă' },
        srv_ev:             { hu: 'EV töltő',                                  ro: 'Stație EV' },
        srv_ev_d:           { hu: 'Elektromos autótöltők a garázsban',        ro: 'Stații de încărcare pentru mașini electrice' },
        srv_green:          { hu: 'Zöldövezetek',                              ro: 'Zone verzi' },
        srv_green_d:        { hu: 'Gondozott parkok és pihenőhelyek',         ro: 'Parcuri îngrijite și zone de relaxare' },

        /* ====== RÓLUNK ====== */
        about_sub:          { hu: 'Rólunk',                                    ro: 'Despre noi' },
        about_title:        { hu: 'EGY ÁTGONDOLT FEJLESZTÉS EREDMÉNYE',       ro: 'REZULTATUL UNEI DEZVOLTĂRI ATENTE' },
        about_p1:           { hu: 'Gyergyószentmiklós egyik dinamikusan fejlődő városrészében épülő lakóparkunk korszerű, energiahatékony otthonokat kínál. Az átgondolt tervezésnek köszönhetően a műszaki megoldások, a világos terek és a természet közelsége harmonikusan egészítik ki egymást.',
                              ro: 'Complexul nostru rezidențial, aflat în construcție într-un cartier în plină dezvoltare din Gheorgheni, oferă locuințe moderne și eficiente energetic. Datorită proiectării atente, soluțiile tehnice, spațiile luminoase și apropierea de natură se completează armonios.' },
        about_p2:           { hu: 'A rendezett zöldfelületek, közösségi sétányok és a város könnyű megközelíthetősége ideális lakókörnyezetet teremtenek — minőségi anyaghasználattal és alacsony fenntartási költségekkel, hosszú távon is.',
                              ro: 'Zonele verzi amenajate, aleile comunitare și accesul facil către oraș creează un mediu de locuit ideal — cu materiale de calitate și costuri reduse de întreținere pe termen lung.' },
        feat_1:             { hu: '92 férőhelyes mélygarázs, biztonságos és kényelmes parkolással',                                       ro: 'Garaj subteran cu 92 de locuri, parcare sigură și confortabilă' },
        feat_2:             { hu: 'Kényelmes lift biztosítja a gyors és egyszerű közlekedést minden szinten',                              ro: 'Lift confortabil pentru acces rapid și ușor la toate nivelurile' },
        feat_3:             { hu: 'Előírásoknak megfelelő tűzvédelmi rendszer, a maximális biztonság érdekében',                           ro: 'Sistem de protecție împotriva incendiilor conform normelor, pentru siguranță maximă' },
        feat_4:             { hu: 'Padlófűtés minden helyiségben, az egyenletes és magas szintű komfortért',                               ro: 'Încălzire în pardoseală în fiecare încăpere, pentru confort uniform și ridicat' },
        feat_5:             { hu: '15 cm vastag kőzetgyapot szigetelés az energiahatékonyságért és az egész éves komfortérzetért',          ro: 'Izolație din vată bazaltică de 15 cm pentru eficiență energetică și confort pe tot parcursul anului' },
        feat_6:             { hu: 'Igényes finiszmunka, ahol a részletek is számítanak',                                                   ro: 'Finisaje de calitate, unde și detaliile contează' },
        feat_7:             { hu: 'Háromrétegű nyílászárók egy korszerű otthonért',                                                        ro: 'Tâmplărie cu triplu strat pentru o locuință modernă' },
        feat_8:             { hu: 'Elektromos autó töltőállomás, a jövő közlekedéséhez igazodva',                                          ro: 'Stație de încărcare pentru mașini electrice, adaptată transportului viitorului' },
        feat_9:             { hu: 'Gondosan kialakított, családbarát zöldövezetek a nyugodt környezetért',                                 ro: 'Zone verzi amenajate cu grijă, prietenoase cu familiile, pentru un mediu liniștit' },
        feat_10:            { hu: 'Korszerű udvari kivilágítás, ami egyszerre praktikus és esztétikus',                                    ro: 'Iluminat exterior modern, deopotrivă practic și estetic' },

        /* ====== ELHELYEZKEDÉS ====== */
        loc_sub:            { hu: 'Elhelyezkedés',                            ro: 'Localizare' },
        loc_title:          { hu: 'GYERGYÓSZENTMIKLÓS EGYIK FEJLŐDŐ VÁROSRÉSZÉBEN', ro: 'ÎNTR-UN CARTIER ÎN DEZVOLTARE DIN GHEORGHENI' },
        hot_1:              { hu: 'ZÖLDÖVEZET',                                ro: 'ZONĂ VERDE' },
        hot_2:              { hu: 'SZÉLES SÉTÁNY',                             ro: 'ALEE LARGĂ' },
        hot_3:              { hu: 'PANORÁMÁS ERKÉLYEK',                        ro: 'BALCOANE PANORAMICE' },
        hot_4:              { hu: 'EV TÖLTŐÁLLOMÁS',                           ro: 'STAȚIE DE ÎNCĂRCARE EV' },

        /* ====== KAPCSOLAT ====== */
        contact_title:      { hu: 'Kapcsolat',                                ro: 'Contact' },
        contact_inquiry:    { hu: 'ÉRDEKLŐDJÖN',                              ro: 'CONTACTAȚI-NE' },
        contact_payment:    { hu: '<strong>Fizetési feltételek:</strong><br>5% előleg<br>25% szerkezetkész állapotban<br>20% gépészeti munkák befejezésekor<br>50% átadáskor',
                              ro: '<strong>Condiții de plată:</strong><br>5% avans<br>25% la stadiul de structură<br>20% la finalizarea instalațiilor<br>50% la predare' },
        form_name:          { hu: 'Neve',                                      ro: 'Numele dvs.' },
        form_email:         { hu: 'E-mail',                                    ro: 'E-mail' },
        form_msg:           { hu: 'Üzenete',                                   ro: 'Mesajul dvs.' },
        form_btn:           { hu: 'Kapcsolat',                                 ro: 'Contact' },

        /* ====== FOOTER ====== */
        footer:             { hu: 'Minden jog fenntartva.',                    ro: 'Toate drepturile rezervate.' },

        /* ====== ANCHOR TITLES ====== */
        anc_intro:          { hu: 'Bemutatkozás',                              ro: 'Prezentare' },
        anc_photo:          { hu: 'Fotótúra',                                  ro: 'Tur foto' },
        anc_plans:          { hu: 'Lakástípusok',                              ro: 'Tipuri de apartamente' },
        anc_equip:          { hu: 'Felszereltség',                             ro: 'Dotări' },
        anc_loc:            { hu: 'Elhelyezkedés',                             ro: 'Localizare' },
        anc_contact:        { hu: 'Kapcsolat',                                 ro: 'Contact' },

        /* ====== 404 OLDAL ====== */
        e404_subtitle:      { hu: 'Az oldal nem található',                    ro: 'Pagina nu a fost găsită' },
        e404_desc:          { hu: 'A keresett oldal nem létezik, vagy áthelyezésre került.<br>Kérjük, térjen vissza a főoldalra.',
                              ro: 'Pagina căutată nu există sau a fost mutată.<br>Vă rugăm să reveniți la pagina principală.' },
        e404_btn:           { hu: 'Vissza a főoldalra',                        ro: 'Înapoi la pagina principală' }
    };

    /* ---------- Fordítás alkalmazása ---------- */
    function applyLang(lang) {
        // data-i18n: innerHTML csere
        document.querySelectorAll('[data-i18n]').forEach(function (el) {
            var key = el.getAttribute('data-i18n');
            if (translations[key] && translations[key][lang] !== undefined) {
                el.innerHTML = translations[key][lang];
            }
        });

        // data-i18n-placeholder: input/textarea placeholder
        document.querySelectorAll('[data-i18n-ph]').forEach(function (el) {
            var key = el.getAttribute('data-i18n-ph');
            if (translations[key] && translations[key][lang] !== undefined) {
                el.placeholder = translations[key][lang];
            }
        });

        // data-i18n-title: anchor title attribútum (pl. sidebar anchor-ök)
        document.querySelectorAll('[data-i18n-title]').forEach(function (el) {
            var key = el.getAttribute('data-i18n-title');
            if (translations[key] && translations[key][lang] !== undefined) {
                el.setAttribute('title', translations[key][lang]);
            }
        });

        // data-i18n-tooltip: hotspot tooltip
        document.querySelectorAll('[data-i18n-tooltip]').forEach(function (el) {
            var key = el.getAttribute('data-i18n-tooltip');
            if (translations[key] && translations[key][lang] !== undefined) {
                el.setAttribute('data-tooltip', translations[key][lang]);
            }
        });

        // html lang attribútum
        document.documentElement.lang = (lang === 'hu') ? 'hu-HU' : 'ro-RO';

        // Gomb frissítése
        var btn = document.getElementById('ev-lang-btn');
        if (btn) {
            var flag = btn.querySelector('.ev-lang-flag');
            var label = btn.querySelector('.ev-lang-label');
            if (flag) flag.src = (lang === 'hu')
                ? 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14/assets/svg/1f1ed-1f1fa.svg'
                : 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14/assets/svg/1f1f7-1f1f4.svg';
            if (label) label.textContent = (lang === 'hu') ? 'HU' : 'RO';
        }

        localStorage.setItem('ev_lang', lang);
    }

    /* ---------- Gomb inject ---------- */
    function createSwitcher() {
        var btn = document.createElement('button');
        btn.id = 'ev-lang-btn';
        btn.setAttribute('aria-label', 'Nyelvváltás / Schimbă limba');
        btn.innerHTML = '<img class="ev-lang-flag" src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14/assets/svg/1f1ed-1f1fa.svg" width="20" height="14" alt="HU"><span class="ev-lang-label">HU</span>';

        btn.addEventListener('click', function () {
            var current = localStorage.getItem('ev_lang') || 'hu';
            var next = (current === 'hu') ? 'ro' : 'hu';
            applyLang(next);
        });

        document.body.appendChild(btn);
    }

    /* ---------- Init ---------- */
    function init() {
        createSwitcher();
        var saved = localStorage.getItem('ev_lang') || 'hu';
        if (saved !== 'hu') {
            applyLang(saved);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
