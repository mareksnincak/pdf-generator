import mustache from 'mustache';

export default (template: string, data: Record<string, any>) => {
  return mustache.render(template, data);
};
