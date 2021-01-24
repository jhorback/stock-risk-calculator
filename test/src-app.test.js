import { html, fixture, expect } from '@open-wc/testing';

import '../src/src-app.js';

describe('MyElement', () => {

  it('passes the a11y audit', async () => {
    const el = await fixture(html`
      <src-app></src-app>
    `);

    await expect(el).shadowDom.to.be.accessible();
  });
});
