import progressData from '../mockData/progress.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class ProgressService {
  constructor() {
    this.progress = [...progressData];
  }

  async getAll() {
    await delay(200);
    return [...this.progress];
  }

  async getById(id) {
    await delay(200);
    const progress = this.progress.find(progress => progress.id === id);
    if (!progress) {
      throw new Error('Progress not found');
    }
    return { ...progress };
  }

  async create(progressData) {
    await delay(300);
    const newProgress = {
      id: Date.now().toString(),
      ...progressData
    };
    this.progress.push(newProgress);
    return { ...newProgress };
  }

  async update(id, updates) {
    await delay(250);
    const index = this.progress.findIndex(progress => progress.id === id);
    if (index === -1) {
      throw new Error('Progress not found');
    }
    this.progress[index] = { ...this.progress[index], ...updates };
    return { ...this.progress[index] };
  }

  async delete(id) {
    await delay(200);
    const index = this.progress.findIndex(progress => progress.id === id);
    if (index === -1) {
      throw new Error('Progress not found');
    }
    const deleted = this.progress.splice(index, 1)[0];
    return { ...deleted };
  }
}

export const progressService = new ProgressService();