import { expect, test } from "@playwright/test";
import { noColor, red } from "../src/helpers/colors";
import { getCurrentDate, rgb } from "../src/helpers/utils";
import PageFactory from "../src/pagefactory";
import { HomePage } from "../src/pageobjects/home.page";
import { SearchPage } from "../src/pageobjects/search.page";

let homePage: HomePage;
let searchPage: SearchPage;

test.beforeEach(async ({ page }, testInfo) => {
  if (/.*HomePage/.test(testInfo.title)) {
    homePage = PageFactory.makePage("home", page) as HomePage;
    await homePage.open();
  }
  if (/.*SearchPage/.test(testInfo.title)) {
    searchPage = new SearchPage(page);
    await searchPage.open();
  }
});

test(
  "Check that HomePage has title containing 'интересное из мира IT'",
  { tag: "@all" },
  async ({ page }) => {
    await expect(homePage.page).toHaveTitle(/интересное из мира IT/);
  }
);

test(
  "Get DATE from the HomePage and check if it equals to current date",
  { tag: ["@all", "@extended"] },
  async ({ page }) => {
    const currentDate: string = getCurrentDate();
    const dateOnPage: string = await homePage.getDateOnPage();
    if (homePage.viewportWidth && homePage.viewportWidth < 800) {
      await expect(homePage.pageDate).toBeHidden();
    } else {
      expect(dateOnPage).toEqual(currentDate);
    }
  }
);

test(
  "On SearchPage look for 'iPhone 14 Pro' in REVIEWS Section and choose first result",
  { tag: ["@all", "@smoke"] },
  async ({ page }) => {
    const searchQuery: string = "iPhone 14 Pro";
    await searchPage.inputQuery(searchQuery);
    await searchPage.selectSection("reviews");
    await searchPage.submitSearch();

    const firstResult = (await searchPage.getSearchResults()).first();
    await searchPage.clickOnSearchResultTitle(firstResult);

    const reviewArticleTitle = page.locator("h1");
    await expect(reviewArticleTitle).toContainText(searchQuery, {
      ignoreCase: true,
    });
  }
);

test(
  "Check that toggle DarkMode switches themes on the HomePage",
  { tag: ["@all", "@extended", "@whitebox"] },
  async ({ page }) => {
    const jQueryIsLoaded = await homePage.isJQueryLoaded();
    expect(jQueryIsLoaded).toBeTruthy();
    await homePage.toggleDarkModeWithJS();
    let isNowDarkMode = await homePage.isDarkModeEnabled();
    expect(isNowDarkMode).toBeTruthy();
    await homePage.toggleDarkModeWithJS();
    isNowDarkMode = await homePage.isDarkModeEnabled();
    expect(isNowDarkMode).toBeFalsy();
  }
);

test(
  "Check that on the HomePage Youtube-btn is changing when hovering or invisible on mobile devices",
  { tag: ["@all", "@extended"] },
  async ({ page }) => {
    const youtubeBtn = homePage.youtubeSocialBtn;
    if (homePage.viewportWidth && homePage.viewportWidth < 800) {
      await expect(youtubeBtn).toBeHidden();
    } else {
      const youtubeBtnBGColor = await homePage.elementBGColor(youtubeBtn);
      expect(youtubeBtnBGColor).toBe(noColor);
      await homePage.hoverAt(youtubeBtn);
      const youtubeBtnHoverBGColor = await homePage.elementBGColor(youtubeBtn);
      expect(rgb(youtubeBtnHoverBGColor)).toBe(rgb(red));
    }
  }
);
