import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Template from './Template';

@Entity()
class Document {
  constructor({ data, template }: Partial<Document> = {}) {
    if (data) {
      this.data = data;
    }

    if (template) {
      this.template = template;
    }
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'json' })
  data: Record<string, any>;

  @ManyToOne(() => Template)
  @JoinColumn({ name: 'template_id' })
  template: Template;

  @CreateDateColumn({ name: 'created_at ' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  toPublicJson() {
    return { id: this.id, data: this.data, templateId: this.template.id };
  }
}

export default Document;
