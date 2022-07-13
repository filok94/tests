export interface ChooseSjwAnswer {
  answer: number;
  number: number;
}

export interface WarriorCardType {
  answers: number[];
  id: number;
  imageUrl: string;
  name: string;
}

export interface TriggerPerson {
  description: string;
  image: string;
  level: number;
  link: string;
  title: string;
}

export type OptionEmit = {
  optionTitle: string;
  optionVariant: string | number;
};

export interface IInputError {
  message: string;
  showSeconds: number;
}

export interface IAnswersList {
  answer: 0 | 1 | 2 | 3;
  index: number;
}

export type Nullable<T> = T | null | undefined;
export class Tab {
  constructor(public id: number, public name: string) {
    this.name = name;
    this.id = id;
  }
}
