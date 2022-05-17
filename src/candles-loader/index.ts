/**
 * Загрузчик свечей.
 * - позволяет загрузить необходимое кол-во свечей из прошлого
 * - использует кеш на файловой системе
 *
 * Структура кеша:
 * <figi>
 *   1_min
 *      2022-05-01.json
 *      2022-05-02.json
 *   5_min
 *      2022-05-01.json
 *      2022-05-02.json
 *   15_min
 *      2022-05-01.json
 *      2022-05-02.json
 *   hour
 *      2022-05-01.json
 *      2022-05-02.json
 *   day
 *      2020.json
 *      2021.json
 *      2022.json
 */

import { TinkoffInvestApi } from '../api.js';
import { CandleInterval } from '../generated/marketdata.js';
import { CandlesReqDay } from './req-day.js';
import { CandlesReqMh } from './req-mh.js';
import { CandlesReqParams } from './req.js';

export interface CandlesLoaderOptions {
  /** Директория для кеширования свечей */
  cacheDir?: string;
}

const defaults: Required<CandlesLoaderOptions> = {
  cacheDir: '.candles',
};

export class CandlesLoader {
  protected options: Required<CandlesLoaderOptions>;

  constructor(protected api: TinkoffInvestApi, options: CandlesLoaderOptions = {}) {
    this.options = Object.assign({}, defaults, options);
  }

  async getCandles(req: CandlesReqParams) {
    const candlesReq = req.interval === CandleInterval.CANDLE_INTERVAL_DAY
      ? new CandlesReqDay(this.api, this.options, req)
      : new CandlesReqMh(this.api, this.options, req);
    const candles = await candlesReq.getCandles();
    return { candles };
  }
}