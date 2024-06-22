import { Page } from "@playwright/test";
import { HomePage } from "./pageobjects/home.page";
import { SearchPage } from "./pageobjects/search.page";

export default class PageFactory {
  static makePage(pageName: string, page: Page) {
    switch (pageName) {
      case "search":
        return new SearchPage(page);
      default:
        return new HomePage(page);
    }
  }
}
