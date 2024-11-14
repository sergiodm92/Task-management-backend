import { AppDataSource } from '@config/database';
import { In, Repository } from 'typeorm';
import { Tag } from './tags.entity';

class TagsRepository {
  private repo: Repository<Tag>;

  constructor() {
    this.repo = AppDataSource.getRepository(Tag);
  }

  findAll() {
    return this.repo.find();
  }

  async findByName(name: string, userId: number): Promise<Tag | null> {
    return this.repo.findOne({ where: { name, user: { id: userId } } });
  }

  findById(id: number) {
    return this.repo.findOneBy({ id });
  }

  findByIds(ids: number[]): Promise<Tag[]> {
    return this.repo.findBy({ id: In(ids) });
  }

  findByUserId(userId: number): Promise<Tag[]> {
    return this.repo.find({ where: { user: { id: userId } } });
  }

  create(tagData: Partial<Tag>) {
    const tag = this.repo.create(tagData);
    return this.repo.save(tag);
  }

  update(id: number, tagData: Partial<Tag>) {
    return this.repo.update(id, tagData);
  }

  delete(id: number) {
    return this.repo.delete(id);
  }
}

export default new TagsRepository();
