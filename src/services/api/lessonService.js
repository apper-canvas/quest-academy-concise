import lessonsData from '../mockData/lessons.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class LessonService {
  constructor() {
    this.lessons = [...lessonsData];
  }

  async getAll() {
    await delay(300);
    return [...this.lessons];
  }

  async getById(id) {
    await delay(250);
    const lesson = this.lessons.find(lesson => lesson.id === id);
    if (!lesson) {
      throw new Error('Lesson not found');
    }
    return { ...lesson };
  }

  async create(lessonData) {
    await delay(400);
    const newLesson = {
      id: Date.now().toString(),
      ...lessonData,
      completed: false,
      score: 0
    };
    this.lessons.push(newLesson);
    return { ...newLesson };
  }

  async update(id, updates) {
    await delay(300);
    const index = this.lessons.findIndex(lesson => lesson.id === id);
    if (index === -1) {
      throw new Error('Lesson not found');
    }
    this.lessons[index] = { ...this.lessons[index], ...updates };
    return { ...this.lessons[index] };
  }

  async delete(id) {
    await delay(300);
    const index = this.lessons.findIndex(lesson => lesson.id === id);
    if (index === -1) {
      throw new Error('Lesson not found');
    }
    const deleted = this.lessons.splice(index, 1)[0];
    return { ...deleted };
  }
}

export const lessonService = new LessonService();