import rewardsData from '../mockData/rewards.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class RewardService {
  constructor() {
    this.rewards = [...rewardsData];
  }

  async getAll() {
    await delay(250);
    return [...this.rewards];
  }

  async getById(id) {
    await delay(200);
    const reward = this.rewards.find(reward => reward.id === id);
    if (!reward) {
      throw new Error('Reward not found');
    }
    return { ...reward };
  }

  async create(rewardData) {
    await delay(300);
    const newReward = {
      id: Date.now().toString(),
      ...rewardData,
      unlockedAt: new Date().toISOString()
    };
    this.rewards.push(newReward);
    return { ...newReward };
  }

  async update(id, updates) {
    await delay(250);
    const index = this.rewards.findIndex(reward => reward.id === id);
    if (index === -1) {
      throw new Error('Reward not found');
    }
    this.rewards[index] = { ...this.rewards[index], ...updates };
    return { ...this.rewards[index] };
  }

  async delete(id) {
    await delay(250);
    const index = this.rewards.findIndex(reward => reward.id === id);
    if (index === -1) {
      throw new Error('Reward not found');
    }
    const deleted = this.rewards.splice(index, 1)[0];
    return { ...deleted };
  }
}

export const rewardService = new RewardService();