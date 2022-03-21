export interface TabsUser {
  name: string,
  target: string
}

export interface ListedGame {
  firstStep: number;
  id: number;
  img: string;
  linkToPerson: string;
  route: string;
  routeToConclusion: string;
  subtitle: string;
  title: string;
}

export interface AnimationPropertiesRegWindow {
  to: null | string,
  from: null | string,
  timeout: null | number,
  translatedTimeout: string,
}

export interface PersonType {
  description: string,
  img: string,
  src: string,
  title: string,
  value: number
}

export interface ChooseSjwAnswer {
  answer: number,
  number: number
}

export interface WarriorCardType {
  answers: number[],
  id: number,
  imageUrl: string,
  name: string
}

export interface TriggerPerson {
  description: string,
  image: string,
  level: number,
  link: string,
  title: string
}