import { EntityRepository, Repository, getCustomRepository } from 'typeorm';
import Document from '@entities/Document';
import TemplateRepository from './Template';

@EntityRepository(Document)
class DocumentRepository extends Repository<Document> {
  async createDocument(templateId: string, data: Record<string, any>) {
    const template = await getCustomRepository(
      TemplateRepository,
    ).getOneByIdOrFail(templateId);

    const document = new Document({
      template,
      data,
    });

    return this.save(document);
  }
}

export default DocumentRepository;
