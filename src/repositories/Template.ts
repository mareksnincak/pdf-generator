import { EntityNotFoundError, EntityRepository, Repository } from 'typeorm';
import httpStatus from 'http-status';

import { RESOURCE_NAMES } from '@constants/common';
import Template from '@entities/Template';
import AppError from '@errors/AppError';

type TOptionalType = {
  type?: string;
};

@EntityRepository(Template)
class TemplateRepository extends Repository<Template> {
  async getOneByIdOrFail(id: string) {
    try {
      return await this.findOneOrFail(id);
    } catch (err) {
      if (err instanceof EntityNotFoundError) {
        throw new AppError({
          message: `Template with id ${id} not found`,
          statusCode: httpStatus.NOT_FOUND,
          detail: {
            resource: RESOURCE_NAMES.template,
          },
        });
      }

      throw err;
    }
  }

  getWithOptionalType({ type }: TOptionalType) {
    const where: TOptionalType = {};
    if (type) {
      where.type = type;
    }

    return this.find(where);
  }

  createTemplate({ type, path }: { type: string; path: string }) {
    const template = new Template({
      type,
      path,
    });

    return this.save(template);
  }
}

export default TemplateRepository;
