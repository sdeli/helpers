# Mangols Keyword Research scraper

Run build in watch mode:

```ts
npm run dev:build
```

Makes a bulk search for 700 keywords at one (so there will be no related keywords in the result lis).
Then clicks keyword difficulty button where there is no, then downloads sheet.
It does it until there are keywords,

```ts
npm run start:find-keywords-by-more
```

Click keyword difficulty where not highlighted then download Keyword result list for one keyword:

```ts
npm run start:find-related-keywords-by-one
```

Download Keyword result list for more keywords:

```ts
npm run find-related-keywords-by-more
```

Concatenate downloaded keyword research csv sheets:

```ts
npm run start:helper:concat_downloaded_files
```
