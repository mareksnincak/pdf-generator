import { getCluster } from './setup';

export default async (html: string) => {
  const cluster = await getCluster();
  const pdf = await cluster.execute({ html });
  return pdf;
};
