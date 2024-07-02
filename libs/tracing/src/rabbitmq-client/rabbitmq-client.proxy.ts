import { Inject, Injectable, Scope } from '@nestjs/common';
import {
  CONTEXT,
  ClientProxy,
  RmqContext,
  RmqRecord,
  RmqRecordBuilder,
  RequestContext,
} from '@nestjs/microservices';
import { RABBITMQ_BROKER } from './constants';
import * as rabbitmq from 'amqplib';
import { Observable } from 'rxjs';

@Injectable({ scope: Scope.REQUEST })
export class RabbitMQClientProxy {
  constructor(
    @Inject(RABBITMQ_BROKER) private readonly client: ClientProxy,
    @Inject(CONTEXT) private readonly ctx: RequestContext<unknown, RmqContext>,
  ) {}

  send<TResult = any, TInput = any>(
    pattern: any,
    data: TInput,
  ): Observable<TResult> {
    return this.client.send(pattern, this.setTraceId(data));
  }

  emit<TResult = any, TInput = any>(
    pattern: any,
    data: TInput,
  ): Observable<TResult> {
    return this.client.emit(pattern, this.setTraceId(data));
  }

  private setTraceId(dataOrRecord: any) {
    const headers = dataOrRecord?.properties ?? rabbitmq.;
    headers.set(
      'traceId',
      this.ctx.getContext().getMessage().properties.headers['traceId'],
    );

    if (dataOrRecord instanceof RmqRecord) {
      return new RmqRecordBuilder(dataOrRecord.data)
        .setOptions(headers)
        .build();
    }
    return new RmqRecordBuilder()
      .setData(dataOrRecord)
      .setOptions(headers)
      .build();
  }
}
