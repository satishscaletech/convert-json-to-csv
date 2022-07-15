import { Injectable } from '@nestjs/common';
import { readdirSync, readFileSync } from 'fs';
import { createObjectCsvWriter } from 'csv-writer';
import { find } from 'lodash';
const HandsDown =
  '/home/scaletech-sm/Documents/Soundmind Assests/SM Char json/HandsDown/metadata';
const HandsUp =
  '/home/scaletech-sm/Documents/Soundmind Assests/SM Char json/HandsUp/metadata';
const Wave =
  '/home/scaletech-sm/Documents/Soundmind Assests/SM Char json/Wave/metadata';

@Injectable()
export class ConvertService {
  public readonly header = [
    { id: 'name', title: 'name' },
    { id: 'description', title: 'description' },
    { id: 'image', title: 'image' },
    { id: 'edition', title: 'edition' },
    { id: 'PERSONA', title: 'PERSONA' },
    { id: 'EMOTIONS', title: 'EMOTIONS' },
    { id: 'GENDER', title: 'GENDER' },
    { id: 'BODY', title: 'BODY' },
  ];

  public async convertToJson() {
    const folder = HandsUp;
    console.log('------------------');
    const dir = readdirSync(folder); //List all files from folder
    const csv = createObjectCsvWriter({
      path: `HandsUp.csv`,
      header: this.header,
    });
    const item = [];

    for (const i of dir) {
      const read = readFileSync(`${folder}/${i}`);
      console.log('read=====>', read.toString() == '[]');

      if (read.toString() == '[]') {
        continue;
      }

      const parseData = JSON.parse(read.toString());
      console.log('parseData===>', parseData);

      if (typeof parseData === 'object') {
        //console.log('parseData', parseData);
        console.log(
          'get',
          find(parseData.attributes, ['trait_type', 'PERSONA']).value,
        );

        console.log('file name', i);
        item.push({
          name: parseData.name,
          description: parseData.description,
          image: parseData.image,
          edition: parseData.edition,
          PERSONA: find(parseData.attributes, ['trait_type', 'PERSONA']).value,
          EMOTIONS: find(parseData.attributes, ['trait_type', 'EMOTIONS'])
            .value,
          GENDER: find(parseData.attributes, ['trait_type', 'GENDER']).value,
          BODY: find(parseData.attributes, ['trait_type', 'BODY']).value,
        });

        //console.log('item======>', item);
        //await csv.writeRecords(item);
      }
    }
    await csv.writeRecords(item);
  }

}
