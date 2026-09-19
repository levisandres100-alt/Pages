<<<<<<< HEAD
document.addEventListener("DOMContentLoaded", function () {
    const sidebarContainer = document.getElementById("sidebar-container");
    if (!sidebarContainer) return;

    // 1. Inyección de Estilos CSS del Sidebar
    const style = document.createElement("style");
    style.innerHTML = `
        .btn-sidebar-toggle {
            position: fixed;
            top: 15px;
            left: 15px;
            width: auto;
            z-index: 999;
            background-color: var(--primary, #ffd711);
            color: white;
            border: none;
            font-size: 22px;
            padding: 8px 14px;
            border-radius: 8px;
            cursor: pointer;
            box-shadow: 0 4px 10px rgba(0,0,0,0.25);
            transition: transform 0.2s ease;
        }
        .btn-sidebar-toggle:hover {
            transform: scale(1.05);
        }

        .sidebar-overlay {
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.5);
            z-index: 1000;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s ease, visibility 0.3s ease;
        }
        .sidebar-overlay.active {
            opacity: 1;
            visibility: visible;
        }

        .sidebar-panel {
            position: fixed;
            top: 0;
            left: -300px;
            width: 280px;
            height: 100%;
            background-color: var(--bg-sidebar, #ffffff);
            color: var(--text-sidebar, #333333);
            z-index: 1001;
            box-shadow: 4px 0 15px rgba(0,0,0,0.3);
            transition: left 0.3s ease;
            display: flex;
            flex-direction: column;
        }
        .sidebar-panel.active {
            left: 0;
        }

        .sidebar-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 18px 20px;
            border-bottom: 1px solid rgba(0,0,0,0.1);
        }
        .sidebar-header h3 { margin: 0; font-size: 20px; }
        
        #btn-close-sidebar {
            font-size: 22px !important;
            width: 40px !important;
            height: 40px !important;
            line-height: 1 !important;
            box-sizing: border-box !important;
            background: transparent !important;
            color: currentColor !important; 
            opacity: 0.8;
            cursor: pointer;
            border: none;
            transition: opacity 0.2s ease;
        }
        #btn-close-sidebar:hover { opacity: 1; }

        .sidebar-content { padding: 20px; overflow-y: auto; }
        .sidebar-section h4 { margin-top: 0; font-size: 14px; text-transform: uppercase; color: #888; letter-spacing: 1px; }
        .sidebar-menu { list-style: none; padding: 0; margin: 15px 0; }
        .sidebar-menu li { margin-bottom: 12px; }
        .sidebar-menu a {
            text-decoration: none;
            color: inherit;
            font-weight: bold;
            font-size: 15px;
            display: block;
            padding: 8px 10px;
            border-radius: 6px;
            transition: background 0.2s;
        }
        .sidebar-menu a:hover { background: rgba(0,0,0,0.06); }
        .sidebar-divider { border: none; border-top: 1px solid rgba(0,0,0,0.1); margin: 20px 0; }

        .btn-sidebar-call {
            display: block;
            width: 100%;
            background-color: #007bff;
            color: white;
            border: none;
            padding: 10px;
            border-radius: 6px;
            font-weight: bold;
            font-size: 14px;
            cursor: pointer;
            margin-bottom: 8px;
            text-align: center;
        }
        .btn-sidebar-map {
            display: block;
            width: 100%;
            background-color: #6c757d;
            color: white;
            border: none;
            padding: 10px;
            border-radius: 6px;
            font-weight: bold;
            font-size: 14px;
            cursor: pointer;
            text-align: center;
        }

        .theme-subtitle { font-size: 13px; color: #666; margin-bottom: 10px; }
        .theme-buttons { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
        .btn-theme {
            border: none;
            padding: 10px;
            border-radius: 6px;
            font-weight: bold;
            cursor: pointer;
            font-size: 13px;
            transition: opacity 0.2s;
        }
        .btn-theme:hover { opacity: 0.85; }
        .theme-light { background-color: #f4f6f8; color: #333; border: 1px solid #ccc; }
        .theme-dark { background-color: #1e1e1e; color: #fff; }
        .theme-coffee { background-color: #4a2822; color: #d7ccc8; }
        .theme-blue { background-color: #5073a9; color: #e3f2fd; }

        /* TEMAS ACTIVOS */
        html.theme-dark, html.theme-dark body {
            background-color: #121212 !important;
            color: #e0e0e0 !important;
            --bg-sidebar: #1e1e1e;
            --text-sidebar: #ffffff;
        }
        html.theme-coffee, html.theme-coffee body {
            background-color: #2b1b17 !important;
            color: #d7ccc8 !important;
            --bg-sidebar: #3e2723;
            --text-sidebar: #efebe9;
        }
        html.theme-blue, html.theme-blue body {
            background-color: #5073a9 !important;
            color: #e6f1ff !important;
            --bg-sidebar: #5073a9;
            --text-sidebar: #ffffff;
        }
    `;
    document.head.appendChild(style);

    // 2. Inyección del HTML del Menú
    sidebarContainer.innerHTML = `
        <!-- Botón flotante para abrir -->
        <button id="btn-open-sidebar" class="btn-sidebar-toggle" title="Menú de opciones">☰</button>

        <!-- Fondo Oscuro Overlay -->
        <div id="sidebar-overlay" class="sidebar-overlay"></div>

        <!-- Panel Lateral -->
        <aside id="sidebar-panel" class="sidebar-panel">
            <div class="sidebar-header">
                <h3>Menú</h3>
                <button id="btn-close-sidebar" class="btn-close">&times;</button>
            </div>

            <div class="sidebar-content">
                <!-- Navegación General -->
                <div class="sidebar-section">
                    <h4>Navegación</h4>
                    <ul class="sidebar-menu">
                        <li><a href="index.html">🏠 Inicio / Todos</a></li>
                    </ul>
                </div>

                <hr class="sidebar-divider">

                <!-- Carros -->
                <div class="sidebar-section">
                    <h4>🚗 Repuestos para Carro</h4>
                    <ul class="sidebar-menu">
                        <li><a href="categorias.html">📋 Categorías Carro</a></li>
                        <li><a href="aceitesylubricantes.html">🛢️ Aceites y Lubricantes</a></li>
                        <li><a href="sistemasdefrenos.html">🛞 Sistemas de Frenos</a></li>
                        <li><a href="motorydistribuicion.html">🏎️ Motor y Distribución</a></li>
                        <li><a href="suspensionyshocks.html">🚗 Suspensión y Shocks</a></li>
                        <li><a href="baterias.html">🔋 Baterías</a></li>
                    </ul>
                </div>

                <hr class="sidebar-divider">

                <!-- Motos -->
                <div class="sidebar-section">
                    <h4>🏍️ Repuestos para Moto</h4>
                    <ul class="sidebar-menu">
                        <li><a href="categoriasm.html">📋 Categorías Moto</a></li>
                        <li><a href="aceitesylubricantesm.html">🛢️ Aceites y Lubricantes</a></li>
                        <li><a href="sistemasdefrenosm.html">🛞 Sistemas de Frenos</a></li>
                        <li><a href="motorydistribuicionm.html">🏎️ Motor y Distribución</a></li>
                        <li><a href="suspensionyshocksm.html">🏍️ Suspensión y Shocks</a></li>
                        <li><a href="bateriasm.html">🔋 Baterías</a></li>
                    </ul>
                </div>

                <hr class="sidebar-divider">

                <!-- Atención y Ubicación -->
                <div class="sidebar-section">
                    <h4>¿NECESITÁS AYUDA?</h4>
                    <p class="theme-subtitle">¿No encuentras tu repuesto o quieres visitarnos?</p>
                    <a href="tel:+50231841198" style="text-decoration: none;">
                        <button type="button" class="btn-sidebar-call">📞 Llamar a Asesor</button>
                    </a>
                    <a href="https://maps.app.goo.gl/cy93vYPB3iuKFvLx8" target="_blank" rel="noopener noreferrer" style="text-decoration: none;">
                        <button type="button" class="btn-sidebar-map">📍 Nos Ubicamos</button>
                    </a>
                </div>

                <hr class="sidebar-divider">

                <!-- Apariencia -->
                <div class="sidebar-section">
                    <h4>Apariencia</h4>
                    <p class="theme-subtitle">Seleccioná un tema:</p>
                    <div class="theme-buttons">
                        <button class="btn-theme theme-light" onclick="setTheme('light')">☀️ Claro</button>
                        <button class="btn-theme theme-dark" onclick="setTheme('dark')">🌙 Oscuro</button>
                        <button class="btn-theme theme-coffee" onclick="setTheme('coffee')">☕ Café</button>
                        <button class="btn-theme theme-blue" onclick="setTheme('blue')">🌊 Azul</button>
                    </div>
                </div>
            </div>
        </aside>
    `;

    // 3. Eventos del Menú
    const openBtn = document.getElementById("btn-open-sidebar");
    const closeBtn = document.getElementById("btn-close-sidebar");
    const sidebar = document.getElementById("sidebar-panel");
    const overlay = document.getElementById("sidebar-overlay");

    openBtn.addEventListener("click", () => {
        sidebar.classList.add("active");
        overlay.classList.add("active");
    });

    function closeSidebar() {
        sidebar.classList.remove("active");
        overlay.classList.remove("active");
    }

    closeBtn.addEventListener("click", closeSidebar);
    overlay.addEventListener("click", closeSidebar);
});

// Función global para cambiar temas
function setTheme(themeName) {
    document.documentElement.classList.remove("theme-dark", "theme-coffee", "theme-blue");
    if (themeName !== "light") {
        document.documentElement.classList.add("theme-" + themeName);
    }
    localStorage.setItem("selectedTheme", themeName);
=======
document.addEventListener("DOMContentLoaded", function () {
    const sidebarContainer = document.getElementById("sidebar-container");
    if (!sidebarContainer) return;

    // 1. Inyección de Estilos CSS del Sidebar
    const style = document.createElement("style");
    style.innerHTML = `
        .btn-sidebar-toggle {
            position: fixed;
            top: 15px;
            left: 15px;
            width: auto;
            z-index: 999;
            background-color: var(--primary, #ffd711);
            color: white;
            border: none;
            font-size: 22px;
            padding: 8px 14px;
            border-radius: 8px;
            cursor: pointer;
            box-shadow: 0 4px 10px rgba(0,0,0,0.25);
            transition: transform 0.2s ease;
        }
        .btn-sidebar-toggle:hover {
            transform: scale(1.05);
        }

        .sidebar-overlay {
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.5);
            z-index: 1000;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s ease, visibility 0.3s ease;
        }
        .sidebar-overlay.active {
            opacity: 1;
            visibility: visible;
        }

        .sidebar-panel {
            position: fixed;
            top: 0;
            left: -300px;
            width: 280px;
            height: 100%;
            background-color: var(--bg-sidebar, #ffffff);
            color: var(--text-sidebar, #333333);
            z-index: 1001;
            box-shadow: 4px 0 15px rgba(0,0,0,0.3);
            transition: left 0.3s ease;
            display: flex;
            flex-direction: column;
        }
        .sidebar-panel.active {
            left: 0;
        }

        .sidebar-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 18px 20px;
            border-bottom: 1px solid rgba(0,0,0,0.1);
        }
        .sidebar-header h3 { margin: 0; font-size: 20px; }
        
        #btn-close-sidebar {
            font-size: 22px !important;
            width: 40px !important;
            height: 40px !important;
            line-height: 1 !important;
            box-sizing: border-box !important;
            background: transparent !important;
            color: currentColor !important; 
            opacity: 0.8;
            cursor: pointer;
            border: none;
            transition: opacity 0.2s ease;
        }
        #btn-close-sidebar:hover { opacity: 1; }

        .sidebar-content { padding: 20px; overflow-y: auto; }
        .sidebar-section h4 { margin-top: 0; font-size: 14px; text-transform: uppercase; color: #888; letter-spacing: 1px; }
        .sidebar-menu { list-style: none; padding: 0; margin: 15px 0; }
        .sidebar-menu li { margin-bottom: 12px; }
        .sidebar-menu a {
            text-decoration: none;
            color: inherit;
            font-weight: bold;
            font-size: 15px;
            display: block;
            padding: 8px 10px;
            border-radius: 6px;
            transition: background 0.2s;
        }
        .sidebar-menu a:hover { background: rgba(0,0,0,0.06); }
        .sidebar-divider { border: none; border-top: 1px solid rgba(0,0,0,0.1); margin: 20px 0; }

        .btn-sidebar-call {
            display: block;
            width: 100%;
            background-color: #007bff;
            color: white;
            border: none;
            padding: 10px;
            border-radius: 6px;
            font-weight: bold;
            font-size: 14px;
            cursor: pointer;
            margin-bottom: 8px;
            text-align: center;
        }
        .btn-sidebar-map {
            display: block;
            width: 100%;
            background-color: #6c757d;
            color: white;
            border: none;
            padding: 10px;
            border-radius: 6px;
            font-weight: bold;
            font-size: 14px;
            cursor: pointer;
            text-align: center;
        }

        .theme-subtitle { font-size: 13px; color: #666; margin-bottom: 10px; }
        .theme-buttons { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
        .btn-theme {
            border: none;
            padding: 10px;
            border-radius: 6px;
            font-weight: bold;
            cursor: pointer;
            font-size: 13px;
            transition: opacity 0.2s;
        }
        .btn-theme:hover { opacity: 0.85; }
        .theme-light { background-color: #f4f6f8; color: #333; border: 1px solid #ccc; }
        .theme-dark { background-color: #1e1e1e; color: #fff; }
        .theme-coffee { background-color: #4a2822; color: #d7ccc8; }
        .theme-blue { background-color: #5073a9; color: #e3f2fd; }

        /* TEMAS ACTIVOS */
        html.theme-dark, html.theme-dark body {
            background-color: #121212 !important;
            color: #e0e0e0 !important;
            --bg-sidebar: #1e1e1e;
            --text-sidebar: #ffffff;
        }
        html.theme-coffee, html.theme-coffee body {
            background-color: #2b1b17 !important;
            color: #d7ccc8 !important;
            --bg-sidebar: #3e2723;
            --text-sidebar: #efebe9;
        }
        html.theme-blue, html.theme-blue body {
            background-color: #5073a9 !important;
            color: #e6f1ff !important;
            --bg-sidebar: #5073a9;
            --text-sidebar: #ffffff;
        }
    `;
    document.head.appendChild(style);

    // 2. Inyección del HTML del Menú
    sidebarContainer.innerHTML = `
        <!-- Botón flotante para abrir -->
        <button id="btn-open-sidebar" class="btn-sidebar-toggle" title="Menú de opciones">☰</button>

        <!-- Fondo Oscuro Overlay -->
        <div id="sidebar-overlay" class="sidebar-overlay"></div>

        <!-- Panel Lateral -->
        <aside id="sidebar-panel" class="sidebar-panel">
            <div class="sidebar-header">
                <h3>Menú</h3>
                <button id="btn-close-sidebar" class="btn-close">&times;</button>
            </div>

            <div class="sidebar-content">
                <!-- Navegación General -->
                <div class="sidebar-section">
                    <h4>Navegación</h4>
                    <ul class="sidebar-menu">
                        <li><a href="index.html">🏠 Inicio / Todos</a></li>
                    </ul>
                </div>

                <hr class="sidebar-divider">

                <!-- Carros -->
                <div class="sidebar-section">
                    <h4>🚗 Repuestos para Carro</h4>
                    <ul class="sidebar-menu">
                        <li><a href="categorias.html">📋 Categorías Carro</a></li>
                        <li><a href="aceitesylubricantes.html">🛢️ Aceites y Lubricantes</a></li>
                        <li><a href="sistemasdefrenos.html">🛞 Sistemas de Frenos</a></li>
                        <li><a href="motorydistribuicion.html">🏎️ Motor y Distribución</a></li>
                        <li><a href="suspensionyshocks.html">🚗 Suspensión y Shocks</a></li>
                        <li><a href="baterias.html">🔋 Baterías</a></li>
                    </ul>
                </div>

                <hr class="sidebar-divider">

                <!-- Motos -->
                <div class="sidebar-section">
                    <h4>🏍️ Repuestos para Moto</h4>
                    <ul class="sidebar-menu">
                        <li><a href="categoriasm.html">📋 Categorías Moto</a></li>
                        <li><a href="aceitesylubricantesm.html">🛢️ Aceites y Lubricantes</a></li>
                        <li><a href="sistemasdefrenosm.html">🛞 Sistemas de Frenos</a></li>
                        <li><a href="motorydistribuicionm.html">🏎️ Motor y Distribución</a></li>
                        <li><a href="suspensionyshocksm.html">🏍️ Suspensión y Shocks</a></li>
                        <li><a href="bateriasm.html">🔋 Baterías</a></li>
                    </ul>
                </div>

                <hr class="sidebar-divider">

                <!-- Atención y Ubicación -->
                <div class="sidebar-section">
                    <h4>¿NECESITÁS AYUDA?</h4>
                    <p class="theme-subtitle">¿No encuentras tu repuesto o quieres visitarnos?</p>
                    <a href="tel:+50231841198" style="text-decoration: none;">
                        <button type="button" class="btn-sidebar-call">📞 Llamar a Asesor</button>
                    </a>
                    <a href="https://maps.app.goo.gl/cy93vYPB3iuKFvLx8" target="_blank" rel="noopener noreferrer" style="text-decoration: none;">
                        <button type="button" class="btn-sidebar-map">📍 Nos Ubicamos</button>
                    </a>
                </div>

                <hr class="sidebar-divider">

                <!-- Apariencia -->
                <div class="sidebar-section">
                    <h4>Apariencia</h4>
                    <p class="theme-subtitle">Seleccioná un tema:</p>
                    <div class="theme-buttons">
                        <button class="btn-theme theme-light" onclick="setTheme('light')">☀️ Claro</button>
                        <button class="btn-theme theme-dark" onclick="setTheme('dark')">🌙 Oscuro</button>
                        <button class="btn-theme theme-coffee" onclick="setTheme('coffee')">☕ Café</button>
                        <button class="btn-theme theme-blue" onclick="setTheme('blue')">🌊 Azul</button>
                    </div>
                </div>
            </div>
        </aside>
    `;

    // 3. Eventos del Menú
    const openBtn = document.getElementById("btn-open-sidebar");
    const closeBtn = document.getElementById("btn-close-sidebar");
    const sidebar = document.getElementById("sidebar-panel");
    const overlay = document.getElementById("sidebar-overlay");

    openBtn.addEventListener("click", () => {
        sidebar.classList.add("active");
        overlay.classList.add("active");
    });

    function closeSidebar() {
        sidebar.classList.remove("active");
        overlay.classList.remove("active");
    }

    closeBtn.addEventListener("click", closeSidebar);
    overlay.addEventListener("click", closeSidebar);
});

// Función global para cambiar temas
function setTheme(themeName) {
    document.documentElement.classList.remove("theme-dark", "theme-coffee", "theme-blue");
    if (themeName !== "light") {
        document.documentElement.classList.add("theme-" + themeName);
    }
    localStorage.setItem("selectedTheme", themeName);
>>>>>>> 73715bd2cba1b649e6c188c698aaa7080ed5766e
}