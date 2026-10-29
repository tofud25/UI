/**
 * ✨ Fancy Mobile UI for SillyTavern
 * Designed specifically for Mobile UX, Glassmorphism, and Ergonomics.
 */

const MODULE_NAME = "st_fancy_mobile_ui";

// Embedded HTML template fallback to guarantee 100% display without missing paths
const SETTINGS_TEMPLATE = `
<div id="fancy_mobile_drawer" class="inline-drawer">
    <div class="inline-drawer-toggle inline-drawer-header st-fancy-header">
        <div class="st-fancy-header-title">
            <span class="st-fancy-badge">PRO</span>
            <b>✨ Fancy Mobile UI</b>
        </div>
        <div class="inline-drawer-icon fa-solid fa-circle-chevron-down down"></div>
    </div>
    <div class="inline-drawer-content st-fancy-panel-content">
        <div class="st-fancy-card">
            <!-- Master Toggle -->
            <div class="st-fancy-row">
                <div class="st-fancy-label-group">
                    <span class="st-fancy-item-title">Kích hoạt Fancy UI</span>
                    <span class="st-fancy-item-desc">Bật giao diện kính mờ và tối ưu hóa cho màn hình điện thoại</span>
                </div>
                <label class="st-fancy-switch">
                    <input id="fancy_ui_enabled" type="checkbox" />
                    <span class="st-fancy-slider"></span>
                </label>
            </div>

            <!-- Theme Preset -->
            <div class="st-fancy-row">
                <div class="st-fancy-label-group">
                    <span class="st-fancy-item-title">Bộ màu chủ đạo (Theme)</span>
                    <span class="st-fancy-item-desc">Chọn phong cách màu sắc hiển thị</span>
                </div>
                <select id="fancy_ui_theme" class="text_pole st-fancy-select">
                    <option value="cyberpunk">🔮 Cyberpunk Violet</option>
                    <option value="oled">🌌 OLED Midnight</option>
                    <option value="emerald">💎 Emerald Matrix</option>
                    <option value="sakura">🌸 Sakura Rose</option>
                </select>
            </div>

            <hr class="st-fancy-divider" />

            <!-- Glassmorphism Blur -->
            <div class="st-fancy-row">
                <div class="st-fancy-label-group">
                    <span class="st-fancy-item-title">Kính mờ cường lực (Glassmorphism)</span>
                    <span class="st-fancy-item-desc">Hiệu ứng làm mờ nền sau khung chat</span>
                </div>
                <label class="st-fancy-switch">
                    <input id="fancy_ui_glass" type="checkbox" />
                    <span class="st-fancy-slider"></span>
                </label>
            </div>

            <!-- Touch Booster for Mobile -->
            <div class="st-fancy-row">
                <div class="st-fancy-label-group">
                    <span class="st-fancy-item-title">Tối ưu nút bấm ngón tay</span>
                    <span class="st-fancy-item-desc">Phóng to các nút sửa, xóa, vuốt (swipe) để dễ bấm trên điện thoại</span>
                </div>
                <label class="st-fancy-switch">
                    <input id="fancy_ui_touch_booster" type="checkbox" />
                    <span class="st-fancy-slider"></span>
                </label>
            </div>

            <!-- Floating Bubbles -->
            <div class="st-fancy-row">
                <div class="st-fancy-label-group">
                    <span class="st-fancy-item-title">Bong bóng chat hiện đại</span>
                    <span class="st-fancy-item-desc">Tách biệt rõ rệt tin nhắn Người dùng & Nhân vật</span>
                </div>
                <label class="st-fancy-switch">
                    <input id="fancy_ui_bubbles" type="checkbox" />
                    <span class="st-fancy-slider"></span>
                </label>
            </div>

            <!-- Quick Floating Button -->
            <div class="st-fancy-row">
                <div class="st-fancy-label-group">
                    <span class="st-fancy-item-title">Nút nổi tiện ích trên màn hình</span>
                    <span class="st-fancy-item-desc">Nút tròn nhỏ góc màn hình giúp đổi theme nhanh</span>
                </div>
                <label class="st-fancy-switch">
                    <input id="fancy_ui_quick_btn" type="checkbox" />
                    <span class="st-fancy-slider"></span>
                </label>
            </div>

            <hr class="st-fancy-divider" />

            <!-- Border Radius Slider -->
            <div class="st-fancy-slider-container">
                <div class="st-fancy-slider-header">
                    <span>Độ bo góc bong bóng (Border Radius):</span>
                    <b id="fancy_ui_radius_val">18px</b>
                </div>
                <input id="fancy_ui_radius" type="range" min="6" max="28" step="1" value="18" class="st-fancy-range" />
            </div>

            <!-- Blur Slider -->
            <div class="st-fancy-slider-container" style="margin-top: 12px;">
                <div class="st-fancy-slider-header">
                    <span>Độ mờ kính (Blur Intensity):</span>
                    <b id="fancy_ui_blur_val">14px</b>
                </div>
                <input id="fancy_ui_blur" type="range" min="0" max="25" step="1" value="14" class="st-fancy-range" />
            </div>

            <div class="st-fancy-footer">
                <span>📱 Thiết kế riêng cho Mobile SillyTavern</span>
            </div>
        </div>
    </div>
</div>
`;

// Default Configurations
const defaultSettings = {
    enabled: true,
    theme: "cyberpunk",
    glass: true,
    touchBooster: true,
    bubbles: true,
    quickButton: true,
    radius: 18,
    blur: 14,
};

let currentSettings = { ...defaultSettings };

/**
 * Get or initialize extension settings from SillyTavern context
 */
function getSettings() {
    try {
        if (typeof SillyTavern !== "undefined" && SillyTavern.getContext) {
            const context = SillyTavern.getContext();
            if (context && context.extensionSettings) {
                if (!context.extensionSettings[MODULE_NAME]) {
                    context.extensionSettings[MODULE_NAME] = { ...defaultSettings };
                }
                return context.extensionSettings[MODULE_NAME];
            }
        }
    } catch (e) {
        console.warn("[Fancy Mobile UI] Could not access SillyTavern context settings, using local memory.", e);
    }
    return currentSettings;
}

/**
 * Save settings to SillyTavern persistent storage
 */
function saveSettings() {
    try {
        if (typeof SillyTavern !== "undefined" && SillyTavern.getContext) {
            const context = SillyTavern.getContext();
            if (context && typeof context.saveSettingsDebounced === "function") {
                context.saveSettingsDebounced();
                return;
            }
        }
        localStorage.setItem(`ST_${MODULE_NAME}`, JSON.stringify(currentSettings));
    } catch (e) {
        console.error("[Fancy Mobile UI] Error saving settings:", e);
    }
}

/**
 * Apply styling classes and CSS variables directly to the document
 */
function applyStyles() {
    const s = currentSettings;
    const body = $("body");

    // Remove existing theme classes
    body.removeClass("st-theme-cyberpunk st-theme-oled st-theme-emerald st-theme-sakura");

    if (!s.enabled) {
        body.removeClass("st-fancy-mobile-enabled st-glass-active st-touch-boosted st-bubbles-active");
        $("#st_fancy_quick_pill").hide();
        $("#st_fancy_quick_modal").hide();
        return;
    }

    // Enable Fancy Mobile UI
    body.addClass("st-fancy-mobile-enabled");
    body.addClass(`st-theme-${s.theme || "cyberpunk"}`);

    body.toggleClass("st-glass-active", !!s.glass);
    body.toggleClass("st-touch-boosted", !!s.touchBooster);
    body.toggleClass("st-bubbles-active", !!s.bubbles);

    // Dynamic CSS Variables
    document.documentElement.style.setProperty("--st-fancy-radius", `${s.radius || 18}px`);
    document.documentElement.style.setProperty("--st-fancy-blur", `${s.blur || 14}px`);

    // Floating Quick Button
    if (s.quickButton) {
        createOrShowQuickButton();
    } else {
        $("#st_fancy_quick_pill").hide();
        $("#st_fancy_quick_modal").hide();
    }
}

/**
 * Create or toggle floating mobile quick action pill
 */
function createOrShowQuickButton() {
    if ($("#st_fancy_quick_pill").length === 0) {
        const pill = $(`
            <div id="st_fancy_quick_pill" title="Fancy Mobile Quick Menu">
                <i class="fa-solid fa-wand-magic-sparkles"></i>
            </div>
            <div id="st_fancy_quick_modal">
                <div style="font-weight: 700; color: #cbd5e1; font-size: 0.85rem; margin-bottom: 4px; display: flex; justify-content: space-between; align-items: center;">
                    <span>✨ Đổi Theme Nhanh</span>
                    <i id="st_fancy_close_quick" class="fa-solid fa-xmark" style="cursor: pointer; padding: 4px;"></i>
                </div>
                <div class="st-quick-theme-btn" data-theme="cyberpunk">🔮 Cyberpunk</div>
                <div class="st-quick-theme-btn" data-theme="oled">🌌 OLED Midnight</div>
                <div class="st-quick-theme-btn" data-theme="emerald">💎 Emerald</div>
                <div class="st-quick-theme-btn" data-theme="sakura">🌸 Sakura</div>
            </div>
        `);

        $("body").append(pill);

        // Click on floating button toggles modal
        $("#st_fancy_quick_pill").on("click", function (e) {
            e.stopPropagation();
            $("#st_fancy_quick_modal").fadeToggle(180).css("display", "flex");
        });

        // Close button
        $("#st_fancy_close_quick").on("click", function (e) {
            e.stopPropagation();
            $("#st_fancy_quick_modal").fadeOut(150);
        });

        // Quick theme switch
        $(".st-quick-theme-btn").on("click", function () {
            const theme = $(this).data("theme");
            currentSettings.theme = theme;
            $("#fancy_ui_theme").val(theme);
            saveSettings();
            applyStyles();
            if (typeof toastr !== "undefined") {
                toastr.success(`Đã đổi theme: ${theme.toUpperCase()}`);
            }
            $("#st_fancy_quick_modal").fadeOut(150);
        });

        // Close on clicking outside
        $(document).on("click", function (e) {
            if (!$(e.target).closest("#st_fancy_quick_modal, #st_fancy_quick_pill").length) {
                $("#st_fancy_quick_modal").fadeOut(150);
            }
        });
    } else {
        $("#st_fancy_quick_pill").show();
    }
}

/**
 * Bind DOM events to the settings panel controls
 */
function bindSettingsEvents() {
    const s = currentSettings;

    // Set initial values on UI
    $("#fancy_ui_enabled").prop("checked", s.enabled);
    $("#fancy_ui_theme").val(s.theme);
    $("#fancy_ui_glass").prop("checked", s.glass);
    $("#fancy_ui_touch_booster").prop("checked", s.touchBooster);
    $("#fancy_ui_bubbles").prop("checked", s.bubbles);
    $("#fancy_ui_quick_btn").prop("checked", s.quickButton);

    $("#fancy_ui_radius").val(s.radius);
    $("#fancy_ui_radius_val").text(`${s.radius}px`);

    $("#fancy_ui_blur").val(s.blur);
    $("#fancy_ui_blur_val").text(`${s.blur}px`);

    // Master Toggle
    $("#fancy_ui_enabled").off("change").on("change", function () {
        s.enabled = $(this).prop("checked");
        saveSettings();
        applyStyles();
        if (typeof toastr !== "undefined") {
            toastr.info(`Fancy Mobile UI: ${s.enabled ? "BẬT" : "TẮT"}`);
        }
    });

    // Theme selector
    $("#fancy_ui_theme").off("change").on("change", function () {
        s.theme = $(this).val();
        saveSettings();
        applyStyles();
    });

    // Glass toggle
    $("#fancy_ui_glass").off("change").on("change", function () {
        s.glass = $(this).prop("checked");
        saveSettings();
        applyStyles();
    });

    // Touch booster toggle
    $("#fancy_ui_touch_booster").off("change").on("change", function () {
        s.touchBooster = $(this).prop("checked");
        saveSettings();
        applyStyles();
    });

    // Bubbles toggle
    $("#fancy_ui_bubbles").off("change").on("change", function () {
        s.bubbles = $(this).prop("checked");
        saveSettings();
        applyStyles();
    });

    // Quick Button toggle
    $("#fancy_ui_quick_btn").off("change").on("change", function () {
        s.quickButton = $(this).prop("checked");
        saveSettings();
        applyStyles();
    });

    // Radius slider
    $("#fancy_ui_radius").off("input").on("input", function () {
        const val = $(this).val();
        s.radius = Number(val);
        $("#fancy_ui_radius_val").text(`${val}px`);
        saveSettings();
        applyStyles();
    });

    // Blur slider
    $("#fancy_ui_blur").off("input").on("input", function () {
        const val = $(this).val();
        s.blur = Number(val);
        $("#fancy_ui_blur_val").text(`${val}px`);
        saveSettings();
        applyStyles();
    });

    // Accordion expand/collapse click handler
    $("#fancy_mobile_drawer .inline-drawer-toggle").off("click.fancy_toggle").on("click.fancy_toggle", function () {
        const content = $(this).closest("#fancy_mobile_drawer").find(".inline-drawer-content");
        content.slideToggle(200);
        $(this).find(".inline-drawer-icon").toggleClass("down up");
    });
}

/**
 * Inject the settings UI into SillyTavern's extensions drawer
 * Ensures it NEVER gets hidden or missed due to async loading
 */
async function injectSettings() {
    if ($("#fancy_mobile_drawer").length > 0) {
        return; // Already present in DOM
    }

    const container = $("#extensions_settings");
    if (container.length === 0) {
        return false; // Not ready yet
    }

    let html = SETTINGS_TEMPLATE;

    // Attempt to load settings.html from server file if available
    try {
        const res = await fetch("/scripts/extensions/third-party/st-fancy-mobile-ui/settings.html");
        if (res.ok) {
            const fetchedText = await res.text();
            if (fetchedText && fetchedText.includes("fancy_mobile_drawer")) {
                html = fetchedText;
            }
        }
    } catch (_) {
        // Safe fallback to embedded template
    }

    container.append(html);
    bindSettingsEvents();
    return true;
}

/**
 * Extension Startup Entry Point
 */
jQuery(async () => {
    console.log("[Fancy Mobile UI] Đang khởi động extension...");

    // 1. Load settings
    currentSettings = getSettings();

    // 2. Apply styling immediately
    applyStyles();

    // 3. Reliable injector loop for SillyTavern Extensions Drawer
    let attempts = 0;
    const interval = setInterval(async () => {
        attempts++;
        const injected = await injectSettings();
        if (injected || attempts > 25) {
            clearInterval(interval);
            if (injected) {
                console.log("[Fancy Mobile UI] Giao diện cài đặt đã hiển thị thành công trong Extension Menu!");
            }
        }
    }, 400);

    // 4. Also listen to extension button clicks to guarantee presence
    $(document).on("click", "#extensions_button, [data-panel='extensions']", async () => {
        setTimeout(async () => {
            await injectSettings();
        }, 150);
    });

    console.log("[Fancy Mobile UI] Khởi tạo hoàn tất!");
});
