/**
 * Класс для подписок на сделки.
 * See: https://tinkoff.github.io/investAPI/orders/#ordersstreamservice
 */
import { BaseStream } from './base.js';
import { TradesStreamRequest, TradesStreamResponse } from '../generated/orders.js';

export class TradesStream extends BaseStream<TradesStreamRequest, TradesStreamResponse> {
  /**
   * Подписаться на обновления.
   */
  watch(request: TradesStreamRequest) {
    const call = this.api.ordersStream.tradesStream(request);
    this.loop(call);
  }

  // todo: cancel() - тут отмена работает по-другому, т.к. req не AsyncIterable
}
