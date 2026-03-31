const cdnUrl = new URL("https://cdn.nuffle.me")

export const cdn = (path: string) => new URL(path, cdnUrl);
