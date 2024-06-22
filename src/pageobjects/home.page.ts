import { Locator } from "@playwright/test";
import { BasePage } from "./base.page";

export class HomePage extends BasePage {
  protected _pageUrl: string = "";

  // locators
  protected _pageDate: string = "#date";

  get pageDate(): Locator {
    return this._page.locator(this._pageDate);
  }

  get youtubeSocialBtn(): Locator {
    return this._page.getByTitle("Youtube 3DNews");
  }

  public async getDateOnPage(): Promise<string> {
    const dateElement = await this.pageDate.innerText();
    return dateElement.replace(/^.*(\d{2}.*\d{4}).*$/, "$1");
  }

  
}
