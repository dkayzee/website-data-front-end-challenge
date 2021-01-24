import { createSelector } from "reselect";
import _ from "underscore";
import { getSelectedLanguages } from "./language";

const selectData = (state) => state.chart.data;

/**
 * Group total websites views by language.
 *
 * @param data Array<{
 *  tags: Array<{name: string}>;
 *  url: string;
 *  website_views: Array<{ date: string, count: string}>
 * }>
 * @param languages Array<{name: string, displayed: bool}>
 *
 * Return: { language: string, views: number }
 */
export const groupByLanguage = createSelector(
  [selectData, getSelectedLanguages],
  (data, languages) => {
    // TODO: Implement

    // filter through the data to only retreive selected language websites
    const filteredData = data.filter(
      (website) =>
        website.tags.filter((tag) =>
          languages.map((lang) => lang.name).includes(tag.name)
        ).length > 0
    );

    // object to store all the counts of views by language;
    const viewCountByLang = {};
    // for each website, reduce all the views into an accumulated value *AND* add the view count to EACH language type. In the example only has one language each, but this will add counts to multiple languages, as needed.
    filteredData.map((website) => {
      const temp = website.website_views.reduce((acc, views) => {
        return acc + Number(views.count);
      }, 0);

      website.tags.map((lang) => {
        if (viewCountByLang[lang.name]) viewCountByLang[lang.name] += temp;
        else viewCountByLang[lang.name] = temp;
        return viewCountByLang;
      });
      return viewCountByLang;
    });

    // transform the object into the desired param
    return Object.keys(viewCountByLang).map((lang) => ({
      views: viewCountByLang[lang],
      language: lang,
    }));
  }
);

/**
 * Flattened list of daily views.
 *
 * @param data Array<{
 *  tags: <{name: string}>;
 *  url: string;
 *  website_views: Array<{ date: string, count: number}>
 * }>
 * @param languages Array<{name: string, displayed: bool}>
 *
 *
 * Return: Array<{
 *    count: number;
 *    date: string;
 *    website: string;
 * }>
 */
export const flattenWebsiteViews = createSelector(
  [selectData, getSelectedLanguages],
  (data, languages) => {
    return _.flatten(
      data
        .filter(
          (website) =>
            website.tags.filter((tag) =>
              languages.map((lang) => lang.name).includes(tag.name)
            ).length > 0
        )
        .map((website) =>
          website.website_views.map((views) => {
            return {
              count: views.count,
              date: views.date,
              website: website.url,
            };
          })
        )
    );
  }
);
