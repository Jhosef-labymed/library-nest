import { Injectable } from '@nestjs/common';
import { addHours } from 'date-fns';
require('date-fns-tz');

@Injectable()
export class SharedService {
  getDatetimeNow() {
    return addHours(new Date(), -6);
  }
}
