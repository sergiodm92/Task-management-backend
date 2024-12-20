import TagsRepository from './tags.repository';
import { Tag } from './tags.entity';
import authRepository from '@modules/auth/auth.repository';
import { CreateTagDTO } from './dtos';
import tasksService from '@modules/tasks/tasks.service';
import createError from 'http-errors';
import { errorMessage } from '@enums/errors.enum';

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
    if (!user) throw new createError.NotFound(errorMessage.userNotFound);

    const existTag = await TagsRepository.findByName(tagData.name, userId);
    if (existTag) {
      throw new createError.Conflict(errorMessage.tagAlreadyExists);
    }

    const tagWithRelations = { ...tagDataWithoutRelations, user };
    return TagsRepository.create(tagWithRelations);
  }

  // Update a tag
  async update(id: number, tagData: Partial<Tag>): Promise<Tag | null> {
    const tag = await TagsRepository.findById(id);
    if (!tag) throw new createError.NotFound(errorMessage.tagNotFound);

    await TagsRepository.update(id, tagData);
    return this.findById(id);
  }

  // Delete a tag
  async delete(id: number, userId: number): Promise<void> {
    const response = await tasksService.findTasksByTags([id], userId);
    if (response.length > 0) {
      throw new createError.MethodNotAllowed(errorMessage.tagHasAssociatedTask);
    }

    await TagsRepository.delete(id);
  }
}

export default new TagsService();
