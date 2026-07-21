export {
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  PRIVATE_PAGES,
  PUBLIC_PAGES,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
  ROBOTS_DISALLOW_PATHS,
  SITEMAP_PATHS,
  type PageSeoConfig,
} from "./config";
export {
  buildMetadata,
  metadataFromPageConfig,
  rootMetadata,
  stripHtml,
  truncateDescription,
  type BuildMetadataOptions,
} from "./build";
export {
  blogPostMetadata,
  equipmentMetadata,
  exerciseMetadata,
  productMetadata,
} from "./dynamic";

import { metadataFromPageConfig } from "./build";
import { PRIVATE_PAGES, PUBLIC_PAGES } from "./config";

export function publicPageMetadata(
  key: keyof typeof PUBLIC_PAGES,
) {
  return metadataFromPageConfig(PUBLIC_PAGES[key]);
}

export function privatePageMetadata(
  key: keyof typeof PRIVATE_PAGES,
) {
  return metadataFromPageConfig(PRIVATE_PAGES[key]);
}
