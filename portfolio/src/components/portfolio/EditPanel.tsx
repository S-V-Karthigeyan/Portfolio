import { useId, useState } from "react";
import {
  Lock,
  Eye,
  EyeOff,
  X,
  Save,
  RotateCcw,
  Plus,
  Trash2,
  Briefcase,
  GraduationCap,
  Sparkles,
  FolderKanban,
  Pencil,
  User,
  Info,
  Mail,
  Images,
} from "lucide-react";
import { usePortfolioContent, type PortfolioContent, type ProjectItem, type GalleryShot } from "./content";
import { uploadPortfolioImage, deletePortfolioImage } from "@/lib/images";

// Change this before publishing the site — it's stored in plain text in the
// bundle, so treat it as a light deterrent (keeps casual visitors out of the
// editor), not real access control.
const PASSCODE = "karthigeyan20";

const GOLD_GRADIENT = "linear-gradient(90deg, #C99A4A 0%, #F4D999 100%)";

const inputClass =
  "w-full rounded-lg border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-sm text-white outline-none placeholder:text-white/25 transition-colors focus:border-[#F4D999]/50 focus:bg-white/[0.06]";

const LONG_FIELDS = new Set(["desc", "text", "blurb"]);

const blankProject = (n: number): ProjectItem => ({
  number: String(n).padStart(2, "0"),
  name: "",
  category: "",
  desc: "",
  image1: "",
  image2: "",
  imageMain: "",
  url: "",
});

export default function EditPanel() {
  const { content, setContent, reset, isBackendConnected } = usePortfolioContent();
  const [open, setOpen] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [code, setCode] = useState("");
  const [showCode, setShowCode] = useState(false);
  const [error, setError] = useState("");
  const [draft, setDraft] = useState<PortfolioContent>(content);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "local-only" | "error">("idle");
  const [saveMessage, setSaveMessage] = useState("");

  function openPanel() {
    setDraft(content);
    setCode("");
    setShowCode(false);
    setError("");
    setSaveState("idle");
    setOpen(true);
  }

  function closePanel() {
    setOpen(false);
    setUnlocked(false);
  }

  function tryUnlock() {
    if (code === PASSCODE) {
      setUnlocked(true);
      setDraft(content);
      setError("");
    } else {
      setError("That passcode isn't right — try again.");
    }
  }

  async function handleSave() {
    setSaveState("saving");
    const result = await setContent(draft);
    if (result.ok) {
      setSaveState("saved");
      setSaveMessage("Saved — live for every visitor.");
    } else if (!isBackendConnected) {
      setSaveState("local-only");
      setSaveMessage("Saved in this browser only — connect Supabase to make edits live for everyone.");
    } else {
      setSaveState("error");
      setSaveMessage(result.error);
    }
  }

  async function handleReset() {
    const result = await reset();
    setDraft(content);
    if (result.ok) {
      setSaveState("saved");
      setSaveMessage("Reset to defaults.");
    }
  }

  function updateListItem<K extends "experience" | "education" | "skills">(
    key: K,
    index: number,
    field: string,
    value: string,
  ) {
    const list = [...draft[key]] as unknown as Record<string, string>[];
    list[index] = { ...list[index], [field]: value };
    setDraft({ ...draft, [key]: list });
  }

  function addListItem(key: "experience" | "education" | "skills") {
    const blanks: Record<string, Record<string, string>> = {
      experience: { role: "", company: "", period: "", desc: "" },
      education: { degree: "", institution: "", period: "", desc: "" },
      skills: { number: String(draft.skills.length + 1).padStart(2, "0"), title: "", desc: "", stack: "" },
    };
    setDraft({ ...draft, [key]: [...(draft[key] as unknown[]), blanks[key]] } as PortfolioContent);
  }

  function removeListItem(key: "experience" | "education" | "skills", index: number) {
    setDraft({
      ...draft,
      [key]: (draft[key] as unknown[]).filter((_, i) => i !== index),
    } as PortfolioContent);
  }

  return (
    <>
      <button
        onClick={openPanel}
        aria-label="Edit details"
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full border border-white/15 bg-black/70 px-4 py-2.5 text-xs font-medium uppercase tracking-widest text-[#D7E2EA] backdrop-blur-md transition-all hover:border-[#F4D999]/40 hover:text-[#F4D999]"
      >
        <Pencil size={13} strokeWidth={2} />
        Edit
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          {!unlocked ? (
            <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#111214] p-8 shadow-2xl">
              <div className="mb-6 flex flex-col items-center gap-3 text-center">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-full"
                  style={{ background: "rgba(244, 217, 153, 0.1)" }}
                >
                  <Lock size={20} className="text-[#F4D999]" strokeWidth={1.75} />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">Protected area</h3>
                  <p className="mt-1 text-xs text-white/45">Enter the passcode to edit portfolio content.</p>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="relative">
                  <input
                    type={showCode ? "text" : "password"}
                    value={code}
                    onChange={(e) => {
                      setCode(e.target.value);
                      setError("");
                    }}
                    onKeyDown={(e) => e.key === "Enter" && tryUnlock()}
                    placeholder="Passcode"
                    autoFocus
                    className={`${inputClass} pr-11`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowCode((v) => !v)}
                    aria-label={showCode ? "Hide passcode" : "Show passcode"}
                    className="absolute right-1 top-1/2 -translate-y-1/2 rounded-md p-2 text-white/40 transition-colors hover:text-white"
                  >
                    {showCode ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                {error && <p className="text-xs text-red-400">{error}</p>}

                <div className="mt-1 flex gap-2">
                  <button
                    onClick={closePanel}
                    className="flex-1 rounded-lg border border-white/10 px-4 py-2.5 text-xs font-medium uppercase tracking-widest text-white/60 transition-colors hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={tryUnlock}
                    className="flex-1 rounded-lg px-4 py-2.5 text-xs font-semibold uppercase tracking-widest text-[#0C0C0C] transition-transform hover:scale-[1.02]"
                    style={{ background: GOLD_GRADIENT }}
                  >
                    Unlock
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex max-h-[88vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#111214] shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.02] px-6 py-4">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-widest text-white">Edit portfolio</h3>
                  <p className="mt-0.5 text-xs text-white/40">Changes save live for every visitor.</p>
                </div>
                <button
                  onClick={closePanel}
                  aria-label="Close"
                  className="rounded-full p-2 text-white/50 transition-colors hover:bg-white/5 hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-6">
                <div className="flex flex-col gap-9">
                  <HeroGroup draft={draft} setDraft={setDraft} />
                  <AboutGroup draft={draft} setDraft={setDraft} />
                  <ContactGroup draft={draft} setDraft={setDraft} />

                  <Group
                    title="Internships / Experience"
                    icon={<Briefcase size={15} />}
                    items={draft.experience as unknown as Record<string, string>[]}
                    fields={["role", "company", "period", "desc"]}
                    onChange={(i, f, v) => updateListItem("experience", i, f, v)}
                    onRemove={(i) => removeListItem("experience", i)}
                    onAdd={() => addListItem("experience")}
                  />
                  <Group
                    title="Education"
                    icon={<GraduationCap size={15} />}
                    items={draft.education as unknown as Record<string, string>[]}
                    fields={["degree", "institution", "period", "desc"]}
                    onChange={(i, f, v) => updateListItem("education", i, f, v)}
                    onRemove={(i) => removeListItem("education", i)}
                    onAdd={() => addListItem("education")}
                  />
                  <Group
                    title="Skills"
                    icon={<Sparkles size={15} />}
                    items={draft.skills as unknown as Record<string, string>[]}
                    fields={["number", "title", "desc", "stack"]}
                    onChange={(i, f, v) => updateListItem("skills", i, f, v)}
                    onRemove={(i) => removeListItem("skills", i)}
                    onAdd={() => addListItem("skills")}
                  />

                  <ProjectsGroup draft={draft} setDraft={setDraft} />
                  <GalleryGroup draft={draft} setDraft={setDraft} />
                  <MarqueeGroup draft={draft} setDraft={setDraft} />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 border-t border-white/10 bg-white/[0.02] px-6 py-4">
                <button
                  onClick={handleSave}
                  disabled={saveState === "saving"}
                  className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-[#0C0C0C] transition-transform hover:scale-[1.02] disabled:opacity-60"
                  style={{ background: GOLD_GRADIENT }}
                >
                  <Save size={14} />
                  {saveState === "saving" ? "Saving…" : "Save changes"}
                </button>
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-5 py-2.5 text-xs uppercase tracking-widest text-white/60 transition-colors hover:border-white/30 hover:text-white"
                >
                  <RotateCcw size={14} />
                  Reset to default
                </button>
                {saveState !== "idle" && saveState !== "saving" && (
                  <span
                    className={`ml-auto max-w-sm text-right text-xs uppercase tracking-widest ${
                      saveState === "error" ? "text-red-400" : "text-[#F4D999]/80"
                    }`}
                  >
                    {saveMessage}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

/* ---------------------------------- Image field ---------------------------------- */

function ImageField({
  label,
  value,
  onChange,
  folder,
  compact,
}: {
  label?: string;
  value: string;
  onChange: (url: string) => void;
  folder: string;
  compact?: boolean;
}) {
  const inputId = useId();
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setUploading(true);
    setUploadError("");
    try {
      const url = await uploadPortfolioImage(file, folder);
      onChange(url);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  async function handleRemove() {
    const previous = value;
    onChange("");
    if (previous) void deletePortfolioImage(previous);
  }

  return (
    <div className="flex flex-col gap-1.5">
      {label && <span className="text-[10px] font-medium uppercase tracking-widest text-white/35">{label}</span>}
      <div className="flex items-center gap-3">
        <div
          className={`shrink-0 overflow-hidden rounded-lg border border-white/10 bg-white/[0.03] ${
            compact ? "h-12 w-12" : "h-16 w-16"
          }`}
        >
          {value && <img src={value} alt="" className="h-full w-full object-cover" />}
        </div>
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor={inputId}
            className="cursor-pointer rounded-md border border-white/15 px-3 py-1.5 text-center text-[11px] uppercase tracking-widest text-white/60 transition-colors hover:border-[#F4D999]/40 hover:text-[#F4D999]"
          >
            {uploading ? "Uploading…" : value ? "Replace" : "Upload"}
          </label>
          <input
            id={inputId}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFile}
            disabled={uploading}
          />
          {value && (
            <button
              type="button"
              onClick={handleRemove}
              className="text-[11px] font-medium uppercase tracking-widest text-red-400/70 transition-colors hover:text-red-400"
            >
              Remove
            </button>
          )}
        </div>
      </div>
      {uploadError && <p className="text-[11px] text-red-400">{uploadError}</p>}
    </div>
  );
}

/* ---------------------------------- Hero / About / Contact ---------------------------------- */

type DraftProps = { draft: PortfolioContent; setDraft: (c: PortfolioContent) => void };

function SectionShell({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2.5 border-b border-white/10 pb-3">
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#F4D999]/10 text-[#F4D999]">
          {icon}
        </span>
        <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">{title}</h4>
      </div>
      {children}
    </div>
  );
}

function HeroGroup({ draft, setDraft }: DraftProps) {
  return (
    <SectionShell title="Hero" icon={<User size={15} />}>
      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5">
            <span className="text-[10px] font-medium uppercase tracking-widest text-white/35">title</span>
            <input
              value={draft.hero.title}
              onChange={(e) => setDraft({ ...draft, hero: { ...draft.hero, title: e.target.value } })}
              className={inputClass}
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-[10px] font-medium uppercase tracking-widest text-white/35">tagline</span>
            <input
              value={draft.hero.tagline}
              onChange={(e) => setDraft({ ...draft, hero: { ...draft.hero, tagline: e.target.value } })}
              className={inputClass}
            />
          </label>
        </div>
        <div className="mt-3">
          <ImageField
            label="portrait image"
            value={draft.hero.image}
            folder="hero"
            onChange={(url) => setDraft({ ...draft, hero: { ...draft.hero, image: url } })}
          />
        </div>
      </div>
    </SectionShell>
  );
}

function AboutGroup({ draft, setDraft }: DraftProps) {
  return (
    <SectionShell title="About" icon={<Info size={15} />}>
      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
        <div className="grid gap-3">
          <label className="flex flex-col gap-1.5">
            <span className="text-[10px] font-medium uppercase tracking-widest text-white/35">heading</span>
            <input
              value={draft.about.heading}
              onChange={(e) => setDraft({ ...draft, about: { ...draft.about, heading: e.target.value } })}
              className={inputClass}
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-[10px] font-medium uppercase tracking-widest text-white/35">text</span>
            <textarea
              value={draft.about.text}
              onChange={(e) => setDraft({ ...draft, about: { ...draft.about, text: e.target.value } })}
              rows={4}
              className={`${inputClass} resize-y`}
            />
          </label>
        </div>
      </div>
    </SectionShell>
  );
}

function ContactGroup({ draft, setDraft }: DraftProps) {
  return (
    <SectionShell title="Contact" icon={<Mail size={15} />}>
      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5">
            <span className="text-[10px] font-medium uppercase tracking-widest text-white/35">heading</span>
            <input
              value={draft.contact.heading}
              onChange={(e) => setDraft({ ...draft, contact: { ...draft.contact, heading: e.target.value } })}
              className={inputClass}
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-[10px] font-medium uppercase tracking-widest text-white/35">email</span>
            <input
              value={draft.contact.email}
              onChange={(e) => setDraft({ ...draft, contact: { ...draft.contact, email: e.target.value } })}
              className={inputClass}
            />
          </label>
          <label className="flex flex-col gap-1.5 sm:col-span-2">
            <span className="text-[10px] font-medium uppercase tracking-widest text-white/35">blurb</span>
            <textarea
              value={draft.contact.blurb}
              onChange={(e) => setDraft({ ...draft, contact: { ...draft.contact, blurb: e.target.value } })}
              rows={2}
              className={`${inputClass} resize-y`}
            />
          </label>
          <label className="flex flex-col gap-1.5 sm:col-span-2">
            <span className="text-[10px] font-medium uppercase tracking-widest text-white/35">footer</span>
            <input
              value={draft.contact.footer}
              onChange={(e) => setDraft({ ...draft, contact: { ...draft.contact, footer: e.target.value } })}
              className={inputClass}
            />
          </label>
        </div>
      </div>
    </SectionShell>
  );
}

/* ---------------------------------- Projects ---------------------------------- */

function ProjectsGroup({ draft, setDraft }: DraftProps) {
  function updateProject(i: number, patch: Partial<ProjectItem>) {
    const list = [...draft.projects];
    list[i] = { ...list[i]!, ...patch };
    setDraft({ ...draft, projects: list });
  }

  function addProject() {
    setDraft({ ...draft, projects: [...draft.projects, blankProject(draft.projects.length + 1)] });
  }

  function removeProject(i: number) {
    setDraft({ ...draft, projects: draft.projects.filter((_, idx) => idx !== i) });
  }

  return (
    <SectionShell title="Projects" icon={<FolderKanban size={15} />}>
      <div className="-mt-1 flex items-center justify-end">
        <button
          onClick={addProject}
          className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-widest text-white/60 transition-colors hover:border-[#F4D999]/40 hover:text-[#F4D999]"
        >
          <Plus size={12} />
          Add project
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {draft.projects.map((project, i) => (
          <div
            key={i}
            className="rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-colors hover:border-white/15"
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5">
                <span className="text-[10px] font-medium uppercase tracking-widest text-white/35">number</span>
                <input
                  value={project.number}
                  onChange={(e) => updateProject(i, { number: e.target.value })}
                  className={inputClass}
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-[10px] font-medium uppercase tracking-widest text-white/35">name</span>
                <input
                  value={project.name}
                  onChange={(e) => updateProject(i, { name: e.target.value })}
                  className={inputClass}
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-[10px] font-medium uppercase tracking-widest text-white/35">category</span>
                <input
                  value={project.category}
                  onChange={(e) => updateProject(i, { category: e.target.value })}
                  className={inputClass}
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-[10px] font-medium uppercase tracking-widest text-white/35">
                  live url (optional)
                </span>
                <input
                  value={project.url ?? ""}
                  onChange={(e) => updateProject(i, { url: e.target.value })}
                  className={inputClass}
                />
              </label>
              <label className="flex flex-col gap-1.5 sm:col-span-2">
                <span className="text-[10px] font-medium uppercase tracking-widest text-white/35">desc</span>
                <textarea
                  value={project.desc}
                  onChange={(e) => updateProject(i, { desc: e.target.value })}
                  rows={3}
                  className={`${inputClass} resize-y`}
                />
              </label>
            </div>

            <div className="mt-4 grid gap-3 border-t border-white/10 pt-4 sm:grid-cols-3">
              <ImageField
                label="top-left image"
                value={project.image1}
                folder={`projects/${project.number || i}`}
                onChange={(url) => updateProject(i, { image1: url })}
              />
              <ImageField
                label="bottom-left image"
                value={project.image2}
                folder={`projects/${project.number || i}`}
                onChange={(url) => updateProject(i, { image2: url })}
              />
              <ImageField
                label="main (large) image"
                value={project.imageMain}
                folder={`projects/${project.number || i}`}
                onChange={(url) => updateProject(i, { imageMain: url })}
              />
            </div>

            <button
              onClick={() => removeProject(i)}
              className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-widest text-red-400/70 transition-colors hover:text-red-400"
            >
              <Trash2 size={12} />
              Remove project
            </button>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

/* ---------------------------------- Gallery ---------------------------------- */

function GalleryGroup({ draft, setDraft }: DraftProps) {
  function updateShot(i: number, patch: Partial<GalleryShot>) {
    const list = [...draft.gallery];
    list[i] = { ...list[i]!, ...patch };
    setDraft({ ...draft, gallery: list });
  }

  function addShot() {
    setDraft({ ...draft, gallery: [...draft.gallery, { src: "", label: "" }] });
  }

  function removeShot(i: number) {
    setDraft({ ...draft, gallery: draft.gallery.filter((_, idx) => idx !== i) });
  }

  return (
    <SectionShell title="Screens gallery" icon={<Images size={15} />}>
      <div className="-mt-1 flex items-center justify-end">
        <button
          onClick={addShot}
          className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-widest text-white/60 transition-colors hover:border-[#F4D999]/40 hover:text-[#F4D999]"
        >
          <Plus size={12} />
          Add image
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {draft.gallery.map((shot, i) => (
          <div
            key={i}
            className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-colors hover:border-white/15"
          >
            <ImageField value={shot.src} folder="gallery" onChange={(url) => updateShot(i, { src: url })} compact />
            <label className="flex flex-1 flex-col gap-1.5">
              <span className="text-[10px] font-medium uppercase tracking-widest text-white/35">label</span>
              <input
                value={shot.label}
                onChange={(e) => updateShot(i, { label: e.target.value })}
                className={inputClass}
              />
            </label>
            <button
              onClick={() => removeShot(i)}
              aria-label="Remove image"
              className="shrink-0 rounded-md p-2 text-red-400/70 transition-colors hover:bg-red-400/10 hover:text-red-400"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
        {draft.gallery.length === 0 && (
          <p className="text-[11px] text-white/35">No gallery images yet — add one above.</p>
        )}
      </div>
    </SectionShell>
  );
}

/* ---------------------------------- Marquee ---------------------------------- */

function MarqueeGroup({ draft, setDraft }: DraftProps) {
  function updateRow(row: "row1" | "row2", index: number, url: string) {
    const list = [...draft.marquee[row]];
    list[index] = url;
    setDraft({ ...draft, marquee: { ...draft.marquee, [row]: list } });
  }

  function addToRow(row: "row1" | "row2") {
    setDraft({ ...draft, marquee: { ...draft.marquee, [row]: [...draft.marquee[row], ""] } });
  }

  function removeFromRow(row: "row1" | "row2", index: number) {
    setDraft({
      ...draft,
      marquee: { ...draft.marquee, [row]: draft.marquee[row].filter((_, i) => i !== index) },
    });
  }

  return (
    <SectionShell title="Marquee strip (optional)" icon={<Images size={15} />}>
      {(["row1", "row2"] as const).map((row) => (
        <div key={row} className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[10px] font-medium uppercase tracking-widest text-white/35">
              {row === "row1" ? "row 1" : "row 2"}
            </span>
            <button
              onClick={() => addToRow(row)}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-white/60 transition-colors hover:border-[#F4D999]/40 hover:text-[#F4D999]"
            >
              <Plus size={11} />
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-4">
            {draft.marquee[row].map((src, i) => (
              <div key={i} className="flex items-start gap-1">
                <ImageField value={src} folder={`marquee/${row}`} onChange={(url) => updateRow(row, i, url)} compact />
                <button
                  onClick={() => removeFromRow(row, i)}
                  aria-label="Remove image"
                  className="rounded-md p-1.5 text-red-400/70 transition-colors hover:bg-red-400/10 hover:text-red-400"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            ))}
            {draft.marquee[row].length === 0 && <p className="text-[11px] text-white/35">Empty — row is hidden.</p>}
          </div>
        </div>
      ))}
    </SectionShell>
  );
}

/* ---------------------------------- Generic text-only group ---------------------------------- */

function Group({
  title,
  icon,
  items,
  fields,
  onChange,
  onRemove,
  onAdd,
  note,
}: {
  title: string;
  icon?: React.ReactNode;
  items: Record<string, string>[];
  fields: string[];
  onChange: (index: number, field: string, value: string) => void;
  onRemove?: (index: number) => void;
  onAdd?: () => void;
  note?: string;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#F4D999]/10 text-[#F4D999]">
            {icon}
          </span>
          <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">{title}</h4>
        </div>
        {onAdd && (
          <button
            onClick={onAdd}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-widest text-white/60 transition-colors hover:border-[#F4D999]/40 hover:text-[#F4D999]"
          >
            <Plus size={12} />
            Add
          </button>
        )}
      </div>

      {note && <p className="-mt-1 text-[11px] leading-relaxed text-white/35">{note}</p>}

      <div className="flex flex-col gap-3">
        {items.map((item, i) => (
          <div
            key={i}
            className="rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-colors hover:border-white/15"
          >
            <div className="grid gap-3 sm:grid-cols-2">
              {fields.map((field) => (
                <label
                  key={field}
                  className={`flex flex-col gap-1.5 ${LONG_FIELDS.has(field) ? "sm:col-span-2" : ""}`}
                >
                  <span className="text-[10px] font-medium uppercase tracking-widest text-white/35">{field}</span>
                  {LONG_FIELDS.has(field) ? (
                    <textarea
                      value={item[field] ?? ""}
                      onChange={(e) => onChange(i, field, e.target.value)}
                      rows={3}
                      className={`${inputClass} resize-y`}
                    />
                  ) : (
                    <input
                      value={item[field] ?? ""}
                      onChange={(e) => onChange(i, field, e.target.value)}
                      className={inputClass}
                    />
                  )}
                </label>
              ))}
            </div>
            {onRemove && (
              <button
                onClick={() => onRemove(i)}
                className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-widest text-red-400/70 transition-colors hover:text-red-400"
              >
                <Trash2 size={12} />
                Remove
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
