import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { License } from './licenses.schema';

@Injectable()
export class LicensesService {
    constructor(@InjectModel(License.name) private licenseModel: Model<License>) { }

    public getAll() {
        return this.licenseModel.find().exec();
    }

    public getByOwner(owner: string) {
        return this.licenseModel.find({ owner }).exec();
    }

    public create(owner: string, game: string) {
        return this.licenseModel.create({ owner, game });
    }
}
