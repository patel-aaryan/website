export function scrollToContact(): void {
  if (typeof document === "undefined") return;

  const contactSection = document.getElementById("contact");
  if (!contactSection) return;

  contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
}
