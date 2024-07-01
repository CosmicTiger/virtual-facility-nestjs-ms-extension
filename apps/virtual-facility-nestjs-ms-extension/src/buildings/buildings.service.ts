import { Injectable } from '@nestjs/common';
import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';

@Injectable()
export class BuildingsService {
  async create(createBuildingDto: CreateBuildingDto) {
    await this.createWorkflow(1);
    return 'This action adds a new building';
  }

  findAll() {
    return `This action returns all buildings`;
  }

  findOne(id: number) {
    return `This action returns a #${id} building`;
  }

  update(id: number, updateBuildingDto: UpdateBuildingDto) {
    return `This action updates a #${id} building`;
  }

  remove(id: number) {
    return `This action removes a #${id} building`;
  }

  async createWorkflow(buildingId: number) {
    return fetch('http://localhost:3001/workflows', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'My Workflow',
        buildingId: buildingId,
      }),
    }).then((res) => res.text());
  }
}
