import {DeliveryHistoryItem} from './DeliveryHistoryItem';

export interface Provider {
  idProvider: number;
  contractInfo: string;
  history?: DeliveryHistoryItem[];
}
