const department = [
  { _id: 1, name: '컴퓨터공학과' },
  { _id: 2, name: '전자전기공학과' },
  { _id: 3, name: '토목환경공학과' },
  { _id: 4, name: '고분자시스템공학과' },
  { _id: 5, name: '건축학과' },
  { _id: 6, name: '기계공학과' },
  { _id: 7, name: '화학공학과' },
  { _id: 8, name: '소프트웨어학과' },
  { _id: 9, name: '정보통계학과' },
  { _id: 10, name: '모바일시스템공학과' },
  { _id: 11, name: '국어국문학과' },
  { _id: 12, name: '사학과' },
  { _id: 13, name: '철학과' },
  { _id: 14, name: '영미인문학과' },
  { _id: 15, name: '법학과' },
  { _id: 16, name: '정치외교학과' },
  { _id: 17, name: '행정학과' },
  { _id: 18, name: '상담학과' },
  { _id: 19, name: '미디어커뮤니케이션학과' },
  { _id: 20, name: '무역학과' },
  { _id: 21, name: '경제학과' },
  { _id: 22, name: '경영학과' },
];

const price = [
  {
    _id: 0,
    name: '모두',
    array: [],
  },
  {
    _id: 1,
    name: '0 ~ 4999원',
    array: [0, 4999],
  },
  {
    _id: 2,
    name: '5000 ~ 9999원',
    array: [5000, 9999],
  },
  {
    _id: 3,
    name: '10000 ~ 19999원',
    array: [10000, 19999],
  },
  {
    _id: 4,
    name: '20000 ~ 29999원',
    array: [20000, 29999],
  },
  {
    _id: 5,
    name: '30000원 이상',
    array: [30000, 1500000],
  },
];

export { department, price };
