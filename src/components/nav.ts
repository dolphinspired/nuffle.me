import { cdn } from "./cdn";
import { hasQueryParam } from "./qstr";

type NavTileConfig = {
  name: string;
  label: string;
  href: string;
  image: URL;
  eventName: string;
  className?: string;
  addDivider?: boolean;
  condition?: () => boolean;
};

const navTiles: NavTileConfig[] = [
  {
    name: "Plushie Party",
    href: "https://t.me/+TPV-HbxYaO1iMGIx",
    image: new URL("https://i.giphy.com/Vt4wDrLAnH1tu.webp"),
    eventName: "nav.party-invite",
    label: "🎊 Plushie Party Invite! 🎉 (BWS 2026)",
    className: "nav-special",
    addDivider: true,
    condition: () => hasQueryParam("plushie", "true"),
  },
  {
    name: "Dolphinspired Studio",
    href: "https://dolphinspired.com",
    image: cdn("site/logo/dolphinspired.png"),
    eventName: "nav.dolphinspired-studio",
    label: "dolphinspired.com - My Studio & Store!",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/dolphinspired/",
    image: cdn("site/logo/instagram.png"),
    eventName: "nav.instagram",
    label: "@dolphinspired on Instagram",
    addDivider: true,
  },
  {
    name: "Bluesky",
    href: "https://bsky.app/profile/nuffle.me",
    image: cdn("site/logo/bluesky.png"),
    eventName: "nav.bluesky",
    label: "@nuffle.me on Bluesky",
  },
  {
    name: "Telegram",
    href: "https://t.me/dolphinspired",
    image: cdn("site/logo/telegram.png"),
    eventName: "nav.telegram",
    label: "@dolphinspired on Telegram",
  },
  {
    name: "Discord",
    href: "https://discord.com/users/263732939815256064",
    image: cdn("site/logo/discord.png"),
    eventName: "nav.discord",
    label: "@dolphinspired on Discord",
  },
  {
    name: "Toyhouse",
    href: "https://toyhou.se/25234327.nuffle-emberdrake",
    image: cdn("site/logo/toyhouse.png"),
    eventName: "nav.toyhouse",
    label: "Nuffle on Toyhouse",
  },
  {
    name: "Furtrack",
    href: "https://www.furtrack.com/index/character:nuffle",
    image: cdn("site/logo/furtrack.png"),
    eventName: "nav.furtrack",
    label: "Nuffle on Furtrack",
  },
  {
    name: "Github",
    href: "https://github.com/dolphinspired",
    image: cdn("site/logo/github.png"),
    eventName: "nav.github",
    label: "dolphinspired on Github",
  },
];

export const renderNavTiles = (): string => {
  return navTiles
    .filter((item) => (item.condition ? item.condition() : true))
    .map((item) => {
        let content = `
<div class="page-item-wrap relative ${item.className ?? ""}">
  <div class="page-item flex-both-center absolute"></div>
  <a target="_blank" class="page-item-each py-10 flex-both-center" href="${item.href}" data-umami-event="${item.eventName}">
    <img class="link-each-image" src="${item.image}" alt="${item.name}"/>
    <span class="item-title text-center">${item.label}</span>
  </a>
</div>
`
        if (item.addDivider) {
          content = content + `<hr />`;
        }
        return content;
      }
    )
    .join("");
}
