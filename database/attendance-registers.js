// import { sql } from "./db.js";

// sql`
//   CREATE TABLE IF NOT EXISTS attendance (
//     attendanceId SERIAL PRIMARY KEY,
//     attendanceDate VARCHAR(10),
//     entrance VARCHAR(5),
//     departure VARCHAR(5),
//     employeeIdAttendance INTEGER,
//     FOREIGN KEY (employeeIdAttendance) REFERENCES employees(id)
//   )
// `.then(() => console.log("Table has been created"));

// sql`
//   INSERT INTO attendance (
//     attendanceDate,
//     entrance,
//     departure,
//     employeeIdAttendance
//   ) VALUES (
//     '2023-11-11',
//     '08:51',
//     '18:47',
//     1
//   )
// `.then(() => console.log("Attendance has been created"));
