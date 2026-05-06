import { Mail, Phone, MapPin, Github, Linkedin, Instagram, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const items = [
  { icon: Mail, label: "Email", value: "saswatkingtrip@gmail.com", href: "mailto:saswatkingtrip@gmail.com" },
  { icon: Phone, label: "Phone", value: "+977 9861054079", href: "tel:+9779861054079" },
  { icon: MapPin, label: "Location", value: "Kathmandu, Nepal", href: "#" },
];

export const Contact = () => {
  const [sending, setSending] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const subject = encodeURIComponent(String(data.get("subject") || "Hello from your site"));
    const body = encodeURIComponent(
      `From: ${data.get("name")} <${data.get("email")}>\n\n${data.get("message")}`
    );
    setSending(true);
    window.location.href = `mailto:saswatkingtrip@gmail.com?subject=${subject}&body=${body}`;
    toast.success("Opening your mail client…");
    setTimeout(() => setSending(false), 800);
  };

  return (
    <section id="contact" className="py-32 px-6 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <p className="section-label mb-4">contact.init()</p>
        <h2 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 max-w-3xl">
          Let's work together<span className="text-primary">.</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mb-16">
          Have a project in mind? Drop a message and I'll get back to you.
        </p>

        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-px bg-border">
              {items.map((it) => (
                <a
                  key={it.label}
                  href={it.href}
                  className="bg-background p-6 flex items-center gap-4 group hover:bg-card transition-colors"
                >
                  <div className="w-10 h-10 border border-border flex items-center justify-center text-primary group-hover:border-primary transition-colors">
                    <it.icon size={16} />
                  </div>
                  <div>
                    <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                      {it.label}
                    </div>
                    <div className="text-foreground group-hover:text-primary transition-colors">
                      {it.value}
                    </div>
                  </div>
                </a>
              ))}
            </div>

            <div className="flex gap-3">
              {[
                { i: Github, h: "https://github.com/tripathisaswat" },
                { i: Linkedin, h: "https://www.linkedin.com/in/saswat-tripathi-95b599142/" },
                { i: Instagram, h: "https://instagram.com/tripsaswat" },
              ].map(({ i: Icon, h }) => (
                <a
                  key={h}
                  href={h}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 border border-border flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <form
            onSubmit={onSubmit}
            className="lg:col-span-7 space-y-4 border border-border p-8 bg-card/30"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <Field name="name" label="Name" />
              <Field name="email" label="Email" type="email" />
            </div>
            <Field name="subject" label="Subject" />
            <div>
              <label className="font-mono text-xs uppercase tracking-wider text-muted-foreground block mb-2">
                Message
              </label>
              <textarea
                name="message"
                rows={5}
                required
                className="w-full bg-background border border-border px-4 py-3 text-foreground focus:outline-none focus:border-primary font-sans"
              />
            </div>
            <button
              type="submit"
              disabled={sending}
              className="w-full sm:w-auto font-mono text-xs uppercase tracking-wider bg-primary text-primary-foreground px-6 py-3 inline-flex items-center gap-2 hover:bg-accent transition-colors disabled:opacity-50"
            >
              <Send size={14} />
              {sending ? "Sending…" : "Send message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

const Field = ({ name, label, type = "text" }: { name: string; label: string; type?: string }) => (
  <div>
    <label className="font-mono text-xs uppercase tracking-wider text-muted-foreground block mb-2">
      {label}
    </label>
    <input
      name={name}
      type={type}
      required
      className="w-full bg-background border border-border px-4 py-3 text-foreground focus:outline-none focus:border-primary font-sans"
    />
  </div>
);
