type StorefrontHeadOptions = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article" | "product";
};

export function storefrontHead({ title, description, path, type = "website" }: StorefrontHeadOptions) {
  const fullTitle = `${title} | Kestorae`;

  return {
    meta: [
      { title: fullTitle },
      { name: "description", content: description },
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: description },
      { property: "og:type", content: type },
      { property: "og:url", content: path },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: path }],
  };
}

export function humanizeSlug(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join(" ");
}