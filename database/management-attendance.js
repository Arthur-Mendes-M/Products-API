// import { sql } from "./db.js";

// sql`
//   CREATE TABLE IF NOT EXISTS attendance (
//     attendanceId SERIAL PRIMARY KEY,
//     attendanceDate VARCHAR,
//     entrance VARCHAR,
//     departure VARCHAR,
//     employeeIdAttendance VARCHAR
//   )
// `.then(() => console.log("Table has been created"));

// sql`
//   INSERT INTO attendance (
//     attendanceDate,
//     entrance,
//     departure,
//     employeeIdAttendance
//   ) VALUES (
//     '2023-11-20',
//     '08:51',
//     '18:47',
//     '1'
//   )
// `.then(() => console.log("Attendance has been created"));

// sql`
//     DROP TABLE attendance
// `.then(() => console.log('Table has been deleted'))
