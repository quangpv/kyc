import { btoa } from 'buffer';
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

interface ESResult {
  body: any;
}

@Injectable()
export class EsService {
  URL =
    'https://search-ohn-search-ulqz7qzjga2tgtth2bwe772vrm.ap-southeast-1.es.amazonaws.com/onehypernet/_search';
  username = 'onehypernet';
  password = 'Thin8Margin9!';

  constructor(private httpClient: HttpService) {}

  async search(query: any): Promise<ESResult> {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${this.authBase64()}`,
      },
    };
    const result = await this.httpClient
      .post(this.URL, query.body, config)
      .toPromise();
    return { body: result.data };
  }

  private authBase64(): string {
    const auth = `${this.username}:${this.password}`;
    return Buffer.from(auth, 'binary').toString('base64');
  }
}
