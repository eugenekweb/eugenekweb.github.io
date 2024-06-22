import { Locator, Page } from "@playwright/test";
import { toCamelCase } from "../helpers/utils";

export class BasePage {
  protected _pageUrl: string = "";

  constructor(protected _page: Page) {}

  get page(): Page {
    return this._page;
  }

  async open(): Promise<void> {
    await this._page.goto(this._pageUrl);
  }

  async navigateTo(url: string): Promise<void> {
    const correctUrl: string = "/" + url.replace(/^\/|\\/, "");
    await this._page.goto(correctUrl);
  }

  async close(): Promise<void> {
    await this._page.close();
  }

  get pageTitle(): Promise<string> {
    return this._page.title();
  }

  get currentUrl(): string {
    return this._page.url();
  }

  get viewportWidth(): number | undefined {
    return this._page.viewportSize()?.width;
  }

  public isJQueryLoaded = async (): Promise<boolean> =>
    await this._page.evaluate(() =>
      Promise.resolve(typeof (window as any).jQuery === "function")
    );

  public async toggleDarkModeWithJS(): Promise<void> {
    await this._page.evaluate(() => {
      (document.querySelector(".toggle_darkmode") as any).click();
    });
  }

  public isDarkModeEnabled = async (): Promise<boolean> =>
    await this._page.evaluate(() =>
      Promise.resolve((window as any).darkmode == 1)
    );

  public async hoverAt(element: Locator): Promise<void> {
    await element.hover();
  }

  public async getCssProperty(
    element: Locator,
    property: string
  ): Promise<string> {
    property = toCamelCase(property);
    return await element.evaluate((el, prop) => {
      const computedStyle = window.getComputedStyle(el);
      return computedStyle[prop];
    }, property);
  }

  public async elementBGColor(element: Locator): Promise<string> {
    return await this.getCssProperty(element, "background-color");
  }
}
