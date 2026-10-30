import { useState } from "react";
import { Phone, MapPin, Clock3, Facebook, Instagram, Check } from "lucide-react";
import Reveal from "./Reveal";
import SplatterButton from "./SplatterButton";
import { contact } from "@/data/site";

const FIELD =
  "w-full rounded-xl border border-[#ffcd6b]/20 bg-[#3a2417] px-4 py-3 text-[15px] text-[#fffbf2] placeholder:text-[#c9a882]/60 transition-colors focus:border-[#ffc45c] focus:outline-none focus:ring-2 focus:ring-[#ffc45c]/25";
const LABEL = "mb-2 block text-[11px] uppercase tracking-[0.16em] text-[#e8c9a0]/80";

export default function ContactOrder({ flavors }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    flavor: flavors[0]?.name || "",
    quantity: "1",
    notes: "",
  });

  const [status, setStatus] = useState("idle");

  const update = (key) => (event) => {
    setForm((prev) => ({ ...prev, [key]: event.target.value }));
    if (status === "error") setStatus("idle");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      setStatus("error");
      return;
    }
    setStatus("ready");
  };

  const resetForm = () => {
    setStatus("idle");
  };

  return (
    <section id="order" className="relative scroll-mt-24 px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-12">
        <div>
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#4a2c1a]/75">
              Contact &amp; order
            </p>
            <h2 className="mt-4 font-heading text-[clamp(1.85rem,5.5vw,2.9rem)] leading-[1.08] text-[#2b1a11]">
              Tell us how many, we'll get the oil hot.
            </h2>
            <p className="mt-4 max-w-md text-[16px] leading-relaxed text-[#5c4030]">
              Preview your order details, then call or text us to place it. Same-day pickup is
              available for orders placed before 3 PM.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-8 space-y-3">
              <a
                href={contact.phoneHref}
                className="flex min-h-[64px] items-center gap-4 rounded-2xl bg-[#fffbf2]/80 px-5 py-4 transition-colors hover:bg-[#fffbf2]"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#2b1a11] text-[#ffc45c]">
                  <Phone className="h-4.5 w-4.5" strokeWidth={1.8} />
                </span>
                <span>
                  <span className="block text-[11px] uppercase tracking-[0.16em] text-[#8a6a4e]">
                    Call or text
                  </span>
                  <span className="mt-0.5 block font-heading text-[15px] text-[#2b1a11]">
                    {contact.phoneDisplay}
                  </span>
                </span>
              </a>

              <div className="flex min-h-[64px] items-center gap-4 rounded-2xl bg-[#fffbf2]/60 px-5 py-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#2b1a11]/10 text-[#2b1a11]">
                  <Clock3 className="h-4.5 w-4.5" strokeWidth={1.8} />
                </span>
                <span>
                  <span className="block text-[11px] uppercase tracking-[0.16em] text-[#8a6a4e]">
                    Kitchen hours
                  </span>
                  <span className="mt-0.5 block text-[14px] text-[#3d2a1d]">{contact.hours}</span>
                </span>
              </div>

              <div className="flex min-h-[64px] items-center gap-4 rounded-2xl bg-[#fffbf2]/60 px-5 py-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#2b1a11]/10 text-[#2b1a11]">
                  <MapPin className="h-4.5 w-4.5" strokeWidth={1.8} />
                </span>
                <span>
                  <span className="block text-[11px] uppercase tracking-[0.16em] text-[#8a6a4e]">
                    Pickup
                  </span>
                  <span className="mt-0.5 block text-[14px] text-[#3d2a1d]">{contact.location}</span>
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={contact.facebook}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-[48px] items-center gap-2.5 rounded-full bg-[#2b1a11] px-5 py-3 text-[13px] font-medium text-[#fffbf2] transition-colors hover:bg-[#3d2519]"
              >
                <Facebook className="h-4 w-4" strokeWidth={1.8} />
                Facebook
              </a>
              <a
                href={contact.instagram}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-[48px] items-center gap-2.5 rounded-full border border-[#2b1a11]/25 px-5 py-3 text-[13px] font-medium text-[#2b1a11] transition-colors hover:border-[#2b1a11]/60 hover:bg-[#fffbf2]/60"
              >
                <Instagram className="h-4 w-4" strokeWidth={1.8} />
                Instagram
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={100}>
          {status === "ready" ? (
            <div className="relative overflow-hidden rounded-[1.9rem] bg-[#2b1a11] p-8 text-center shadow-[0_40px_80px_-40px_rgba(43,26,17,0.9)] sm:p-10">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-[radial-gradient(circle,rgba(217,119,6,0.4),transparent_70%)] blur-2xl"
              />
              <span className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#d97706] text-[#fffbf2] shadow-[0_16px_34px_-14px_rgba(217,119,6,0.9)]">
                <Check className="h-6 w-6" strokeWidth={2.5} />
              </span>
              <h3 className="relative mt-5 font-heading text-lg text-[#fffbf2]">
                Order details ready, {form.name.trim().split(" ")[0]}!
              </h3>
              <p className="relative mx-auto mt-3 max-w-sm text-[14px] leading-relaxed text-[#e8c9a0]/85">
                This local preview does not send or save orders. To place yours, call or text us at{" "}
                <a className="underline" href={contact.phoneHref}>{contact.phoneDisplay}</a>.
                <span className="mt-2 block">
                  Order for {form.name} ({form.phone}): {form.quantity} box
                  {form.quantity === "1" ? "" : "es"} of {form.flavor}
                  {form.notes.trim() ? ` — ${form.notes.trim()}` : ""}
                </span>
              </p>
              <button
                type="button"
                onClick={resetForm}
                className="relative mt-7 rounded-full border border-[#ffcd6b]/40 px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#ffdca4] transition-colors hover:bg-[#ffcd6b]/10"
              >
                Edit order
              </button>
            </div>
          ) : (
          <form
            onSubmit={handleSubmit}
            className="relative overflow-hidden rounded-[1.9rem] bg-[#2b1a11] p-6 shadow-[0_40px_80px_-40px_rgba(43,26,17,0.9)] sm:p-8"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(217,119,6,0.35),transparent_70%)] blur-2xl"
            />
            <div className="relative">
              <h3 className="font-heading text-lg text-[#fffbf2]">Your order</h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-[#e8c9a0]/75">
                Preview your order here. This local version does not submit or store it.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={LABEL} htmlFor="order-name">
                    Your name
                  </label>
                  <input
                    id="order-name"
                    className={FIELD}
                    value={form.name}
                    onChange={update("name")}
                    placeholder="Juana dela Cruz"
                    autoComplete="name"
                    required
                  />
                </div>
                <div>
                  <label className={LABEL} htmlFor="order-phone">
                    Mobile number
                  </label>
                  <input
                    id="order-phone"
                    className={FIELD}
                    value={form.phone}
                    onChange={update("phone")}
                    placeholder="0917 000 0000"
                    inputMode="tel"
                    autoComplete="tel"
                    required
                  />
                </div>
                <div>
                  <label className={LABEL} htmlFor="order-flavor">
                    Flavor
                  </label>
                  <select
                    id="order-flavor"
                    className={FIELD}
                    value={form.flavor}
                    onChange={update("flavor")}
                  >
                    {flavors.map((flavor) => (
                      <option key={flavor.name} value={flavor.name} className="text-[#2b1a11]">
                        {flavor.name} — ₱{flavor.price} each
                      </option>
                    ))}
                    <option value="Mixed box" className="text-[#2b1a11]">
                      Mixed box
                    </option>
                  </select>
                </div>
                <div>
                  <label className={LABEL} htmlFor="order-quantity">
                    Boxes (6 pcs each)
                  </label>
                  <select
                    id="order-quantity"
                    className={FIELD}
                    value={form.quantity}
                    onChange={update("quantity")}
                  >
                    {["1", "2", "3", "5", "10", "30+"].map((option) => (
                      <option key={option} value={option} className="text-[#2b1a11]">
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label className={LABEL} htmlFor="order-notes">
                  Anything else? <span className="normal-case tracking-normal">(optional)</span>
                </label>
                <textarea
                  id="order-notes"
                  className={`${FIELD} min-h-[92px] resize-y`}
                  value={form.notes}
                  onChange={update("notes")}
                  placeholder="Pickup time, delivery area, allergies…"
                />
              </div>

              <SplatterButton
                type="submit"
                className="mt-6 w-full rounded-full bg-[#d97706] px-7 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-[#fffbf2] shadow-[0_18px_40px_-18px_rgba(217,119,6,0.95)] transition-all hover:-translate-y-0.5 hover:bg-[#e88410]"
              >
                Prepare order details
              </SplatterButton>
              {status === "error" && (
                <p className="mt-3 text-center text-[12px] leading-relaxed text-[#ffbfa6]">
                  Please add your name and mobile number, then try again.
                </p>
              )}
              <p className="mt-3 text-center text-[11px] leading-relaxed text-[#c9a882]/60">
                Your details are not sent or saved.
              </p>
            </div>
          </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}