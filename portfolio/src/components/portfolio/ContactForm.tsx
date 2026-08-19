import { useState } from "react";

const EMAIL = "svkarthigeyan@gmail.com";

const inputClass =
  "w-full rounded-xl border border-[#D7E2EA]/15 bg-white/5 px-4 py-3 text-sm text-[#D7E2EA] outline-none placeholder:text-[#D7E2EA]/30 transition-colors focus:border-[#B600A8]/60";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio message from ${name || "a visitor"}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-md flex-col gap-5 rounded-3xl border border-[#D7E2EA]/10 bg-white/[0.03] p-6 sm:p-8"
    >
      <label className="flex flex-col gap-2">
        <span className="text-xs uppercase tracking-widest text-[#D7E2EA]/60">
          Full Name <span className="text-[#B600A8]">*</span>
        </span>
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className={inputClass}
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-xs uppercase tracking-widest text-[#D7E2EA]/60">
          Email Address <span className="text-[#B600A8]">*</span>
        </span>
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className={inputClass}
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-xs uppercase tracking-widest text-[#D7E2EA]/60">Message</span>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell me about your project"
          rows={4}
          className={`${inputClass} resize-y`}
        />
      </label>

      <button
        type="submit"
        className="mt-1 inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-xs font-medium uppercase tracking-widest text-white transition-transform duration-200 hover:scale-[1.02]"
        style={{
          background: "linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)",
          boxShadow: "0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset",
          outline: "2px solid white",
          outlineOffset: "-3px",
        }}
      >
        Send Message
      </button>

      {sent && (
        <p className="text-center text-xs uppercase tracking-widest text-[#D7E2EA]/50">
          Your email app should have opened with the message ready to send.
        </p>
      )}
    </form>
  );
}
