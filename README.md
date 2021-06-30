# Mangols Keyword Research scraper

Run build in watch mode:

```sh
npm run dev:build
```

## find-keywords-by-more

Makes a bulk search for 700 keywords at once (so there will be no related keywords in the result lis).
Then clicks keyword difficulty button where there is no, then downloads sheet.
It does it until there are keywords.
Keywords are read from the assets/keywords-list.txt file

```sh
npm run start:find-keywords-by-more
```

## find-related-keywords-by-one

You put a query into the 'KEYWORDS_QUERY' variable in the src/find-related-keywords-by-one.ts file
Click keyword difficulty where not highlighted then download Keyword result list for one keyword:

```sh
npm run start:find-related-keywords-by-one
```

Then you hit the above command and it does the query on the keyword research page clicks everywhere the loop icon
where there is no value and downloads the keywords list

Download Keyword result list for more keywords:

## find-related-keywords-by-more

It does the same thing as `npm run start:find-related-keywords-by-one` just to bulk keywords.
For each keyword a new page will be opened.
Keywords are read from the assets/keywords-list.txt file

```ts
npm run find-related-keywords-by-more
```

## concat_downloaded_files

Concatenate downloaded keyword research csv sheets:

```ts
npm run start:helper:concat_downloaded_files
```
