type User = {
  name: string;
  age: number;
}

const u1:User = {name:"jane", age:20}

type Car ={
  readonly brand: string;
  year: number;
}

const myCar: Car = {
  brand: "Tesla",
  year: 2024
}

type UserProfile = {
  readonly id:number;
  name:string;
  age:number;
  email:string;
}


const user: UserProfile = {
  id: 1001,
  name: "Kim",
  age: 22,
  email: "kim@example.com"
};

user.name = "Lee";    // OK
// user.id = 2000;       // 오류 발생

let firstName: "kim";
firstName = "kim";

type Direction = "left" | "right" | "up" | "down"

function action(dir:Direction) {
  console.log(`Move ${dir}`)
}

action("left")
// action("jump")

const colors ={
  fire: "red",
  water: "blue",
  grass: "green"
} as const

type UserInfo = Record<string, string>

const userInfo:UserInfo = {
  name:"kim",
  city:"seoul",
  email:"kim@naver.com",
  // age: 20
}

type PokemonType = "fire" | "water" | "grass"
type TypeColor = Record<PokemonType, string>

const color:TypeColor = {
  fire: "red",
  water: "blue",
  grass: "green",
  // elect: "yellow"
}
// - 포켓몬 타입과 색상을 리터럴로 제한해보기
//     1. 타입은 `"fire" | "water" | "grass"` 중 하나
//     2. 각 타입의 색상은 `"red" | "blue" | "green"` 중 하나
//     3. 이 관계를 `Record`로 표현
// type PokemonType = ???;
type PokemonColor = "red" | "blue" | "green"

type TypeColorMap = Record<PokemonType, PokemonColor>

const pokeColors: TypeColorMap = {
  fire: "red",
  water: "blue",
  grass: "green"
};

function lengthOrAdd(x:number | string) {
  if (typeof x === "string") {
    return x.length
  } 

  return x+1

  
}

type Fish = {swim:()=>void};
type Bird = {fly:()=>void};

function move(animal: Fish | Bird) {
  if ("swim" in animal) {
    animal.swim()
  } else {
    animal.fly()
  }
}

// - 함수 `func`는 파라미터 `input` 을 받음
//     - `input` 은 string 또는 문자 배열 또는 숫자 배열을 파라미터로 받음
// - 파라미터 `input` 의 타입에 따라
//     - string이면 문자열의 길이를
//     - 배열이면 배열의 첫 번째 요소를 반환
//         - 배열은 문자 배열 또는 숫자 배열을 받을 수 있음

function func(input: string | string[] | number[]) {
  if (typeof input === "string" ) {
    return input.length
  } else {
    return input[0]
  }
}




type Add = (a:number, b:number) => number;

// const add: Add = (x, y) => x+y;
const add:Add = function (x,y) {return x+y}

function run(fn:Add) {
  console.log(fn(3,5))
}


type CreatUser = (name:string, age:number) => {
  name:string;
  age:number;
  activate: boolean;
}

const createUser: CreatUser = (name, age) => {
  return {
    name,
    age,
    activate: true
  }
}

interface IUser {
  name: string;
  age?: number
}

const u2:IUser = {
  name: "kim",
  age: 20,
  email: "kim@naver.com"
}

interface Animal {
  name: string;
}

interface Dog extends Animal {
  bark(): void;
}

const dog:Dog = {
  name: "choco",
  bark() {
    console.log("멍멍!")
  }
}

interface IUser {
  readonly email: string
}
// u2.email = "kim@daum.net"
interface IPokemonType {
  [type:string]:{
    color:string;
    bgColor:string;
    displayName: string;
  }
}

interface ExtenededPokemonType extends IPokemonType {
  fire: {color:string; bgColor:string; displayName:string} 
}

const POKE_TYPE: ExtenededPokemonType = {
  water: {
    color: "blue.300",
    bgColor: "blue.50",
    displayName: "Water"
  },
  fire: {
    color: "red.300",
    bgColor: "red.50",
    displayName: "Fire"
  }
}
