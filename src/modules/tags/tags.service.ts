import TagsRepository from './tags.repository';
import { Tag } from './tags.entity';
import authRepository from '@modules/auth/auth.repository';
import { CreateTagDTO } from './dtos';

class TagsService {

  // Find all tags
  findAll(): Promise<Tag[]> {
    return TagsRepository.findAll();
  }

  // Find a tag by id
  findById(id: number): Promise<Tag | null> {
    return TagsRepository.findById(id);
  }

  // Find all tags by user
  findByUserId(userId: number): Promise<Tag[]> {
    return TagsRepository.findByUserId(userId);
  }

  // Create a new tag
  async create(tagData: { userId: number } & CreateTagDTO): Promise<Tag> {
    const { userId, ...tagDataWithoutRelations } = tagData;

    const user = await authRepository.findById(userId);
    if (!user) throw new Error('User not found');

    const existTag = await TagsRepository.findByName(tagData.name);
    if (existTag) throw new Error('Tag already exists');

    return TagsRepository.create(tagDataWithoutRelations);
    
  }

  // Update a tag
  async update(id: number, tagData: Partial<Tag>): Promise<Tag | null> {
    const tag = await TagsRepository.findById(id);
    if (!tag) throw new Error('Tag not found');

    await TagsRepository.update(id, tagData);
    return this.findById(id);
  }

  // Delete a tag
  delete(id: number): Promise<void> {
    return TagsRepository.delete(id).then(() => {});
  }
}

export default new TagsService();
