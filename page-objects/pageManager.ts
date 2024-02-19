import { Locator, Page, expect } from '@playwright/test';
import { NavigationPage } from './navigationPage';
import { formLayoutsPage } from './formLayoutsPage';
import { datePickerPage } from './datePickerPage';

export class PageManager {
  private readonly page: Page;
  private readonly navigationPage: NavigationPage;
  private readonly formLayoutsPage: formLayoutsPage;
  private readonly datePickerPage: datePickerPage;

  constructor(page: Page) {
    this.page = page;
    this.navigationPage = new NavigationPage(this.page);
    this.formLayoutsPage = new formLayoutsPage(this.page);
    this.datePickerPage = new datePickerPage(this.page);
  }

  navigateTo() {
    return this.navigationPage;
  }

  onFormLayoutsPage() {
    return this.formLayoutsPage;
  }

  onDatePickerPage() {
    return this.datePickerPage;
  }
}
