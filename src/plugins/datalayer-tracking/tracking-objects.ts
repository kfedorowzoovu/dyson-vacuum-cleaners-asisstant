/**
 * tracking object interfaces based on specification of whirlpool
 */

export interface BaseObject {
  account: string;
  advisor_name: string;
  advisor_id: string;
  advisor_rev: string;
  localization: string;
  is_configurator: boolean;
  events: ReadonlyArray<EventObject>;
}

export interface EventObject {
  name: string;
  step_name: string;
  step_number: string;
  is_advisor_start: boolean;
  is_first_step: boolean;
  is_configurator: boolean;
  advice?: AdviceObject;
  answers?: ReadonlyArray<AdviceObject>;
  product?: ProductObject;
  productsList?: ReadonlyArray<ProductObject>;
}

export interface AdviceObject {
  question_id: string;
  question_text: string;
  question_step: string;
  answer_id: string;
  answer_text: string;
  is_first_time: boolean;
  is_configurator_filter?: boolean;
}

export interface ProductObject {
  sku: string;
  name: string;
  url: string;
  price: string;
  currency: string;
  review_count: string;
  review_average: string;
  stock_status: string;
  badge: Record<string, unknown>;
}
