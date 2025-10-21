import type { Question } from './types';

export const QUESTIONS: Question[] = [
  // Easy
  {
    id: 1,
    sentenceTemplate: "Би ___ ошооб.",
    blankWord: "гэртээ",
    options: [
      { text: { en: "to work", ru: "на работу" }, isCorrect: false },
      { text: { en: "home", ru: "домой" }, isCorrect: true },
      { text: { en: "to school", ru: "в школу" }, isCorrect: false },
      { text: { en: "to the store", ru: "в магазин" }, isCorrect: false },
    ],
    difficulty: 'Easy',
  },
  {
    id: 2,
    sentenceTemplate: "Энэ ___ бэ?",
    blankWord: "ном",
    options: [
      { text: { en: "table", ru: "стол" }, isCorrect: false },
      { text: { en: "pen", ru: "ручка" }, isCorrect: false },
      { text: { en: "book", ru: "книга" }, isCorrect: true },
      { text: { en: "chair", ru: "стул" }, isCorrect: false },
    ],
    difficulty: 'Easy',
  },
  {
    id: 3,
    sentenceTemplate: "Шинии нэрэ ___ бэ?",
    blankWord: "хэн",
    options: [
      { text: { en: "Where", ru: "Где" }, isCorrect: false },
      { text: { en: "When", ru: "Когда" }, isCorrect: false },
      { text: { en: "Why", ru: "Почему" }, isCorrect: false },
      { text: { en: "What / Who", ru: "Что / Кто" }, isCorrect: true },
    ],
    difficulty: 'Easy',
  },
  {
    id: 8,
    sentenceTemplate: "Энэ ___ морин бэ?",
    blankWord: "хурдан",
    options: [
      { text: { en: "Is this a slow horse?", ru: "Это медленная лошадь?" }, isCorrect: false },
      { text: { en: "Is this a white horse?", ru: "Это белая лошадь?" }, isCorrect: false },
      { text: { en: "Is this a fast horse?", ru: "Это быстрая лошадь?" }, isCorrect: true },
      { text: { en: "Is this a big horse?", ru: "Это большая лошадь?" }, isCorrect: false },
    ],
    difficulty: 'Easy',
  },
  // Medium
  {
    id: 4,
    sentenceTemplate: "Тэрэ ___ эдеэ.",
    blankWord: "бууза",
    options: [
      { text: { en: "drinks tea", ru: "пьет чай" }, isCorrect: false },
      { text: { en: "eats buuz (dumplings)", ru: "ест буузы" }, isCorrect: true },
      { text: { en: "reads a book", ru: "читает книгу" }, isCorrect: false },
      { text: { en: "goes to sleep", ru: "ложится спать" }, isCorrect: false },
    ],
    difficulty: 'Medium',
  },
  {
    id: 5,
    sentenceTemplate: "Би ___ дуратайб.",
    blankWord: "шагай",
    options: [
      { text: { en: "I like to sing", ru: "Я люблю петь" }, isCorrect: false },
      { text: { en: "I like shagai (ankle-bone game)", ru: "Я люблю шагай (игра в кости)" }, isCorrect: true },
      { text: { en: "I like to dance", ru: "Я люблю танцевать" }, isCorrect: false },
      { text: { en: "I like to run", ru: "Я люблю бегать" }, isCorrect: false },
    ],
    difficulty: 'Medium',
  },
  {
    id: 6,
    sentenceTemplate: "Наран ___ гараба.",
    blankWord: "уула дээгүүр",
    options: [
      { text: { en: "set behind the river", ru: "село за рекой" }, isCorrect: false },
      { text: { en: "is in the sky", ru: "находится в небе" }, isCorrect: false },
      { text: { en: "rose over the mountain", ru: "взошло над горой" }, isCorrect: true },
      { text: { en: "is hidden by clouds", ru: "скрыто облаками" }, isCorrect: false },
    ],
    difficulty: 'Medium',
  },
   {
    id: 7,
    sentenceTemplate: "Эжым ___ шанаба.",
    blankWord: "шүлэ",
    options: [
      { text: { en: "My mother cooked soup", ru: "Моя мама сварила суп" }, isCorrect: true },
      { text: { en: "My mother sewed clothes", ru: "Моя мама сшила одежду" }, isCorrect: false },
      { text: { en: "My mother went to the market", ru: "Моя мама пошла на рынок" }, isCorrect: false },
      { text: { en: "My mother is reading", ru: "Моя мама читает" }, isCorrect: false },
    ],
    difficulty: 'Medium',
  },
  // Hard
  {
    id: 9,
    sentenceTemplate: "Манай ___ ехэ баян.",
    blankWord: "нютаг",
    options: [
      { text: { en: "house", ru: "дом" }, isCorrect: false },
      { text: { en: "car", ru: "машина" }, isCorrect: false },
      { text: { en: "homeland/region", ru: "родина/край" }, isCorrect: true },
      { text: { en: "friend", ru: "друг" }, isCorrect: false },
    ],
    difficulty: 'Hard',
  },
  {
    id: 10,
    sentenceTemplate: "___ ажал хэжэ, хүн болодог.",
    blankWord: "Эрдэм",
    options: [
      { text: { en: "Money", ru: "Деньги" }, isCorrect: false },
      { text: { en: "Power", ru: "Власть" }, isCorrect: false },
      { text: { en: "Knowledge/Science", ru: "Знание/Наука" }, isCorrect: true },
      { text: { en: "Luck", ru: "Удача" }, isCorrect: false },
    ],
    difficulty: 'Hard',
  },
  {
    id: 11,
    sentenceTemplate: "Хүнэй ___ өөрынгөө гарта.",
    blankWord: "хуби заяан",
    options: [
      { text: { en: "money", ru: "деньги" }, isCorrect: false },
      { text: { en: "destiny", ru: "судьба" }, isCorrect: true },
      { text: { en: "health", ru: "здоровье" }, isCorrect: false },
      { text: { en: "house", ru: "дом" }, isCorrect: false },
    ],
    difficulty: 'Hard',
  },
  {
    id: 12,
    sentenceTemplate: "Байгал далай ___ уһатай.",
    blankWord: "сэбэр",
    options: [
      { text: { en: "salty", ru: "соленая" }, isCorrect: false },
      { text: { en: "dirty", ru: "грязная" }, isCorrect: false },
      { text: { en: "clean/pure", ru: "чистая" }, isCorrect: true },
      { text: { en: "warm", ru: "теплая" }, isCorrect: false },
    ],
    difficulty: 'Hard',
  },
];
