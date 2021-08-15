import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
class Template {
  constructor({ type, path }: Partial<Template> = {}) {
    if (type) {
      this.type = type;
    }

    if (path) {
      this.path = path;
    }
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: string;

  @Column()
  path: string;

  @CreateDateColumn({ name: 'created_at ' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  toPublicJson() {
    return { id: this.id, type: this.type };
  }
}

export default Template;
