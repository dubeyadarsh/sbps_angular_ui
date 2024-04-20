import { HostBinding } from "@angular/core";

export const apiURL="http://localhost:3000";
export const ayList: any[] = [{id:1,value:'2024'}, {id:2,value:'2023'},{id:3,value:'2022'}];
export const ayCurrent:String="2024";
export const subjectNames: { [key: number]: string } = {
    0: 'Hindi',
    1: 'English',
    2: 'Mathematics',
    3: 'Science',
    4: 'Social Science',
    5: 'Drawing',
    6: 'Computer',
    7: 'General Knowledge'
};
export const subjectNames2: string[][] = [
    ["half_hindi", "annual_hindi"],
    ["half_english", "annual_english"],
    ["half_math", "annual_math"],
    ["half_science", "annual_science"],
    ["half_socialscience", "annual_socialscience"],
    ["half_art", "annual_art"],
    ["half_computer", "annual_computer"],
    ["half_gk", "annual_gk"]
];
export const subjLen:number=8;
export const subjTotal:number=50;


export const subjectTotals: string[] = [
    "hindi_total",
    "eng_total",
    "math_total",
    "science_total",
    "so_sci_total",
    "art_total",
    "com_total",
    "gk_total",
];

export const allListOfRoutes: any[]=[
    {
        id:0,
        title:'Students',
        imgPath:'/assets/homeCard/student.jpg',
        desc:"Let's dive into student section",
        routeName:"/student"
    },
    {
        id:1,
        title:"Student's Fees",
        imgPath:'/assets/homeCard/fees.jpg',
        desc:"Let's dive into fee section",
        routeName:"/fees"
    },
    {
        id:2,
        title:"Subjects & Marks",
        imgPath:'/assets/homeCard/result.jpg',
        desc:"Let's dive into marks section",
        routeName:"/marks"
    },
    // {
    //     id:3,
    //     title:"Class Routine",
    //     imgPath:'/assets/homeCard/report.jpg',
    //     desc:"Let's dive into reports section",
    //     routeName:"/reports"
    // },
    {
        id:4,
        title:"Attendance",
        imgPath:'/assets/homeCard/attendance.jpg',
        desc:"Let's dive into Attend. section",
        routeName:"/attendance"
    },
    // {
    //     id:5,
    //     title:"Help & Faqs",
    //     imgPath:'/assets/homeCard/help.jpg',
    //     desc:"Let's dive into Help section",
    //     routeName:"/help"
    // }
]


export const months = [
    { id: 1, value: 'April' },
    { id: 2, value: 'May' },
    { id: 3, value: 'June' },
    { id: 4, value: 'July' },
    { id: 5, value: 'August' },
    { id: 6, value: 'September' },
    { id: 7, value: 'October' },
    { id: 8, value: 'November' },
    { id: 9, value: 'December' },
    { id: 10, value: 'January' },
    { id: 11, value: 'February' },
    { id: 12, value: 'March' }
];