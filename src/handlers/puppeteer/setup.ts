import { LaunchOptions } from 'puppeteer';
import { Cluster } from 'puppeteer-cluster';

import config from '@config';

let cluster: Cluster<{ html: string }, Buffer>;

export const getCluster = async () => {
  if (cluster) {
    return cluster;
  }

  /**
   * We have to typecast launch options as LaunchOptions
   * as puppeteer-cluster is missing some type definitions
   * for valid options that are still taken into account (i.e. args)
   */
  cluster = await Cluster.launch({
    puppeteerOptions: { args: ['--disable-dev-shm-usage'] } as LaunchOptions,
    concurrency: Cluster.CONCURRENCY_BROWSER,
    maxConcurrency: config.puppeteer.numberOfInstances,
    timeout: config.puppeteer.timeoutMs,
  });

  await cluster.task(async ({ page, data: { html } }) => {
    await page.setContent(html);

    // TODO - we should change this when we add support for header / footer
    const pdf = await page.pdf({
      format: 'a4',
      footerTemplate: undefined,
      headerTemplate: undefined,
      displayHeaderFooter: false,
    });
    return pdf;
  });

  // Execute dummy task so initialization won't delay first real task
  await cluster.execute({ html: '' });

  return cluster;
};
