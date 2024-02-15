import { Page } from '@playwright/test';

export class NavigationPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async formLayoutsPage() {
    await this.page.getByText('Forms').click();
    await this.page.getByText('Form Layouts').click();
  }

  async datePickerPage() {
    await this.page.getByText('Forms').click();
    await this.page.getByText('Datepicker').click();
  }

  async smartTablePage() {
    await this.page.getByText('Tables & Data').click();
    await this.page.getByText('Smart Table').click();
  }

  async toastrPage() {
    await this.page.getByText('Modal & Overlays').click();
    await this.page.getByText('Toastr').click();
  }

  async toolTipPage() {
    await this.page.getByText('Modal & Overlays').click();
    await this.page.getByText('Tooltip').click();
  }
}
