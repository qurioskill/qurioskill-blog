import { useEffect } from "react";

function upsertMeta(selector, value, isProperty = false) {
  if (!value) return;
  const attr = isProperty ? "property" : "name";
  let tag = document.head.querySelector(`${isProperty ? "meta[property" : "meta[name"}="${selector}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, selector);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", value);
}

export function usePageMetadata(title, description) {
  useEffect(() => {
    if (title) {
      document.title = title;
      upsertMeta("og:title", title, true);
    }
    if (description) {
      upsertMeta("description", description);
      upsertMeta("og:description", description, true);
    }
  }, [title, description]);
}
