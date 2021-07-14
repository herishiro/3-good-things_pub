import { Browser, Page, ElementHandle, BrowserContext } from "playwright";

declare global {
  const page: Page;
  const browser: Browser;
  const browserName: string;
  const elementHandle: ElementHandle
  const context: BrowserContext
}