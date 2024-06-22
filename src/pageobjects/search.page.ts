import { Locator } from "@playwright/test";
import { BasePage } from "./base.page";

export class SearchPage extends BasePage {
  protected _pageUrl: string = "search";

  // locators
  public pageDate: string = "#date";
  public searchInput: string = "#search-text-full";
  public searchSettingsBtn: string = ".icon-cog";
  public searchSubmitBtn: string = ".icon-search";
  public searchSettingsPanel: string = ".search-settings";
  public searchSectionsSelect: string = "#section_chzn";
  public searchSections = {
    all: "#section_chzn_o_0",
    news: "#section_chzn_o_1",
    reviews: "#section_chzn_o_2",
    archives: "#section_chzn_o_3",
  };
  public searchResults: string = ".search-result-item";

  public searchResultTitle: string = "h3 a";

  public async inputQuery(query: string): Promise<void> {
    await this._page.locator(this.searchInput).fill(query);
  }

  public async selectSection(section: string): Promise<void> {
    const isSettingsOpened: boolean = await this._page
      .locator(this.searchSettingsPanel)
      .isVisible();
    if (!isSettingsOpened) {
      await this._page.locator(this.searchSettingsBtn).click();
    }
    await this._page.locator(this.searchSectionsSelect).click();
    await this._page.locator(this.searchSections[section]).click();
  }

  public async submitSearch(): Promise<void> {
    await this._page.locator(this.searchSubmitBtn).click();
  }

  public async getSearchResults() {
    return this._page.locator(this.searchResults);
  }

  public async clickOnSearchResultTitle(item: Locator): Promise<void> {
    await item.locator(this.searchResultTitle).click();
  }
}
