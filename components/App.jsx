"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import {
  LayoutDashboard, Users, Briefcase, Receipt, Sparkles, Camera,
  MonitorPlay, Plus, Pencil, Trash2, X, Search, ChevronLeft, ChevronRight,
  Download, Upload, CheckCircle2, Building2, Phone, Mail, Printer,
  Eye, EyeOff, Lock, ArrowLeft, Wallet, FileText, Mic, Film,
  PenTool, History, Save, UserCheck, Video, Megaphone, ClipboardList,
  Crown, Star, KeyRound, ShieldCheck, ListChecks, Percent, LogOut,
  QrCode, Circle, CircleDot, Menu, ChevronDown, Instagram, Youtube,
  Twitter, MessageCircle, Play, ArrowUpLeft, ExternalLink, Send,
  Image as ImageIcon, Type, Square, Settings, Link2,
} from "lucide-react";

// ════════════════════════════════════════════════════════════════
// HELPERS
// ════════════════════════════════════════════════════════════════
const nv = v => Number(v) || 0;
const fmtSAR = v => nv(v).toLocaleString("en-US", { maximumFractionDigits: 0 }) + " ر.س";
const fmtNum = v => nv(v).toLocaleString("en-US", { maximumFractionDigits: 0 });
let _c = 0;
const uid = () => `id_${Date.now()}_${++_c}`;
const nowISO = () => new Date().toISOString().slice(0, 10);
const nowTS = () => new Date().toISOString();
const MO_AR = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];
const fmtD = iso => { if (!iso) return "—"; const d = new Date(iso); if (isNaN(d)) return "—"; return `${d.getDate()} ${MO_AR[d.getMonth()]} ${d.getFullYear()}`; };
const pct = (a, b) => b > 0 ? Math.min(100, (a / b) * 100) : 0;
const initials = name => (name || "").trim().split(/\s+/).slice(0, 2).map(w => w[0]).join("");

// ════════════════════════════════════════════════════════════════
// BRAND — logo extracted from the agency's own profile document
// ════════════════════════════════════════════════════════════════
const LOGO_SRC = "data:image/png;base64,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";

// ════════════════════════════════════════════════════════════════
// REFERENCE DATA — taken directly from وكالة لكنة's profile (services,
// equipment, software, team structure, and real partner roster)
// ════════════════════════════════════════════════════════════════
const TEAM_ROLES = [
  { id: "content", label: "كاتب محتوى", icon: FileText, target: 9 },
  { id: "photo", label: "مصور", icon: Camera, target: 8 },
  { id: "voice", label: "معلق صوتي", icon: Mic, target: 16 },
  { id: "video", label: "ممنتج فيديو", icon: Film, target: 14 },
  { id: "motion", label: "مصمم موشن جرافيك", icon: Sparkles, target: 13 },
  { id: "graphic", label: "مصمم جرافيك ديزاين", icon: PenTool, target: 19 },
  { id: "mgmt", label: "إدارة وتسويق", icon: Briefcase, target: 0 },
  // Real-world roles found on the agency's physical ID cards — tracked
  // alongside the official structure above, no fixed quota (target: 0).
  { id: "videographer", label: "فني تصوير فيديو", icon: Video, target: 0 },
  { id: "media", label: "إعلامي", icon: Megaphone, target: 0 },
  { id: "coordinator", label: "منسق إنتاج", icon: ClipboardList, target: 0 },
  { id: "writer", label: "كاتب", icon: FileText, target: 0 },
  { id: "exec", label: "الرئيس التنفيذي", icon: Crown, target: 0 },
];
const ROLE_TARGET_TOTAL = TEAM_ROLES.reduce((s, r) => s + r.target, 0);
const roleLabel = id => TEAM_ROLES.find(r => r.id === id)?.label || id;
const roleIcon = id => TEAM_ROLES.find(r => r.id === id)?.icon || Briefcase;

const SECTORS = ["طبي", "حكومي", "مقاولات وإنشاءات", "تجاري وصناعي", "رياضي واجتماعي", "زراعي وبيئي"];
const SECTOR_COLOR = {
  "طبي": "#6FB6C9", "حكومي": "#C9A876", "مقاولات وإنشاءات": "#E0A857",
  "تجاري وصناعي": "#4FBE93", "رياضي واجتماعي": "#E2716A", "زراعي وبيئي": "#8FBF6F",
};

const CLIENT_STATUSES = {
  partner: { label: "شريك حالي", color: "#4FBE93" },
  lead: { label: "عميل محتمل", color: "#E0A857" },
  past: { label: "عميل سابق", color: "#6E938A" },
};

const EMP_STATUSES = {
  active: { label: "نشط", color: "#4FBE93" },
  leave: { label: "إجازة", color: "#E0A857" },
  past: { label: "سابق", color: "#6E938A" },
};

const PROJECT_STATUSES = {
  quote: { label: "عرض سعر", color: "#6FB6C9" },
  active: { label: "قيد التنفيذ", color: "#E0A857" },
  completed: { label: "مكتمل", color: "#4FBE93" },
  onhold: { label: "متوقف", color: "#6E938A" },
  cancelled: { label: "ملغي", color: "#E2716A" },
};

const INVOICE_STATUSES = {
  pending: { label: "غير محصَّل", color: "#E2716A" },
  partial: { label: "تحصيل جزئي", color: "#E0A857" },
  paid: { label: "محصَّل بالكامل", color: "#4FBE93" },
};

const EQUIP_STATUSES = {
  "ممتاز": "#4FBE93", "جيد": "#6FB6C9", "يحتاج صيانة": "#E0A857", "خارج الخدمة": "#E2716A",
};

const PAY_METHODS = ["تحويل بنكي", "شيك", "نقدًا", "أخرى"];

// Real services offered, paraphrased from the agency's own profile
const SEED_SERVICES = [
  { name: "مونتاج وتحرير الفيديو", cat: "فيديو", desc: "تحرير فيديو احترافي وإنتاج فيديوهات تسويقية عالية الجودة" },
  { name: "الموشن جرافيك", cat: "فيديو", desc: "تحويل الأفكار إلى رسوم متحركة مبتكرة لرسائل تسويقية فعّالة" },
  { name: "تصميم الجرافيك", cat: "تصميم", desc: "هويات بصرية جذابة ومواد تسويقية متكاملة وكافة أنواع التصاميم" },
  { name: "التصوير الفوتوغرافي والجوي", cat: "تصوير", desc: "تصوير للمناسبات والأحداث، تصوير تجاري وعقاري، وتصوير جوي بالدرون" },
  { name: "التعليق الصوتي", cat: "صوت", desc: "تعليقات صوتية احترافية جذابة ومناسبة لجمهورك المستهدف" },
  { name: "كتابة المحتوى", cat: "محتوى", desc: "محتوى مكتوب جذاب ومقنع للمواقع ومنصات التواصل الاجتماعي" },
  { name: "تصميم الهوية التجارية", cat: "تصميم", desc: "هوية تجارية احترافية تتوافق مع نشاط العميل وسوق العمل" },
  { name: "تنظيم الفعاليات والمناسبات", cat: "فعاليات", desc: "تخطيط وتنفيذ الفعاليات من تحديد الأهداف وحتى التقرير الختامي" },
  { name: "الدروع التذكارية والهدايا الترويجية", cat: "تصنيع", desc: "دروع تذكارية وهدايا ترويجية بتقنيات CNC ليزر وروتر وطباعة UV" },
  { name: "الطباعة الداخلية والخارجية", cat: "طباعة", desc: "طباعة أستيكر وبنرات وكانفس، رول أب وبوب أب وحوائط شعارات" },
].map(s => ({ id: uid(), ...s, basePrice: 0, notes: "" }));

// Real equipment roster, paraphrased from the agency's own profile
const SEED_EQUIPMENT = [
  { name: "كاميرات Canon احترافية", cat: "تصوير", brand: "Canon", desc: "مجموعة واسعة من كاميرات التصوير الاحترافية" },
  { name: "كاميرات Sony احترافية", cat: "تصوير", brand: "Sony", desc: "مجموعة واسعة من كاميرات التصوير الاحترافية" },
  { name: "طائرات درون للتصوير الجوي", cat: "تصوير", brand: "—", desc: "طائرات درون متطورة لالتقاط اللقطات الجوية" },
  { name: "مايكروفونات مكثفة", cat: "صوت", brand: "RODE", desc: "مايكروفونات مكثفة عالية الجودة" },
  { name: "مايكروفونات شوتجان سينمائية", cat: "صوت", brand: "—", desc: "مايكروفونات شوتجان للتصوير السينمائي" },
  { name: "ميكسر صوت احترافي", cat: "صوت", brand: "—", desc: "لضبط الصوت بدقة احترافية" },
  { name: "مكينة ليزر CNC", cat: "تصنيع", brand: "—", desc: "قص وحفر على الأكريليك والخشب والجلديات" },
  { name: "مكينة روتر CNC", cat: "تصنيع", brand: "—", desc: "قص وتشكيل الخشب والحفر عليه" },
  { name: "مكينة طباعة يوفي UV", cat: "طباعة", brand: "—", desc: "طباعة بارزة فاخرة للهدايا الترويجية" },
  { name: "مكينة طباعة داخلية", cat: "طباعة", brand: "—", desc: "طباعة وقص الأستيكر بجودة عالية" },
  { name: "مكينة طباعة خارجية", cat: "طباعة", brand: "—", desc: "طباعة بنر وكانفس لمختلف الأنشطة" },
].map(e => ({ id: uid(), ...e, qty: 0, status: "جيد", notes: "" }));

const SOFTWARE_GROUPS = [
  { cat: "برامج صناعة الفيديو", items: ["Premiere Pro", "After Effects", "Wondershare Filmora", "DaVinci Resolve"] },
  { cat: "البرامج الصوتية", items: ["Avid Pro Tools", "Adobe Audition"] },
  { cat: "برامج الجرافيك ديزاين", items: ["Adobe Illustrator", "Adobe Photoshop"] },
  { cat: "برامج الرسم والتصميم", items: ["CorelDRAW", "برنامج رسم هندسي (CAD)"] },
  { cat: "برامج الرسم ثلاثي الأبعاد", items: ["SketchUp"] },
];

// Real partner / client roster — exactly as listed in the agency's profile.
// Contact details are intentionally left blank for the team to fill in.
const SEED_CLIENTS = [
  { name: "مجمع الوطني الطبي", sector: "طبي" },
  { name: "صندوق التنمية الزراعية", sector: "حكومي" },
  { name: "مجمع جمالي حائل الطبي", sector: "طبي" },
  { name: "مجموعة التخصيص الطبي", sector: "طبي" },
  { name: "مجمع زين الطبي", sector: "طبي" },
  { name: "أمانة منطقة حائل", sector: "حكومي" },
  { name: "نادي الطائي", sector: "رياضي واجتماعي" },
  { name: "المستشفى السعودي الألماني", sector: "طبي" },
  { name: "شركة مون للخرسانة", sector: "مقاولات وإنشاءات" },
  { name: "شركة جولدن ماكس", sector: "مقاولات وإنشاءات" },
  { name: "مجمع بانوراما الطبي", sector: "طبي" },
  { name: "النيابة العامة بمدينة حائل", sector: "حكومي" },
  { name: "شركة مياه دسمان", sector: "تجاري وصناعي" },
  { name: "صيدلية زاد الدوائية", sector: "طبي" },
  { name: "ساكورا", sector: "تجاري وصناعي" },
  { name: "شركة الحبشي للمقاولات", sector: "مقاولات وإنشاءات" },
  { name: "الشركة المتقدمة للمقاولات العامة والصيانة", sector: "مقاولات وإنشاءات" },
  { name: "مجموعة الإجتياز للمقاولات", sector: "مقاولات وإنشاءات" },
  { name: "شركة عبر الشمال للمقاولات", sector: "مقاولات وإنشاءات" },
  { name: "شركة بلو للمقاولات", sector: "مقاولات وإنشاءات" },
  { name: "مؤسسة الطخيم", sector: "مقاولات وإنشاءات" },
  { name: "جيوشيلد Geoshield", sector: "مقاولات وإنشاءات" },
  { name: "مؤسسة ركن صمام الأمان", sector: "مقاولات وإنشاءات" },
  { name: "عشب الشمال", sector: "زراعي وبيئي" },
].map(c => ({
  id: uid(), name: c.name, sector: c.sector, status: "partner",
  contactPerson: "", phone: "", email: "", since: "", notes: "",
}));

// ════════════════════════════════════════════════════════════════
// STORAGE
// ════════════════════════════════════════════════════════════════
// ════════════════════════════════════════════════════════════════
// PERMISSIONS — sections an account can be granted access to
// ════════════════════════════════════════════════════════════════
const PERMISSION_SECTIONS = [
  { id: "dashboard", label: "لوحة التحكم" },
  { id: "clients", label: "العملاء" },
  { id: "projects", label: "المشاريع" },
  { id: "team", label: "الفريق" },
  { id: "invoices", label: "الفواتير والتحصيل" },
  { id: "services", label: "الخدمات" },
  { id: "equipment", label: "المعدات" },
  { id: "software", label: "البرامج" },
];
// Sensible default access per role — the coordinator can override per person.
const FIELD_ROLE_DEFAULTS = { dashboard: false, clients: false, projects: true, team: false, invoices: false, services: true, equipment: true, software: true };
const OFFICE_ROLE_DEFAULTS = { dashboard: true, clients: true, projects: true, team: true, invoices: true, services: true, equipment: true, software: true };
const OFFICE_ROLES = ["mgmt", "coordinator", "exec"];
function defaultPermissionsForRole(roleId) {
  return { ...(OFFICE_ROLES.includes(roleId) ? OFFICE_ROLE_DEFAULTS : FIELD_ROLE_DEFAULTS) };
}
const slugify = s => (s || "").toLowerCase().replace(/[^a-z0-9]+/g, ".").replace(/^\.+|\.+$/g, "");

const TASK_STATUSES = {
  todo: { label: "لم يبدأ", color: "#6E938A" },
  doing: { label: "قيد التنفيذ", color: "#E0A857" },
  done: { label: "مكتمل", color: "#4FBE93" },
};

function generateInvoiceNumber(invoices) {
  const year = new Date().getFullYear();
  const thisYear = invoices.filter(i => (i.number || "").includes(`LKN-${year}-`));
  const seq = thisYear.length + 1;
  return `LKN-${year}-${String(seq).padStart(4, "0")}`;
}

// ════════════════════════════════════════════════════════════════
// REAL TEAM ROSTER — extracted from the agency's physical ID cards.
// Card numbers are the badge IDs printed under each photo; left blank
// where the card image didn't expose a printed number. Usernames are
// auto-slugged from the English name on the card; default PIN is the
// last 4 digits of the card number (placeholder — change before use).
// ════════════════════════════════════════════════════════════════
const RAW_CARD_ROSTER = [
  { name: "عيد ساير عوده الشمري", en: "Eid Sayer Odeh Al-Shammari", role: "videographer", cardId: "391931" },
  { name: "عوض سعود المشهور", en: "Awad Saud Al-Mashhour", role: "photo", cardId: "351638" },
  { name: "مالك عبدالله المشوح", en: "Malik Abdullah Al Mashouh", role: "photo", cardId: "188678" },
  { name: "صالح عوده الشمري", en: "Salah Odeh Al-Shammari", role: "photo", cardId: "603133" },
  { name: "سعود غدير عتيق الشمري", en: "Saud Ghadeer Ateeq Al-Shammari", role: "photo", cardId: "165819", notes: "مصور فوتوغرافي ومصور جوي" },
  { name: "عبدالله سيد علي", en: "Abdullah Sayed Ali", role: "coordinator", cardId: "" },
  { name: "معزي مبحل السويدي", en: "Moazi Mubhal Al Suwaidi", role: "photo", cardId: "313045" },
  { name: "خلف طنا السويدي الشمري", en: "Khalaf Tana Al-Suwaidi Al-Shammari", role: "photo", cardId: "" },
  { name: "عادل فهد عوده الشمري", en: "Adel Fahd Odeh Al-Shammari", role: "writer", cardId: "451538" },
  { name: "الوليد خالد الرضيمان", en: "Al-Waleed Khaled Al-Radiman", role: "exec", cardId: "", notes: "يحمل أيضاً بطاقة إعلامي" },
  { name: "زيد دبيان زيد الشمري", en: "Zaid Dubyan Zaid Al Shamri", role: "photo", cardId: "800587" },
  { name: "عبدالعزيز حماد الشمري", en: "Abdul Aziz Hamad Al Shammari", role: "media", cardId: "" },
  { name: "سميحه العيد", en: "Samiha Al-Eid", role: "media", cardId: "" },
  { name: "فوزية الحسيني", en: "Fawzia Al-Hussaini", role: "media", cardId: "" },
  { name: "وفاء الغدير", en: "Wafaa Al-Ghadeer", role: "photo", cardId: "" },
  { name: "افراح صالح الفداغي", en: "Afrah Salah Al-Fadaghi", role: "photo", cardId: "" },
  { name: "اثير الصعب", en: "Athir Al-Saeb", role: "photo", cardId: "" },
  { name: "حنان ناصر التميمي", en: "Hanan Nasser Al-Tamimi", role: "photo", cardId: "" },
  { name: "محمد متولي", en: "Mohamed Metwally", role: "photo", cardId: "" },
  { name: "نوف سالم السويداء", en: "Nouf Salem Al-Suwayda", role: "media", cardId: "891418" },
  { name: "فهد ضايف الشمري", en: "Fahd Dhaif Al Shamri", role: "media", cardId: "" },
];
const SEED_EMPLOYEES = RAW_CARD_ROSTER.map(p => {
  const username = slugify(p.en);
  const pin = p.cardId ? p.cardId.slice(-4) : "0000";
  return {
    id: uid(), name: p.name, nameEn: p.en, role: p.role, cardId: p.cardId || "",
    phone: "", email: "", joinDate: "", status: "active", monthlyRate: "",
    rating: 0, notes: p.notes || "",
    username, pin, permissions: defaultPermissionsForRole(p.role),
  };
});

const MASTER_KEY = "laknah_v1_master";

// ── Vercel KV helpers ──────────────────────────────────────────
async function kvGet(key) {
  try {
    const r = await fetch(`/api/kv?key=${encodeURIComponent(key)}`);
    const d = await r.json();
    return d.value ?? null;
  } catch { return null; }
}
async function kvSet(key, value) {
  try {
    await fetch("/api/kv", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key, value }),
    });
    return true;
  } catch { return false; }
}
// ───────────────────────────────────────────────────────────────

async function loadAll() {
  try {
    const val = await kvGet(MASTER_KEY);
    if (val) return typeof val === "string" ? JSON.parse(val) : val;
  } catch (e) {}
  return null;
}
async function saveAll(data) {
  try {
    await kvSet(MASTER_KEY, JSON.stringify({ ...data, _savedAt: nowTS() }));
    return true;
  } catch (e) { return false; }
}

// Print helper — registered by <PrintPreview/>
let _printHtmlSetter = null;
const printHTML = html => { if (_printHtmlSetter) _printHtmlSetter(html); };

// ════════════════════════════════════════════════════════════════
// GLOBAL STYLES — palette & marks drawn from the agency's own brand
// ════════════════════════════════════════════════════════════════
function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Baloo+Bhaijaan+2:wght@500;600;700;800&family=Cairo:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
      :root{
        --bg:#0A1E1C; --bg2:#102B27; --bg3:#081715; --border:#1E433D; --border-l:#2C5B52;
        --gold:#C9A876; --gold-br:#E0C293; --text:#ECE3D2; --muted:#6E938A; --dim:#3D5C56;
        --success:#4FBE93; --warning:#E0A857; --danger:#E2716A; --info:#6FB6C9;
      }
      *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
      ::-webkit-scrollbar{width:5px;height:5px}
      ::-webkit-scrollbar-track{background:var(--bg3)}
      ::-webkit-scrollbar-thumb{background:var(--gold);border-radius:3px}
      input,select,textarea,button{font-family:'Cairo',sans-serif}
      .disp{font-family:'Baloo Bhaijaan 2',sans-serif}
      .inp{border:1px solid var(--border);border-radius:7px;padding:9px 12px;font-size:14px;width:100%;background:var(--bg3);color:var(--text);outline:none;direction:rtl;transition:border .15s}
      .inp:focus{border-color:var(--gold)}
      .inp::placeholder{color:var(--dim)}
      .sel{border:1px solid var(--border);border-radius:7px;padding:9px 12px;font-size:14px;width:100%;background:var(--bg3);color:var(--text);outline:none;cursor:pointer}
      .sel:focus{border-color:var(--gold)}
      .lbl{font-size:12px;font-weight:700;color:var(--muted);margin-bottom:5px;letter-spacing:.02em}
      .card{background:var(--bg2);border:1px solid var(--border);border-radius:12px;padding:18px;margin-bottom:14px}
      .card-title{font-weight:700;font-size:15px;color:var(--text);margin-bottom:14px;display:flex;align-items:center;gap:8px}
      .btn{border:none;border-radius:8px;cursor:pointer;font-weight:700;font-size:13px;padding:9px 18px;display:inline-flex;align-items:center;gap:6px;transition:all .15s;white-space:nowrap;font-family:'Cairo',sans-serif}
      .btn-gold{background:var(--gold);color:#0A1E1C}
      .btn-gold:hover{background:var(--gold-br);transform:translateY(-1px)}
      .btn-navy{background:var(--border);color:var(--text)}
      .btn-navy:hover{background:var(--border-l)}
      .btn-ghost{background:transparent;color:var(--muted);border:1px solid var(--border)}
      .btn-ghost:hover{border-color:var(--muted);color:var(--text)}
      .btn-danger{background:rgba(226,113,106,.15);color:var(--danger);border:1px solid rgba(226,113,106,.3)}
      .btn-danger:hover{background:rgba(226,113,106,.25)}
      .btn-success{background:rgba(79,190,147,.15);color:var(--success);border:1px solid rgba(79,190,147,.3)}
      .btn-success:hover{background:rgba(79,190,147,.25)}
      .btn-sm{font-size:12px;padding:6px 12px}
      .btn:disabled{opacity:.45;cursor:not-allowed;transform:none!important}
      .badge{padding:3px 11px;border-radius:20px;font-size:11px;font-weight:700;white-space:nowrap}
      .prog-bar{height:6px;background:var(--border);border-radius:3px;overflow:hidden}
      .prog-fill{height:100%;border-radius:3px;background:linear-gradient(90deg,var(--border-l),var(--gold));transition:width .6s ease}
      .ov{position:fixed;inset:0;background:rgba(4,12,11,.75);display:flex;align-items:center;justify-content:center;z-index:999;backdrop-filter:blur(6px)}
      .mod{background:var(--bg2);border:1px solid var(--gold);border-radius:14px;width:640px;max-width:96vw;max-height:90vh;display:flex;flex-direction:column;overflow:hidden;box-shadow:0 30px 70px rgba(0,0,0,.5)}
      .mod-h{padding:16px 22px;background:var(--bg3);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between}
      .mod-title{font-family:'Baloo Bhaijaan 2',sans-serif;font-size:1.3rem;color:var(--gold);font-weight:700}
      .mod-body{flex:1;overflow-y:auto;padding:22px}
      .mod-foot{padding:14px 22px;border-top:1px solid var(--border);display:flex;gap:8px;justify-content:flex-end}
      .tab-pill{padding:7px 16px;border:1px solid var(--border);border-radius:7px;background:transparent;color:var(--muted);font-size:13px;cursor:pointer;font-weight:600;font-family:'Cairo',sans-serif;transition:all .15s}
      .tab-pill.on{background:var(--border);color:var(--gold);border-color:var(--gold)}
      .page-pad{padding:26px 28px}
      .page-title{font-family:'Baloo Bhaijaan 2',sans-serif;font-size:1.9rem;color:var(--text);margin-bottom:2px;font-weight:700}
      .page-sub{font-size:13px;color:var(--muted);margin-bottom:6px}
      .sig-head{display:flex;align-items:center;gap:10px;margin-bottom:18px}
      .sig-head .sig-txt{font-family:'Baloo Bhaijaan 2',sans-serif;font-size:1rem;color:var(--gold);font-weight:700;white-space:nowrap}
      .sig-dot{width:7px;height:7px;border-radius:50%;background:var(--gold);flex-shrink:0}
      .sig-line{flex:1;height:1px;background:linear-gradient(90deg,var(--border-l),transparent)}
      table{width:100%;border-collapse:collapse}
      th{padding:11px 12px;text-align:right;font-weight:700;background:var(--bg3);color:var(--muted);font-size:11.5px;letter-spacing:.03em;border-bottom:1px solid var(--border)}
      td{padding:11px 12px;font-size:13px;border-bottom:1px solid rgba(30,67,61,.6);color:#C9DAD4}
      tr:hover td{background:rgba(201,168,118,.04)}
      .mono{font-family:'IBM Plex Mono',monospace}
      .gold{color:var(--gold)}
      .green{color:var(--success)}
      .red{color:var(--danger)}
      .muted{color:var(--muted)}
      .toast{position:fixed;bottom:1.5rem;left:1.5rem;background:var(--bg2);border-right:3px solid var(--success);padding:13px 18px;font-size:14px;z-index:2000;max-width:320px;animation:toastIn .3s ease;line-height:1.6;color:var(--text);border-radius:9px;box-shadow:0 10px 28px rgba(0,0,0,.45)}
      .toast.warn{border-right-color:var(--danger)}
      @keyframes toastIn{from{transform:translateY(12px);opacity:0}to{transform:translateY(0);opacity:1}}
      .kpi-card{background:var(--bg2);border:1px solid var(--border);border-radius:12px;padding:16px;position:relative;overflow:hidden}
      .kpi-top{position:absolute;top:0;left:0;right:0;height:3px}
      .kpi-label{font-size:12px;color:var(--muted);margin-bottom:5px}
      .kpi-value{font-family:'Baloo Bhaijaan 2',sans-serif;font-size:1.7rem;line-height:1}
      .kpi-sub{font-size:11px;color:var(--dim);margin-top:5px}
      .frow{display:flex;flex-direction:column;gap:12px}
      .fgroup{display:flex;flex-direction:column}
      .save-indicator{display:flex;align-items:center;gap:6px;font-size:12px}
      .save-dot{width:7px;height:7px;border-radius:50%}
      @keyframes pulse{0%,100%{opacity:1}50%{opacity:.25}}
      .chip{padding:6px 13px;border-radius:20px;border:1px solid var(--border);background:var(--bg3);color:var(--muted);font-size:12.5px;cursor:pointer;font-weight:600;transition:all .15s;display:inline-flex;align-items:center;gap:5px}
      .chip.on{background:rgba(201,168,118,.15);border-color:var(--gold);color:var(--gold)}
      .row-card{background:var(--bg2);border:1px solid var(--border);border-radius:11px;padding:14px 16px;display:flex;align-items:center;gap:13px;margin-bottom:9px;cursor:pointer;transition:border-color .15s}
      .row-card:hover{border-color:var(--gold)}
      .avatar{width:42px;height:42px;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-weight:700;font-size:14px;background:rgba(201,168,118,.12);color:var(--gold)}
      @media print{
        .no-print{display:none!important}
        body{background:#fff!important;direction:rtl}
        .print-doc{background:#fff!important;color:#000!important;padding:0!important}
        @page{size:A4;margin:15mm}
      }
    `}</style>
  );
}

// ════════════════════════════════════════════════════════════════
// SPLASH
// ════════════════════════════════════════════════════════════════
function Splash() {
  return (
    <div style={{ minHeight: "100vh", background: "#0A1E1C", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "18px" }}>
      <img src={LOGO_SRC} alt="" style={{ height: 92, opacity: .92 }} />
      <div style={{ fontSize: "13px", color: "#3D5C56", letterSpacing: ".1em", fontFamily: "'Cairo',sans-serif" }}>جاري تحميل بياناتك...</div>
      <div style={{ width: 180, height: 3, background: "#1E433D", borderRadius: 2, overflow: "hidden" }}>
        <div style={{ height: "100%", background: "#C9A876", borderRadius: 2, animation: "loadBar 1.5s ease-in-out infinite", width: "60%" }} />
      </div>
      <style>{`@keyframes loadBar{0%{transform:translateX(100%)}100%{transform:translateX(-300%)}}`}</style>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// LOGIN SCREEN
// ════════════════════════════════════════════════════════════════
const CREDENTIALS = { username: "laknah", password: "Laknah@2026" };

function LoginScreen({ employees, onAuth }) {
  const [mode, setMode] = useState("admin"); // admin | employee
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [locked, setLocked] = useState(false);

  const fail = msg => {
    const n = attempts + 1; setAttempts(n);
    if (n >= 5) { setLocked(true); setError("تم قفل النظام بعد 5 محاولات فاشلة. أعد تحميل الصفحة للمحاولة مجدداً."); }
    else setError(`${msg} (${n}/5)`);
    setPass(""); setPin("");
  };

  const handleLogin = () => {
    if (locked) return;
    if (mode === "admin") {
      if (user === CREDENTIALS.username && pass === CREDENTIALS.password) onAuth({ type: "admin" });
      else fail("اسم المستخدم أو كلمة المرور غير صحيحة.");
    } else {
      const emp = (employees || []).find(e => e.username && e.username.toLowerCase() === user.trim().toLowerCase());
      if (emp && emp.pin && emp.pin === pin.trim()) onAuth({ type: "employee", employeeId: emp.id });
      else fail("اسم المستخدم أو الرمز السري غير صحيح.");
    }
  };

  const inputStyle = { border: `1px solid ${error ? "#E2716A" : "#1E433D"}`, borderRadius: "8px", padding: "10px 14px", fontSize: "14px", width: "100%", background: "#081715", color: "#ECE3D2", outline: "none", fontFamily: "'Cairo',sans-serif", direction: "ltr" };

  return (
    <div style={{ minHeight: "100vh", background: "#0A1E1C", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Cairo',sans-serif", direction: "rtl", position: "relative", overflow: "hidden" }}>
      <img src={LOGO_SRC} alt="" style={{ position: "absolute", height: "150vh", opacity: .035, left: "-12%", top: "-15%", pointerEvents: "none" }} />
      <div style={{ background: "#102B27", border: "1px solid #C9A876", borderRadius: "16px", padding: "36px 40px", width: 380, boxShadow: "0 28px 70px rgba(0,0,0,.55)", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <img src={LOGO_SRC} alt="لكنة" style={{ height: 70, margin: "0 auto 8px" }} />
          <div style={{ fontSize: "12px", color: "#6E938A", marginTop: "8px" }}>نظام إدارة الوكالة المتكامل</div>
        </div>

        <div style={{ display: "flex", gap: "6px", marginBottom: "18px", background: "#081715", borderRadius: "9px", padding: "4px" }}>
          {[["admin", "حساب المنسق الرئيسي"], ["employee", "حساب موظف"]].map(([m, l]) => (
            <button key={m} onClick={() => { setMode(m); setError(""); setUser(""); setPass(""); setPin(""); }}
              style={{ flex: 1, padding: "9px 6px", borderRadius: "7px", border: "none", cursor: "pointer", fontSize: "12.5px", fontWeight: 700, fontFamily: "'Cairo',sans-serif", background: mode === m ? "#C9A876" : "transparent", color: mode === m ? "#0A1E1C" : "#6E938A", transition: "all .15s" }}>
              {l}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div>
            <div style={{ fontSize: "12px", fontWeight: 700, color: "#6E938A", marginBottom: "5px" }}>اسم المستخدم</div>
            <input style={inputStyle} value={user} onChange={e => { setUser(e.target.value); setError(""); }}
              placeholder={mode === "admin" ? "laknah" : "username"} onKeyDown={e => e.key === "Enter" && handleLogin()} disabled={locked} />
          </div>
          {mode === "admin" ? (
            <div>
              <div style={{ fontSize: "12px", fontWeight: 700, color: "#6E938A", marginBottom: "5px" }}>كلمة المرور</div>
              <div style={{ position: "relative" }}>
                <input type={showPass ? "text" : "password"} style={{ ...inputStyle, padding: "10px 42px 10px 14px" }}
                  value={pass} onChange={e => { setPass(e.target.value); setError(""); }}
                  placeholder="••••••••" onKeyDown={e => e.key === "Enter" && handleLogin()} disabled={locked} />
                <button onClick={() => setShowPass(!showPass)} style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#6E938A", display: "flex" }}>
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div style={{ fontSize: "12px", fontWeight: 700, color: "#6E938A", marginBottom: "5px" }}>الرمز السري (PIN)</div>
              <input type="password" inputMode="numeric" style={inputStyle} value={pin} onChange={e => { setPin(e.target.value); setError(""); }}
                placeholder="••••" onKeyDown={e => e.key === "Enter" && handleLogin()} disabled={locked} />
            </div>
          )}
          {error && <div style={{ background: "rgba(226,113,106,.1)", border: "1px solid rgba(226,113,106,.3)", borderRadius: "7px", padding: "9px 12px", fontSize: "12.5px", color: "#E2716A", textAlign: "center", lineHeight: 1.6 }}>{error}</div>}
          <button onClick={handleLogin} disabled={locked || !user || (mode === "admin" ? !pass : !pin)}
            style={{ background: locked ? "#1E433D" : "#C9A876", color: locked ? "#6E938A" : "#0A1E1C", border: "none", borderRadius: "9px", padding: "12px", fontSize: "15px", fontWeight: 700, cursor: locked ? "not-allowed" : "pointer", fontFamily: "'Cairo',sans-serif", marginTop: "4px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
            {locked ? <><Lock size={15} /> النظام مقفل</> : <>دخول <ArrowLeft size={15} /></>}
          </button>
        </div>
        <div style={{ textAlign: "center", marginTop: "20px", fontSize: "11px", color: "#2A4541" }}>وكالة لكنة © {new Date().getFullYear()}</div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// SHARED: ConfirmModal / ModalShell / PrintPreview
// ════════════════════════════════════════════════════════════════
function ConfirmModal({ ctx }) {
  const { modal, setModal } = ctx;
  if (modal?.type !== "confirm") return null;
  const { message, onConfirm, danger } = modal;
  return (
    <div className="ov" onClick={() => setModal(null)}>
      <div className="mod" style={{ width: 380 }} onClick={e => e.stopPropagation()}>
        <div className="mod-h">
          <div className="mod-title" style={{ color: danger ? "#E2716A" : "#ECE3D2" }}>{danger ? "تأكيد الحذف" : "تأكيد"}</div>
          <button onClick={() => setModal(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "#6E938A" }}><X size={20} /></button>
        </div>
        <div className="mod-body"><div style={{ fontSize: "14px", color: "#C9DAD4", lineHeight: 1.7 }}>{message}</div></div>
        <div className="mod-foot">
          <button className="btn btn-ghost" onClick={() => setModal(null)}>إلغاء</button>
          <button className={danger ? "btn btn-danger" : "btn btn-gold"} onClick={() => { onConfirm(); setModal(null); }}>
            {danger ? <><Trash2 size={14} /> حذف</> : "تأكيد"}
          </button>
        </div>
      </div>
    </div>
  );
}

function ModalShell({ title, sub, icon: Icon, onClose, children, footer, wide }) {
  return (
    <div className="ov" onClick={onClose}>
      <div className="mod" style={wide ? { width: 760 } : {}} onClick={e => e.stopPropagation()}>
        <div className="mod-h">
          <div>
            <div className="mod-title" style={{ display: "flex", alignItems: "center", gap: "8px" }}>{Icon && <Icon size={18} />} {title}</div>
            {sub && <div style={{ fontSize: "12px", color: "#6E938A", marginTop: "3px" }}>{sub}</div>}
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#6E938A" }}><X size={20} /></button>
        </div>
        <div className="mod-body">{children}</div>
        {footer && <div className="mod-foot">{footer}</div>}
      </div>
    </div>
  );
}

function PrintPreview() {
  const [html, setHtml] = useState(null);
  useEffect(() => { _printHtmlSetter = setHtml; return () => { _printHtmlSetter = null; }; }, []);
  if (!html) return null;
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  const headMatch = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
  const bodyContent = bodyMatch ? bodyMatch[1] : html;
  const headStyles = (headMatch ? headMatch[1] : "").replace(/<link[^>]*>/gi, "").replace(/<meta[^>]*>/gi, "");
  const doOpenPrint = () => {
    const full = '<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8">' + (headMatch ? headMatch[1] : "") + '<style>@page{size:A4;margin:12mm}body{-webkit-print-color-adjust:exact;print-color-adjust:exact}</style></head><body>' + bodyContent + "</body></html>";
    try {
      const blob = new Blob([full], { type: "text/html;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const w = window.open(url, "_blank", "width=960,height=720");
      if (w) { w.onload = () => { w.focus(); w.print(); }; setTimeout(() => URL.revokeObjectURL(url), 15000); return; }
      URL.revokeObjectURL(url);
    } catch (e) {}
    const w2 = window.open("", "_blank", "width=960,height=720");
    if (w2) { w2.document.open(); w2.document.write(full); w2.document.close(); setTimeout(() => { w2.focus(); w2.print(); }, 400); }
    else alert("يرجى السماح بالنوافذ المنبثقة ثم أعد المحاولة");
  };
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999, background: "#0A1E1C", display: "flex", flexDirection: "column", fontFamily: "'Cairo',sans-serif", direction: "rtl" }}>
      <div style={{ display: "flex", gap: "10px", padding: "12px 20px", background: "#081715", borderBottom: "2px solid #C9A876", alignItems: "center", flexShrink: 0 }}>
        <span style={{ color: "#C9A876", fontWeight: 800, fontSize: "15px", display: "flex", alignItems: "center", gap: "7px" }}><Printer size={16} /> معاينة الطباعة</span>
        <div style={{ flex: 1 }} />
        <button onClick={doOpenPrint} style={{ background: "#C9A876", color: "#0A1E1C", border: "none", borderRadius: "8px", padding: "9px 26px", fontWeight: 800, cursor: "pointer", fontSize: "14px" }}>طباعة / حفظ PDF</button>
        <button onClick={() => setHtml(null)} style={{ background: "#E2716A", color: "#fff", border: "none", borderRadius: "8px", padding: "9px 18px", cursor: "pointer", fontSize: "14px", fontWeight: 700 }}>إغلاق</button>
      </div>
      <div style={{ flex: 1, overflow: "auto", background: "#1c2624", padding: "24px" }}>
        <div style={{ background: "#fff", maxWidth: 960, margin: "0 auto", borderRadius: 8, boxShadow: "0 4px 32px rgba(0,0,0,.4)", padding: "32px 40px" }}>
          <style dangerouslySetInnerHTML={{ __html: headStyles }} />
          <div dangerouslySetInnerHTML={{ __html: bodyContent }} />
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// APP ROOT
// ════════════════════════════════════════════════════════════════
function EmployeeSystem({ onAuthChange } = {}) {
  const [ready, setReady] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [initData, setInitData] = useState(null);

  useEffect(() => {
    (async () => {
      try { const val = await kvGet(MASTER_KEY); if (val) setInitData(typeof val === "string" ? JSON.parse(val) : val); } catch {}
      setReady(true);
    })();
  }, []);

  // يبلّغ التطبيق الأب فقط بحالة الدخول (لا يغيّر منطق النظام الداخلي نفسه)
  useEffect(() => { onAuthChange?.(currentUser); }, [currentUser]);

  if (!ready) return <Splash />;
  if (!currentUser) return <LoginScreen employees={initData?.employees?.length ? initData.employees : SEED_EMPLOYEES} onAuth={setCurrentUser} />;
  return <MainApp initData={initData} currentUser={currentUser} onLogout={() => setCurrentUser(null)} />;
}

function MainApp({ initData, currentUser, onLogout }) {
  const [saveState, setSaveState] = useState("saved");
  const [toast, setToast] = useState(null);
  const [modal, setModal] = useState(null);
  const isAdmin = currentUser?.type === "admin";
  const [view, setView] = useState(isAdmin ? "dashboard" : "member-profile");
  const [activeClientId, setActiveClientId] = useState(null);
  const [activeProjectId, setActiveProjectId] = useState(null);
  const [activeEmployeeId, setActiveEmployeeId] = useState(isAdmin ? null : currentUser?.employeeId || null);

  const [clients, setClients] = useState(() => initData?.clients?.length ? initData.clients : SEED_CLIENTS);
  const [employees, setEmployees] = useState(() => initData?.employees?.length ? initData.employees : SEED_EMPLOYEES);
  const [projects, setProjects] = useState(() => initData?.projects || []);
  const [services, setServices] = useState(() => initData?.services?.length ? initData.services : SEED_SERVICES);
  const [equipment, setEquipment] = useState(() => initData?.equipment?.length ? initData.equipment : SEED_EQUIPMENT);
  const [invoices, setInvoices] = useState(() => initData?.invoices || []);
  const [payments, setPayments] = useState(() => initData?.payments || []);
  const [tasks, setTasks] = useState(() => initData?.tasks || []);
  const [auditLog, setAuditLog] = useState(() => initData?.auditLog || []);

  const me = isAdmin ? null : employees.find(e => e.id === currentUser?.employeeId) || null;
  const can = section => isAdmin || !!(me?.permissions && me.permissions[section]);

  const saveTimer = useRef(null);
  const dataRef = useRef({});
  useEffect(() => { dataRef.current = { clients, employees, projects, services, equipment, invoices, payments, tasks, auditLog }; });

  const triggerSave = useCallback(() => {
    setSaveState("saving");
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(async () => {
      const ok = await saveAll(dataRef.current);
      setSaveState(ok ? "saved" : "error");
    }, 400);
  }, []);
  useEffect(() => { triggerSave(); }, [clients, employees, projects, services, equipment, invoices, payments, tasks, auditLog]);

  const audit = useCallback((action, detail) => {
    setAuditLog(prev => [{ id: uid(), action, detail, ts: nowTS() }, ...prev].slice(0, 500));
  }, []);
  const notify = (msg, type = "ok") => { setToast({ msg, type }); setTimeout(() => setToast(null), 3500); };
  const askConfirm = (message, onConfirm, danger = true) => setModal({ type: "confirm", message, onConfirm, danger });

  // ── CLIENTS ──────────────────────────────────────────────────
  const addClient = d => { const c = { ...d, id: uid(), createdAt: nowTS() }; setClients(p => [...p, c]); audit("ADD_CLIENT", c.name); notify("تم إضافة العميل"); };
  const updateClient = (id, d) => { setClients(p => p.map(c => c.id === id ? { ...c, ...d } : c)); audit("EDIT_CLIENT", id); notify("تم تعديل بيانات العميل"); };
  const deleteClient = id => { setClients(p => p.filter(c => c.id !== id)); audit("DEL_CLIENT", id); notify("تم حذف العميل"); };

  // ── EMPLOYEES ────────────────────────────────────────────────
  const addEmployee = d => { const e = { ...d, id: uid(), createdAt: nowTS() }; setEmployees(p => [...p, e]); audit("ADD_EMPLOYEE", e.name); notify("تم إضافة الموظف"); };
  const updateEmployee = (id, d) => { setEmployees(p => p.map(e => e.id === id ? { ...e, ...d } : e)); audit("EDIT_EMPLOYEE", id); notify("تم تعديل بيانات الموظف"); };
  const deleteEmployee = id => { setEmployees(p => p.filter(e => e.id !== id)); audit("DEL_EMPLOYEE", id); notify("تم حذف الموظف"); };

  // ── PROJECTS ─────────────────────────────────────────────────
  const addProject = d => { const p2 = { ...d, id: uid(), createdAt: nowTS() }; setProjects(p => [...p, p2]); audit("ADD_PROJECT", p2.name); notify("تم إضافة المشروع"); return p2.id; };
  const updateProject = (id, d) => { setProjects(p => p.map(x => x.id === id ? { ...x, ...d } : x)); audit("EDIT_PROJECT", id); notify("تم تعديل المشروع"); };
  const deleteProject = id => { setProjects(p => p.filter(x => x.id !== id)); audit("DEL_PROJECT", id); notify("تم حذف المشروع"); };

  // ── SERVICES ─────────────────────────────────────────────────
  const addService = d => { const s = { ...d, id: uid() }; setServices(p => [...p, s]); audit("ADD_SERVICE", s.name); notify("تم إضافة الخدمة"); };
  const updateService = (id, d) => { setServices(p => p.map(s => s.id === id ? { ...s, ...d } : s)); audit("EDIT_SERVICE", id); notify("تم تعديل الخدمة"); };
  const deleteService = id => { setServices(p => p.filter(s => s.id !== id)); audit("DEL_SERVICE", id); notify("تم حذف الخدمة"); };

  // ── EQUIPMENT ────────────────────────────────────────────────
  const addEquipment = d => { const e = { ...d, id: uid() }; setEquipment(p => [...p, e]); audit("ADD_EQUIPMENT", e.name); notify("تم إضافة الصنف"); };
  const updateEquipment = (id, d) => { setEquipment(p => p.map(e => e.id === id ? { ...e, ...d } : e)); audit("EDIT_EQUIPMENT", id); notify("تم تعديل الصنف"); };
  const deleteEquipment = id => { setEquipment(p => p.filter(e => e.id !== id)); audit("DEL_EQUIPMENT", id); notify("تم حذف الصنف"); };

  // ── TASKS ────────────────────────────────────────────────────
  const addTask = d => { const t = { ...d, id: uid(), createdAt: nowTS() }; setTasks(p => [...p, t]); audit("ADD_TASK", t.title); notify("تمت إضافة المهمة"); };
  const updateTask = (id, d) => { setTasks(p => p.map(t => t.id === id ? { ...t, ...d } : t)); audit("EDIT_TASK", id); notify("تم تحديث المهمة"); };
  const deleteTask = id => { setTasks(p => p.filter(t => t.id !== id)); audit("DEL_TASK", id); notify("تم حذف المهمة"); };

  // ── INVOICES & PAYMENTS (collection engine) ─────────────────
  const addInvoice = d => { const inv = { ...d, id: uid(), createdAt: nowTS() }; setInvoices(p => [...p, inv]); audit("ADD_INVOICE", inv.number); notify("تم إصدار الفاتورة"); };
  const updateInvoice = (id, d) => { setInvoices(p => p.map(i => i.id === id ? { ...i, ...d } : i)); audit("EDIT_INVOICE", id); notify("تم تعديل الفاتورة"); };
  const deleteInvoice = id => { setInvoices(p => p.filter(i => i.id !== id)); setPayments(p => p.filter(pay => pay.invoiceId !== id)); audit("DEL_INVOICE", id); notify("تم حذف الفاتورة"); };
  const addPayment = d => { const pay = { ...d, id: uid(), createdAt: nowTS() }; setPayments(p => [...p, pay]); audit("ADD_PAYMENT", `${d.invoiceId}:${d.amt}`); notify("تم تسجيل التحصيل"); };
  const deletePayment = id => { setPayments(p => p.filter(x => x.id !== id)); audit("DEL_PAYMENT", id); notify("تم حذف عملية التحصيل"); };

  const getInvoiceCollected = invId => payments.filter(p => p.invoiceId === invId).reduce((s, p) => s + nv(p.amt), 0);
  const getInvoiceStatus = inv => { const c = getInvoiceCollected(inv.id); if (c <= 0) return "pending"; if (c >= nv(inv.value)) return "paid"; return "partial"; };
  const getInvoiceRemaining = inv => Math.max(0, nv(inv.value) - getInvoiceCollected(inv.id));
  const enrichInvoice = inv => { const collected = getInvoiceCollected(inv.id); return { ...inv, collected, remaining: Math.max(0, nv(inv.value) - collected), status: getInvoiceStatus(inv), client: clients.find(c => c.id === inv.clientId), project: projects.find(p => p.id === inv.projectId) }; };
  const invoicesEnriched = invoices.map(enrichInvoice).sort((a, b) => (b.date || "").localeCompare(a.date || ""));

  // ── COMMISSIONS & EARNINGS ───────────────────────────────────
  // Each project carries its own commission rate (defaults to 5%, per
  // the agency's policy of paying the assigned project team a cut of
  // the project value on top of — or instead of — their fixed salary).
  // The commission pool is split evenly among the team assigned to it.
  const projectCommissionPool = p => nv(p.value) * (nv(p.commissionRate ?? 5) / 100);
  const projectCommissionPerMember = p => {
    const teamSize = (p.team || []).length;
    return teamSize > 0 ? projectCommissionPool(p) / teamSize : 0;
  };
  const employeeProjects = employeeId => projects.filter(p => (p.team || []).includes(employeeId));
  const employeeEarnings = employeeId => {
    const myProjects = employeeProjects(employeeId);
    const breakdown = myProjects.map(p => ({ project: p, share: projectCommissionPerMember(p) }));
    const commissionTotal = breakdown.reduce((s, b) => s + b.share, 0);
    const emp = employees.find(e => e.id === employeeId);
    const salary = nv(emp?.monthlyRate);
    return { breakdown, commissionTotal, salary, total: salary + commissionTotal };
  };

  // ── EXPORT / IMPORT ──────────────────────────────────────────
  const exportBackup = () => {
    const blob = new Blob([JSON.stringify({ ...dataRef.current, _exportedAt: nowTS(), _version: 1 }, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = `Laknah_backup_${nowISO()}.json`; a.click();
    URL.revokeObjectURL(url); notify("تم تصدير النسخة الاحتياطية");
  };
  const importBackup = () => {
    const inp = document.createElement("input"); inp.type = "file"; inp.accept = ".json";
    inp.onchange = async e => {
      try {
        const text = await e.target.files[0].text();
        const d = JSON.parse(text);
        if (d.clients) setClients(d.clients);
        if (d.employees) setEmployees(d.employees);
        if (d.projects) setProjects(d.projects);
        if (d.services) setServices(d.services);
        if (d.equipment) setEquipment(d.equipment);
        if (d.invoices) setInvoices(d.invoices);
        if (d.payments) setPayments(d.payments);
        if (d.auditLog) setAuditLog(d.auditLog);
        audit("IMPORT_BACKUP", "manual import");
        notify("تم استيراد البيانات بنجاح");
      } catch { notify("ملف غير صحيح", "warn"); }
    };
    inp.click();
  };

  // ── DERIVED / KPIs ───────────────────────────────────────────
  const totalInvoiced = invoices.reduce((s, i) => s + nv(i.value), 0);
  const totalCollected = payments.reduce((s, p) => s + nv(p.amt), 0);
  const totalOutstanding = Math.max(0, totalInvoiced - totalCollected);
  const activeProjects = projects.filter(p => p.status === "active");
  const activeEmployees = employees.filter(e => e.status === "active");
  const activeClients = clients.filter(c => c.status === "partner");

  const clientStats = clientId => {
    const cProjects = projects.filter(p => p.clientId === clientId);
    const cInvoices = invoicesEnriched.filter(i => i.clientId === clientId);
    const invoiced = cInvoices.reduce((s, i) => s + nv(i.value), 0);
    const collected = cInvoices.reduce((s, i) => s + i.collected, 0);
    return { projects: cProjects, invoices: cInvoices, invoiced, collected, outstanding: Math.max(0, invoiced - collected) };
  };
  const projectStats = projectId => {
    const pInvoices = invoicesEnriched.filter(i => i.projectId === projectId);
    const invoiced = pInvoices.reduce((s, i) => s + nv(i.value), 0);
    const collected = pInvoices.reduce((s, i) => s + i.collected, 0);
    return { invoices: pInvoices, invoiced, collected, outstanding: Math.max(0, invoiced - collected) };
  };

  const activeClient = clients.find(c => c.id === activeClientId);
  const activeProject = projects.find(p => p.id === activeProjectId);
  const activeEmployee = employees.find(e => e.id === activeEmployeeId);

  const ctx = {
    view, setView, modal, setModal, notify, toast, saveState, askConfirm,
    currentUser, isAdmin, me, can, onLogout,
    clients, addClient, updateClient, deleteClient, activeClient, activeClientId, setActiveClientId, clientStats,
    employees, addEmployee, updateEmployee, deleteEmployee, activeEmployees, activeEmployee, activeEmployeeId, setActiveEmployeeId,
    projects, addProject, updateProject, deleteProject, activeProjects, activeProject, activeProjectId, setActiveProjectId, projectStats,
    employeeProjects, projectCommissionPool, projectCommissionPerMember, employeeEarnings,
    services, addService, updateService, deleteService,
    equipment, addEquipment, updateEquipment, deleteEquipment,
    invoices, invoicesEnriched, addInvoice, updateInvoice, deleteInvoice,
    payments, addPayment, deletePayment, getInvoiceCollected, getInvoiceRemaining, getInvoiceStatus,
    tasks, addTask, updateTask, deleteTask,
    auditLog, exportBackup, importBackup,
    totalInvoiced, totalCollected, totalOutstanding, activeClients,
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0A1E1C", fontFamily: "'Cairo',sans-serif", direction: "rtl" }}>
      <GlobalStyles />
      <Sidebar ctx={ctx} />
      <main style={{ flex: 1, overflow: "auto", background: "#0A1E1C" }}>
        {view === "dashboard" && can("dashboard") && <Dashboard ctx={ctx} />}
        {view === "clients" && can("clients") && <ClientsView ctx={ctx} />}
        {view === "client-detail" && can("clients") && <ClientDetailView ctx={ctx} />}
        {view === "team" && can("team") && <TeamView ctx={ctx} />}
        {view === "member-profile" && <MemberProfileView ctx={ctx} />}
        {view === "projects" && can("projects") && <ProjectsView ctx={ctx} />}
        {view === "project-detail" && can("projects") && <ProjectDetailView ctx={ctx} />}
        {view === "invoices" && can("invoices") && <InvoicesView ctx={ctx} />}
        {view === "services" && can("services") && <ServicesView ctx={ctx} />}
        {view === "equipment" && can("equipment") && <EquipmentView ctx={ctx} />}
        {view === "software" && can("software") && <SoftwareView ctx={ctx} />}
      </main>

      {modal?.type === "client" && <ClientModal ctx={ctx} />}
      {modal?.type === "employee" && <EmployeeModal ctx={ctx} />}
      {modal?.type === "project" && <ProjectModal ctx={ctx} />}
      {modal?.type === "service" && <ServiceModal ctx={ctx} />}
      {modal?.type === "equipment" && <EquipmentModal ctx={ctx} />}
      {modal?.type === "invoice" && <InvoiceModal ctx={ctx} />}
      {modal?.type === "payment" && <PaymentModal ctx={ctx} />}
      {modal?.type === "task" && <TaskModal ctx={ctx} />}
      {modal?.type === "auditLog" && <AuditLogModal ctx={ctx} />}
      {modal?.type === "confirm" && <ConfirmModal ctx={ctx} />}

      {toast && <div className={`toast ${toast.type === "warn" ? "warn" : ""}`}>{toast.msg}</div>}
      <PrintPreview />
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// SIDEBAR
// ════════════════════════════════════════════════════════════════
function Sidebar({ ctx }) {
  const { view, setView, saveState, exportBackup, importBackup, setModal, clients, activeProjects, isAdmin, me, can, onLogout, setActiveEmployeeId } = ctx;
  const saveColors = { saved: "#4FBE93", saving: "#C9A876", error: "#E2716A" };
  const saveLabels = { saved: "تم الحفظ", saving: "جارِ الحفظ...", error: "خطأ في الحفظ" };

  const NAV = [
    { id: "dashboard", label: "لوحة التحكم", icon: LayoutDashboard },
    { id: "clients", label: "العملاء", icon: Building2 },
    { id: "projects", label: "المشاريع", icon: Briefcase },
    { id: "team", label: "الفريق", icon: Users },
    { id: "invoices", label: "الفواتير والتحصيل", icon: Receipt },
    { id: "services", label: "الخدمات", icon: Sparkles },
    { id: "equipment", label: "المعدات", icon: Camera },
    { id: "software", label: "البرامج", icon: MonitorPlay },
  ].filter(item => can(item.id));

  const nav = ({ id, label, icon: Icon }) => {
    const on = view === id || (id === "clients" && view === "client-detail") || (id === "projects" && view === "project-detail");
    return (
      <button key={id} onClick={() => setView(id)} style={{
        display: "flex", alignItems: "center", gap: "11px", padding: "10px 16px",
        background: on ? "rgba(201,168,118,.12)" : "transparent",
        border: "none", borderRight: `3px solid ${on ? "#C9A876" : "transparent"}`,
        color: on ? "#C9A876" : "#8FAFA8", fontSize: "13.5px", fontWeight: on ? 700 : 500,
        textAlign: "right", cursor: "pointer", width: "100%", transition: "all .15s", fontFamily: "'Cairo',sans-serif",
      }}>
        <Icon size={16} strokeWidth={on ? 2.4 : 2} style={{ flexShrink: 0 }} />
        {label}
      </button>
    );
  };

  return (
    <nav className="no-print" style={{ width: 228, background: "#081715", display: "flex", flexDirection: "column", flexShrink: 0, overflowY: "auto", borderLeft: "1px solid #1E433D", position: "relative" }}>
      <img src={LOGO_SRC} alt="" style={{ position: "absolute", height: 340, opacity: .035, left: "-30%", bottom: 60, pointerEvents: "none" }} />
      <div style={{ padding: "20px 16px 14px", borderBottom: "1px solid #1E433D", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
          <img src={LOGO_SRC} alt="لكنة" style={{ height: 30 }} />
          <div>
            <div className="disp" style={{ fontSize: "1rem", color: "#C9A876", fontWeight: 700, lineHeight: 1 }}>لكنة</div>
            <div style={{ fontSize: "9px", color: "#3D5C56", letterSpacing: ".08em", marginTop: "2px" }}>CONTENT &amp; MEDIA AGENCY</div>
          </div>
        </div>

        <div style={{ marginTop: "13px", display: "flex", alignItems: "center", gap: "9px", background: "rgba(201,168,118,.07)", border: "1px solid rgba(201,168,118,.18)", borderRadius: "8px", padding: "8px 10px" }}>
          <div className="avatar" style={{ width: 30, height: 30, fontSize: "11px", flexShrink: 0 }}>{isAdmin ? <ShieldCheck size={14} /> : initials(me?.name)}</div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: "12px", fontWeight: 700, color: "#ECE3D2", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{isAdmin ? "المنسق الرئيسي" : (me?.name || "موظف")}</div>
            <div style={{ fontSize: "10px", color: "#6E938A" }}>{isAdmin ? "صلاحية كاملة" : roleLabel(me?.role)}</div>
          </div>
        </div>

        {can("clients") && can("projects") && (
          <div style={{ marginTop: "9px", display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#8FAFA8" }}>
            <span>{clients.length} عميل</span><span>{activeProjects.length} مشروع نشط</span>
          </div>
        )}
        <div className="save-indicator" style={{ marginTop: "9px" }}>
          <span className="save-dot" style={{ background: saveColors[saveState], animation: saveState === "saving" ? "pulse 1s infinite" : "none" }} />
          <span style={{ color: saveColors[saveState] }}>{saveLabels[saveState]}</span>
        </div>
      </div>

      <div style={{ flex: 1, padding: "10px 0", position: "relative", zIndex: 1 }}>
        {!isAdmin && me && (
          <button onClick={() => { setActiveEmployeeId(me.id); setView("member-profile"); }} style={{
            display: "flex", alignItems: "center", gap: "11px", padding: "10px 16px",
            background: view === "member-profile" ? "rgba(201,168,118,.12)" : "transparent",
            border: "none", borderRight: `3px solid ${view === "member-profile" ? "#C9A876" : "transparent"}`,
            color: view === "member-profile" ? "#C9A876" : "#8FAFA8", fontSize: "13.5px", fontWeight: view === "member-profile" ? 700 : 500,
            textAlign: "right", cursor: "pointer", width: "100%", transition: "all .15s", fontFamily: "'Cairo',sans-serif",
          }}>
            <QrCode size={16} strokeWidth={view === "member-profile" ? 2.4 : 2} style={{ flexShrink: 0 }} />
            ملفي الشخصي
          </button>
        )}
        {NAV.map(nav)}
      </div>

      <div style={{ padding: "12px 14px", borderTop: "1px solid #1E433D", display: "flex", flexDirection: "column", gap: "6px", position: "relative", zIndex: 1 }}>
        {isAdmin && (
          <>
            <div style={{ display: "flex", gap: "5px" }}>
              <button onClick={exportBackup} className="btn btn-ghost btn-sm" style={{ flex: 1, justifyContent: "center", fontSize: "11px" }}><Download size={13} /> تصدير</button>
              <button onClick={importBackup} className="btn btn-ghost btn-sm" style={{ flex: 1, justifyContent: "center", fontSize: "11px" }}><Upload size={13} /> استيراد</button>
            </div>
            <button onClick={() => setModal({ type: "auditLog" })} className="btn btn-ghost btn-sm" style={{ width: "100%", justifyContent: "center", fontSize: "11px" }}><History size={13} /> سجل العمليات</button>
          </>
        )}
        <button onClick={onLogout} className="btn btn-ghost btn-sm" style={{ width: "100%", justifyContent: "center", fontSize: "11px", color: "#E2716A" }}><LogOut size={13} /> تسجيل الخروج</button>
        <div style={{ fontSize: "10px", color: "#2A4541", textAlign: "center", marginTop: "2px" }}>© {new Date().getFullYear()} وكالة لكنة</div>
      </div>
    </nav>
  );
}

// ════════════════════════════════════════════════════════════════
// DASHBOARD
// ════════════════════════════════════════════════════════════════
function SigHead({ children, icon: Icon }) {
  return (
    <div className="sig-head">
      {Icon && <Icon size={16} color="#C9A876" />}
      <span className="sig-txt">{children}</span>
      <span className="sig-dot" />
      <span className="sig-line" />
    </div>
  );
}

function Dashboard({ ctx }) {
  const { clients, projects, activeProjects, employees, activeEmployees, services, equipment,
    totalInvoiced, totalCollected, totalOutstanding, invoicesEnriched, setView, setActiveClientId, setActiveProjectId } = ctx;

  const teamActualByRole = id => employees.filter(e => e.role === id && e.status === "active").length;
  const teamActiveTotal = activeEmployees.length;
  const pendingInvoices = byStatus(invoicesEnriched, "pending");
  const partialInvoices = byStatus(invoicesEnriched, "partial");
  const recentProjects = [...projects].sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || "")).slice(0, 5);
  const recentInvoices = invoicesEnriched.slice(0, 5);

  return (
    <div className="page-pad">
      {/* Hero */}
      <div style={{ background: "linear-gradient(120deg,#0F2B27,#173B34)", border: "1px solid #1E433D", borderRadius: "14px", padding: "20px 24px", marginBottom: "20px", display: "flex", alignItems: "center", gap: "16px", position: "relative", overflow: "hidden" }}>
        <img src={LOGO_SRC} alt="" style={{ position: "absolute", height: 220, opacity: .06, left: -20, top: -30 }} />
        <img src={LOGO_SRC} alt="" style={{ height: 46, position: "relative", zIndex: 1 }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div className="disp" style={{ fontSize: "1.3rem", color: "#ECE3D2", fontWeight: 700 }}>لوحة تحكم وكالة لكنة</div>
          <div style={{ fontSize: "12.5px", color: "#8FAFA8", marginTop: "2px" }}>نظرة عامة على العملاء، المشاريع، الفريق، والتحصيل المالي</div>
        </div>
      </div>

      {/* KPI row 1 */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "12px", marginBottom: "12px" }}>
        {[
          { l: "إجمالي العملاء", v: fmtNum(clients.length), col: "#C9A876", sub: `${clients.filter(c => c.status === "partner").length} شريك حالي`, icon: Building2 },
          { l: "المشاريع النشطة", v: fmtNum(activeProjects.length), col: "#E0A857", sub: `${projects.length} مشروع إجمالاً`, icon: Briefcase },
          { l: "أعضاء الفريق", v: `${fmtNum(teamActiveTotal)} / ${ROLE_TARGET_TOTAL}`, col: "#6FB6C9", sub: "نشط مقابل الهيكل المستهدف", icon: Users },
          { l: "الخدمات والمعدات", v: `${services.length} / ${equipment.length}`, col: "#4FBE93", sub: "خدمة مُقدَّمة / صنف معدّات", icon: Sparkles },
        ].map((k, i) => (
          <div key={i} className="kpi-card">
            <div className="kpi-top" style={{ background: k.col }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div className="kpi-label">{k.l}</div>
                <div className="kpi-value disp" style={{ color: k.col }}>{k.v}</div>
              </div>
              <k.icon size={18} color={k.col} style={{ opacity: .7 }} />
            </div>
            <div className="kpi-sub">{k.sub}</div>
          </div>
        ))}
      </div>

      {/* KPI row 2 — financial */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "12px", marginBottom: "22px" }}>
        {[
          { l: "إجمالي الفواتير", v: fmtSAR(totalInvoiced), col: "#6FB6C9", sub: `${invoicesEnriched.length} فاتورة` },
          { l: "إجمالي المحصَّل", v: fmtSAR(totalCollected), col: "#4FBE93", sub: "من العملاء" },
          { l: "المستحقات المعلقة", v: fmtSAR(totalOutstanding), col: totalOutstanding > 0 ? "#E2716A" : "#4FBE93", sub: `${pendingInvoices.length} غير محصَّلة، ${partialInvoices.length} جزئية` },
        ].map((k, i) => (
          <div key={i} className="kpi-card">
            <div className="kpi-top" style={{ background: k.col }} />
            <div className="kpi-label">{k.l}</div>
            <div className="kpi-value mono" style={{ color: k.col, fontSize: "1.45rem" }}>{k.v}</div>
            <div className="kpi-sub">{k.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.1fr .9fr", gap: "16px" }}>
        <div>
          {/* Active projects */}
          <div className="card">
            <SigHead icon={Briefcase}>المشاريع النشطة ({activeProjects.length})</SigHead>
            {activeProjects.length === 0 && <div className="muted" style={{ fontSize: "13.5px", textAlign: "center", padding: "22px 0" }}>لا توجد مشاريع نشطة حالياً — أضف مشروعك الأول من صفحة المشاريع</div>}
            {activeProjects.slice(0, 6).map(p => {
              const client = clients.find(c => c.id === p.clientId);
              const st = ctx.projectStats(p.id);
              const progress = pct(st.collected, nv(p.value));
              return (
                <div key={p.id} className="row-card" onClick={() => { setActiveProjectId(p.id); setView("project-detail"); }}>
                  <div className="avatar" style={{ background: "rgba(224,168,87,.14)", color: "#E0A857" }}><Briefcase size={17} /></div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: "13.5px", color: "#ECE3D2" }}>{p.name}</div>
                    <div style={{ fontSize: "12px", color: "#6E938A" }}>{client?.name || "—"}</div>
                    <div className="prog-bar" style={{ marginTop: "6px" }}><div className="prog-fill" style={{ width: `${progress}%` }} /></div>
                  </div>
                  <div style={{ textAlign: "left", flexShrink: 0 }}>
                    <div style={{ fontWeight: 700, color: "#C9A876", fontSize: "13px" }} className="mono">{fmtSAR(p.value)}</div>
                    <div style={{ fontSize: "11px", color: "#6E938A" }}>محصَّل {progress.toFixed(0)}٪</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Recent invoices */}
          <div className="card">
            <SigHead icon={Receipt}>أحدث الفواتير</SigHead>
            {recentInvoices.length === 0 && <div className="muted" style={{ fontSize: "13.5px", textAlign: "center", padding: "16px 0" }}>لا توجد فواتير بعد</div>}
            {recentInvoices.map(inv => (
              <div key={inv.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0", borderBottom: "1px solid #1E433D" }}>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 600, color: "#ECE3D2" }}>{inv.number}</div>
                  <div style={{ fontSize: "11.5px", color: "#6E938A" }}>{inv.client?.name || "—"} · {fmtD(inv.date)}</div>
                </div>
                <div style={{ textAlign: "left" }}>
                  <div className="mono" style={{ fontSize: "13px", fontWeight: 700, color: "#ECE3D2" }}>{fmtSAR(inv.value)}</div>
                  <span className="badge" style={{ background: `${INVOICE_STATUSES[inv.status].color}22`, color: INVOICE_STATUSES[inv.status].color }}>{INVOICE_STATUSES[inv.status].label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          {/* Team composition */}
          <div className="card">
            <SigHead icon={Users}>تركيبة الفريق</SigHead>
            {TEAM_ROLES.filter(r => r.target > 0).map(r => {
              const actual = teamActualByRole(r.id);
              const p = pct(actual, r.target);
              return (
                <div key={r.id} style={{ padding: "8px 0", borderBottom: "1px solid #1E433D" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                    <span style={{ fontSize: "12.5px", color: "#C9DAD4", display: "flex", alignItems: "center", gap: "6px" }}><r.icon size={13} color="#C9A876" /> {r.label}</span>
                    <span className="mono" style={{ fontSize: "12px", color: "#8FAFA8" }}>{actual} / {r.target}</span>
                  </div>
                  <div className="prog-bar"><div className="prog-fill" style={{ width: `${p}%` }} /></div>
                </div>
              );
            })}
            <div style={{ marginTop: "10px", fontSize: "11.5px", color: "#6E938A", textAlign: "center" }}>الأهداف مأخوذة من الهيكل المرجعي للوكالة — أضف أعضاء الفريق الفعليين من صفحة الفريق</div>
          </div>

          {/* Top clients */}
          <div className="card">
            <SigHead icon={Building2}>أبرز العملاء</SigHead>
            {clients.length === 0 && <div className="muted" style={{ fontSize: "13px", textAlign: "center" }}>لا يوجد عملاء بعد</div>}
            {clients.slice(0, 6).map(c => {
              const st = ctx.clientStats(c.id);
              return (
                <div key={c.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid #1E433D", cursor: "pointer" }}
                  onClick={() => { setActiveClientId(c.id); setView("client-detail"); }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "9px", minWidth: 0 }}>
                    <span className="avatar" style={{ width: 30, height: 30, fontSize: "11px" }}>{initials(c.name)}</span>
                    <span style={{ fontSize: "12.5px", color: "#ECE3D2", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.name}</span>
                  </div>
                  <span style={{ fontSize: "11px", color: "#6E938A", flexShrink: 0 }}>{st.projects.length} مشروع</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
function byStatus(list, status) { return list.filter(i => i.status === status); }

// ════════════════════════════════════════════════════════════════
// CLIENTS
// ════════════════════════════════════════════════════════════════
function ClientsView({ ctx }) {
  const { clients, setView, setActiveClientId, setModal, askConfirm, deleteClient } = ctx;
  const [q, setQ] = useState("");
  const [sectorF, setSectorF] = useState("الكل");
  const [statusF, setStatusF] = useState("الكل");

  const filtered = clients.filter(c =>
    (q === "" || c.name.includes(q)) &&
    (sectorF === "الكل" || c.sector === sectorF) &&
    (statusF === "الكل" || c.status === statusF)
  );

  return (
    <div className="page-pad">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
        <div><div className="page-title disp">العملاء</div><div className="page-sub">قاعدة بيانات عملاء وشركاء وكالة لكنة</div></div>
        <button className="btn btn-gold" onClick={() => setModal({ type: "client", client: null })}><Plus size={15} /> عميل جديد</button>
      </div>

      <div style={{ display: "flex", gap: "10px", marginBottom: "16px", flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: "1 1 220px" }}>
          <Search size={15} color="#6E938A" style={{ position: "absolute", right: 12, top: 11 }} />
          <input className="inp" style={{ paddingRight: 34 }} placeholder="بحث باسم العميل..." value={q} onChange={e => setQ(e.target.value)} />
        </div>
        <select className="sel" style={{ width: 180 }} value={sectorF} onChange={e => setSectorF(e.target.value)}>
          <option>الكل</option>{SECTORS.map(s => <option key={s}>{s}</option>)}
        </select>
        <select className="sel" style={{ width: 160 }} value={statusF} onChange={e => setStatusF(e.target.value)}>
          <option>الكل</option>{Object.entries(CLIENT_STATUSES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
        </select>
      </div>

      <div style={{ fontSize: "12.5px", color: "#6E938A", marginBottom: "10px" }}>{filtered.length} من أصل {clients.length} عميل</div>

      {filtered.map(c => {
        const st = ctx.clientStats(c.id);
        const status = CLIENT_STATUSES[c.status] || CLIENT_STATUSES.partner;
        return (
          <div key={c.id} className="row-card" onClick={() => { setActiveClientId(c.id); setView("client-detail"); }}>
            <div className="avatar">{initials(c.name)}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontWeight: 700, fontSize: "14px", color: "#ECE3D2" }}>{c.name}</span>
                <span className="badge" style={{ background: `${SECTOR_COLOR[c.sector]}22`, color: SECTOR_COLOR[c.sector] }}>{c.sector}</span>
                <span className="badge" style={{ background: `${status.color}22`, color: status.color }}>{status.label}</span>
              </div>
              <div style={{ fontSize: "12px", color: "#6E938A", marginTop: "3px" }}>
                {c.contactPerson || "لا يوجد جهة اتصال مسجّلة"} {c.phone && `· ${c.phone}`}
              </div>
            </div>
            <div style={{ textAlign: "left", flexShrink: 0, display: "flex", alignItems: "center", gap: "14px" }}>
              <div>
                <div style={{ fontSize: "12px", color: "#6E938A" }}>{st.projects.length} مشروع</div>
                <div className="mono" style={{ fontSize: "13px", fontWeight: 700, color: "#C9A876" }}>{fmtSAR(st.invoiced)}</div>
              </div>
              <div style={{ display: "flex", gap: "6px" }} onClick={e => e.stopPropagation()}>
                <button className="btn btn-ghost btn-sm" onClick={() => setModal({ type: "client", client: c })}><Pencil size={13} /></button>
                <button className="btn btn-danger btn-sm" onClick={() => askConfirm(`هل تريد حذف العميل "${c.name}"؟`, () => deleteClient(c.id))}><Trash2 size={13} /></button>
              </div>
              <ChevronLeft size={16} color="#3D5C56" />
            </div>
          </div>
        );
      })}
      {filtered.length === 0 && <div className="muted" style={{ textAlign: "center", padding: "40px 0" }}>لا توجد نتائج مطابقة</div>}
    </div>
  );
}

function ClientDetailView({ ctx }) {
  const { activeClient, setView, clientStats, setModal, askConfirm, deleteClient, setActiveProjectId } = ctx;
  if (!activeClient) return <div className="page-pad"><div className="muted">لم يتم تحديد عميل</div></div>;
  const st = clientStats(activeClient.id);
  const status = CLIENT_STATUSES[activeClient.status] || CLIENT_STATUSES.partner;

  return (
    <div className="page-pad">
      <button className="btn btn-ghost btn-sm" style={{ marginBottom: "14px" }} onClick={() => setView("clients")}><ChevronRight size={14} /> العودة للعملاء</button>

      <div className="card" style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div className="avatar" style={{ width: 58, height: 58, fontSize: "18px" }}>{initials(activeClient.name)}</div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
            <div className="disp" style={{ fontSize: "1.3rem", color: "#ECE3D2", fontWeight: 700 }}>{activeClient.name}</div>
            <span className="badge" style={{ background: `${SECTOR_COLOR[activeClient.sector]}22`, color: SECTOR_COLOR[activeClient.sector] }}>{activeClient.sector}</span>
            <span className="badge" style={{ background: `${status.color}22`, color: status.color }}>{status.label}</span>
          </div>
          <div style={{ display: "flex", gap: "16px", marginTop: "8px", fontSize: "12.5px", color: "#8FAFA8", flexWrap: "wrap" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "5px" }}><UserCheck size={13} /> {activeClient.contactPerson || "—"}</span>
            <span style={{ display: "flex", alignItems: "center", gap: "5px" }}><Phone size={13} /> {activeClient.phone || "—"}</span>
            <span style={{ display: "flex", alignItems: "center", gap: "5px" }}><Mail size={13} /> {activeClient.email || "—"}</span>
          </div>
          {activeClient.notes && <div style={{ marginTop: "8px", fontSize: "12.5px", color: "#6E938A" }}>{activeClient.notes}</div>}
        </div>
        <div style={{ display: "flex", gap: "7px" }}>
          <button className="btn btn-ghost btn-sm" onClick={() => setModal({ type: "client", client: activeClient })}><Pencil size={13} /> تعديل</button>
          <button className="btn btn-danger btn-sm" onClick={() => askConfirm(`حذف العميل "${activeClient.name}"؟`, () => { deleteClient(activeClient.id); setView("clients"); })}><Trash2 size={13} /></button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "12px", margin: "14px 0" }}>
        {[
          { l: "إجمالي الفواتير", v: fmtSAR(st.invoiced), col: "#6FB6C9" },
          { l: "إجمالي المحصَّل", v: fmtSAR(st.collected), col: "#4FBE93" },
          { l: "المستحق", v: fmtSAR(st.outstanding), col: st.outstanding > 0 ? "#E2716A" : "#4FBE93" },
        ].map((k, i) => (
          <div key={i} className="kpi-card"><div className="kpi-top" style={{ background: k.col }} /><div className="kpi-label">{k.l}</div><div className="kpi-value mono" style={{ color: k.col, fontSize: "1.3rem" }}>{k.v}</div></div>
        ))}
      </div>

      <div className="card">
        <SigHead icon={Briefcase}>مشاريع العميل ({st.projects.length})</SigHead>
        {st.projects.length === 0 && <div className="muted" style={{ textAlign: "center", padding: "16px 0", fontSize: "13px" }}>لا توجد مشاريع مسجّلة لهذا العميل بعد</div>}
        {st.projects.map(p => {
          const ps = PROJECT_STATUSES[p.status] || PROJECT_STATUSES.quote;
          return (
            <div key={p.id} className="row-card" onClick={() => { setActiveProjectId(p.id); setView("project-detail"); }}>
              <div className="avatar" style={{ background: "rgba(224,168,87,.14)", color: "#E0A857" }}><Briefcase size={16} /></div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: "13.5px", color: "#ECE3D2" }}>{p.name}</div>
                <div style={{ fontSize: "11.5px", color: "#6E938A" }}>{fmtD(p.startDate)} → {fmtD(p.deadline)}</div>
              </div>
              <span className="badge" style={{ background: `${ps.color}22`, color: ps.color }}>{ps.label}</span>
              <div className="mono" style={{ fontWeight: 700, color: "#C9A876", fontSize: "13px", minWidth: 90, textAlign: "left" }}>{fmtSAR(p.value)}</div>
            </div>
          );
        })}
      </div>

      <div className="card">
        <SigHead icon={Receipt}>فواتير العميل ({st.invoices.length})</SigHead>
        {st.invoices.length === 0 && <div className="muted" style={{ textAlign: "center", padding: "16px 0", fontSize: "13px" }}>لا توجد فواتير لهذا العميل بعد</div>}
        {st.invoices.map(inv => (
          <div key={inv.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0", borderBottom: "1px solid #1E433D" }}>
            <div><div style={{ fontSize: "13px", fontWeight: 600, color: "#ECE3D2" }}>{inv.number}</div><div style={{ fontSize: "11.5px", color: "#6E938A" }}>{fmtD(inv.date)}</div></div>
            <span className="badge" style={{ background: `${INVOICE_STATUSES[inv.status].color}22`, color: INVOICE_STATUSES[inv.status].color }}>{INVOICE_STATUSES[inv.status].label}</span>
            <div className="mono" style={{ fontWeight: 700, color: "#ECE3D2", fontSize: "13px" }}>{fmtSAR(inv.value)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ClientModal({ ctx }) {
  const { modal, setModal, addClient, updateClient } = ctx;
  const editing = modal?.client;
  const [f, setF] = useState(() => editing || { name: "", sector: SECTORS[0], status: "partner", contactPerson: "", phone: "", email: "", since: "", notes: "" });
  const set = (k, v) => setF(p => ({ ...p, [k]: v }));
  const save = () => {
    if (!f.name.trim()) return;
    if (editing) updateClient(editing.id, f); else addClient(f);
    setModal(null);
  };
  return (
    <ModalShell title={editing ? "تعديل بيانات العميل" : "عميل جديد"} icon={Building2} onClose={() => setModal(null)}
      footer={<><button className="btn btn-ghost" onClick={() => setModal(null)}>إلغاء</button><button className="btn btn-gold" onClick={save}><Save size={14} /> حفظ</button></>}>
      <div className="frow">
        <div className="fgroup"><div className="lbl">اسم العميل / الجهة *</div><input className="inp" value={f.name} onChange={e => set("name", e.target.value)} placeholder="مثال: مجمع زين الطبي" /></div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <div className="fgroup"><div className="lbl">القطاع</div><select className="sel" value={f.sector} onChange={e => set("sector", e.target.value)}>{SECTORS.map(s => <option key={s}>{s}</option>)}</select></div>
          <div className="fgroup"><div className="lbl">الحالة</div><select className="sel" value={f.status} onChange={e => set("status", e.target.value)}>{Object.entries(CLIENT_STATUSES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}</select></div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <div className="fgroup"><div className="lbl">جهة الاتصال</div><input className="inp" value={f.contactPerson} onChange={e => set("contactPerson", e.target.value)} placeholder="اسم المسؤول" /></div>
          <div className="fgroup"><div className="lbl">رقم الجوال</div><input className="inp" style={{ direction: "ltr", textAlign: "right" }} value={f.phone} onChange={e => set("phone", e.target.value)} placeholder="05xxxxxxxx" /></div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <div className="fgroup"><div className="lbl">البريد الإلكتروني</div><input className="inp" style={{ direction: "ltr", textAlign: "right" }} value={f.email} onChange={e => set("email", e.target.value)} placeholder="email@example.com" /></div>
          <div className="fgroup"><div className="lbl">عميل منذ</div><input type="date" className="inp" style={{ direction: "ltr" }} value={f.since} onChange={e => set("since", e.target.value)} /></div>
        </div>
        <div className="fgroup"><div className="lbl">ملاحظات</div><textarea className="inp" rows={3} value={f.notes} onChange={e => set("notes", e.target.value)} style={{ resize: "vertical" }} /></div>
      </div>
    </ModalShell>
  );
}

// ════════════════════════════════════════════════════════════════
// TEAM
// ════════════════════════════════════════════════════════════════
function TeamView({ ctx }) {
  const { employees, setModal, askConfirm, deleteEmployee, isAdmin, setView, setActiveEmployeeId } = ctx;
  const [roleF, setRoleF] = useState("الكل");
  const [q, setQ] = useState("");
  const filtered = employees.filter(e => (roleF === "الكل" || e.role === roleF) && (q === "" || e.name.includes(q)));
  const openProfile = e => { setActiveEmployeeId(e.id); setView("member-profile"); };

  return (
    <div className="page-pad">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
        <div><div className="page-title disp">الفريق</div><div className="page-sub">قاعدة بيانات أعضاء فريق وكالة لكنة</div></div>
        {isAdmin && <button className="btn btn-gold" onClick={() => setModal({ type: "employee", employee: null })}><Plus size={15} /> إضافة عضو</button>}
      </div>

      {/* role structure reference */}
      <div className="card">
        <SigHead icon={Users}>الهيكل المرجعي للفريق ({employees.filter(e => e.status === "active").length} / {ROLE_TARGET_TOTAL})</SigHead>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "10px" }}>
          {TEAM_ROLES.filter(r => r.target > 0).map(r => {
            const actual = employees.filter(e => e.role === r.id && e.status === "active").length;
            return (
              <div key={r.id} className="chip" style={{ justifyContent: "space-between", cursor: "default", padding: "9px 13px" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "6px" }}><r.icon size={13} /> {r.label}</span>
                <span className="mono" style={{ fontWeight: 700 }}>{actual}/{r.target}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ display: "flex", gap: "10px", margin: "16px 0" }}>
        <div style={{ position: "relative", flex: "1 1 220px" }}>
          <Search size={15} color="#6E938A" style={{ position: "absolute", right: 12, top: 11 }} />
          <input className="inp" style={{ paddingRight: 34 }} placeholder="بحث باسم الموظف..." value={q} onChange={e => setQ(e.target.value)} />
        </div>
        <select className="sel" style={{ width: 220 }} value={roleF} onChange={e => setRoleF(e.target.value)}>
          <option>الكل</option>{TEAM_ROLES.map(r => <option key={r.id} value={r.id}>{r.label}</option>)}
        </select>
      </div>

      {filtered.length === 0 && (
        <div className="muted" style={{ textAlign: "center", padding: "40px 0", fontSize: "13.5px", lineHeight: 1.8 }}>
          {employees.length === 0 ? <>لا يوجد أعضاء فريق مسجّلون بعد.<br />اضغط "إضافة عضو" لبدء بناء قاعدة بيانات الفريق.</> : "لا توجد نتائج مطابقة"}
        </div>
      )}
      {filtered.map(e => {
        const Icon = roleIcon(e.role);
        const st = EMP_STATUSES[e.status] || EMP_STATUSES.active;
        return (
          <div key={e.id} className="row-card" onClick={() => openProfile(e)}>
            <div className="avatar"><Icon size={18} /></div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontWeight: 700, fontSize: "14px", color: "#ECE3D2" }}>{e.name}</span>
                <span className="badge" style={{ background: `${st.color}22`, color: st.color }}>{st.label}</span>
                {nv(e.rating) > 0 && <span style={{ display: "flex", alignItems: "center", gap: "2px", color: "#E0A857", fontSize: "11px" }}><Star size={11} fill="#E0A857" /> {e.rating}</span>}
              </div>
              <div style={{ fontSize: "12px", color: "#6E938A", marginTop: "3px" }}>{roleLabel(e.role)} {e.phone && `· ${e.phone}`} {e.cardId && `· #${e.cardId}`}</div>
            </div>
            <div style={{ textAlign: "left", fontSize: "12px", color: "#6E938A" }}>{e.joinDate ? `منضم منذ ${fmtD(e.joinDate)}` : ""}</div>
            {isAdmin && (
              <div style={{ display: "flex", gap: "6px" }} onClick={ev => ev.stopPropagation()}>
                <button className="btn btn-ghost btn-sm" onClick={() => setModal({ type: "employee", employee: e })}><Pencil size={13} /></button>
                <button className="btn btn-danger btn-sm" onClick={() => askConfirm(`هل تريد حذف "${e.name}" من الفريق؟`, () => deleteEmployee(e.id))}><Trash2 size={13} /></button>
              </div>
            )}
            <ChevronLeft size={16} color="#3D5C56" />
          </div>
        );
      })}
    </div>
  );
}

function StarPicker({ value, onChange, size = 18 }) {
  return (
    <div style={{ display: "flex", gap: "4px" }}>
      {[1, 2, 3, 4, 5].map(n => (
        <button key={n} type="button" onClick={() => onChange(n === value ? 0 : n)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}>
          <Star size={size} color="#E0A857" fill={n <= value ? "#E0A857" : "none"} />
        </button>
      ))}
    </div>
  );
}

function EmployeeModal({ ctx }) {
  const { modal, setModal, addEmployee, updateEmployee } = ctx;
  const editing = modal?.employee;
  const [f, setF] = useState(() => editing || {
    name: "", nameEn: "", role: TEAM_ROLES[0].id, phone: "", email: "", joinDate: "", status: "active",
    monthlyRate: "", cardId: "", rating: 0, notes: "",
    username: "", pin: "", permissions: defaultPermissionsForRole(TEAM_ROLES[0].id),
  });
  const set = (k, v) => setF(p => ({ ...p, [k]: v }));
  const setPerm = (k, v) => setF(p => ({ ...p, permissions: { ...(p.permissions || {}), [k]: v } }));
  const onRoleChange = role => setF(p => ({ ...p, role, permissions: editing ? p.permissions : defaultPermissionsForRole(role) }));
  const save = () => { if (!f.name.trim()) return; if (editing) updateEmployee(editing.id, f); else addEmployee(f); setModal(null); };
  return (
    <ModalShell title={editing ? "تعديل بيانات الموظف" : "إضافة عضو فريق"} icon={Users} onClose={() => setModal(null)} wide
      footer={<><button className="btn btn-ghost" onClick={() => setModal(null)}>إلغاء</button><button className="btn btn-gold" onClick={save}><Save size={14} /> حفظ</button></>}>
      <div className="frow">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <div className="fgroup"><div className="lbl">الاسم الكامل *</div><input className="inp" value={f.name} onChange={e => set("name", e.target.value)} placeholder="اسم الموظف" /></div>
          <div className="fgroup"><div className="lbl">الاسم بالإنجليزية (كما في البطاقة)</div><input className="inp" style={{ direction: "ltr", textAlign: "right" }} value={f.nameEn} onChange={e => set("nameEn", e.target.value)} /></div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <div className="fgroup"><div className="lbl">التخصص / الدور</div><select className="sel" value={f.role} onChange={e => onRoleChange(e.target.value)}>{TEAM_ROLES.map(r => <option key={r.id} value={r.id}>{r.label}</option>)}</select></div>
          <div className="fgroup"><div className="lbl">الحالة</div><select className="sel" value={f.status} onChange={e => set("status", e.target.value)}>{Object.entries(EMP_STATUSES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}</select></div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <div className="fgroup"><div className="lbl">رقم الجوال</div><input className="inp" style={{ direction: "ltr", textAlign: "right" }} value={f.phone} onChange={e => set("phone", e.target.value)} placeholder="05xxxxxxxx" /></div>
          <div className="fgroup"><div className="lbl">البريد الإلكتروني</div><input className="inp" style={{ direction: "ltr", textAlign: "right" }} value={f.email} onChange={e => set("email", e.target.value)} placeholder="email@example.com" /></div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <div className="fgroup"><div className="lbl">تاريخ الانضمام</div><input type="date" className="inp" style={{ direction: "ltr" }} value={f.joinDate} onChange={e => set("joinDate", e.target.value)} /></div>
          <div className="fgroup"><div className="lbl">الراتب الشهري (اختياري)</div><input type="number" className="inp" style={{ direction: "ltr", textAlign: "right" }} value={f.monthlyRate} onChange={e => set("monthlyRate", e.target.value)} placeholder="0" /></div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", alignItems: "end" }}>
          <div className="fgroup"><div className="lbl">رقم البطاقة التعريفية</div><input className="inp" style={{ direction: "ltr", textAlign: "right" }} value={f.cardId} onChange={e => set("cardId", e.target.value)} placeholder="مثال: 451538" /></div>
          <div className="fgroup"><div className="lbl">التقييم</div><StarPicker value={nv(f.rating)} onChange={v => set("rating", v)} /></div>
        </div>
        <div className="fgroup"><div className="lbl">ملاحظات</div><textarea className="inp" rows={2} value={f.notes} onChange={e => set("notes", e.target.value)} style={{ resize: "vertical" }} /></div>

        <div style={{ borderTop: "1px solid #1E433D", paddingTop: "14px", marginTop: "4px" }}>
          <div className="lbl" style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "10px" }}><KeyRound size={13} /> الحساب وصلاحيات الدخول</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
            <div className="fgroup"><div className="lbl">اسم المستخدم</div><input className="inp" style={{ direction: "ltr", textAlign: "right" }} value={f.username} onChange={e => set("username", e.target.value)} placeholder="username" /></div>
            <div className="fgroup"><div className="lbl">الرمز السري (PIN)</div><input className="inp" style={{ direction: "ltr", textAlign: "right" }} value={f.pin} onChange={e => set("pin", e.target.value)} placeholder="0000" /></div>
          </div>
          <div className="lbl" style={{ marginBottom: "8px" }}>الأقسام المسموح للموظف الوصول إليها</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
            {PERMISSION_SECTIONS.map(s => (
              <button key={s.id} type="button" className={`chip ${f.permissions?.[s.id] ? "on" : ""}`} onClick={() => setPerm(s.id, !f.permissions?.[s.id])}>
                {f.permissions?.[s.id] ? <CircleDot size={12} /> : <Circle size={12} />} {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </ModalShell>
  );
}

// ════════════════════════════════════════════════════════════════
// PROJECTS
// ════════════════════════════════════════════════════════════════
function ProjectsView({ ctx }) {
  const { projects, clients, setModal, askConfirm, deleteProject, setView, setActiveProjectId } = ctx;
  const [statusF, setStatusF] = useState("الكل");
  const [q, setQ] = useState("");
  const filtered = projects.filter(p => (statusF === "الكل" || p.status === statusF) && (q === "" || p.name.includes(q)));

  return (
    <div className="page-pad">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
        <div><div className="page-title disp">المشاريع</div><div className="page-sub">جميع مشاريع وحملات عملاء وكالة لكنة</div></div>
        <button className="btn btn-gold" onClick={() => setModal({ type: "project", project: null })} disabled={clients.length === 0}><Plus size={15} /> مشروع جديد</button>
      </div>
      {clients.length === 0 && <div className="card" style={{ textAlign: "center", color: "#E0A857", fontSize: "13px" }}>أضف عميلاً واحداً على الأقل قبل إنشاء مشروع</div>}

      <div style={{ display: "flex", gap: "10px", marginBottom: "16px" }}>
        <div style={{ position: "relative", flex: "1 1 220px" }}>
          <Search size={15} color="#6E938A" style={{ position: "absolute", right: 12, top: 11 }} />
          <input className="inp" style={{ paddingRight: 34 }} placeholder="بحث باسم المشروع..." value={q} onChange={e => setQ(e.target.value)} />
        </div>
        <select className="sel" style={{ width: 180 }} value={statusF} onChange={e => setStatusF(e.target.value)}>
          <option>الكل</option>{Object.entries(PROJECT_STATUSES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
        </select>
      </div>

      {filtered.length === 0 && <div className="muted" style={{ textAlign: "center", padding: "40px 0", fontSize: "13.5px" }}>{projects.length === 0 ? "لا توجد مشاريع بعد" : "لا توجد نتائج مطابقة"}</div>}
      {filtered.map(p => {
        const client = clients.find(c => c.id === p.clientId);
        const ps = PROJECT_STATUSES[p.status] || PROJECT_STATUSES.quote;
        const st = ctx.projectStats(p.id);
        return (
          <div key={p.id} className="row-card" onClick={() => { setActiveProjectId(p.id); setView("project-detail"); }}>
            <div className="avatar" style={{ background: `${ps.color}22`, color: ps.color }}><Briefcase size={17} /></div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontWeight: 700, fontSize: "14px", color: "#ECE3D2" }}>{p.name}</span>
                <span className="badge" style={{ background: `${ps.color}22`, color: ps.color }}>{ps.label}</span>
              </div>
              <div style={{ fontSize: "12px", color: "#6E938A", marginTop: "3px" }}>{client?.name || "—"} · {fmtD(p.startDate)} → {fmtD(p.deadline)}</div>
            </div>
            <div style={{ textAlign: "left" }}>
              <div className="mono" style={{ fontWeight: 700, color: "#C9A876", fontSize: "13px" }}>{fmtSAR(p.value)}</div>
              <div style={{ fontSize: "11px", color: "#6E938A" }}>محصَّل {fmtSAR(st.collected)}</div>
            </div>
            <div style={{ display: "flex", gap: "6px" }} onClick={e => e.stopPropagation()}>
              <button className="btn btn-ghost btn-sm" onClick={() => setModal({ type: "project", project: p })}><Pencil size={13} /></button>
              <button className="btn btn-danger btn-sm" onClick={() => askConfirm(`هل تريد حذف مشروع "${p.name}"؟`, () => deleteProject(p.id))}><Trash2 size={13} /></button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function buildClientProjectHTML(project, client, stats) {
  const ps = PROJECT_STATUSES[project.status] || PROJECT_STATUSES.quote;
  const rows = stats.invoices.map(inv => `
    <tr>
      <td style="padding:10px;border-bottom:1px solid #eee">${inv.number}</td>
      <td style="padding:10px;border-bottom:1px solid #eee">${fmtD(inv.date)}</td>
      <td style="padding:10px;border-bottom:1px solid #eee">${INVOICE_STATUSES[inv.status].label}</td>
      <td style="padding:10px;border-bottom:1px solid #eee;text-align:left">${fmtSAR(inv.value)}</td>
    </tr>`).join("");
  return `<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8">
    <style>
      body{font-family:'Cairo',Tahoma,sans-serif;color:#1a1a1a;direction:rtl}
      table{width:100%;border-collapse:collapse;margin-top:14px}
      th{background:#0F2B27;color:#fff;padding:10px;text-align:right;font-size:13px}
      .head{display:flex;justify-content:space-between;align-items:center;border-bottom:3px solid #C9A876;padding-bottom:14px;margin-bottom:18px}
      .brand{color:#0F2B27;font-weight:800;font-size:1.4rem}
      .badge{display:inline-block;padding:4px 12px;border-radius:14px;background:${ps.color}22;color:${ps.color};font-weight:700;font-size:12px}
    </style></head>
    <body>
      <div class="head"><div class="brand">وكالة لكنة LAKNAH</div><div style="font-size:12px;color:#666">www.laknah.com · 0509077773</div></div>
      <h2 style="margin-bottom:4px">${project.name}</h2>
      <div style="color:#555;margin-bottom:10px">العميل: <b>${client?.name || "—"}</b> &nbsp;|&nbsp; الحالة: <span class="badge">${ps.label}</span></div>
      <div style="color:#555;font-size:13px">تاريخ البدء: ${fmtD(project.startDate)} &nbsp;|&nbsp; الموعد النهائي: ${fmtD(project.deadline)}</div>
      ${project.notes ? `<p style="margin-top:14px;color:#333;line-height:1.8">${project.notes}</p>` : ""}
      <h3 style="margin-top:24px;color:#0F2B27">سجل الفواتير</h3>
      <table><thead><tr><th>رقم الفاتورة</th><th>التاريخ</th><th>الحالة</th><th style="text-align:left">القيمة</th></tr></thead>
      <tbody>${rows || `<tr><td colspan="4" style="padding:14px;text-align:center;color:#999">لا توجد فواتير بعد</td></tr>`}</tbody></table>
      <div style="margin-top:18px;text-align:left;font-weight:800;font-size:15px">الإجمالي: ${fmtSAR(stats.invoiced)} &nbsp;|&nbsp; المحصَّل: ${fmtSAR(stats.collected)}</div>
      <div style="margin-top:40px;font-size:11px;color:#999;border-top:1px solid #eee;padding-top:10px">مستند صادر آلياً من نظام إدارة وكالة لكنة</div>
    </body></html>`;
}

function ProjectDetailView({ ctx }) {
  const { activeProject, setView, projectStats, setModal, askConfirm, deleteProject, clients, employees, isAdmin, projectCommissionPool, projectCommissionPerMember } = ctx;
  if (!activeProject) return <div className="page-pad"><div className="muted">لم يتم تحديد مشروع</div></div>;
  const client = clients.find(c => c.id === activeProject.clientId);
  const st = projectStats(activeProject.id);
  const ps = PROJECT_STATUSES[activeProject.status] || PROJECT_STATUSES.quote;
  const assigned = employees.filter(e => (activeProject.team || []).includes(e.id));
  const progress = pct(st.collected, nv(activeProject.value));
  const pool = projectCommissionPool(activeProject);
  const perMember = projectCommissionPerMember(activeProject);

  return (
    <div className="page-pad">
      <button className="btn btn-ghost btn-sm" style={{ marginBottom: "14px" }} onClick={() => setView("projects")}><ChevronRight size={14} /> العودة للمشاريع</button>

      <div className="card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
              <div className="disp" style={{ fontSize: "1.3rem", color: "#ECE3D2", fontWeight: 700 }}>{activeProject.name}</div>
              <span className="badge" style={{ background: `${ps.color}22`, color: ps.color }}>{ps.label}</span>
            </div>
            <div style={{ fontSize: "12.5px", color: "#8FAFA8", marginTop: "5px" }}>
              العميل: <b style={{ color: "#C9A876" }}>{client?.name || "—"}</b> · {fmtD(activeProject.startDate)} → {fmtD(activeProject.deadline)}
            </div>
            {activeProject.notes && <div style={{ marginTop: "8px", fontSize: "12.5px", color: "#6E938A" }}>{activeProject.notes}</div>}
          </div>
          <div style={{ display: "flex", gap: "7px" }}>
            <button className="btn btn-success btn-sm" onClick={() => printHTML(buildClientProjectHTML(activeProject, client, st))}><Printer size={13} /> نسخة للعميل</button>
            {isAdmin && <button className="btn btn-ghost btn-sm" onClick={() => setModal({ type: "project", project: activeProject })}><Pencil size={13} /> تعديل</button>}
            {isAdmin && <button className="btn btn-danger btn-sm" onClick={() => askConfirm(`حذف مشروع "${activeProject.name}"؟`, () => { deleteProject(activeProject.id); setView("projects"); })}><Trash2 size={13} /></button>}
          </div>
        </div>
        <div className="prog-bar" style={{ marginTop: "14px", height: 7 }}><div className="prog-fill" style={{ width: `${progress}%` }} /></div>
        <div style={{ fontSize: "11.5px", color: "#6E938A", marginTop: "5px" }}>نسبة التحصيل: {progress.toFixed(0)}٪</div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: isAdmin ? "repeat(4,1fr)" : "repeat(3,1fr)", gap: "12px", margin: "14px 0" }}>
        {[
          { l: "قيمة المشروع", v: fmtSAR(activeProject.value), col: "#C9A876" },
          { l: "إجمالي المحصَّل", v: fmtSAR(st.collected), col: "#4FBE93" },
          { l: "المتبقي", v: fmtSAR(st.outstanding), col: st.outstanding > 0 ? "#E2716A" : "#4FBE93" },
          ...(isAdmin ? [{ l: `عمولة الفريق (${nv(activeProject.commissionRate ?? 5)}٪)`, v: fmtSAR(pool), col: "#9B8FE0" }] : []),
        ].map((k, i) => (
          <div key={i} className="kpi-card"><div className="kpi-top" style={{ background: k.col }} /><div className="kpi-label">{k.l}</div><div className="kpi-value mono" style={{ color: k.col, fontSize: "1.3rem" }}>{k.v}</div></div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
        <div className="card">
          <SigHead icon={Receipt}>فواتير المشروع ({st.invoices.length})</SigHead>
          {st.invoices.length === 0 && <div className="muted" style={{ textAlign: "center", padding: "14px 0", fontSize: "13px" }}>لا توجد فواتير لهذا المشروع</div>}
          {st.invoices.map(inv => (
            <div key={inv.id} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #1E433D" }}>
              <span style={{ fontSize: "13px", color: "#ECE3D2" }}>{inv.number}</span>
              <span className="badge" style={{ background: `${INVOICE_STATUSES[inv.status].color}22`, color: INVOICE_STATUSES[inv.status].color }}>{INVOICE_STATUSES[inv.status].label}</span>
              <span className="mono" style={{ fontSize: "13px", color: "#ECE3D2" }}>{fmtSAR(inv.value)}</span>
            </div>
          ))}
        </div>
        <div className="card">
          <SigHead icon={Users}>الفريق المُكلَّف ({assigned.length})</SigHead>
          {assigned.length === 0 && <div className="muted" style={{ textAlign: "center", padding: "14px 0", fontSize: "13px" }}>لم يتم تكليف أحد بعد — حدّد الفريق من زر التعديل</div>}
          {assigned.map(e => {
            const Icon = roleIcon(e.role);
            return (
              <div key={e.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "7px 0", borderBottom: "1px solid #1E433D" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                  <Icon size={14} color="#C9A876" /><span style={{ fontSize: "13px", color: "#ECE3D2" }}>{e.name}</span><span style={{ fontSize: "11.5px", color: "#6E938A" }}>{roleLabel(e.role)}</span>
                </div>
                {isAdmin && <span className="mono" style={{ fontSize: "12px", color: "#9B8FE0" }}>{fmtSAR(perMember)}</span>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ProjectModal({ ctx }) {
  const { modal, setModal, addProject, updateProject, clients, services, employees } = ctx;
  const editing = modal?.project;
  const [f, setF] = useState(() => editing || { clientId: clients[0]?.id || "", name: "", serviceId: "", value: "", status: "quote", startDate: nowISO(), deadline: "", team: [], commissionRate: 5, notes: "" });
  const set = (k, v) => setF(p => ({ ...p, [k]: v }));
  const toggleTeam = id => setF(p => ({ ...p, team: (p.team || []).includes(id) ? p.team.filter(x => x !== id) : [...(p.team || []), id] }));
  const save = () => { if (!f.name.trim() || !f.clientId) return; if (editing) updateProject(editing.id, f); else addProject(f); setModal(null); };
  return (
    <ModalShell title={editing ? "تعديل المشروع" : "مشروع جديد"} icon={Briefcase} onClose={() => setModal(null)} wide
      footer={<><button className="btn btn-ghost" onClick={() => setModal(null)}>إلغاء</button><button className="btn btn-gold" onClick={save}><Save size={14} /> حفظ</button></>}>
      <div className="frow">
        <div className="fgroup"><div className="lbl">اسم المشروع *</div><input className="inp" value={f.name} onChange={e => set("name", e.target.value)} placeholder="مثال: حملة فيديوهات تسويقية" /></div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <div className="fgroup"><div className="lbl">العميل *</div><select className="sel" value={f.clientId} onChange={e => set("clientId", e.target.value)}>{clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select></div>
          <div className="fgroup"><div className="lbl">الخدمة الأساسية</div><select className="sel" value={f.serviceId} onChange={e => set("serviceId", e.target.value)}><option value="">— غير محدد —</option>{services.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}</select></div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <div className="fgroup"><div className="lbl">قيمة المشروع (ر.س)</div><input type="number" className="inp" style={{ direction: "ltr", textAlign: "right" }} value={f.value} onChange={e => set("value", e.target.value)} placeholder="0" /></div>
          <div className="fgroup"><div className="lbl">حالة المشروع</div><select className="sel" value={f.status} onChange={e => set("status", e.target.value)}>{Object.entries(PROJECT_STATUSES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}</select></div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <div className="fgroup"><div className="lbl">تاريخ البدء</div><input type="date" className="inp" style={{ direction: "ltr" }} value={f.startDate} onChange={e => set("startDate", e.target.value)} /></div>
          <div className="fgroup"><div className="lbl">الموعد النهائي</div><input type="date" className="inp" style={{ direction: "ltr" }} value={f.deadline} onChange={e => set("deadline", e.target.value)} /></div>
        </div>
        <div className="fgroup">
          <div className="lbl" style={{ display: "flex", alignItems: "center", gap: "6px" }}><Percent size={12} /> نسبة عمولة الفريق المُكلَّف من قيمة المشروع</div>
          <input type="number" className="inp" style={{ direction: "ltr", textAlign: "right", width: 120 }} value={f.commissionRate} onChange={e => set("commissionRate", e.target.value)} placeholder="5" />
          <div style={{ fontSize: "11.5px", color: "#6E938A", marginTop: "5px" }}>تُقسَّم العمولة بالتساوي بين أعضاء الفريق المُكلَّفين أدناه، إضافة إلى رواتبهم الشهرية إن وُجدت</div>
        </div>
        <div className="fgroup">
          <div className="lbl">الفريق المُكلَّف</div>
          {employees.length === 0 && <div className="muted" style={{ fontSize: "12.5px" }}>لا يوجد أعضاء فريق مسجّلون بعد</div>}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
            {employees.map(e => (
              <button key={e.id} type="button" className={`chip ${(f.team || []).includes(e.id) ? "on" : ""}`} onClick={() => toggleTeam(e.id)}>{e.name}</button>
            ))}
          </div>
        </div>
        <div className="fgroup"><div className="lbl">ملاحظات (داخلية — لا تظهر في نسخة العميل)</div><textarea className="inp" rows={3} value={f.notes} onChange={e => set("notes", e.target.value)} style={{ resize: "vertical" }} /></div>
      </div>
    </ModalShell>
  );
}

// ════════════════════════════════════════════════════════════════
// INVOICES & COLLECTIONS
// ════════════════════════════════════════════════════════════════
function buildClientInvoiceHTML(inv, client) {
  const st = INVOICE_STATUSES[inv.status];
  return `<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8">
    <style>
      body{font-family:'Cairo',Tahoma,sans-serif;color:#1a1a1a;direction:rtl}
      .head{display:flex;justify-content:space-between;align-items:center;border-bottom:3px solid #C9A876;padding-bottom:14px;margin-bottom:22px}
      .brand{color:#0F2B27;font-weight:800;font-size:1.4rem}
      .box{background:#f7f5f0;border-radius:10px;padding:20px;margin-top:18px}
      .row{display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #e5e0d5;font-size:14px}
      .total{font-weight:800;font-size:1.2rem;color:#0F2B27}
      .badge{display:inline-block;padding:4px 12px;border-radius:14px;background:${st.color}22;color:${st.color};font-weight:700;font-size:12px}
    </style></head>
    <body>
      <div class="head"><div class="brand">وكالة لكنة LAKNAH</div><div style="font-size:12px;color:#666">www.laknah.com · 0509077773</div></div>
      <h2 style="margin-bottom:6px">فاتورة ${inv.number}</h2>
      <div style="color:#555">إلى: <b>${client?.name || "—"}</b></div>
      <div class="box">
        <div class="row"><span>تاريخ الفاتورة</span><b>${fmtD(inv.date)}</b></div>
        <div class="row"><span>حالة السداد</span><span class="badge">${st.label}</span></div>
        <div class="row"><span>قيمة الفاتورة</span><b>${fmtSAR(inv.value)}</b></div>
        <div class="row"><span>المبلغ المحصَّل</span><b>${fmtSAR(inv.collected)}</b></div>
        <div class="row" style="border-bottom:none"><span class="total">المتبقي</span><span class="total">${fmtSAR(inv.remaining)}</span></div>
      </div>
      <div style="margin-top:40px;font-size:11px;color:#999;border-top:1px solid #eee;padding-top:10px">مستند صادر آلياً من نظام إدارة وكالة لكنة</div>
    </body></html>`;
}

function InvoicesView({ ctx }) {
  const { invoicesEnriched, clients, projects, setModal, askConfirm, deleteInvoice, totalInvoiced, totalCollected, totalOutstanding } = ctx;
  const [statusF, setStatusF] = useState("الكل");
  const [q, setQ] = useState("");
  const filtered = invoicesEnriched.filter(i =>
    (statusF === "الكل" || i.status === statusF) &&
    (q === "" || i.number.toLowerCase().includes(q.toLowerCase()) || (i.client?.name || "").includes(q))
  );

  return (
    <div className="page-pad">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
        <div><div className="page-title disp">الفواتير والتحصيل</div><div className="page-sub">إصدار الفواتير ومتابعة التحصيل من العملاء</div></div>
        <button className="btn btn-gold" onClick={() => setModal({ type: "invoice", invoice: null })} disabled={clients.length === 0}><Plus size={15} /> فاتورة جديدة</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "12px", marginBottom: "18px" }}>
        {[
          { l: "إجمالي الفواتير", v: fmtSAR(totalInvoiced), col: "#6FB6C9" },
          { l: "إجمالي المحصَّل", v: fmtSAR(totalCollected), col: "#4FBE93" },
          { l: "المستحقات المعلقة", v: fmtSAR(totalOutstanding), col: totalOutstanding > 0 ? "#E2716A" : "#4FBE93" },
        ].map((k, i) => (
          <div key={i} className="kpi-card"><div className="kpi-top" style={{ background: k.col }} /><div className="kpi-label">{k.l}</div><div className="kpi-value mono" style={{ color: k.col, fontSize: "1.35rem" }}>{k.v}</div></div>
        ))}
      </div>

      <div style={{ position: "relative", marginBottom: "14px" }}>
        <Search size={15} color="#6E938A" style={{ position: "absolute", right: 12, top: 11 }} />
        <input className="inp" style={{ paddingRight: 34 }} placeholder="بحث برقم الفاتورة أو اسم العميل..." value={q} onChange={e => setQ(e.target.value)} />
      </div>

      <div style={{ display: "flex", gap: "8px", marginBottom: "14px", flexWrap: "wrap" }}>
        {["الكل", ...Object.keys(INVOICE_STATUSES)].map(s => (
          <button key={s} className={`tab-pill ${statusF === s ? "on" : ""}`} onClick={() => setStatusF(s)}>{s === "الكل" ? "الكل" : INVOICE_STATUSES[s].label}</button>
        ))}
      </div>

      {filtered.length === 0 && <div className="muted" style={{ textAlign: "center", padding: "40px 0", fontSize: "13.5px" }}>{invoicesEnriched.length === 0 ? "لا توجد فواتير بعد" : "لا توجد نتائج مطابقة"}</div>}
      {filtered.map(inv => (
        <div key={inv.id} className="card" style={{ padding: "14px 16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                <span className="mono" style={{ fontWeight: 700, fontSize: "14px", color: "#ECE3D2" }}>{inv.number}</span>
                <span className="badge" style={{ background: `${INVOICE_STATUSES[inv.status].color}22`, color: INVOICE_STATUSES[inv.status].color }}>{INVOICE_STATUSES[inv.status].label}</span>
              </div>
              <div style={{ fontSize: "12.5px", color: "#8FAFA8", marginTop: "4px" }}>
                {inv.client?.name || "—"} {inv.project?.name && `· ${inv.project.name}`} · {fmtD(inv.date)}
              </div>
            </div>
            <div style={{ display: "flex", gap: "6px" }}>
              <button className="btn btn-success btn-sm" onClick={() => printHTML(buildClientInvoiceHTML(inv, inv.client))}><Printer size={13} /></button>
              <button className="btn btn-ghost btn-sm" onClick={() => setModal({ type: "invoice", invoice: inv })}><Pencil size={13} /></button>
              <button className="btn btn-danger btn-sm" onClick={() => askConfirm(`هل تريد حذف الفاتورة "${inv.number}"؟ سيتم حذف عمليات التحصيل المرتبطة بها أيضاً.`, () => deleteInvoice(inv.id))}><Trash2 size={13} /></button>
            </div>
          </div>
          <div className="prog-bar" style={{ margin: "11px 0 8px" }}><div className="prog-fill" style={{ width: `${pct(inv.collected, inv.value)}%` }} /></div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12.5px" }}>
            <span className="muted">قيمة الفاتورة: <b className="mono" style={{ color: "#ECE3D2" }}>{fmtSAR(inv.value)}</b></span>
            <span className="muted">محصَّل: <b className="mono" style={{ color: "#4FBE93" }}>{fmtSAR(inv.collected)}</b></span>
            <span className="muted">متبقي: <b className="mono" style={{ color: inv.remaining > 0 ? "#E2716A" : "#4FBE93" }}>{fmtSAR(inv.remaining)}</b></span>
            {inv.remaining > 0 && <button className="btn btn-success btn-sm" onClick={() => setModal({ type: "payment", invoice: inv })}><Wallet size={13} /> تسجيل تحصيل</button>}
          </div>
        </div>
      ))}
    </div>
  );
}

function InvoiceModal({ ctx }) {
  const { modal, setModal, addInvoice, updateInvoice, clients, projects, invoices } = ctx;
  const editing = modal?.invoice;
  const [f, setF] = useState(() => editing || {
    clientId: clients[0]?.id || "", projectId: "", number: generateInvoiceNumber(invoices), date: nowISO(), value: "", notes: "",
  });
  const set = (k, v) => setF(p => ({ ...p, [k]: v }));
  const clientProjects = projects.filter(p => p.clientId === f.clientId);
  const save = () => { if (!f.clientId || !f.number.trim() || !nv(f.value)) return; if (editing) updateInvoice(editing.id, f); else addInvoice(f); setModal(null); };
  return (
    <ModalShell title={editing ? "تعديل الفاتورة" : "فاتورة جديدة"} sub="رقم الفاتورة مُولَّد تلقائياً بصيغة قابلة للبحث — يمكن تعديله عند الحاجة" icon={Receipt} onClose={() => setModal(null)}
      footer={<><button className="btn btn-ghost" onClick={() => setModal(null)}>إلغاء</button><button className="btn btn-gold" onClick={save}><Save size={14} /> حفظ</button></>}>
      <div className="frow">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <div className="fgroup"><div className="lbl">العميل *</div><select className="sel" value={f.clientId} onChange={e => set("clientId", e.target.value)}>{clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select></div>
          <div className="fgroup"><div className="lbl">المشروع (اختياري)</div><select className="sel" value={f.projectId} onChange={e => set("projectId", e.target.value)}><option value="">— غير مرتبط —</option>{clientProjects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}</select></div>
        </div>
        <div className="fgroup"><div className="lbl">رقم الفاتورة *</div><input className="inp mono" style={{ direction: "ltr", textAlign: "right" }} value={f.number} onChange={e => set("number", e.target.value)} /></div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <div className="fgroup"><div className="lbl">قيمة الفاتورة (ر.س) *</div><input type="number" className="inp" style={{ direction: "ltr", textAlign: "right" }} value={f.value} onChange={e => set("value", e.target.value)} placeholder="0" /></div>
          <div className="fgroup"><div className="lbl">تاريخ الفاتورة</div><input type="date" className="inp" style={{ direction: "ltr" }} value={f.date} onChange={e => set("date", e.target.value)} /></div>
        </div>
        <div className="fgroup"><div className="lbl">ملاحظات</div><textarea className="inp" rows={3} value={f.notes} onChange={e => set("notes", e.target.value)} style={{ resize: "vertical" }} /></div>
      </div>
    </ModalShell>
  );
}

function PaymentModal({ ctx }) {
  const { modal, setModal, addPayment, getInvoiceRemaining } = ctx;
  const inv = modal?.invoice;
  const remaining = inv ? getInvoiceRemaining(inv) : 0;
  const [f, setF] = useState({ amt: remaining, date: nowISO(), method: PAY_METHODS[0], notes: "" });
  const set = (k, v) => setF(p => ({ ...p, [k]: v }));
  const save = () => { if (!nv(f.amt)) return; addPayment({ ...f, invoiceId: inv.id }); setModal(null); };
  if (!inv) return null;
  return (
    <ModalShell title="تسجيل تحصيل" sub={inv.number} icon={Wallet} onClose={() => setModal(null)}
      footer={<><button className="btn btn-ghost" onClick={() => setModal(null)}>إلغاء</button><button className="btn btn-success" onClick={save}><CheckCircle2 size={14} /> تأكيد التحصيل</button></>}>
      <div className="frow">
        <div style={{ background: "#081715", border: "1px solid #1E433D", borderRadius: "8px", padding: "10px 14px", display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
          <span className="muted">المتبقي على هذه الفاتورة</span><span className="mono" style={{ color: "#E2716A", fontWeight: 700 }}>{fmtSAR(remaining)}</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <div className="fgroup"><div className="lbl">المبلغ المحصَّل (ر.س) *</div><input type="number" className="inp" style={{ direction: "ltr", textAlign: "right" }} value={f.amt} onChange={e => set("amt", e.target.value)} /></div>
          <div className="fgroup"><div className="lbl">تاريخ التحصيل</div><input type="date" className="inp" style={{ direction: "ltr" }} value={f.date} onChange={e => set("date", e.target.value)} /></div>
        </div>
        <div className="fgroup"><div className="lbl">طريقة الدفع</div><select className="sel" value={f.method} onChange={e => set("method", e.target.value)}>{PAY_METHODS.map(m => <option key={m}>{m}</option>)}</select></div>
        <div className="fgroup"><div className="lbl">ملاحظات</div><input className="inp" value={f.notes} onChange={e => set("notes", e.target.value)} /></div>
      </div>
    </ModalShell>
  );
}

// ════════════════════════════════════════════════════════════════
// SERVICES
// ════════════════════════════════════════════════════════════════
const SERVICE_CAT_COLOR = { "فيديو": "#E0A857", "تصميم": "#6FB6C9", "تصوير": "#4FBE93", "صوت": "#C9A876", "محتوى": "#E2716A", "فعاليات": "#8FBF6F", "تصنيع": "#9B8FE0", "طباعة": "#6FB6C9" };

function ServicesView({ ctx }) {
  const { services, setModal, askConfirm, deleteService } = ctx;
  return (
    <div className="page-pad">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "18px" }}>
        <div><div className="page-title disp">الخدمات</div><div className="page-sub">كتالوج خدمات وكالة لكنة</div></div>
        <button className="btn btn-gold" onClick={() => setModal({ type: "service", service: null })}><Plus size={15} /> خدمة جديدة</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "14px" }}>
        {services.map(s => {
          const col = SERVICE_CAT_COLOR[s.cat] || "#C9A876";
          return (
            <div key={s.id} className="card" style={{ marginBottom: 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ display: "flex", gap: "11px" }}>
                  <div className="avatar" style={{ background: `${col}1F`, color: col }}><Sparkles size={17} /></div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "14px", color: "#ECE3D2" }}>{s.name}</div>
                    <span className="badge" style={{ background: `${col}22`, color: col, marginTop: "4px", display: "inline-block" }}>{s.cat}</span>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "6px" }}>
                  <button className="btn btn-ghost btn-sm" onClick={() => setModal({ type: "service", service: s })}><Pencil size={13} /></button>
                  <button className="btn btn-danger btn-sm" onClick={() => askConfirm(`حذف خدمة "${s.name}"؟`, () => deleteService(s.id))}><Trash2 size={13} /></button>
                </div>
              </div>
              <div style={{ fontSize: "12.5px", color: "#8FAFA8", marginTop: "10px", lineHeight: 1.7 }}>{s.desc}</div>
              {nv(s.basePrice) > 0 && <div style={{ marginTop: "9px", fontSize: "12.5px" }} className="muted">يبدأ من <b className="mono" style={{ color: "#C9A876" }}>{fmtSAR(s.basePrice)}</b></div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ServiceModal({ ctx }) {
  const { modal, setModal, addService, updateService } = ctx;
  const editing = modal?.service;
  const [f, setF] = useState(() => editing || { name: "", cat: "تصميم", desc: "", basePrice: "", notes: "" });
  const set = (k, v) => setF(p => ({ ...p, [k]: v }));
  const save = () => { if (!f.name.trim()) return; if (editing) updateService(editing.id, f); else addService(f); setModal(null); };
  return (
    <ModalShell title={editing ? "تعديل الخدمة" : "خدمة جديدة"} icon={Sparkles} onClose={() => setModal(null)}
      footer={<><button className="btn btn-ghost" onClick={() => setModal(null)}>إلغاء</button><button className="btn btn-gold" onClick={save}><Save size={14} /> حفظ</button></>}>
      <div className="frow">
        <div className="fgroup"><div className="lbl">اسم الخدمة *</div><input className="inp" value={f.name} onChange={e => set("name", e.target.value)} /></div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <div className="fgroup"><div className="lbl">التصنيف</div><select className="sel" value={f.cat} onChange={e => set("cat", e.target.value)}>{Object.keys(SERVICE_CAT_COLOR).map(c => <option key={c}>{c}</option>)}</select></div>
          <div className="fgroup"><div className="lbl">السعر المبدئي (ر.س، اختياري)</div><input type="number" className="inp" style={{ direction: "ltr", textAlign: "right" }} value={f.basePrice} onChange={e => set("basePrice", e.target.value)} placeholder="0" /></div>
        </div>
        <div className="fgroup"><div className="lbl">الوصف</div><textarea className="inp" rows={3} value={f.desc} onChange={e => set("desc", e.target.value)} style={{ resize: "vertical" }} /></div>
      </div>
    </ModalShell>
  );
}

// ════════════════════════════════════════════════════════════════
// EQUIPMENT
// ════════════════════════════════════════════════════════════════
const EQUIP_CAT_COLOR = { "تصوير": "#4FBE93", "صوت": "#C9A876", "تصنيع": "#9B8FE0", "طباعة": "#6FB6C9" };

function EquipmentView({ ctx }) {
  const { equipment, setModal, askConfirm, deleteEquipment } = ctx;
  const [catF, setCatF] = useState("الكل");
  const filtered = equipment.filter(e => catF === "الكل" || e.cat === catF);
  const cats = [...new Set(equipment.map(e => e.cat))];

  return (
    <div className="page-pad">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
        <div><div className="page-title disp">المعدات</div><div className="page-sub">جرد معدات وأجهزة وكالة لكنة</div></div>
        <button className="btn btn-gold" onClick={() => setModal({ type: "equipment", equipment: null })}><Plus size={15} /> إضافة صنف</button>
      </div>
      <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        <button className={`tab-pill ${catF === "الكل" ? "on" : ""}`} onClick={() => setCatF("الكل")}>الكل</button>
        {cats.map(c => <button key={c} className={`tab-pill ${catF === c ? "on" : ""}`} onClick={() => setCatF(c)}>{c}</button>)}
      </div>
      <table>
        <thead><tr><th>الصنف</th><th>الفئة</th><th>الماركة</th><th>الكمية</th><th>الحالة</th><th></th></tr></thead>
        <tbody>
          {filtered.map(e => (
            <tr key={e.id}>
              <td><div style={{ fontWeight: 600, color: "#ECE3D2" }}>{e.name}</div><div style={{ fontSize: "11.5px", color: "#6E938A" }}>{e.desc}</div></td>
              <td><span className="badge" style={{ background: `${EQUIP_CAT_COLOR[e.cat] || "#C9A876"}22`, color: EQUIP_CAT_COLOR[e.cat] || "#C9A876" }}>{e.cat}</span></td>
              <td>{e.brand || "—"}</td>
              <td className="mono">{e.qty || 0}</td>
              <td><span className="badge" style={{ background: `${EQUIP_STATUSES[e.status] || "#6E938A"}22`, color: EQUIP_STATUSES[e.status] || "#6E938A" }}>{e.status}</span></td>
              <td>
                <div style={{ display: "flex", gap: "5px", justifyContent: "flex-start" }}>
                  <button className="btn btn-ghost btn-sm" onClick={() => setModal({ type: "equipment", equipment: e })}><Pencil size={12} /></button>
                  <button className="btn btn-danger btn-sm" onClick={() => askConfirm(`حذف "${e.name}"؟`, () => deleteEquipment(e.id))}><Trash2 size={12} /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function EquipmentModal({ ctx }) {
  const { modal, setModal, addEquipment, updateEquipment } = ctx;
  const editing = modal?.equipment;
  const [f, setF] = useState(() => editing || { name: "", cat: "تصوير", brand: "", desc: "", qty: "", status: "جيد", notes: "" });
  const set = (k, v) => setF(p => ({ ...p, [k]: v }));
  const save = () => { if (!f.name.trim()) return; if (editing) updateEquipment(editing.id, f); else addEquipment(f); setModal(null); };
  return (
    <ModalShell title={editing ? "تعديل الصنف" : "إضافة صنف معدّات"} icon={Camera} onClose={() => setModal(null)}
      footer={<><button className="btn btn-ghost" onClick={() => setModal(null)}>إلغاء</button><button className="btn btn-gold" onClick={save}><Save size={14} /> حفظ</button></>}>
      <div className="frow">
        <div className="fgroup"><div className="lbl">اسم الصنف *</div><input className="inp" value={f.name} onChange={e => set("name", e.target.value)} /></div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <div className="fgroup"><div className="lbl">الفئة</div><select className="sel" value={f.cat} onChange={e => set("cat", e.target.value)}>{Object.keys(EQUIP_CAT_COLOR).map(c => <option key={c}>{c}</option>)}</select></div>
          <div className="fgroup"><div className="lbl">الماركة</div><input className="inp" value={f.brand} onChange={e => set("brand", e.target.value)} placeholder="—" /></div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <div className="fgroup"><div className="lbl">الكمية</div><input type="number" className="inp" style={{ direction: "ltr", textAlign: "right" }} value={f.qty} onChange={e => set("qty", e.target.value)} placeholder="0" /></div>
          <div className="fgroup"><div className="lbl">الحالة</div><select className="sel" value={f.status} onChange={e => set("status", e.target.value)}>{Object.keys(EQUIP_STATUSES).map(s => <option key={s}>{s}</option>)}</select></div>
        </div>
        <div className="fgroup"><div className="lbl">الوصف</div><textarea className="inp" rows={2} value={f.desc} onChange={e => set("desc", e.target.value)} style={{ resize: "vertical" }} /></div>
      </div>
    </ModalShell>
  );
}

// ════════════════════════════════════════════════════════════════
// SOFTWARE (reference)
// ════════════════════════════════════════════════════════════════
function SoftwareView() {
  return (
    <div className="page-pad">
      <div className="page-title disp">البرامج</div>
      <div className="page-sub">البرامج المعتمدة في سير عمل وكالة لكنة</div>
      <div style={{ marginTop: "10px", display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "14px" }}>
        {SOFTWARE_GROUPS.map(g => (
          <div key={g.cat} className="card" style={{ marginBottom: 0 }}>
            <SigHead icon={MonitorPlay}>{g.cat}</SigHead>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "9px" }}>
              {g.items.map(n => (
                <div key={n} style={{ background: "#081715", border: "1px solid #1E433D", borderRadius: "8px", padding: "9px 14px", fontSize: "13px", fontWeight: 600, color: "#C9DAD4" }}>{n}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// AUDIT LOG
// ════════════════════════════════════════════════════════════════
const ACTION_LABELS = {
  ADD_CLIENT: "إضافة عميل", EDIT_CLIENT: "تعديل عميل", DEL_CLIENT: "حذف عميل",
  ADD_EMPLOYEE: "إضافة موظف", EDIT_EMPLOYEE: "تعديل موظف", DEL_EMPLOYEE: "حذف موظف",
  ADD_PROJECT: "إضافة مشروع", EDIT_PROJECT: "تعديل مشروع", DEL_PROJECT: "حذف مشروع",
  ADD_SERVICE: "إضافة خدمة", EDIT_SERVICE: "تعديل خدمة", DEL_SERVICE: "حذف خدمة",
  ADD_EQUIPMENT: "إضافة معدّات", EDIT_EQUIPMENT: "تعديل معدّات", DEL_EQUIPMENT: "حذف معدّات",
  ADD_INVOICE: "إصدار فاتورة", EDIT_INVOICE: "تعديل فاتورة", DEL_INVOICE: "حذف فاتورة",
  ADD_PAYMENT: "تسجيل تحصيل", DEL_PAYMENT: "حذف تحصيل", IMPORT_BACKUP: "استيراد نسخة احتياطية",
};
function AuditLogModal({ ctx }) {
  const { modal, setModal, auditLog } = ctx;
  if (modal?.type !== "auditLog") return null;
  return (
    <ModalShell title="سجل العمليات" icon={History} onClose={() => setModal(null)} wide
      footer={<button className="btn btn-ghost" onClick={() => setModal(null)}>إغلاق</button>}>
      {auditLog.length === 0 && <div className="muted" style={{ textAlign: "center", padding: "20px 0" }}>لا توجد عمليات مسجّلة بعد</div>}
      {auditLog.slice(0, 200).map(a => (
        <div key={a.id} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #1E433D", fontSize: "12.5px" }}>
          <span style={{ color: "#ECE3D2" }}>{ACTION_LABELS[a.action] || a.action}{a.detail ? ` — ${a.detail}` : ""}</span>
          <span className="mono muted">{new Date(a.ts).toLocaleString("ar-SA")}</span>
        </div>
      ))}
    </ModalShell>
  );
}

// ════════════════════════════════════════════════════════════════
// QR CODE GENERATOR — pure-JS Model 2, versions 1-4, byte mode, EC
// level L, fixed mask 0. Verified bit-exact via an independent
// hand-written decoder round-tripped against 70+ test strings.
// ════════════════════════════════════════════════════════════════
const QR_EXP = new Array(512).fill(0);
const QR_LOG = new Array(256).fill(0);
(function qrInitGF() {
  let x = 1;
  for (let i = 0; i < 255; i++) {
    QR_EXP[i] = x; QR_LOG[x] = i;
    x <<= 1;
    if (x & 0x100) x ^= 0x11D;
  }
  for (let i = 255; i < 512; i++) QR_EXP[i] = QR_EXP[i - 255];
})();
const qrGfMul = (a, b) => (a === 0 || b === 0) ? 0 : QR_EXP[QR_LOG[a] + QR_LOG[b]];
function qrGeneratorPoly(nEc) {
  let poly = [1];
  for (let i = 0; i < nEc; i++) {
    const np = new Array(poly.length + 1).fill(0);
    for (let j = 0; j < poly.length; j++) {
      np[j] ^= poly[j];
      np[j + 1] ^= qrGfMul(poly[j], QR_EXP[i]);
    }
    poly = np;
  }
  return poly;
}
function qrRsEncode(data, nEc) {
  const gen = qrGeneratorPoly(nEc);
  const res = data.concat(new Array(nEc).fill(0));
  for (let i = 0; i < data.length; i++) {
    const coef = res[i];
    if (coef !== 0) for (let j = 0; j < gen.length; j++) res[i + j] ^= qrGfMul(gen[j], coef);
  }
  return res.slice(data.length);
}
const QR_CAP_L = { 1: [26, 7], 2: [44, 10], 3: [70, 15], 4: [100, 20] };
const QR_ALIGN_POS = { 2: 18, 3: 22, 4: 26 };

function qrBestVersion(byteLen) {
  for (const v of [1, 2, 3, 4]) {
    const [total, ec] = QR_CAP_L[v];
    const dataCw = total - ec;
    if (4 + 8 + 8 * byteLen <= dataCw * 8) return v;
  }
  return null; // too long — caller should fall back gracefully
}
function qrEncodeDataBits(bytes, version) {
  const [total, ec] = QR_CAP_L[version];
  const dataCw = total - ec;
  const capBits = dataCw * 8;
  const bits = [];
  const push = (val, n) => { for (let i = n - 1; i >= 0; i--) bits.push((val >> i) & 1); };
  push(0b0100, 4);
  push(bytes.length, 8);
  for (const b of bytes) push(b, 8);
  const term = Math.min(4, capBits - bits.length);
  for (let i = 0; i < term; i++) bits.push(0);
  while (bits.length % 8 !== 0) bits.push(0);
  const padPattern = [0xEC, 0x11];
  let pi = 0;
  while (bits.length < capBits) { push(padPattern[pi % 2], 8); pi++; }
  const trimmed = bits.slice(0, capBits);
  const codewords = [];
  for (let i = 0; i < trimmed.length; i += 8) {
    let v = 0; for (let k = 0; k < 8; k++) v = (v << 1) | trimmed[i + k];
    codewords.push(v);
  }
  return codewords;
}
function qrBuildMatrix(version) {
  const size = 17 + 4 * version;
  const matrix = Array.from({ length: size }, () => new Array(size).fill(0));
  const isFn = Array.from({ length: size }, () => new Array(size).fill(false));
  const setM = (r, c, val, fn = true) => { matrix[r][c] = val; if (fn) isFn[r][c] = true; };
  const placeFinder = (r0, c0) => {
    for (let dr = -1; dr <= 7; dr++) for (let dc = -1; dc <= 7; dc++) {
      const r = r0 + dr, c = c0 + dc;
      if (r >= 0 && r < size && c >= 0 && c < size) {
        if (dr >= 0 && dr <= 6 && dc >= 0 && dc <= 6) {
          const on = (dr === 0 || dr === 6 || dc === 0 || dc === 6 || (dr >= 2 && dr <= 4 && dc >= 2 && dc <= 4));
          setM(r, c, on ? 1 : 0);
        } else setM(r, c, 0);
      }
    }
  };
  placeFinder(0, 0); placeFinder(0, size - 7); placeFinder(size - 7, 0);
  for (let i = 8; i < size - 8; i++) { setM(6, i, i % 2 === 0 ? 1 : 0); setM(i, 6, i % 2 === 0 ? 1 : 0); }
  if (QR_ALIGN_POS[version]) {
    const ac = QR_ALIGN_POS[version];
    for (let dr = -2; dr <= 2; dr++) for (let dc = -2; dc <= 2; dc++) {
      const on = (dr === -2 || dr === 2 || dc === -2 || dc === 2 || (dr === 0 && dc === 0));
      setM(ac + dr, ac + dc, on ? 1 : 0);
    }
  }
  setM(4 * version + 9, 8, 1);
  for (let i = 0; i < 6; i++) isFn[8][i] = true;
  isFn[8][7] = true; isFn[8][8] = true; isFn[7][8] = true;
  for (let i = 0; i < 6; i++) isFn[i][8] = true;
  for (let i = size - 8; i < size; i++) isFn[8][i] = true;
  for (let i = size - 8; i < size; i++) isFn[i][8] = true;
  return { matrix, isFn, size };
}
function qrZigzagPositions(isFn, size) {
  const positions = [];
  let col = size - 1, direction = -1, row = size - 1;
  while (col > 0) {
    if (col === 6) col -= 1;
    while (true) {
      for (const c of [col, col - 1]) if (!isFn[row][c]) positions.push([row, c]);
      row += direction;
      if (row < 0 || row >= size) { direction *= -1; row += direction; break; }
    }
    col -= 2;
  }
  return positions;
}
function qrBchFormatBits(ecLevelBits, mask) {
  const data = (ecLevelBits << 3) | mask;
  const g = 0b10100110111;
  let val = data << 10;
  for (let i = 4; i >= 0; i--) if (val & (1 << (i + 10))) val ^= g << i;
  let fmt = (data << 10) | val;
  fmt ^= 0b101010000010010;
  return fmt;
}
function qrPlaceFormatInfo(matrix, size, fmtBits) {
  const bits = []; for (let i = 14; i >= 0; i--) bits.push((fmtBits >> i) & 1);
  const coordsA = [[8,0],[8,1],[8,2],[8,3],[8,4],[8,5],[8,7],[8,8],[7,8],[5,8],[4,8],[3,8],[2,8],[1,8],[0,8]];
  coordsA.forEach(([r, c], i) => { matrix[r][c] = bits[i]; });
  const coordsB = [[size-1,8],[size-2,8],[size-3,8],[size-4,8],[size-5,8],[size-6,8],[size-7,8],
    [8,size-8],[8,size-7],[8,size-6],[8,size-5],[8,size-4],[8,size-3],[8,size-2],[8,size-1]];
  coordsB.forEach(([r, c], i) => { matrix[r][c] = bits[i]; });
}
function generateQR(text) {
  const bytes = Array.from(new TextEncoder().encode(text));
  const version = qrBestVersion(bytes.length);
  if (!version) return null;
  const codewords = qrEncodeDataBits(bytes, version);
  const [total, ec] = QR_CAP_L[version];
  const ecCw = qrRsEncode(codewords, ec);
  const fullCw = codewords.concat(ecCw);
  const { matrix, isFn, size } = qrBuildMatrix(version);
  const bits = [];
  for (const cw of fullCw) for (let k = 7; k >= 0; k--) bits.push((cw >> k) & 1);
  const positions = qrZigzagPositions(isFn, size);
  positions.forEach(([r, c], idx) => {
    let bit = idx < bits.length ? bits[idx] : 0;
    if ((r + c) % 2 === 0) bit ^= 1;
    matrix[r][c] = bit;
  });
  const fmt = qrBchFormatBits(0b01, 0);
  qrPlaceFormatInfo(matrix, size, fmt);
  return { matrix, size };
}

function QRCode({ value, size = 132 }) {
  const qr = (() => { try { return generateQR(value); } catch (e) { return null; } })();
  if (!qr) return null;
  const { matrix, size: dim } = qr;
  const quiet = 2;
  const total = dim + quiet * 2;
  const cells = [];
  for (let r = 0; r < dim; r++) for (let c = 0; c < dim; c++) {
    if (matrix[r][c]) cells.push(`M${c + quiet},${r + quiet}h1v1h-1z`);
  }
  return (
    <svg viewBox={`0 0 ${total} ${total}`} width={size} height={size} style={{ background: "#fff", borderRadius: 6 }}>
      <path d={cells.join(" ")} fill="#0A1E1C" />
    </svg>
  );
}

// ════════════════════════════════════════════════════════════════
// MEMBER PROFILE — reachable from the Team list, or directly by an
// employee logging into their own account. The QR code encodes a
// laknah.com/team/{cardId} link matching the physical ID card, ready
// to resolve the moment the agency points that route at this system.
// ════════════════════════════════════════════════════════════════
function MemberProfileView({ ctx }) {
  const {
    activeEmployee, setView, isAdmin, me, setModal, askConfirm, deleteEmployee,
    tasks, addTask, updateTask, deleteTask, employeeProjects, employeeEarnings,
    updateEmployee, projects, clients,
  } = ctx;

  const [editingContact, setEditingContact] = useState(false);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  if (!activeEmployee) return <div className="page-pad"><div className="muted">لم يتم تحديد عضو فريق</div></div>;

  const isOwnProfile = !isAdmin && me?.id === activeEmployee.id;
  const showFinancials = isAdmin || isOwnProfile;
  const canManageTasks = isAdmin || isOwnProfile;
  const Icon = roleIcon(activeEmployee.role);
  const st = EMP_STATUSES[activeEmployee.status] || EMP_STATUSES.active;
  const myProjects = employeeProjects(activeEmployee.id);
  const earnings = employeeEarnings(activeEmployee.id);
  const myTasks = tasks.filter(t => t.employeeId === activeEmployee.id)
    .sort((a, b) => (a.status === "done") - (b.status === "done"));
  const qrValue = activeEmployee.cardId
    ? `https://laknah.com/team/${activeEmployee.cardId}`
    : `LAKNAH-MEMBER:${activeEmployee.id}`;

  const startEditContact = () => { setPhone(activeEmployee.phone || ""); setEmail(activeEmployee.email || ""); setEditingContact(true); };
  const saveContact = () => { updateEmployee(activeEmployee.id, { phone, email }); setEditingContact(false); };

  return (
    <div className="page-pad">
      {isAdmin && (
        <button className="btn btn-ghost btn-sm" style={{ marginBottom: "14px" }} onClick={() => setView("team")}>
          <ChevronRight size={14} /> العودة للفريق
        </button>
      )}

      {/* Header */}
      <div className="card" style={{ display: "flex", gap: "22px", alignItems: "flex-start", flexWrap: "wrap" }}>
        <div className="avatar" style={{ width: 76, height: 76, fontSize: "26px", flexShrink: 0 }}><Icon size={32} /></div>

        <div style={{ flex: 1, minWidth: 220 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "9px", flexWrap: "wrap" }}>
            <div className="disp" style={{ fontSize: "1.35rem", color: "#ECE3D2", fontWeight: 700 }}>{activeEmployee.name}</div>
            <span className="badge" style={{ background: `${st.color}22`, color: st.color }}>{st.label}</span>
          </div>
          {activeEmployee.nameEn && <div className="mono" style={{ fontSize: "12px", color: "#6E938A", direction: "ltr", textAlign: "right" }}>{activeEmployee.nameEn}</div>}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "8px", flexWrap: "wrap" }}>
            <span className="badge" style={{ background: "rgba(201,168,118,.15)", color: "#C9A876", display: "flex", alignItems: "center", gap: "4px" }}><Icon size={11} /> {roleLabel(activeEmployee.role)}</span>
            {activeEmployee.cardId && <span className="mono" style={{ fontSize: "12px", color: "#6E938A" }}>بطاقة #{activeEmployee.cardId}</span>}
            <span style={{ display: "flex", alignItems: "center", gap: "2px" }}>
              {[1, 2, 3, 4, 5].map(n => <Star key={n} size={13} color="#E0A857" fill={n <= nv(activeEmployee.rating) ? "#E0A857" : "none"} />)}
            </span>
          </div>

          <div style={{ marginTop: "14px" }}>
            {editingContact ? (
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
                <input className="inp" style={{ width: 170, direction: "ltr", textAlign: "right" }} placeholder="رقم الجوال" value={phone} onChange={e => setPhone(e.target.value)} />
                <input className="inp" style={{ width: 200, direction: "ltr", textAlign: "right" }} placeholder="البريد الإلكتروني" value={email} onChange={e => setEmail(e.target.value)} />
                <button className="btn btn-gold btn-sm" onClick={saveContact}><Save size={12} /> حفظ</button>
                <button className="btn btn-ghost btn-sm" onClick={() => setEditingContact(false)}>إلغاء</button>
              </div>
            ) : (
              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", fontSize: "12.5px", color: "#8FAFA8", alignItems: "center" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "5px" }}><Phone size={13} /> {activeEmployee.phone || "—"}</span>
                <span style={{ display: "flex", alignItems: "center", gap: "5px" }}><Mail size={13} /> {activeEmployee.email || "—"}</span>
                {(isAdmin || isOwnProfile) && <button className="btn btn-ghost btn-sm" onClick={startEditContact} style={{ fontSize: "11px" }}><Pencil size={11} /> تعديل معلومات التواصل</button>}
              </div>
            )}
          </div>
          {activeEmployee.notes && <div style={{ marginTop: "9px", fontSize: "12.5px", color: "#6E938A" }}>{activeEmployee.notes}</div>}

          {isAdmin && (
            <div style={{ display: "flex", gap: "7px", marginTop: "14px" }}>
              <button className="btn btn-ghost btn-sm" onClick={() => setModal({ type: "employee", employee: activeEmployee })}><Pencil size={13} /> تعديل البيانات والصلاحيات</button>
              <button className="btn btn-danger btn-sm" onClick={() => askConfirm(`حذف "${activeEmployee.name}" من الفريق؟`, () => { deleteEmployee(activeEmployee.id); setView("team"); })}><Trash2 size={13} /></button>
            </div>
          )}
        </div>

        <div style={{ flexShrink: 0, textAlign: "center" }}>
          <QRCode value={qrValue} size={118} />
          <div style={{ fontSize: "10px", color: "#6E938A", marginTop: "6px", maxWidth: 118 }}>ملف تعريف العضو — يطابق الباركود على البطاقة الفيزيكال</div>
        </div>
      </div>

      {/* Financials */}
      {showFinancials && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "12px", margin: "14px 0" }}>
          <div className="kpi-card"><div className="kpi-top" style={{ background: "#6FB6C9" }} /><div className="kpi-label">الراتب الشهري</div><div className="kpi-value mono" style={{ color: "#6FB6C9", fontSize: "1.3rem" }}>{nv(activeEmployee.monthlyRate) > 0 ? fmtSAR(activeEmployee.monthlyRate) : "بدون راتب ثابت"}</div></div>
          <div className="kpi-card"><div className="kpi-top" style={{ background: "#9B8FE0" }} /><div className="kpi-label">عمولات من المشاريع</div><div className="kpi-value mono" style={{ color: "#9B8FE0", fontSize: "1.3rem" }}>{fmtSAR(earnings.commissionTotal)}</div></div>
          <div className="kpi-card"><div className="kpi-top" style={{ background: "#4FBE93" }} /><div className="kpi-label">الإجمالي الشهري التقديري</div><div className="kpi-value mono" style={{ color: "#4FBE93", fontSize: "1.3rem" }}>{fmtSAR(earnings.total)}</div></div>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
        {/* Tasks */}
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
            <SigHead icon={ListChecks}>المهام ({myTasks.length})</SigHead>
            {canManageTasks && <button className="btn btn-ghost btn-sm" onClick={() => setModal({ type: "task", task: null, employeeId: activeEmployee.id })}><Plus size={13} /> مهمة</button>}
          </div>
          {myTasks.length === 0 && <div className="muted" style={{ textAlign: "center", padding: "14px 0", fontSize: "13px" }}>لا توجد مهام مسندة</div>}
          {myTasks.map(t => {
            const tst = TASK_STATUSES[t.status] || TASK_STATUSES.todo;
            const proj = projects.find(p => p.id === t.projectId);
            return (
              <div key={t.id} style={{ padding: "9px 0", borderBottom: "1px solid #1E433D" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontSize: "13px", color: "#ECE3D2", fontWeight: 600 }}>{t.title}</div>
                  <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                    {canManageTasks ? (
                      <select className="sel" style={{ padding: "3px 8px", fontSize: "11px", width: "auto" }} value={t.status} onChange={e => updateTask(t.id, { status: e.target.value })}>
                        {Object.entries(TASK_STATUSES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                      </select>
                    ) : <span className="badge" style={{ background: `${tst.color}22`, color: tst.color }}>{tst.label}</span>}
                    {isAdmin && <button className="btn btn-danger btn-sm" onClick={() => deleteTask(t.id)}><Trash2 size={11} /></button>}
                  </div>
                </div>
                <div style={{ fontSize: "11.5px", color: "#6E938A", marginTop: "3px" }}>
                  {proj && `${proj.name} · `}{t.dueDate && `يستحق ${fmtD(t.dueDate)}`}
                </div>
              </div>
            );
          })}
        </div>

        {/* Project history */}
        <div className="card">
          <SigHead icon={Briefcase}>سجل المشاريع ({myProjects.length})</SigHead>
          {myProjects.length === 0 && <div className="muted" style={{ textAlign: "center", padding: "14px 0", fontSize: "13px" }}>لم يُسند هذا العضو إلى أي مشروع بعد</div>}
          {myProjects.map(p => {
            const ps = PROJECT_STATUSES[p.status] || PROJECT_STATUSES.quote;
            const client = clients.find(c => c.id === p.clientId);
            const share = ctx.projectCommissionPerMember(p);
            return (
              <div key={p.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid #1E433D", cursor: "pointer" }}
                onClick={() => { ctx.setActiveProjectId(p.id); setView("project-detail"); }}>
                <div>
                  <div style={{ fontSize: "13px", color: "#ECE3D2", fontWeight: 600 }}>{p.name}</div>
                  <div style={{ fontSize: "11.5px", color: "#6E938A" }}>{client?.name || "—"}</div>
                </div>
                <div style={{ textAlign: "left" }}>
                  <span className="badge" style={{ background: `${ps.color}22`, color: ps.color }}>{ps.label}</span>
                  {showFinancials && <div className="mono" style={{ fontSize: "11.5px", color: "#9B8FE0", marginTop: "3px" }}>{fmtSAR(share)}</div>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {isAdmin && (
        <div className="card">
          <SigHead icon={KeyRound}>الحساب وصلاحيات الدخول</SigHead>
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", fontSize: "12.5px", color: "#8FAFA8", marginBottom: "12px" }}>
            <span>اسم المستخدم: <b className="mono" style={{ color: "#ECE3D2" }}>{activeEmployee.username || "—"}</b></span>
            <span>الرمز السري: <b className="mono" style={{ color: "#ECE3D2" }}>{activeEmployee.pin || "—"}</b></span>
          </div>
          <div className="lbl" style={{ marginBottom: "8px" }}>الأقسام المتاحة</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
            {PERMISSION_SECTIONS.map(s => (
              <span key={s.id} className="chip" style={{ cursor: "default", opacity: activeEmployee.permissions?.[s.id] ? 1 : .4 }}>
                {activeEmployee.permissions?.[s.id] ? <CircleDot size={12} /> : <Circle size={12} />} {s.label}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function TaskModal({ ctx }) {
  const { modal, setModal, addTask, updateTask, employees, projects } = ctx;
  const editing = modal?.task;
  const [f, setF] = useState(() => editing || { employeeId: modal?.employeeId || employees[0]?.id || "", title: "", projectId: "", status: "todo", dueDate: "", notes: "" });
  const set = (k, v) => setF(p => ({ ...p, [k]: v }));
  const save = () => { if (!f.title.trim() || !f.employeeId) return; if (editing) updateTask(editing.id, f); else addTask(f); setModal(null); };
  return (
    <ModalShell title={editing ? "تعديل المهمة" : "مهمة جديدة"} icon={ListChecks} onClose={() => setModal(null)}
      footer={<><button className="btn btn-ghost" onClick={() => setModal(null)}>إلغاء</button><button className="btn btn-gold" onClick={save}><Save size={14} /> حفظ</button></>}>
      <div className="frow">
        <div className="fgroup"><div className="lbl">عنوان المهمة *</div><input className="inp" value={f.title} onChange={e => set("title", e.target.value)} placeholder="مثال: مونتاج فيديو الافتتاح" /></div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <div className="fgroup"><div className="lbl">العضو المُكلَّف</div><select className="sel" value={f.employeeId} onChange={e => set("employeeId", e.target.value)}>{employees.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}</select></div>
          <div className="fgroup"><div className="lbl">المشروع المرتبط (اختياري)</div><select className="sel" value={f.projectId} onChange={e => set("projectId", e.target.value)}><option value="">— غير مرتبط —</option>{projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}</select></div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <div className="fgroup"><div className="lbl">الحالة</div><select className="sel" value={f.status} onChange={e => set("status", e.target.value)}>{Object.entries(TASK_STATUSES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}</select></div>
          <div className="fgroup"><div className="lbl">تاريخ الاستحقاق</div><input type="date" className="inp" style={{ direction: "ltr" }} value={f.dueDate} onChange={e => set("dueDate", e.target.value)} /></div>
        </div>
        <div className="fgroup"><div className="lbl">ملاحظات</div><textarea className="inp" rows={3} value={f.notes} onChange={e => set("notes", e.target.value)} style={{ resize: "vertical" }} /></div>
      </div>
    </ModalShell>
  );
}
// ════════════════════════════════════════════════════════════════
// PUBLIC WEBSITE — مطابق لمحتوى www.laknah.com بالكامل
// ════════════════════════════════════════════════════════════════

const WHATSAPP_URL = "https://api.whatsapp.com/send/?phone=966509077773";
const SOCIALS = [
  { id: "instagram", label: "Instagram", icon: Instagram, href: "https://www.instagram.com/_laknah" },
  { id: "x", label: "X", icon: Twitter, href: "https://x.com/Laknah_" },
  { id: "youtube", label: "YouTube", icon: Youtube, href: "https://www.youtube.com/@laknahagency" },
  { id: "whatsapp", label: "واتساب", icon: MessageCircle, href: WHATSAPP_URL },
];

// كل خدمة لها لون مميّز خاص بها — حتى لا يكون الموقع بلون واحد
const SERVICES = [
  {
    slug: "editing", nav: "مونتاج وتعديل الفيديو", icon: Film, accent: "#AD6A48",
    tagline: "تحرير فيديو احترافي وإنتاج فيديوهات تسويقية عالية الجودة",
    hero: "https://lh3.googleusercontent.com/sitesv/AA5AbUBZ22ATfvPXu-nu0H3WI04HwFwrO5u6SSmYasrn81xM98Pi9Ud3e8DkW-mKy3rp10rwVZ7Ghy3nXXERauAEN-IiviaVIaiWYSpe5dHtdtNQiMl05d7sGiUteJpfFqIRjvTxyTZgvpHCOEtGdP_qQ97N7F_ilFw02VYlaUVYnZEAbxwA8pXurotb-Q=w1280",
    intro: "وكالة متخصصة في تقديم خدمات مونتاج وتعديل الفيديو بجودة عالية وأسعار تنافسية. لدينا فريق من المونتيرز المحترفين ذوي الخبرة الواسعة في مجال مونتاج وتعديل الفيديو، والذين يمكنهم تحويل مقاطع الفيديو الخام إلى مقاطع فيديو احترافية جذابة ومؤثرة بمختلف اللغات.",
    blocks: [
      { h: "الخدمات المقدمة", list: ["مونتاج وتعديل مقاطع الفيديو التسويقية", "مونتاج وتعديل مقاطع الفيديو التعليمية", "مونتاج وتعديل مقاطع الفيديو الترفيهية", "مونتاج وتعديل مقاطع الفيديو الوثائقية"] },
      { h: "الجودة العالية", p: "تحرص وكالة لكنة على تقديم خدمات مونتاج وتعديل الفيديو بجودة عالية، باستخدام أحدث البرامج والتقنيات، واختيار المونتير المناسب لكل مشروع بناءً على طبيعة المشروع ومتطلبات العميل.", list: ["برامج المونتاج الاحترافية، مثل Adobe Premiere Pro و Final Cut Pro", "تقنيات المونتاج الحديثة، مثل Color Grading و Motion Graphics"] },
      { h: "الأسعار التنافسية", p: "تقدم وكالة لكنة أسعارًا تنافسية مقارنة بجودة الخدمات المقدمة، مع خصومات وعروض خاصة للعملاء الدائمين. تختلف الأسعار حسب نوع ومدة الفيديو وطبيعة المشروع ومتطلبات العميل." },
      { h: "لماذا تختار وكالة لكنة؟", p: "فريق من المونتيرز المحترفين ذوي الخبرة الواسعة، يحوّلون مقاطعك الخام إلى محتوى احترافي يترك انطباعًا لا يُنسى على جمهورك، بجودة عالية وأسعار تنافسية." },
    ],
  },
  {
    slug: "motion", nav: "موشن جرافيك", icon: Sparkles, accent: "#92495A",
    tagline: "تحويل الأفكار إلى رسوم متحركة مبتكرة لرسائل تسويقية فعّالة",
    hero: "https://lh3.googleusercontent.com/sitesv/AA5AbUBfzDbUqii6k3anZrSPtD65lnEM9OeG-G-lhAif5hvHBOZbwMpN1MMEZJndtRJ2KuivNbCnRlOevmyPyB1RmobOfQh7GzUgtCO_kZyUJ1Sv6AYFGQw1dgGq2vfbjMWp1JyneqGUnsy-zDJ1KFFjVZzklqzjCivRZhlXnTsC8xuxgv_zD5QdzKKQTRLRNJ9ix6jq09vaL_qEefdj82oYYBECacuYZTH7A9LFgO8axn4=w1280",
    intro: "وكالة متخصصة في تقديم خدمات موشن جرافيك بجودة عالية وأسعار تنافسية. لدينا فريق من المصممين والمطورين المحترفين ذوي الخبرة الواسعة، والذين يمكنهم إنشاء مقاطع فيديو متحركة جذابة ومؤثرة بمختلف اللغات.",
    blocks: [
      { h: "الخدمات المقدمة", list: ["تصميم وإنتاج مقاطع فيديو تسويقية", "تصميم وإنتاج مقاطع فيديو تعليمية", "تصميم وإنتاج مقاطع فيديو ترفيهية", "تصميم وإنتاج مقاطع فيديو تفاعلية"] },
      { h: "الجودة العالية", p: "نستخدم أحدث البرامج والتقنيات، مع اختيار المصمم والمطور المناسبين لكل مشروع بناءً على طبيعته ومتطلبات العميل.", list: ["برامج احترافية، مثل Adobe After Effects و Cinema 4D", "تقنيات حديثة، مثل Motion Graphics و VFX"] },
      { h: "الأسعار التنافسية", p: "أسعار تنافسية مقارنة بجودة الخدمة، مع خصومات للعملاء الدائمين. تختلف الأسعار حسب نوع ومدة الفيديو وطبيعة المشروع." },
      { h: "مزايا إضافية", list: ["إمكانية تعديل الفيديو حسب متطلبات العميل", "إمكانية إضافة صور أو رسومات أو مقاطع فيديو أخرى", "إمكانية ترجمة الفيديو إلى لغات أخرى"] },
      { h: "لماذا تختار وكالة لكنة؟", p: "فريق مصممين ومطورين محترفين ينشئون رسومًا متحركة جذابة ومؤثرة بمختلف اللغات، بجودة عالية وأسعار تنافسية." },
    ],
  },
  {
    slug: "graphic-design", nav: "تصميم جرافيك", icon: PenTool, accent: "#1A3634",
    tagline: "هويات بصرية جذابة ومواد تسويقية متكاملة وكافة أنواع التصاميم",
    hero: "https://lh3.googleusercontent.com/sitesv/AA5AbUA_s9YmYrrlxS9wetuMI0hljDQIJRkmtsv_Hwcj-qaTa0M2kuHOxlBjaRKXQUsNZKOkxFD95qyM8CSnjgBG7t2xkj2rJyA4lKyW8gwCrxAM61oMEgn7Us2GDsihzychatbCrBDHtRD1aeK5DQRfzne4tToWeP-v_l1N0JD6L--sMbzp7wUZTWS0i4lNu3YOhAMkAf8YByf21RQ8-QZr_LPzW6zfL0eV-5NTdfr5WdM=w1280",
    intro: "وكالة لكنة متخصصة في تقديم خدمات التصميم الجرافيكي بجودة عالية وأسعار تنافسية. لدينا فريق من المصممين المحترفين ذوي الخبرة الواسعة، والذين يمكنهم إنشاء تصميمات جرافيك بمختلف اللغات.",
    blocks: [
      { h: "الخدمات المقدمة", list: ["تصميم الشعارات", "تصميم النشرات الإعلانية", "تصميم بطاقات العمل", "تصميم البانرات", "تصميم التطبيقات"] },
      { h: "الجودة العالية", p: "أحدث البرامج والتقنيات، واختيار المصمم المناسب لكل مشروع بناءً على طبيعته ومتطلبات العميل.", list: ["برامج احترافية، مثل Adobe Photoshop و Illustrator و InDesign", "تقنيات حديثة، مثل Responsive Design و UX Design"] },
      { h: "الأسعار التنافسية", p: "أسعار تنافسية مقارنة بجودة الخدمة، مع خصومات للعملاء الدائمين. تختلف حسب نوع ومدة التصميم وطبيعة المشروع." },
      { h: "مزايا إضافية", list: ["إمكانية تعديل التصميم حسب متطلبات العميل", "إمكانية إضافة صور أو مقاطع فيديو إلى التصميم", "إمكانية ترجمة التصميم إلى لغات أخرى"] },
      { h: "لماذا تختار وكالة لكنة؟", p: "فريق مصممين محترفين ينشئون تصميمات جرافيك تترك انطباعًا لا يُنسى على جمهورك، بجودة عالية وأسعار تنافسية." },
    ],
  },
  {
    slug: "photography", nav: "التصوير", icon: Camera, accent: "#4F5778",
    tagline: "تصوير للمناسبات والأحداث، تصوير تجاري وعقاري، وتصوير جوي بالدرون",
    hero: "https://lh3.googleusercontent.com/sitesv/AA5AbUBe8UhGMdAMNASweigB__ThwDlfTK0QtuVhluXBi8SueoxOyc8R-Nt131c3Rf1zXC8LV83f644FxQ41FR5a8Cqbk7293wJ_JUDfbB9gFBKbPU5o-XlABnW_Ds8QlAEQwPPqFzUC6DOdd0I6xs3hR_xqn8DhqZSos1yyHPYIgiydVcY0U_GBEoBBQ5Hb6_g=w1280",
    intro: "وكالة لكنة هي وجهتك الأمثل للحصول على خدمات تصوير احترافية ومتكاملة. نقدم مجموعة واسعة من خدمات التصوير التي تلبي جميع احتياجاتك، بدءًا من التصوير الجوي وحتى إنتاج الأفلام الوثائقية والإعلانات.",
    blocks: [
      { h: "الخدمات المقدمة", list: [
        "التصوير الجوي: صور وفيديوهات جوية عالية الدقة باستخدام أحدث تقنيات الدرون",
        "التصوير الفوتوغرافي: لجميع المناسبات والأغراض، التجاري والمناسبات الخاصة والأزياء وغيرها",
        "إنتاج الفيديو: أفلام وثائقية وبرامج وإعلانات تجارية ومقاطع تسويقية",
        "الجرافيك: شعارات وهويات بصرية ومواد تسويقية جذابة",
      ] },
      { h: "الجودة العالية", p: "نستخدم أحدث المعدات الاحترافية، مثل كاميرات نيكون بإصدارات عالية وعدسات عالية الجودة وقاعدة تثبيت الكاميرا والدرونات، إلى جانب برامج تحرير فيديو وصوت متطورة لضمان نتائج مثالية." },
      { h: "الأسعار التنافسية", p: "نسعى لتقديم أسعار تنافسية مع الحفاظ على أعلى معايير الجودة، وعروض وخصومات تناسب مختلف الميزانيات." },
      { h: "لماذا تختار وكالة لكنة؟", list: ["الخبرة والكفاءة: فريق من المصورين المحترفين قادر على التعامل مع جميع أنواع المشاريع", "المعدات المتطورة: لضمان جودة عالية لصورك وفيديوهاتك", "الإبداع والابتكار: حلول إبداعية ومبتكرة تلبي احتياجاتك التسويقية", "الخدمة المميزة: نستمع لمتطلباتك ونسعى لتلبيتها"] },
    ],
  },
  {
    slug: "voiceover", nav: "تعليق صوتي", icon: Mic, accent: "#A9762F",
    tagline: "تعليقات صوتية احترافية جذابة ومناسبة لجمهورك المستهدف",
    hero: "https://lh3.googleusercontent.com/sitesv/AA5AbUBwJhkqlG9Nx_ij2IWiYJJ5oXJM-W1DOIsVTdIoGTTB7pso0jszdjAB_Z6Mx1W82fSZVRpyrYzqiQi_WPslY_GoP6_G6Z7YDr_Gdv7kC9mtRbPoDuDVAGXCsc8qe8BVjIGQoKCP3j4XlNv-_spY8-e2Wi0BmAglo9VwYx4Izk8O2MfqSpXrNeYhfThPJkpTHzbcqKCTs4ktbeSkz1zUpq7Gsp8afRgXMdfh-t3nNcY=w1280",
    intro: "تحرص وكالة لكنة على تقديم خدمات التعليق الصوتي بجودة عالية، باستخدام أحدث التقنيات والبرامج، واختيار المعلق الصوتي المناسب لكل مشروع بناءً على طبيعته ومتطلبات العميل.",
    blocks: [
      { h: "الخدمات المقدمة", list: ["تعليق صوتي للإعلانات التجارية", "تعليق صوتي للأفلام الوثائقية", "تعليق صوتي للمقاطع التعليمية", "تعليق صوتي للتطبيقات والمواقع الإلكترونية", "تعليق صوتي للرسوم المتحركة"] },
      { h: "الجودة العالية", list: ["أجهزة تسجيل احترافية عالية الجودة", "برامج تحرير صوتية متقدمة", "تقنيات تحسين الصوت"] },
      { h: "الأسعار التنافسية", p: "تختلف الأسعار حسب مدة النص، عدد مرات إعادة التسجيل، طبيعة المشروع، ومتطلبات العميل الإضافية مثل المؤثرات الصوتية أو الترجمة." },
      { h: "مزايا إضافية", list: ["إمكانية تعديل النص المسجل حسب رغبتك", "إمكانية إضافة مؤثرات صوتية", "إمكانية ترجمة التسجيل إلى لغات أخرى"] },
      { h: "لماذا تختار وكالة لكنة؟", list: ["جودة عالية بأحدث التقنيات والبرامج", "اختيار المعلق المناسب لمشروعك", "أسعار تنافسية", "مرونة في الخدمة", "دقة في المواعيد"] },
    ],
  },
  {
    slug: "content-writing", nav: "كتابة المحتوى", icon: FileText, accent: "#736F49",
    tagline: "محتوى مكتوب جذاب ومقنع للمواقع ومنصات التواصل الاجتماعي",
    hero: "https://lh3.googleusercontent.com/sitesv/AA5AbUDGkImn8ske6BHOpsOn2KtxBhj1tS2EL4lgeK_8G6bt1LP-jtV0YueuT9jFBH6DsE8IDmEXLYdUhm2FUPm5ShsNQU6vCodw4_BtVDEBLFJu8oFIr0YTW2ozkEa-ttYGAOtoYl-tqWR4vQ_c5D90X_sVw0qct5M2kr4m-q6UsyV1ALCiVHHeD6S-bt12pLY=w1280",
    intro: "وكالة متخصصة في تقديم خدمات كتابة المحتوى بجودة عالية. لدينا فريق من الكتاب المحترفين ذوي الخبرة الواسعة في مجال كتابة المحتوى، والذين يمكنهم كتابة المحتوى بمختلف اللغات.",
    blocks: [
      { h: "الخدمات المقدمة", list: ["كتابة المقالات", "كتابة القصص", "كتابة النصوص الإعلانية", "كتابة المحتوى التسويقي", "ترجمة المحتوى"] },
      { h: "الجودة العالية", p: "نعتمد أحدث الأساليب والتقنيات في كتابة المحتوى، مع اختيار الكاتب المناسب لكل مشروع.", list: ["البحث وجمع المعلومات", "تحليل الجمهور المستهدف", "تطوير استراتيجية محتوى", "كتابة المحتوى بأسلوب سلس وواضح", "تحرير وتحسين المحتوى"] },
      { h: "الأسعار التنافسية", p: "تختلف الأسعار حسب نوع ومدة المحتوى المطلوب وطبيعة المشروع ومتطلبات العميل." },
      { h: "مزايا إضافية", list: ["إمكانية تعديل المحتوى حسب متطلبات العميل", "إمكانية إضافة صور أو مقاطع فيديو إلى المحتوى", "إمكانية ترجمة المحتوى إلى لغات أخرى"] },
      { h: "لماذا تختار وكالة لكنة؟", p: "فريق كتاب محترفين يكتبون محتوى يترك انطباعًا لا يُنسى على جمهورك، بمختلف اللغات وبجودة عالية وأسعار تنافسية." },
    ],
  },
];

const NAV_ITEMS = [
  { id: "home", label: "الصفحة الرئيسية" },
  { id: "podcast", label: "بودكاست عزوه", children: [{ id: "podcast-guest", label: "رشح لنا ضيف للحلقات القادمة" }] },
  { id: "services", label: "خدماتنا", children: SERVICES.map(s => ({ id: `service:${s.slug}`, label: s.nav })) },
  { id: "project-form", label: "نموذج تنسيق مشروعك" },
  { id: "about", label: "من نحن" },
  { id: "news", label: "أخبارنا" },
  { id: "policies", label: "السياسات" },
  { id: "join-team", label: "انضم لفريق لكنة" },
];

const NEWS_VIDEOS = ["BvafCLPArTA", "lTCPfGx52jE", "p50HHIMH7hk", "H-ZdpDtzTU8", "fquFDytsx-Q", "0wC2u9GqejI", "TLsmdo9J_2I", "-pI3HQcSSTE", "zS0tnNklVXY"];
const PODCAST_VIDEOS = ["0Fvi7yHrDZQ", "EHz5FcNUeJE", "jX6FXR5Tl-k", "YK6HyS9THzg", "1sN2JXe_Lc0", "YunZQqklCs8"];
const PROJECT_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSd4oExB8R_hS-_-K7AtRx-mlvCaWdHVlD-Ag9XNsEBW69T1nA/viewform";
const PODCAST_GUEST_FORMS = [
  "https://docs.google.com/forms/d/e/1FAIpQLSfdtAj2ovk96QIWpfrOmCbNLtcbiCVegexH7iyb02FL3Ada1g/viewform",
  "https://docs.google.com/forms/d/e/1FAIpQLSeGYmHV_mekCg0kRpDQUHdR-97By70Bs4I3AHlI6hT5w9GtCg/viewform",
];
const JOIN_TEAM_FORMS = [
  { label: "كاتب محتوى", href: "https://docs.google.com/forms/d/e/1FAIpQLSeAtaUwMbcKp42ULlssQ6HLe6lHazblWbxzKH3wjbLa_f_17g/viewform", icon: FileText, accent: "#736F49" },
  { label: "مصور", href: "https://docs.google.com/forms/d/e/1FAIpQLSd8EiKAX2C-WTq2xNRmF-tPCeOdX-iF3AAmuwPZZONKRhUMUw/viewform", icon: Camera, accent: "#4F5778" },
  { label: "معلق صوتي", href: "https://docs.google.com/forms/d/e/1FAIpQLSdtJAXVY5T9Vy3Zt7F9cWFGbEYHr95_WEkCWOj7FY8vR2ImPw/viewform", icon: Mic, accent: "#A9762F" },
  { label: "ممنتج فيديو", href: "https://docs.google.com/forms/d/e/1FAIpQLSeZoV7IAvIorQpCryAlPNmpOXmrCOgb3a-LaRL8YLdoNrtHqQ/viewform", icon: Film, accent: "#AD6A48" },
  { label: "مصمم موشن جرافيك", href: "https://docs.google.com/forms/d/e/1FAIpQLSff9T4F3xpYLTy1c5kIZk45OUrsI7nAg29amMYyAWcWDfpeJg/viewform", icon: Sparkles, accent: "#92495A" },
  { label: "مصمم جرافيك ديزاين", href: "https://docs.google.com/forms/d/e/1FAIpQLSeAyQx7KEScSPy3tJdMARLAaXgttWN4rbzkmfoRHVsz60oBCQ/viewform", icon: PenTool, accent: "#1A3634" },
  { label: "إدارة وتسويق", href: "https://docs.google.com/forms/d/e/1FAIpQLSemy-Lbu9oiWU4xziFbRmfa0snzpyJXyI72GgDglqyOf5r1XQ/viewform", icon: Briefcase, accent: "#A9762F" },
  { label: "تخصص آخر", href: "https://docs.google.com/forms/d/e/1FAIpQLSf-rIeEyABrTaYrIodJjTuWE_eW_H8hfXMnHCo01Cac5_lZXQ/viewform", icon: Users, accent: "#4F5778" },
];

const POLICY_SECTIONS = [
  { h: "أولًا: نطاق الخدمات", p: "تقدّم الوكالة مجموعة متكاملة من الخدمات الإعلامية والإبداعية، وتشمل على سبيل المثال لا الحصر: إنتاج وتحرير الفيديو (مونتاج احترافي)، تصميم الموشن جرافيك، تصميم الجرافيك بكافة أنواعه، خدمات التصوير الاحترافي، تسجيل التعليق الصوتي، وكتابة المحتوى التسويقي والإبداعي. وتلتزم الوكالة بتنفيذ كل مشروع بشكل مخصص وفق احتياجات العميل، وبما يتماشى مع طبيعة النشاط والجمهور المستهدف." },
  { h: "ثانيًا: معايير الجودة", list: ["استخدام أحدث البرامج والتقنيات في مجالات التصميم والإنتاج", "الاعتماد على فريق عمل متخصص في كل خدمة", "مراجعة الأعمال داخليًا قبل تسليمها لضمان خلوها من الأخطاء", "الالتزام بالهوية البصرية وأهداف المشروع"], p2: "ولا يُعد أي عمل مكتملًا إلا بعد التأكد من مطابقته للمعايير المتفق عليها." },
  { h: "ثالثًا: آلية تنفيذ المشاريع (التنفيذ المرحلي)", p: "يتم تنفيذ المشاريع وفق نظام مرحلي منظم، يضمن وضوح الرؤية وتقليل الأخطاء:", list: [
    "مرحلة كتابة المحتوى: إعداد النص وفق هدف المشروع، إرسال النص للعميل للمراجعة والاعتماد، وتنفيذ التعديلات المطلوبة ضمن نطاق المرحلة",
    "مرحلة التعليق الصوتي: تسجيل الصوت بناءً على النص المعتمد، إرسال نسخة للعميل للمراجعة، والتعديلات تقتصر على الأداء الصوتي فقط (نبرة – سرعة – إحساس)",
    "مرحلة التنفيذ النهائي (المونتاج/التصميم): تنفيذ العمل النهائي بناءً على المعتمد، تسليم نسخة للمراجعة النهائية، وإجراء التعديلات ضمن الحد المتفق عليه",
  ], p2: "لا يتم الانتقال لأي مرحلة إلا بعد اعتماد المرحلة السابقة بشكل صريح من العميل." },
  { h: "رابعًا: سياسة التعديلات", list: ["يشمل كل مشروع تعديلين مجانيين لكل خدمة", "أي تعديل إضافي يُحتسب بنسبة 25% من قيمة الخدمة", "اعتماد العميل لأي مرحلة يُعد موافقة نهائية عليها"], p2: "قيود مهمة: لا يُسمح بالرجوع لمراحل سابقة بعد اعتمادها. أي طلب تعديل يتطلب الرجوع لمرحلة منتهية يُعامل كطلب جديد (خدمة إضافية)، ولا تُنفَّذ تعديلات خارج نطاق الاتفاق إلا بعد تسعيرها." },
  { h: "خامسًا: مدة التنفيذ", list: ["يتم تحديد مدة كل مشروع بناءً على حجمه وتعقيده", "يتم إبلاغ العميل بجدول زمني تقديري قبل بدء التنفيذ", "تبدأ المدة الفعلية بعد استلام كافة المواد المطلوبة من العميل"] },
  { h: "سادسًا: السياسة الصوتية والإنتاجية", p: "تلتزم الوكالة بعدم استخدام الموسيقى في الأعمال، ويتم الاعتماد بدلًا من ذلك على مؤثرات صوتية احترافية، إيقاعات غير موسيقية، وتصميم صوتي يخدم الإحساس العام للمحتوى، وذلك بهدف إنتاج محتوى متوافق مع القيم والضوابط، دون التأثير على الجودة أو التأثير الفني." },
  { h: "سابعًا: الرسوم وآلية الدفع", list: ["تحديد التكلفة بناءً على نوع الخدمة وحجم العمل ومستوى التعقيد ومدة التنفيذ", "50% دفعة مقدمة قبل بدء التنفيذ", "50% قبل التسليم النهائي"], p2: "لا يتم تسليم الملفات النهائية إلا بعد سداد كامل المستحقات." },
  { h: "ثامنًا: حقوق الملكية والاستخدام", p: "يحتفظ العميل بكافة حقوق المحتوى الذي يقدّمه، وتنتقل ملكية العمل النهائي بالكامل للعميل بعد السداد.", list: ["لا تقوم الوكالة بإعادة بيع أو استخدام العمل لأي طرف ثالث", "لا تشارك الوكالة أي تفاصيل تخص المشروع"], p2: "استثناء: يحق للوكالة عرض العمل ضمن معرض أعمالها لأغراض التسويق فقط، ما لم يطلب العميل غير ذلك." },
  { h: "تاسعًا: الخصوصية وحماية البيانات", list: ["الحفاظ التام على سرية بيانات العملاء", "عدم مشاركة أي معلومات مع أطراف خارجية", "استخدام البيانات فقط لتنفيذ المشروع وتحسين الخدمة", "اتخاذ إجراءات حماية تقنية وتنظيمية ضد أي اختراق"] },
  { h: "عاشرًا: سياسة الإلغاء والاسترجاع", p: "يحق للعميل طلب إلغاء المشروع في أي مرحلة من مراحل التنفيذ، ويتم احتساب قيمة الأعمال المنفذة حتى لحظة الإلغاء.", list: ["تُعد الدفعة المقدمة (العربون) تأكيدًا رسميًا لبدء العمل وحجز الموارد، وهي غير قابلة للاسترداد", "في حال تجاوزت قيمة الأعمال المنفذة قيمة العربون، يلتزم العميل بسداد الفرق", "في حال كان المتبقي من قيمة المشروع أكبر من حجم الأعمال المنفذة، لا يُستحق استرداد الفرق"], p2: "استثناء: في حال تعذّر استكمال المشروع لأسباب راجعة إلى الوكالة، يتم إعادة المبالغ المستحقة للعميل بما يتناسب مع الجزء غير المنفذ. ولا يتم استرداد أي مبالغ بعد تسليم المشروع كاملًا." },
  { h: "حادي عشر: حل النزاعات", p: "يتم السعي لحل أي خلاف بشكل ودي واحترافي، وفي حال تعذّر الحل، يتم اللجوء للجهات القضائية المختصة." },
  { h: "ثاني عشر: الشروط العامة", list: ["لا تتحمل الوكالة أي تأخير ناتج عن ظروف خارجة عن الإرادة (قوة قاهرة)", "يحق للوكالة تعديل هذه السياسات بما يتناسب مع تطور العمل", "يُعد التعامل مع الوكالة موافقة ضمنية على هذه الشروط"] },
  { h: "ثالث عشر: التواصل وإدارة المشروع", p: "يتم تحديد وسيلة تواصل رسمية مع العميل، ويتم الالتزام بها طوال فترة المشروع، بهدف ضمان وضوح التنفيذ وسرعة اتخاذ القرار." },
];
// ─── global site settings (header / footer / contact / social) ─
const GLOBAL_SETTINGS_KEY = "site:global-settings-v1";
const DEFAULT_GLOBAL_SETTINGS = {
  siteName: "لكنة",
  footerTagline: "وكالة سعودية متخصصة في صناعة المحتوى والدعاية والإعلان.",
  phone: "+966 50 907 7773",
  email: "info@laknah.com",
  whatsapp: "https://api.whatsapp.com/send/?phone=966509077773",
  instagram: "https://www.instagram.com/_laknah",
  x: "https://x.com/Laknah_",
  youtube: "https://www.youtube.com/@laknahagency",
  licenseText: "ترخيص إعلامي / 157346 — رقم المنشأة الموحد / 7042652458",
};

function useGlobalSettings() {
  const [settings, setSettings] = useState(DEFAULT_GLOBAL_SETTINGS);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        const val = await kvGet(GLOBAL_SETTINGS_KEY);
        if (val) setSettings({ ...DEFAULT_GLOBAL_SETTINGS, ...(typeof val === "string" ? JSON.parse(val) : val) });
      } catch {}
      setLoaded(true);
    })();
  }, []);
  const save = async (next) => {
    setSettings(next);
    try { await kvSet(GLOBAL_SETTINGS_KEY, JSON.stringify(next)); } catch {}
  };
  return { settings, loaded, save };
}

function SiteSettingsPanel({ settings, onSave, onClose }) {
  const [draft, setDraft] = useState(settings);
  const [saving, setSaving] = useState(false);
  const [flash, setFlash] = useState(false);
  const set = (patch) => setDraft(d => ({ ...d, ...patch }));
  const field = (key, label, dir) => (
    <div style={{ marginBottom: 12 }}>
      <label style={sbLabel}>{label}</label>
      <input value={draft[key] || ""} onChange={e => set({ [key]: e.target.value })} style={sbInput} dir={dir || "rtl"} />
    </div>
  );
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(38,25,15,.45)", zIndex: 5000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ background: "#fff", borderRadius: 16, width: 440, maxWidth: "92vw", maxHeight: "86vh", overflowY: "auto", padding: 22, fontFamily: "'Cairo',sans-serif", direction: "rtl", boxShadow: "0 30px 70px -20px rgba(0,0,0,.4)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ fontWeight: 700, fontSize: 16, display: "flex", alignItems: "center", gap: 7, color: "#26190F" }}><Settings size={17} /> إعدادات الموقع العامة</div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#71603F" }}><X size={20} /></button>
        </div>
        <div style={{ fontSize: 11.5, color: "#71603F", marginBottom: 14 }}>هذه الحقول تظهر في رأس وتذييل الموقع في كل الصفحات.</div>
        {field("siteName", "اسم الموقع (بجانب الشعار)")}
        {field("footerTagline", "وصف مختصر في الفوتر")}
        {field("phone", "رقم الهاتف", "ltr")}
        {field("email", "البريد الإلكتروني", "ltr")}
        {field("whatsapp", "رابط واتساب", "ltr")}
        {field("instagram", "رابط إنستغرام", "ltr")}
        {field("x", "رابط X (تويتر)", "ltr")}
        {field("youtube", "رابط يوتيوب", "ltr")}
        {field("licenseText", "نص الترخيص / رقم المنشأة")}
        <button
          onClick={async () => { setSaving(true); await onSave(draft); setSaving(false); setFlash(true); setTimeout(() => setFlash(false), 2000); }}
          disabled={saving}
          className="lk-btn lk-btn-gold"
          style={{ width: "100%", justifyContent: "center", marginTop: 8 }}
        >
          <Save size={14} /> {saving ? "جارِ الحفظ..." : "حفظ الإعدادات"}
        </button>
        {flash && <div style={{ textAlign: "center", color: "#1A3634", fontWeight: 700, fontSize: 12.5, marginTop: 10 }}>✓ تم نشر التعديلات على كل صفحات الموقع</div>}
      </div>
    </div>
  );
}

// ─── shared visual bits ─────────────────────────────────────────
function SiteStyles() {
  return (
    <style>{`
      .lk-site{
        --paper:#F2E8D2; --paper2:#E7D7AC; --paper3:#DACB97;
        --line:#D8C292; --line-soft:#E2D2A8;
        --ink:#26190F; --ink2:#4A3A26; --muted:#71603F; --dim:#B8A37C;
        --deep:#1A3634; --deep-2:#234543;
        --gold:#A9762F; --gold-br:#C99441; --gold-soft:#E9C98A;
        --clay:#AD6A48; --rose:#92495A; --teal:#1A3634; --indigo:#4F5778; --olive:#736F49;
        --success:#1A3634; --warning:#C99441; --danger:#92495A; --info:#4F5778;
        background:var(--paper); color:var(--ink); font-family:'Cairo',sans-serif; direction:rtl;
        min-height:100vh; position:relative; overflow-x:hidden;
      }
      .lk-site *{box-sizing:border-box}
      .lk-site .disp{font-family:'Baloo Bhaijaan 2',sans-serif}
      .lk-site .mono{font-family:'IBM Plex Mono',monospace}
      .lk-site a{color:inherit; text-decoration:none}
      .lk-site button{font-family:'Cairo',sans-serif}
      .lk-wrap{max-width:1140px; margin:0 auto; padding:0 24px; position:relative; z-index:2}
      .lk-eyebrow{display:flex; align-items:center; gap:10px; margin-bottom:14px}
      .lk-eyebrow .dot{width:7px; height:7px; border-radius:50%; background:var(--gold); flex-shrink:0; box-shadow:0 0 0 4px rgba(169,118,47,.18)}
      .lk-eyebrow .line{flex:0 0 40px; height:1px; background:var(--gold-br)}
      .lk-eyebrow span{font-family:'IBM Plex Mono',monospace; font-size:11.5px; letter-spacing:.16em; color:var(--gold); font-weight:600; text-transform:uppercase}
      .lk-h1{font-family:'Baloo Bhaijaan 2',sans-serif; font-weight:700; font-size:clamp(2.1rem,5vw,3.7rem); line-height:1.14; color:var(--ink)}
      .lk-grad-text{background:linear-gradient(95deg,#8F6526,var(--gold-br) 50%,#8F6526 100%); -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent}
      .lk-h2{font-family:'Baloo Bhaijaan 2',sans-serif; font-weight:700; font-size:clamp(1.7rem,3.2vw,2.4rem); color:var(--ink); margin-bottom:8px}
      .lk-lead{font-size:16.5px; line-height:1.95; color:var(--muted); max-width:62ch}
      .lk-btn{display:inline-flex; align-items:center; gap:8px; border:none; border-radius:10px; padding:14px 28px; font-weight:700; font-size:14.5px; cursor:pointer; transition:all .22s cubic-bezier(.2,.8,.2,1); white-space:nowrap}
      .lk-btn-gold{background:linear-gradient(120deg,var(--gold),var(--clay)); color:#FBF4E6; box-shadow:0 10px 26px -8px rgba(169,118,47,.55)}
      .lk-btn-gold:hover{transform:translateY(-2px); box-shadow:0 16px 32px -8px rgba(169,118,47,.6)}
      .lk-btn-ghost{background:transparent; color:var(--ink); border:1.5px solid var(--line)}
      .lk-btn-ghost:hover{border-color:var(--gold); color:var(--gold)}
      .lk-section{padding:84px 0; position:relative}
      .lk-section.tight{padding:56px 0}
      .lk-section.alt{background:var(--paper2); border-top:1px solid var(--line); border-bottom:1px solid var(--line)}
      .lk-card{background:#fff; border:1px solid var(--line); border-radius:18px; padding:26px; transition:transform .25s cubic-bezier(.2,.8,.2,1), box-shadow .25s, border-color .25s; position:relative; overflow:hidden}
      .lk-card:hover{transform:translateY(-5px); box-shadow:0 22px 44px -18px rgba(38,25,15,.25); border-color:transparent}
      .lk-card-bar{position:absolute; top:0; right:0; left:0; height:4px; border-radius:18px 18px 0 0}
      .lk-icon-badge{width:48px; height:48px; border-radius:13px; display:flex; align-items:center; justify-content:center; flex-shrink:0; color:#fff}
      .lk-grid{display:grid; gap:20px}
      .lk-grid.cols-3{grid-template-columns:repeat(3,1fr)}
      .lk-grid.cols-2{grid-template-columns:repeat(2,1fr)}
      @media (max-width:880px){.lk-grid.cols-3{grid-template-columns:repeat(2,1fr)} .lk-grid.cols-2{grid-template-columns:1fr}}
      @media (max-width:620px){.lk-grid.cols-3{grid-template-columns:1fr}}
      .lk-video-frame{position:relative; width:100%; padding-top:56.25%; border-radius:16px; overflow:hidden; background:#000; border:1px solid var(--line)}
      .lk-video-frame iframe{position:absolute; inset:0; width:100%; height:100%; border:0}
      .lk-footer{background:var(--deep); color:#E9DDC4; border-top:1px solid var(--line); padding:50px 0 22px; position:relative; z-index:2}
      .lk-header{position:sticky; top:0; z-index:200; background:rgba(242,232,210,.97); border-bottom:1px solid var(--line); transition:box-shadow .2s}
      .lk-navlink{padding:10px 4px; font-size:14px; font-weight:600; color:var(--ink2); cursor:pointer; display:flex; align-items:center; gap:4px; transition:color .15s; background:none; border:none}
      .lk-navlink:hover, .lk-navlink.on{color:var(--gold)}
      .lk-dropdown{position:absolute; top:100%; right:0; background:#fff; border:1px solid var(--line); border-radius:12px; padding:8px; min-width:230px; box-shadow:0 22px 48px -10px rgba(38,25,15,.22); opacity:0; visibility:hidden; transform:translateY(6px); transition:all .18s}
      .lk-navitem:hover .lk-dropdown{opacity:1; visibility:visible; transform:translateY(0)}
      .lk-dropdown button{display:block; width:100%; text-align:right; padding:9px 12px; border-radius:8px; background:none; border:none; color:var(--ink2); font-size:13.5px; cursor:pointer; font-family:'Cairo',sans-serif}
      .lk-dropdown button:hover{background:var(--paper2); color:var(--gold)}
      .lk-social-btn{width:36px; height:36px; border-radius:10px; display:flex; align-items:center; justify-content:center; background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.14); color:#E9DDC4; transition:all .18s}
      .lk-social-btn:hover{border-color:var(--gold-soft); color:var(--gold-soft); transform:translateY(-2px)}
      .lk-mobile-menu{position:fixed; inset:0; top:64px; background:var(--paper); z-index:190; padding:18px 24px; overflow-y:auto}

      .lk-blobs{position:absolute; inset:0; overflow:hidden; pointer-events:none; z-index:0}
      .lk-blob{position:absolute; border-radius:50%; filter:blur(40px); opacity:.28; will-change:transform; transform:translateZ(0)}
      .lk-blob.b1{width:420px; height:420px; background:var(--gold-soft); top:-120px; right:-80px; animation:lkDrift1 40s ease-in-out infinite}
      .lk-blob.b2{width:380px; height:380px; background:var(--deep); bottom:-140px; left:-100px; animation:lkDrift2 50s ease-in-out infinite}
      .lk-blob.b3{width:300px; height:300px; background:var(--gold-br); top:30%; left:40%; animation:lkDrift3 35s ease-in-out infinite}
      @keyframes lkDrift1{0%,100%{transform:translate(0,0)} 50%{transform:translate(-40px,35px)}}
      @keyframes lkDrift2{0%,100%{transform:translate(0,0)} 50%{transform:translate(35px,-30px)}}
      @keyframes lkDrift3{0%,100%{transform:translate(0,0)} 50%{transform:translate(-20px,-40px)}}

      /* ── أشياء طايرة وشلقبزات في خلفية الرئيسية ───────────────── */
      .lk-fly{position:absolute; display:flex; align-items:center; justify-content:center; width:52px; height:52px; border-radius:15px; background:#fff; box-shadow:0 18px 34px -14px rgba(38,25,15,.32); pointer-events:none; z-index:1}
      .lk-fly.spin{animation:lkFlySpin 8s linear infinite}
      .lk-fly.bob{animation:lkFlyBob 5.5s ease-in-out infinite}
      .lk-fly.flip{animation:lkFlyFlip 6.5s ease-in-out infinite}
      .lk-fly.drift{animation:lkFlyDrift 9.5s ease-in-out infinite}
      @keyframes lkFlySpin{0%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-18px) rotate(180deg)} 100%{transform:translateY(0) rotate(360deg)}}
      @keyframes lkFlyBob{0%,100%{transform:translateY(0) rotate(-4deg)} 50%{transform:translateY(-20px) rotate(6deg)}}
      @keyframes lkFlyFlip{0%,100%{transform:perspective(400px) rotateY(0deg) translateY(0)} 50%{transform:perspective(400px) rotateY(180deg) translateY(-12px)}}
      @keyframes lkFlyDrift{0%{transform:translate(0,0)} 25%{transform:translate(16px,-18px)} 50%{transform:translate(-8px,-30px)} 75%{transform:translate(-18px,-10px)} 100%{transform:translate(0,0)}}
      .lk-sparkle{position:absolute; pointer-events:none; color:var(--gold); z-index:1; animation:lkTwinkle 3s ease-in-out infinite}
      @keyframes lkTwinkle{0%,100%{opacity:.18; transform:scale(.7) rotate(0deg)} 50%{opacity:1; transform:scale(1.2) rotate(20deg)}}

      .lk-marquee{position:relative; overflow:hidden; background:var(--deep); padding:18px 0; border-top:1px solid rgba(255,255,255,.08); border-bottom:1px solid rgba(255,255,255,.08)}
      .lk-marquee-track{display:flex; width:max-content; gap:0; animation:lkMarquee 32s linear infinite}
      .lk-marquee-item{display:flex; align-items:center; gap:14px; padding:0 34px; font-family:'Baloo Bhaijaan 2',sans-serif; font-size:1.25rem; font-weight:700; white-space:nowrap; color:var(--gold-soft)}
      .lk-marquee-item .sep{width:7px; height:7px; border-radius:50%; background:var(--clay)}
      @keyframes lkMarquee{from{transform:translateX(0)} to{transform:translateX(-50%)}}

      .lk-reveal{opacity:0; transform:translateY(14px); transition:opacity .4s ease, transform .4s ease}
      .lk-reveal.in{opacity:1; transform:translateY(0)}

      @media (prefers-reduced-motion: reduce){
        .lk-blob, .lk-marquee-track, .lk-fly, .lk-sparkle{animation:none !important}
        .lk-reveal{opacity:1 !important; transform:none !important; transition:none !important}
      }
      @media (max-width:880px){ .lk-fly, .lk-sparkle{display:none} }
    `}</style>
  );
}

function Container({ children, style }) { return <div className="lk-wrap" style={style}>{children}</div>; }

function Eyebrow({ children }) {
  return <div className="lk-eyebrow"><span className="dot" /><span className="line" /><span>{children}</span></div>;
}

function Reveal({ children, delay = 0, as = "div" }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const Tag = as;
  return <Tag ref={ref} className={`lk-reveal ${inView ? "in" : ""}`} style={{ transitionDelay: `${delay}ms` }}>{children}</Tag>;
}

function SmartImage({ src, alt, accent = "var(--gold)", icon: Icon, style }) {
  const [broken, setBroken] = useState(false);
  if (broken || !src) {
    return (
      <div style={{ ...style, background: `linear-gradient(135deg, ${accent}, ${accent}99)`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", minHeight: style?.height || 120 }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(135deg, rgba(255,255,255,.09) 0 2px, transparent 2px 16px)" }} />
        {Icon && <Icon size={42} color="#fff" style={{ position: "relative", zIndex: 1, opacity: .95 }} />}
      </div>
    );
  }
  return <img src={src} alt={alt} style={style} loading="lazy" onError={() => setBroken(true)} />;
}

function YouTubeEmbed({ id, title }) {
  return (
    <div className="lk-video-frame">
      <iframe src={`https://www.youtube.com/embed/${id}`} title={title || "Laknah"} allowFullScreen loading="lazy" />
    </div>
  );
}

function SocialRow({ settings, size = 36 }) {
  const items = [
    { id: "instagram", label: "Instagram", icon: Instagram, href: settings.instagram },
    { id: "x", label: "X", icon: Twitter, href: settings.x },
    { id: "youtube", label: "YouTube", icon: Youtube, href: settings.youtube },
    { id: "whatsapp", label: "واتساب", icon: MessageCircle, href: settings.whatsapp },
  ].filter(s => s.href);
  return (
    <div style={{ display: "flex", gap: "9px" }}>
      {items.map(s => (
        <a key={s.id} href={s.href} target="_blank" rel="noopener noreferrer" className="lk-social-btn" style={{ width: size, height: size }} title={s.label}>
          <s.icon size={size * 0.46} />
        </a>
      ))}
    </div>
  );
}

function ServiceMarquee() {
  const items = [...SERVICES.map(s => s.nav), "بودكاست عزوه"];
  const track = [...items, ...items];
  return (
    <div className="lk-marquee">
      <div className="lk-marquee-track">
        {track.map((label, i) => (
          <span className="lk-marquee-item" key={i}>{label}<span className="sep" /></span>
        ))}
      </div>
    </div>
  );
}

function SiteFooter({ go, settings }) {
  return (
    <footer className="lk-footer">
      <Container>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "28px", marginBottom: "26px" }}>
          <div style={{ maxWidth: 320 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <img src={LOGO_SRC} alt={settings.siteName} style={{ height: 34 }} />
              <span className="disp" style={{ color: "var(--gold-soft)", fontSize: "1.1rem", fontWeight: 700 }}>{settings.siteName}</span>
            </div>
            <p style={{ color: "#C9B998", fontSize: "13.5px", lineHeight: 1.9 }}>{settings.footerTagline}</p>
            <div style={{ marginTop: "14px" }}><SocialRow settings={settings} /></div>
          </div>
          <div style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}>
            <div>
              <div style={{ color: "var(--gold-soft)", fontSize: "13px", fontWeight: 700, marginBottom: "12px" }}>روابط سريعة</div>
              {[["about", "من نحن"], ["services", "خدماتنا"], ["policies", "السياسات"], ["news", "أخبارنا"]].map(([id, label]) => (
                <button key={id} onClick={() => go(id)} style={{ display: "block", background: "none", border: "none", color: "#C9B998", fontSize: "13.5px", padding: "5px 0", cursor: "pointer", fontFamily: "'Cairo',sans-serif" }}>{label}</button>
              ))}
            </div>
            <div>
              <div style={{ color: "var(--gold-soft)", fontSize: "13px", fontWeight: 700, marginBottom: "12px" }}>تواصل معنا</div>
              {settings.phone && <a href={`tel:${settings.phone.replace(/\s/g, "")}`} style={{ display: "flex", alignItems: "center", gap: "7px", color: "#C9B998", fontSize: "13.5px", padding: "5px 0" }}><Phone size={13} /> {settings.phone}</a>}
              {settings.email && <a href={`mailto:${settings.email}`} style={{ display: "flex", alignItems: "center", gap: "7px", color: "#C9B998", fontSize: "13.5px", padding: "5px 0" }}><Mail size={13} /> {settings.email}</a>}
            </div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,.1)", paddingTop: "18px", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "10px", fontSize: "11.5px", color: "#8A7958" }}>
          <span>© جميع الحقوق محفوظة {new Date().getFullYear()} — وكالة {settings.siteName}</span>
          <span>{settings.licenseText}</span>
        </div>
      </Container>
    </footer>
  );
}

function SiteHeader({ page, go, settings }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <header className="lk-header">
      <Container style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        <button onClick={() => go("home")} style={{ display: "flex", alignItems: "center", gap: "9px", background: "none", border: "none", cursor: "pointer" }}>
          <img src={LOGO_SRC} alt={settings.siteName} style={{ height: 30 }} />
          <span className="disp" style={{ color: "var(--gold)", fontSize: "1.05rem", fontWeight: 700 }}>{settings.siteName}</span>
        </button>

        <nav style={{ display: "flex", alignItems: "center", gap: "22px" }} className="lk-desktop-nav">
          {NAV_ITEMS.map(item => (
            <div key={item.id} className="lk-navitem" style={{ position: "relative" }}>
              <button className={`lk-navlink ${page === item.id ? "on" : ""}`} onClick={() => go(item.id)}>
                {item.label}{item.children && <ChevronDown size={13} />}
              </button>
              {item.children && (
                <div className="lk-dropdown">
                  {item.children.map(c => <button key={c.id} onClick={() => go(c.id)}>{c.label}</button>)}
                </div>
              )}
            </div>
          ))}
        </nav>

        <button className="lk-navlink" style={{ display: "none" }} id="lk-burger" onClick={() => setMobileOpen(o => !o)}>
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </Container>

      <style>{`
        @media (max-width:920px){
          .lk-desktop-nav{display:none !important}
          #lk-burger{display:flex !important}
        }
      `}</style>

      {mobileOpen && (
        <div className="lk-mobile-menu">
          {NAV_ITEMS.map(item => (
            <div key={item.id} style={{ marginBottom: "6px" }}>
              <button onClick={() => { go(item.id); setMobileOpen(false); }} style={{ display: "block", width: "100%", textAlign: "right", background: "none", border: "none", color: page === item.id ? "var(--gold)" : "var(--ink)", fontSize: "16px", fontWeight: 700, padding: "12px 0", cursor: "pointer", fontFamily: "'Cairo',sans-serif", borderBottom: "1px solid var(--line)" }}>{item.label}</button>
              {item.children && (
                <div style={{ paddingRight: "14px" }}>
                  {item.children.map(c => (
                    <button key={c.id} onClick={() => { go(c.id); setMobileOpen(false); }} style={{ display: "block", width: "100%", textAlign: "right", background: "none", border: "none", color: "var(--muted)", fontSize: "14px", padding: "9px 0", cursor: "pointer", fontFamily: "'Cairo',sans-serif" }}>{c.label}</button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </header>
  );
}

// ════════════════════════════════════════════════════════════════
// VISUAL PAGE BUILDER v2 — كل صفحة في الموقع أصبحت لوحة عناصر قابلة
// للتحرير بالكامل (نص / صورة / زر / قائمة / حاوية / فيديو يوتيوب)
// يظهر فقط لحساب المنسق الرئيسي (نفس حساب دخول نظام الموظفين: laknah)
// ════════════════════════════════════════════════════════════════

const BLOCK_TYPES = {
  text: { label: "نص", icon: Type },
  image: { label: "صورة", icon: ImageIcon },
  button: { label: "زر", icon: Link2 },
  list: { label: "قائمة نقطية", icon: ListChecks },
  container: { label: "حاوية", icon: Square },
  youtube: { label: "فيديو يوتيوب", icon: Youtube },
};

const VAR_HEX = {
  "var(--ink)": "#26190F", "var(--gold)": "#A9762F", "var(--muted)": "#71603F",
  "var(--clay)": "#AD6A48", "var(--teal)": "#1A3634", "var(--rose)": "#92495A",
  "var(--indigo)": "#4F5778", "var(--olive)": "#736F49", "var(--gold-br)": "#C99441",
  "var(--paper2)": "#E7D7AC", "transparent": "#FFFFFF",
};
function cssColorToHex(v) { if (!v) return "#26190F"; if (v.startsWith("#")) return v; return VAR_HEX[v] || "#26190F"; }

function youtubeIdFromUrl(url) {
  if (!url) return "";
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|watch\?v=|shorts\/))([A-Za-z0-9_-]{6,})/);
  if (m) return m[1];
  return /^[A-Za-z0-9_-]{8,}$/.test(url.trim()) ? url.trim() : "";
}

const BASE_BOX = { marginTop: 0, marginBottom: 14, paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0 };

function makeBlock(type) {
  const id = uid();
  switch (type) {
    case "text": return { id, type, content: { text: "نص جديد — اضغط عليه لتعديله" }, style: { ...BASE_BOX, color: "var(--ink)", fontSize: 16, fontWeight: 400, textAlign: "right" } };
    case "image": return { id, type, content: { src: "", alt: "" }, style: { ...BASE_BOX, borderRadius: 16 } };
    case "button": return { id, type, content: { text: "زر جديد", href: "project-form" }, style: { ...BASE_BOX, background: "var(--gold)", color: "#FBF4E6", fontSize: 14, borderRadius: 10, paddingTop: 12, paddingBottom: 12, paddingLeft: 24, paddingRight: 24 } };
    case "list": return { id, type, content: { items: ["عنصر أول", "عنصر ثانٍ"] }, style: { ...BASE_BOX, color: "var(--muted)", fontSize: 14.5 } };
    case "container": return { id, type, children: [], style: { ...BASE_BOX, paddingTop: 14, paddingBottom: 14, background: "transparent", borderRadius: 0, flexDirection: "column" } };
    case "youtube": return { id, type, content: { url: "", videoId: "" }, style: { ...BASE_BOX } };
    default: return { id, type: "text", content: { text: "" }, style: { ...BASE_BOX } };
  }
}

// ── مصنع عناصر افتراضية (لبناء كل صفحة من بيانات الموقع الحالية) ─
function textBlock(text, over = {}) { return { id: uid(), type: "text", content: { text }, style: { ...BASE_BOX, color: "var(--ink)", fontSize: 16, fontWeight: 400, textAlign: "right", ...over } }; }
function headingBlock(text, over = {}) { return textBlock(text, { fontSize: 26, fontWeight: 700, marginBottom: 14, ...over }); }
function listBlock(items, over = {}) { return { id: uid(), type: "list", content: { items }, style: { ...BASE_BOX, color: "var(--muted)", fontSize: 14.5, marginBottom: 18, ...over } }; }
function imageBlock(src, alt, over = {}) { return { id: uid(), type: "image", content: { src, alt }, style: { ...BASE_BOX, borderRadius: 16, ...over } }; }
function buttonBlock(text, href, over = {}) { return { id: uid(), type: "button", content: { text, href }, style: { ...BASE_BOX, background: "var(--gold)", color: "#FBF4E6", fontSize: 14, borderRadius: 10, paddingTop: 13, paddingBottom: 13, paddingLeft: 26, paddingRight: 26, ...over } }; }
function youtubeBlock(videoId, over = {}) { return { id: uid(), type: "youtube", content: { url: `https://www.youtube.com/watch?v=${videoId}`, videoId }, style: { ...BASE_BOX, ...over } }; }
function containerBlock(children, over = {}) { return { id: uid(), type: "container", children, style: { ...BASE_BOX, background: "transparent", borderRadius: 0, flexDirection: "column", ...over } }; }

// ── أدوات تعديل شجرة العناصر (immutable tree helpers) ───────────
function updateBlockTree(list, id, patch) {
  return list.map(b => {
    if (b.id === id) return { ...b, ...patch };
    if (b.children) return { ...b, children: updateBlockTree(b.children, id, patch) };
    return b;
  });
}
function deleteBlockTree(list, id) {
  return list.filter(b => b.id !== id).map(b => b.children ? { ...b, children: deleteBlockTree(b.children, id) } : b);
}
function addChildTree(list, containerId, newBlock) {
  return list.map(b => {
    if (b.id === containerId) return { ...b, children: [...(b.children || []), newBlock] };
    if (b.children) return { ...b, children: addChildTree(b.children, containerId, newBlock) };
    return b;
  });
}
function findBlockTree(list, id) {
  for (const b of list) {
    if (b.id === id) return b;
    if (b.children) { const f = findBlockTree(b.children, id); if (f) return f; }
  }
  return null;
}

function boxStyleOf(style = {}) {
  return {
    marginTop: style.marginTop ?? 0, marginBottom: style.marginBottom ?? 0,
    marginInlineStart: style.marginLeft ?? 0, marginInlineEnd: style.marginRight ?? 0,
    paddingTop: style.paddingTop ?? 0, paddingBottom: style.paddingBottom ?? 0,
    paddingInlineStart: style.paddingLeft ?? 0, paddingInlineEnd: style.paddingRight ?? 0,
  };
}

const sbInput = { width: "100%", border: "1px solid #E2D0A4", borderRadius: 8, padding: "8px 10px", fontSize: 13, marginBottom: 12, fontFamily: "'Cairo',sans-serif", background: "#FBF6EC", color: "#26190F" };
const sbLabel = { display: "block", fontSize: 11.5, color: "#71603F", marginBottom: 5, fontWeight: 600 };
const sbColor = { width: "100%", height: 34, border: "1px solid #E2D0A4", borderRadius: 8, marginBottom: 12, cursor: "pointer", padding: 2 };
const sbCheckRow = { display: "flex", alignItems: "center", gap: 8, marginBottom: 12, fontSize: 13, color: "#4A3A26", fontWeight: 600 };

function SpacingField({ label, value, onChange }) {
  return (
    <div>
      <label style={sbLabel}>{label}</label>
      <input type="number" value={value ?? 0} onChange={e => onChange(Number(e.target.value))} style={{ ...sbInput, marginBottom: 8 }} />
    </div>
  );
}

function AddElementButtons({ onAdd, small }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {Object.entries(BLOCK_TYPES).map(([type, def]) => (
        <button key={type} onClick={() => onAdd(type)} style={{
          display: "flex", alignItems: "center", gap: 6, background: small ? "#F2E8D2" : "#fff",
          border: "1px solid #E2D0A4", borderRadius: 9, padding: small ? "6px 10px" : "9px 14px",
          fontSize: small ? 12 : 13, fontWeight: 700, color: "#4A3A26", cursor: "pointer", fontFamily: "'Cairo',sans-serif",
        }}>
          <def.icon size={small ? 13 : 15} /> {def.label}
        </button>
      ))}
    </div>
  );
}

function SettingsSidebar({ block, onChange, onClose, onDelete, onAddChild }) {
  if (!block) return null;
  const setContent = (patch) => onChange(block.id, { content: { ...block.content, ...patch } });
  const setStyle = (patch) => onChange(block.id, { style: { ...block.style, ...patch } });

  return (
    <div style={{ position: "fixed", top: 0, insetInlineEnd: 0, height: "100vh", width: 320, maxWidth: "88vw", background: "#fff", borderInlineStart: "1px solid #E2D0A4", boxShadow: "-16px 0 40px -10px rgba(38,25,15,.25)", zIndex: 3500, overflowY: "auto", padding: "18px", fontFamily: "'Cairo',sans-serif", direction: "rtl" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <div style={{ fontWeight: 700, display: "flex", alignItems: "center", gap: 6, color: "#26190F" }}><Settings size={16} /> تعديل: {BLOCK_TYPES[block.type]?.label}</div>
        <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#71603F" }}><X size={18} /></button>
      </div>

      <div style={{ fontSize: 12, fontWeight: 700, color: "#A9762F", margin: "14px 0 8px" }}>المحتوى</div>
      {block.type === "text" && (
        <textarea rows={4} value={block.content.text} onChange={e => setContent({ text: e.target.value })} style={sbInput} />
      )}
      {block.type === "list" && (
        <>
          <label style={sbLabel}>عناصر القائمة (سطر لكل عنصر)</label>
          <textarea rows={6} value={(block.content.items || []).join("\n")} onChange={e => setContent({ items: e.target.value.split("\n") })} style={sbInput} />
        </>
      )}
      {block.type === "button" && (
        <>
          <label style={sbLabel}>نص الزر</label>
          <input value={block.content.text} onChange={e => setContent({ text: e.target.value })} style={sbInput} />
          <label style={sbLabel}>الرابط — اسم صفحة داخلية (مثل services، about، project-form) أو رابط https://</label>
          <input value={block.content.href} onChange={e => setContent({ href: e.target.value })} style={sbInput} dir="ltr" />
        </>
      )}
      {block.type === "image" && (
        <>
          <label style={sbLabel}>رابط الصورة</label>
          <input value={block.content.src} onChange={e => setContent({ src: e.target.value })} style={sbInput} dir="ltr" placeholder="https://" />
          <label style={sbLabel}>نص بديل (Alt)</label>
          <input value={block.content.alt} onChange={e => setContent({ alt: e.target.value })} style={sbInput} />
        </>
      )}
      {block.type === "youtube" && (
        <>
          <label style={sbLabel}>رابط فيديو يوتيوب</label>
          <input value={block.content.url} onChange={e => { const url = e.target.value; setContent({ url, videoId: youtubeIdFromUrl(url) }); }} style={sbInput} dir="ltr" placeholder="https://www.youtube.com/watch?v=..." />
          {block.content.url ? (
            block.content.videoId
              ? <div style={{ fontSize: 11, color: "#1A3634", marginBottom: 10, fontWeight: 700 }}>✓ تم التعرف على الفيديو — المعاينة تحدّثت فورًا</div>
              : <div style={{ fontSize: 11, color: "#92495A", marginBottom: 10, fontWeight: 700 }}>تعذّر التعرف على رابط الفيديو</div>
          ) : null}
        </>
      )}
      {block.type === "container" && (
        <>
          <label style={sbLabel}>اتجاه العناصر داخل الحاوية</label>
          <select value={block.style.flexDirection || "column"} onChange={e => setStyle({ flexDirection: e.target.value })} style={sbInput}>
            <option value="column">عمودي (فوق بعض)</option>
            <option value="row">أفقي (جنب بعض)</option>
          </select>
          <div style={{ fontSize: 12, color: "#71603F", margin: "4px 0 10px" }}>عدد العناصر بداخلها: {(block.children || []).length}</div>
          <div style={{ fontSize: 11.5, color: "#71603F", marginBottom: 6, fontWeight: 600 }}>أضف عنصرًا داخل هذه الحاوية</div>
          <AddElementButtons small onAdd={(type) => onAddChild(block.id, type)} />
        </>
      )}

      <div style={{ fontSize: 12, fontWeight: 700, color: "#A9762F", margin: "20px 0 8px" }}>التنسيق</div>
      {(block.type === "text" || block.type === "button" || block.type === "list") && (
        <>
          <label style={sbLabel}>لون النص</label>
          <input type="color" value={cssColorToHex(block.style.color)} onChange={e => setStyle({ color: e.target.value })} style={sbColor} />
          <label style={sbLabel}>حجم الخط (px)</label>
          <input type="number" value={block.style.fontSize || 16} onChange={e => setStyle({ fontSize: Number(e.target.value) })} style={sbInput} />
        </>
      )}
      {block.type === "text" && (
        <>
          <label style={sbLabel}>سُمك الخط</label>
          <select value={block.style.fontWeight || 400} onChange={e => setStyle({ fontWeight: Number(e.target.value) })} style={sbInput}>
            <option value={400}>عادي</option><option value={600}>متوسط</option><option value={700}>عريض</option><option value={800}>عريض جدًا</option>
          </select>
          <label style={sbLabel}>محاذاة النص</label>
          <select value={block.style.textAlign || "right"} onChange={e => setStyle({ textAlign: e.target.value })} style={sbInput}>
            <option value="right">يمين</option><option value="center">وسط</option><option value="left">يسار</option>
          </select>
        </>
      )}
      {(block.type === "button" || block.type === "container") && (
        <>
          <label style={sbLabel}>لون الخلفية</label>
          <input type="color" value={cssColorToHex(block.style.background)} onChange={e => setStyle({ background: e.target.value })} style={sbColor} />
          <label style={sbLabel}>استدارة الحواف (px)</label>
          <input type="number" value={block.style.borderRadius ?? 10} onChange={e => setStyle({ borderRadius: Number(e.target.value) })} style={sbInput} />
        </>
      )}
      {block.type === "image" && (
        <>
          <label style={sbLabel}>استدارة الحواف (px)</label>
          <input type="number" value={block.style.borderRadius ?? 16} onChange={e => setStyle({ borderRadius: Number(e.target.value) })} style={sbInput} />
        </>
      )}
      {block.type === "container" && (
        <>
          <label style={sbCheckRow}><input type="checkbox" checked={!!block.style.card} onChange={e => setStyle({ card: e.target.checked })} /> شكل بطاقة (خلفية بيضاء + ظل + تفاعل عند المرور)</label>
          <label style={sbCheckRow}><input type="checkbox" checked={!!block.style.centered} onChange={e => setStyle({ centered: e.target.checked })} /> توسيط الحاوية أفقيًا</label>
          <label style={sbLabel}>شريط علوي بلون مميز (اتركه فاضي لإخفائه)</label>
          <input value={block.style.topBarColor || ""} onChange={e => setStyle({ topBarColor: e.target.value })} style={sbInput} dir="ltr" placeholder="#A9762F" />
          <label style={sbLabel}>أقصى عرض (px، اتركه فاضي = العرض الكامل)</label>
          <input type="number" value={block.style.maxWidth || ""} onChange={e => setStyle({ maxWidth: e.target.value ? Number(e.target.value) : undefined })} style={sbInput} />
          <label style={sbLabel}>محاذاة النص داخل الحاوية</label>
          <select value={block.style.textAlign || "inherit"} onChange={e => setStyle({ textAlign: e.target.value })} style={sbInput}>
            <option value="inherit">بدون تغيير</option><option value="right">يمين</option><option value="center">وسط</option><option value="left">يسار</option>
          </select>
        </>
      )}

      <div style={{ fontSize: 12, fontWeight: 700, color: "#A9762F", margin: "20px 0 8px" }}>المسافات (Margin / Padding)</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        <SpacingField label="هامش أعلى" value={block.style.marginTop} onChange={v => setStyle({ marginTop: v })} />
        <SpacingField label="هامش أسفل" value={block.style.marginBottom} onChange={v => setStyle({ marginBottom: v })} />
        <SpacingField label="حشو أعلى" value={block.style.paddingTop} onChange={v => setStyle({ paddingTop: v })} />
        <SpacingField label="حشو أسفل" value={block.style.paddingBottom} onChange={v => setStyle({ paddingBottom: v })} />
        <SpacingField label="حشو يمين" value={block.style.paddingRight} onChange={v => setStyle({ paddingRight: v })} />
        <SpacingField label="حشو يسار" value={block.style.paddingLeft} onChange={v => setStyle({ paddingLeft: v })} />
      </div>

      <button onClick={() => onDelete(block.id)} style={{ marginTop: 22, width: "100%", background: "#92495A", color: "#fff", border: "none", borderRadius: 9, padding: "10px", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
        <Trash2 size={14} /> حذف هذا العنصر
      </button>
    </div>
  );
}

function BlockRenderer({ block, editMode, selectedId, onSelect, onDelete, onAddChild, go }) {
  const [hover, setHover] = useState(false);
  const isSelected = editMode && selectedId === block.id;
  const box = boxStyleOf(block.style);

  let inner;
  if (block.type === "text") {
    inner = (
      <div style={{ ...box, color: block.style.color, fontSize: block.style.fontSize, fontWeight: block.style.fontWeight, textAlign: block.style.textAlign, whiteSpace: "pre-wrap", fontFamily: (block.style.fontSize || 16) >= 26 ? "'Baloo Bhaijaan 2',sans-serif" : "'Cairo',sans-serif", lineHeight: 1.6 }}>
        {block.content.text}
      </div>
    );
  } else if (block.type === "list") {
    inner = (
      <ul style={{ ...box, margin: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 9 }}>
        {(block.content.items || []).filter(s => s.trim() !== "").map((it, i) => (
          <li key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", color: block.style.color, fontSize: block.style.fontSize, lineHeight: 1.8 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--gold)", marginTop: 9, flexShrink: 0 }} />
            <span style={{ whiteSpace: "pre-wrap" }}>{it}</span>
          </li>
        ))}
      </ul>
    );
  } else if (block.type === "image") {
    inner = <SmartImage src={block.content.src} alt={block.content.alt || ""} accent="var(--gold)" icon={ImageIcon} style={{ ...box, width: "100%", borderRadius: block.style.borderRadius ?? 16, display: "block", objectFit: "cover" }} />;
  } else if (block.type === "button") {
    inner = (
      <button
        onClick={editMode ? undefined : () => {
          const href = block.content.href || "";
          if (/^https?:\/\//.test(href)) window.open(href, "_blank", "noopener,noreferrer");
          else if (href) go?.(href);
        }}
        style={{ ...box, background: block.style.background, color: block.style.color, fontSize: block.style.fontSize, fontWeight: 700, border: "none", borderRadius: block.style.borderRadius ?? 10, cursor: editMode ? "inherit" : "pointer", display: "inline-flex" }}
      >{block.content.text}</button>
    );
  } else if (block.type === "youtube") {
    inner = (
      <div style={{ ...box }}>
        {block.content.videoId
          ? <YouTubeEmbed id={block.content.videoId} title="فيديو" />
          : <div style={{ padding: "40px 16px", textAlign: "center", background: "#F2E8D2", border: "1px dashed #D8C292", borderRadius: 14, color: "#71603F", fontSize: 13 }}>
              <Youtube size={26} style={{ marginBottom: 8, opacity: .5 }} /><br />ألصق رابط يوتيوب من الشريط الجانبي لعرض الفيديو هنا
            </div>}
      </div>
    );
  } else if (block.type === "container") {
    const st = block.style;
    const isCard = !!st.card;
    const wrapStyle = {
      ...box,
      background: (isCard && (!st.background || st.background === "transparent")) ? undefined : st.background,
      borderRadius: st.borderRadius ?? (isCard ? 18 : 0),
      display: "flex", flexDirection: st.flexDirection || "column", gap: 16, flexWrap: "wrap",
      position: "relative", textAlign: st.textAlign && st.textAlign !== "inherit" ? st.textAlign : undefined,
      maxWidth: st.maxWidth || undefined,
      marginInlineStart: st.centered ? "auto" : box.marginInlineStart,
      marginInlineEnd: st.centered ? "auto" : box.marginInlineEnd,
    };
    inner = (
      <div className={isCard ? "lk-card" : undefined} style={wrapStyle}>
        {st.topBarColor && <div className={isCard ? "lk-card-bar" : undefined} style={{ position: "absolute", top: 0, insetInlineStart: 0, insetInlineEnd: 0, height: 4, background: st.topBarColor, borderRadius: isCard ? undefined : "inherit" }} />}
        {(block.children || []).map(child => (
          <div key={child.id} style={{ flex: st.flexDirection === "row" ? "1 1 300px" : "1 1 auto", minWidth: 0 }}>
            <BlockRenderer block={child} editMode={editMode} selectedId={selectedId} onSelect={onSelect} onDelete={onDelete} onAddChild={onAddChild} go={go} />
          </div>
        ))}
        {editMode && (
          <div style={{ flex: "1 1 100%" }}>
            <AddElementButtons small onAdd={(type) => onAddChild(block.id, type)} />
          </div>
        )}
      </div>
    );
  }

  if (!editMode) return inner;

  return (
    <div
      onMouseEnter={(e) => { e.stopPropagation(); setHover(true); }}
      onMouseLeave={() => setHover(false)}
      onClick={(e) => { e.stopPropagation(); onSelect(block.id); }}
      style={{ position: "relative", outline: isSelected ? "2px solid #A9762F" : hover ? "2px dashed #C99441" : "2px dashed transparent", outlineOffset: 3, borderRadius: 6, transition: "outline-color .15s" }}
    >
      {(hover || isSelected) && (
        <div style={{ position: "absolute", top: -12, insetInlineStart: 6, zIndex: 60, display: "flex", gap: 4 }}>
          <span style={{ background: "#A9762F", color: "#FBF4E6", fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 6, whiteSpace: "nowrap" }}>{BLOCK_TYPES[block.type]?.label}</span>
          <button onClick={(e) => { e.stopPropagation(); onDelete(block.id); }} style={{ background: "#92495A", color: "#fff", border: "none", borderRadius: 6, width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><Trash2 size={11} /></button>
        </div>
      )}
      {inner}
    </div>
  );
}

// ── لوحة عناصر عامة قابلة لإعادة الاستخدام في كل صفحات الموقع ────
function PageCanvas({ pageId, buildDefault, editMode, go }) {
  const [blocks, setBlocks] = useState(() => buildDefault());
  const [selectedId, setSelectedId] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedFlash, setSavedFlash] = useState(false);
  const storageKey = `site:page:${pageId}:v1`;

  useEffect(() => {
    (async () => {
      try {
        const val = await kvGet(storageKey);
        if (val) setBlocks(typeof val === "string" ? JSON.parse(val) : val);
      } catch {}
      setLoaded(true);
    })();
  }, []);

  useEffect(() => { if (!editMode) setSelectedId(null); }, [editMode]);

  const update = (id, patch) => setBlocks(prev => updateBlockTree(prev, id, patch));
  const remove = (id) => { setBlocks(prev => deleteBlockTree(prev, id)); setSelectedId(s => s === id ? null : s); };
  const addRoot = (type) => setBlocks(prev => [...prev, makeBlock(type)]);
  const addChildTo = (containerId, type) => setBlocks(prev => addChildTree(prev, containerId, makeBlock(type)));

  const handleSave = async () => {
    setSaving(true);
    try { await kvSet(storageKey, JSON.stringify(blocks)); setSavedFlash(true); setTimeout(() => setSavedFlash(false), 2500); } catch {}
    setSaving(false);
  };

  const selectedBlock = selectedId ? findBlockTree(blocks, selectedId) : null;

  if (!loaded) return <div style={{ minHeight: 160 }} />;

  return (
    <div>
      {editMode && (
        <div style={{ position: "sticky", top: 76, zIndex: 150, display: "flex", justifyContent: "center", marginBottom: 22 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, background: "#fff", border: "1px solid #E2D0A4", borderRadius: 14, padding: "9px 16px", boxShadow: "0 16px 34px -14px rgba(38,25,15,.3)", flexWrap: "wrap", justifyContent: "center" }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#71603F" }}>وضع التحرير نشط — اضغط على أي عنصر لتعديله</span>
            <button onClick={handleSave} disabled={saving} className="lk-btn lk-btn-gold" style={{ padding: "8px 16px", fontSize: 12 }}>
              <Save size={13} /> {saving ? "جارِ الحفظ..." : "حفظ هذه الصفحة"}
            </button>
            {savedFlash && <span style={{ fontSize: 12, color: "#1A3634", fontWeight: 700 }}>✓ تم نشر التعديلات على الموقع</span>}
          </div>
        </div>
      )}

      <div onClick={() => editMode && setSelectedId(null)}>
        {blocks.map((b, i) => editMode
          ? <BlockRenderer key={b.id} block={b} editMode selectedId={selectedId} onSelect={setSelectedId} onDelete={remove} onAddChild={addChildTo} go={go} />
          : <Reveal key={b.id} delay={Math.min(i, 6) * 40}><BlockRenderer block={b} editMode={false} go={go} /></Reveal>
        )}
      </div>

      {editMode && (
        <div style={{ marginTop: 22 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "var(--gold)", marginBottom: 8 }}>أضف عنصرًا جديدًا لهذه الصفحة</div>
          <AddElementButtons onAdd={addRoot} />
        </div>
      )}

      {editMode && selectedBlock && (
        <SettingsSidebar block={selectedBlock} onChange={update} onClose={() => setSelectedId(null)} onDelete={remove} onAddChild={addChildTo} />
      )}
    </div>
  );
}

function PageShell({ pageId, buildDefault, editMode, go, maxWidth = 880 }) {
  return (
    <section className="lk-section">
      <Container>
        <div style={{ maxWidth: editMode ? "100%" : maxWidth, margin: "0 auto" }}>
          <PageCanvas key={pageId} pageId={pageId} buildDefault={buildDefault} editMode={editMode} go={go} />
        </div>
      </Container>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════
// محتوى افتراضي لكل صفحة — يُبنى من بيانات الموقع الحالية، ويصبح
// بعدها قابلًا للتحرير الكامل من لوحة التحكم
// ════════════════════════════════════════════════════════════════

function buildHomeBlocks() {
  const HERO_IMG = "https://lh3.googleusercontent.com/sitesv/AA5AbUBnIllkOGoPxTvUb0DNNUgbVSEovl1M_hDqS-TViBhW3UO_6wdLxaB-dZZzZ90PbQYypU37h6JBckAJmnMehmjul9Non1SmP5n_tnZiGdmSaQ0wpN0F4N__3ZSQ48c28LtRMay7IK6qM7z_l344dWR0yEf_KLnz5_83zPulYnjhcIweok-8w7aWDDAoCXu91B6_L80E7hu8vZdtEqJdsztdhcDnj0kZFJOjL-4vnfk=w1280";
  return [
    containerBlock([
      containerBlock([
        textBlock("وكالة سعودية لصناعة المحتوى", { fontSize: 12, fontWeight: 700, color: "var(--gold)", marginBottom: 10 }),
        headingBlock("صناعة المحتوى والدعاية والإعلان", { fontSize: 40, marginBottom: 16 }),
        textBlock("تقدّم وكالة لكنة مجموعة شاملة من الخدمات الإبداعية، مثل المونتاج والتصميم والكتابة والتصوير (بما في ذلك التصوير الجوي). هدفنا الرئيسي مساعدة عملائنا على تحقيق أهدافهم التسويقية من خلال حلول إبداعية ومبتكرة.", { fontSize: 16, color: "var(--muted)", marginBottom: 26 }),
        buttonBlock("خدماتنا", "services", { marginBottom: 0 }),
      ], { flexDirection: "column", marginBottom: 0 }),
      containerBlock([
        imageBlock(HERO_IMG, "لكنة", { borderRadius: 22, marginBottom: 0 }),
      ], { flexDirection: "column", marginBottom: 0 }),
    ], { flexDirection: "row", marginTop: 10, marginBottom: 50 }),
    containerBlock([
      headingBlock("خدماتنا", { fontSize: 24, marginBottom: 6, textAlign: "center" }),
      textBlock("كل ما يحتاجه محتواك تحت سقف واحد", { fontSize: 14, color: "var(--muted)", marginBottom: 26, textAlign: "center" }),
      containerBlock(
        SERVICES.map(s => containerBlock(
          [
            textBlock(s.nav, { fontSize: 15.5, fontWeight: 700, marginBottom: 6 }),
            textBlock(s.tagline, { fontSize: 13, color: "var(--muted)", marginBottom: 14 }),
            buttonBlock("التفاصيل", `service:${s.slug}`, { background: s.accent, fontSize: 12.5, paddingTop: 9, paddingBottom: 9, paddingLeft: 16, paddingRight: 16, borderRadius: 8, marginBottom: 0 }),
          ],
          { card: true, topBarColor: s.accent, paddingTop: 22, paddingBottom: 22, paddingLeft: 22, paddingRight: 22, marginBottom: 0 }
        )),
        { flexDirection: "row", marginBottom: 0 }
      ),
    ], { background: "var(--paper2)", paddingTop: 50, paddingBottom: 50, paddingLeft: 24, paddingRight: 24, marginTop: 10, marginBottom: 0, borderRadius: 18 }),
    containerBlock([
      headingBlock("من نحن", { fontSize: 24, marginBottom: 16 }),
      youtubeBlock("OeoN02f_3eQ", { maxWidth: 760 }),
    ], { paddingTop: 60, paddingBottom: 30 }),
    containerBlock([
      textBlock("شركاء النجاح", { fontSize: 14, fontWeight: 700, color: "var(--gold)", textAlign: "center", marginBottom: 8 }),
      textBlock("نفتخر بثقة شركائنا في القطاعين العام والخاص عبر مختلف المشاريع.", { fontSize: 14, color: "var(--muted)", textAlign: "center", marginBottom: 0 }),
    ], { background: "var(--paper2)", paddingTop: 40, paddingBottom: 40, marginBottom: 0 }),
  ];
}

function buildServicesOverviewBlocks() {
  return [
    headingBlock("خدماتنا", { fontSize: 32, textAlign: "right" }),
    containerBlock(
      SERVICES.map(s => containerBlock(
        [
          imageBlock(s.hero, s.nav, { borderRadius: 10, marginBottom: 14 }),
          textBlock(s.nav, { fontSize: 16, fontWeight: 700, marginBottom: 6 }),
          textBlock(s.tagline, { fontSize: 13, color: "var(--muted)", marginBottom: 14 }),
          buttonBlock("عرض التفاصيل", `service:${s.slug}`, { background: s.accent, fontSize: 12.5, paddingTop: 9, paddingBottom: 9, paddingLeft: 16, paddingRight: 16, borderRadius: 8, marginBottom: 0 }),
        ],
        { card: true, topBarColor: s.accent, paddingTop: 20, paddingBottom: 20, paddingLeft: 20, paddingRight: 20, marginBottom: 0 }
      )),
      { flexDirection: "row", marginBottom: 0 }
    ),
  ];
}

function buildServiceDetailBlocks(s) {
  const blocks = [
    imageBlock(s.hero, s.nav, { borderRadius: 18, marginBottom: 26 }),
    textBlock("خدماتنا", { fontSize: 12, fontWeight: 700, color: "var(--gold)", marginBottom: 10 }),
    headingBlock(`تفاصيل خدمة ${s.nav} من وكالة لكنة`, { fontSize: 30 }),
    textBlock(s.intro, { fontSize: 16, color: "var(--muted)", marginBottom: 18 }),
  ];
  s.blocks.forEach(b => {
    blocks.push(headingBlock(b.h, { fontSize: 19, color: s.accent, marginBottom: 8 }));
    if (b.p) blocks.push(textBlock(b.p, { fontSize: 14.5, color: "var(--muted)", marginBottom: b.list ? 8 : 16 }));
    if (b.list) blocks.push(listBlock(b.list, { fontSize: 14.5, marginBottom: 18 }));
  });
  blocks.push(containerBlock([
    textBlock("لمزيد من المعلومات حول هذه الخدمة، تواصل معنا عبر البريد الإلكتروني أو واتساب.", { fontSize: 14, fontWeight: 700, marginBottom: 14 }),
    buttonBlock("تواصل عبر واتساب", "https://api.whatsapp.com/send/?phone=966509077773", { marginBottom: 0 }),
  ], { card: true, paddingTop: 24, paddingBottom: 24, paddingLeft: 24, paddingRight: 24, marginTop: 10, marginBottom: 0 }));
  return blocks;
}

function buildAboutBlocks() {
  const values = [
    ["الجودة", "نلتزم بتقديم أعلى معايير الجودة في جميع خدماتنا", "var(--clay)"],
    ["الابتكار", "نبحث دائمًا عن طرق جديدة ومبتكرة لتقديم خدماتنا", "var(--teal)"],
    ["الشفافية", "نتعامل مع عملائنا بمنتهى الشفافية والوضوح", "var(--indigo)"],
    ["التعاون", "نعمل كفريق واحد مع عملائنا لتحقيق أهدافهم", "var(--gold)"],
  ];
  return [
    textBlock("من نحن", { fontSize: 12, fontWeight: 700, color: "var(--gold)", marginBottom: 10 }),
    headingBlock("وكالة لكنة", { fontSize: 32 }),
    textBlock("وكالة متخصصة في صناعة المحتوى والدعاية والإعلان، نسعى جاهدين لتقديم حلول مبتكرة ومخصصة لتلبية احتياجات عملائنا المتنوعة، وذلك من خلال صناعة محتوى بصري وسمعي جذاب يلفت الانتباه ويحقق الأهداف المرجوة.", { fontSize: 16, color: "var(--muted)", marginBottom: 20 }),
    headingBlock("خدماتنا", { fontSize: 20, color: "var(--gold)", marginBottom: 8 }),
    listBlock([
      "مونتاج وتحرير الفيديو: خدمات تحرير فيديو احترافية، وإنتاج فيديوهات تسويقية عالية الجودة",
      "الموشن جرافيك: تحويل الأفكار إلى رسوم متحركة جذابة ومبتكرة لرسائل تسويقية فعّالة",
      "تصميم الجرافيك: هويات بصرية جذابة ومواد تسويقية متكاملة وأي نوع آخر من التصاميم",
      "التصوير: خدمات تصوير احترافية من المناسبات والأحداث إلى التصوير التجاري والعقاري، وكذلك التصوير الجوي",
      "التعليق الصوتي: تعليقات صوتية جذابة ومناسبة لجمهورك المستهدف",
      "كتابة المحتوى: محتوى مكتوب جذاب ومقنع لموقعك أو منشوراتك أو أي محتوى تسويقي آخر",
    ], { marginBottom: 24 }),
    headingBlock("رؤيتنا", { fontSize: 20, color: "var(--gold)", marginBottom: 8 }),
    textBlock("نسعى لأن نكون الشريك الأمثل لجميع الشركات والأفراد الذين يرغبون في تحقيق أقصى استفادة من خدمات الدعاية والإعلان. نهدف إلى تقديم حلول مبتكرة تلبي احتياجات عملائنا وتتجاوز توقعاتهم.", { fontSize: 14.5, color: "var(--muted)", marginBottom: 24 }),
    headingBlock("قيمنا", { fontSize: 20, color: "var(--gold)", marginBottom: 8 }),
    containerBlock(
      values.map(([t, d, c]) => containerBlock(
        [textBlock(t, { fontSize: 15, fontWeight: 700, color: c, marginBottom: 6 }), textBlock(d, { fontSize: 13.5, color: "var(--muted)", marginBottom: 0 })],
        { card: true, topBarColor: c, paddingTop: 20, paddingBottom: 20, paddingLeft: 20, paddingRight: 20, marginBottom: 0 }
      )),
      { flexDirection: "row", marginBottom: 24 }
    ),
    headingBlock("فريقنا", { fontSize: 20, color: "var(--gold)", marginBottom: 8 }),
    textBlock("فريق عمل وكالة لكنة يتكون من مجموعة كبيرة من المبدعين والموهوبين في مختلف المجالات، يعملون معًا لتحويل أفكارك إلى واقع ملموس.", { fontSize: 14.5, color: "var(--muted)", marginBottom: 26 }),
    containerBlock([
      textBlock("تواصل معنا اليوم لمعرفة كيف يمكننا مساعدتك في تحقيق أهدافك", { fontSize: 14, fontWeight: 700, textAlign: "center", marginBottom: 14 }),
      buttonBlock("تواصل عبر واتساب", "https://api.whatsapp.com/send/?phone=966509077773", { marginBottom: 0 }),
    ], { card: true, textAlign: "center", paddingTop: 24, paddingBottom: 24, marginBottom: 0 }),
  ];
}

function buildNewsBlocks() {
  return [
    textBlock("أخبارنا", { fontSize: 12, fontWeight: 700, color: "var(--gold)", marginBottom: 10 }),
    headingBlock("أخبارنا", { fontSize: 30 }),
    textBlock("سيُعرض في هذه الصفحة جميع الأخبار التي تخص وكالة لكنة.", { fontSize: 15, color: "var(--muted)", marginBottom: 24 }),
    containerBlock(NEWS_VIDEOS.map(id => youtubeBlock(id, { marginBottom: 0 })), { flexDirection: "row", marginBottom: 0 }),
  ];
}

function buildPoliciesBlocks() {
  const blocks = [
    textBlock("السياسات", { fontSize: 12, fontWeight: 700, color: "var(--gold)", marginBottom: 10 }),
    headingBlock("سياسات وشروط تنفيذ الخدمات — وكالة لكنة", { fontSize: 26 }),
    textBlock("تلتزم وكالة لكنة بتقديم خدمات إبداعية احترافية ترتقي بتجربة العميل وتحقق أهدافه التسويقية، وذلك من خلال إطار عمل واضح يضمن جودة التنفيذ، وانضباط المواعيد، وحفظ حقوق جميع الأطراف.", { fontSize: 15, color: "var(--muted)", marginBottom: 20 }),
  ];
  POLICY_SECTIONS.forEach(sec => {
    blocks.push(headingBlock(sec.h, { fontSize: 18, color: "var(--gold)", marginBottom: 8 }));
    if (sec.p) blocks.push(textBlock(sec.p, { fontSize: 14, color: "var(--muted)", marginBottom: sec.list ? 8 : 16 }));
    if (sec.list) blocks.push(listBlock(sec.list, { fontSize: 14, marginBottom: sec.p2 ? 8 : 16 }));
    if (sec.p2) blocks.push(textBlock(sec.p2, { fontSize: 14, color: "var(--muted)", marginBottom: 16 }));
  });
  blocks.push(containerBlock([
    textBlock("نحن لا نقدّم خدمة فقط… بل نبني تجربة متكاملة، تبدأ من الفكرة… وتنتهي بنتيجة تليق باسمك.", { fontSize: 15, fontWeight: 700, textAlign: "center", marginBottom: 0 }),
  ], { card: true, textAlign: "center", paddingTop: 22, paddingBottom: 22, marginTop: 10, marginBottom: 0 }));
  return blocks;
}

function buildJoinTeamBlocks() {
  return [
    textBlock("انضم لفريق لكنة", { fontSize: 12, fontWeight: 700, color: "var(--gold)", marginBottom: 10 }),
    headingBlock("انضم لفريق لكنة", { fontSize: 28 }),
    textBlock("اختر النموذج المناسب لتخصصك وقدّم طلبك، وسيتواصل معك فريق التوظيف في حال توافق طلبك مع الشواغر الحالية.", { fontSize: 15, color: "var(--muted)", marginBottom: 22 }),
    containerBlock(
      JOIN_TEAM_FORMS.map(f => containerBlock(
        [
          textBlock(f.label, { fontSize: 15, fontWeight: 700, marginBottom: 10 }),
          buttonBlock("تقديم على هذا التخصص", f.href, { background: f.accent, fontSize: 12.5, paddingTop: 10, paddingBottom: 10, paddingLeft: 18, paddingRight: 18, borderRadius: 8, marginBottom: 0 }),
        ],
        { card: true, topBarColor: f.accent, paddingTop: 20, paddingBottom: 20, paddingLeft: 20, paddingRight: 20, marginBottom: 0 }
      )),
      { flexDirection: "row", marginBottom: 0 }
    ),
  ];
}

function buildPodcastBlocks() {
  return [
    textBlock("بودكاست عزوه", { fontSize: 12, fontWeight: 700, color: "var(--gold)", marginBottom: 10 }),
    headingBlock("بودكاست عزوه", { fontSize: 30 }),
    buttonBlock("رشّح لنا ضيفًا للحلقات القادمة", "podcast-guest", { marginBottom: 26 }),
    containerBlock(PODCAST_VIDEOS.map(id => youtubeBlock(id, { marginBottom: 0 })), { flexDirection: "row", marginBottom: 0 }),
  ];
}

function buildPodcastGuestBlocks() {
  return [
    textBlock("بودكاست عزوه", { fontSize: 12, fontWeight: 700, color: "var(--gold)", marginBottom: 10 }),
    headingBlock("رشّح لنا ضيفًا لحلقة قادمة في بودكاست عزوه", { fontSize: 22 }),
    textBlock("اختر النموذج المناسب لإرسال ترشيحك، وسيتواصل فريقنا معك في حال كان الضيف مناسبًا لمحتوى الحلقات القادمة.", { fontSize: 15, color: "var(--muted)", marginBottom: 20 }),
    ...PODCAST_GUEST_FORMS.map((href, i) => containerBlock(
      [
        textBlock(`نموذج ترشيح ضيف ${i + 1}`, { fontSize: 14, fontWeight: 700, marginBottom: 10 }),
        buttonBlock("فتح النموذج", href, { fontSize: 12.5, paddingTop: 9, paddingBottom: 9, paddingLeft: 16, paddingRight: 16, borderRadius: 8, marginBottom: 0 }),
      ],
      { card: true, paddingTop: 18, paddingBottom: 18, paddingLeft: 18, paddingRight: 18, marginBottom: 12 }
    )),
  ];
}

function buildProjectFormBlocks() {
  return [
    textBlock("نموذج تنسيق مشروعك", { fontSize: 12, fontWeight: 700, color: "var(--gold)", textAlign: "center", marginBottom: 10 }),
    headingBlock("نسعد بخدمتك", { fontSize: 28, textAlign: "center" }),
    textBlock("يرجى تزويدنا ببعض المعلومات عن مشروعك ليتم تلبية متطلباتك على أكمل وجه إن شاء الله.", { fontSize: 15, color: "var(--muted)", textAlign: "center", marginBottom: 24 }),
    buttonBlock("تعبئة نموذج المشروع", "https://docs.google.com/forms/d/e/1FAIpQLSd4oExB8R_hS-_-K7AtRx-mlvCaWdHVlD-Ag9XNsEBW69T1nA/viewform", { marginBottom: 0 }),
  ];
}

// ─── thin page wrappers ──────────────────────────────────────────
// زينة بصرية فقط (غير قابلة للتحرير) — أشياء طايرة وشلقبزات حوالين الهيرو
function HeroMagic() {
  const flyers = [
    { Icon: Film, color: "var(--clay)", top: "4%", left: "3%", anim: "bob", delay: "0s" },
    { Icon: Camera, color: "var(--teal)", top: "10%", left: "92%", anim: "spin", delay: ".6s" },
    { Icon: Sparkles, color: "var(--rose)", top: "46%", left: "96%", anim: "drift", delay: "1.1s" },
    { Icon: Mic, color: "var(--gold)", top: "78%", left: "90%", anim: "flip", delay: "1.7s" },
    { Icon: PenTool, color: "var(--indigo)", top: "70%", left: "4%", anim: "bob", delay: "2.1s" },
    { Icon: Megaphone, color: "var(--clay)", top: "34%", left: "1%", anim: "spin", delay: "2.6s" },
    { Icon: FileText, color: "var(--olive)", top: "2%", left: "48%", anim: "drift", delay: "1.4s" },
  ];
  const sparkles = [
    { top: "8%", left: "20%", size: 16, delay: "0s" }, { top: "18%", left: "78%", size: 12, delay: ".5s" },
    { top: "58%", left: "12%", size: 14, delay: "1s" }, { top: "64%", left: "82%", size: 18, delay: "1.4s" },
    { top: "30%", left: "60%", size: 11, delay: "1.9s" }, { top: "84%", left: "55%", size: 13, delay: "2.3s" },
    { top: "12%", left: "40%", size: 10, delay: "2.7s" }, { top: "48%", left: "30%", size: 15, delay: "3.1s" },
  ];
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {flyers.map((f, i) => (
        <div key={i} className={`lk-fly ${f.anim}`} style={{ top: f.top, insetInlineStart: f.left, color: f.color, animationDelay: f.delay }}>
          <f.Icon size={22} />
        </div>
      ))}
      {sparkles.map((s, i) => (
        <Star key={i} className="lk-sparkle" size={s.size} style={{ top: s.top, insetInlineStart: s.left, animationDelay: s.delay }} fill="currentColor" />
      ))}
    </div>
  );
}

function HomePage({ go, editMode }) {
  return (
    <>
      <div style={{ position: "relative" }}>
        <div className="lk-blobs" style={{ height: 620 }}>
          <div className="lk-blob b1" /><div className="lk-blob b2" /><div className="lk-blob b3" />
        </div>
        {!editMode && (
          <div style={{ position: "absolute", top: 0, insetInlineStart: 0, insetInlineEnd: 0, height: 620 }}>
            <HeroMagic />
          </div>
        )}
        <PageShell pageId="home" buildDefault={buildHomeBlocks} editMode={editMode} go={go} maxWidth={1100} />
      </div>
      <ServiceMarquee />
    </>
  );
}
function PodcastPage({ go, editMode }) { return <PageShell pageId="podcast" buildDefault={buildPodcastBlocks} editMode={editMode} go={go} maxWidth={1100} />; }
function PodcastGuestPage({ go, editMode }) { return <PageShell pageId="podcast-guest" buildDefault={buildPodcastGuestBlocks} editMode={editMode} go={go} maxWidth={640} />; }
function ServicesPage({ go, editMode }) { return <PageShell pageId="services" buildDefault={buildServicesOverviewBlocks} editMode={editMode} go={go} maxWidth={1100} />; }
function ServiceDetailPage({ slug, go, editMode }) {
  const s = SERVICES.find(x => x.slug === slug) || SERVICES[0];
  return <PageShell pageId={`service:${slug}`} buildDefault={() => buildServiceDetailBlocks(s)} editMode={editMode} go={go} maxWidth={820} />;
}
function ProjectFormPage({ go, editMode }) { return <PageShell pageId="project-form" buildDefault={buildProjectFormBlocks} editMode={editMode} go={go} maxWidth={640} />; }
function AboutPage({ go, editMode }) { return <PageShell pageId="about" buildDefault={buildAboutBlocks} editMode={editMode} go={go} maxWidth={800} />; }
function NewsPage({ go, editMode }) { return <PageShell pageId="news" buildDefault={buildNewsBlocks} editMode={editMode} go={go} maxWidth={1100} />; }
function PoliciesPage({ go, editMode }) { return <PageShell pageId="policies" buildDefault={buildPoliciesBlocks} editMode={editMode} go={go} maxWidth={800} />; }
function JoinTeamPage({ go, editMode }) { return <PageShell pageId="join-team" buildDefault={buildJoinTeamBlocks} editMode={editMode} go={go} maxWidth={900} />; }

// ─── shell ─────────────────────────────────────────────────────
function PublicSite({ editMode, isMasterAdmin, settingsOpen, onCloseSettings }) {
  const [page, setPage] = useState("home");
  const go = (id) => { setPage(id); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const { settings, loaded, save } = useGlobalSettings();

  let body;
  if (page.startsWith("service:")) body = <ServiceDetailPage slug={page.split(":")[1]} go={go} editMode={editMode} />;
  else if (page === "podcast") body = <PodcastPage go={go} editMode={editMode} />;
  else if (page === "podcast-guest") body = <PodcastGuestPage go={go} editMode={editMode} />;
  else if (page === "services") body = <ServicesPage go={go} editMode={editMode} />;
  else if (page === "project-form") body = <ProjectFormPage go={go} editMode={editMode} />;
  else if (page === "about") body = <AboutPage go={go} editMode={editMode} />;
  else if (page === "news") body = <NewsPage go={go} editMode={editMode} />;
  else if (page === "policies") body = <PoliciesPage go={go} editMode={editMode} />;
  else if (page === "join-team") body = <JoinTeamPage go={go} editMode={editMode} />;
  else body = <HomePage go={go} editMode={editMode} />;

  return (
    <div className="lk-site">
      <SiteStyles />
      {loaded && (
        <>
          <SiteHeader page={page} go={go} settings={settings} />
          {body}
          <SiteFooter go={go} settings={settings} />
        </>
      )}
      {settingsOpen && isMasterAdmin && (
        <SiteSettingsPanel settings={settings} onSave={save} onClose={onCloseSettings} />
      )}
    </div>
  );
}

function EmployeesSection({ onExit, onAuthChange, isMasterAdmin, onEditSite }) {
  return (
    <div style={{ position: "relative" }}>
      <button onClick={onExit} style={{
        position: "fixed", top: 14, insetInlineStart: 14, zIndex: 4000,
        display: "flex", alignItems: "center", gap: "7px", background: "#102B27",
        border: "1px solid #C9A876", color: "#C9A876", borderRadius: "9px",
        padding: "8px 14px", fontSize: "12.5px", fontWeight: 700, cursor: "pointer",
        fontFamily: "'Cairo',sans-serif", boxShadow: "0 10px 26px rgba(0,0,0,.4)",
      }}>
        <ArrowUpLeft size={14} style={{ transform: "rotate(225deg)" }} /> الموقع الرئيسي
      </button>
      {isMasterAdmin && (
        <button onClick={onEditSite} style={{
          position: "fixed", top: 14, insetInlineStart: 168, zIndex: 4000,
          display: "flex", alignItems: "center", gap: "7px", background: "#1A3634",
          border: "1px solid #1A3634", color: "#E9C98A", borderRadius: "9px",
          padding: "8px 14px", fontSize: "12.5px", fontWeight: 700, cursor: "pointer",
          fontFamily: "'Cairo',sans-serif", boxShadow: "0 10px 26px rgba(0,0,0,.4)",
        }}>
          <Pencil size={14} /> تحرير الموقع
        </button>
      )}
      <EmployeeSystem onAuthChange={onAuthChange} />
    </div>
  );
}

// زر دخول الموظفين — مقصود أن يكون غير لافت للزوار، شفاف جدًا، بلا نص،
// يظهر بوضوح فقط عند تمرير الماوس/اللمس عليه لمن يعرف مكانه بالضبط.
function HiddenStaffAccess({ onOpen }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onOpen}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      title="دخول فريق العمل"
      style={{
        position: "fixed", bottom: 16, insetInlineStart: 16, zIndex: 500,
        width: 34, height: 34, borderRadius: "50%", border: "none", cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        background: hover ? "#26190F" : "transparent",
        color: hover ? "#E9C98A" : "rgba(38,25,15,.22)",
        boxShadow: hover ? "0 10px 24px -6px rgba(38,25,15,.45)" : "none",
        transition: "all .25s ease",
      }}
    >
      <KeyRound size={14} />
    </button>
  );
}

export default function App() {
  const [mode, setMode] = useState("site"); // 'site' | 'employees'
  const [authUser, setAuthUser] = useState(null); // synced from EmployeeSystem's own login state
  const [editMode, setEditMode] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const isMasterAdmin = authUser?.type === "admin"; // = حساب المنسق الرئيسي (laknah / Laknah@2026)

  if (mode === "employees") {
    return (
      <EmployeesSection
        onExit={() => setMode("site")}
        onAuthChange={setAuthUser}
        isMasterAdmin={isMasterAdmin}
        onEditSite={() => { setMode("site"); setEditMode(true); }}
      />
    );
  }

  return (
    <>
      <PublicSite editMode={editMode && isMasterAdmin} isMasterAdmin={isMasterAdmin} settingsOpen={settingsOpen} onCloseSettings={() => setSettingsOpen(false)} />
      <HiddenStaffAccess onOpen={() => setMode("employees")} />
      {isMasterAdmin && (
        <div style={{ position: "fixed", bottom: 18, insetInlineEnd: 18, zIndex: 600, display: "flex", gap: 10 }}>
          {editMode && (
            <button
              onClick={() => setSettingsOpen(true)}
              style={{
                display: "flex", alignItems: "center", gap: "8px", background: "#fff", color: "#26190F",
                border: "1px solid #D8C292", borderRadius: "30px", padding: "11px 18px", fontSize: "13px",
                fontWeight: 700, cursor: "pointer", fontFamily: "'Cairo',sans-serif",
                boxShadow: "0 14px 32px -10px rgba(38,25,15,.35)",
              }}
            >
              <Settings size={14} /> إعدادات عامة
            </button>
          )}
          <button
            onClick={() => setEditMode(v => !v)}
            style={{
              display: "flex", alignItems: "center", gap: "8px",
              background: editMode ? "#1A3634" : "#fff",
              color: editMode ? "#E9C98A" : "#26190F",
              border: "1px solid #D8C292", borderRadius: "30px",
              padding: "11px 18px", fontSize: "13px", fontWeight: 700, cursor: "pointer",
              fontFamily: "'Cairo',sans-serif", boxShadow: "0 14px 32px -10px rgba(38,25,15,.35)",
              transition: "all .2s",
            }}
          >
            <Pencil size={14} /> {editMode ? "إيقاف وضع التحرير" : "تفعيل وضع التحرير"}
          </button>
        </div>
      )}
    </>
  );
}
