export function normalizeImageSrc(image: string | null | undefined): string {
  if (!image) return "/placeholder.jpg";

  const trimmed = image.trim();

  // Якщо вказано data URI або повний URL, вертаємо як є.
  if (
    trimmed.startsWith("data:") ||
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://")
  ) {
    return trimmed;
  }

  // Якщо відносний/абсолютний шлях, додаємо слеш на початку, якщо потрібен.
  if (trimmed.startsWith("/")) {
    return trimmed;
  }

  return `/${trimmed}`;
}
